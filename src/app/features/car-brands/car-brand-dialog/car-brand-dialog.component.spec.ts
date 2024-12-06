import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarBrandDialogComponent } from './car-brand-dialog.component';

describe('CarBrandDialogComponent', () => {
  let component: CarBrandDialogComponent;
  let fixture: ComponentFixture<CarBrandDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarBrandDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarBrandDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
