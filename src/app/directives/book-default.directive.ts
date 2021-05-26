import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[bookImageDefault]'
})

export class BookDefaultDirective implements AfterViewInit {

  @Input() src;

  constructor(private imageRef: ElementRef) {
    this.src = imageRef.nativeElement.getAttribute('src');
  }

  ngAfterViewInit(): void {
      const img = new Image();
      img.onload = () => {
          this.setImage(this.src);
      };

      img.onerror = () => {
          // Set a placeholder image 
          this.setImage('./../assets/img/bookCover.jpg');
      };

      img.src = this.src;
  }

  private setImage(src: string) {
      this.imageRef.nativeElement.setAttribute('src', src);
  }

}
