import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, DbService } from '../db.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  data: Observable<Book[]>;

  constructor(private dbService: DbService) {
    this.data = dbService.getBooks();
    console.log(this.data)
  }
  
  searchBooks(books: Observable<Book[]>) {
    this.data = books;
  }

  ngOnInit(): void {
  }

}
