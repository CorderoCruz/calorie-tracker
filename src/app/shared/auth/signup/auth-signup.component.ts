import { Component, EventEmitter, Output } from "@angular/core";
import { Credentials } from "../auth.component";

@Component({
  selector: "app-auth-signup",
  templateUrl: "./auth-signup.component.html",
  styleUrls: ["./auth-signup.component.css"],
})
export class AuthSignupComponent {
  @Output("credentials") credentials = new EventEmitter<Credentials>();

  signup() {}
}
