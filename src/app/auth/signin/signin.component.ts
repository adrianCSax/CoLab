import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import Validation from '../validation';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  isLoading = false;
  signForm: FormGroup = this.formBuilder.group({    
    tagnameFormControl: new FormControl('', [Validators.required]),
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: ['', [Validators.required, Validators.minLength(8)]],
    repeatPasswordFormControl:  ['', [Validators.required, Validators.minLength(8)]]
  }, {
    validators: [Validation.match('passwordFormControl', 'repeatPasswordFormControl')]
  } );

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {}

  get formControls() {
    console.log()
    return this.signForm?.controls;
  }

  onSignin() {
    if (this.signForm === undefined) return;

    const user = this.signForm.value;
    console.log(user);
    
    //TODO: Que cuando la contraseña no coincida informar al usuario.
    if(!this.signForm.valid && user.passwordFormControl !== user.repeatPasswordFormControl) {
      return;
    }

    this.authService.createUser(user.tagnameFormControl, user.emailFormControl, user.passwordFormControl);
  }

}
