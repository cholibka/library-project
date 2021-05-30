import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DbService } from './db.service';
import { BookEntryComponent } from './book-entry/book-entry.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './navbar/navbar.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookDefaultDirective } from './directives/book-default.directive';
import { EditBookComponent } from './edit-book/edit-book.component';
import { BooksListComponent } from './books-list/books-list.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BookDeleteComponent } from './book-delete/book-delete.component';
import { AddBookComponent } from './add-book/add-book.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { AuthorsListComponent } from './authors-list/authors-list.component';




@NgModule({
  declarations: [
    AppComponent,
    BookEntryComponent,
    NavbarComponent,
    BookDetailsComponent,
    BookDeleteComponent,
    BookDefaultDirective,
    EditBookComponent,
    BooksListComponent,
    AddBookComponent,
    CategoriesListComponent,
    AuthorsListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule
  ],
  providers: [DbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
