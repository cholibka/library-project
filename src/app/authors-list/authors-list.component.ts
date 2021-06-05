import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Author, DbService } from '../db.service';
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
    this.dialog.open(DeleteAuthorComponent, {
      panelClass: "dialog-responsive",
      data: author
    })
  }

  delete(id: number) {

    console.log(id)
    let ix = 0;
    const author = this.dataSource.data.find((el, idx) => {ix = idx; return el.id == id});
    console.log(author)
    console.log(ix)
    this.dataSource.data.splice(ix, 1);
    this.dbService.deleteAuthor(author!.id).subscribe(_ => 
      this.deleteAuthor.emit(author));

    this.dataSource._updateChangeSubscription();

  }
}
