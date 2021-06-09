import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category, DbService } from '../db.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category?: Category;
  lastId!: number;
  @ViewChild('content') content!: TemplateRef<any>;
  @Output() outputValues: EventEmitter<Category> = new EventEmitter();
  
  categoryName = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZżŻĄĆŹĘÓóźćąęŚś]*$'), Validators.maxLength(50)]);
  
  constructor(private dbService: DbService, private router: Router) { 
    dbService.getCategories().subscribe(categories => {
      this.lastId = categories[categories.length - 1].id + 1;
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {

    this.category = new Category(this.lastId, this.categoryName.value);
    console.log(this.category)
    this.dbService.addCategory(this.category).subscribe(_ => {
      this.outputValues.emit(this.category);
    })

    setTimeout(() => {
      this.dbService.notifyOther({refresh: true})}, 500
      );
    this.router.navigate(['/categories']);

  }

}
