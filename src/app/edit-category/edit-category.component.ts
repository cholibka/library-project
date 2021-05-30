import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category, DbService } from '../db.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  @Input() category!: Category;
  @ViewChild('content') content!: TemplateRef<any>;
  @Output() outputValues: EventEmitter<Category> = new EventEmitter();

  categoryName = new FormControl('');
  
  constructor(private modalService: NgbModal, private dbService: DbService) { 
  }
  
  ngOnInit(): void {}
  
  open_modal() {
    this.open(this.content);
  }
  
  private open(content: TemplateRef<any>) {
    this.modalService.open(content, { scrollable: true, size: 'sm' });
    this.categoryName.setValue(this.category.name);
  }

  onSubmit() {
    this.category.name = this.categoryName.value;

    console.log(this.category)
    this.dbService.updateCategory(this.category).subscribe(_ => {
      this.outputValues.emit(this.category);
    })
    this.modalService.dismissAll();

  }


}
