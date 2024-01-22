import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CarsService extends BaseService<Car>  {

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
