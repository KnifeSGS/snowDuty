import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Inventory } from '../models/inventory';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService extends BaseService<Inventory>   {

  items$: BehaviorSubject<Inventory[]> = new BehaviorSubject<Inventory[]>([])

  constructor(
    public override config: ConfigService,
    public override http: HttpClient
  ) {
    super(config, http);
    this.entity = 'inventory';
  }

  getLastInventoryData$() {
    this.items$.next([]);
    this.http.get<Inventory[]>(`${this.config.apiUrl}${this.entity}/last`).subscribe(
      entity => this.items$.next(entity)
    )
  }
}
