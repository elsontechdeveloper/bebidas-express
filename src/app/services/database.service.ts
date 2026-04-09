import { Injectable, signal, computed } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  image: string;
  description?: string;
  inStock: boolean;
  isPromo?: boolean;
  promoEnds?: string;
  isFlashSale?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private productsSignal = signal<Product[]>([
    { id: 1, name: 'Skol Pilsen 600ml', price: 4.99, originalPrice: 6.10, discount: 18, category: 'cervejas', image: './assets/imaages/skol.png', inStock: true, isPromo: true, promoEnds: '2026-04-15' },
    { id: 2, name: 'Heineken 600ml', price: 6.99, originalPrice: 8.50, discount: 18, category: 'cervejas', image: './assets/imaages/heineken.png', inStock: true, isPromo: true },
    { id: 3, name: 'Stella Artois 600ml', price: 6.49, originalPrice: 8.10, discount: 20, category: 'cervejas', image: './assets/imaages/stella.png', inStock: true, isPromo: true },
    { id: 4, name: 'Brahma Duplo Malte 600ml', price: 4.49, originalPrice: 5.50, discount: 18, category: 'cervejas', image: './assets/imaages/skol.png', inStock: true, isPromo: true },
    { id: 5, name: 'Skol Beats 350ml', price: 5.99, originalPrice: 7.50, discount: 20, category: 'cervejas', image: './assets/imaages/skol.png', inStock: true, isPromo: true },
    { id: 6, name: 'Brahma Lager 350ml', price: 3.99, originalPrice: 4.50, discount: 11, category: 'cervejas', image: './assets/imaages/skol.png', inStock: true },
    { id: 7, name: 'Red Bull 250ml', price: 7.99, originalPrice: 10.00, discount: 20, category: 'energeticos', image: './assets/imaages/redbull.png', inStock: true, isPromo: true },
    { id: 8, name: 'Red Bull Pack 6x250ml', price: 39.90, originalPrice: 60.00, discount: 33, category: 'energeticos', image: './assets/imaages/redbull.png', inStock: true, isPromo: true, isFlashSale: true },
    { id: 9, name: 'Monster Energy 473ml', price: 6.49, originalPrice: 8.50, discount: 24, category: 'energeticos', image: './assets/imaages/redbull.png', inStock: true, isPromo: true },
    { id: 10, name: 'V energia 250ml', price: 5.49, originalPrice: 6.50, discount: 15, category: 'energeticos', image: './assets/imaages/redbull.png', inStock: true },
    { id: 11, name: 'Vodka Skyy 750ml', price: 45.90, originalPrice: 79.90, discount: 42, category: 'destilados', image: './assets/imaages/heineken.png', inStock: true, isPromo: true },
    { id: 12, name: 'Whisky Johnnie Walker Red 750ml', price: 89.90, originalPrice: 149.90, discount: 40, category: 'destilados', image: './assets/imaages/heineken.png', inStock: true, isPromo: true },
    { id: 13, name: 'Gin Bombay 750ml', price: 99.90, originalPrice: 140.00, discount: 29, category: 'destilados', image: './assets/imaages/heineken.png', inStock: true, isPromo: true },
    { id: 14, name: 'Tequila José Cuervo 750ml', price: 69.90, originalPrice: 99.90, discount: 30, category: 'destilados', image: './assets/imaages/heineken.png', inStock: true },
    { id: 15, name: 'Água Mineral 500ml', price: 1.50, originalPrice: 2.00, discount: 25, category: 'aguas', image: './assets/imaages/agua-mineral.png', inStock: true },
    { id: 16, name: 'Água de Coco 1L', price: 4.99, originalPrice: 6.50, discount: 23, category: 'aguas', image: './assets/imaages/agua-mineral.png', inStock: true },
    { id: 17, name: 'Suco laranja 1L', price: 6.90, originalPrice: 8.90, discount: 22, category: 'sucos', image: './assets/imaages/agua-mineral.png', inStock: true },
    { id: 18, name: 'Carvão 5kg', price: 16.90, originalPrice: 25.00, discount: 32, category: 'gelo-carvao', image: './assets/imaages/carvao.png', inStock: true, isPromo: true },
    { id: 19, name: 'Gelo 5kg', price: 5.00, originalPrice: 8.00, discount: 37, category: 'gelo-carvao', image: './assets/imaages/carvao.png', inStock: true, isPromo: true },
    { id: 20, name: 'Carvão 3kg', price: 12.90, originalPrice: 18.00, discount: 28, category: 'gelo-carvao', image: './assets/imaages/carvao.png', inStock: true },
    { id: 21, name: 'Combo Churrasco Premium', price: 89.90, originalPrice: 150.00, discount: 40, category: 'combos', image: './assets/imaages/carvao.png', inStock: true, isPromo: true, isFlashSale: true },
    { id: 22, name: 'Combo Petisco + Cerveja', price: 34.90, originalPrice: 55.00, discount: 36, category: 'combos', image: './assets/imaages/carvao.png', inStock: true, isPromo: true },
    { id: 23, name: 'Combo Festa', price: 149.90, originalPrice: 220.00, discount: 32, category: 'combos', image: './assets/imaages/carvao.png', inStock: true },
    { id: 24, name: 'Cerveja Artesanal 600ml', price: 12.90, originalPrice: 16.00, discount: 19, category: 'cervejas', image: './assets/imaages/heineken.png', inStock: true }
  ]);

  private categoriesSignal = signal<Category[]>([
    { id: 'todas', name: 'Todas', icon: 'fa-th' },
    { id: 'cervejas', name: 'Cervejas', icon: 'fa-beer' },
    { id: 'destilados', name: 'Destilados', icon: 'fa-wine-bottle' },
    { id: 'energeticos', name: 'Energéticos', icon: 'fa-bolt' },
    { id: 'aguas', name: 'Águas', icon: 'fa-tint' },
    { id: 'sucos', name: 'Sucos', icon: 'fa-glass-whiskey' },
    { id: 'gelo-carvao', name: 'Gelo e Carvão', icon: 'fa-cube' },
    { id: 'combos', name: 'Combos', icon: 'fa-box-open' }
  ]);

  products = this.productsSignal.asReadonly();
  categories = this.categoriesSignal.asReadonly();

  getProductById(id: number): Product | undefined {
    return this.productsSignal().find(p => p.id === id);
  }

  getProductsByCategory(category: string): Product[] {
    if (category === 'todas') return this.productsSignal();
    return this.productsSignal().filter(p => p.category === category);
  }

  getPromoProducts(): Product[] {
    return this.productsSignal().filter(p => p.isPromo);
  }

  searchProducts(term: string): Product[] {
    if (!term.trim()) return [];
    const lowerTerm = term.toLowerCase();
    return this.productsSignal().filter(p => 
      p.name.toLowerCase().includes(lowerTerm) ||
      p.category.toLowerCase().includes(lowerTerm)
    );
  }
}
