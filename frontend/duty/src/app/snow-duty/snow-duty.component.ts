import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Datacontainer } from './models/datacontainer';
import { DatacontainerService } from './services/datacontainer.service';
import { ShiftService } from './services/shift.service';

class Sum {
  salt: number = 0;
  cacl2: number = 0;
  kalcinol: number = 0;
  mixture: number = 0;
  zeokal: number = 0;
  km: number = 0;
  workHour: number = 0;
  orderedQuantity: number = 0;
}

class DateRequest {
  gte: string = '';
  lte: string = ''
}

type FieldName = "salt" | "cacl2" | "kalcinol" | "mixture" | "zeokal" | "km" | "workHour" | "orderedQuantity"

@Component({
  selector: 'app-snow-duty',
  templateUrl: './snow-duty.component.html',
  styleUrls: ['./snow-duty.component.scss']
})
export class SnowDutyComponent implements OnInit {

  sumOfDataFields$: BehaviorSubject<Datacontainer[]> = this.dataService.list$
  chartDataSums: Datacontainer[] | null = null
  chartFields: FieldName[][] =
    [
      ["salt", "cacl2"],
      ["km", "workHour"]
    ];


  startingDay: string = new Date(Date.UTC(new Date().getFullYear(), 0, 1)).toISOString()

  sums: Sum = {
    salt: 0,
    cacl2: 0,
    kalcinol: 0,
    mixture: 0,
    zeokal: 0,
    km: 0,
    workHour: 0,
    orderedQuantity: 0,
  }

  sumsYear: Sum = {
    salt: 0,
    cacl2: 0,
    kalcinol: 0,
    mixture: 0,
    zeokal: 0,
    km: 0,
    workHour: 0,
    orderedQuantity: 0,
  }

  constructor(
    private shiftService: ShiftService,
    private dataService: DatacontainerService
  ) {
    this.dataService.getAll()
    this.sumOfDataFields$.subscribe(data => this.chartDataSums = data);
  }


  ngOnInit() {

    // this.getSums('salt')
    // this.getSums('cacl2')
    // this.getSums('kalcinol')
    // this.getSums('mixture')
    // this.getSums('zeokal')
    // this.getSums('km')
    // this.getSums('workHour')
    // this.getSums('orderedQuantity')
    this.getAllSums()

    // this.getSums('salt', this.startingDay)
    // this.getSums('cacl2', this.startingDay)
    // this.getSums('kalcinol', this.startingDay)
    // this.getSums('mixture', this.startingDay)
    // this.getSums('zeokal', this.startingDay)
    // this.getSums('km', this.startingDay)
    // this.getSums('workHour', this.startingDay)
    // this.getSums('orderedQuantity', this.startingDay)
    this.getAllSums(this.startingDay)
  }

  getSums(field: "salt" | "cacl2" | "kalcinol" | "mixture" | "zeokal" | "km" | "workHour" | "orderedQuantity", gte?: string, lte?: string) {
    let fieldName: "salt" | "cacl2" | "kalcinol" | "mixture" | "zeokal" | "km" | "workHour" | "orderedQuantity" = field

    if (gte && lte) {
      this.shiftService.getSumOfShiftsField({ field, gte, lte }).subscribe(sum => {
        this.sums[fieldName] = sum[0].total
      });
    } else if (gte && !lte) {
      this.shiftService.getSumOfShiftsField({ field, gte }).subscribe(sum => {
        this.sumsYear[fieldName] = sum[0].total
      });
    } else {
      this.shiftService.getSumOfShiftsField({ field }).subscribe(sum => {
        this.sums[fieldName] = sum[0].total
      });
    }
  };

  getAllSums(gte?: string) {
    // let field: "salt" | "cacl2" | "kalcinol" | "mixture" | "zeokal" | "km" | "workHour" | "orderedQuantity"
    let fields:
      ["salt", "cacl2", "kalcinol", "mixture", "zeokal", "km", "workHour", "orderedQuantity"] =
      ["salt", "cacl2", "kalcinol", "mixture", "zeokal", "km", "workHour", "orderedQuantity"];

    fields.forEach(field => {
      // field = field
      if (gte) {
        this.shiftService.getSumOfShiftsField({ field, gte }).subscribe(sum => {
          this.sumsYear[field] = sum[0].total
        });
      } else {
        this.shiftService.getSumOfShiftsField({ field }).subscribe(sum => {
          this.sums[field] = sum[0].total
        });

      }
    });
  }

}
