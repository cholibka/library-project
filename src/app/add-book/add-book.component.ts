import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Author, Book, Category, DbService } from '../db.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  @Output() outputValues: EventEmitter<Book> = new EventEmitter();

  book?: Book;
  Categories!: Category[];
  Authors!: Author[];
  
  bookForm = this.formBuilder.group({
    ISBN: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    dateReleased: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    categories: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required)
  })
  
  constructor(private dbService: DbService, private formBuilder: FormBuilder, private router: Router) {
    dbService.getCategories().subscribe(categories => {
      this.Categories = categories;
    });

    dbService.getAuthors().subscribe(authors => {
      this.Authors = authors;
    });
   }

  ngOnInit(): void {}

  onSubmit() {

    this.book = new Book(
      this.bookForm.value.ISBN, 
      this.bookForm.value.title, 
      this.bookForm.value.author, 
      this.bookForm.value.dateReleased, 
      this.bookForm.value.description, 
      this.bookForm.value.categories, 
      this.bookForm.value.quantity);
   
    this.dbService.addBook(this.book).subscribe(_ => {
      this.outputValues.emit(this.book);
    });

    this.router.navigate(['/home']);
  }

}
