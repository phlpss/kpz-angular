import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {CarBrandDialogComponent} from './car-brand-dialog/car-brand-dialog.component';

@Component({
  selector: 'app-car-brands',
  standalone: false,
  templateUrl: './car-brands.component.html',
  styleUrls: ['./car-brands.component.css'],
})
export class CarBrandsComponent implements OnInit {
  carBrands: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'brand', 'model', 'startYear', 'endYear', 'actions'];

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCarBrands();
  }

  getCarBrands(): void {
    this.http.get<any[]>('https://localhost:7167/api/carbrands').subscribe((data) => {
      this.carBrands.data = data;
    });
  }

  addCarBrand(): void {
    const dialogRef = this.dialog.open(CarBrandDialogComponent, {
      width: '400px',
      data: { action: 'Add' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http.post('https://localhost:7167/api/carbrands', result).subscribe(() => {
          this.getCarBrands();
        });
      }
    });
  }

  editCarBrand(carBrand: any): void {
    const dialogRef = this.dialog.open(CarBrandDialogComponent, {
      width: '400px',
      data: { action: 'Edit', carBrand },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.id = carBrand.id
        this.http.put(`https://localhost:7167/api/carbrands/${carBrand.id}`, result).subscribe(() => {
          this.getCarBrands();
        });
      }
    });
  }

  deleteCarBrand(id: number): void {
    if (confirm('Are you sure you want to delete this car brand?')) {
      this.http.delete(`https://localhost:7167/api/carbrands/${id}`).subscribe(() => {
        this.getCarBrands();
      });
    }
  }
}
