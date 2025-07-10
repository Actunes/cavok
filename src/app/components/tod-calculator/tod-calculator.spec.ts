import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodCalculator } from './tod-calculator';

describe('TodCalculator', () => {
  let component: TodCalculator;
  let fixture: ComponentFixture<TodCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodCalculator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodCalculator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
