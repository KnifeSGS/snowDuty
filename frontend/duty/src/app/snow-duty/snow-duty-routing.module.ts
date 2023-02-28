import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SnowDutyComponent } from './snow-duty.component';

const routes: Routes = [{ path: '', component: SnowDutyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnowDutyRoutingModule { }
