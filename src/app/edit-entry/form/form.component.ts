import { Component, Input, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Entry } from '@interfaces';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { EntryService } from 'src/app/services/entry/entry-service.service';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';

@Component({
  selector: 'edit-entry-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class EditEntryFormComponent {
  @Input('entry') entry: Entry;
  @Input('index') index: number;
  private entryService: EntryService = inject<EntryService>(EntryService);
  private notificationService = inject<NotificationService>(NotificationService);
  private fb: FormBuilder = inject<FormBuilder>(FormBuilder);

  public editEntryForm: FormGroup = this.fb.group({
    name: [''],
    calories: [''],
    fat: [''],
    carbs: [''],
    protein: [''],
    servingMeasurement: [''],
    servingSize: [''],
  });

  public editEntry(): void {
    const editedEntry = {} as Entry;
    for (let macro in this.editEntryForm.controls) {
      const macroValue: string = this.editEntryForm.getRawValue()[macro];
      !macroValue ? (editedEntry[macro] = this.entry[macro]) : (editedEntry[macro] = macroValue);
    }

    for (let macro in editedEntry) {
      if (macro !== 'name' && macro !== 'servingMeasurement') editedEntry[macro] = parseInt(editedEntry[macro]);
    }

    this.entryService.updateEntryToDB(editedEntry, this.index).subscribe(this.notificationService.notificationActions);
  }

  public deleteEntry() {
    const userResponse: boolean = confirm(`Are you sure you want to remove this entry?`);

    if (userResponse) {
      this.entryService
        .deleteEntryFromDB(this.entry.name, this.index)
        .subscribe(this.notificationService.notificationActions);
    }
  }
}
