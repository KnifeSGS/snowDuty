import { User } from "src/app/models/user";

export class Shift {
  _id?: string = '';
  journalId: string = '';
  date?: Date = new Date();
  onDuty: User = new User();
  daytime?: number = 0;
  machine?: string = "";
  salt?: number = 0;
  cacl2?: number = 0;
  kalcinol?: number = 0;
  mixture?: number = 0;
  zeokal?: number = 0;
  km?: number = 0;
  workHour?: number = 0;
  orderedQuantity?: number = 0
}
