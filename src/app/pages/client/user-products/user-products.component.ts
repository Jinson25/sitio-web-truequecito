import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../shared/interfaces/product.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

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
        console.log('Productos del usuario recibidos:', products);
        this.userProducts = products;
      },
      error: (error) => {
        console.error('Error al cargar los productos del usuario:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar los productos del usuario.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  editProduct(productId: string): void {
    this.router.navigate(['/profile/edit-product', productId]);
  }

  deleteProduct(productId: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(productId).subscribe({
          next: () => {
            this.userProducts = this.userProducts.filter(product => product._id !== productId);
            Swal.fire({
              icon: 'success',
              title: 'Producto eliminado',
              text: 'El producto ha sido eliminado correctamente.',
              timer: 1500,
              showConfirmButton: false
            });
          },
          error: (error) => {
            console.error('Error al eliminar el producto:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al eliminar el producto.',
              timer: 1500,
              showConfirmButton: false
            });
          }
        });
      }
    });
  }
}
