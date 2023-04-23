import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-creator',
  templateUrl: './user-creator.component.html',
  styleUrls: ['./user-creator.component.scss']
})
export class UserCreatorComponent implements OnInit {

  user: User = new User()
  mobile: boolean = false
  userForm: FormGroup

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      full_name: [''],
      email: [''],
      role: [''],
      active: ['']
    })
  }

  ngOnInit() {
    if (window.screen.width < 420) { // 768px portrait
      this.mobile = true;
    };
  }

  userDataBuilder() {
    const { first_name, last_name, full_name, email, role, active } = this.userForm.value;
    this.user = {
      first_name,
      last_name,
      full_name: last_name + first_name,
      email,
      role,
      active
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
