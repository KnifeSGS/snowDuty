import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatorComponent } from './components/creator/creator.component';
import { EditorComponent } from './components/editor/editor.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { SnowDutyComponent } from './snow-duty.component';

const routes: Routes = [
  {
    path: '',
    component: SnowDutyComponent
  },
  {
    path: 'creator',
    component: CreatorComponent
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
