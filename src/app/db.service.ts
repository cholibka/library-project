import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

// Models

export class Book {
  constructor(public ISBN: number, public title: string, public author: string, public dateReleased: number, public pages: number, public description: string, public categories: string[]) { }
}
export class Category {
  constructor(public id: number, public name: string) { }
}

export class BookCategory {
  constructor(public bookISBN: number, public categoryId: number) { }
}

export class User {
  constructor(public id: number, public firstName: string, public lastName: string, public email: string, public password: string, public isWorker: true) { }
}

export class BookBorrowed {
  constructor(public bookISBN: number, public userId: number) { }
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

  addUser(user: User): Observable<any> {
    return this.http.post<User>(this.url + 'users', user, this.httpOptions).pipe(
      catchError(this.handleError<any>('addUser'))
    );
  }

  addBookBorrowed(bookBorrowed: BookBorrowed): Observable<any> {
    return this.http.post<BookBorrowed>(this.url + 'bookBorrowed', bookBorrowed, this.httpOptions).pipe(
      catchError(this.handleError<any>('addBookBorrowed'))
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

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'users').pipe(
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  getBooksBorrowed(): Observable<BookBorrowed[]> {
    return this.http.get<BookBorrowed[]>(this.url + 'booksBorrowed').pipe(
      catchError(this.handleError<BookBorrowed[]>('getBooksBorrowed', []))
    );
  }

  // PUT | Update (replace)

  updateBook(book: Book): Observable<any> {
    return this.http.put<Book>(this.url + 'books', book, this.httpOptions).pipe(
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

  updateUser(user: User): Observable<any> {
    return this.http.put<User>(this.url + 'users', user, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateUser'))
    );
  }

  updateBookBorrowed(bookBorrowed: BookBorrowed): Observable<any> {
    return this.http.put<BookBorrowed>(this.url + 'bookBorrowed', bookBorrowed, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateBookBorrowed'))
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

  deleteUser(id: number): Observable<any> {
    return this.http.delete<User>(this.url + 'users?id=' + id, this.httpOptions).pipe(
      catchError(this.handleError<any>('deleteUser'))
    );
  }

  deleteBookBorrowed(ISBN: number, userId: number): Observable<any> {
    return this.http.delete<BookBorrowed>(this.url + 'bookBorrowed?bookISBN=' + ISBN + '&userId=' + userId, this.httpOptions).pipe(
      catchError(this.handleError<any>('deleteBookBorrowed'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + 'failed' + error);
      return of(result as T);
    };
  }

}
