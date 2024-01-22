import { User } from "src/app/models/user";
import { Shift } from "./shift";

export class Monitoring {
  journal?: number = 0;
  id?: number = 0;
  start_time?: string = '';
  checking?: number = 0;
  temperature?: number = 0;
  percipitation?: string = '';
  sky?: string = '';
  visibility?: string = '';
  roads?: string = ''
}

export class Comment {
  id?: number;
  comment?: string;
  journal?: number
}

export class Journal {
  _id?: string = '';
  id?: number;
  worker?: User = new User();
  person_on_duty?: string;
  person_on_duty_name?: string;
  date?: Date = new Date();
  date_start?: Date = new Date();
  date_end?: Date = new Date();
  checks?: Monitoring[] | [] = [];
  monitor?: Monitoring[] | [] = [];
  shifts?: Shift[] = [new Shift()];
  comment?: [string[]] = [['']];
  comments?: Comment[] = [{}];
  dispersion?: Shift[] = [];
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
