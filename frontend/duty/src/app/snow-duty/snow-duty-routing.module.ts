import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalEditorComponent } from './components/journal-editor/journal-editor.component';
import { ShiftViewerComponent } from './components/shift-viewer/shift-viewer.component';
import { JournalViewerComponent } from './components/journal-viewer/journal-viewer.component';
import { SnowDutyComponent } from './snow-duty.component';
import { InventoryViewerComponent } from './components/inventory-viewer/inventory-viewer.component';
import { SubcontractorComponent } from './components/subcontractor/subcontractor.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { UserViewerComponent } from './components/user-viewer/user-viewer.component';
import { SubcontractsComponent } from './components/subcontracts/subcontracts.component';
import { UserEditorComponent } from './components/user-editor/user-editor.component';
import { CarsViewerComponent } from './components/cars-viewer/cars-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: SnowDutyComponent
  },
  {
    path: 'shift',
    component: ShiftViewerComponent
  },
  {
    path: 'viewer',
    component: JournalViewerComponent
  },
  {
    path: 'viewer/:id',
    component: JournalEditorComponent
  },
  {
    path: 'inventory',
    component: InventoryViewerComponent
  },
  {
    path: 'subcontractor',
    component: SubcontractorComponent
  },
  {
    path: 'schedule',
    component: ScheduleComponent
  },
  {
    path: 'users',
    component: UserViewerComponent
  },
  {
    path: 'users/:id',
    component: UserEditorComponent
  },
  {
    path: 'subs',
    component: SubcontractsComponent
  },
  {
    path: 'cars',
    component: CarsViewerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnowDutyRoutingModule { }
