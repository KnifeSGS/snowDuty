import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnowDutyRoutingModule } from './snow-duty-routing.module';
import { SnowDutyComponent } from './snow-duty.component';


@NgModule({
  declarations: [
    SnowDutyComponent
  ],
  imports: [
    CommonModule,
    SnowDutyRoutingModule
  ]
})
export class SnowDutyModule { }
