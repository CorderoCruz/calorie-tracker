import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./routing-module/routing-module.module";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { NutritionFactsTableComponent } from "./components/nutrition-facts-table/nutrition-facts-table.component";
import { AddMealComponent } from "./pages/add-meal/add-meal.component";
import { AddEntryComponent } from "./pages/add-entry/add-entry.component";
import { EditEntryFormComponent } from "./components/edit-entry-form/edit-entry-form.component";
import { EditEntriesComponent } from "./pages/edit-entries/edit-entries.component";
import { AddMealFormComponent } from "./components/add-meal-form/add-meal-form.component";
import { AddEntryFormComponent } from "./components/add-entry-form/add-entry-form.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { HomeButtonComponent } from "./components/home-button/home-button.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatRippleModule } from "@angular/material/core";
import { DialogComponent } from "./components/dialog/dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { HttpClientModule } from "@angular/common/http";
import { AuthComponent } from "./pages/auth/auth.component";
import { AuthLoginComponent } from "./components/auth.login/auth-login.component";
import { AuthSignupComponent } from "./components/auth.signup/auth-signup.component";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    NutritionFactsTableComponent,
    AddMealComponent,
    AddEntryComponent,
    EditEntryFormComponent,
    EditEntriesComponent,
    AddMealFormComponent,
    AddEntryFormComponent,
    HomeButtonComponent,
    DialogComponent,
    AuthComponent,
    AuthLoginComponent,
    AuthSignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRippleModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    RouterModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatExpansionModule,
    HttpClientModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
