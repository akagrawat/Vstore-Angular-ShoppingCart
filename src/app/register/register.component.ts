import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from '../shared/register';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  register: Register;
  user: firebase.User;
  userId: string;

  // reset Form  values
  @ViewChild('fform') registerFormDirective;

  // Form error intialization
  formErrors = {
    'username': '',
    'email': '',
    'password': '',
  };

  // Form validation
  validationMessages = {
    'username': {
      'required': 'Name is required !',
      'minlength': 'Name must be 2 characterd long !',
      'maxlength': 'Name cannot be more than 25 characters !'
    },
      'email': {
      'required': 'Email is required !',
      'email': 'Email is not in valid format !'
    },
    'password': {
      'required': 'Password is required !',
      'minlength': 'Password must be 5 characters long !',
      'maxlength': 'Password cannot be more than 10 characters !',
      'pattern': 'Password must be contain at least one Lowercase, Uppercase & special symbol !',
    },
  };


  constructor(
    private reg: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth) {
    this.createForm();
   }

  ngOnInit() {

    // subscribe logged in user data
    this.authService.getLoggedInUser()
    .subscribe(user => {
        console.log(user);
        this.user = user;
      });

  }

  createForm() {
    this.registerForm = this.reg.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]]
    });

    this.registerForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // reset form validation message
  }

  onValueChanged(data?: any) {
    if (!this.registerForm) { return; }
    const form = this.registerForm;
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

  // submit signup form data
  onSubmit() {
    this.register = this.registerForm.value;
    this.authService.signup(this.register.email, this.register.password, this.register.username);
    this.register.email = this.register.password = '';

    // reset form after submission
    this.registerForm.reset({
      username: '',
      email: '',
      password: ''
    });
    this.registerFormDirective.resetForm();
  }

  // google login
  loginGoogle() {
    this.authService.googleLogin();
  }

}
