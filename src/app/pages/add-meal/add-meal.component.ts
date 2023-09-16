import { Component, OnInit, computed, inject, signal } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { isNumber } from "./validators";
import { MacroService } from "src/app/services/macros/macro.service";
import { EntryService } from "src/app/services/entry-service/entry-service.service";
import { Utils } from "src/app/utils/utils";

@Component({
  selector: "app-calorie-input",
  templateUrl: "./add-meal.component.html",
  styleUrls: ["./add-meal.component.css"],
})
export class AddMealComponent implements OnInit {
  fb: FormBuilder = inject(FormBuilder);
  macroService = inject<MacroService>(MacroService);
  entryService = inject<EntryService>(EntryService);

  public readonly defaultDate: string = `${Utils.date.getFullYear()}-${
    (Utils.date.getMonth() + 1).toString().length === 1
      ? "0" + (Utils.date.getMonth() + 1)
      : Utils.date.getMonth() + 1
  }-${Utils.date.getDate()}`;

  public readonly formatedDefaultDate: string = Utils.formatInputDate(
    this.defaultDate
  );

  // formating the todays date to make the value of date input
  public formatedMacroDate = signal<string>("");

  public changeDate(event) {
    const value: string = event.target.value;
    const formatedDate: string = Utils.formatInputDate(value);
    this.formatedMacroDate.set(formatedDate);
    this.macroService.getMacros(formatedDate);
  }

  updateMacros({ foodName, grams }: { foodName: string; grams: number }) {
    this.macroService.updateMacros(
      grams,
      foodName,
      Utils.formatInputDate(this.formatedMacroDate())
    );
  }

  ngOnInit() {
    this.macroService.getMacros(Utils.formatInputDate(this.defaultDate));
  }
}
