import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inventory } from '../../models/inventory';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-viewer',
  templateUrl: './inventory-viewer.component.html',
  styleUrls: ['./inventory-viewer.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryViewerComponent implements OnInit, OnDestroy {

  items$: BehaviorSubject<Inventory> = this.inventoryService.items$

  constructor(
    private inventoryService: InventoryService
  ) {
  }


  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

}
