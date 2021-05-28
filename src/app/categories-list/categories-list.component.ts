import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, DbService } from '../db.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dbService: DbService, private route: ActivatedRoute) { 
    dbService.getCategories().subscribe(categories => {
      this.categories = categories;
      categories.forEach(element => {
        this.dataSource.data.push(element);
        this.dataSource._updateChangeSubscription();
        console.log(this.dataSource.data)
      });
    });
  }

  ngOnInit(): void {
    this.dbService.notifyObservable$.subscribe(res => {
      if(res.refresh){
        this.dbService.getCategories().subscribe(categories => {
          this.categories = categories;
        });
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}

