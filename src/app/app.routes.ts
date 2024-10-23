import { Routes } from '@angular/router';
import { domainRoutes } from './feature/domain.routes';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: domainRoutes,
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
