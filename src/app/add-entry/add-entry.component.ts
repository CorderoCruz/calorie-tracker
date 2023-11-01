import { Component } from '@angular/core';

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
})
export class AddEntryComponent {}
