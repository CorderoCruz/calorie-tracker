import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing-module/routing-module.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NutritionFactsTableComponent } from './components/nutrition-facts-table/nutrition-facts-table.component';
import { AddMealComponent } from './pages/add-meal/add-meal.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { AddEntryComponent } from './pages/add-entry/add-entry.component';
import { EditEntryComponent } from './components/edit-entry/edit-entry.component';
import { EditEntriesComponent } from './pages/edit-entries/edit-entries.component';
import { AddMealFormComponent } from './components/add-meal-form/add-meal-form.component';
import { AddEntryFormComponent } from './components/add-entry-form/add-entry-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    NutritionFactsTableComponent,
    AddMealComponent,
    AddEntryComponent,
    EditEntryComponent,
    EditEntriesComponent,
    AddMealFormComponent,
    AddEntryFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
