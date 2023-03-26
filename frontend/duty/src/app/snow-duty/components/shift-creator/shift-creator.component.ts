import { Component, Input, OnInit } from '@angular/core';
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

  daytimeOptions: { label: string, value: boolean }[] = [
    {
      label: 'Nappali',
      value: true
    },
    {
      label: 'Éjszakai',
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
      date: [''],
      onDuty: ['', Validators.required],
      daytime: ['', Validators.required],
      machine: [''],
      salt: [''],
      cacl2: [''],
      kalcinol: [''],
      mixture: [''],
      zeokal: [''],
      km: [''],
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


  getUsers() {
    this.userService.getAll().subscribe(
      users => this.users = users
    )
  };

  workerSelected() {
    this.worker = this.shiftForm.value.onDuty
  }

  shiftCreator() {
    const date = this.shiftForm.value.date
    let utcDate = new Date;
    if (date) {
      utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    }
    const { daytime, machine, salt, cacl2, kalcinol, mixture, zeokal, km, workHour, orderedQuantity } = this.shiftForm.value;

    this.shift = {
      journalId: this.journalId,
      date: utcDate,
      onDuty: this.shiftForm.value.onDuty._id,
      daytime,
      machine,
      salt,
      cacl2,
      kalcinol,
      mixture,
      zeokal,
      km,
      workHour,
      orderedQuantity
    }
  }

  createShift() {
    if (this.shiftForm.valid) {
      this.shiftCreator()
      console.log(this.shift);
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
