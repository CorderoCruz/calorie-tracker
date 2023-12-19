import { Component, Inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";

@Component({
    selector: "app-notification",
    template: `<p [class]="data.colorClass">{{ data.message }}</p>`,
    styles: [
        `
      .red-notification {
        color: #ff5252;
        font-weight: bolder;
        text-align: center;
      }

      .green-notification {
        color: green;
        font-weight: bolder;
        text-align: center;
      }
    `,
    ],
    standalone: true,
})
export class NotificationComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
