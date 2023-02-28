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
        label: 'Home',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/']
          }
        ]
      },
      {
        label: 'Ügyelet',
        items: [
          {
            label: 'Rögzítés',
            icon: 'pi pi-fw pi-check-square',
            routerLink: ['/create']
          },
          {
            label: 'Lekérdezés',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/search']
          },
        ]
      },
    ]
  }
}
