import { Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

interface Groups {
  id: number;
  name: string;
};
interface Permissions {
  id: number;
  name: string;
}

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrl: './user-editor.component.scss'
})
export class UserEditorComponent implements OnInit {

  user!: User

  mobile: boolean = false;
  userForm: FormGroup;
  groups: Groups[] = [];
  permissions: Permissions[] = [];

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      username: [''],
      email: [''],
      groups: [''],
      user_permissions: [''],
      is_active: true,
      is_staff: false
    })
  }

  ngOnInit() {
    if (window.screen.width < 420) { // 768px portrait
      this.mobile = true;
    };

    this.groups = [
      {
        id: 1,
        name: "Hozzáadhat autót jogkör",
      },
    ];

    this.permissions = [
      {
        id: 11,
        name: "Can delete group",
      },
      {
        id: 26,
        name: "Can change Autó"
      }
    ];

  }

  userFormBuilder(user: User) {
    this.userForm = this.fb.group({
      first_name: [user.first_name],
      last_name: [user.last_name],
      username: [user.username],
      email: [user.email],
      groups: [user.groups],
      user_permissions: [user.user_permissions],
      is_active: [user.is_active],
      is_staff: [user.is_staff]
    })
  }

  userDataBuilder() {
    const { first_name, last_name, username, email, groups, user_permissions, is_active, is_staff } = this.userForm.value;
    this.user = {
      first_name,
      last_name,
      username,
      email,
      groups,
      user_permissions,
      is_active,
      is_staff
    }
  }

  buildForm() {
    this.userDataBuilder();
    if (this.user) {
      this.userService.update(this.user)
        .subscribe(
          () => {
            console.log('user updated');
            console.log(this.user);
          }
          // this.userService.getAll$()
        )
    }
  }


}
