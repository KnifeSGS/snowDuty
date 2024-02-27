import { getState, patchState, signalStore, type, withComputed, withMethods, withState } from "@ngrx/signals";
import { computed, inject } from "@angular/core";
import { concatMap, debounceTime, distinctUntilChanged, mergeMap, pipe, switchMap, tap } from "rxjs";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators'
import { WorkerService } from "../services/worker.service";
import { InitialWorkerDataValues, WorkerData } from "../models/worker-data";
import { ApiOptions } from "../models/api-options";
import { DataBase } from "../models/data-base";
import { MessageService } from "primeng/api";
import { addEntity, removeEntity, withEntities } from "@ngrx/signals/entities"

export const WorkerStore = signalStore(
  { providedIn: 'root' },
  withState(InitialWorkerDataValues),
  withEntities<WorkerData>(),
  withComputed(store => {
    return {
      workerNames: computed(() => {
        const names: any[] = []
        store.results().map((worker) => {
          return names.push(worker.name)
        })
        return names
      })
    };
  }),
  withMethods(store => {
    const workerService = inject(WorkerService)
    let query: ApiOptions = new ApiOptions()

    return {
      load: rxMethod<ApiOptions>(
        pipe(
          // debounceTime(1000),
          distinctUntilChanged(),
          switchMap((params) => {
            query = params
            return workerService.getQuery(params)
          }),
          tapResponse({
            next: (response: DataBase<WorkerData>) => {
              patchState(store, response)
            },
            error: console.error
          })
        ),
      ),

      create: rxMethod<any>(
        pipe(
          switchMap((worker) => {
            return workerService.create(worker)
          }),
          // tapResponse({
          //   next: (response) => {
          //     patchState(store, addEntity(response))
          //     patchState(store, {
          //       count: store.count() + 1,
          //       results: [...store.results(), store.entityMap()[response.id]]
          //     })
          //   },
          //   error: console.error
          // }),
          switchMap(() => {
            return workerService.getQuery(query)
          }),
          tapResponse({
            next: (response: DataBase<WorkerData>) => {
              patchState(store, response)
            },
            error: console.error
          }),
        )
      ),

      delete: rxMethod<number | string>(
        pipe(
          switchMap((id) => {
            return workerService.remove(id)
          }),
          switchMap(() => {
            return workerService.getQuery(query)
          }),
          tapResponse({
            next: (response: DataBase<WorkerData>) => {
              patchState(store, response)
            },
            error: console.error
          }),
        ),
      )
    }
  }
  )
)

