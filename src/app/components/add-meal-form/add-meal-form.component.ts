import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Entry } from '@interfaces';
import { isNumber } from 'src/app/pages/add-meal/validators';
import { EntryService } from 'src/app/services/entry-service/entry-service.service';
import { MacroService } from 'src/app/services/macros/macro.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'add-meal-form',
  templateUrl: './add-meal-form.component.html',
  styleUrls: ['./add-meal-form.component.css'],
})
export class AddMealFormComponent {
  @Output('outputNameAndGrams') outputNameAndGrams = new EventEmitter<{
    foodName: string;
    grams: number;
  }>();
  entryService = inject<EntryService>(EntryService);
  macroService = inject<MacroService>(MacroService);

  fb = inject<FormBuilder>(FormBuilder);

  addMealForm: FormGroup = this.fb.group({
    foodName: ['', [Validators.required]],
    grams: ['', [Validators.required, isNumber()]],
  });

  addCalories() {
    const { foodName, grams } = this.addMealForm.getRawValue();
    const numberGrams: number = parseInt(grams);
    if (!foodName) return alert('No food provided');
    if (!numberGrams) return alert('Not valid inputs');
    this.outputNameAndGrams.emit({ foodName, grams: numberGrams });
  }
}
