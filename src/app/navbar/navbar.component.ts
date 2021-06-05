import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Book, DbService } from '../db.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  books! : Observable<Book[]>;
  searchBook = this.formBuilder.group({query: ''})
  lastUrl: string;
  url = '/home';
  prohibited: string[] = ['edit', 'add'];
  


  constructor(private formBuilder: FormBuilder, private dbService: DbService, private router: Router, private location: Location ) { 
    this.lastUrl = this.url; // At start set base url for search as home
    
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        try {
          this.url = val.url;
          if( this.prohibited.some((val) => { return this.url.includes(val); }) ){
            this.url = this.lastUrl;
          }
        }
        catch (error) 
        {
          this.url = '/home';
        }
      }
    });
    
  }

  ngOnInit(): void {}

  onSubmit() : void {
    this.router.navigate([`/${this.url}/`, this.searchBook.value.query]);
  }
}
