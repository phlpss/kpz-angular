import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficesDialogComponent } from './offices-dialog.component';

describe('OfficesDialogComponent', () => {
  let component: OfficesDialogComponent;
  let fixture: ComponentFixture<OfficesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
