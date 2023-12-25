import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from '../layout/services/layout.service';
import { User } from '../models/user';
import { AuthService } from './services/auth.service';
import { LoginUserService } from './services/login-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user: User = new User();
  serverError = '';

  valCheck: string[] = ['remember'];

  // password!: string;

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    public layoutService: LayoutService,
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private loginUserService: LoginUserService
  ) {
    this.loginForm = this.fb.group({
      id_username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      surnam: '',
      lastname: '',
      id_username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  onLogin(): void {
    console.log('login');
    // this.auth.login(this.loginForm.value).toPromise().then(
    //   userResponse => {
    //     if (this.auth.currentUserValue) {
    //       this.router.navigate(['/']);
    //     }
    //   },
    //   err => {
    //     this.serverError = err.error;
    //     const to = setTimeout(() => {
    //       clearTimeout(to);
    //       this.serverError = '';
    //     }, 3000)
    //   }
    // )
    this.auth.login(this.loginForm.value).subscribe(
      userResponse => {
        if (this.auth.currentUserValue) {
          this.router.navigate(['/']);
        }
      }
    )
  }


  setPassword(): void {
    this.loginUserService.update(this.registerForm.value)
      .subscribe(resp => console.log(resp))
  }
}
