import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Inventory } from '../../models/inventory';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-viewer',
  templateUrl: './inventory-viewer.component.html',
  styleUrls: ['./inventory-viewer.component.scss']
})
export class InventoryViewerComponent implements OnInit {

  items$: BehaviorSubject<Inventory[]> = this.inventoryService.items$

  constructor(
    private inventoryService: InventoryService
  ) { }

  getItems() {
    // this.inventoryService.getAll().subscribe(
    //   item => console.log(item)
    // )
    this.inventoryService.getLastInventoryData$()
    this.items$.subscribe(items => console.log(items));
  }

  ngOnInit() {
    this.getItems()
  }

}
