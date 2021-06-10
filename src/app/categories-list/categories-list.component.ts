import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, Category, DbService } from '../db.service';
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
  @Output() outputBook: EventEmitter<Book> = new EventEmitter();


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
    const dialogRef = this.dialog.open(DeleteCategoryComponent, {
      panelClass: "dialog-responsive",
      data: category
    });

    dialogRef.afterClosed().subscribe(r => {
      if(r) {
        let ix = 0;
        const c = this.dataSource.data.find((el, idx) =>{ ix = idx; return el.id == r});
        this.dataSource.data.splice(ix, 1);
        this.dbService.deleteCategory(c!.id).subscribe(_ => 
          this.deleteCategory.emit(c));

        this.dbService.getBooks().subscribe(books => {
          books.forEach(book => {
            for(var i = 0; i < book.categories.length; i++) {
              if(book.categories[i].id == c!.id) {
                book.categories.splice(i, 1);
                this.dbService.updateBook(book).subscribe(_ => {
                  this.outputBook.emit(book);
                })
              }
            }
          });
        })
        this.dataSource._updateChangeSubscription();
      }
    })
  }
}

