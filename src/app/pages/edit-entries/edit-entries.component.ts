import { Component, Input, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { Entry } from "@interfaces";
import { EntryService } from "src/app/services/entry-service/entry-service.service";

@Component({
  selector: "app-edit-entries",
  templateUrl: "./edit-entries.component.html",
  styleUrls: ["./edit-entries.component.css"],
})
export class EditEntriesComponent {
  entryService: EntryService = inject(EntryService);
  router: Router = inject(Router);

  currentEditedEntry = signal<Entry>({} as Entry);

  editEntry(foodName: string): void {
    this.currentEditedEntry.set(this.entryService.foodEntries()[foodName]);
  }

  deleteEntry(entryName: string): void {
    this.entryService.deleteEntryFromDB(entryName);
  }
}
// if entry date is not the same as today, we want to get the entry date cals and update them making the get request from the db;
