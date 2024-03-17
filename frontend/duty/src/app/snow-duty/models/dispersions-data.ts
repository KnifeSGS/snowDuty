import { CarData } from "./car-data";
import { DataBase } from "./data-base";
import { DispersedData } from "./dispersed-data";
import { WorkerData } from "./worker-data";

export class DispersionsData {
  "id"?: number | string;
  "active"?: boolean;
  "journal"?: number | string;
  "man"?: WorkerData;
  "car"?: CarData;
  "km"?: number | string;
  "szortak": DispersedData[];
  "dispersion_start"?: Date | null;
  "dispersion_end"?: Date | null;
  "version"?: number;

  "daytime"?: boolean;
  "workHour"?: number | string;
  "orderedQuantity"?: number | string
}

export const InitialDispersionDataValues: DataBase<DispersionsData> = {
  'next': null,
  'previous': null,
  'count': 0,
  'total_pages': 0,
  'actual_page': 0,
  'results': [{
    "id": 0,
    "active": true,
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

    "daytime": true,
    "workHour": 0,
    "orderedQuantity": 0
  }]
}
