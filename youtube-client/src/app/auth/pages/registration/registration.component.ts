import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { checkRegexp } from '../../../shared/regexp.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  registrationForm = new FormGroup({
    firstNameField: new FormControl(''),
    lastNameField: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private router: Router,
    private builder: FormBuilder
  ) {
    this.createRegistrationForm();
  }

  private createRegistrationForm(): void {
    this.registrationForm = this.builder.group({
      firstNameField: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern(/^[a-zA-Z]{1,}$/),
        ],
      ],
      lastNameField: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern(/^[a-zA-Z]{1,}$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, checkRegexp]],
    });
  }

  get getFirstName(): AbstractControl<string | null, string | null> | null {
    return this.registrationForm.get('firstNameField');
  }

  get getLastName(): AbstractControl<string | null, string | null> | null {
    return this.registrationForm.get('lastNameField');
  }

  get getEmail(): AbstractControl<string | null, string | null> | null {
    return this.registrationForm.get('email');
  }

  get getPassword(): AbstractControl<string | null, string | null> | null {
    return this.registrationForm.get('password');
  }
}
