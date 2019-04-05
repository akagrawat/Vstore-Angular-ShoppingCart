import { Component, OnInit, ViewChildren, AfterViewInit} from '@angular/core';
import { Product } from '../shared/product';
import { ProductService } from '../services/product.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { CollapseComponent } from 'angular-bootstrap-md';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { NgxSpinnerService } from 'ngx-spinner';
import { Profile } from '../shared/profile';




declare var $: any;
@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit, AfterViewInit {

  products: any;
  totalPrice = 0;
  date: number;
  tax = 0;
  cartItemCount = 0;
  user: firebase.User;
  userDetails: Profile[];




  @ViewChildren(CollapseComponent) collapses: CollapseComponent[];

  constructor( private productService: ProductService,
               private afAuth: AngularFireAuth,
               private db: AngularFireDatabase,
               private authService: AuthService,
               private spinner: NgxSpinnerService) {
    this.products = this.productService.getProductFromCart();
    this.cartItemCount = this.products.length;
    this.products.forEach((product) => {
    this.totalPrice += product.productPrice;
   });

    this.date = Date.now();
    this.tax = this.totalPrice * (9 / 100);

    afAuth.authState.subscribe((user) => {
      this.user = user;
    });

  }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    this.collapses.forEach((collapse: CollapseComponent) => {
      collapse.toggle();
    });

}

  downloadReceipt() {
    const data = document.getElementById('receipt');
    // console.log(data);

    html2canvas(data).then((canvas) => {
    // Few necessary setting options
    const imgWidth = 208;
    const pageHeight = 295;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    const heightLeft = imgHeight;

    const contentDataURL = canvas.toDataURL('image/png');
    const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    const position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    pdf.save('vstore.pdf'); // Generated PDF
    });
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
