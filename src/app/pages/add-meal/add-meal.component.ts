import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNumber } from './validators';
import { MacroService } from 'src/app/services/macros/macro.service';
import { EntryService } from 'src/app/services/entry-service/entry-service.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-calorie-input',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css'],
})
export class AddMealComponent implements OnInit {
  fb: FormBuilder = inject(FormBuilder);
  macroService = inject<MacroService>(MacroService);
  entryService = inject<EntryService>(EntryService);

  addMealForm: FormGroup = this.fb.group({
    foodName: ['', [Validators.required]],
    grams: ['', [Validators.required, isNumber()]],
  });

  // formating the todays date to make the value of date input
  macroDate: string = `${Utils.date.getFullYear()}-${
    (Utils.date.getMonth() + 1).toString().length === 1
      ? '0' + (Utils.date.getMonth() + 1)
      : Utils.date.getMonth() + 1
  }-${Utils.date.getDate()}`;

  changeDate() {
    this.macroService.getMacros(Utils.formatInputDate(this.macroDate));
  }

  updateMacros({ foodName, grams }: { foodName: string; grams: number }) {
    this.macroService.updateMacros(
      grams,
      foodName,
      Utils.formatInputDate(this.macroDate)
    );
  }

  ngOnInit() {
    this.macroService.getMacros(Utils.formatInputDate(this.macroDate));
  }
}
