import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, DbService } from './db.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'library-project';
  data: Observable<Book[]>;

  constructor(private dbService: DbService) {
    this.data = dbService.getBooks();
    console.log(this.data)
  }
}
