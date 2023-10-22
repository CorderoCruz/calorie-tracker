import { NgModule } from "@angular/core";
import { AddEntryComponent } from "./add-entry.component";
import { AddEntryFormComponent } from "./add-entry-form/add-entry-form.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [AddEntryComponent, AddEntryFormComponent],
  imports: [SharedModule],
  exports: [AddEntryComponent, AddEntryFormComponent],
})
export class AddEntryModule {}
