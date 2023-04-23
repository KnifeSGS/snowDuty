import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user';
import { Journal } from '../../models/journal';
import { Shift } from '../../models/shift';
import { JournalService } from '../../services/journal.service';
import { ShiftService } from '../../services/shift.service';
import { UserService } from '../../services/user.service';
import { PdfCreatorComponent } from '../pdf-creator/pdf-creator.component';
import { ShiftCreatorComponent } from '../shift-creator/shift-creator.component';

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

  journal: Journal = new Journal();
  journalId: string | undefined = '';

  shifts: Shift[] = []
  journalUpdateData: Journal = new Journal();
  journalForm!: FormGroup;
  users!: User[];
  worker: User = new User();
  mobile: boolean = false;

  editableWorker: boolean = false;
  canAddCheck: boolean = false;
  defaultSortOrder: number = 1

  constructor(
    private activatedRoute: ActivatedRoute,
    private journalService: JournalService,
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private shiftService: ShiftService
  ) {
    this.getJournal();
    this.createForm();

  }

  ngOnInit(): void {
    if (window.screen.width < 420) { // 768px portrait
      this.mobile = true;
    };

    this.getUsers();
  }

  hideDialog() {
    this.shiftDialog = false;
    this.submitted = false;
  }

  createForm() {
    this.journalForm = this.fb.group({
      worker: [''],
      date: [''],
      checks: this.fb.group({
        checking: ['', Validators.required],
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
    this.userService.getAll().subscribe(
      // users => this.users$ = of(users)
      users => this.users = users
    );
  };

  getJournal() {
    this.activatedRoute.params.subscribe(
      params => this.journalService.get(params['id']).subscribe(
        journal => {
          this.journal = journal;
          this.shiftService.getAllForOneJournal$(journal._id!);
          this.shiftService.shifts$.subscribe((shifts) => {
            this.shifts = shifts
          });
          // console.log(this.journal.checks);
        })
    );
  }

  editWorkerDate() {
    this.editableWorker = true
  }

  addCheck() {
    this.canAddCheck = !this.canAddCheck;
  }

  workerSelected() {
    this.worker = this.journalForm.value.worker
  }

  journalBuilder() {
    const date = this.journalForm.value.date
    let utcDate = this.journal.date;
    if (date) {
      utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    }

    if (this.canAddCheck) {
      this.journalUpdateData = {
        _id: this.journal._id,
        worker: this.journalForm.value.worker._id,
        date: utcDate,
        checks: this.journalForm.value.checks,
        comment: this.journalForm.value.comment
      }
    } else {
      this.journalUpdateData = {
        _id: this.journal._id,
        worker: this.journalForm.value.worker._id,
        date: utcDate,
        comment: this.journalForm.value.comment
      }
    }

  }

  buildForm() {
    const id = this.journal._id
    this.journalBuilder();
    if (id) {
      this.journalService.update(this.journalUpdateData)
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
