import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../pages/home/home.component";
import { NotFoundComponent } from "../pages/not-found/not-found.component";
import { AddMealComponent } from "../pages/add-meal/add-meal.component";
import { AddEntryComponent } from "../pages/add-entry/add-entry.component";
import { EditEntriesComponent } from "../pages/edit-entries/edit-entries.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "add-meal",
    component: AddMealComponent,
  },
  {
    path: "create-entry",
    component: AddEntryComponent,
  },
  {
    path: "edit-entries",
    component: EditEntriesComponent,
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
