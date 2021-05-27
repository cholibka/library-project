import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Book, DbService } from '../db.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  data!: Observable<Book[]>;

  constructor(private dbService: DbService, private route: ActivatedRoute) {
    this.loadBooks();
  }

  loadBooks()
  {
    this.route.params.subscribe(params => {
      if(params['query']){
        this.data = this.dbService.searchBooks(params['query']);
      } else {
        this.data = this.dbService.getBooks();
      }
    });
  }

  ngOnInit(): void { 
    this.dbService.notifyObservable$.subscribe(res => {
      if(res.refresh){
          this.data = this.dbService.getBooks();
      }
})
  }

}
