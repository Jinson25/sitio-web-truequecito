import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../../shared/interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  searchQuery: string = '';

  @Output() searchQueryChange: EventEmitter<string> = new EventEmitter<string>();

  onSearchQueryChange(): void {
    this.searchQueryChange.emit(this.searchQuery.trim());
  }

  search(): void {
    this.onSearchQueryChange();
  }
}