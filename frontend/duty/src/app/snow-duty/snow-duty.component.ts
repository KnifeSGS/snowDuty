import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-snow-duty',
  templateUrl: './snow-duty.component.html',
  styleUrls: ['./snow-duty.component.scss']
})
export class SnowDutyComponent implements OnInit {

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
    private shiftService: ShiftService
  ) {

  }


  ngOnInit() {
    this.initChart();

    this.getSums('salt')
    this.getSums('cacl2')
    this.getSums('kalcinol')
    this.getSums('mixture')
    this.getSums('zeokal')
    this.getSums('km')
    this.getSums('workHour')
    this.getSums('orderedQuantity')

    this.getSums('salt', this.startingDay)
    this.getSums('cacl2', this.startingDay)
    this.getSums('kalcinol', this.startingDay)
    this.getSums('mixture', this.startingDay)
    this.getSums('zeokal', this.startingDay)
    this.getSums('km', this.startingDay)
    this.getSums('workHour', this.startingDay)
    this.getSums('orderedQuantity', this.startingDay)
  }

  getSums(field: "salt" | "cacl2" | "kalcinol" | "mixture" | "zeokal" | "km" | "workHour" | "orderedQuantity", gte?: string) {
    let fieldName: "salt" | "cacl2" | "kalcinol" | "mixture" | "zeokal" | "km" | "workHour" | "orderedQuantity" = field

    if (gte) {
      this.shiftService.getSumOfShiftsField({ field, gte }).subscribe(sum => {
        this.sumsYear[fieldName] = sum[0].total
      });
    } else {
      this.shiftService.getSumOfShiftsField({ field }).subscribe(sum => {
        this.sums[fieldName] = sum[0].total
      });

    }
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartData = {
      labels: ['január', 'február', 'március', 'április', 'május', 'június', 'július'],
      datasets: [
        {
          label: 'Só',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
          borderColor: documentStyle.getPropertyValue('--bluegray-700'),
          tension: .4
        },
        {
          label: 'CaCl2',
          data: [28, 48, 40, 19, 86, 27, 90],
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
