import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

interface Role {
  name: string;
  code: number
}

export const passwordValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password');
  const password2 = control.get('password2');

  return password && password2 && password.value === password2.value
    ? null
    : { uniqPassword: true };
};

@Component({
  selector: 'app-user-creator',
  templateUrl: './user-creator.component.html',
  styleUrls: ['./user-creator.component.scss']
})
export class UserCreatorComponent implements OnInit {

  user: User = new User()
  mobile: boolean = false
  userForm: FormGroup
  roles: Role[] | undefined

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      username: [''],
      email: ['', Validators.required],
      role: [''],
      is_active: false,
      is_staff: false,
      password: ['', Validators.minLength(6)],
      password2: ['', Validators.minLength(6)],
    }, { validators: passwordValidator })
  }

  ngOnInit() {
    if (window.screen.width < 420) { // 768px portrait
      this.mobile = true;
    };

    this.roles = [
      {
        name: "Admin",
        code: 0
      },
      {
        name: "Vezető",
        code: 1
      },
      {
        name: "Alkalmazott",
        code: 2
      }
    ]
  }

  userDataBuilder() {
    const { first_name, last_name, username, email, is_active, is_staff, password } = this.userForm.value;
    this.user = {
      first_name,
      last_name,
      username,
      email,
      is_active,
      is_staff,
      password

    }
  }

  buildForm() {
    this.userDataBuilder();
    this.userService.create(this.user)
      .subscribe(
        () => this.userService.getAll$()
      )
  }

}
