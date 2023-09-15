import { Component, OnInit, inject } from '@angular/core';
import { MacroService } from './services/macros/macro.service';
import { EntryService } from './services/entry-service/entry-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  entryService: EntryService = inject(EntryService);
  macroService: MacroService = inject(MacroService);
  ngOnInit(): void {
    this.entryService.getEntries();
  }
}
