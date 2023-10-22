import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { AddEntryModule } from "./add-entry/add-entry.module";
import { AddMealModule } from "./add-meal/add-meal.module";
import { AppComponent } from "./app.component";
import { EditEntryModule } from "./edit-entry/edit-entry.module";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AppRoutingModule } from "./routing-module/routing-module.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AddEntryModule,
    AddMealModule,
    EditEntryModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
