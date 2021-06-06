import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category, DbService } from '../db.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent {

  @ViewChild('content') content!: TemplateRef<any>;
  @Output() outputValues: EventEmitter<number> = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<DeleteCategoryComponent>, @Inject(MAT_DIALOG_DATA) public category: Category, private dbService: DbService,  private formBuilder: FormBuilder) { }


  delete(){
    this.dialogRef.close(this.category.id);
  }

}
