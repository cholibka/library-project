import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Author, DbService } from '../db.service';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent {

  @ViewChild('content') content!: TemplateRef<any>;
  @Output() outputValues: EventEmitter<Author> = new EventEmitter();
  
  authorForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZżŻĄĆŹĘÓóźćąęŚś ]*$'), Validators.maxLength(50)]),
    surname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZżŻĄĆŹĘÓóźćąęŚś ]*$'), Validators.maxLength(50)])
  })

  constructor(public dialogRef: MatDialogRef<EditAuthorComponent>, @Inject(MAT_DIALOG_DATA) public author: Author, private dbService: DbService,  private formBuilder: FormBuilder) { 
    this.authorForm.get('name')?.setValue(this.author.name);
    this.authorForm.get('surname')?.setValue(this.author.surname);
  }
  
  onSubmit() {
    this.author.name = this.authorForm.value.name;
    this.author.surname = this.authorForm.value.surname;

    this.dbService.updateAuthors(this.author).subscribe(_ => {
      this.outputValues.emit(this.author);
    })
    
    setTimeout(() => {
      this.dbService.notifyOther({refresh: true})}, 500
      );
    this.dialogRef.close();

  }

}
