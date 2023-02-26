import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of, retry, tap, timeout } from 'rxjs';
import { Book } from '../data/book';
import { BookService } from '../service/book.service';
import { EditService } from '../service/edit.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit {

  constructor(private bookService: BookService, editService: EditService) {
    // https://stackoverflow.com/questions/47626045/typeerror-this-is-undefined-react-js-javascript
    // this is undefined... JS is hard.
    this.reactError = this.reactError.bind(this);

    editService.reloadList.subscribe(() => this.lastUpdate());
  }

  bookList: Observable<Book[]>;
  isLoaded = false;

  ngOnInit() {
    this.getAllBooks();
  }

  lastUpdate: Function

  allOrder: string;
  getAllBooks() {
    this.lastUpdate = this.getAllBooks;
    this.isError = false;
    this.isLoaded = false;
    this.bookList = this.bookService.getAllBooks(this.allOrder);
    // Shall I merge them?
    this.bookList = this.configurePipe(this.bookList);
  }

  recommendedGenre = "";
  getRecommendedBooks() {
    this.lastUpdate = this.getRecommendedBooks;
    this.isError = false;
    this.isLoaded = false;
    this.bookList = this.bookService.getRecommendedBooks(this.recommendedGenre);
    // Shall I merge them?
    this.bookList = this.configurePipe(this.bookList);
  }

  private configurePipe(request: Observable<Book[]>) {
    return request.pipe(
      // Throw if request was not responed for 3 seconds
      timeout(3000),
      // Try that 4 times
      retry(3),
      // Once got response, stop loading animation
      tap(_ => {
        this.isLoaded = true;
      }),
      // If got an error, indicate that to user
      catchError(e => this.reactError(e)),
    );
  }

  isError = false;
  errorMessage: string;
  private reactError(error: any) {
    console.log("Book list signified error.");
    this.isLoaded = true;
    this.errorMessage = error;
    this.isError = true;
    return of([]);
  }

  genreList: Observable<string[]>;
  updateGenres() {
    this.genreList = this.bookService.getGenres().pipe(
      catchError(() => of([]))
    );
  }

}
