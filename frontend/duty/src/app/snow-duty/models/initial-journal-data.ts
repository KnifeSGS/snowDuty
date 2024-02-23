export interface InitialJournalData {
  "id": number;
  "person_on_duty": {
    "name": string,
  },
  "date_start": Date | null;
  "date_end": Date | null;
  "dispersion": [
    {
      "id": number;
      "journal": number;
      "man": {
        "name": string
      };
      "car": {
        "id": number;
        "name": string;
        "licence_plate": string;
        "max_weight": string;
        "brand": string;
        "model": string
      };
      "km": string;
      "szortak": [
        {
          "id": number;
          "change_type": string;
          "dispersion": number;
          "storage": {
            "id": number;
            "name": string;
            "address": string
          };
          "weight_in_kg": string;
          "compound": {
            "id": number;
            "name": string;
            "is_used": boolean;
            "stock": string;
            "elements_list": string[];
            "ratios": number
          };
          "main_account": null
        }
      ];
      "dispersion_start": Date | null;
      "dispersion_end": Date | null;
    }
  ];
  "monitor": [];
  "comments": string[]
}

export interface JournalDataStore {
  'next': string | null,
  'previous': string | null,
  'count': number,
  'total_pages': number,
  'actual_page': number,
  'results': InitialJournalData[]
}

export const InitialJournalDataValues: JournalDataStore = {
  'next': null,
  'previous': null,
  'count': 0,
  'total_pages': 0,
  'actual_page': 0,
  'results': [{
    "id": 0,
    "person_on_duty": {
      "name": ""
    },
    "date_start": null,
    "date_end": null,
    "dispersion": [
      {
        "id": 0,
        "journal": 0,
        "man": {
          "name": ""
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
              "elements_list": [],
              "ratios": 0
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
