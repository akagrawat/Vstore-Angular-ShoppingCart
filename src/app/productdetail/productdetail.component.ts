import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product';
import { PRODUCT } from '../shared/products';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent implements OnInit {
  product: Product;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.product = this.productService.getProduct(id);

  }
 goBack(): void {
   this.location.back();
 }
}
