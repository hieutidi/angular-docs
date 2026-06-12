import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'phase/:phaseId',
    loadComponent: () =>
      import('./pages/phase-detail/phase-detail.component').then((m) => m.PhaseDetailComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
