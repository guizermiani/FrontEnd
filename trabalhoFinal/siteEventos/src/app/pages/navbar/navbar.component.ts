import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styles: [`
    .active-link { 
      font-weight: bold; 
      border-bottom: 2px solid white; 
    }
    .navbar-brand { font-weight: 800; letter-spacing: -1px; }
  `]
})
export class NavbarComponent {

}