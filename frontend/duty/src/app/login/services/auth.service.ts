import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { User } from 'src/app/models/user';
import { LoginConfigService } from './login-config.service';
import { LoginUserService } from './login-user.service';

interface serverResponse {
  refresh: string;
  access: string;
  user: string;
  id: number;
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  fakeUser: User = {
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
      console.log('nincs user adat');
      return null
    }
  }

  logout() {
    this.http.post(this.logoutUrl, '');
    this.lastToken = '';
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
          // response.user.token = response.token;
          // this.currentUserSubject$.next(response.user);
          this.fakeUser._id = response.id + '';
          this.fakeUser.user = response.user;
          this.fakeUser.token = response.token;
          this.fakeUser.refresh = response.refresh;
          this.currentUserSubject$.next(this.fakeUser)
          console.log(this.currentUserSubject$);
          // localStorage['currentUser'] = JSON.stringify(response.user);
          localStorage['currentUser'] = JSON.stringify(response);
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
