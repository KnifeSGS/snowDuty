import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './components/editor/editor.component';
import { ShiftViewerComponent } from './components/shift-viewer/shift-viewer.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { SnowDutyComponent } from './snow-duty.component';

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
    component: ViewerComponent
  },
  {
    path: 'viewer/:id',
    component: EditorComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnowDutyRoutingModule { }
