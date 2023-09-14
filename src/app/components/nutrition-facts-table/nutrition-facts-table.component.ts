import { Component, inject, Input } from '@angular/core';
import { MacroService } from 'src/app/services/macros/macro.service';

@Component({
  selector: 'nutrition-facts-table',
  templateUrl: './nutrition-facts-table.component.html',
  styleUrls: ['./nutrition-facts-table.component.css'],
})
export class NutritionFactsTableComponent {
  @Input('width') width: number;
  public macroService: MacroService = inject(MacroService);
}
