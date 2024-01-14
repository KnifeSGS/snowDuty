import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { User } from 'src/app/models/user';
import { LoginConfigService } from './login-config.service';
import { LoginUserService } from './login-user.service';
import { TokenService } from './token.service';

interface serverResponse {
  refresh: string;
  access: string;
  user: string;
  id: number;
  token: string;
  first_name: string;
  last_name: string;
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUser: User = {
    loginTime: new Date(),
    user: '',
    _id: '',
    first_name: '',
    last_name: '',
    full_name: '',
    email: '',
    role: 0,
    active: false
  }

  loginUrl = `${this.config.apiLoginUrl}login/`;
  logoutUrl = `${this.config.apiLoginUrl}logout/`;
  refreshUrl = `${this.config.apiLoginUrl}login/refresh/`;

  currentUserSubject$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  lastToken: string = '';
  refreshToken: string = '';
  storageName = 'currentUser'

  constructor(
    private config: LoginConfigService,
    private http: HttpClient,
    private router: Router,
    private loginUserService: LoginUserService,
    private tokenService: TokenService
  ) {
    if (localStorage['currentUser']) {
      const user: User = JSON.parse(localStorage['currentUser']);
      this.lastToken = user.token || '';
      this.tokenService.getAccessToken()
      this.currentUserSubject$.next(user)
    }
  }

  get currentUserValue(): User | null {
    if (this.currentUserSubject$) {
      return this.currentUserSubject$.value
    } else {
      console.log('nincs user adat');
      return null
    }
  }

  logout() {
    this.http.post(this.logoutUrl, '');
    this.lastToken = '';
    this.refreshToken = '';
    this.tokenService.deleteAccessToken();
    this.tokenService.deleteRefreshToken();
    this.currentUserSubject$.next(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/', 'login']);
  }

  login(loginData: User): Observable<serverResponse | null> {
    return this.http.post<serverResponse>(
      this.loginUrl,
      loginData
    )
      .pipe(map(response => {
        if (response.access) {
          this.lastToken = response.access;
          this.tokenService.storeAccessToken(response.access);
          this.refreshToken = response.refresh;
          this.tokenService.storeRefrshToken(response.refresh);
          // response.user.token = response.token;
          // this.currentUserSubject$.next(response.user);
          this.loginUser._id = response.id + '';
          this.loginUser.user = response.user;
          this.loginUser.token = response.token;
          this.loginUser.refresh = response.refresh;
          this.currentUserSubject$.next(this.loginUser);
          // localStorage['currentUser'] = JSON.stringify(response.user);
          localStorage['currentUser'] = JSON.stringify(this.loginUser);
          // return this.loginUserService.query(`email=${loginData.id_username}`)

          return response;
        }
        return null
      }),
        catchError(err => {
          this.logout();
          this.router.navigate(['/', 'denied']);
          throw new Error('Hibás bejelentkezés')
        })
      )
    // innen lehet nem kell
    // .pipe(
    //   tap((user) => {
    //     if (!user) {
    //       localStorage.removeItem('currentUser');
    //       this.currentUserSubject$.next(null)
    //     } else {
    //       console.log(user);
    //       user.token = this.lastToken;
    //       localStorage.setItem('currentUser', JSON.stringify(user));
    //       this.currentUserSubject$.next(user)
    //     }
    //   })
    // )
  }

  refreshingToken(refreshToken: string) {
    return this.http.post<any>(`${this.refreshUrl}`, { refresh: refreshToken })
      .pipe(map(
        (response) => {
          this.tokenService.storeAccessToken(response.access);
          return response;
        }));
  }
}
