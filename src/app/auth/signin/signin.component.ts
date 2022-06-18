import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  isLoading = false;

  signForm = new FormGroup({
    tagnameFormControl: new FormControl('', [Validators.required]),
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(8)]),
    repeatPasswordFormControl: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private authService: AuthService) { }

  

  ngOnInit(): void {
  }

  onSignin() {
    const user = this.signForm.value;
    
    //TODO: Que cuando la contraseña no coincida informar al usuario.
    if(!this.signForm.valid && user.passwordFormControl !== user.repeatPasswordFormControl) {
      return;
    }

    this.authService.createUser(user.tagnameFormControl, user.emailFormControl, user.passwordFormControl);
  }

}
