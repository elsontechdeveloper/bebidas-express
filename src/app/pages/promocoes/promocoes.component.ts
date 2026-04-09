import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService, Product, Category } from '../../services/database.service';
import { CartService } from '../../services/cart.service';
import { PromoFiltersComponent } from '../../components/promo-filters/promo-filters.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-promocoes',
  standalone: true,
  imports: [CommonModule, PromoFiltersComponent, ProductCardComponent],
  templateUrl: './promocoes.component.html',
  styleUrl: './promocoes.component.scss'
})
export class PromocoesComponent implements OnInit {
  private db = inject(DatabaseService);
  private cartService = inject(CartService);

  selectedCategory = signal('todas');
  sortBy = signal('discount');
  searchTerm = signal('');

  categories: Category[] = [];
  allProducts: Product[] = [];

  ngOnInit() {
    this.categories = [
      { id: 'todas', name: 'Todas', icon: 'fa-th' },
      ...this.db.categories().filter(c => c.id !== 'todas')
    ];
    this.allProducts = this.db.products();
  }

  filteredProducts = computed(() => {
    let result = this.allProducts;

    if (this.selectedCategory() !== 'todas') {
      result = result.filter(p => p.category === this.selectedCategory());
    }

    result = result.filter(p => p.isPromo);

    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(term));
    }

    switch (this.sortBy()) {
      case 'discount':
        return result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      case 'price-low':
        return result.sort((a, b) => a.price - b.price);
      case 'price-high':
        return result.sort((a, b) => b.price - a.price);
      default:
        return result;
    }
  });

  totalSavings = computed(() => {
    return this.allProducts
      .filter(p => p.isPromo)
      .reduce((sum, p) => sum + ((p.originalPrice || 0) - p.price), 0);
  });

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  onCategoryChange(categoryId: string) {
    this.selectedCategory.set(categoryId);
  }

  onSortChange(sort: string) {
    this.sortBy.set(sort);
  }

  onSearchChange(search: string) {
    this.searchTerm.set(search);
  }
}
