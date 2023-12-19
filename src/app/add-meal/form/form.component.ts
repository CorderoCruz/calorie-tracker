import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  inject,
  signal,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Observable, map, startWith } from "rxjs";
import { EntryService } from "src/app/services/entry/entry-service.service";
import { MacroService } from "src/app/services/macros/macro.service";
import { MatDialog } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { NgFor, AsyncPipe } from "@angular/common";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
    selector: "add-meal-form",
    templateUrl: "./form.component.html",
    styleUrls: ["./form.component.css"],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        NgFor,
        MatOptionModule,
        MatButtonModule,
        AsyncPipe,
    ],
})
export class AddMealFormComponent implements OnInit {
  @Output("outputNameAndGrams") outputNameAndGrams = new EventEmitter<{
    foodName: string;
    grams: number;
  }>();
  entryService = inject<EntryService>(EntryService);
  macroService = inject<MacroService>(MacroService);
  dialog = inject<MatDialog>(MatDialog);

  fb = inject<FormBuilder>(FormBuilder);

  dialogMessage = signal<string>("");

  filteredOptions: Observable<any> | undefined;

  addMealForm: FormGroup = this.fb.group({
    foodName: ["", [Validators.required]],
    servingMeasurement: ["", [Validators.required]],
  });

  weight = signal<boolean>(false);

  updateMacros() {
    try {
      const { foodName, servingMeasurement } = this.addMealForm.getRawValue();
      const numberGrams: number = parseInt(servingMeasurement);
      if (!foodName) throw new Error("No food provided");
      if (!numberGrams) throw new Error("Not valid inputs");
      this.outputNameAndGrams.emit({ foodName, grams: numberGrams });
      this.addMealForm.reset();
      Object.keys(this.addMealForm.controls).forEach((key) => {
        const control = this.addMealForm.controls[key];
        control.setErrors(null);
      });
    } catch (err: any) {
      alert(err.message);
    }
  }

  changeWeightColumn() {
    const foodName = this.addMealForm.get("foodName")?.value;
    const food = this.entryService
      .foodEntries()
      .find((food) => food.name === foodName);
    food?.servingMeasurement === "one"
      ? this.weight.set(true)
      : this.weight.set(false);
  }

  filterEntryNames(value: string): Array<string> {
    return this.entryService
      .foodEntries()
      .map((entry) => entry.name)
      .filter((option) => option.toLowerCase().includes(value.toLowerCase()));
  }

  ngOnInit(): void {
    this.filteredOptions = this.addMealForm.get("foodName")?.valueChanges.pipe(
      startWith(""),
      map((value) => this.filterEntryNames(value || ""))
    );
  }
}
