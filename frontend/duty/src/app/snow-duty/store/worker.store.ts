import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { inject } from "@angular/core";
import { debounceTime, distinctUntilChanged, pipe, switchMap } from "rxjs";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators'
import { WorkerService } from "../services/worker.service";
import { InitialWorkerDataValues } from "../models/worker-data";
import { ApiOptions } from "../models/api-options";

export const WorkerStore = signalStore(
  { providedIn: 'root' },
  withState(InitialWorkerDataValues),
  withComputed(store => {
    return {

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
          }),
          // tap(() => {
          //   console.log(state);
          // })
        ),
      ),

      deleteJournal() {

      }
    }
  }
  )
)

