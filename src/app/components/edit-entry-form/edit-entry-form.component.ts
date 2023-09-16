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
  @Input("entry") entry: Entry | undefined;
  entryService: EntryService = inject(EntryService);
  fb: FormBuilder = inject(FormBuilder);

  editEntryForm: FormGroup = this.fb.group({
    name: [""],
    grams: [""],
    calories: [""],
    fat: [""],
    carbs: [""],
    protein: [""],
  });

  // needs work
  editEntry(entryName: string | undefined): void {
    const { foodName, gramsPerServing, calories, fat, carbs, protein } =
      this.editEntryForm.getRawValue();
    this.entryService.updateEntryToDB({
      name: foodName,
      gramsPerServing,
      calories,
      fat,
      carbs,
      protein,
    });
  }

  deleteEntry(entryName: string | undefined) {
    this.entryService.deleteEntryFromDB(entryName as string);
  }

  ngOnInit() {}
}
