import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntryService } from 'src/app/services/entry-service/entry-service.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css'],
})
export class AddEntryComponent {
  fb: FormBuilder = inject(FormBuilder);
  entryService: EntryService = inject(EntryService);

  addFoodForm: FormGroup = this.fb.group({
    foodName: ['', [Validators.required]],
    gramsPerServing: ['', [Validators.required]],
    calories: ['', [Validators.required]],
    fat: ['', [Validators.required]],
    carbs: ['', [Validators.required]],
    protein: ['', [Validators.required]],
  });

  addFoodToDB() {
    const { foodName, gramsPerServing, calories, fat, carbs, protein } =
      this.addFoodForm.getRawValue();

    if (
      !foodName ||
      !gramsPerServing ||
      !calories ||
      !fat ||
      !carbs ||
      !protein
    ) {
      alert('Not all fields are valid');
      return;
    }

    this.entryService.addEntryToDB({
      name: foodName,
      gramsPerServing: parseInt(gramsPerServing),
      calories: parseInt(calories),
      fat: parseInt(fat),
      carbs: parseInt(carbs),
      protein: parseInt(protein),
    });
  }
}
