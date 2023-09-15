import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  links: { link: string; content: string }[] = [
    { link: 'create-entry', content: 'create entry' },
    { link: 'add-meal', content: 'add meal' },
    { link: 'edit-entries', content: 'edit entries' },
  ];
}
