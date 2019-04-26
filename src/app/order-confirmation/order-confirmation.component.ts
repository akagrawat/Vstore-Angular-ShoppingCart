import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../shared/profile';
import { AuthService } from '../services/auth.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from '../shared/product';




@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {
  products: any;
  totalPrice = 0;
  date: number;
  tax = 0;
  cartItemCount = 0;
  user: firebase.User;
  userDetails: any[];
   x: any;
   oderedItem: any;
   keys: any;

  constructor(private productService: ProductService,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private spinner: NgxSpinnerService
    ) {
      afAuth.authState.subscribe((user) => {
        this.user = user;
      });
      this.date = Date.now();


  }

  ngOnInit() {
   this.getData();
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
        this.userDetails.push(user as any);
        // Register is a class which have user properties
        // (user as Register) is a typecasting here ..user object as Register
        // spinner
        for ( const x of this.userDetails) {
          this.oderedItem = this.userDetails;
        }
        for (const x of this.oderedItem) {
            this.x = x.oderedItem;
        }
        this.keys = Object.keys(this.x);
        for ( let i = 0 ; i < this.keys.length; i++) {
          this.totalPrice += this.x[i].productPrice;
          this.cartItemCount += this.x[i].productQuantity;
        }
        this.tax = this.totalPrice * (9 / 100);

        this.spinner.show();
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
      }, 3000);
      }


      });
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

}
