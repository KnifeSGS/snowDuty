// import { User } from "src/app/models/user"
// import { CarData } from "./car-data"
// import { DispersionsData } from "./dispersions-data"
// import { JournalData } from "./journal-data"
// import { WorkerData } from "./worker-data"

export interface DataBase<T> {
  'next': string | null,
  'previous': string | null,
  'count': number,
  'total_pages': number,
  'actual_page': number,
  'results': T[]
}

// export interface JournalDataBase extends DataBase {
//   'results': JournalData[]
// }
// export interface UserDataBase extends DataBase {
//   'results': User[]
// }
// export interface DispersionsDataBase extends DataBase {
//   'results': DispersionsData[]
// }
// export interface CarsDataBase extends DataBase {
//   'results': CarData[]
// }
// export interface WorkerDataBase extends DataBase {
//   'results': WorkerData[]
// }
