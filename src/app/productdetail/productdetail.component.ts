import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Product } from '../shared/product';
import { PRODUCT } from '../shared/products';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../services/product.service';
import { IAlert } from '../shared/IAlert';
import { SharedService } from '../services/shared.service';
@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent implements OnInit {
  product: Product;
  public alerts: Array<IAlert> = [];
  cartItemCount = 0;
  productAddedToCart: Product[];

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private location: Location,
              private sharedService: SharedService) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.product = this.productService.getProduct(id);

  }

  addToCart(product:  Product) {
    console.log(product);
    this.productAddedToCart = this.productService.getProductFromCart();

    if (this.productAddedToCart == null) {
      this.productAddedToCart = [];
      this.productAddedToCart.push(product);
      this.productService.addProductToCart(this.productAddedToCart);
      this.alerts.push({
        id: 1,
        type: 'sucess',
        message: 'Product added to cart'
      });
      setTimeout(() => {
        this.closeAlert(this.alerts);
      }, 3000);
  } else {
    const tempProduct = this.productAddedToCart.find(p => p.id === product.id);
    if (tempProduct == null) {
      this.productAddedToCart.push(product);
      this.productService.addProductToCart(this.productAddedToCart);
      this.alerts.push({
        id: 1,
        type: 'sucess',
        message: 'Product added to cart'
      });
      setTimeout(() => {
        this.closeAlert(this.alerts);
      }, 3000);
    } else {
    this.alerts.push({
      id: 2,
      type: 'warning',
      message: 'Product Already Exist in Cart',
    });
    setTimeout(() => {
      this.closeAlert(this.alerts);
    }, 3000);
    }
    this.cartItemCount = this.productAddedToCart.length;
    this.sharedService.updateCartCount(this.cartItemCount);

}
  }

 goBack(): void {
   this.location.back();
 }

 public closeAlert(alert: any) {
   const index: number = this.alerts.indexOf(alert);
   this.alerts.splice(index, 1);
 }

}
