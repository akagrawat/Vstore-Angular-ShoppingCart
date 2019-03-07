import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>; // firebase user variable
  private userDetails: firebase.User = null; // use in AuthGuard

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase
  ) {
    this.user = afAuth.authState;
     this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
            console.log(this.userDetails);
          } else {
            this.userDetails = null;
          }
        }
      );
  }

  // Login with Username & Password
  signup(email: string, password: string, username: string) {
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);

        const userDetail = {
          username: username,
          email: email
      };
      // Update custom signup field in database
      this.db.list('users').update(value.user.uid, userDetail);

      // Navigate after signup success
        this.router.navigate(['/user']);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  // login using email & password
  login(email: string, password: string) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        this.router.navigate(['/user']);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  // login with google api login
  googleLogin() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider)
    .then(value => {
      console.log('Nice, it worked!');
      this.router.navigate(['/user']);
    })
    .catch(err => {
      console.log('Something went wrong:', err.message);
    });
  }

// give info about user to AuthGurad
  isLoggedIn() {
    if (this.userDetails == null ) {
        return false;
      } else {
        return true;
      }
    }

// logout
  logout() {
      this.afAuth.auth.signOut()
      .then((res) => {
        this.router.navigate(['/login']);
        console.log('logout');

    });
    }

  // give info about login current user
  getLoggedInUser() {
    return this.afAuth.authState;
  }

// get database users
  getUsers() {
  return this.db.list('users');
  }
}
