import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MacroService } from './services/macros/macro.service';
import { EntryService } from './services/entry/entry-service.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  entryService: EntryService = inject(EntryService);
  macroService: MacroService = inject(MacroService);
  httpService: HttpClient = inject(HttpClient);

  subscription: Subscription;

  ngOnInit() {
    if (this.entryService.foodEntries().length === 0) {
      this.subscription = this.entryService.getEntriesFromDB().subscribe();
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
