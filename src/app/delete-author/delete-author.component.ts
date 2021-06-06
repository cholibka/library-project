import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Author, DbService } from '../db.service';

@Component({
  selector: 'app-delete-author',
  templateUrl: './delete-author.component.html',
  styleUrls: ['./delete-author.component.css']
})
export class DeleteAuthorComponent {

  @ViewChild('content') content!: TemplateRef<any>;

  constructor(public dialogRef: MatDialogRef<DeleteAuthorComponent>, @Inject(MAT_DIALOG_DATA) public author: Author) { }

  delete() {
    this.dialogRef.close(this.author.id);
  }

}
