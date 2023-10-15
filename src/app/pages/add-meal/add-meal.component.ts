import { Component, OnInit, computed, inject, signal } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MacroService } from "src/app/services/macros/macro.service";
import { EntryService } from "src/app/services/entry-service/entry-service.service";
import { Utils } from "src/app/utils/utils";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/components/dialog/dialog.component";

@Component({
  selector: "app-calorie-input",
  templateUrl: "./add-meal.component.html",
  styleUrls: ["./add-meal.component.css"],
})
export class AddMealComponent implements OnInit {
  macroService = inject<MacroService>(MacroService);
  entryService = inject<EntryService>(EntryService);
  dialog = inject<MatDialog>(MatDialog);

  // formating the todays date to make the value of date input
  public formatedMacroDate = signal<string>(
    Utils.formatInputDate(
      `${Utils.date.getFullYear()}-${
        (Utils.date.getMonth() + 1).toString().length === 1
          ? "0" + (Utils.date.getMonth() + 1)
          : Utils.date.getMonth() + 1
      }-${Utils.date.getDate()}`
    )
  );

  public changeDate(event) {
    const date = Utils.formatInputDateMaterial(
      event.value.toString().split(" ")
    );
    this.formatedMacroDate.set(date);
    localStorage.setItem("last-date", date);
    this.macroService.getMacrosFromDB(date).subscribe();
  }

  updateMacros({ foodName, grams }: { foodName: string; grams: number }) {
    this.macroService.updateMacros(grams, foodName, this.formatedMacroDate());
  }

  async ngOnInit() {
    const dateFromLocalStorage = localStorage.getItem("last-date");
    if (dateFromLocalStorage) this.formatedMacroDate.set(dateFromLocalStorage);

    this.macroService.getMacrosFromDB(this.formatedMacroDate()).subscribe();
  }
}
