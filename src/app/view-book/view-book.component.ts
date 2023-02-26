import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, Observable, of, retry, tap, timeout } from 'rxjs';
import { Book } from '../data/book';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent {

  isLoaded: boolean;

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: { source: Observable<Book> }) {
    this.isLoaded = false;
    data.source = data.source.pipe(
      tap(_ => { this.isLoaded = true }),
      timeout(3000),
      retry(3),
      catchError(e => this.reactError(e)),
    );

    // https://stackoverflow.com/questions/47626045/typeerror-this-is-undefined-react-js-javascript
    // this is undefined... JS is hard.
    this.reactError = this.reactError.bind(this);
  }

  errorMessage: string;
  isError = false;
  private reactError(error: any) {
    console.log("Dialog signified error");
    this.errorMessage = error;
    this.isError = true;
    return of({});
  }

}
