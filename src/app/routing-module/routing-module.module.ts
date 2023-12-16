import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AuthComponent } from '../shared/auth/auth.component';
import { AddWeightComponent } from '../add-weight/add-weight.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'add-meal',
        loadChildren: () => import('../add-meal/add-meal.module').then((m) => m.AddMealModule),
      },
      {
        path: 'create-entry',
        loadChildren: () => import('../add-entry/add-entry.module').then((m) => m.AddEntryModule),
      },
      {
        path: 'edit-entries',
        loadChildren: () => import('../edit-entry/edit-entry.module').then((m) => m.EditEntryModule),
      },
      {
        path: 'add-weight',
        component: AddWeightComponent,
      },
    ],
  },
  {
    path: 'authentication',
    component: AuthComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
