import { Injectable } from '@angular/core';

import { Book } from '.././data/book';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  private baseURL = "https://localhost:5000/api/";

  private allBooksURL = this.baseURL + "books";
  getAllBooks(order: string): Observable<Book[]> {
    order ??= "title";
    return this.http.get<Book[]>(this.allBooksURL, {
      observe: "body", responseType: "json", params: new HttpParams().append("order", order)
    });
  }

  private recommendedBooksURL = this.baseURL + "recommended";
  getRecommendedBooks(genre: string): Observable<Book[]> {
    return this.http.get<Book[]>(this.recommendedBooksURL, {
      observe: 'body', responseType: "json", params: genre ? new HttpParams().append("genre", genre) : undefined
    });
  }

  private bookByIdURL = this.baseURL + "books/";
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(this.bookByIdURL + id, {
      observe: 'body', responseType: "json"
    });
  }

  private bookUpdateURL = this.baseURL + "books/save";
  sendBook(book: Book): Observable<any> {
    return this.http.post<Book>(this.bookUpdateURL, book);
  }

  private genreURL = this.baseURL + "genres";
  getGenres(): Observable<string[]> {
    return this.http.get<string[]>(this.genreURL, {
      observe: "body", responseType: "json"
    });
  }
}
