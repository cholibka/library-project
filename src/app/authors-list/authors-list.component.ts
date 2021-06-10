import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Author, Book, DbService } from '../db.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAuthorComponent } from '../delete-author/delete-author.component';
import { EditAuthorComponent } from '../edit-author/edit-author.component';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css']
})
export class AuthorsListComponent implements AfterViewInit {

  displayedColumns =["id", "name", "surname", "manage"];
  authors!: Author[];
  dataSource = new MatTableDataSource(this.authors);

  @Output() deleteAuthor: EventEmitter<Author> = new EventEmitter();
  @Output() outputBook: EventEmitter<Book> = new EventEmitter();


  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dbService: DbService, private dialog: MatDialog, private route: ActivatedRoute) { 
    this.loadAuthors();
  }

  loadAuthors()
  {
    this.route.params.subscribe(params => {
      if(params['query']){
        this.dbService.searchAuthors(params['query']).subscribe(authors => {
          this.dataSource.data = authors;
          this.dataSource._updateChangeSubscription();
        })
      } else {
        this.dbService.getAuthors().subscribe(authors => {
          this.dataSource.data = authors;
          this.dataSource._updateChangeSubscription();
        })
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  openEdit(author: Author) {
    this.dialog.open(EditAuthorComponent, {
      panelClass: "dialog-responsive",
      data: author
    })
  }

  openDelete(author: Author) {
    const dialogRef = this.dialog.open(DeleteAuthorComponent, {
      panelClass: "dialog-responsive",
      data: author
    });
 
    dialogRef.afterClosed().subscribe(r => {
      console.log(r)
      if(r) 
      {
        let ix = 0;
        const a = this.dataSource.data.find((el, idx) => {ix = idx; return el.id == r})
        this.dataSource.data.splice(ix, 1);
        this.dbService.deleteAuthor(a!.id).subscribe(_ => 
          this.deleteAuthor.emit(a));

        this.dbService.getBooks().subscribe(books => {
          books.forEach(book => {
            if(book.author.id == a!.id) {
              book.author.name = "Gall";
              book.author.surname = "Anonim";
              this.dbService.updateBook(book).subscribe(_ => {
                this.outputBook.emit(book);
              })
            }
          });
        })
        this.dataSource._updateChangeSubscription();
      }
    })
  }
}
