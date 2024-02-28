import { getState, patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { InitialJournalDataValues, JournalData } from "../models/journal-data";
import { computed, inject } from "@angular/core";
import { Observable, debounceTime, distinctUntilChanged, mergeMap, pipe, switchMap } from "rxjs";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators'
import { JournalService } from "../services/journal.service";
import { ApiOptions } from "../models/api-options";
import { DataBase } from "../models/data-base";

export const JournalStore = signalStore(
  { providedIn: 'root' },
  withState(InitialJournalDataValues),
  withComputed(store => {
    return {
      dispersions: computed(() => {
        store.results().map((journal) => {
          return journal.dispersion
        })
      })
    };
  }),
  withMethods(store => {
    const journalService = inject(JournalService);
    let query: ApiOptions = new ApiOptions()

    return {
      load: rxMethod<ApiOptions>(
        pipe(
          // debounceTime(1000),
          distinctUntilChanged(),
          switchMap((params) => {
            query = params
            return journalService.getQuery(params)
          }),
          tapResponse({
            next: (response: DataBase<JournalData>) => {
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
          switchMap((journal) => {
            return journalService.create(journal)
          }),
          switchMap(() => {
            return journalService.getQuery(query)
          }),
          tapResponse({
            next: (response: DataBase<JournalData>) => {
              patchState(store, response)
              const state = getState(store)
              console.log(state);
            },
            error: console.error
          }),
        )
      ),

      delete: rxMethod<number | string>(
        pipe(
          mergeMap((id) => {
            return journalService.remove(id)
          }),
          mergeMap(() => {
            return journalService.getQuery(query)
          }),
          tapResponse({
            next: (response: DataBase<JournalData>) => {
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

