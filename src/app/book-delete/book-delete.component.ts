import { Component, OnInit, Input, TemplateRef, ViewChild, Output, EventEmitter  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book, DbService } from '../db.service';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})
export class BookDeleteComponent implements OnInit {

  @Input() book!: Book;
  @ViewChild('content') content!: TemplateRef<any>;
  @Output() deleteBook: EventEmitter<Book> = new EventEmitter();

  constructor(private modalService: NgbModal, private dbService: DbService) { }

  ngOnInit(): void {}

  open_modal() {
    this.open(this.content);
  }

  private open(content: TemplateRef<any>) {
    this.modalService.open(content, { scrollable: true, size: 'lg' });
  }

  delete() {
    this.dbService.deleteBook(this.book.id).subscribe(_ => 
      this.deleteBook.emit(this.book));
    this.ngOnInit();
    
    this.dbService.notifyOther({refresh: true});
    //window.location.reload();
    this.modalService.dismissAll();
  }

}
