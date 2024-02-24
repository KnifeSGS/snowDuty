import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { WorkerService } from '../../services/worker.service';
import { WorkerStore } from '../../store/worker.store';
import { ApiOptions } from '../../models/api-options';

@Component({
  selector: 'app-worker-viewer',
  templateUrl: './worker-viewer.component.html',
  styleUrl: './worker-viewer.component.scss',
  providers: [MessageService, ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkerViewerComponent implements OnInit {

  #workerService = inject(WorkerService);
  #messageService = inject(MessageService);
  #confirmationService = inject(ConfirmationService);
  #ref = inject(ChangeDetectorRef);
  #workerStore = inject(WorkerStore)

  // feliratok
  Delete: string = "Törlés";
  NewJournal: string = "Új napló";
  NewWorker: string = "Új dolgozó";
  Import: string = "Feltöltés";
  Export: string = "Letöltés";
  Search: string = "Keresés . . .";
  Clear: string = "Keresés törlése";

  paginatorTemplate = "";

  defaultSortOrder: number = 1

  openedDialogName!: string
  dialogs: { [key: string]: boolean } = {
    userDialog: false
  }

  queryParams: ApiOptions = {
    page_size: 50
  }

  ngOnInit(): void {
    this.#workerStore.load(this.queryParams)
  }

}
