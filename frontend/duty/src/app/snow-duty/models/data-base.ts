import { InitialDispersionsData } from "./initial-dispersions-data"
import { InitialJournalData } from "./initial-journal-data"
import { InitialUserData } from "./initial-user-data"

export interface DataBase {
  'next': string | null,
  'previous': string | null,
  'count': number,
  'total_pages': number,
  'actual_page': number,
}

export interface JournalDataBase extends DataBase {
  'results': InitialJournalData[]
}
export interface UserDataBase extends DataBase {
  'results': InitialUserData[]
}
export interface DispersionsDataBase extends DataBase {
  'results': InitialDispersionsData[]
}
