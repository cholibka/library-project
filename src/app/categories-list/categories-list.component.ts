import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Category, DbService } from '../db.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  category!: Observable<Category[]>;

  constructor(private dbService: DbService, private route: ActivatedRoute) { 
    this.category = dbService.getCategories();
  }

  ngOnInit(): void {
    this.dbService.notifyObservable$.subscribe(res => {
      if(res.refresh){
          this.category = this.dbService.getCategories();
      }
    });
  }
}

