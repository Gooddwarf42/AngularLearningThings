import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
  }

  public loginFormGroup = this.formBuilder.group(
    {
      username: this.formBuilder.control<string | null>(null),
      password: this.formBuilder.control<string | null>(null),
    }
  )

  handleSubmit() {
    // ValidateLoginData
    if (!ValidateForm(this.loginFormGroup)) {
      alert("Login invalid");
      return;
    }

    localStorage.setItem("loginmKey", "drago");
    this.router.navigate(['/home/list']);
  }
}
function ValidateForm(loginFormGroup: FormGroup<{ username: FormControl<string | null>; password: FormControl<string | null>; }>) {
  const mimmo = loginFormGroup.getRawValue();
  return mimmo.password != null && mimmo.username == mimmo.password;
}

