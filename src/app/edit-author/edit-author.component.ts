import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Author, DbService } from '../db.service';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {

  @Input() author!: Author;
  @ViewChild('content') content!: TemplateRef<any>;
  @Output() outputValues: EventEmitter<Author> = new EventEmitter();
  
  authorForm = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required)
  })

  constructor(private modalService: NgbModal, private dbService: DbService,  private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  open_modal() {
    this.open(this.content);
  }
  
  private open(content: TemplateRef<any>) {
    this.modalService.open(content, { scrollable: true, size: 'sm' });
    this.authorForm.get('name')?.setValue(this.author.name);
    this.authorForm.get('surname')?.setValue(this.author.surname);
  }

  onSubmit() {
    this.author.name = this.authorForm.value.name;
    this.author.surname = this.authorForm.value.surname;

    this.dbService.updateAuthors(this.author).subscribe(_ => {
      this.outputValues.emit(this.author);
    })
    this.modalService.dismissAll();

  }

}
