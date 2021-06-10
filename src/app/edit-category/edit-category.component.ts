import { Component, EventEmitter, Inject, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book, Category, DbService } from '../db.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent {

  @ViewChild('content') content!: TemplateRef<any>;
  @Output() outputValues: EventEmitter<Category> = new EventEmitter();
  @Output() outputBook: EventEmitter<Book> = new EventEmitter();


  categoryName = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZżŻĄĆŹĘÓóźćąęŚś]*$'), Validators.maxLength(50)]);

  constructor(public dialogRef: MatDialogRef<EditCategoryComponent>, @Inject(MAT_DIALOG_DATA) public category: Category, private dbService: DbService) { 
    this.categoryName.setValue(category.name)
  }
  

  onSubmit() {
    this.category.name = this.categoryName.value;

    console.log(this.category)
    this.dbService.updateCategory(this.category).subscribe(_ => {
      this.outputValues.emit(this.category);
    })

    this.dbService.getBooks().subscribe(books => {
      books.forEach(book => {
        for(var i = 0; i < book.categories.length; i++) {
          if(book.categories[i].id == this.category.id) {
            book.categories[i] = this.category;
            this.dbService.updateBook(book).subscribe(_ => {
              this.outputBook.emit(book);
            })
          }
        }
      });
    })

    setTimeout(() => {
      this.dbService.notifyOther({refresh: true})}, 500
      );

    this.dialogRef.close();

  }


}
