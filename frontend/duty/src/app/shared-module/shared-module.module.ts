import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './components/chart/chart.component';
import { ChartModule } from 'primeng/chart';
import { CardComponent } from './components/card/card.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    ChartComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    CardModule,
    ButtonModule
  ],
  exports: [
    ChartModule,
    ChartComponent,
    CardComponent,
    CardModule,
    ButtonModule
  ]
})
export class SharedModule { }
