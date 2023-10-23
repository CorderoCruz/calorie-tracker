import { Component, inject, signal } from '@angular/core';
import { Entry } from '@interfaces';
import { EntryService } from 'src/app/services/entry/entry-service.service';

@Component({
  selector: 'app-edit-entries',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.css'],
})
export class EditEntryComponent {
  entryService: EntryService = inject(EntryService);

  currentEditedEntry = signal<Entry>({} as Entry);

  editEntry(entry: Entry): void {
    this.currentEditedEntry.set(entry);
  }
}
