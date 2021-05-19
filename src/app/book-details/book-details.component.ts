import { Component, OnInit, Input, TemplateRef, ViewChild  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../db.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  @Input() book!: Book;
  @ViewChild('content') content!: TemplateRef<any>;
  
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {}

  open_modal() {
    this.open(this.content);
  }

  private open(content: TemplateRef<any>) {
    this.modalService.open(content, { scrollable: true, size: 'lg' });
  }


}
