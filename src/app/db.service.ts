import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

// Models

export class Book {
  constructor(public id: number, public title: string, public author: string, public dateReleased: number, public pages: number, public description: string, public categories: Category[], public quantity: number) { }
}
export class Category {
  constructor(public id: number, public name: string) { }
}

export class BookCategory {
  constructor(public bookISBN: number, public categoryId: number) { }
}


// Service

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private url = 'http://localhost:3000/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  // Utilities

  searchBooks(query: string): Observable<Book[]> {
    if(!query.trim()) {
      return of([]); // If there isn't search query, return empty books array
    }
    return this.http.get<Book[]>(this.url + 'books?q=' + query).pipe(
      catchError(this.handleError<Book[]>('searchBooks', []))
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

  addBookCategory(bookCategory: BookCategory): Observable<any> {
    return this.http.post<BookCategory>(this.url + 'booksCategories', bookCategory, this.httpOptions).pipe(
      catchError(this.handleError<any>('addBookCategory'))
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

  getBooksCategories(): Observable<BookCategory[]> {
    return this.http.get<BookCategory[]>(this.url + 'booksCategories').pipe(
      catchError(this.handleError<BookCategory[]>('getBookCategories', []))
    );
  }

  // PUT | Update (replace)

  updateBook(book: Book): Observable<any> {
    return this.http.put<Book>(this.url + 'books/' + book.id, book, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateBook'))
    );
  }

  updateCategory(category: Category): Observable<any> {
    return this.http.put<Category>(this.url + 'categories', category, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateCategory'))
    );
  }

  updateBookCategory(bookCategory: BookCategory): Observable<any> {
    return this.http.put<BookCategory>(this.url + 'booksCategories', bookCategory, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateBookCategory'))
    );
  }

  // DELETE | Delete

  deleteBook(ISBN: number): Observable<any> {
    return this.http.delete<Book>(this.url + 'books?ISBN=' + ISBN, this.httpOptions).pipe(
      catchError(this.handleError<any>('deleteBook'))
    );
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<Category>(this.url + 'categories?id=' + id, this.httpOptions).pipe(
      catchError(this.handleError<any>('deleteCategory'))
    );
  }

  deleteBookCategory(ISBN: number, categoryId: number): Observable<any> {
    return this.http.delete<BookCategory>(this.url + 'booksCategories?bookISBN=' + ISBN + '&categoryId=' + categoryId, this.httpOptions).pipe(
      catchError(this.handleError<any>('deleteBookCategory'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + 'failed' + error);
      return of(result as T);
    };
  }

}
