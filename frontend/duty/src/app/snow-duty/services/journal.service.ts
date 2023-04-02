import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Journal } from '../models/journal';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class JournalService extends BaseService<Journal> {

  journals$: BehaviorSubject<Journal[]> = new BehaviorSubject<Journal[]>([])

  constructor(
    public override config: ConfigService,
    public override http: HttpClient,
  ) {
    super(config, http);
    this.entity = 'journal';
  }

  getSelectedInterval(params: {}) {
    this.journals$.next([]);
    // if (params) {
    this.http.get<Journal[]>(`${this.config.apiUrl}${this.entity}/selectedinterval`, { params }).subscribe(
      entity => this.journals$.next(entity)
    )
    // }
    // this.http.get<Journal[]>(`${this.config.apiUrl}${this.entity}`).subscribe(
    //   entity => this.journals$.next(entity)
    // )
  }

  // override getAll(): Observable<Journal[]> {
  //   return this.http.get<Journal[]>(`${this.config.apiUrl}${this.entity}?_expand=user`)
  // }
}
