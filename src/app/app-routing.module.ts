import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { BooksListComponent } from './books-list/books-list.component';
import { EditBookComponent } from './edit-book/edit-book.component';

const routes: Routes = [
  {path: 'home', redirectTo: '/home/', pathMatch: 'full' },
  {path: 'home/:query', component: BooksListComponent},
  {path: 'editBook/:bookId', component: EditBookComponent},
  {path: 'addBook', component: AddBookComponent},
  {path: '', redirectTo: '/home/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
