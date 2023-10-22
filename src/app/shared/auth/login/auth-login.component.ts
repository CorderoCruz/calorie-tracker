import { Component, EventEmitter, OnInit, Output, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Credentials } from "src/app/shared/auth/auth.component";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-auth-login",
  templateUrl: "./auth-login.component.html",
  styleUrls: ["./auth-login.component.css"],
})
export class AuthLoginComponent implements OnInit {
  @Output("credentials") crendentials = new EventEmitter<Credentials>();
  private fb = inject<FormBuilder>(FormBuilder);
  public authService = inject<AuthService>(AuthService);

  public loginForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
    rememberMe: [false],
  });

  public login(): void {
    const { email, password, rememberMe } = this.loginForm.getRawValue();
    this.crendentials.emit({ email, password, rememberMe });
  }

  public get email() {
    return this.loginForm.get("email");
  }

  ngOnInit(): void {}
}
