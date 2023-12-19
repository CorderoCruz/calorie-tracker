import { Component, inject, signal } from '@angular/core';
import { Entry } from '@interfaces';
import { EntryService } from 'src/app/services/entry/entry-service.service';
import { HomeButtonComponent } from '../shared/components/home-button/home-button.component';
import { MatButtonModule } from '@angular/material/button';
import { EditEntryFormComponent } from './form/form.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-edit-entries',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.css'],
  standalone: true,
  imports: [NgIf, RouterLink, MatExpansionModule, NgFor, EditEntryFormComponent, MatButtonModule, HomeButtonComponent],
})
export class EditEntryComponent {
  entryService: EntryService = inject(EntryService);

  currentEditedEntry = signal<Entry>({} as Entry);

  editEntry(entry: Entry): void {
    this.currentEditedEntry.set(entry);
  }
}
