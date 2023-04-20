import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Datacontainer } from '../models/datacontainer';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DatacontainerService extends BaseService<Datacontainer> {

  sumOfData$: BehaviorSubject<Datacontainer[]> = new BehaviorSubject<Datacontainer[]>([])

  constructor(
    public override config: ConfigService,
    public override http: HttpClient
  ) {
    super(config, http);
    this.entity = 'datacontainer';
  }

  getOneMonth(params: {}): Observable<Datacontainer[]> {
    return this.http.get<Datacontainer[]>(`${this.config.apiUrl}${this.entity}/month`, { params });
  }

  getOneYear(params: {}) {
    this.sumOfData$.next([]);
    this.http.get<Datacontainer[]>(`${this.config.apiUrl}${this.entity}/year`, { params }).subscribe(
      entity => this.sumOfData$.next(entity)
    )
  }
}
