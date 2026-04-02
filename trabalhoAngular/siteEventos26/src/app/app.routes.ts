import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./pages/agenda-lista/agenda-lista.component').then(m => m.AgendaListaComponent) 
  },
  { 
    path: 'novo-evento', 
    loadComponent: () => import('./pages/agenda-form/agenda-form.component').then(m => m.AgendaFormComponent) 
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent)
  }
];
