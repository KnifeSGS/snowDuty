import { ChangeDetectorRef, Component, EventEmitter, inject, Output, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { JournalService } from '../../services/journal.service';
import { UserService } from '../../services/user.service';
import { JournalStore } from '../../store/journal.strore';
import { Journal, JournalData } from '../../models/journal-data';
import { WorkerStore } from '../../store/worker.store';
import { ApiOptions } from '../../models/api-options';
import { Worker, WorkerData } from '../../models/worker-data';

export function minNameLengthValidator(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.pristine || control.value.length >= min) {
      return null;
    }
    return { 'minNameLength': false }
  };
}

@Component({
  selector: 'app-journal-creator',
  templateUrl: './journal-creator.component.html',
  styleUrls: ['./journal-creator.component.scss']
})
export class JournalCreatorComponent {

  // @Output("getJournals") getJournals: EventEmitter<any> = new EventEmitter();

  #journalStore = inject(JournalStore)
  #workerStore = inject(WorkerStore)

  workerNames = this.#workerStore.workerNames
  workers = this.#workerStore.results
  worker: WorkerData = new WorkerData();
  onDutyId: string | number = '';

  disabled: boolean = true;

  journal: Journal = new Journal();

  journalForm: FormGroup;
  date: Date = new Date(Date.now())

  mobile: boolean = false
  queryParams: ApiOptions = {
    page_size: 50
  }

  constructor(
    private fb: FormBuilder,
    private journalService: JournalService,
    private userService: UserService,
    private ref: ChangeDetectorRef
  ) {
    this.journalForm = this.fb.group({
      person_on_duty: '0',
      date_start: [''],
      date_end: [null],
    })
  }


  ngOnInit() {
    if (window.screen.width < 420) { // 768px portrait
      this.mobile = true;
    };

    this.getWorkers(this.queryParams)
  }

  getWorkers(queryData: ApiOptions) {
    // this.userService.getAll().subscribe(
    // users => this.users = users
    // )
    // this.userService.fetchForSignal(`?page_size=1000`)
    //   .then(
    //     users => {
    //       console.log(users);
    //       users.forEach((user: User) => {
    //         const full_name = user.last_name || user.first_name ? `${user.last_name} ${user.first_name}` : `${user.email}`
    //         this.userNames.push(full_name)
    //       })
    //       console.log(this.userNames);
    //       return this.userSignal.set(users)
    //     }
    //   )

    this.#workerStore.load(queryData)
  };

  workerSelected() {
    this.onDutyId = this.journalForm.value.person_on_duty.id;
    console.log(this.onDutyId);
  }

  isPristine(value: any) {
    return this.journalForm.get(value)?.pristine
  }

  journalBuilder() {
    // console.log(this.isPristine("date_start"));
    const date = this.journalForm.value.date_start
    let utcDate = new Date;
    if (date) {
      utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()))
    }
    this.journal = {
      person_on_duty: this.onDutyId,
      date_start: this.isPristine("date_start") ? new Date() : utcDate,
      date_end: null
      // comment: this.journalForm.value.comment
    }
  }

  buildForm() {
    // console.log(this.journalForm.value)
    this.journalBuilder();
    // console.log(this.journal);
    this.#journalStore.create(this.journal)
    this.journalForm.reset()
  }
}
