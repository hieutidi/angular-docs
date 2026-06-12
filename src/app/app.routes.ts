import { Routes } from '@angular/router';
import { trackGuard } from './guards/track.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/hub/hub.component').then((m) => m.HubComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: ':track',
    canActivate: [trackGuard],
    children: [
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
        path: 'phase/:phaseId/topic/:topicId',
        loadComponent: () =>
          import('./pages/topic-detail/topic-detail.component').then((m) => m.TopicDetailComponent),
      },
    ],
  },
  {
    path: 'phase/:phaseId',
    redirectTo: 'angular/phase/:phaseId',
    pathMatch: 'full',
  },
  {
    path: 'phase/:phaseId/topic/:topicId',
    redirectTo: 'angular/phase/:phaseId/topic/:topicId',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
