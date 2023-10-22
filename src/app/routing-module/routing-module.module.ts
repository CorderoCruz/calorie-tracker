import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { NotFoundComponent } from "../not-found/not-found.component";
import { AddMealComponent } from "../add-meal/add-meal.component";
import { AddEntryComponent } from "../add-entry/add-entry.component";
import { EditEntryComponent } from "../edit-entry/edit-entry.component";
import { AuthComponent } from "../shared/auth/auth.component";
import { canActivateUser } from "../services/auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    canActivate: [],
    children: [
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
        component: EditEntryComponent,
      },
    ],
  },
  {
    path: "authentication",
    component: AuthComponent,
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
