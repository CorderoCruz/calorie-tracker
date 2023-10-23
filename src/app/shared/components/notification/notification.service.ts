import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from './notification.component';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private snackbar = inject<MatSnackBar>(MatSnackBar);

  private duration: number = 3;

  public notificationActions = {
    next: (response: any) => this.openNotification(response.message, 'green-notification'),
    error: (err: any) => this.openNotification(err.message, 'red-notification'),
  };

  public openNotification(message: string, colorClass: string) {
    this.snackbar.openFromComponent(NotificationComponent, {
      duration: this.duration * 1000,
      data: { message, colorClass },
    });
  }
}
