import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { DispersionsData } from '../models/dispersions-data';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataBase } from '../models/data-base';

@Injectable({
  providedIn: 'root'
})
export class DispersionsService extends BaseService<DataBase<DispersionsData>>  {

  constructor(
    public override config: ConfigService,
    public override http: HttpClient
  ) {
    super(config, http);
    this.entity = 'dispersionscreate';
  }

  getQuery(params?: {}): Observable<DataBase<DispersionsData>> {
    return this.http.get<DataBase<DispersionsData>>(`${this.config.apiUrl}${this.entity}/`, { params });
  }
}
