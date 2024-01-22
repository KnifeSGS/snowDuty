import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  private refresh = false;
  private refreshCount = 0;

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
            if (error.status === 401 && !this.refresh && this.refreshCount < 2) {
              this.refresh = true;
              this.refreshCount++
              console.log(this.refreshCount);
              this.messageService.add({ key: 'notification', severity: 'info', summary: 'Info', detail: 'Munkamenet lejárt', life: 2000 });
              const refreshToken = this.tokenService.getRefreshToken();
              return this.auth.refreshingToken(refreshToken!).pipe(
                switchMap((res: any) => {
                  console.log('Must refresh token...');
                  this.refreshCount = 0;
                  this.refresh = false;
                  this.messageService.add({ key: 'notification', severity: 'success', summary: 'Successful', detail: 'Munkamenet frissítve', life: 2000 });
                  const newAccessToken = this.tokenService.getAccessToken();
                  return next.handle(req.clone({
                    setHeaders: {
                      Authorization: `Bearer ${newAccessToken}`
                    }
                  }))
                })
              )
            }
            else if (error.status === 401 && error.statusText === 'Unauthorized' && !this.refresh) {
              this.auth.logout()
              this.messageService.add({ key: 'notification', severity: 'error', summary: 'Hiba', detail: 'Kérlek jelentkezz be újra!', life: 5000 });
            }

            if (error.status === 400) {
              const errorMessage = Object.entries(error.error).map(a => a.join(': '))
              this.messageService.add({ key: 'notification', severity: 'error', summary: 'Hiba', detail: `${errorMessage}`, life: 5000 });
            }

            // this.refreshCount = 0;
            this.refresh = false;
            return throwError(() => error)
          })
        )
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.statusText === 'Unauthorized') {
          this.auth.logout()
          this.messageService.add({ key: 'notification', severity: 'error', summary: 'Hiba', detail: 'Kérlek jelentkezz be újra!', life: 5000 });
        }
        return throwError(() => error)
      })
    )
  }

  // private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

  // }
}
