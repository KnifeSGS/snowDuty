import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/login/services/auth.service';
import { User } from 'src/app/models/user';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  user$: BehaviorSubject<User | null> = this.auth.currentUserSubject$;

  user = signal(null)

  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    public layoutService: LayoutService,
    private auth: AuthService
  ) {
    this.user$.subscribe(
      resp => {
        // if (this.user$ !== null) {
        //   this.user.set(resp)
        // }
        console.log(resp);
      }
    );
  }

  onLogout(): void {
    this.auth.logout()
  }
}
