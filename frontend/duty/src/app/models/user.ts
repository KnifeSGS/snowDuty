import { JournalData } from "../snow-duty/models/journal-data";
import { Shift } from "../snow-duty/models/shift";

export class User {
  _id?: string = '';
  id?: string | number = '';
  first_name: string = "";
  last_name: string = "";
  full_name?: string = "";
  email: string = "";
  role?: number = 0;
  active?: boolean = true;
  // is_active?: boolean = true;
  is_active?: string = "";
  // is_staff?: boolean = true;
  is_staff?: string = "";
  token?: string = "";
  access?: string = "";
  refresh?: string = "";
  password?: string = "";
  password2?: string = "";
  journals?: JournalData[] = [];
  shifts?: Shift[] = [];
  user?: string = '';
  username?: string = '';
  groups?: UserGroups[];
  user_permissions?: UserPermissions[];
  loginTime?: Date;
}

export class UserGroups {
  id?: number;
  name?: string;
}

export class UserPermissions {
  id?: number;
  name?: string;
}
