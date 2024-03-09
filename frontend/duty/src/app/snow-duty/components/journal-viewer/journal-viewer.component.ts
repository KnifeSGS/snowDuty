import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, OnInit, Signal, signal, ViewChild, WritableSignal } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { JournalService } from '../../services/journal.service';
import { UserService } from '../../services/user.service';
import { JournalCreatorComponent } from '../journal-creator/journal-creator.component';
import { UserCreatorComponent } from '../user-creator/user-creator.component';
import { JournalStore } from '../../store/journal.strore';
import { ApiOptions } from '../../models/api-options';
import { JournalData } from '../../models/journal-data';
import { HttpParams, HttpParamsOptions } from '@angular/common/http';
import { WorkerCreatorComponent } from '../worker-creator/worker-creator.component';

@Component({
  selector: 'app-journal-viewer',
  templateUrl: './journal-viewer.component.html',
  styleUrls: ['./journal-viewer.component.scss'],
  providers: [MessageService, ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalViewerComponent implements OnInit {

  #messageService = inject(MessageService)
  #confirmationService = inject(ConfirmationService)
  #ref = inject(ChangeDetectorRef)

  journalStore = inject(JournalStore)
  storeData = this.journalStore.results
  storeActualPage = this.journalStore.actual_page
  storeTotalPage = this.journalStore.total_pages
  storeJournalCount = this.journalStore.count

  @ViewChild(JournalCreatorComponent)
  childJournal!: JournalCreatorComponent;

  @ViewChild(WorkerCreatorComponent)
  childWorker!: WorkerCreatorComponent;

  // feliratok
  Delete: string = "Törlés";
  NewJournal: string = "Új napló";
  NewWorker: string = "Új dolgozó";
  Import: string = "Feltöltés";
  Export: string = "Letöltés";
  Search: string = "Keresés . . .";

  paginatorTemplate = "";
  pageSize = 40;
  defaultSortOrder: number = -1


  openedDialogName!: string
  dialogs: { [key: string]: boolean } = {
    journalDialog: false,
    userDialog: false
  }

  userNames: string[] = [];


  interval: Date[] = [];
  thisMonthFirstDay = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), 1)).toISOString()
  today = new Date();
  thisYear = this.today.getFullYear();
  thisMonth = this.today.getMonth();
  thisDay = this.today.getDate();
  thisHour = this.today.getHours();
  paramsold: { start?: string, end?: string } = {
    start: this.thisMonthFirstDay,
    end: new Date(this.thisYear, this.thisMonth, this.thisDay, this.thisHour + 1).toISOString()
  }

  journal!: JournalData;

  selectedJournals!: JournalData[];

  submitted!: boolean;
  statuses!: any[];
  mobile: boolean = false
  queryParams: ApiOptions = {
    page_size: 50
  }

  constructor() {
  }


  ngOnInit() {

    if (window.screen.width < 420) { // 768px portrait
      this.mobile = true;
    };
    this.#ref.detectChanges();

    this.journalStore.load(this.queryParams)
  }



  openDialog(event: any) {
    this.openedDialogName = event.target.parentElement.id
    if (this.openedDialogName === "journalDialog") {
      this.journal = new JournalData();
    }
    this.submitted = false;
    this.dialogs[event.target.parentElement.id] = true;
  }
  // openNewUser(event: any) {
  //   this.openedDialogName = event.target.parentElement.id
  //   // this.journal = new Journal();
  //   this.submitted = false;
  //   this.dialogs['userDialog'] = true;
  // }

  deleteSelectedJournals(journals: JournalData[]) {
    this.#confirmationService.confirm({
      message: 'Biztosan törlöd a kijelölt naplókat?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        journals.forEach(journal => {
          this.journalStore.delete(journal.id)
        });
        this.#messageService.add({ severity: 'success', summary: 'Successful', detail: 'Napló törölve', life: 3000 });
      }
    });
  };

  deleteJournal(journalId: string, journalDate?: Date) {
    this.#confirmationService.confirm({
      message: 'Biztosan törlöd a ' + journalDate + ' időpontra rögzített naplót?',
      header: 'Megerősítés',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.journalStore.delete(journalId)
        this.#messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Napló törölve',
          life: 3000
        });
      }
    });
  }

  hideDialog() {
    this.dialogs[this.openedDialogName] = false
    this.submitted = false;
  }

  saveJournal() {
    this.childJournal.buildForm();
    this.dialogs[this.openedDialogName] = false;
  }

  saveWorker() {
    this.childWorker.buildForm();
    this.dialogs[this.openedDialogName] = false;
  }

  findIndexById(id: string): number {
    let index = -1;
    // for (let i = 0; i < this.journals.length; i++) {
    //   if (this.journals[i]._id === id) {
    //     index = i;
    //     break;
    //   }
    // }

    return index;
  }

  selectInterval() {
    const start = this.interval[0];
    const end = this.interval[1];
    // if (this.interval[0] && this.interval[1]) {
    //   this.params.start = new Date(Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())).toISOString();
    //   this.params.end = new Date(Date.UTC(end.getFullYear(), end.getMonth(), end.getDate() + 1)).toISOString();
    // }
    // if (this.params.end) {
    //   console.log(this.params);
    //   this.journalService.getSelectedInterval(this.params)
    // }
  }


}
