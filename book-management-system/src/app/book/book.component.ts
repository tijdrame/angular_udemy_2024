import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnInit {
  ngOnInit(): void {
    let savedBooks = localStorage.getItem('books');
    this.books = savedBooks ? JSON.parse(savedBooks) : [];
  }
  books: Book[] = [];
  newBookTitle: string = '';
  newBookAuthor: string = '';
  addBook() {
    if (this.newBookAuthor.trim().length && this.newBookTitle.trim().length) {
      this.books.push({
        id: Date.now(),
        title: this.newBookTitle,
        author: this.newBookAuthor,
      });

      this.newBookTitle = '';
      this.newBookAuthor = '';
      localStorage.setItem('books', JSON.stringify(this.books));
    }
  }
  deleteBook(index: number) {
    this.books.splice(index, 1);
  }
}
