import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Entry } from '@interfaces';
import { EntryService } from 'src/app/services/entry-service/entry-service.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css'],
})
export class AddEntryComponent {
  entryService: EntryService = inject(EntryService);

  addEntryToDB(event: Entry): void {
    this.entryService.addEntryToDB({ ...event });
  }
}
