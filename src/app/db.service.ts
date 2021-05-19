import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export class Book {
  constructor(public ISBN: number, public title: string, public author: string, public dateReleased: number, public pages: number, public description: string, public categories: string[]) { }
}

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private url = 'http://localhost:3000/books';
  
  constructor(private http: HttpClient) { }
  
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url).pipe(
      catchError(this.handleError<Book[]>('getBook', []))
    );
  }


  private handleError<T>(operation = 'operation', result: T) {
    return (error: any): Observable<T> => {
      console.error(operation + 'failed' + error);
      return of(result);
    };
  }

}
