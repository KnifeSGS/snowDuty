import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { DispersionsData, InitialDispersionDataValues } from '../models/dispersions-data';
import { computed, inject } from '@angular/core';
import { DispersedData, DispersedTable } from '../models/dispersed-data';
import { DispersionsService } from '../services/dispersions.service';
import { ApiOptions } from '../models/api-options';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { mergeMap, pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { DataBase } from '../models/data-base';


export const DispersionStore = signalStore(
  { providedIn: 'root' },
  withState(InitialDispersionDataValues),
  withComputed(store => {
    return {
      shifts: computed(() => {
        let shifts: DispersedTable[] = []
        store.results().map((dispersion) => {
          return dispersion.szortak.map((disp) => {
            return shifts.push({
              dispersionID: dispersion.id,
              szortID: disp.id,
              szortNeve: disp.compound.name,
              szorasMennyisege: disp.weight_in_kg
            })
          })
        })
        return shifts
      })
    }
  }),
  withMethods(store => {
    const dispersionService = inject(DispersionsService)
    let query: ApiOptions = new ApiOptions()

    return {
      load: rxMethod<ApiOptions>(
        pipe(
          mergeMap((params) => {
            query = params
            return dispersionService.getAll(params)
          }),
          tapResponse({
            next: (response: DataBase<DispersionsData>) => {
              patchState(store, response)
            },
            error: console.error
          })
        )
      )
    }
  })
)
