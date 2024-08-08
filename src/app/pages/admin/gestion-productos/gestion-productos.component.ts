import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreatProductPagesComponent } from '../../client/creat-product-pages/creat-product-pages.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, CreatProductPagesComponent],
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {
  products: any[] = [];
  selectedProduct: any = null;
  newProduct: any = {};
  view: 'list' | 'create' | 'edit' = 'list'; // Controla la vista actual
  noProducts: boolean = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.adminService.getAllProducts().subscribe(
      (data: any) => {
        this.products = data;
        console.log('Productos cargados:', this.products); // Línea de depuración
      },
      (error) => {
        console.error('Error cargando productos', error);
      },
      () => {
        if (this.products.length === 0) {
          console.log('No hay productos disponibles');
          this.noProducts = true; // Establece la bandera a true si no hay productos
        } else {
          this.noProducts = false; // Establece la bandera a false si hay productos
        }
      }
    );
  }

  startEditProduct(product: any): void {
    this.selectedProduct = { ...product };
    console.log('Producto seleccionado para editar:', this.selectedProduct); // Línea de depuración
    this.view = 'edit';
  }

  saveEditProduct(): void {
    if (this.selectedProduct && this.selectedProduct._id) {
      this.adminService.editProduct(this.selectedProduct._id, this.selectedProduct).subscribe(
        () => {
          this.loadProducts();
          this.selectedProduct = null;
          this.view = 'list';
          Swal.fire({
            icon: 'success',
            title: 'Producto guardado',
            text: 'El producto se ha guardado correctamente.',
          });
        },
        (error) => {
          console.error('Error editando producto', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al guardar',
            text: 'Hubo un error al guardar el producto.',
          });
        }
      );
    } else {
      console.error('ID del producto no está definido', this.selectedProduct); // Línea de depuración
    }
  }

  cancelEdit(): void {
    this.selectedProduct = null;
    this.view = 'list';
  }

  deleteProduct(id: string): void {
    if (id) {
      this.adminService.deleteProduct(id).subscribe(
        () => {
          this.loadProducts();
          Swal.fire({
            icon: 'success',
            title: 'Producto eliminado',
            text: 'El producto se ha eliminado correctamente.',
          });
        },
        (error) => {
          console.error('Error eliminando producto', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al eliminar',
            text: 'Hubo un error al eliminar el producto.',
          });
        }
      );
    } else {
      console.error('ID del producto no está definido', id); // Línea de depuración
    }
  }

  toggleView(view: 'list' | 'create'): void {
    this.view = view;
  }
}
