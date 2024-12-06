import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeWords',
  standalone: true, // Use directly in standalone components
})
export class CapitalizeWordsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return ''; // Handle null, undefined, or empty strings
    return value
      .split(' ') // Split the string into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter
      .join(' '); // Join words back into a single string
  }
}
