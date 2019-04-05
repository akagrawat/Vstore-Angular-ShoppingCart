import { Injectable } from '@angular/core';
import { Product } from '../shared/product';
import { PRODUCT } from '../shared/products';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  userLoggedIn: boolean;


  constructor(private authService: AuthService,
              private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              ) {

   }

  getProducts(): Product[] {
  return PRODUCT;
  }
  getProduct(id: number): Product {
    return PRODUCT.filter((product) => (product.id === id))[0];
  }
  getProductFromCart() {
  // return localStoreage.getItem('product');
      return JSON.parse(localStorage.getItem('product'));
    }


  addProductToCart(products: any) {
   /* this.authService.getLoggedInUser().subscribe ( user => {
      if ( user) {*/
        /*this.db.list('users').update('cartProducts', products);
        localStorage.removeItem('product');*/
        localStorage.setItem('product', JSON.stringify(products));

      /*} else {
        localStorage.setItem('product', JSON.stringify(products));
      }

    });*/
  }
  removeAllProductFromCart() {
    return localStorage.removeItem('product');
  }

}
