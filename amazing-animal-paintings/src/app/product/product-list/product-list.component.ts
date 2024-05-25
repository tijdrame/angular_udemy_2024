import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filterdProduct: Product[] = [];
  sortOrder: string = '';
  constructor(
    private service: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.service.getProducts().subscribe((data) => {
      this.products = data;
      this.filterdProduct = data;
    });
  }
  addToCart(product: Product): void {
    this.cartService.addTocart(product).subscribe({
      next: () => {
        this.snackBar.open('Product added to cart!', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }
  applyFilter(event: Event): void {
    let searchterm = (event.target as HTMLInputElement).value;
    searchterm = searchterm.toLowerCase();
    this.filterdProduct = this.products.filter((product) =>
      product.name.toLowerCase().includes(searchterm)
    );
    this.sortProducts(this.sortOrder);
  }
  sortProducts(sortvalue: string) {
    this.sortOrder = sortvalue;
    if (this.sortOrder === 'priceLowHigh') {
      this.filterdProduct.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'priceHighLow') {
      this.filterdProduct.sort((a, b) => b.price - a.price);
    }
  }
}
