import { Component, signal, WritableSignal } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Car } from '../../models/car';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-cars-viewer',
  templateUrl: './cars-viewer.component.html',
  styleUrl: './cars-viewer.component.scss'
})
export class CarsViewerComponent {

  // feliratok
  Delete: string = "Törlés";
  NewJournal: string = "Új napló";
  NewCar: string = "Új gépjármű";
  Import: string = "Feltöltés";
  Export: string = "Letöltés";
  Search: string = "Keresés . . .";
  Clear: string = "Keresés törlése";

  mobile: boolean = false;
  submitted!: boolean;
  paginatorTemplate = "";
  selectedCars!: Car[];
  carNames: string[] = [];

  defaultSortOrder: number = 1

  openedDialogName!: string
  dialogs: { [key: string]: boolean } = {
    carDialog: false
  }

  carsSignal: WritableSignal<Car[]> = signal([]);

  constructor(
    private carsService: CarsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.getCars()
  }

  ngOnInit() {
    if (window.screen.width < 420) { // 768px portrait
      this.mobile = true;
    };
  }

  async getCars() {
    await this.carsService.fetchForSignal()
      .then(
        cars => {
          // console.log(cars.results);
          cars.results.forEach((car: Car) => {
            this.carNames.push(car.name)
          })
          return this.carsSignal.set(cars.results)
        }
      )
  }



  // Dialog
  openDialog(event: any) {
    this.openedDialogName = event.target.parentElement.id
    this.submitted = false;
    this.dialogs[event.target.parentElement.id] = true;
  }

  openEditDialog(event: any, car: Car) {
    console.log(event);
    console.log(car);
    // this.user = user
    // this.openedDialogName = event.target.parentElement.id
    // this.submitted = false;
    // this.dialogs[event.target.parentElement.id] = true;
    // this.editChildUser.userFormBuilder(user)
  }

  hideDialog() {
    this.dialogs[this.openedDialogName] = false
    this.submitted = false;
  }

  newCar() {

  }

  editCar() {

  }

  deleteCar(car: Car) {

  }

  clear(table: Table) {
    table.clear();
  }

}
