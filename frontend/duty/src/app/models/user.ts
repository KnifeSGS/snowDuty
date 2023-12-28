import { Journal } from "../snow-duty/models/journal";
import { Shift } from "../snow-duty/models/shift";

export class User {
  _id?: string = '';
  first_name: string = "";
  last_name: string = "";
  full_name: string = "";
  email: string = "";
  role: number = 0;
  active: boolean = true;
  token?: string = "";
  access?: string = "";
  refresh?: string = "";
  password?: string = "";
  journals?: Journal[] = [];
  shifts?: Shift[] = [];
  user?: string = '';
}
