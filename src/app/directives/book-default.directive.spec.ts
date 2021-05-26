import { BookDefaultDirective } from './book-default.directive';

let elRefMock = {
  nativeElement: document.createElement('img')
};

describe('BookDefaultDirective', () => {
  it('should create an instance', () => {
    const directive = new BookDefaultDirective(elRefMock);
    expect(directive).toBeTruthy();
  });
});
