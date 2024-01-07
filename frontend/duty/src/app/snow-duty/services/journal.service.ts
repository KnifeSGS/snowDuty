import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Journal, JournalResponse } from '../models/journal';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

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

  getAllJournal(params?: {}) {
    // this.journals$.next([]);
    this.http.get<JournalResponse>(`${this.config.apiUrl}${this.entity}/`, { params }).subscribe(
      entity => this.journals$.next(entity)
    )
  }

  // override getAll(): Observable<Journal[]> {
  //   return this.http.get<Journal[]>(`${this.config.apiUrl}${this.entity}?_expand=user`)
  // }
}
