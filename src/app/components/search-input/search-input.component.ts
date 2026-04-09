import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  @Input() placeholder = 'Buscar...';
  @Input() results: any[] = [];
  @Input() showResults = false;
  @Output() searchChange = new EventEmitter<string>();
  @Output() resultSelect = new EventEmitter<any>();

  searchTerm = signal('');

  onSearch() {
    this.searchChange.emit(this.searchTerm());
  }

  onSelect(item: any) {
    this.resultSelect.emit(item);
    this.searchTerm.set('');
  }
}
