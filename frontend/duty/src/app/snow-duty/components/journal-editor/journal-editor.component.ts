import { Component, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user';
import { Shift } from '../../models/shift';
import { JournalService } from '../../services/journal.service';
import { UserService } from '../../services/user.service';
import { PdfCreatorComponent } from '../pdf-creator/pdf-creator.component';
import { ShiftCreatorComponent } from '../shift-creator/shift-creator.component';
import { JournalData } from '../../models/journal-data';

@Component({
  selector: 'app-journal-editor',
  templateUrl: './journal-editor.component.html',
  styleUrls: ['./journal-editor.component.scss']
})
export class JournalEditorComponent implements OnInit {

  @ViewChild(PdfCreatorComponent)
  pdf!: PdfCreatorComponent;

  @ViewChild(ShiftCreatorComponent)
  shiftCreator!: ShiftCreatorComponent;
  shiftDialog!: boolean;
  submitted!: boolean;

  journal: JournalData = new JournalData();
  journalId: number = 0;

  shifts: Shift[] = []
  journalUpdateData: JournalData = new JournalData();
  journalForm!: FormGroup;
  users!: User[];
  // worker: User = new User();
  mobile: boolean = false;

  editableWorker: boolean = false;
  canAddCheck: boolean = false;
  defaultSortOrder: number = 1

  selectedJournal: WritableSignal<JournalData> = signal(new JournalData());
  worker: WritableSignal<User> = signal(new User());
  journalDate: WritableSignal<Date> = signal(new Date());

  constructor(
    private activatedRoute: ActivatedRoute,
    private journalService: JournalService,
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
  ) {
    this.createForm();
    this.getJournal();
    this.getUsers();
  }

  ngOnInit(): void {
    if (window.screen.width < 420) { // 768px portrait
      this.mobile = true;
    };

  }

  hideDialog() {
    this.shiftDialog = false;
    this.submitted = false;
  }

  createForm() {
    this.journalForm = this.fb.group({
      person_on_duty: [''],
      date_start: [''],
      monitor: this.fb.group({
        start_time: [''],
        temperature: [''],
        percipitation: [''],
        sky: [''],
        visibility: [''],
        roads: [''],
      }),
      comment: ['']
    })
  }

  getUsers() {
    // this.userService.getAll().subscribe(
    //   ({results}) => {
    //     console.log(users);
    //     this.users = results
    //   }
    // );
  };

  async getJournal() {
    // this.activatedRoute.params
    //   .pipe(
    //     map(p => p['id']),
    //     concatMap(
    //       async (value: number) => {
    //         const journalSignal = await this.journalService.getOneSignal(value);
    //         return journalSignal
    //       }
    //     )
    //   )
    //   .subscribe(
    //     (journal) => {
    //       console.log(journal);
    //       this.selectedJournal.set(journal)
    //     }
    //   )
    const journalID = this.activatedRoute.snapshot.params['id'];
    const data = await this.journalService.getOneSignal(journalID);
    console.log(data);
    this.selectedJournal.set(data)
  }

  editWorkerDate() {
    this.editableWorker = true
  }

  addCheck() {
    this.canAddCheck = !this.canAddCheck;
  }

  workerSelected(event: any) {
    // console.log(event);
    // const selectedUser = await this.userService.getOneSignal(event.value.id)
    this.worker.set(event.value)
  }

  journalBuilder() {
    const date = this.journalForm.value.date
    let utcDate = this.journal.date_start;
    if (date) {
      utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    }

    if (this.canAddCheck) {
      this.journalUpdateData = {
        id: this.journal.id,
        person_on_duty: this.journalForm.value.worker.id,
        date_start: utcDate,
        monitor: this.journalForm.value.checks,
        comments: this.journalForm.value.comment
      }
    } else {
      this.journalUpdateData = {
        id: this.journal.id,
        person_on_duty: this.journalForm.value.worker._id,
        date_start: utcDate,
        comments: this.journalForm.value.comment
      }
    }

  }

  buildForm() {
    const id = this.journal.id
    this.journalBuilder();
    if (id) {
      this.journalService.update(this.journalUpdateData, id)
        .subscribe(
          () => {
            this.journalForm.reset();
            // this.addCheck();
            this.getUsers();
            this.createForm();
            this.getJournal();
            this.canAddCheck = false;
          }
        )
    }
    this.messageService.add({
      severity: 'success',
      summary: 'Sikeres',
      detail: 'Napló frissítve',
      life: 3000
    });
  }

  saveShift() {
    this.shiftCreator.createShift()
    // this.journalService.getAll$();
    this.getJournal()
    this.shiftDialog = false;
  }

  generatePDF() {
    // console.log(this.journal);
    // this.pdf.test(this.journal)
    this.pdf.generatePDF(this.journal, this.shifts)
  }
}
