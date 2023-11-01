import { NgModule } from '@angular/core';
import { AddMealComponent } from './add-meal.component';
import { AddMealFormComponent } from './form/form.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: AddMealComponent }];

@NgModule({
  declarations: [AddMealComponent, AddMealFormComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule, AddMealComponent, AddMealFormComponent],
})
export class AddMealModule {}
