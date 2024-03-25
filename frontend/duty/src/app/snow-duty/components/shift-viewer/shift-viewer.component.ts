import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, Input, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { JournalService } from '../../services/journal.service';
import { ShiftService } from '../../services/shift.service';
import { UserService } from '../../services/user.service';
import { ShiftCreatorComponent } from '../shift-creator/shift-creator.component';
import { DispersionsData } from '../../models/dispersions-data';
import { ApiOptions } from '../../models/api-options';
import { DispersionStore } from '../../store/dispersion.store';

@Component({
  selector: 'app-shift-viewer',
  templateUrl: './shift-viewer.component.html',
  styleUrls: ['./shift-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShiftViewerComponent implements OnInit {

  //   {
  //     "active": true,
  //     "journal": 46,
  //     "man": 1,
  //     "car": 1,
  //     "dispersion_start": "2024-03-15T17:22:00Z",
  //     "dispersion_end": "2024-03-15T19:22:00Z",
  //     "km": "21.00",
  //     "szortak": [{
  //        "active": true,
  //        "weight_in_kg": "17.00",
  //        "storage": 1,
  //        "compound": 2
  //      }]
  //    }

  #dispersionStore = inject(DispersionStore);
  shiftFromStore = this.#dispersionStore.shifts
  tableFromStore = this.#dispersionStore.table
  shiftStore = this.#dispersionStore.results
  itemStore = computed(() => {
    const items: any[] = []
    this.shiftStore().forEach((shift) => {
      const shiftItem: {
        "header": string,
        "id": string | number,
        "field": string
      } = {
        "header": "",
        "id": "",
        "field": ""
      }
      shift.szortak.forEach((szoras) => {
        const itemName = szoras.compound.name
        console.log(itemName);
        shiftItem.header = itemName
        shiftItem.id = szoras.id
        shiftItem.field = "weight_in_kg"
        return itemName;
      })
      if (shiftItem.header !== "") {
        items.push(shiftItem)
      }
    })
    // console.log(items.flat(1));
    return items.flat()
  })
  dispersionsSignal = computed(() => {
    const dispersed: any[] = []
    this.shiftStore().forEach((shift) => {
      return dispersed.push(shift.szortak)
    })
    return dispersed.flat()
  })
  queryParams: ApiOptions = {
    page_size: 50
  }

  // feliratok
  Delete: string = "Törlés";
  NewJournal: string = "Új napló";
  NewWorker: string = "Új dolgozó";
  Import: string = "Feltöltés";
  Export: string = "Letöltés";
  Search: string = "Keresés . . .";

  @ViewChild(ShiftCreatorComponent)
  child!: ShiftCreatorComponent;

  @Input() dispersions: number | null = null;
  shiftSignal: WritableSignal<DispersionsData[]> = signal([]);
  userSignal: WritableSignal<User[]> = signal([]);

  defaultSortOrder: number = -1;
  users$: BehaviorSubject<User[]> = this.userService.list$;
  userNames: string[] = [];
  // shifts$: BehaviorSubject<Shift[]> = this.shiftService.shifts$;
  shift: DispersionsData = new DispersionsData();
  shiftDialog = false;
  journalId: string = "";
  mobile: boolean = false;

  viewWidth: string = '60vw';
  shiftViewerStyle: {} = {};
  submitted = false;

  sums: {
    salt: number,
    basalt: number,
    cacl2: number,
    kalcinol: number,
    mixture: number,
    zeokal: number,
    km: number,
    workHour: number,
    orderedQuantity: number,
  } = {
      salt: 0,
      basalt: 0,
      cacl2: 0,
      kalcinol: 0,
      mixture: 0,
      zeokal: 0,
      km: 0,
      workHour: 0,
      orderedQuantity: 0,
    }

  // @Input() shiftsArr: Shift[] | undefined = []

  constructor(
    private userService: UserService,
    private shiftService: ShiftService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private journalService: JournalService
  ) {

    this.getShifts();

  }

  ngOnInit() {
    // this.shiftService.getAll$();
    // this.userService.getAll$();
    // this.users$.subscribe(users => users.forEach(user => {
    //   if (user.full_name) {
    //     this.userNames.push(user.full_name)
    //   } else {
    //     this.userNames.push(user.email)
    //   }
    // }))

    if (window.screen.width < 420) { // 768px portrait
      this.mobile = true;
      this.viewWidth = '100vw'
    };

    this.shiftViewerStyle = {
      'max-width': this.viewWidth,
      'max-height': '80vh'
    }

    this.#dispersionStore.load(this.queryParams)
    this.itemStore()

  }

  tesztArray = [
    {
      head: "fej1",
      data: "01"
    },
    {
      head: "fej2",
      data: "02"
    },
    {
      head: "fej3",
      data: "03"
    },
    {
      head: "fej4",
      data: "04"
    },
  ]

  async getShifts() {
    const journalID = this.activatedRoute.snapshot.params['id'];
    // let shifts;
    // if (journalID) {
    //   shifts = await this.shiftService.getAllForOneJournalSignal(journalID);
    // } else {
    //   shifts = await this.shiftService.fetchForSignal()
    // }
    // console.log(shifts.results);
    // this.shiftSignal.set(shifts.results)
    if (journalID) {
      this.queryParams.journal = journalID
      this.#dispersionStore.load(this.queryParams);
    } else {
      this.#dispersionStore.load(this.queryParams);
    }
    console.log(this.shiftStore());
  }

  getSums(field: "salt" | "basalt" | "cacl2" | "kalcinol" | "mixture" | "zeokal" | "km" | "workHour" | "orderedQuantity", journalId: string) {
    let fieldName: "salt" | "basalt" | "cacl2" | "kalcinol" | "mixture" | "zeokal" | "km" | "workHour" | "orderedQuantity" = field
    this.shiftService.getSumOfShiftsField({ field, journalId }).subscribe(sum => {
      this.sums[fieldName] = sum[0].total
      console.log(this.sums);
    });
  }

  getAllSums(journalId: string) {
    // let field: "salt" | "cacl2" | "kalcinol" | "mixture" | "zeokal" | "km" | "workHour" | "orderedQuantity"
    let fields:
      ["salt", "basalt", "cacl2", "kalcinol", "mixture", "zeokal", "km", "workHour", "orderedQuantity"] =
      ["salt", "basalt", "cacl2", "kalcinol", "mixture", "zeokal", "km", "workHour", "orderedQuantity"];

    fields.forEach(field => {
      // field = field
      this.shiftService.getSumOfShiftsField({ field, journalId }).subscribe(sum => {
        this.sums[field] = sum[0].total
        // console.log(this.sums);
      });

    });
  }

  journalIdMatcher() {
    // this.shiftsArr
  }

  addShift() {
    this.shift = new DispersionsData();
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
              if (journal.id) {
                // this.shiftService.getAllForOneJournal$(journal.id)
              }
            })
        })
      this.shiftDialog = false;
    }
  }

  deleteShift(shift: DispersionsData) {
    console.log(shift);
    this.confirmationService.confirm({
      message: 'Biztosan törlöd az ügyeleti bejegyzést?',
      header: 'Megerősítés',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (shift.id) {
          this.shiftService.remove(shift.id).subscribe(
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
