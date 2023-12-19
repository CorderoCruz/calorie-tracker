import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { WeightService } from '../services/weight/weight.service';
import { Utils } from '../utils/utils';
import { AddWeightFormComponent } from './form/add-weight-form.component';

@Component({
  selector: `add-weight`,
  standalone: true,
  imports: [AddWeightFormComponent],
  styleUrls: [`./add-weight.component.css`],
  templateUrl: `./add-weight.component.html`,
})
export class AddWeightComponent implements OnInit {
  public weightService = inject<WeightService>(WeightService);

  weights: Observable<any>;

  addWeight(event: number) {
    const date: string = Utils.getTodaysDate();
    if (!event) return alert('No weight provided');
    this.weightService.addWeight(date, event).subscribe();
  }

  ngOnInit(): void {}
}
