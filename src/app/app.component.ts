import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntryService } from './services/entry/entry-service.service';
import { WeightService } from './services/weight/weight.service';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [RouterOutlet],
})
export class AppComponent implements OnInit, OnDestroy {
  private entryService: EntryService = inject(EntryService);
  private weightService = inject<WeightService>(WeightService);
  private entrySubscription: Subscription;
  private weightSubscription: Subscription;

  ngOnInit() {
    if (this.entryService.foodEntries().length === 0) {
      this.entrySubscription = this.entryService.getEntriesFromDB().subscribe();
    }

    if (this.weightService.weights().length === 0) {
      this.weightSubscription = this.weightService.getWeight().subscribe();
    }
  }
  ngOnDestroy(): void {
    this.weightSubscription.unsubscribe();
    this.entrySubscription.unsubscribe();
  }
}
