import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Journal } from '../models/journal';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class JournalService extends BaseService<Journal> {

  constructor(
    public override config: ConfigService,
    public override http: HttpClient,
  ) {
    super(config, http);
    this.entity = 'journal';
  }

  // override getAll(): Observable<Journal[]> {
  //   return this.http.get<Journal[]>(`${this.config.apiUrl}${this.entity}?_expand=user`)
  // }
}
