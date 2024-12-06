import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { OfficesDialogComponent } from './offices-dialog/offices-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-offices',
  standalone: true,
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    OfficesDialogComponent, // Import the dialog component
  ],
})
export class OfficesComponent implements OnInit {
  offices: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'city', 'address', 'phoneNumber', 'actions'];

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getOffices();
  }

  getOffices(): void {
    this.http.get<any[]>('https://localhost:7167/api/offices').subscribe((data) => {
      this.offices.data = data;
    });
  }

  addOffice(): void {
    const dialogRef = this.dialog.open(OfficesDialogComponent, {
      width: '400px',
      data: { action: 'Add' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http.post('https://localhost:7167/api/offices', result).subscribe(() => {
          this.getOffices();
        });
      }
    });
  }

  editOffice(office: any): void {
    const dialogRef = this.dialog.open(OfficesDialogComponent, {
      width: '400px',
      data: { action: 'Edit', office },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.id = office.id
        this.http.put(`https://localhost:7167/api/offices/${office.id}`, result).subscribe(() => {
          this.getOffices();
        });
      }
    });
  }

  deleteOffice(id: number): void {
    if (confirm('Are you sure you want to delete this office?')) {
      this.http.delete(`https://localhost:7167/api/offices/${id}`).subscribe(() => {
        this.getOffices();
      });
    }
  }
}
