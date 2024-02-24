import { CarData } from "./car-data";
import { DispersedData } from "./dispersed-data";
import { WorkerData } from "./worker-data";

export class DispersionsData {
  "id": number;
  "journal": number;
  "man": WorkerData;
  "car": CarData;
  "km": string;
  "szortak": DispersedData[];
  "dispersion_start": Date | null;
  "dispersion_end": Date | null;
  "version"?: number
}
