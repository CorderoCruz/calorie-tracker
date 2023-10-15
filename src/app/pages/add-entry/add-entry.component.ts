import { Component, OnInit, inject, signal } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Entry } from "@interfaces";
import { DialogComponent } from "src/app/components/dialog/dialog.component";
import { EntryService } from "src/app/services/entry-service/entry-service.service";

@Component({
  selector: "app-add-food",
  templateUrl: "./add-entry.component.html",
  styleUrls: ["./add-entry.component.css"],
})
export class AddEntryComponent implements OnInit {
  entryService: EntryService = inject(EntryService);
  dialog = inject<MatDialog>(MatDialog);

  dialogData = signal({});

  public addEntryToDB(event: Entry) {
    try {
      this.entryService.addEntryToDB({ ...event });
    } catch (error) {}
  }

  ngOnInit(): void {}
}
