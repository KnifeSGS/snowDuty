import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { JournalResponse } from '../models/journal';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends { _id?: string, id?: string | number, worker?: User, date?: Date }> {

  entity: string = '';

  list$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([])

  constructor(
    public config: ConfigService,
    public http: HttpClient
  ) { }

  getAll(options: string = '?page_size=1000'): Observable<T[]> {
    return this.http.get<T[]>(`${this.config.apiUrl}${this.entity}/${options}`);
    // return new Observable<T[]>( observer => {
    //   let currentData: T[] = [];
    //   this.http.get<T[]>(`${this.config.apiUrl}${this.entity}`).subscribe(
    //     data => {
    //       currentData = data;
    //       observer.next(data);
    //     }
    //   );

    //   interval(5000).subscribe(
    //     num => currentData[0].price = Math.round(Math.random() * 10000)
    //   );
    // });
  }

  getAll$() {
    this.list$.next([]);
    this.http.get<T[]>(`${this.config.apiUrl}${this.entity}/`).subscribe(
      entity => this.list$.next(entity)
    )
  }

  get(id: string): Observable<T> {
    return this.http.get<T>(`${this.config.apiUrl}${this.entity}/${id}/`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(
      `${this.config.apiUrl}${this.entity}/`,
      entity
    );
  }

  update(entity: T): Observable<T> {
    return this.http.patch<T>(
      `${this.config.apiUrl}${this.entity}/${entity.id}/`,
      entity
    );
  }

  remove(id: string): Observable<T> {
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