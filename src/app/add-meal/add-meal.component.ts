import { Component, OnInit, inject, signal } from '@angular/core';
import { MacroService } from 'src/app/services/macros/macro.service';
import { Utils } from 'src/app/utils/utils';
import { NotificationService } from '../shared/components/notification/notification.service';
import { HomeButtonComponent } from '../shared/components/home-button/home-button.component';
import { NutritionFactsTableComponent } from '../shared/components/nutrition-facts-table/nutrition-facts-table.component';
import { AddMealFormComponent } from './form/form.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-calorie-input',
    templateUrl: './add-meal.component.html',
    styleUrls: ['./add-meal.component.css'],
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        AddMealFormComponent,
        NutritionFactsTableComponent,
        HomeButtonComponent,
    ],
})
export class AddMealComponent implements OnInit {
  private macroService = inject<MacroService>(MacroService);
  private notificationService = inject<NotificationService>(NotificationService);

  public formatedMacroDate = signal<string>(
    Utils.formatInputDate(
      `${Utils.date.getFullYear()}-${
        (Utils.date.getMonth() + 1).toString().length === 1
          ? '0' + (Utils.date.getMonth() + 1)
          : Utils.date.getMonth() + 1
      }-${Utils.date.getDate()}`
    )
  );

  public changeDate(event: any) {
    const date = Utils.formatInputDateMaterial(event.value.toString().split(' '));
    this.formatedMacroDate.set(date);
    localStorage.setItem('last-date', date);
    this.macroService.getMacrosFromDB(date).subscribe();
  }

  public updateMacros({ foodName, grams }: { foodName: string; grams: number }) {
    this.macroService
      .updateMacros(grams, foodName, this.formatedMacroDate())
      ?.subscribe(this.notificationService.notificationActions);
  }

  public ngOnInit(): void {
    const dateFromLocalStorage = localStorage.getItem('last-date');
    if (dateFromLocalStorage) this.formatedMacroDate.set(dateFromLocalStorage);
    this.macroService.getMacrosFromDB(this.formatedMacroDate()).subscribe();
  }
}
