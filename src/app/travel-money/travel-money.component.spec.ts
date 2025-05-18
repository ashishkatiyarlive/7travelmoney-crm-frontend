import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelMoneyComponent } from './travel-money.component';

describe('TravelMoneyComponent', () => {
  let component: TravelMoneyComponent;
  let fixture: ComponentFixture<TravelMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TravelMoneyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TravelMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
