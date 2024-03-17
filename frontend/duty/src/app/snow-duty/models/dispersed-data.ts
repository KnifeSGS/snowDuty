import { CompoundData } from "./compound-data";
import { StorageData } from "./storage-data";

export class DispersedData {
  "active"?: boolean;
  "id": number | string;
  "change_type": string;
  "dispersion": number | string;
  "storage": StorageData;
  "weight_in_kg": string;
  "compound": CompoundData;
  "version"?: number;
  "main_account"?: null | number | string
}

export class DispersedTable {
  "dispersionID": number | string | undefined;
  "szortID": number | string;
  "szortNeve": string;
  "szorasMennyisege": number | string
}
