import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { map } from 'rxjs/operators'
import { User } from 'src/app/models/user';
import { LoginConfigService } from './login-config.service';
import { LoginUserService } from './login-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = `${this.config.apiLoginUrl}login`;
  logoutUrl = `${this.config.apiLoginUrl}logout`;

  currentUserSubject$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  lastToken: string = '';
  storageName = 'currentUser'

  constructor(
    private config: LoginConfigService,
    private http: HttpClient,
    private router: Router,
    private loginUserService: LoginUserService
  ) {
    if (localStorage['currentUser']) {
      const user: User = JSON.parse(localStorage['currentUser']);
      this.lastToken = user.token || '';
      this.currentUserSubject$.next(user)
    }
  }

  get currentUserValue(): User | null {
    if (this.currentUserSubject$) {
      return this.currentUserSubject$.value
    } else {
      return null
    }
  }

  logout() {
    this.lastToken = '';
    this.currentUserSubject$.next(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/', 'login']);
  }

  login(loginData: User): Observable<User | null> {
    return this.http.post<{ user: User, token: string }>(
      this.loginUrl,
      loginData
    )
      .pipe(map(response => {
        if (response.user && response.token) {
          this.lastToken = response.token;
          response.user.token = response.token;
          this.currentUserSubject$.next(response.user);
          localStorage['currentUser'] = JSON.stringify(response.user);
          // return this.loginUserService.query(`email=${loginData.id_username}`)
          return response.user;
        }
        return null
      }))
    // .pipe(
    //   tap((user) => {
    //     if (!user) {
    //       localStorage.removeItem(this.storageName);
    //       this.currentUserSubject.next(null)
    //     } else {
    //       console.log(user);
    // user[0].token = this.lastToken;
    // localStorage.setItem(this.storageName, JSON.stringify(user[0]));
    // this.currentUserSubject.next(user[0])
    //   }
    // })
    // )
  }
}
