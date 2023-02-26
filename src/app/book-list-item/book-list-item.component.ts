import { Component, Input } from '@angular/core';
import { Book } from '../data/book';
import { EditService } from '../service/edit.service';
import { DialogService } from '../service/dialog.service';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css']
})

export class BookListItemComponent {

  constructor(private dialogService: DialogService, private editService: EditService) { }

  @Input() book: Book;

  openBook() {
    if (this.book.id) this.dialogService.viewBook(this.book.id);
  }

  editBook() {
    if (this.book.id) this.editService.swapBook(this.book.id);
  }
}
