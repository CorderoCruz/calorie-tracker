import { Component, inject, signal } from "@angular/core";
import { Entry } from "@interfaces";
import { EntryService } from "src/app/services/entry-service/entry-service.service";

@Component({
  selector: "app-edit-entries",
  templateUrl: "./edit-entries.component.html",
  styleUrls: ["./edit-entries.component.css"],
})
export class EditEntriesComponent {
  entryService: EntryService = inject(EntryService);

  currentEditedEntry = signal<Entry>({} as Entry);

  editEntry(entry: Entry): void {
    this.currentEditedEntry.set(entry);
  }

  deleteEntry(entryName: string): void {
    this.entryService.deleteEntryFromDB(entryName);
  }
}
