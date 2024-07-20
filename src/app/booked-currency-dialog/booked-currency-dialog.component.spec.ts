import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedCurrencyDialogComponent } from './booked-currency-dialog.component';

describe('BookedCurrencyDialogComponent', () => {
  let component: BookedCurrencyDialogComponent;
  let fixture: ComponentFixture<BookedCurrencyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookedCurrencyDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookedCurrencyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
