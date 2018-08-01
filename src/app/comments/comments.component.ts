import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ItemsService} from "../services/items.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments = [];
  showTextarea = false;
  @ViewChild("comment") comment: ElementRef;

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    this.itemsService.idItem.subscribe(res => {
      if(res){
        this.setData(true, res.comments);
      } else {
        this.setData(false, []);
      }
      if (this.comment) {
        this.comment.nativeElement.value = "";
      }
    });
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === 13 && event.ctrlKey && this.comment.nativeElement.value === "" ) {
      this.comment.nativeElement.focus();
    }
    if (event.keyCode === 13 && event.ctrlKey && this.comment.nativeElement.value !== "" ) {
      this.add(this.comment.nativeElement.value);
      if (this.comment) {
        this.comment.nativeElement.value = "";
      }
    }
  }

  add(value) {
    if(value) {
      this.comments.push(value);
      this.itemsService.setItems();
    }
  }

  setData(bool, values) {
    this.showTextarea = bool;
    this.comments = values;
  }

}
