import { Component, EventEmitter, Output, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Entry } from "@interfaces";
import { EntryService } from "src/app/services/entry-service/entry-service.service";

@Component({
  selector: "add-entry-form",
  templateUrl: "./add-entry-form.component.html",
  styleUrls: ["./add-entry-form.component.css"],
})
export class AddEntryFormComponent {
  @Output("outputForm") outputForm = new EventEmitter<Entry>();

  fb = inject<FormBuilder>(FormBuilder);
  entryService = inject<EntryService>(EntryService);

  addEntryForm: FormGroup = this.fb.group({
    name: ["", [Validators.required]],
    calories: ["", [Validators.required]],
    fat: ["", [Validators.required]],
    carbs: ["", [Validators.required]],
    protein: ["", [Validators.required]],
    servingMeasurement: ["", [Validators.required]],
    servingSize: ["", []],
  });

  addFoodToDB(): void {
    this.outputForm.emit({
      ...this.addEntryForm.getRawValue(),
    });
  }
}
