import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Entry } from "@interfaces";
import { BehaviorSubject, takeUntil, tap } from "rxjs";
import { EntryService } from "src/app/services/entry/entry-service.service";

@Component({
  selector: "app-add-food",
  templateUrl: "./add-entry.component.html",
  styleUrls: ["./add-entry.component.css"],
})
export class AddEntryComponent implements OnInit, OnDestroy {
  entryService: EntryService = inject(EntryService);
  dialog = inject<MatDialog>(MatDialog);

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
