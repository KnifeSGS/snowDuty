import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { LoginConfigService } from './login-config.service';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  entity = 'users'

  constructor(
    private http: HttpClient,
    private config: LoginConfigService
  ) { }

  get(id?: string | number): Observable<User | User[]> {
    let url = `${this.config.apiLoginUrl}${this.entity}`;
    if (id) {
      url += `=${id}`;
    }

    return this.http.get<User[]>(url)
  }

  query(queryString: string): Observable<User | User[]> {
    const url = `${this.config.apiLoginUrl}${this.entity}?${queryString}`;
    return this.http.get<User[]>(url)
  }

  update(user: User): Observable<User | User[]> {
    const url = `${this.config.apiLoginUrl}${this.entity}?${user._id}`;
    return this.http.patch<User>(url, user)
  }
}
