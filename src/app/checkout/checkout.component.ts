import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { NgxSpinnerService } from 'ngx-spinner';
import { Profile } from '../shared/profile';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  shippingForm:  FormGroup;
  user: firebase.User;
  shippingData: Profile;
  userDetails: Profile[];

  // reset Form  values
  @ViewChild('usfform') shippingFormDirective;
   // form errors initialization
   formErrors = {
    'firstname': '',
    'lastname': '',
    'phone': '',
    'address': '',
    'country': '',
    'state': '',
    'zip': '',
  };

  // form validation message
  validationMessages = {
    'firstname': {
      'required': 'Name is required !',
      'minlength': 'Name must be 2 characterd long !',
      'maxlength': 'First name cannot be more than 15 characters !'
    },
    'lastname': {
      'required': 'Name is required !',
      'minlength': 'Name must be 2 characterd long !',
      'maxlength': 'First name cannot be more than 15 characters !'
    },
    'phone': {
      'required': 'Phonenumber is required !',
      'minlength': 'Phone Number must be 10 digits long !',
      'maxlength': 'Phone cannot be more than 10 digits !',
      'pattern': 'Pass must be contain Digits !',
    },
    'address': {
      'required': 'Address is required',
      'minlength': 'Address must be more 10 characters!',
      'maxlength': 'Address cannot be more than 50 characters !',
    },
    'country': {
      'required': 'Countery is required',
    },
    'state': {
      'required': 'State is required',
    },
    'zip': {
      'required': 'Zip code is required',
      'minlength': 'Zip code must be 4 digits long !',
      'maxlength': 'Zip code cannot be more than 8 digits !',
    }
  };

  constructor( private usf: FormBuilder,
               private afAuth: AngularFireAuth,
               private db: AngularFireDatabase,
               private authService: AuthService,
               private spinner: NgxSpinnerService
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
    this.shippingForm = this.usf.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10),
        Validators.pattern]],
        address: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
        country: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
    });
   this.shippingForm.valueChanges
   .subscribe(data => this.onValueChanged(data));

   this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.shippingForm) { return; }
    const form = this.shippingForm;
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

  // submit shipping form data form data
  updateShippingData() {
    this.shippingData = this.shippingForm.value;
    console.log(this.shippingData);
    this.db.list('users/' + this.user.uid).update('shippinginfo', this.shippingData);
    // spinner
    this.spinner.show();
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 3000);
    // reset form after submission
    this.shippingForm.reset({
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      address: '',
      country: '',
      state: '',
      zip: ''
    });
    this.shippingFormDirective.resetForm();
  }

  getData() {
    this.authService.getUsers().snapshotChanges().forEach(userSnapshot => {
      this.userDetails = [];
      // tslint:disable-next-line:no-shadowed-variable
      userSnapshot.forEach( userSnapshot => {
        const user = userSnapshot.payload.toJSON();
        user[`$key`] = userSnapshot.key;
        // get current logined user data
        if ( user[`$key`] === this.user.uid) {
        this.userDetails.push(user as Profile);

        // Register is a class which have user properties
        // (user as Register) is a typecasting here ..user object as Register

        // spinner
        this.spinner.show();
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
      }, 3000);

      }
      });
    });
  }

}
