import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { BookingsDialogComponent } from './bookings-dialog/bookings-dialog.component';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  // imports: [
  //   CommonModule,
  //   MatTableModule,
  //   MatButtonModule,
  //   MatDialogModule,
  // ]
})
export class BookingsComponent implements OnInit {
  bookings: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'client', 'office', 'car', 'status', 'start', 'end', 'actions'];

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings(): void {
    this.http.get<any[]>('https://localhost:7167/api/bookings').subscribe((data) => {
      this.bookings.data = data;
    });
  }

  addBooking(): void {
    const dialogRef = this.dialog.open(BookingsDialogComponent, {
      width: '400px',
      data: { action: 'Add' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http.post('https://localhost:7167/api/bookings', result).subscribe(() => {
          this.getBookings();
        });
      }
    });
  }

  editBooking(booking: any): void {
    const dialogRef = this.dialog.open(BookingsDialogComponent, {
      width: '400px',
      data: { action: 'Edit', booking },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.id =booking.id
        this.http.put(`https://localhost:7167/api/bookings/${booking.id}`, result).subscribe(() => {
          this.getBookings();
        });
      }
    });
  }

  deleteBooking(id: number): void {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.http.delete(`https://localhost:7167/api/bookings/${id}`).subscribe(() => {
        this.getBookings();
      });
    }
  }
}
