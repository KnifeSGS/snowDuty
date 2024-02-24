import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { BaseService } from './base.service';
import { WorkerDataBase } from '../models/data-base';

@Injectable({
  providedIn: 'root'
})
export class WorkerService extends BaseService<WorkerDataBase>  {

  constructor(
    public override config: ConfigService,
    public override http: HttpClient,
  ) {
    super(config, http);
    this.entity = 'worker';
  }
}
