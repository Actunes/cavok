import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMetar } from './view-metar';

describe('ViewMetar', () => {
  let component: ViewMetar;
  let fixture: ComponentFixture<ViewMetar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMetar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMetar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
