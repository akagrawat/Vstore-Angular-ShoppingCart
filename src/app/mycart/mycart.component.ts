import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../shared/product';
import { SharedService } from '../services/shared.service';
import { AuthService} from '../services/auth.service';
import { AngularFireList, AngularFireDatabase} from 'angularfire2/database';
@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss']
})
export class MycartComponent implements OnInit {
productAddedToCart: Product[];

allTotal: number;
cartItemCount = 0;

  constructor(private productService: ProductService,
              private sharedServices: SharedService,
              private db: AngularFireDatabase,
              private authService: AuthService) { }

  ngOnInit() {

    /*this.authService.getLoggedInUser().subscribe ( user => {
      if ( user) {*/
        /*this.db.list('users').update('cartProducts', products);
        localStorage.removeItem('product');*/
         /*this.db.list('users/cartProducts').valueChanges().subscribe( product => {
          this.productAddedToCart = product;
          for (const products of this.productAddedToCart) {
            products.productQuantity = 1;
          }
          });

      } else {*/
        this.productAddedToCart = this.productService.getProductFromCart();
        for (const i of Object.keys(this.productAddedToCart)) {
          this.productAddedToCart[i].productQuantity = 1;
        }

      /*}

    });*/


    console.log(this.productAddedToCart);
    this.productService.removeAllProductFromCart();
    this.productService.addProductToCart(this.productAddedToCart);
    this.calculateAllTotal(this.productAddedToCart);
    this.sharedServices.currentMessage.subscribe(msg => this.cartItemCount = msg);
  }
onAddQuantity(product: Product) {
  this.productAddedToCart = this.productService.getProductFromCart();
  this.productAddedToCart.find(p => p.id === product.id).productQuantity = product.productQuantity + 1;
  this.productService.removeAllProductFromCart();
  this.productService.addProductToCart(this.productAddedToCart);
  this.calculateAllTotal(this.productAddedToCart);
}

onRemoveQuantity(product: Product) {
  this.productAddedToCart = this.productService.getProductFromCart();
  this.productAddedToCart.find(p => p.id === product.id).productQuantity = product.productQuantity - 1;
  this.productService.removeAllProductFromCart();
  this.productService.addProductToCart(this.productAddedToCart);
  this.calculateAllTotal(this.productAddedToCart);
}

calculateAllTotal(allItems: Product[]) {
    let total = 0;
      for ( const i of Object.keys(allItems)) {
        total = total + (allItems[i].productQuantity * allItems[i].productPrice);
      }
  this.allTotal = total;

}
removeProduct(product: Product) {
  this.productAddedToCart = this.productService.getProductFromCart();
this.productService.removeAllProductFromCart();
this.productService.addProductToCart(this.productAddedToCart);
this.calculateAllTotal(this.productAddedToCart);


  this.cartItemCount = this.productAddedToCart.length;

this.sharedServices.updateCartCount(this.cartItemCount);

}
}
