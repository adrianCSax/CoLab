import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-start-login',
  templateUrl: './start-login.component.html',
  styleUrls: ['./start-login.component.scss']
})
export class StartLoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  isLoading = false;

  loginForm = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(8)])
  });



  ngOnInit(): void {
  }

  goToSignIn() {
    this.router.navigate(['signIn']);
  }

  onLogin() {
    if(!this.loginForm.valid) {
      return;
    }

    const user = this.loginForm.value;
    this.authService.loginUser(user.emailFormControl, user.passwordFormControl);
  }

}
