import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map } from "rxjs";
import { AuthService } from "./auth.service";
import { environment } from "src/environments/environment";

export const canActivateUser: CanActivateFn = () => {
  const url = environment["apiUrl"];
  const router = inject<Router>(Router);
  const http = inject<HttpClient>(HttpClient);
  const authService = inject<AuthService>(AuthService);

  if (authService.authenticatedUser()) return true;

  const token: string | null = localStorage.getItem("access_token");

  if (!token) router.navigateByUrl("/authentication");

  return http
    .get(`${url}/validate`, {
      headers: { authorization: "Bearer " + token },
    })
    .pipe(
      map((response: any): boolean => {
        if (response?.user) {
          const { user, access_token } = response;
          authService.authenticatedUser.set({
            email: user.email,
            username: user.username,
            access_token,
          });

          localStorage.setItem("access_token", access_token);
        }
        return response.access;
      })
    );
};
