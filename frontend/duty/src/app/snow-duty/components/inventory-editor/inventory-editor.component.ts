import { Component, Input, NgIterable, OnInit, signal, Signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Inventory } from '../../models/inventory';
// import { BehaviorSubject, of, ReplaySubject } from 'xjs';
// import { Inventory } from '../../models/inventory';
// import { Stockpile } from '../../models/stockpile';
import { InventoryService } from '../../services/inventory.service';
// import { toSignal } from '@angular/core/rxjs-interop';
// import { Item } from '../../models/item';
// import { ItemService } from '../../services/item.service';
// import { Itemdata, sumsData } from '../../models/itemdata';
// import { InputObject } from '../../models/input-object';

@Component({
  selector: 'app-inventory-editor',
  templateUrl: './inventory-editor.component.html',
  styleUrls: ['./inventory-editor.component.scss']
})
export class InventoryEditorComponent implements OnInit {

  mobile: boolean = false

  itemProps = {
    salt: {
      name: "Só",
      src: "assets/hokotro/images/materials/salt.jpg"
    },
    cacl2: {
      name: "CaCl2",
      src: "assets/hokotro/images/materials/cacl2.jpeg"
    },
    mixture: {
      name: "Keverék",
      src: "assets/hokotro/images/materials/mixture.jpg"
    },
    basalt: {
      name: "Bazalt",
      src: "assets/hokotro/images/materials/basalt.jpeg"
    },
    kalcinol: {
      name: "Kalcinol",
      src: "assets/hokotro/images/materials/kalcinol.jpg"
    },
    zeokal: {
      name: "Zeokal",
      src: "assets/hokotro/images/materials/zeokal.jpg"
    }
  }

  // items$: BehaviorSubject<Item[]> | undefined = this.itemService.items$
  // stock$: ReplaySubject<Record<keyof Stockpile, string | number | undefined>> = this.inventoryService.stock$
  stock = signal([])
  // sums$: BehaviorSubject<Itemdata[]> = this.inventoryService.sums$

  stockForm: FormGroup

  constructor(
    private inventoryService: InventoryService,
    // private itemService: ItemService,
    private fb: FormBuilder,
  ) {
    this.stockForm = this.fb.group({
      salt: 0,
      basalt: 0,
      cacl2: 0,
      kalcinol: 0,
      mixture: 0,
      zeokal: 0
    })
    // this.sums$.subscribe(item => console.log(item));
    this.getStockPile()
  }

  ngOnInit(): void {
    // this.items$.subscribe(items => this.items = items)
    // this.items$.subscribe(
    //   items => {
    //     console.log(items)
    //     this.iItems = items
    //   }
    // )

    if (window.screen.width < 420) { // 768px portrait
      this.mobile = true;
    };
  }

  getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }

  async getStockPile() {
    const stockPile = await this.inventoryService.fetchApiForSignal()
    stockPile.forEach((item: any) => {
      const itemKey = this.getProperty(this.itemProps, item.k)
      item.src = itemKey.src
      item.name = itemKey.name
    })
    // console.log(stockPile);
    this.stock.set(stockPile)
  }

  stockBuilder() {
    const { salt, basalt, cacl2, kalcinol, mixture, zeokal } = this.stockForm.value
    const stock: Inventory = {}
    const stockMix: Inventory = {}
    const setStock = () => {
      stock.salt = salt === '' ? 0 : salt,
        stock.basalt = basalt === '' ? 0 : basalt,
        stock.cacl2 = cacl2 === '' ? 0 : cacl2,
        stock.kalcinol = kalcinol === '' ? 0 : kalcinol,
        stock.mixture = 0,
        stockMix.mixture = mixture === '' ? 0 : mixture,
        stock.zeokal = zeokal === '' ? 0 : zeokal
    }
    setStock()
    const newStock = [stock, stockMix]
    console.log(newStock);
    return newStock
  }

  buildStock() {
    // this.inventoryService.updateStock(this.stockBuilder(), { add: true })
    const stock = this.stockBuilder()
    if (this.stockForm.value.mixture !== 0) {
      this.inventoryService.updateStock(stock[0], { add: true }).subscribe(
        newStock => {
          console.log(newStock);
          // this.getStockPile()
          this.inventoryService.updateMix(stock[1]).subscribe(
            newStock => {
              console.log(newStock);
              this.getStockPile()
            }
          )
        }
      )
    } else {
      this.inventoryService.updateStock(stock[0], { add: true }).subscribe(
        stock => {
          console.log(stock);
          this.getStockPile()
        }
      )
    }
    // console.log(stock);
    // this.stockForm.reset()
    this.stockForm.setValue(
      {
        salt: 0,
        basalt: 0,
        cacl2: 0,
        kalcinol: 0,
        mixture: 0,
        zeokal: 0
      }
    )
    this.stockForm.markAsPristine()
  }

}
