import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../shared/interfaces/product.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class UserProductsComponent implements OnInit {
  userProducts: Product[] = [];
  message: string = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserProducts();
  }

  loadUserProducts(): void {
    this.productService.getUserProducts().subscribe({
      next: (products) => {
        this.userProducts = products;
      },
      error: (error) => {
        console.error('Error al cargar los productos del usuario:', error);
        this.message = 'Error al cargar los productos del usuario.';
      }
    });
  }

  editProduct(productId: string): void {
    this.router.navigate(['/profile/edit-product', productId]);
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.userProducts = this.userProducts.filter(product => product._id !== productId);
      },
      error: (error) => {
        console.error('Error al eliminar el producto:', error);
        this.message = 'Error al eliminar el producto.';
      }
    });
  }
}
