import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, UpperCasePipe } from '@angular/common';

interface Button {
  link: string;
  content: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  template: `<div class="button-container">
    @for(link of links; track $index) {
    <button mat-raised-button color="primary" [routerLink]="link.link">{{ link.content | uppercase }}</button>
    }
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
  imports: [MatButtonModule, RouterLink, UpperCasePipe],
})
export class HomeComponent {
  links: Button[] = [
    { link: 'create-entry', content: 'create entry' },
    { link: 'add-meal', content: 'add meal' },
    { link: 'edit-entries', content: 'edit entries' },
    { link: 'add-weight', content: 'add weight' },
  ];
}
