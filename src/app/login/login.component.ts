import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

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
  ) {
  }

  public loginFormGroup = this.formBuilder.group(
    {
      username: this.formBuilder.control(''),
      password: this.formBuilder.control(''),
    }
  )

  handleSubmit() {
    // TODO
  }
}
