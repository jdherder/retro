import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string;
  password: string;
  state: string = 'login';
  error: boolean;
  errorMsg: string;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {

  }

  changeState(state: string) {
    this.state = state;
    this.clearError();
  }

  signup() {
    this.clearError();
    this.authService.signup(this.email, this.password)
      .then(() => this.email = this.password = '');
  }

  login() {
    this.clearError();
    this.authService.login(this.email, this.password)
      .then(() => this.email = this.password = '')
      .then(() => this.router.navigate([`/board`]))
      .catch(e => this.setError(e));
  }

  forgotPassword() {
    this.authService.forgotPassword(this.email);
  }

  logout() {
    this.authService.logout();
  }

  setError(error: FirebaseError) {
    this.error = true;
    this.errorMsg = error.message;
  }

  clearError() {
    this.error = false;
    this.errorMsg = '';
  }
}
