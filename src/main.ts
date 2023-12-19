import { AppComponent } from './app/app.component';

import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Routes, provideRouter } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { NotFoundComponent } from './app/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'add-weight',
    loadChildren: () => import('./app/add-weight/add-weight.routes').then((r) => r.ADD_WEIGHT_ROUTES),
  },
  {
    path: 'add-meal',
    loadChildren: () => import('./app/add-meal/add-meal.routes').then((r) => r.ADD_MEAL_ROUTES),
  },
  {
    path: 'add-entry',
    loadChildren: () => import('./app/add-entry/add-entry.routes').then((r) => r.ADD_ENTRY_ROUTES),
  },
  {
    path: 'edit-entry',
    loadChildren: () => import('./app/edit-entry/edit-entry.routes').then((r) => r.EDIT_ENTRY_ROUTES),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

bootstrapApplication(AppComponent, {
  providers: [provideAnimations(), provideHttpClient(), provideRouter(routes)],
}).catch((err) => console.error(err));
