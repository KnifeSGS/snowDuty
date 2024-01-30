import { User } from "src/app/models/user";
import { Item } from "./item";

export class Shift {
  _id?: string = '';
  journalId?: string = '';
  date?: Date = new Date();
  onDuty?: User = new User();
  daytime?: number = 0;
  machine?: string = "";
  salt?: number = 0;
  basalt?: number = 0;
  cacl2?: number = 0;
  kalcinol?: number = 0;
  mixture?: number = 0;
  zeokal?: number = 0;
  km?: string;
  workHour?: number = 0;
  orderedQuantity?: number = 0;
  id?: number;
  journal?: number | string;
  dispersion_start?: Date;
  dispersion_end?: Date;
  man?: number;
  car?: number;
  szortak?: Item[];
}
