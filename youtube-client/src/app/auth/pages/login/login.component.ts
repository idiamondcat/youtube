import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { checkRegexp } from '../../../shared/regexp.validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    loginField: new FormControl(''),
    passwordField: new FormControl(''),
  });
  constructor(
    private router: Router,
    private builder: FormBuilder,
    private auth: AuthService
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.loginForm = this.builder.group({
      loginField: ['', [Validators.required, Validators.email]],
      passwordField: ['', [Validators.required, checkRegexp]],
    });
  }
  get getLoginField(): AbstractControl<string | null, string | null> | null {
    return this.loginForm.get('loginField');
  }

  get getPasswordField(): AbstractControl<string | null, string | null> | null {
    return this.loginForm.get('passwordField');
  }

  login(): void {
    const token = 'GfhfkYGhjfh46y4jvdfkjgkjHHNJ44fks9dkkDGN';
    localStorage.setItem('token', token);
    this.auth.isLogin.next(true);
    this.router.navigate(['/']);
  }
}
