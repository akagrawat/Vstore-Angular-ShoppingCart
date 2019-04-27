import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {

  products: Product[];
  product: any[];
  brand: string;
  brands = ['Apple', 'Realme', 'Nokia', 'LG', 'Vivo', 'Oppo'];

  constructor( private productService: ProductService) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  filterByBrand( selectedBrand ) {
    this.brand = selectedBrand;
    console.log(this.brand);
  }



}
