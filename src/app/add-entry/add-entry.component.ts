import { Component } from '@angular/core';
import { HomeButtonComponent } from '../shared/components/home-button/home-button.component';
import { AddEntryFormComponent } from './add-entry-form/add-entry-form.component';

@Component({
    selector: 'app-add-food',
    template: ` <div class="create-entry-container">
    <add-entry-form></add-entry-form>
    <home-button></home-button>
  </div>`,
    styles: [
        `
      .create-entry-container {
        padding: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 20px;
      }
    `,
    ],
    standalone: true,
    imports: [AddEntryFormComponent, HomeButtonComponent],
})
export class AddEntryComponent {}
