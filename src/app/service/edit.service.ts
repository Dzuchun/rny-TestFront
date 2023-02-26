import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../data/book';
import { BookService } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  private _book = new BehaviorSubject<Book>({});
  currentBook = this._book.asObservable();

  constructor(private bookService: BookService) { }

  swapBook(id: number) {
    this.bookService.getBookById(id)
      .subscribe(book => this._book.next(book));
  }

  // Emitted, if book was succesfully added/edited
  reloadList = new EventEmitter();
}
