import { Component, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../db.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {

  constructor(public dialogRef: MatDialogRef<BookDetailsComponent>, @Inject(MAT_DIALOG_DATA) public book: Book) { }
}
