import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Book, DbService } from '../db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  books! : Observable<Book[]>;
  searchBook = this.formBuilder.group({query: ''})

  constructor(private formBuilder: FormBuilder, private dbService: DbService, private router: Router ) { 
  }

  ngOnInit(): void {}

  onSubmit() : void {
    this.router.navigate(['/home/', this.searchBook.value.query]);
  }
}
