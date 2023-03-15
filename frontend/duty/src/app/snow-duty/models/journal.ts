import { User } from "src/app/models/user";
import { Shift } from "./shift";

export class Monitoring {
  checking?: number = 0;
  temperature?: number = 0;
  percipitation?: string = '';
  sky?: string = '';
  visibility?: string = '';
  roads?: string = ''
}

export class Journal {
  _id?: string = '';
  worker: User = new User();
  date: Date = new Date();
  checks?: Monitoring[] = [new Monitoring()];
  shifts?: Shift[] = [new Shift()];
  comment?: [string[]] = [['']]
}
