import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, retry, catchError, throwError } from 'rxjs';

export const RetryInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const retryCount = 3; // Number of retries

  return next(req).pipe(
    retry(retryCount), // Retry failed requests
    catchError((error: HttpErrorResponse) => {
      console.error(`HTTP error after ${retryCount} retries:`, error.message);

      // Optionally display a user-friendly error notification
      alert(`Failed to process request: ${error.message}`);

      return throwError(() => error); // Re-throw the error
    })
  );
};
