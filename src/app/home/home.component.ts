import { Component } from '@angular/core';

interface Button {
  link: string;
  content: string;
}

@Component({
  selector: 'app-home',
  template: `<div class="button-container">
    <button
      mat-raised-button
      color="primary"
      *ngFor="let link of links"
      [routerLink]="link.link"
      [innerHTML]="link.content | uppercase"
    ></button>
  </div>`,
  styles: [
    `
      .button-container {
        display: flex;
        flex-direction: column;
        padding: 10%;
        gap: 30px;
        justify-content: center;
        align-items: center;
      }

      button {
        width: 320px;
        border: none;
        border-radius: 5px;
        background-color: white;
        color: rgb(0, 0, 0);
        font-weight: bolder;
      }
    `,
  ],
})
export class HomeComponent {
  links: Button[] = [
    { link: 'create-entry', content: 'create entry' },
    { link: 'add-meal', content: 'add meal' },
    { link: 'edit-entries', content: 'edit entries' },
  ];
}
