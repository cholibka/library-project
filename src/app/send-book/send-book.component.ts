import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book, DbService } from '../db.service';

@Component({
  selector: 'app-send-book',
  templateUrl: './send-book.component.html',
  styleUrls: ['./send-book.component.css']
})
export class SendBookComponent {

  amount = new FormControl('', [Validators.required, Validators.min(1), Validators.max(this.book.quantity)]);
  @Output() outputValues: EventEmitter<Book> = new EventEmitter();


  constructor(public dialogRef: MatDialogRef<SendBookComponent>, @Inject(MAT_DIALOG_DATA) public book: Book, private dbService: DbService) {}

  onSubmit() {
    this.book.quantity = this.book.quantity - this.amount.value;

    this.dbService.updateBook(this.book).subscribe(_ => {
      this.outputValues.emit(this.book);
    });

    this.dbService.notifyOther({refresh: true});
    this.dialogRef.close();
  }
}
