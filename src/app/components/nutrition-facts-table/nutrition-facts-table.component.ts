import { Component, inject, Input } from '@angular/core';
import { MacroService } from 'src/app/services/macros/macro.service';

@Component({
  selector: 'nutrition-facts-table',
  templateUrl: './nutrition-facts-table.component.html',
  styleUrls: ['./nutrition-facts-table.component.css'],
})
export class NutritionFactsTableComponent {
  public macroService: MacroService = inject(MacroService);
}
