import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: firebase.User;
  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.afAuth.authState
    .subscribe( user => {
      console.log(user);
      this.user = user;
    });
  }

}
