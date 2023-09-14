import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNumber } from './validators';
import { MacroService } from 'src/app/services/macros/macro.service';
import { EntryService } from 'src/app/services/entry-service/entry-service.service';
import { Utils } from 'src/app/utils/utils';
import { retry } from 'rxjs';

@Component({
  selector: 'app-calorie-input',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css'],
})
export class AddMealComponent {
  fb: FormBuilder = inject(FormBuilder);
  macroService: MacroService = inject(MacroService);
  entryService: EntryService = inject(EntryService);

  addMealForm: FormGroup = this.fb.group({
    date: ['', [Validators.required]],
    foodName: ['', [Validators.required]],
    grams: ['', [Validators.required, isNumber()]],
  });

  addCalories() {
    const { date, foodName, grams } = this.addMealForm.getRawValue();
    const numberGrams: number = parseInt(grams);
    if (!foodName) return alert('No food provided');
    if (!numberGrams) return alert('Not valid inputs');

    let returnedDate: string = date;

    if (returnedDate) {
      let monthAndDay: Array<string> = (date as string).split('-');

      for (let i: number = 0; i < monthAndDay.length; i++) {
        if (monthAndDay[i].startsWith('0')) {
          monthAndDay[i] = monthAndDay[i].split('')[1];
        }
      }

      const year: Array<string> = monthAndDay.splice(0, 1);
      returnedDate = monthAndDay.concat(year).join('-');
    } else {
      returnedDate = Utils.getTodaysDate();
    }

    if (returnedDate !== Utils.getTodaysDate()) {
      this.macroService.updateFutureMacros(numberGrams, foodName, returnedDate);
    }

    this.macroService.updateMacros(numberGrams, foodName, returnedDate);
  }
}
