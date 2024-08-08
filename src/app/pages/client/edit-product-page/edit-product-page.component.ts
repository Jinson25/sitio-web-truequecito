import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../shared/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product-page',
  templateUrl: './edit-product-page.component.html',
  styleUrls: ['./edit-product-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class EditProductPageComponent implements OnInit {
  product: Product | null = null;
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(productId);
    }
  }

  loadProduct(productId: string): void {
    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (error) => {
        console.error('Error al cargar el producto:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar el producto.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  saveProduct(): void {
    if (this.product) {
      this.productService.editProduct(this.product._id, this.product).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Producto guardado',
            text: 'El producto ha sido guardado correctamente.',
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/profile/products']);
          });
        },
        error: (error) => {
          console.error('Error al guardar el producto:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al guardar el producto.',
            timer: 1500,
            showConfirmButton: false
          });
        }
      });
    }
  }
}
