import { Component, TemplateRef, ViewChild, Output, EventEmitter, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book, DbService } from '../db.service';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})
export class BookDeleteComponent {

  @ViewChild('content') content!: TemplateRef<any>;
  @Output() deleteBook: EventEmitter<Book> = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<BookDeleteComponent>, @Inject(MAT_DIALOG_DATA) public book: Book, private dbService: DbService) { }

  delete() {
    this.dbService.deleteBook(this.book.id).subscribe(_ => 
      this.deleteBook.emit(this.book));
    
    setTimeout(() => {
      this.dbService.notifyOther({refresh: true})}, 500
      );
    this.dialogRef.close();
  }
}
