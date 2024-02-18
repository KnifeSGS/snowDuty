export interface InitialJournalData {
  "id": number;
  "person_on_duty": {
    "is_staff": boolean,
    "username": string,
    "email": string,
    "is_active": boolean,
    "groups": string[],
    "user_permissions": string[],
    "id": number,
    "last_name": string,
    "first_name": string
  },
  "date_start": Date | null;
  "date_end": Date | null;
  "dispersion": [
    {
      "id": number;
      "journal": number;
      "man": {
        "is_staff": boolean;
        "username": string;
        "email": string;
        "is_active": boolean;
        "groups": string[];
        "user_permissions": string[];
        "id": number;
        "last_name": string;
        "first_name": string
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
      "is_staff": true,
      "username": "",
      "email": "",
      "is_active": true,
      "groups": [],
      "user_permissions": [],
      "id": 0,
      "last_name": "",
      "first_name": ""
    },
    "date_start": null,
    "date_end": null,
    "dispersion": [
      {
        "id": 0,
        "journal": 0,
        "man": {
          "is_staff": false,
          "username": "",
          "email": "",
          "is_active": false,
          "groups": [],
          "user_permissions": [],
          "id": 0,
          "last_name": "",
          "first_name": ""
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
