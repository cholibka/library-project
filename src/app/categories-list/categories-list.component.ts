import { AfterViewInit, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, DbService } from '../db.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CategoriesListComponent implements AfterViewInit {
  
  displayedColumns = ["id", "name", "manage"];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dbService: DbService, private router: Router, private modalService: NgbModal) { 
    dbService.getCategories().subscribe(categories => {
      categories.forEach(element => {
        this.dataSource.data.push(element);
        this.dataSource._updateChangeSubscription();
        console.log(this.dataSource.data)
      });
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  open(category: Category) {
    this.modalService.open(category, {scrollable: true, size: 'xl'});
  }
}

