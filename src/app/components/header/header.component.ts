import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { DatabaseService, Product } from '../../services/database.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { SearchInputComponent } from '../search-input/search-input.component';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, MatIconModule, MatMenuModule, MatButtonModule, SearchInputComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);
  private db = inject(DatabaseService);
  private router = inject(Router);

  searchResults = signal<Product[]>([]);
  showResults = signal(false);

  onSearch(term: string) {
    if (term.length >= 2) {
      this.searchResults.set(this.db.searchProducts(term));
      this.showResults.set(true);
    } else {
      this.searchResults.set([]);
      this.showResults.set(false);
    }
  }

  onResultSelect(product: Product) {
    this.showResults.set(false);
    this.router.navigate(['/promocoes']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
