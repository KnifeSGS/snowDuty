import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../models/item';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends BaseService<Item>  {

  items$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([])

  constructor(
    public override config: ConfigService,
    public override http: HttpClient
  ) {
    super(config, http);
    this.entity = 'item';
    this.getSums()
  }

  getSums() {
    this.items$.next([]);
    this.http.get<Item[]>(`${this.config.apiUrl}${this.entity}/sums`).subscribe(
      entity => this.items$.next(entity)
    )
  }
}
