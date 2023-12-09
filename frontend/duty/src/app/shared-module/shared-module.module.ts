import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './components/chart/chart.component';
import { ChartModule } from 'primeng/chart';
import { CardComponent } from './components/card/card.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [
    ChartComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    CardModule,
    ButtonModule,
    ToggleButtonModule,
    InputSwitchModule,
    DropdownModule,
    InputTextModule
  ],
  exports: [
    ChartModule,
    ChartComponent,
    CardComponent,
    CardModule,
    ButtonModule,
    ToggleButtonModule,
    InputSwitchModule,
    DropdownModule,
    InputTextModule
  ]
})
export class SharedModule { }
