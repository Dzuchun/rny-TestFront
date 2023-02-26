import { Component } from '@angular/core';
import { catchError, of, retry, timeout } from 'rxjs';
import { Book } from '../data/book';
import { BookService } from '../service/book.service';
import { EditService } from '../service/edit.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})

export class EditBookComponent {
  isEditing: boolean = false;

  constructor(private bookService: BookService, private editService: EditService) {
    editService.currentBook.subscribe(book => this.updateBook(book));

    // https://stackoverflow.com/questions/47626045/typeerror-this-is-undefined-react-js-javascript
    // this is undefined... JS is hard.
    this.reactError = this.reactError.bind(this);
  }

  id?: number;
  title?: string;
  cover?: string;
  genre?: string;
  author?: string;
  content?: string;

  // Updates book that's being repacted
  updateBook(book: Book) {
    // forget about book being submitted
    this.isSubmitting = false;

    // Yeah, that's really ugly, I know.
    // I tried different approached to that, but they all failed, so...
    // I guess it's gonna stay like that for now.

    this.isEditing = !!book.id;
    this.id = book.id;
    this.title = book.title;
    this.cover = book.cover;
    this.genre = book.genre;
    this.author = book.author;
    this.content = book.content;
  }

  // Loads currently chosen cover and saves it to cover field.
  onCoverChange(event: any) {
    const file = event?.target?.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onloadend = () => this.cover = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  isSubmitting = false;
  // Assembles a book and submits it to the server.
  submitBook() {
    this.isSubmitting = true;
    this.bookService.sendBook({
      id: this.id,
      title: this.title,
      cover: this.cover,
      genre: this.genre,
      author: this.author,
      content: this.content,
    }).pipe(
      timeout(3000),
      retry(3),
      catchError(this.reactError),
    )
      .subscribe(o => {
        this.isSubmitting = false;
        // DB never returns id = 0, so I return it as an error code
        if (o.id !== 0) this.editService.reloadList.emit();
      });
  }

  private reactError() {
    document.getElementById("inputs")!.classList.add("error");
    console.log("Edit area signified error.");
    setTimeout(function () {
      document.getElementById("inputs")!.classList.remove("error");
    }, 500);
    this.isSubmitting = false;
    return of({ id: 0 });
  }

  private MAX_LENGTH = 35;
  stripString(s: string) {
    return s.length > this.MAX_LENGTH ? s.substring(0, this.MAX_LENGTH) + "..." : s;
  }
}
