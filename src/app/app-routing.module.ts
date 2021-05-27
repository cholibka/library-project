import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { BooksListComponent } from './books-list/books-list.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { EditBookComponent } from './edit-book/edit-book.component';

const routes: Routes = [
  {path: 'home', redirectTo: '/home/', pathMatch: 'full' },
  //books
  {path: 'home/:query', component: BooksListComponent},
  {path: 'book/edit/:bookId', component: EditBookComponent},
  {path: 'book/add', component: AddBookComponent},
  //categories
  {path: 'categories', component: CategoriesListComponent},
  {path: 'category/add', component: CategoriesListComponent},
  {path: '', redirectTo: '/home/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
