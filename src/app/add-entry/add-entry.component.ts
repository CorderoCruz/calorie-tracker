import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { EntryService } from "src/app/services/entry/entry-service.service";

@Component({
  selector: "app-add-food",
  templateUrl: "./add-entry.component.html",
  styleUrls: ["./add-entry.component.css"],
})
export class AddEntryComponent implements OnInit, OnDestroy {
  entryService: EntryService = inject(EntryService);

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
