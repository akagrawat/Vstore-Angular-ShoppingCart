import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from '../shared/register';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  register: Register;
  @ViewChild('fform') registerFormDirective;

  formErrors = {
    'username': '',
    'useremail': '',
    'password': '',
  };

  validationMessages = {
    'username': {
      'required': 'First name is required !',
      'minlength': 'First name must be 2 characterd long !',
      'maxlength': 'First name cannot be more than 25 characters !'
    },
    'useremail': {
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

  constructor( private reg: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.registerForm = this.reg.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      useremail: ['', [Validators.required, Validators.email]],
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
  onSubmit() {
    this.register = this.registerForm.value;
    console.log(this.register);
    this.registerForm.reset({
      username: '',
      useremail: '',
      password: ''
    });
    this.registerFormDirective.resetForm();
  }
}
