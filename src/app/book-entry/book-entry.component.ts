import { Component, Input } from '@angular/core';
import { Book} from '../db.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { BookDeleteComponent } from '../book-delete/book-delete.component';

@Component({
  selector: 'app-book-entry',
  templateUrl: './book-entry.component.html',
  styleUrls: ['./book-entry.component.css']
})
export class BookEntryComponent {

  @Input('book') book!: Book;

  constructor(private dialog: MatDialog, private router: Router ) {}

  openDetails(): void {
    console.log(this.book)
    this.dialog.open(BookDetailsComponent, {
      panelClass: "dialog-details-responsive",
      data: this.book
    });
  }

  openDelete(): void {
    console.log(this.book)
    this.dialog.open(BookDeleteComponent, {
      panelClass: "dialog-responsive",
      data: this.book
    });
  }

  edit(id: number) {
    console.log(id)
    this.router.navigate(['/book/edit', id], {state: {data: this.book}});
  }

}
