import { Component, OnInit, inject } from '@angular/core';
import { AddWeightFormComponent } from './form/add-weight-form.component';
import { Utils } from '../utils/utils';
import { WeightService } from '../services/weight/weight.service';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: `add-weight`,
  standalone: true,
  imports: [AddWeightFormComponent, AsyncPipe, JsonPipe, NgFor],
  styleUrls: [`./add-weight.component.css`],
  template: ` <div class="add-weight-container">
    <add-weight-form (weightEmitter)="addWeight($event)"></add-weight-form>
    <div class="weight-container">
      <div *ngFor="let weight of weightService.displayWeights()">
        <p>
          {{ weight.weight }}
        </p>
        <p>{{ weight.date }}</p>
      </div>
    </div>
  </div>`,
})
export class AddWeightComponent implements OnInit {
  public weightService = inject<WeightService>(WeightService);

  weights: Observable<any>;

  addWeight(event: number) {
    const date: string = Utils.getTodaysDate();
    if (!event) return alert('No weight provided');
    this.weightService.addWeight(date, event).subscribe();
  }

  ngOnInit(): void {
    this.weightService.getWeight().subscribe();
  }
}
