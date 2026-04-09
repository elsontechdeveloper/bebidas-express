import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { Category } from '../../services/database.service';
import { SearchInputComponent } from '../search-input/search-input.component';

@Component({
  selector: 'app-promo-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule, MatFormFieldModule, MatOptionModule, SearchInputComponent],
  templateUrl: './promo-filters.component.html',
  styleUrls: ['./promo-filters.component.scss']
})
export class PromoFiltersComponent {
  @Input() categories: Category[] = [];
  @Input() productCount = 0;
  @Input() totalSavings = 0;
  @Output() categoryChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();

  selectedCategory = signal('todas');
  sortBy = signal('discount');

  sortOptions = [
    { value: 'discount', label: 'Maior desconto' },
    { value: 'price-low', label: 'Menor preço' },
    { value: 'price-high', label: 'Maior preço' }
  ];

  onCategoryClick(catId: string) {
    this.selectedCategory.set(catId);
    this.categoryChange.emit(catId);
  }

  onSortChange(value: string) {
    this.sortBy.set(value);
    this.sortChange.emit(value);
  }

  onSearchChange(term: string) {
    this.searchChange.emit(term);
  }
}
