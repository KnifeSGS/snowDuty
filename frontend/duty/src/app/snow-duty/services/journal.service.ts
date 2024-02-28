import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { DataBase } from '../models/data-base';
import { ApiOptions } from '../models/api-options';
import { Journal, JournalData } from '../models/journal-data';

@Injectable({
  providedIn: 'root'
})
export class JournalService extends BaseService<JournalData> {

  // journals$: BehaviorSubject<Journal[]> = new BehaviorSubject<Journal[]>([])
  journals$: ReplaySubject<DataBase<JournalData>> = new ReplaySubject<DataBase<JournalData>>()

  constructor(
    public override config: ConfigService,
    public override http: HttpClient,
  ) {
    super(config, http);
    this.entity = 'journal';
  }

  getSelectedInterval(params: {}): Observable<DataBase<JournalData>> {
    return this.http.get<DataBase<JournalData>>(`${this.config.apiUrl}${this.entity}/selectedinterval`, { params })
  }

  getAllJournal(params?: {}): Observable<DataBase<JournalData>> {
    return this.http.get<DataBase<JournalData>>(`${this.config.apiUrl}${this.entity}withall/`, { params })
  }

  createJournal(entity: Journal): Observable<Journal> {
    // console.log("ezt hoznám létre: ", entity);
    return this.http.post<Journal>(
      `${this.config.apiUrl}${this.entity}/`,
      entity
    );
  }

  getQuery(params?: {}): Observable<DataBase<JournalData>> {
    return this.http.get<DataBase<JournalData>>(`${this.config.apiUrl}${this.entity}withall/`, { params });
  }


  async fetchAllForSignal(options: string = '?page_size=1000'): Promise<any> {
    const response = await fetch(`${this.config.apiUrl}${this.entity}withall/${options}`);
    return await response.json()
  }

  getOne(_id: string): Observable<JournalData> {
    return this.http.get<JournalData>(`${this.config.apiUrl}${this.entity}withall/${_id}/`);
  }

  override async getOneSignal(id: number): Promise<any> {
    const response = await fetch(`${this.config.apiUrl}${this.entity}withall/${id}`);
    return await response.json()
  }
}
