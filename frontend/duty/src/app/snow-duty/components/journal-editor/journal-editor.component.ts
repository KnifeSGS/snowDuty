import { Component, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
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
import { WorkerStore } from '../../store/worker.store';
import { ApiOptions } from '../../models/api-options';
import { WorkerData } from '../../models/worker-data';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-journal-editor',
  templateUrl: './journal-editor.component.html',
  styleUrls: ['./journal-editor.component.scss']
})
export class JournalEditorComponent implements OnInit {

  #workerStore = inject(WorkerStore)
  #activatedRoute = inject(ActivatedRoute)
  #journalService = inject(JournalService)
  #fb = inject(FormBuilder)
  #messageService = inject(MessageService)
  #commentService = inject(CommentsService)

  workerNames = this.#workerStore.workerNames
  workers = this.#workerStore.results
  worker: WorkerData = new WorkerData();
  onDutyId: string | number = '';

  @ViewChild(PdfCreatorComponent)
  pdf!: PdfCreatorComponent;

  @ViewChild(ShiftCreatorComponent)
  shiftCreator!: ShiftCreatorComponent;
  shiftDialog!: boolean;
  submitted!: boolean;

  // journal: JournalData = new JournalData();
  // journalId: number = 0;

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
  journalID: number


  queryParams: ApiOptions = {
    page_size: 50
  }

  constructor(
  ) {
    this.journalID = this.#activatedRoute.snapshot.params['id'];
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
    this.journalForm = this.#fb.group({
      person_on_duty: [''],
      date_start: [''],
      monitor: this.#fb.group({
        start_time: [''],
        temperature: [''],
        percipitation: [''],
        sky: [''],
        visibility: [''],
        roads: [''],
      }),
      comments: ['']
    })
  }

  getUsers() {
    this.#workerStore.load(this.queryParams)
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

    const data = await this.#journalService.getOneSignal(this.journalID);
    console.log(data);
    this.selectedJournal.set(data)
  }

  editWorkerDate() {
    this.editableWorker = true
  }

  addCheck() {
    this.canAddCheck = !this.canAddCheck;
  }

  workerSelected() {
    this.onDutyId = this.journalForm.value.person_on_duty.id;
  }

  isPristine(value: any) {
    return this.journalForm.get(value)?.pristine
  }

  journalBuilder() {
    // console.log(this.journalForm.value.date);
    const date = this.journalForm.value.date_start
    let utcDate = new Date;
    let utcDate2 = new Date;
    if (date) {
      utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()))
    }
    if (date) {
      utcDate2 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours())
    }

    // console.log(this.selectedJournal().date_start);
    console.log("raw: " + date.toLocaleString('sv-SE', { timeZone: 'CET' }));
    console.log("raw2: " + date.toLocaleString('hu-HU'));
    console.log("utc: " + utcDate.toISOString().split('.', 1)[0]);
    console.log("hu tlts: " + utcDate2.toLocaleTimeString('hu-HU'));

    if (this.editableWorker && this.isPristine("date_start")) {
      return
    } else if (this.editableWorker) {
      // this.journalUpdateData.date_start = this.journalForm.value.date_start.toISOString().split('.', 1)[0]
      this.journalUpdateData.date_start = this.journalForm.value.date_start.toLocaleString('hu-HU')
    }
    this.journalUpdateData.person_on_duty = this.isPristine("person_on_duty") ? this.selectedJournal().person_on_duty!.id : this.journalForm.value.person_on_duty.id
    this.journalUpdateData.id = this.selectedJournal().id;

  }

  createComment() {
    console.log(this.journalForm.value.comment);
    const commentData: Comment = {
      active: true,
      comment: this.journalForm.value.comments,
      journal: this.journalID
    }
    this.#commentService.create(commentData).subscribe((response) => {
      console.log(response);
      this.journalForm.reset()
      this.getJournal()
    })
  }

  buildForm() {
    const id = this.#activatedRoute.snapshot.params['id']
    // console.log(id);
    this.journalBuilder();
    // if (id) {
    console.log(this.journalUpdateData);
    this.#journalService.update(this.journalUpdateData, id)
      .subscribe(
        () => {
          this.journalForm.reset();
          // this.addCheck();
          // this.getUsers();
          this.createForm();
          this.getJournal();
          this.canAddCheck = false;
          this.editableWorker = false
        }
      )
    // }
    this.#messageService.add({
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
    this.pdf.generatePDF(this.selectedJournal(), this.shifts)
  }
}
