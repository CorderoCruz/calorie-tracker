import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: `add-weight-form`,
  templateUrl: `./add-weight-form.component.html`,
  styleUrls: [`./add-weigth-form.components.css`],
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
})
export class AddWeightFormComponent {
  @Output('weightEmitter') weightEmmiter = new EventEmitter();

  private fb = inject<FormBuilder>(FormBuilder);

  public todaysDate = Utils.getTodaysDate();

  public addWeightForm = this.fb.group({
    weight: [``, [Validators.required]],
  });

  public addWeight(): void {
    const { weight } = this.addWeightForm.getRawValue();
    this.weightEmmiter.emit(weight as string);
  }
}
