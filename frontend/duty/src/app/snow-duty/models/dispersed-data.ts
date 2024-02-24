import { CompoundData } from "./compound-data";
import { StorageData } from "./storage-data";

export class DispersedData {
  "id": number;
  "change_type": string;
  "dispersion": number;
  "storage": StorageData;
  "weight_in_kg": string;
  "compound": CompoundData;
  "version"?: number;
  "main_account"?: any
}
