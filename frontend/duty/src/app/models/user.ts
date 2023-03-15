import { Journal } from "../snow-duty/models/journal";
import { Shift } from "../snow-duty/models/shift";

export class User {
  _id?: string = '';
  first_name: string = "";
  last_name: string = "";
  full_name: string = "";
  email: string = "";
  password: string = "";
  role: number = 0;
  token: string = "";
  active: boolean = true;
  journals: Journal[] = [];
  shifts: Shift[] = []
}
