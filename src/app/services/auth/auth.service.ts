import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";
import { Credentials } from "src/app/pages/auth/auth.component";

type User = {
  username: string;
  email: string;
  access_token: string;
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly url: string =
    "https://macro-api-cruz-corderos-projects.vercel.app";
  http = inject<HttpClient>(HttpClient);
  router = inject<Router>(Router);
  authenticatedUser = signal<User | undefined>(undefined);

  loginErrors = signal<string>("");

  public login(credentials: Credentials) {
    return this.http
      .post<any>(`${this.url}/api/v1/auth/login`, credentials, {
        headers: {},
      })
      .pipe(
        tap((response) => {
          if (response?.response?.error) {
            return this.loginErrors.set(response.response.message);
          }

          const { access_token, user } = response;
          localStorage.setItem("access_token", JSON.parse(access_token));
          this.authenticatedUser.set({
            email: user.email,
            username: user.username,
            access_token,
          });
        })
      );
  }

  constructor() {}
}
