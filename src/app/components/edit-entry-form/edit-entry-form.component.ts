import { Component, Input, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Entry } from "@interfaces";
import { EntryService } from "src/app/services/entry-service/entry-service.service";

@Component({
  selector: "edit-entry-form",
  templateUrl: "./edit-entry-form.component.html",
  styleUrls: ["./edit-entry-form.component.css"],
})
export class EditEntryFormComponent implements OnInit {
  @Input("entry") entry: Entry;
  entryService: EntryService = inject(EntryService);
  fb: FormBuilder = inject(FormBuilder);

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

    //if the input is not filled in then we sub it in for the origial value
    for (let macro in this.editEntryForm.controls) {
      const macroValue: string = this.editEntryForm.getRawValue()[macro];
      if (macroValue === "") {
        editedEntry[macro] = this.entry[macro];
      } else {
        editedEntry[macro] = macroValue;
      }
    }

    //parsing to number
    for (let macro in editedEntry) {
      if (macro !== "name") {
        editedEntry[macro] = parseInt(editedEntry[macro]);
      }
    }

    this.entryService.updateEntryToDB(editedEntry);
  }

  deleteEntry() {
    const userResponse: boolean = confirm(
      "Are you sure you want to remove this entry?"
    );

    userResponse ? this.entryService.deleteEntryFromDB(this.entry.name) : "";
  }

  ngOnInit() {}
}
