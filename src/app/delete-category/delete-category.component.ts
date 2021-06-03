import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category, DbService } from '../db.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {

  @Input() category!: Category;
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
    this.outputValues.emit(this.category.id);
    this.modalService.dismissAll();
  }

}
