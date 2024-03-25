import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { DTable, DispersionsData, DispersionsTable, InitialDispersionDataValues } from '../models/dispersions-data';
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
        let newResults: DispersionsTable[] = []

        store.results().forEach(element => {
          const dispersion: DispersionsTable = new DispersionsTable()
          let compounds: DTable[] = []
          element.szortak.forEach((e) => {
            compounds.push({
              header: e.compound.name,
              field: e.weight_in_kg
            })
          })

          const start = new Date(element.dispersion_start)
          const end = new Date(element.dispersion_end)
          const diff = (end.getTime() - start.getTime())

          dispersion.id = element.id!
          dispersion.car = element.car?.licence_plate
          dispersion.compounds = compounds
          dispersion.journal = element.journal
          dispersion.km = element.km
          dispersion.man = element.man?.name
          dispersion.orderedQuantity = element.ovs
          dispersion.start = element.dispersion_start
          dispersion.workHour = diff / (1000 * 60)

          newResults.push(dispersion)
        });
        return newResults
      })
    }
  }),
  withComputed(store => {
    return {
      table: computed(() => {
        let table: any = [
          {
            header: 'Munkakezdés',
            field: 'dispersion_start'
          },
          {
            header: 'Dolgozó',
            field: 'man.name'
          },
          {
            header: 'Műszak',
            field: 'daytime'
          },
          {
            header: 'Gép',
            field: 'car.licence_plate'
          },
          {
            header: 'km',
            field: 'km'
          },
          {
            header: 'üzemóra',
            field: 'workHour'
          },
          {
            header: 'Elrendelt szórási mennyiség',
            field: 'orderedQuantity'
          }
        ]
        // store.shifts().forEach((elements: { anyagok: any[]; }) => {
        //   elements.anyagok.forEach((e) => {
        //     table.push(
        //       {
        //         header: e.name,
        //         value: e.weight
        //       }
        //     )
        //   })
        // })
        return table
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
          }),
          // tapResponse({
          //   next: (response: DataBase<DispersionsData>) => {
          //     console.log(response);
          //     let newResults: any = []
          //     let result: any = {}
          //     const wip = response.results.forEach(element => {
          //       const szortak = element.szortak.forEach((e) => {
          //         result[e.compound.name] = e.weight_in_kg
          //       })

          //       result.id = element.id
          //       result.dispersion_start = element.dispersion_start
          //       result.dispersion_end = element.dispersion_end
          //       result.car = element.car?.licence_plate
          //       result.journal = element.journal
          //       result.km = element.km
          //       result.man = element.man?.name

          //       newResults.push(result)
          //     });
          //     console.log(newResults);
          //     // patchState(store, {
          //     //   results=
          //     // })
          //   },
          //   error: console.error
          // })
        )
      )
    }
  })
)
