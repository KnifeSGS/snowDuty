import { DataBase } from "./data-base";

export class WorkerData {
  "id": number | string;
  "first_name"?: string;
  "last_name"?: string;
  "name"?: string;
}

export class Worker {
  "first_name"?: string;
  "last_name"?: string;
  "name"?: string;
}

export const InitialWorkerDataValues: DataBase<WorkerData> = {
  'next': null,
  'previous': null,
  'count': 0,
  'total_pages': 0,
  'actual_page': 0,
  'results': [
    {
      "id": 0,
      "first_name": "",
      "last_name": "",
      "name": ""
    }
  ]
}