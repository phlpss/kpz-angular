import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientsComponent} from './features/clients/clients.component';
import {OfficesComponent} from './features/offices/offices.component';

export const routes: Routes = [
  {path: 'clients', component: ClientsComponent,},
  {
    path: 'car-brands',
    loadChildren: () =>
      import('./features/car-brands/car-brands.module').then((m) => m.CarBrandsModule),
  }, {
    path: 'bookings',
    loadChildren: () =>
      import('./features/bookings/bookings.module').then((m) => m.BookingsModule),
  },
  {path: 'offices', component: OfficesComponent},
  {path: '', redirectTo: '/clients', pathMatch: 'full'}, // Default route
  {path: '**', redirectTo: '/clients'}, // Fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
