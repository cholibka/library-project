import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Book, DbService } from '../db.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() booksEmitter = new EventEmitter<Observable<Book[]>>();
  books! : Observable<Book[]>;

  searchBook = this.formBuilder.group({query: ''})

  constructor(private formBuilder: FormBuilder, private dbService: DbService) { 
  }

  ngOnInit(): void {}

  onSubmit() : void {
    console.log(this.searchBook.value.query)
    this.books = this.dbService.searchBooks(this.searchBook.value.query);
    console.log(this.books)
    this.booksEmitter.emit(this.books)
  }
}
