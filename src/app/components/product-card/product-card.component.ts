import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/database.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() variant: 'default' | 'promo' = 'default';
  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
