import { NgModule } from "@angular/core";
import { AddMealComponent } from "./add-meal.component";
import { AddMealFormComponent } from "./form/form.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [AddMealComponent, AddMealFormComponent],
  imports: [SharedModule],
})
export class AddMealModule {}
