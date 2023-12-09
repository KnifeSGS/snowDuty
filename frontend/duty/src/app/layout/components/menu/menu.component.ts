import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  model: any[] = [];

  constructor(
    public layoutService: LayoutService
  ) {

  }

  ngOnInit(): void {
    this.model = [
      {
        label: '',
        items: [
          {
            label: 'Statisztika',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/']
          }
        ]
      },
      {
        label: 'Ügyelet',
        items: [
          {
            label: 'Naplók',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/viewer']
          },
          {
            label: 'Ügyeletek',
            icon: 'pi pi-fw pi-check-square',
            routerLink: ['/shift']
          },
          {
            label: 'Alvállalkozói munkák',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/subs']
          },
          {
            label: 'Beosztás',
            icon: 'pi pi-fw pi-calendar',
            routerLink: ['/schedule']
          },
        ]
      },
      {
        label: 'Karbantartás',
        items: [

          {
            label: 'Felhasználók',
            icon: 'pi pi-fw pi-user',
            routerLink: ['/users']
          },
          {
            label: 'Alvállalkozók',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/subcontractor']
          },
          {
            label: 'Raktárkészlet',
            icon: 'pi pi-fw pi-inbox',
            routerLink: ['/inventory']
          },
          {
            label: 'Eszközök',
            icon: 'pi pi-fw pi-car',
            routerLink: ['/inventory']
          },
        ]
      },
    ]
  }
}
