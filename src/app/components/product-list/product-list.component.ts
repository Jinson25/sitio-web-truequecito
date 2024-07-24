import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading: boolean = true;
  error: string = '';
  currentUserId: string | undefined;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getUser();

    if (currentUser && currentUser.id) {
      this.currentUserId = currentUser.id;
    } else {
      console.log('Usuario no autenticado o ID no encontrado'); 
    }

    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.filter(product => product.user && product.user._id !== this.currentUserId);
        this.filteredProducts = [...this.products]; // Inicialmente, muestra todos los productos
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
        this.error = 'No se pudieron obtener los productos. Inténtalo de nuevo más tarde.';
        this.loading = false;
      }
    });
  }

  applyFilter(searchQuery: string): void {
    if (!searchQuery.trim()) {
      this.filteredProducts = [...this.products]; // Mostrar todos los productos si la búsqueda está vacía
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }

  proposeExchange(productId: string): void {
    this.router.navigate(['/propose-exchange', productId]);
  }

  shouldAnimateTitle(title: string): boolean {
    const maxLength = 19;
    return title.length > maxLength;
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/default_image.jpg';  // Ruta a la imagen por defecto
    console.log('Error de imagen, cargando imagen por defecto');
  }
}