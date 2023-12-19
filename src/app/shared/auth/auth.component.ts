import { HttpClient } from "@angular/common/http";
import { Component, inject, signal } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";
import { AuthSignupComponent } from "./signup/auth-signup.component";
import { AuthLoginComponent } from "./login/auth-login.component";
import { NgIf } from "@angular/common";

export type Credentials = {
  email: string;
  password: string;
  confirmPassword?: string;
  rememberMe: boolean;
};

@Component({
    selector: "app-auth",
    template: `
    <div class="container" *ngIf="authState() as state">
      <app-auth-login
        *ngIf="state === 'login'"
        (credentials)="login($event)"
      ></app-auth-login>
      <app-auth-signup
        (credentials)="signup($event)"
        *ngIf="state === 'signup'"
      ></app-auth-signup>
    </div>
  `,
    styles: [
        `
      .container {
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
    imports: [
        NgIf,
        AuthLoginComponent,
        AuthSignupComponent,
    ],
})
export class AuthComponent {
  http = inject<HttpClient>(HttpClient);
  authService = inject<AuthService>(AuthService);

  authState = signal<"login" | "signup">("login");

  public login(credentials: Credentials): void {
    this.authService.login(credentials).subscribe();
  }

  public signup(credentials: Credentials): void {}

  ngOnInit(): void {}
}
