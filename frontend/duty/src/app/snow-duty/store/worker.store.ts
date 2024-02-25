import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { computed, inject } from "@angular/core";
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from "rxjs";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators'
import { WorkerService } from "../services/worker.service";
import { InitialWorkerDataValues, WorkerData } from "../models/worker-data";
import { ApiOptions } from "../models/api-options";

export const WorkerStore = signalStore(
  { providedIn: 'root' },
  withState(InitialWorkerDataValues),
  withState({ 'workerNames2': [] }),
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

    return {
      load: rxMethod<ApiOptions>(
        pipe(
          // debounceTime(1000),
          distinctUntilChanged(),
          switchMap((params) => {
            return workerService.getAll(params)
          }),
          tapResponse({
            next: (response) => {
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
              patchState(store, {

              })
            },
            error: console.error
          })
        )
      )
    }
  }
  )
)

