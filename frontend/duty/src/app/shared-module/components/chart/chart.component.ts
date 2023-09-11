import { Component, Input, OnInit } from '@angular/core';
import { Datacontainer } from 'src/app/snow-duty/models/datacontainer';

type FieldName = "salt" | "cacl2" | "kalcinol" | "mixture" | "zeokal" | "km" | "workHour" | "orderedQuantity"

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  chartData: any;

  chartOptions: any;

  @Input() chartSums: Datacontainer[] | null = null
  @Input() chartFields: FieldName[] = []

  ngOnInit() {
    this.initChart()
  }

  chartDataCreator(field: FieldName) {
    let dataTable: (undefined | number)[] = [, , , , , , , , , , , ,]
    this.chartSums?.forEach(data => {
      // console.log(data[field]);
      dataTable[data.month - 1] = data[field]
    })
    return dataTable
  }

  initChart() {
    const fieldNamesTranslate = {
      salt: "Só",
      basalt: "Bazalt",
      cacl2: "CaCl2",
      kalcinol: "Kalcinol",
      mixture: "Keverék",
      zeokal: "Zeokal",
      km: "km",
      workHour: "Munkaóra",
      orderedQuantity: "Megrendelt mennyiség",
    };

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // let cacl2 = this.getChartData("cacl2")

    this.chartData = {
      labels: ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'],
      datasets: [
        {
          label: fieldNamesTranslate[this.chartFields[0]],
          data: this.chartDataCreator(this.chartFields[0]),
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
          borderColor: documentStyle.getPropertyValue('--bluegray-700'),
          tension: .4
        },
        {
          label: fieldNamesTranslate[this.chartFields[1]],
          data: this.chartDataCreator(this.chartFields[1]),
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
