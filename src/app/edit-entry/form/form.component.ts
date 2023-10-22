import { Component, Input, OnDestroy, inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Entry } from "@interfaces";
import { BehaviorSubject, takeUntil } from "rxjs";
import { EntryService } from "src/app/services/entry/entry-service.service";

@Component({
  selector: "edit-entry-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class EditEntryFormComponent {
  @Input("entry") entry: Entry;
  @Input("index") index: number;
  entryService: EntryService = inject(EntryService);
  fb: FormBuilder = inject(FormBuilder);

  private UNSUB$ = new BehaviorSubject<boolean>(false);

  editEntryForm: FormGroup = this.fb.group({
    name: [""],
    gramsPerServing: [""],
    calories: [""],
    fat: [""],
    carbs: [""],
    protein: [""],
  });

  editEntry(): void {
    const editedEntry = {} as Entry;
    for (let macro in this.editEntryForm.controls) {
      const macroValue: string = this.editEntryForm.getRawValue()[macro];
      if (macroValue === "") {
        editedEntry[macro] = this.entry[macro];
      } else {
        editedEntry[macro] = macroValue;
      }
    }

    for (let macro in editedEntry) {
      if (macro !== "name") {
        editedEntry[macro] = parseInt(editedEntry[macro]);
      }
    }

    this.entryService
      .addEntryToDB(editedEntry)
      .pipe(takeUntil(this.UNSUB$))
      .subscribe();
  }

  deleteEntry() {
    const userResponse: boolean = confirm(
      "Are you sure you want to remove this entry?"
    );

    if (userResponse) {
      this.entryService
        .deleteEntryFromDB(this.entry.name, this.index)
        .pipe(takeUntil(this.UNSUB$))
        .subscribe();
    }
  }
}
