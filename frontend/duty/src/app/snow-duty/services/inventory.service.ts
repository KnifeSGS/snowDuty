import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, ReplaySubject, tap } from 'rxjs';
import { Inventory } from '../models/inventory';
import { Itemdata, sumsData } from '../models/itemdata';
import { Stockpile } from '../models/stockpile';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService extends BaseService<Inventory>   {

  items$: BehaviorSubject<Inventory> = new BehaviorSubject<Inventory>(new Inventory())

  stock$: ReplaySubject<Record<keyof Stockpile, string | number | undefined>> = new ReplaySubject<Record<keyof Stockpile, string | number | undefined>>()

  sums$: BehaviorSubject<Itemdata[]> = new BehaviorSubject<Itemdata[]>([])

  constructor(
    public override config: ConfigService,
    public override http: HttpClient
  ) {
    super(config, http);
    this.entity = 'inventory';
    this.getLastInventoryData$()
    this.filterInventory(this.items$)
    this.getInventorySums()
  }

  getLastInventoryData$() {
    this.items$.next({});
    this.http.get<Inventory>(`${this.config.apiUrl}${this.entity}/last`).subscribe(
      entity => this.items$.next(entity)
    )
  }

  filterInventory(items: BehaviorSubject<Inventory>) {
    items.subscribe(
      stockItems => {
        const { salt, basalt, cacl2, mixture, kalcinol, zeokal } = stockItems

        const newStock = {
          salt, basalt, cacl2, mixture, kalcinol, zeokal
        }
        this.stock$.next(newStock)
      }
    )
  }

  getInventorySums() {
    this.sums$.next([]);
    this.http.get<Itemdata[]>(`${this.config.apiUrl}${this.entity}/sum`).subscribe(
      entity => this.sums$.next(entity)
    )
  }

  updateStock(stock: Inventory, params?: {}): Observable<Inventory> {
    const target = `${this.config.apiUrl}${this.entity}/update`

    return this.http.post<Inventory>(target, stock, { params });
  }

  async fetchApiForSignal(): Promise<[]> {
    const response = await fetch(`${this.config.apiUrl}${this.entity}/sum`);
    const stockPile = await response.json()
    return stockPile
  }


}
