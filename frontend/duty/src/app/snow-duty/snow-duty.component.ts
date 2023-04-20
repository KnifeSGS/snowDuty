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

class FieldNames {
  fieldName: "salt" | "cacl2" | "kalcinol" | "mixture" | "zeokal" | "km" | "workHour" | "orderedQuantity" = "salt"
}

@Component({
  selector: 'app-snow-duty',
  templateUrl: './snow-duty.component.html',
  styleUrls: ['./snow-duty.component.scss']
})
export class SnowDutyComponent implements OnInit {

  sumOfDataFields$: BehaviorSubject<Datacontainer[]> = this.dataService.list$

  chartData: any;

  chartOptions: any;

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
    this.dataService.getAll$()
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

    this.initChart();
    this.sumOfDataFields$.subscribe(data => console.log(data));
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

  getDataFromContainer(year: number, month?: number) {
    const params = {
      year: year,
      month: month
    }

    return this.dataService.getOneMonth(params)
  }

  getChartData(field: string, gte?: string, lte?: string) {
    // new Date(Date.UTC(new Date().getFullYear(), 0, 1)).toISOString()
    let today = new Date()
    let thisYear = today.getFullYear()
    let thisMonth = today.getMonth()

    let array: number[] = []
    for (let i = 0; i <= thisMonth; i++) {
      let gte = new Date(thisYear, i, 1).toISOString()
      let lte = new Date(thisYear, i + 1, 0).toISOString()

      this.shiftService.getSumOfShiftsField({ field, gte, lte }).subscribe(sum => {
        if (sum[0]) {
          array.push(sum[0].total)
        } else {
          array.push(0)
        }
        // console.log(array);
        return array
      })
    }
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // let cacl2 = this.getChartData("cacl2")

    this.chartData = {
      labels: ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'],
      datasets: [
        {
          label: 'Só',
          // data: this.getChartData("salt"),
          // data: [null, null, 11, 19, null, null, null,],
          data: [null, null, 11, 19, null, null, null,],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
          borderColor: documentStyle.getPropertyValue('--bluegray-700'),
          tension: .4
        },
        {
          label: 'CaCl2',
          data: [8, 2],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--green-600'),
          borderColor: documentStyle.getPropertyValue('--green-600'),
          tension: .4
        }
      ]
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

}
