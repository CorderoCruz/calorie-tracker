import { HttpClient } from "@angular/common/http";
import { Component, OnInit, inject } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";

export type Credentials = {
  email: string;
  password: string;
  rememberMe: boolean;
};

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent {
  http = inject<HttpClient>(HttpClient);
  authService = inject<AuthService>(AuthService);

  public login(credentials: Credentials): void {
    this.authService.login(credentials).subscribe();
  }

  ngOnInit(): void {}
}
