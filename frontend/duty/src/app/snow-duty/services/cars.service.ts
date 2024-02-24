import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarData } from '../models/car-data';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CarsService extends BaseService<CarData>  {

  constructor(
    public override config: ConfigService,
    public override http: HttpClient
  ) {
    super(config, http);
    this.entity = 'cars';
  }

  // override async fetchForSignal(options: string = '?page_size=1000'): Promise<any> {
  //   const response = await fetch(`${this.config.apiUrl}${this.entity}/${options}`);
  //   return await response.json()
  // }

}
