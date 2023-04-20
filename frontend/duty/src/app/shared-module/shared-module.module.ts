import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './components/chart/chart.component';
import { ChartModule } from 'primeng/chart';



@NgModule({
  declarations: [
    ChartComponent
  ],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [
    ChartModule,
    ChartComponent
  ]
})
export class SharedModule { }
