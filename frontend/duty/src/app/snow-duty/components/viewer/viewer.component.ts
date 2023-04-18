import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { Journal } from '../../models/journal';
import { JournalService } from '../../services/journal.service';
import { UserService } from '../../services/user.service';
import { CreatorComponent } from '../creator/creator.component';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ViewerComponent implements OnInit {

  @ViewChild(CreatorComponent)
  child!: CreatorComponent;

  // feliratok
  Delete: string = "Törlés";
  NewJournal: string = "Új napló";
  NewWorker: string = "Új dolgozó";
  Import: string = "Feltöltés";
  Export: string = "Letöltés";
  Search: string = "Keresés . . .";

  paginatorTemplate = "";

  defaultSortOrder: number = -1

  journalDialog!: boolean;

  journals$: BehaviorSubject<Journal[]> = this.journalService.journals$;
  users$: BehaviorSubject<User[]> = this.userService.list$;
  userNames: string[] = [];

  interval: Date[] = [];
  thisMonthFirstDay = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), 1)).toISOString()
  params: { start?: string, end?: string } = {
    start: this.thisMonthFirstDay,
    end: new Date().toISOString()
  }

  journal!: Journal;

  selectedJournals!: Journal[];

  submitted!: boolean;

  statuses!: any[];

  constructor(
    private userService: UserService,
    private journalService: JournalService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.journalService.getSelectedInterval(this.params);
    this.userService.getAll$();
    this.users$.subscribe(users => users.forEach(user => {
      this.userNames.push(user.full_name)
    }))
  }

  openNew() {
    this.journal = new Journal();
    this.submitted = false;
    this.journalDialog = true;
  }

  deleteSelectedJournals(journals: Journal[]) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected journals?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        journals.forEach(journal => {
          if (journal._id) {
            this.journalService.remove(journal._id).subscribe(
              () => {
                this.journalService.getSelectedInterval(this.params)
              }
            )
          }
        });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Napló törölve', life: 3000 });
      }
    });
  };


  editJournal(journal: Journal) {
    // this.journalService.update(journal)
    // this.journal = { ...journal };
    this.journalDialog = true;
  }

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
    this.journalDialog = false;
    this.submitted = false;
  }

  saveJournal() {
    this.child.buildForm()
    this.journalService.getSelectedInterval(this.params);
    this.journalDialog = false;
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

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

}
