import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'duty';

  constructor(
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
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
  }
}
