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
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { DeleteAuthorComponent } from './delete-author/delete-author.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { StyleManagerService } from './style-manager.service';
import { MenuComponent } from './menu/menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SendBookComponent } from './send-book/send-book.component';

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
    EditCategoryComponent,
    EditAuthorComponent,
    AddCategoryComponent,
    AddAuthorComponent,
    DeleteAuthorComponent,
    DeleteCategoryComponent,
    MenuComponent,
    SendBookComponent,
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
    MatSortModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule
  ],
  providers: [DbService, StyleManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
