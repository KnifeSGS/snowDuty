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
  id?: number;
  worker?: User = new User();
  person_on_duty?: number;
  date: Date = new Date();
  checks?: Monitoring[] | [] = [];
  shifts?: Shift[] = [new Shift()];
  comment?: [string[]] = [['']];
  version?: number;
  results?: [];
}

export class JournalResponse {
  next: string | null = null;
  previous: string | null = null;
  count: number = 0;
  total_pages: number = 1;
  actual_page: number = 1;
  results: Journal[] = []
}
