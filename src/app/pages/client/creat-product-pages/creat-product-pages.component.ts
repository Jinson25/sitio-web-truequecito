import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-creat-product-pages',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './creat-product-pages.component.html',
  styleUrls: ['./creat-product-pages.component.css']
})
export class CreatProductPagesComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      estado:['', Validators.required],
      preference:['', Validators.required],
      images: [''],
    });
  }
  mostrarOcultarInput() {
    const select = document.getElementById('preference') as HTMLSelectElement;
    const input = document.getElementById('otra') as HTMLInputElement;

    if (select.value === 'otra') {
      input.style.display = 'block';
    } else {
      input.style.display = 'none';
    }
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    const { title, description, images, estado, preference } = this.productForm.value;
    const imageArray = images ? images.split(',').map((url: string) => url.trim()) : [];

    const productData = { title, description, images: imageArray, estado, preference };

    const token = this.authService.getToken(); // Usa el servicio para obtener el token

    if (!token) {
      console.error('No se encontró el token');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post('/api/products', productData, { headers }).subscribe(
      response => {
        console.log('Producto agregado:', response);
        this.router.navigate(['/']); // Redirigir a la página principal o a la página de productos
      },
      error => {
        console.error('Error al agregar el producto:', error);
      }
    );
  }
}
