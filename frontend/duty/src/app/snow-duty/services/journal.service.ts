import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Journal, JournalResponse } from '../models/journal';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { JournalDataStore } from '../models/initial-journal-data';
import { JournalDataBase } from '../models/data-base';

@Injectable({
  providedIn: 'root'
})
export class JournalService extends BaseService<Journal> {

  // journals$: BehaviorSubject<Journal[]> = new BehaviorSubject<Journal[]>([])
  journals$: ReplaySubject<JournalResponse> = new ReplaySubject<JournalResponse>()

  constructor(
    public override config: ConfigService,
    public override http: HttpClient,
  ) {
    super(config, http);
    this.entity = 'journal';
  }

  getSelectedInterval(params: {}) {
    // this.journals$.next([]);
    // if (params) {
    this.http.get<JournalResponse>(`${this.config.apiUrl}${this.entity}/selectedinterval`, { params }).subscribe(
      entity => this.journals$.next(entity)
    )
    // }
    // this.http.get<Journal[]>(`${this.config.apiUrl}${this.entity}`).subscribe(
    //   entity => this.journals$.next(entity)
    // )
  }

  getAllJournal(params?: {}): Observable<JournalDataBase> {
    return this.http.get<JournalDataBase>(`${this.config.apiUrl}${this.entity}withall/`, { params })
  }

  // override getAll(): Observable<Journal[]> {
  //   return this.http.get<Journal[]>(`${this.config.apiUrl}${this.entity}?_expand=user`)
  // }

  async fetchAllForSignal(options: string = '?page_size=1000'): Promise<any> {
    const response = await fetch(`${this.config.apiUrl}${this.entity}withall/${options}`);
    return await response.json()
  }

  getOne(_id: string): Observable<Journal> {
    return this.http.get<Journal>(`${this.config.apiUrl}${this.entity}withall/${_id}/`);
  }

  override async getOneSignal(id: number): Promise<any> {
    const response = await fetch(`${this.config.apiUrl}${this.entity}withall/${id}`);
    return await response.json()
  }
}
