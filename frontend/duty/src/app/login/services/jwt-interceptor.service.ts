import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  private refresh = false;

  constructor(
    private auth: AuthService,
    private tokenService: TokenService,
    public messageService: MessageService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> | any> {
    // const currentUser = this.auth.currentUserValue;
    // const currentToken = this.auth.lastToken;
    const accessToken = this.tokenService.getAccessToken()

    if (accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      })


      return next.handle(req)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401 && !this.refresh) {
              this.refresh = true;
              this.messageService.add({ key: 'notification', severity: 'info', summary: 'Info', detail: 'Munkamenet lejárt', life: 2000 });
              const refreshToken = this.tokenService.getRefreshToken();
              return this.auth.refreshingToken(refreshToken!).pipe(
                switchMap((res: any) => {
                  console.log('Refreshing token...');
                  this.messageService.add({ key: 'notification', severity: 'success', summary: 'Successful', detail: 'Munkamenet frissítve', life: 2000 });
                  const newAccessToken = this.tokenService.getAccessToken()
                  return next.handle(req.clone({
                    setHeaders: {
                      Authorization: `Bearer ${newAccessToken}`
                    }
                  }))
                })
              )
            }

            if (error.status === 400) {
              const errorMessage = Object.entries(error.error).map(a => a.join(': '))
              this.messageService.add({ key: 'notification', severity: 'error', summary: 'Hiba', detail: `${errorMessage}`, life: 5000 });
            }
            this.refresh = false;
            return throwError(() => error)
          })
        )
    }

    return next.handle(req)
  }

  // private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

  // }
}
