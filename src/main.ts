import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideRouter} from '@angular/router';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {routes} from './app/app-routing.module';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {importProvidersFrom} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {RetryInterceptor} from './app/shared/retry.interceptor';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([RetryInterceptor])),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(MatNativeDateModule),
    importProvidersFrom(MatDatepickerModule)
  ],
}).catch((err) => console.error(err));
