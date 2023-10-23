import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntryService } from 'src/app/services/entry/entry-service.service';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';

@Component({
  selector: 'add-entry-form',
  templateUrl: './add-entry-form.component.html',
  styleUrls: ['./add-entry-form.component.css'],
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
