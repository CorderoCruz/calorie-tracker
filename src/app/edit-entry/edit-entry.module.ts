import { NgModule } from '@angular/core';
import { EditEntryComponent } from './edit-entry.component';
import { EditEntryFormComponent } from './form/form.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: EditEntryComponent }];

@NgModule({
  declarations: [EditEntryComponent, EditEntryFormComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule, EditEntryComponent, EditEntryFormComponent],
})
export class EditEntryModule {}
