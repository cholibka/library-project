import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Author, DbService } from '../db.service';

@Component({
  selector: 'app-delete-author',
  templateUrl: './delete-author.component.html',
  styleUrls: ['./delete-author.component.css']
})
export class DeleteAuthorComponent implements OnInit {

  @Input() author!: Author;
  @ViewChild('content') content!: TemplateRef<any>;
  @Output() outputValues: EventEmitter<number> = new EventEmitter();

  constructor(private modalService: NgbModal, private dbService: DbService,  private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  open_modal() {
    this.open(this.content);
  }

  private open(content: TemplateRef<any>) {
    this.modalService.open(content, { scrollable: true, size: 'lg' });
  }

  delete(){
    this.outputValues.emit(this.author.id);
    this.modalService.dismissAll();
  }

}
