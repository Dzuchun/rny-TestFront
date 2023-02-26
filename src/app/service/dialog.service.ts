import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewBookComponent } from '../view-book/view-book.component';
import { BookService } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog, private bookService: BookService) { }

  viewBook(id: number) {
    this.dialog.open(ViewBookComponent, {
      data: { source: this.bookService.getBookById(id) }
    });
  }
}
