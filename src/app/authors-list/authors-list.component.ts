import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Author, DbService } from '../db.service';

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

  constructor(private dbService: DbService, private modalService: NgbModal) { 
    dbService.getAuthors().subscribe(authors => {
      console.log(authors)
      authors.forEach(element => {
        this.dataSource.data.push(element);
        this.dataSource._updateChangeSubscription();
        console.log(this.dataSource.data)
      })
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  open(author: Author) {
    this.modalService.open(author, {scrollable: true, size: 'xl'});
  }

  delete(id: number) {

    console.log(id)
    const author = this.dataSource.data.find(el => el.id == id);
    console.log(author)
    this.dataSource.data.splice(id - 1, 1);
    this.dbService.deleteAuthor(author!.id).subscribe(_ => 
      this.deleteAuthor.emit(author));

    this.dataSource._updateChangeSubscription();


  }
}
