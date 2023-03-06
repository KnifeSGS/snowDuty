import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Journal } from '../../models/journal';
import { JournalService } from '../../services/journal.service';

export function minNameLengthValidator(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.pristine || control.value.length >= min) {
      return null;
    }
    return { 'minNameLength': false }
  };
}

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent {

  journal: Journal = new Journal();

  journalForm: FormGroup;
  date: Date = new Date(Date.now())

  constructor(
    private fb: FormBuilder,
    private journalService: JournalService
  ) {
    this.journalForm = this.fb.group({
      worker: ['', minNameLengthValidator(3)],
      date: [''],
      checking: [''],
      temperature: [''],
      percipitation: [''],
      sky: [''],
      visibility: [''],
      roads: [''],
      shifts: this.fb.group({
        daytime: [''],
        machine: [''],
        salt: [''],
        cacl2: [''],
        kalcinol: [''],
        mixture: [''],
        zeokal: [''],
        km: [''],
        workHour: [''],
        orderedQuantity: [''],
      }),
      comment: ['']
    })
  }

  mobile: boolean = false

  ngOnInit() {
    if (window.screen.width < 420) { // 768px portrait
      this.mobile = true;
    }
  }

  journalBuilder() {
    const date = this.journalForm.value.date
    let utcDate = new Date;
    if (date) {
      utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    }
    this.journal = {
      worker: this.journalForm.value.worker,
      date: utcDate
    }
  }

  buildForm() {
    this.journalBuilder();
    console.log(this.journal);
    this.journalService.create(this.journal)
      .subscribe(
        p => console.log(p)
      )
  }
}
