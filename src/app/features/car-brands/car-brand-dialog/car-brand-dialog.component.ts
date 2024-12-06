import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-car-brand-dialog',
  standalone: false,
  templateUrl: './car-brand-dialog.component.html',
  styleUrls: ['./car-brand-dialog.component.css'],
})
export class CarBrandDialogComponent {
  form: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CarBrandDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = data.action === 'Edit';
    console.log(data)
    this.form = this.fb.group({
      brand: [data?.carBrand?.brand || '', Validators.required],
      model: [data?.carBrand?.model || '', Validators.required],
      manufacturingStartYear: [data?.carBrand?.manufacturingStartYear || '', Validators.required],
      manufacturingEndYear: [data?.carBrand?.manufacturingEndYear || '', Validators.required],
    });
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
