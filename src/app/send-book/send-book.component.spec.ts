import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendBookComponent } from './send-book.component';

describe('SendBookComponent', () => {
  let component: SendBookComponent;
  let fixture: ComponentFixture<SendBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
