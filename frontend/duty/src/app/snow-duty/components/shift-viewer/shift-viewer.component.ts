import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Shift } from '../../models/shift';
import { JournalService } from '../../services/journal.service';
import { ShiftService } from '../../services/shift.service';
import { UserService } from '../../services/user.service';
import { ShiftCreatorComponent } from '../shift-creator/shift-creator.component';

@Component({
  selector: 'app-shift-viewer',
  templateUrl: './shift-viewer.component.html',
  styleUrls: ['./shift-viewer.component.scss']
})
export class ShiftViewerComponent implements OnInit {

  @ViewChild(ShiftCreatorComponent)
  child!: ShiftCreatorComponent;

  defaultSortOrder: number = -1;
  users$: BehaviorSubject<User[]> = this.userService.list$;
  userNames: string[] = [];
  shifts$: BehaviorSubject<Shift[]> = this.shiftService.shifts$;
  shift: Shift = new Shift();
  shiftDialog = false;
  journalId: string = "";
  mobile: boolean = false;

  viewWidth: string = '60vw';
  shiftViewerStyle: {} = {};
  submitted = false;

  // @Input() shiftsArr: Shift[] | undefined = []

  constructor(
    private userService: UserService,
    private shiftService: ShiftService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private journalService: JournalService
  ) {

  }

  ngOnInit() {
    this.shiftService.getAll$();
    this.userService.getAll$();
    this.users$.subscribe(users => users.forEach(user => {
      this.userNames.push(user.full_name)
    }))

    if (window.screen.width < 420) { // 768px portrait
      this.mobile = true;
      this.viewWidth = '100vw'
    };

    this.shiftViewerStyle = {
      'max-width': this.viewWidth,
      'max-height': '80vh'
    }

    this.getShifts();
  }

  getShifts() {
    this.activatedRoute.params.subscribe(
      params => {
        if (params['id']) {
          this.journalService.get(params['id']).subscribe(
            journal => {
              if (journal._id) {
                this.shiftService.getAllForOneJournal$(journal._id);
                this.journalId = journal._id;
              }
            })
        } else {
          this.shiftService.getAll$();
          this.shifts$ = this.shiftService.list$;
        }
      }
    );
  }

  journalIdMatcher() {
    // this.shiftsArr
  }

  addShift() {
    this.shift = new Shift();
    this.submitted = false;
    this.shiftDialog = true;
  }

  hideDialog() {
    this.shiftDialog = false;
    this.submitted = false;
  }

  saveShift() {
    if (this.child.shiftForm.valid) {
      this.child.createShift();
      this.activatedRoute.params.subscribe(
        params => {
          this.journalService.get(params['id']).subscribe(
            journal => {
              if (journal._id) {
                this.shiftService.getAllForOneJournal$(journal._id)
              }
            })
        })
      this.shiftDialog = false;
    }
  }

  deleteShift(shift: Shift) {
    console.log(shift);
    this.confirmationService.confirm({
      message: 'Biztosan törlöd az ügyeleti bejegyzést?',
      header: 'Megerősítés',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (shift._id) {
          this.shiftService.remove(shift._id).subscribe(
            () => {
              this.getShifts()
            }
          )
        }
        this.messageService.add({ severity: 'success', summary: 'Sikeres', detail: 'Ügyeleti idő törölve', life: 3000 });
      }
    });
  }

}
