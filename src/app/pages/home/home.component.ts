import { Component } from "@angular/core";

interface Buttons {
  link: string;
  content: string;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  links: Buttons[] = [
    { link: "create-entry", content: "create entry" },
    { link: "add-meal", content: "add meal" },
    { link: "edit-entries", content: "edit entries" },
  ];
}
