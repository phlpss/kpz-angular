import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {MatAnchor, MatButton} from '@angular/material/button';
import {HighlightDirective} from './shared/highlight.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    MatToolbar,
    MatToolbarRow,
    RouterOutlet,
    MatAnchor,
    RouterLink,
    RouterLinkActive,
    MatButton,
    HighlightDirective
  ]
})
export class AppComponent {
  title = 'angular-kpz-kateryna-filip';
}
