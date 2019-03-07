import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from '../shared/profile';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Register } from '../shared/register';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: firebase.User;
  userList: Register[];
  profileForm: FormGroup;
  profile: Profile;
  userId: string;


  // form errors initialization
  formErrors = {
    'username': '',
    'email': '',
    'phone': '',
    'address': ''
  };

  // form validation message
  validationMessages = {
    'username': {
      'required': 'Name is required !',
      'minlength': 'Name must be 2 characterd long !',
      'maxlength': 'First name cannot be more than 25 characters !'
    },
      'email': {
      'required': 'Email is required !',
      'email': 'Email is not in valid format !'
    },
    'phone': {
      'required': 'Phonenumber is required !',
      'minlength': 'Phone Number must be 10 digits long !',
      'maxlength': 'Phone cannot be more than 10 characters !',
      'pattern': 'Pass must be contain Digits !',
    },
    'address': {
      'required': 'Address is required',
      'minlength': 'Address must be more 10 characters!',
      'maxlength': 'Address cannot be more than 50 characters !',
    }
  };




  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private prf: FormBuilder,
    private db: AngularFireDatabase
  ) {
      this.createForm();
      // fetching current user info
    afAuth.authState.subscribe((user) => {
      this.user = user;
    });

   }

  ngOnInit() {
   this.getData();


  }

  createForm() {
    this.profileForm = this.prf.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10),
        Validators.pattern]],
    });
   this.profileForm.valueChanges
   .subscribe(data => this.onValueChanged(data));

   this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.profileForm) { return; }
    const form = this.profileForm;
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

  /*
  onSubmit() {
    this.profile = this.profileForm.value;
    if (this.user) {
      this.userId = this.user.uid;
      this.info = this.db.list(`users/${this.userId}`);
    this.info.push(this.profile);
    }
    console.log('its working');
  }
  */

  onSubmit() {
   this.profile = this.profileForm.value; // get data comming from Form
   this.db.list('users').update(this.user.uid, this.profile);
}

/*
getData() {
  this.customers = this.db.list('/users');
  this.customers.query.on('value', this.getUser);
}
getUser(data) {
  console.log(data.val());
// tslint:disable-next-line:no-unused-expression
}
*/

getData() {
  this.authService.getUsers().snapshotChanges().forEach(userSnapshot => {
    this.userList = [];
    // tslint:disable-next-line:no-shadowed-variable
    userSnapshot.forEach( userSnapshot => {
      const user = userSnapshot.payload.toJSON();
      user[`$key`] = userSnapshot.key;
      // get current logined user data
      if ( user[`$key`] === this.user.uid) {
      this.userList.push(user as Register);
      // Register is a class which have user properties
      // (user as Register) is a typecasting here ..user object as Register
    }

    });
  });
}

userLogout() {
  this.authService.logout();
}

}
