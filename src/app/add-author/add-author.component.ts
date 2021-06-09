import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Author, DbService } from '../db.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  author?: Author;
  lastId!: number;
  @ViewChild('content') content!: TemplateRef<any>;
  @Output() outputValues: EventEmitter<Author> = new EventEmitter();
  
  authorForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZżŻĄĆŹĘÓóźćąęŚś ]*$'), Validators.maxLength(50)]),
    surname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZżŻĄĆŹĘÓóźćąęŚś ]*$'), Validators.maxLength(50)])
  })
  
  constructor(private dbService: DbService,  private formBuilder: FormBuilder, private router: Router) {
    dbService.getAuthors().subscribe(authors => {
      this.lastId = authors[authors.length - 1].id + 1;
    })
   }

  ngOnInit(): void {
  }

  onSubmit() {
    this.author = new Author(this.lastId, this.authorForm.value.name, this.authorForm.value.surname);

    this.dbService.addAuthor(this.author).subscribe(_ => {
      this.outputValues.emit(this.author);
    })
    
    this.router.navigate(['/authors']);

  }

}
