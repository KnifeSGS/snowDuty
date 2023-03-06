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
      "notContains": "Not contains",
      "endsWith": "Ends with",
      "equals": "Equals",
      "notEquals": "Not equals",
      "noFilter": "No Filter",
      "lt": "Less than",
      "lte": "Less than or equal to",
      "gt": "Greater than",
      "gte": "Greater than or equal to",
      "is": "Is",
      "isNot": "Is not",
      "before": "Before",
      "after": "After",
      "dateIs": "Date is",
      "dateIsNot": "Date is not",
      "dateBefore": "Date is before",
      "dateAfter": "Date is after",
      // "clear": "Clear",
      "apply": "Apply",
      "matchAll": "Match All",
      "matchAny": "Match Any",
      "addRule": "Add Rule",
      "removeRule": "Remove Rule",
      "accept": "Yes",
      "reject": "No",
      "choose": "Choose",
      "upload": "Upload",
      "cancel": "Cancel",
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
      "weak": "Weak",
      "medium": "Medium",
      "strong": "Strong",
      "passwordPrompt": "Enter a password",
      "emptyMessage": "No results found",
      "emptyFilterMessage": "No results found"
    });
  }
}
