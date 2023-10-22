import { NgModule } from "@angular/core";
import { EditEntryComponent } from "./edit-entry.component";
import { EditEntryFormComponent } from "./form/form.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [EditEntryComponent, EditEntryFormComponent],
  imports: [SharedModule],
})
export class EditEntryModule {}
