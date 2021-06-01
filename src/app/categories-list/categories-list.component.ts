import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
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
  categories!: Category[];
  dataSource = new MatTableDataSource(this.categories);

  @Output() deleteCategory: EventEmitter<Category> = new EventEmitter();

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

  delete(id: number) {
    console.log(id)
    const category = this.dataSource.data.find(el => el.id == id);
    console.log(category);
    this.dataSource.data.splice(id - 1, 1);

    this.dbService.deleteCategory(category!.id).subscribe(_ => 
      this.deleteCategory.emit(category));

    this.dataSource._updateChangeSubscription();
  }
}

