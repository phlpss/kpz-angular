import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogActions} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bookings-dialog',
  templateUrl: './bookings-dialog.component.html',
  styleUrls: ['./bookings-dialog.component.css'],
  // imports: [
  //   CommonModule,
  //   ReactiveFormsModule,
  //   MatFormFieldModule,
  //   MatInputModule,
  //   MatButtonModule,
  //   MatSelectModule,
  //   MatDatepickerModule,
  //   MatNativeDateModule,
  //   MatDialogActions,
  // ],
})
export class BookingsDialogComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean;

  clients: { id: number; fullName: string }[] = [];
  offices: { id: number; city: string }[] = [];
  cars: { id: number; model: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<BookingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = data.action === 'Edit';
    this.form = this.fb.group({
      clientId: [data?.booking?.clientId || '', Validators.required],
      officeId: [data?.booking?.officeId || '', Validators.required],
      carId: [data?.booking?.carId || '', Validators.required],
      status: [data?.booking?.status || 'Pending', Validators.required],
      start: [data?.booking?.start || '', Validators.required],
      end: [data?.booking?.end || '', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadOptions();
  }

  loadOptions(): void {
    this.http.get<{ id: number; fullName: string }[]>('https://localhost:7167/api/clients')
      .subscribe((data) => this.clients = data);

    this.http.get<{ id: number; city: string }[]>('https://localhost:7167/api/offices')
      .subscribe((data) => this.offices = data);

    this.http.get<{ id: number; model: string }[]>('https://localhost:7167/api/carbrands')
      .subscribe((data) => this.cars = data);
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
