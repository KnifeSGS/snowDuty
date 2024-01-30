import { Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user';
import { Shift } from '../../models/shift';
import { ShiftService } from '../../services/shift.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-shift-creator',
  templateUrl: './shift-creator.component.html',
  styleUrls: ['./shift-creator.component.scss']
})
export class ShiftCreatorComponent implements OnInit {

  mobile: boolean = false;
  shiftForm: FormGroup;
  users!: User[];
  worker: User = new User();
  shift: Shift = new Shift();

  @Input() journalId: string = '';


  userNames: string[] = [];
  userSignal: WritableSignal<User[]> = signal([]);

  daytimeOptions: { label: string, value: boolean }[] = [
    {
      label: '06:00-18:00',
      value: true
    },
    {
      label: '18:00-06:00',
      value: false
    }
  ];

  machines: { name: string }[] = [
    { name: 'GJA-563' },
    { name: 'GZL-759' },
    { name: 'RASANT A' }
  ]

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private shiftService: ShiftService,
    private messageService: MessageService
  ) {
    this.shiftForm = this.fb.group({
      dispersion_start: [''],
      dispersion_end: [''],
      man: ['', Validators.required],
      car: [''],
      km: [''],
      daytime: [''],
      journal: [0, Validators.required],
      szortak: this.fb.group({
        salt: [''],
        basalt: [''],
        cacl2: [''],
        kalcinol: [''],
        mixture: [''],
        zeokal: [''],
      }),
      workHour: ['', Validators.required],
      orderedQuantity: [''],
    })
  }

  ngOnInit() {
    if (window.screen.width < 420) { // 768px portrait
      this.mobile = true;
    };

    this.getUsers();
  }


  async getUsers() {
    await this.userService.fetchForSignal(`?page_size=1000`)
      .then(
        users => {
          console.log(users);
          users.forEach((user: User) => {
            const full_name = user.last_name || user.first_name
              ? `${user.last_name} ${user.first_name}`
              : `${user.email}`
            this.userNames.push(full_name)
          })
          return this.userSignal.set(users)
        }
      );
  }

  workerSelected() {
    this.worker = this.shiftForm.value.man
  }

  shiftCreator() {
    const date = this.shiftForm.value.dispersion_start
    let utcDate = new Date;
    if (date) {
      utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    }
    const { dispersion_start, dispersion_end, journal, daytime, car, salt, basalt, cacl2, kalcinol, mixture, zeokal, km, workHour, orderedQuantity } = this.shiftForm.value;

    this.shift = {
      dispersion_start: utcDate,
      dispersion_end,
      man: this.shiftForm.value.man,
      car,
      km,
      daytime,
      journal: this.journalId,
      szortak: [
        salt,
        basalt,
        cacl2,
        kalcinol,
        mixture,
        zeokal,
      ],
      workHour,
      orderedQuantity
    }
  }

  createShift() {
    // console.log(this.shiftForm);
    if (this.shiftForm.valid) {
      this.shiftCreator()
      // console.log(this.shift);
      this.shiftService.create(this.shift)
        .subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sikeres',
              detail: 'Új ügyeleti bejegyzés sikeresen hozzáadva',
              life: 3000
            });
          }
        )
    }
  }

}
