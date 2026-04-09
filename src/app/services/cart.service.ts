import { Injectable, signal, inject } from '@angular/core';
import { Product, CartItem } from '../models/product.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<CartItem[]>([]);
  cartCount = signal<number>(0);
  private toast = inject(ToastService);

  addToCart(product: Product) {
    const items = this.cartItems();
    const existing = items.find(item => item.product.id === product.id);
    
    if (existing) {
      this.toast.info(`${product.name} já está no carrinho! Altere a quantidade no carrinho.`, 'top');
      return;
    }
    
    this.cartItems.set([...items, { product, quantity: 1 }]);
    this.cartCount.update(count => count + 1);
    this.toast.success(`${product.name} adicionado ao carrinho`);
  }

  removeFromCart(productId: number) {
    const items = this.cartItems();
    const item = items.find(i => i.product.id === productId);
    
    if (item) {
      const name = item.product.name;
      const removed = item.quantity;
      
      this.cartItems.set(items.filter(i => i.product.id !== productId));
      this.cartCount.update(count => count - removed);
      this.toast.info(`${name} removido do carrinho`, 'top');
    }
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    
    const items = this.cartItems();
    const item = items.find(i => i.product.id === productId);
    
    if (item) {
      const diff = quantity - item.quantity;
      item.quantity = quantity;
      this.cartItems.set([...items]);
      this.cartCount.update(count => count + diff);
    }
  }
}
