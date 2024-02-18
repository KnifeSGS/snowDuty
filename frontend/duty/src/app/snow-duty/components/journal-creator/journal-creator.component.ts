import { ChangeDetectorRef, Component, EventEmitter, inject, Output, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { Journal } from '../../models/journal';
import { JournalService } from '../../services/journal.service';
import { UserService } from '../../services/user.service';
import { JournalStore } from '../../store/journal.strore';

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

  journalStore = inject(JournalStore)

  worker: User = new User();
  users$: Observable<User[]> = new Observable<User[]>()
  users!: User[];

  userSignal: WritableSignal<User[]> = signal([]);
  userNames: string[] = [];
  onDutyId: string = '';

  disabled: boolean = true;

  journal: Journal = new Journal();

  journalForm: FormGroup;
  date: Date = new Date(Date.now())

  constructor(
    private fb: FormBuilder,
    private journalService: JournalService,
    private userService: UserService,
    private ref: ChangeDetectorRef
  ) {
    this.journalForm = this.fb.group({
      person_on_duty: [0],
      date_start: [''],
      // checking: [''],
      // temperature: [''],
      // percipitation: [''],
      // sky: [''],
      // visibility: [''],
      // roads: [''],
      // shifts: this.fb.group({
      //   daytime: [''],
      //   machine: [''],
      //   salt: [''],
      //   cacl2: [''],
      //   kalcinol: [''],
      //   mixture: [''],
      //   zeokal: [''],
      //   km: [''],
      //   workHour: [''],
      //   orderedQuantity: [''],
      // }),
      // comment: ['']
    })


    this.getUsers();
  }

  mobile: boolean = false

  ngOnInit() {
    if (window.screen.width < 420) { // 768px portrait
      this.mobile = true;
    };


  }

  async getUsers() {
    // this.userService.getAll().subscribe(
    // users => this.users = users
    // )
    await this.userService.fetchForSignal(`?page_size=1000`)
      .then(
        users => {
          console.log(users);
          users.forEach((user: User) => {
            const full_name = user.last_name || user.first_name ? `${user.last_name} ${user.first_name}` : `${user.email}`
            this.userNames.push(full_name)
          })
          console.log(this.userNames);
          return this.userSignal.set(users)
        }
      )
  };

  workerSelected() {
    this.onDutyId = this.journalForm.value.person_on_duty.id;
    console.log(this.onDutyId);
  }

  journalBuilder() {
    const date = this.journalForm.value.date
    let utcDate = new Date;
    if (date) {
      utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    }
    // const { checking, temperature, percipitation, sky, visibility, roads } = this.journalForm.value;
    this.journal = {
      person_on_duty: this.onDutyId,
      date_start: utcDate,
      // comment: this.journalForm.value.comment
    }
  }

  buildForm() {
    // console.log(this.journalForm.value)
    this.journalBuilder();
    // console.log(this.journal);
    this.journalService.create(this.journal)
      .subscribe(
        // () => this.journalService.getAll$()
        // () => this.getJournals.emit()
        // p => console.log(p)
        () => this.journalStore.load(`?page_size=1000`)
      )

    // this.ref.markForCheck()
  }
}
