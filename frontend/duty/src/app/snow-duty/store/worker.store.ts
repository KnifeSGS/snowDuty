import { patchState, signalStore, type, withComputed, withMethods, withState } from "@ngrx/signals";
import { computed, inject } from "@angular/core";
import { debounceTime, distinctUntilChanged, mergeMap, pipe, switchMap, tap } from "rxjs";
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
    const messageService = inject(MessageService)

    return {
      load: rxMethod<ApiOptions>(
        pipe(
          // debounceTime(1000),
          distinctUntilChanged(),
          switchMap((params) => {
            return workerService.getQuery(params)
          }),
          tapResponse({
            next: (response: DataBase<WorkerData>) => {
              patchState(store, {
                'results': response.results,
                'actual_page': response.actual_page,
                'total_pages': response.total_pages,
                'count': response.count,
                'next': response.next,
                'previous': response.previous
              })
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
          tapResponse({
            next: (response) => {
              console.log(response);
              patchState(store, addEntity(response))
              messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: `${response.name} létrehozva`,
                life: 3000
              })
            },
            error: console.error
          }),
          tap(() => {
            console.log(store);
          })
        )
      ),

      delete: rxMethod<number | string>(
        pipe(
          mergeMap((id) => {
            patchState(store, removeEntity(id))
            return workerService.remove(id)
          }),
          tapResponse({
            next: (id) => {

            },
            error: console.error
          }),
        ),
      )
    }
  }
  )
)

