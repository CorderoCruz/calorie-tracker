import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { NotificationService } from "../notification/notification.service";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "home-button",
    template: `
    <button
      (click)="navigateHome()"
      mat-raised-button
      color="primary"
      class="home-button mat-elevation-z6"
    >
      <p>HOME</p>
    </button>
  `,
    styles: [
        `
      button {
        width: 320px;
      }

      p {
        color: white;
      }
    `,
    ],
    standalone: true,
    imports: [MatButtonModule],
})
export class HomeButtonComponent {
  router = inject<Router>(Router);
  notificationService = inject(NotificationService);

  navigateHome() {
    return this.router.navigateByUrl("/");
  }
}
