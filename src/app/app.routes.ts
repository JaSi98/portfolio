import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: $localize`:@@page.home.title:Jan Sippl – Frontend Developer`,
    loadComponent: () => import('./pages/home/home').then((page) => page.Home),
  },
  { path: '**', redirectTo: '' },
];
