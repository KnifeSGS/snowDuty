import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { InitialJournalData, InitialJournalDataValues, JournalDataStore } from "../models/initial-journal-data";
import { computed, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "../services/config.service";
import { Observable, debounceTime, distinctUntilChanged, pipe, switchMap, tap } from "rxjs";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators'
import { JournalService } from "../services/journal.service";

export const JournalStore = signalStore(
  { providedIn: 'root' },
  withState(InitialJournalDataValues),
  withComputed(state => {
    return {
      dispersions: computed(() => {
        state.results().map((journal) => {
          return journal.dispersion
        })
      })
    };
  }),
  withMethods(state => {
    const http = inject(HttpClient);
    const config = inject(ConfigService);
    // const journalService = inject(JournalService);

    const getAllJournalInfo = (options: string = '?page_size=1000'): Observable<JournalDataStore> => {
      return http.get<JournalDataStore>(`${config.apiUrl}journalwithall/${options}`)
    }

    return {
      load: rxMethod<string>(
        pipe(
          debounceTime(1000),
          distinctUntilChanged(),
          switchMap((options) => {
            return getAllJournalInfo(options)
          }),
          tapResponse({
            next: (response) => {
              // console.log(response);
              patchState(state, {
                'results': response.results,
                'actual_page': response.actual_page,
                'total_pages': response.total_pages
              })
            },
            error: console.error
          }),
          // tap(() => {
          //   console.log(state);
          // })
        ),
      )
    }
  }
  )
)

