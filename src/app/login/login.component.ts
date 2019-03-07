import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Register } from '../shared/register';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  login: Register;
  user: firebase.User;

  // user for form value reset
  @ViewChild('lform') loginFormDirective;

  // Form errors initialization
  formErrors = {
    'email': '',
    'password': '',
  };

  // Form Validation
  validationMessages = {
    'email': {
      'required': 'Email is required !',
      'email': 'email is not valid format !'
    },
    'password': {
      'required': 'Password is required !',
      'minlength': 'Password must be 5 characters long !',
      'maxlengeth': 'Password cannot be more than 10 characters !'
    }
  };

  constructor(
    public authService: AuthService,
    private log: FormBuilder,
    private router: Router,
    public afAuth: AngularFireAuth) {
      this.createForm();
   }

   /*

   login() {
    this.authService.signup(this.email, this.user.password);
    this.user.email = this.user.password = '';
  }
  */


  ngOnInit() {

    // fetching current user info
    this.authService.getLoggedInUser()
    .subscribe(user => {
        console.log(user);
        this.user = user;
        if (user) {
          this.router.navigate(['user']);

        }
      });

  }

  createForm() {
    this.loginForm = this.log.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]]
    });

    this.loginForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  // login form data submission
  onSubmit() {
    this.login = this.loginForm.value;
    this.authService.login(this.login.email, this.login.password);
    this.login.email = this.login.password = '';

    // user for reset login form value
    this.loginForm.reset({
      email: '',
      password: '',
    });

    this.loginFormDirective.resetForm();
  }

}
