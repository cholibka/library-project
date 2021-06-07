import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Book, DbService } from '../db.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit {

  data!: Observable<Book[]>;
  white = false;

  constructor(private dbService: DbService, private route: ActivatedRoute) {
    this.loadBooks();
  }

  loadBooks()
  {
    this.route.params.subscribe(params => {
      if(params['query']){
        this.data = this.dbService.searchBooks(params['query']);
      } else {
        this.data = this.dbService.getBooks();
      }
    });
  }

  ngOnInit(): void { 
    this.dbService.notifyObservable$.subscribe(res => {
      if(res.refresh){
          this.data = this.dbService.getBooks();
      }
    })
  }

  mouseEnter(button: string) {
    let arrows = document.getElementsByTagName("mat-icon");
    let element = document.getElementById(button);

    this.checkBackgroundColor();

    this.resetAllArrows(arrows, button);

    if(element!.innerHTML == "arrow_upward") {
      if(element!.style.color == "gray") {
        if(this.white) {
          element!.classList.add('colorAnimated')
          element!.style.color = "black";
        }
        else {
          element!.classList.add('colorWhiteAnimated')
          element!.style.color = "white";
        }
      }
      else {
        this.animateArrow(element!);
        setTimeout(() => {
          element!.innerHTML = "arrow_downward"}, 500
        );
      }
    }
    else {
      this.resetArrow(element!);
    }
  }

  checkBackgroundColor() {
    if(window.getComputedStyle(document.body, null).getPropertyValue('background-color') == "rgb(250, 250, 250)") 
      this.white = true;
    else 
      this.white = false;
  }

  changeArrowColor(element: HTMLElement) {
    if(this.white) 
      element.classList.add('colorOutAnimated')
    else 
      element.classList.add('colorOutWhiteAnimated')
    element.style.color = "gray";
  }

  resetAllArrows (arrows: HTMLCollectionOf<Element>, button: string) {
    for(let arrow of arrows) {
      if(arrow.innerHTML == "arrow_downward") {
        this.resetArrow(document.getElementById(arrow.id)!)
      } else if(arrow.innerHTML == "arrow_upward") {
        let a = document.getElementById(arrow.id);
        if(a!.style.color != "gray" && a!.id != button) {
          this.changeArrowColor(a!);
        }
      }
    }
  }

  resetArrow(element : HTMLElement) {
    this.changeArrowColor(element);

    setTimeout(() => {
      this.animateArrow(element);
      setTimeout(() => {
        element.innerHTML = "arrow_upward"}, 500
      )}, 500
    );
  }

  animateArrow(element: HTMLElement) {
    element.animate([
      { transform: 'rotateX(180deg) translateY(10px)' }

      ], {
        duration: 500,
      }
    )
  }

}
