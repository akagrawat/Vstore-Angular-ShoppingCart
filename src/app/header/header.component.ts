import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartItemCount = 0;
  user: firebase.User;
  constructor( private sharedService: SharedService,
              private authService: AuthService) {
                this.authService.getLoggedInUser().subscribe( user => {
                  this.user = user;

                });
              }

  ngOnInit() {
    this.sharedService.currentMessage.subscribe(msg => this.cartItemCount = msg);
  }

}
