import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, Category, DbService } from '../db.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book!: Book;
  Categories!: Category[];
  SelectedCategories: Category[] = [];

  bookForm = this.formBuilder.group({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    dateReleased: new FormControl('', Validators.required),
    pages: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    categories: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required)
  })

  constructor(private route: ActivatedRoute, private router: Router, private dbService: DbService, private formBuilder: FormBuilder) {
    dbService.getBooks().subscribe(books => {
      this.route.params.subscribe(params => {
        this.book = books.find(b => b.id == params['bookId']) ?? new Book(0, "a", "a", 1, 1, "a", [new Category(0, "default")], 10);
        this.bookForm.get('title')?.setValue(this.book?.title);
        this.bookForm.get('author')?.setValue(this.book?.author);
        this.bookForm.get('dateReleased')?.setValue(this.book?.dateReleased);
        this.bookForm.get('pages')?.setValue(this.book?.pages);
        this.bookForm.get('description')?.setValue(this.book?.description);
        this.bookForm.get('quantity')?.setValue(this.book?.quantity);
      })
    })
    dbService.getCategories().subscribe(categories => {
      this.Categories = categories;
      this.Categories.forEach(category => {
        this.book?.categories.forEach(bookCategory => {
          if(bookCategory.id == category.id) this.SelectedCategories.push(category)
        });
      });
      this.bookForm.get('categories')?.setValue(this.SelectedCategories);
    });

  }

  ngOnInit(): void {}

  get categoryName() {
    return this.bookForm.get('categories');
  }

  onSubmit() {
    this.book.title = this.bookForm.value.title;
    this.book.author = this.bookForm.value.author;
    this.book.dateReleased = this.bookForm.value.dateReleased;
    this.book.pages = this.bookForm.value.pages;
    this.book.description = this.bookForm.value.description;
    this.book.categories = this.bookForm.value.categories;
    this.book.quantity = this.bookForm.value.quantity;

    this.dbService.updateBook(this.book).subscribe();
    this.router.navigate(['/home']);
  }

  changeCategory(e: any) {
    this.categoryName!.setValue(e.target.value, {
      onlySelf: true
    })
  }

}
