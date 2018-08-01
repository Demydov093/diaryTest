import { Component, OnInit } from '@angular/core';
import {ItemsService} from "../services/items.service";

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  items = [];
  hightlightStatus: Array<boolean> = [];

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    this.items = this.itemsService.getItems();
  }

  hightlight(i) {
    this.hightlightStatus = []
    this.hightlightStatus[i] = true;
    this.itemsService.setId(this.items[i]);
  }

  add(value){
    if(value){
      this.items.push({"title": value, "comments": []});
      this.itemsService.setItems()
    }
  }

  delete(id) {
    this.hightlightStatus = []
    this.items.splice(id, 1);
    this.itemsService.idItem.next(null);
    this.itemsService.setItems()
  }

}
