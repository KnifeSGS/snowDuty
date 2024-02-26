import { HttpClient, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { ConfigService } from './config.service';
import { ApiOptions } from '../models/api-options';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  entity: string = '';

  list$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([])

  constructor(
    public config: ConfigService,
    public http: HttpClient
  ) { }

  getAll(params?: {}): Observable<T> {
    return this.http.get<T>(`${this.config.apiUrl}${this.entity}/`, { params });
  }

  // getAll$() {
  //   this.list$.next([]);
  //   this.http.get<T[]>(`${this.config.apiUrl}${this.entity}/`).subscribe(
  //     entity => this.list$.next(entity)
  //   )
  // }

  get(id: string): Observable<T> {
    return this.http.get<T>(`${this.config.apiUrl}${this.entity}/${id}/`);
  }

  create(entity: T): Observable<T> {
    // console.log("ezt hoznám létre: ", entity);
    return this.http.post<T>(
      `${this.config.apiUrl}${this.entity}/`,
      entity
    );
  }

  update(entity: T, id: number | string): Observable<T> {
    return this.http.patch<T>(
      `${this.config.apiUrl}${this.entity}/${entity}${id}/`,
      entity
    );
  }

  remove(id: string | number): Observable<T> {
    return this.http.delete<T>(`${this.config.apiUrl}${this.entity}/${id}/`);
  }

  async fetchForSignal(options: string = '?page_size=1000'): Promise<any> {
    const response = await fetch(`${this.config.apiUrl}${this.entity}/${options}`);
    return await response.json()
  }
  async getOneSignal(id: number, options?: string): Promise<any> {
    const response = await fetch(`${this.config.apiUrl}${this.entity}/${id}${options}`);
    return await response.json()
  }

}