import { NgModule } from '@angular/core';
import { AddEntryComponent } from './add-entry.component';
import { AddEntryFormComponent } from './add-entry-form/add-entry-form.component';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AddEntryComponent,
  },
];

@NgModule({
  declarations: [AddEntryComponent, AddEntryFormComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [AddEntryComponent, AddEntryFormComponent, RouterModule],
})
export class AddEntryModule {}
