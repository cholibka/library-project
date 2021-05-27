import { Component, OnInit, Input } from '@angular/core';
import { Book, DbService } from '../db.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-entry',
  templateUrl: './book-entry.component.html',
  styleUrls: ['./book-entry.component.css']
})
export class BookEntryComponent implements OnInit {

  @Input('book') book!: Book;

  constructor(private modalService: NgbModal, private router: Router ) {}

  ngOnInit(): void { }

  open(book: Book) {
    this.modalService.open(book, {scrollable: true, size: 'xl'});
  }

  edit(id: number) {
    console.log(id)
    this.router.navigate(['/editBook', id]);
  }

}
