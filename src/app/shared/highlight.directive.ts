import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]', // Use it as an attribute selector
  standalone:true
})
export class HighlightDirective {
  @Input() appHighlight = 'yellow'; // Default color

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight); // Apply the highlight color on hover
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(''); // Remove the highlight when the mouse leaves
  }

  private highlight(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
