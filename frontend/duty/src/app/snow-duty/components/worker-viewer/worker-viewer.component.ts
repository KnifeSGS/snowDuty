import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, computed, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { WorkerService } from '../../services/worker.service';
import { WorkerStore } from '../../store/worker.store';
import { ApiOptions } from '../../models/api-options';
import { WorkerData } from '../../models/worker-data';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { WorkerCreatorComponent } from '../worker-creator/worker-creator.component';

@Component({
  selector: 'app-worker-viewer',
  templateUrl: './worker-viewer.component.html',
  styleUrl: './worker-viewer.component.scss',
  providers: [MessageService, ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkerViewerComponent implements OnInit {
  // store
  #workerStore = inject(WorkerStore);

  #messageService = inject(MessageService);
  #confirmationService = inject(ConfirmationService);
  #ref = inject(ChangeDetectorRef);

  workerData = this.#workerStore.results
  actualPage = this.#workerStore.actual_page
  totalPages = this.#workerStore.total_pages
  nextPage = this.#workerStore.next
  previousPage = this.#workerStore.previous
  workerCount = this.#workerStore.count
  workerNames = this.#workerStore.workerNames

  // feliratok
  Delete: string = "Törlés";
  NewJournal: string = "Új napló";
  NewWorker: string = "Új dolgozó";
  Import: string = "Feltöltés";
  Export: string = "Letöltés";
  Search: string = "Keresés . . .";
  Clear: string = "Keresés törlése";

  // table
  paginatorTemplate = "";
  defaultSortOrder: number = 1;
  selectedWorkers!: WorkerData[]

  // view
  mobile: boolean = false
  queryParams: ApiOptions = {
    page_size: 50
  }
  @ViewChild(WorkerCreatorComponent)
  childWorker!: WorkerCreatorComponent

  // dialog
  openedDialogName!: string
  dialogs: { [key: string]: boolean } = {
    workerDialog: false
  }
  submitted!: boolean;


  ngOnInit(): void {
    if (window.screen.width < 420) { // 768px portrait
      this.mobile = true;
    };

    this.getWorkers(this.queryParams)
  }

  openDialog(event: any) {
    this.openedDialogName = event.target.parentElement.id
    this.submitted = false;
    this.dialogs[event.target.parentElement.id] = true;
  }

  openEditDialog(event: any, worker: WorkerData) {

  }

  hideDialog() {
    this.dialogs[this.openedDialogName] = false
    this.submitted = false;
  }

  getWorkers(params: ApiOptions) {
    this.#workerStore.load(params)
  }

  deleteWorker(id: number | string) {
    this.#workerStore.delete(id)
  }

  saveWorker() {
    this.childWorker.buildForm();
    this.dialogs[this.openedDialogName] = false
  }

  editWorker() {

  }

  clear(table: Table) {
    table.clear();
  }

}
