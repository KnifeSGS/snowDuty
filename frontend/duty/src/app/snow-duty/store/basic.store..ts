import { signalStore, withState } from '@ngrx/signals';


export const BasicStore = signalStore(
  { providedIn: 'root' },
  withState(
    {

    }
  )
)
