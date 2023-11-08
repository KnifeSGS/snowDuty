import { Component, Input, OnInit } from '@angular/core';
// import { InputObject } from 'src/app/snow-duty/models/input-object';
import { Itemdata } from 'src/app/snow-duty/models/itemdata';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() material: Itemdata = new Itemdata()

  constructor() {
  }

  ngOnInit() {
  }

}
