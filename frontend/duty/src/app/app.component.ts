import { Component } from '@angular/core';
import { FilterMatchMode, PrimeNGConfig } from 'primeng/api';
import { LayoutService } from '../app/layout/services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'duty';

  constructor(
    private primengConfig: PrimeNGConfig,
    private layoutService: LayoutService
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.primengConfig.zIndex = {
      modal: 1100,    // dialog, sidebar
      overlay: 1000,  // dropdown, overlaypanel
      menu: 1000,     // overlay menus
      tooltip: 1100   // tooltip
    };
    this.primengConfig.filterMatchModeOptions = {
      text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
      numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
      date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
    };
    this.primengConfig.setTranslation({
      "startsWith": "Starts with",
      "contains": "Contains",
      "notContains": "Nem tartalmazza",
      "endsWith": "Végződik",
      "equals": "Egyenlő",
      "notEquals": "Nem egyenlő",
      "noFilter": "Nincs szűrés",
      "lt": "Kevesebb mint",
      "lte": "Kevesebb vagy egyenlő mint",
      "gt": "Nagyobb mint",
      "gte": "Nagyobb vagy egyenlő mint",
      "is": "Van",
      "isNot": "Nincs",
      "before": "Előtt",
      "after": "Után",
      "dateIs": "Adott nap",
      "dateIsNot": "Nem adott nap",
      "dateBefore": "Adott nap előtt",
      "dateAfter": "Adott nap után",
      // "clear": "Clear",
      "apply": "Érvényesít",
      "matchAll": "Teljes egyezés",
      "matchAny": "Részleges egyezés",
      "addRule": "Feltétel hozzáadása",
      "removeRule": "Feltétel eltávolítása",
      "accept": "Elfogad",
      "reject": "Visszautasít",
      "choose": "Kiválaszt",
      "upload": "Feltölt",
      "cancel": "Elvet",
      // "dayNames": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      // "dayNamesShort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      // "dayNamesMin": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      // "monthNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      // "monthNamesShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      // "dateFormat": "mm/dd/yy",
      // "firstDayOfWeek": 0,
      // "today": "Today",
      "dateFormat": "mm/dd/yy",
      "firstDayOfWeek": 1,
      "dayNames": ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"],
      "dayNamesShort": ["vas", "hét", "ked", "sze", "csü", "pén", "szo"],
      "dayNamesMin": ["V", "H", "K", "Sz", "Cs", "P", "SZ"],
      "monthNames": ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"],
      "monthNamesShort": ["jan", "feb", "már", "ápr", "máj", "jún", "júl", "aug", "szept", "okt", "nov", "dec"],
      "today": 'Ma',
      "clear": 'Töröl',
      "weekHeader": "Hét",
      "weak": "Gyenge",
      "medium": "Közepes",
      "strong": "Erős",
      "passwordPrompt": "Üsse be a jelszavát",
      "emptyMessage": "Nem találtunk eredményt",
      "emptyFilterMessage": "Nincs a szűrésnek megfelelő eredmény"
    });
    this.layoutService.config = {
      ripple: true,                      //toggles ripple on and off
      inputStyle: 'outlined',             //default style for input elements
      menuMode: 'static',                 //layout mode of the menu, valid values are "static" and "overlay"
      colorScheme: 'light',               //color scheme of the template, valid values are "light" and "dark"
      theme: 'lara-light-teal',         //default component theme for PrimeNG
      scale: 14                           //size of the body font size to scale the whole application
    };
    this.primengConfig.zIndex = {
      modal: 1100,    // dialog, sidebar
      overlay: 1000,  // dropdown, overlaypanel
      menu: 1000,     // overlay menus
      tooltip: 1100   // tooltip
    };
  }
}
