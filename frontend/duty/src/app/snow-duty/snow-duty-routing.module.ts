import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalEditorComponent } from './components/journal-editor/journal-editor.component';
import { ShiftViewerComponent } from './components/shift-viewer/shift-viewer.component';
import { JournalViewerComponent } from './components/journal-viewer/journal-viewer.component';
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
    component: JournalViewerComponent
  },
  {
    path: 'viewer/:id',
    component: JournalEditorComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnowDutyRoutingModule { }
