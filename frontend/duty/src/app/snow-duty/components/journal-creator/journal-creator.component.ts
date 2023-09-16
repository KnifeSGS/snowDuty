import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { Journal } from '../../models/journal';
import { JournalService } from '../../services/journal.service';
import { UserService } from '../../services/user.service';

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

  worker: User = new User();
  users$: Observable<User[]> = new Observable<User[]>()
  users!: User[];

  disabled: boolean = true;

  journal: Journal = new Journal();

  journalForm: FormGroup;
  date: Date = new Date(Date.now())

  constructor(
    private fb: FormBuilder,
    private journalService: JournalService,
    private userService: UserService
  ) {
    this.journalForm = this.fb.group({
      worker: [''],
      date: [''],
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
  }

  mobile: boolean = false

  ngOnInit() {
    if (window.screen.width < 420) { // 768px portrait
      this.mobile = true;
    };

    this.getUsers();

  }

  getUsers() {
    this.userService.getAll().subscribe(
      // users => this.users$ = of(users)
      users => this.users = users
    )
  };

  workerSelected() {
    this.worker = this.journalForm.value.worker
  }

  journalBuilder() {
    const date = this.journalForm.value.date
    let utcDate = new Date;
    if (date) {
      utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    }
    const { checking, temperature, percipitation, sky, visibility, roads } = this.journalForm.value;
    this.journal = {
      worker: this.journalForm.value.worker._id,
      date: utcDate,
      // comment: this.journalForm.value.comment
    }
  }

  buildForm() {
    // console.log(this.journalForm.value)
    this.journalBuilder();
    // console.log(this.journal);
    this.journalService.create(this.journal)
      .subscribe(
        () => this.journalService.getAll$()
        // p => console.log(p)
      )
  }
}
