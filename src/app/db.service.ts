import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { StyleManagerService } from './style-manager.service';


//Model for Themes
export interface Option {
  backgroundColor: string;
  buttonColor: string;
  headingColor: string;
  label: string;
  value: string;
}

// Models
export class Book {
  constructor(public id: number, public title: string, public author: Author, public dateReleased: number, public description: string, public categories: Category[], public quantity: number) { }
}
export class Category {
  constructor(public id: number, public name: string) { }
}

export class Author {
  constructor(public id: number, public name: string, public surname: string) { }
}


// Service

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private url = 'http://localhost:3000/';
  public notify = new BehaviorSubject<any>('');
  notifyObservable$ = this.notify.asObservable();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient, private styleManager: StyleManagerService) { }

  //Themes
  getThemeOptions(): Observable<Array<Option>> {
    return this.http.get<Array<Option>>("assets/options.json");
  }

  setTheme(themeToSet: string) {
    this.styleManager.setStyle(
      "theme",
      `${themeToSet}.css`
    );
  }
  // Refresh Component 
  notifyOther(data: any) {
    if (data) {
        this.notify.next(data);
    }
  }
  // Utilities

  searchBooks(query: string): Observable<Book[]> {
    if(!query.trim()) {
      return of([]); // If there isn't search query, return empty books array
    }
    return this.http.get<Book[]>(this.url + 'books?q=' + query).pipe(
      catchError(this.handleError<Book[]>('searchBooks', []))
    );
  }

  searchAuthors(query: string): Observable<Author[]> {
    if(!query.trim()) {
      return of([]); // If there isn't search query, return empty books array
    }
    return this.http.get<Author[]>(this.url + 'authors?q=' + query).pipe(
      catchError(this.handleError<Author[]>('searchAuthors', []))
    );
  }

  searchCategories(query: string): Observable<Category[]> {
    if(!query.trim()) {
      return of([]); // If there isn't search query, return empty books array
    }
    return this.http.get<Category[]>(this.url + 'categories?q=' + query).pipe(
      catchError(this.handleError<Category[]>('searchCategories', []))
    );
  }

  // POST | Create

  addBook(book: Book): Observable<any> {
    return this.http.post<Book>(this.url + 'books', book, this.httpOptions).pipe(
      catchError(this.handleError<any>('addBook'))
    );
  }

  addCategory(category: Category): Observable<any> {
    return this.http.post<Category>(this.url + 'categories', category, this.httpOptions).pipe(
      catchError(this.handleError<any>('addCategory'))
    );
  }

  addAuthor(author: Author): Observable<any> {
    return this.http.post<Author>(this.url + 'authors', author, this.httpOptions).pipe(
      catchError(this.handleError<any>('author'))
    );
  }

  // GET | Read

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url + 'books').pipe(
      catchError(this.handleError<Book[]>('getBook', []))
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + 'categories').pipe(
      catchError(this.handleError<Category[]>('getCategories', []))
    );
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.url + 'authors').pipe(
      catchError(this.handleError<Author[]>('getAuthors', []))
    );
  }

  // PUT | Update (replace)

  updateBook(book: Book): Observable<any> {
    return this.http.put<Book>(this.url + 'books/' + book.id, book, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateBook'))
    );
  }

  updateCategory(category: Category): Observable<any> {
    return this.http.put<Category>(this.url + 'categories/' + category.id, category, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateCategory'))
    );
  }

  updateAuthors(author: Author): Observable<any> {
    return this.http.put<Author>(this.url + 'authors/' + author.id, author, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateAuthors'))
    );
  }

  // DELETE | Delete

  deleteBook(ISBN: number): Observable<any> {
    return this.http.delete<Book>(this.url + 'books/' + ISBN, this.httpOptions).pipe(
      catchError(this.handleError<any>('deleteBook'))
    );
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<Category>(this.url + 'categories/' + id, this.httpOptions).pipe(
      catchError(this.handleError<any>('deleteCategory'))
    );
  }

  deleteAuthor(id: number): Observable<any> {
    return this.http.delete<Author>(this.url + 'authors/' + id, this.httpOptions).pipe(
      catchError(this.handleError<any>('deleteAuthor'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + 'failed' + error);
      return of(result as T);
    };
  }

}
