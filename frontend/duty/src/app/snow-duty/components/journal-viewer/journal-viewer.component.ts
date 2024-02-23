import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, OnInit, Signal, signal, ViewChild, WritableSignal } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { Journal, JournalResponse } from '../../models/journal';
import { JournalService } from '../../services/journal.service';
import { UserService } from '../../services/user.service';
import { JournalCreatorComponent } from '../journal-creator/journal-creator.component';
import { UserCreatorComponent } from '../user-creator/user-creator.component';
import { JournalStore } from '../../store/journal.strore';
import { InitialJournalData, JournalDataStore } from '../../models/initial-journal-data';

@Component({
  selector: 'app-journal-viewer',
  templateUrl: './journal-viewer.component.html',
  styleUrls: ['./journal-viewer.component.scss'],
  providers: [MessageService, ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalViewerComponent implements OnInit {

  journalStore = inject(JournalStore)
  // storeData: Signal<any> = computed(() => {
  //   return this.journalStore.results()
  // })
  storeData = this.journalStore.results
  // storeActualPage = computed(() => {
  //   return this.journalStore.actual_page()
  // })
  storeActualPage = this.journalStore.actual_page
  // storeTotalPages = computed(() => {
  //   return this.journalStore.total_pages()
  // })
  storeTotalPage = this.journalStore.total_pages
  // storeJournalCount = computed(() => {
  //   return this.journalStore.count()
  // })
  storeJournalCount = this.journalStore.count

  @ViewChild(JournalCreatorComponent)
  childJournal!: JournalCreatorComponent;

  @ViewChild(UserCreatorComponent)
  childUser!: UserCreatorComponent;

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
  params: { start?: string, end?: string } = {
    start: this.thisMonthFirstDay,
    end: new Date(this.thisYear, this.thisMonth, this.thisDay, this.thisHour + 1).toISOString()
  }

  journal!: Journal;

  selectedJournals!: Journal[];

  submitted!: boolean;

  statuses!: any[];

  mobile: boolean = false

  constructor(
    private userService: UserService,
    private journalService: JournalService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private ref: ChangeDetectorRef,
  ) {
    // this.getJournals()
  }

  options = {
    page_size: 1000
  }

  ngOnInit() {
    this.userService.getAll$();

    if (window.screen.width < 420) { // 768px portrait
      this.mobile = true;
    };
    this.ref.detectChanges();


    this.journalStore.load(this.options)
  }



  openDialog(event: any) {
    this.openedDialogName = event.target.parentElement.id
    if (this.openedDialogName === "journalDialog") {
      this.journal = new Journal();
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

  deleteSelectedJournals(journals: Journal[]) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected journals?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        journals.forEach(journal => {
          if (journal.id) {
            this.journalService.remove(`${journal.id}`).subscribe(
              () => {
                // this.journalService.getSelectedInterval(this.params)
                this.journalStore.load(`?page_size=${this.pageSize}`)
              }
            )
          }
        });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Napló törölve', life: 3000 });
      }
    });
  };

  deleteJournal(journalId: string, journalDate?: Date) {
    this.confirmationService.confirm({
      message: 'Biztosan törlöd a ' + journalDate + 'napi naplót?',
      header: 'Megerősítés',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (journalId) {
          this.journalService.remove(journalId).subscribe(
            () => {
              this.journalService.getSelectedInterval(this.params)
            }
          )
        }
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Napló törölve', life: 3000 });
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
    // this.journalService.getAll().subscribe(
    //   () => {
    //     this.journalService.getSelectedInterval(this.params);
    //   }
    // )
    // this.getJournals()
  }
  saveUser() {
    this.childUser.buildForm();
    this.userService.getAll$();
    this.childJournal.getUsers();
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
    if (this.interval[0] && this.interval[1]) {
      this.params.start = new Date(Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())).toISOString();
      this.params.end = new Date(Date.UTC(end.getFullYear(), end.getMonth(), end.getDate() + 1)).toISOString();
    }
    if (this.params.end) {
      console.log(this.params);
      this.journalService.getSelectedInterval(this.params)
    }
  }


}
