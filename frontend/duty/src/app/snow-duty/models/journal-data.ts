import { DataBase } from "./data-base";
import { DispersionsData } from "./dispersions-data";
import { WorkerData } from "./worker-data";

export class JournalData {
  "id"?: number;
  "person_on_duty"?: WorkerData;
  "date_start"?: Date | null;
  "date_end"?: Date | null;
  "dispersion"?: DispersionsData[];
  "monitor"?: Monitoring[] | [];
  "comments"?: string[]
}

export interface Monitoring {
  "journal"?: number;
  "id"?: number;
  "start_time"?: string;
  "checking"?: number;
  "temperature"?: number;
  "percipitation"?: string;
  "sky"?: string;
  "visibility"?: string;
  "roads"?: string
}

export const InitialJournalDataValues: DataBase<JournalData> = {
  'next': null,
  'previous': null,
  'count': 0,
  'total_pages': 0,
  'actual_page': 0,
  'results': [{
    "id": 0,
    "person_on_duty": {
      "id": 0,
      "name": "",
      "first_name": "",
      "last_name": "",
    },
    "date_start": null,
    "date_end": null,
    "dispersion": [
      {
        "id": 0,
        "journal": 0,
        "man": {
          "id": 0,
          "name": "",
          "first_name": "",
          "last_name": "",
        },
        "car": {
          "id": 0,
          "name": "",
          "licence_plate": "",
          "max_weight": "",
          "brand": "",
          "model": ""
        },
        "km": "",
        "szortak": [
          {
            "id": 0,
            "change_type": "",
            "dispersion": 0,
            "storage": {
              "id": 0,
              "name": "",
              "address": ""
            },
            "weight_in_kg": "0",
            "compound": {
              "id": 0,
              "name": "",
              "is_used": true,
              "stock": "",
              "elements_list": []
            },
            "main_account": null
          }
        ],
        "dispersion_start": null,
        "dispersion_end": null,
      }
    ],
    "monitor": [],
    "comments": []
  }]
}
