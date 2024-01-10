import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  constructor(
    public override config: ConfigService,
    public override http: HttpClient,
  ) {
    super(config, http);
    this.entity = 'profile';
  }

  override create(entity: User): Observable<User> {
    const sentity = JSON.stringify(entity)
    console.log(sentity);
    return this.http.post<User>(
      `${this.config.apiUrl}register/`,
      sentity
    );
  }
}
