import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  items = [];
  idItem = new BehaviorSubject<any>('');
  constructor() { }


  getItems() {
    if(localStorage.getItem("items")){
      return this.items = JSON.parse(localStorage.getItem("items"));
    } else {
      return [];
    }
  }
  setId(id) {
    this.idItem.next(id);
  }

  setItems() {
    localStorage.setItem("items", JSON.stringify(this.items))

  }
}
