import { Component, EventEmitter, Inject, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category, DbService } from '../db.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent {

  @ViewChild('content') content!: TemplateRef<any>;
  @Output() outputValues: EventEmitter<Category> = new EventEmitter();

  categoryName = new FormControl('');
  
  constructor(public dialogRef: MatDialogRef<EditCategoryComponent>, @Inject(MAT_DIALOG_DATA) public category: Category, private dbService: DbService) { 
    this.categoryName.setValue(category.name)
  }
  

  onSubmit() {
    this.category.name = this.categoryName.value;

    console.log(this.category)
    this.dbService.updateCategory(this.category).subscribe(_ => {
      this.outputValues.emit(this.category);
    })

    setTimeout(() => {
      this.dbService.notifyOther({refresh: true})}, 500
      );

    this.dialogRef.close();

  }


}
