import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: $localize`:@@page.home.title:Jan Sippl – Frontend Developer`,
    loadComponent: () => import('./pages/home/home').then((page) => page.Home),
  },
  {
    path: 'legal-notice',
    title: $localize`:@@page.legal.title:Legal notice – Jan Sippl`,
    loadComponent: () =>
      import('./pages/legal-notice/legal-notice').then((page) => page.LegalNotice),
  },
  {
    path: 'privacy-policy',
    title: $localize`:@@page.privacy.title:Privacy policy – Jan Sippl`,
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy').then((page) => page.PrivacyPolicy),
  },
  { path: '**', redirectTo: '' },
];
