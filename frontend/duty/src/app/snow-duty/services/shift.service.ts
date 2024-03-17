import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { DispersionsData } from '../models/dispersions-data';

class Summa {
  _id: string | null = null;
  total: number = 0;
  count: number = 0;
  average: number = 0;
}

@Injectable({
  providedIn: 'root'
})
export class ShiftService extends BaseService<DispersionsData>  {

  shifts$: BehaviorSubject<DispersionsData[]> = new BehaviorSubject<DispersionsData[]>([])

  constructor(
    public override config: ConfigService,
    public override http: HttpClient
  ) {
    super(config, http);
    this.entity = 'dispersionscreate';
  }

  getAllForOneJournal$(_id: string) {
    this.shifts$.next([]);
    this.http.get<DispersionsData[]>(`${this.config.apiUrl}${this.entity}/${_id}/shifts`).subscribe(
      entity => this.shifts$.next(entity)
    )
  }

  async getAllForOneJournalSignal(id: number, options: string = '&page_size=100') {
    const shifts = await fetch(`${this.config.apiUrl}${this.entity}/?journal=${id}${options}`);
    return await shifts.json()
  }

  getSumOfShiftsField(params: {}): Observable<Summa[]> {
    return this.http.get<Summa[]>(`${this.config.apiUrl}${this.entity}/summarizeField`, { params })
  }


}
