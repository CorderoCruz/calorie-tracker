import { Component, inject, Input } from "@angular/core";
import { MacroService } from "src/app/services/macros/macro.service";
import { NgIf } from "@angular/common";

@Component({
    selector: "nutrition-facts-table",
    templateUrl: "./nutrition-facts-table.component.html",
    styleUrls: ["./nutrition-facts-table.component.css"],
    standalone: true,
    imports: [NgIf],
})
export class NutritionFactsTableComponent {
  @Input("date") date: string;
  public macroService: MacroService = inject(MacroService);
}
