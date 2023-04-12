import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ChartModule } from 'primeng/chart';

import { SnowDutyRoutingModule } from './snow-duty-routing.module';
import { SnowDutyComponent } from './snow-duty.component';
import { CreatorComponent } from './components/creator/creator.component';
import { EditorComponent } from './components/editor/editor.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { ShiftCreatorComponent } from './components/shift-creator/shift-creator.component';
import { ShiftViewerComponent } from './components/shift-viewer/shift-viewer.component';
import { PdfCreatorComponent } from './components/pdf-creator/pdf-creator.component';


@NgModule({
  declarations: [
    SnowDutyComponent,
    CreatorComponent,
    EditorComponent,
    ViewerComponent,
    ShiftCreatorComponent,
    ShiftViewerComponent,
    PdfCreatorComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SnowDutyRoutingModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    ConfirmDialogModule,
    ConfirmDialogModule,
    TableModule,
    ToastModule,
    SliderModule,
    ContextMenuModule,
    DialogModule,
    ButtonModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    SelectButtonModule,
    ChartModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class SnowDutyModule { }
