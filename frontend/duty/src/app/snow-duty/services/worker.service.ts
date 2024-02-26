import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { BaseService } from './base.service';
import { DataBase } from '../models/data-base';
import { WorkerData } from '../models/worker-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerService extends BaseService<WorkerData>  {

  constructor(
    public override config: ConfigService,
    public override http: HttpClient,
  ) {
    super(config, http);
    this.entity = 'worker';
  }

  getQuery(params?: {}): Observable<DataBase<WorkerData>> {
    return this.http.get<DataBase<WorkerData>>(`${this.config.apiUrl}${this.entity}/`, { params });
  }

}
