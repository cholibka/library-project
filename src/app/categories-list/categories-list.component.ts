import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, DbService } from '../db.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { DeleteCategoryComponent } from '../delete-category/delete-category.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private dbService: DbService, private router: Router, private dialog: MatDialog, private route: ActivatedRoute) { 
    this.loadCategories();
  }

  loadCategories(){
    this.route.params.subscribe(params => {
      if(params['query']){
        this.dbService.searchCategories(params['query']).subscribe(categories => {
          this.dataSource.data = categories;
          this.dataSource._updateChangeSubscription();
        })
      } else {
        this.dbService.getCategories().subscribe(categories => {
          this.dataSource.data = categories;
          this.dataSource._updateChangeSubscription();
        })
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  openEdit(category: Category) {
    this.dialog.open(EditCategoryComponent, {
      panelClass: "dialog-responsive",
      data: category
    })
  }

  openDelete(category: Category) {
    this.dialog.open(DeleteCategoryComponent, {
      panelClass: "dialog-responsive",
      data: category
    })
  }

  delete(id: number) {
    console.log(id)
    let ix = 0;
    const category = this.dataSource.data.find((el, idx) =>{ ix = idx; return el.id == id});
    console.log(category);
    this.dataSource.data.splice(ix, 1);
    this.dbService.deleteCategory(category!.id).subscribe(_ => 
      this.deleteCategory.emit(category));

    this.dataSource._updateChangeSubscription();
  }
}

