import { PipeTransform, Pipe } from '@angular/core';
import { Product } from '../shared/product';
@Pipe({
    name: 'mobileFilter'
})

export class MobileFilterPipe implements PipeTransform {
    transform(products: Product[], brand: string): Product[] {
        if (!products || !brand) {
            return products;
        }
        return products.filter( product => product.productBrand.toLocaleLowerCase().indexOf(brand.toLowerCase()) !== -1);

    }
}
