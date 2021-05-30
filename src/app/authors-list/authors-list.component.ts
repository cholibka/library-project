import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dbService: DbService) { 
    dbService.getAuthors().subscribe(authors => {
      this.authors = authors;
      authors.forEach(element => {
        this.dataSource.data.push(element);
        this.dataSource._updateChangeSubscription();
      })
    })
  }

  ngOnInit(): void {
    this.dbService.notifyObservable$.subscribe(res => {
      if(res.refresh) {
        this.dbService.getAuthors().subscribe(authors => {
          this.authors = this.authors;
        })
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}
