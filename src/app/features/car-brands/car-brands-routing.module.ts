import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CarBrandsComponent} from './car-brands.component';

const routes: Routes = [
  {path: '', component: CarBrandsComponent}, // Default path for bookings module
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarBrandsRoutingModule {
}
