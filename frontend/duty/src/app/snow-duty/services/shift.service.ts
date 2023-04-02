import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Shift } from '../models/shift';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ShiftService extends BaseService<Shift>  {

  shifts$: BehaviorSubject<Shift[]> = new BehaviorSubject<Shift[]>([])

  constructor(
    public override config: ConfigService,
    public override http: HttpClient
  ) {
    super(config, http);
    this.entity = 'shift';
  }

  getAllForOneJournal$(_id: string) {
    this.shifts$.next([]);
    this.http.get<Shift[]>(`${this.config.apiUrl}${this.entity}/${_id}/shifts`).subscribe(
      entity => this.shifts$.next(entity)
    )
  }
}
