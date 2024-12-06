import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CarBrandsRoutingModule} from './car-brands-routing.module';
import {CarBrandDialogComponent} from './car-brand-dialog/car-brand-dialog.component';
import {CarBrandsComponent} from './car-brands.component';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    CarBrandDialogComponent,
    CarBrandsComponent
  ],
  imports: [
    CommonModule,
    CarBrandsRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatLabel
  ]
})
export class CarBrandsModule {
}
