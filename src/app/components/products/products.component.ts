import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DatabaseService, Product } from '../../services/database.service';
import { CartService } from '../../services/cart.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private db = inject(DatabaseService);
  private cartService = inject(CartService);

  products: Product[] = this.db.products().slice(0, 6);

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
