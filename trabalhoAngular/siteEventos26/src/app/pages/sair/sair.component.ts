import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sair',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sair.component.html',
  styleUrl: './sair.component.css'
})
export class SairComponent {

  constructor(private router: Router) {}

  voltarParaSite() {
    this.router.navigate(['/']);
  }
}