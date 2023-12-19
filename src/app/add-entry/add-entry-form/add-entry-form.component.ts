import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EntryService } from 'src/app/services/entry/entry-service.service';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { NgFor, NgIf } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'add-entry-form',
    templateUrl: './add-entry-form.component.html',
    styleUrls: ['./add-entry-form.component.css'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        NgFor,
        MatOptionModule,
        NgIf,
        MatButtonModule,
    ],
})
export class AddEntryFormComponent {
  private entryService = inject<EntryService>(EntryService);
  private notificationService = inject<NotificationService>(NotificationService);
  private fb = inject<FormBuilder>(FormBuilder);

  public addEntryForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    calories: ['', [Validators.required]],
    fat: ['', [Validators.required]],
    carbs: ['', [Validators.required]],
    protein: ['', [Validators.required]],
    servingMeasurement: ['', [Validators.required]],
    servingSize: ['', []],
  });

  public addFoodToDB(): void {
    const { servingMeasurement } = this.addEntryForm.getRawValue();
    if (servingMeasurement !== 'oz' && servingMeasurement !== 'g' && servingMeasurement !== 'one') {
      return alert('Not a valid measurement');
    }

    this.entryService
      .addEntryToDB({ ...this.addEntryForm.getRawValue() })
      .subscribe(this.notificationService.notificationActions);
  }
}
