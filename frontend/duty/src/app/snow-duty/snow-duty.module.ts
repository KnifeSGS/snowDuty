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
import { JournalCreatorComponent } from './components/journal-creator/journal-creator.component';
import { JournalEditorComponent } from './components/journal-editor/journal-editor.component';
import { JournalViewerComponent } from './components/journal-viewer/journal-viewer.component';
import { ShiftCreatorComponent } from './components/shift-creator/shift-creator.component';
import { ShiftViewerComponent } from './components/shift-viewer/shift-viewer.component';
import { PdfCreatorComponent } from './components/pdf-creator/pdf-creator.component';
import { ChartComponent } from '../shared-module/components/chart/chart.component';

import { SharedModule } from '../shared-module/shared-module.module';
import { UserCreatorComponent } from './components/user-creator/user-creator.component';
import { InventoryViewerComponent } from './components/inventory-viewer/inventory-viewer.component';
import { InventoryEditorComponent } from './components/inventory-editor/inventory-editor.component';


@NgModule({
  declarations: [
    SnowDutyComponent,
    JournalCreatorComponent,
    JournalEditorComponent,
    JournalViewerComponent,
    ShiftCreatorComponent,
    ShiftViewerComponent,
    PdfCreatorComponent,
    UserCreatorComponent,
    InventoryViewerComponent,
    InventoryEditorComponent,
    // ChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    // ButtonModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    SelectButtonModule,
    SharedModule,
  ],
  providers: [MessageService, ConfirmationService]
})
export class SnowDutyModule { }
