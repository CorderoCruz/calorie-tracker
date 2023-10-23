import { NgModule } from '@angular/core';
import { HomeButtonComponent } from './components/home-button/home-button.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { AuthLoginComponent } from './auth/login/auth-login.component';
import { AuthSignupComponent } from './auth/signup/auth-signup.component';
import { CommonModule } from '@angular/common';
import { NutritionFactsTableComponent } from './components/nutrition-facts-table/nutrition-facts-table.component';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    HomeButtonComponent,
    AuthComponent,
    AuthLoginComponent,
    AuthSignupComponent,
    NotificationComponent,
    NutritionFactsTableComponent,
  ],
  imports: [
    MatFormFieldModule,
    MatCheckboxModule,
    MatRippleModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSelectModule,
    MatButtonModule,
    MatExpansionModule,
    HttpClientModule,
    MatAutocompleteModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
  exports: [
    HomeButtonComponent,
    AuthComponent,
    NotificationComponent,
    NutritionFactsTableComponent,
    AuthLoginComponent,
    AuthSignupComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatRippleModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatExpansionModule,
    HttpClientModule,
    MatAutocompleteModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
  ],
})
export class SharedModule {}
