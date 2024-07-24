import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-propose-exchange-pages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './propose-exchange-pages.component.html',
  styleUrls: ['./propose-exchange-pages.component.css']
})
export class ProposeExchangePagesComponent implements OnInit {
  product: any;
  proposedExchangeProduct: any;
  userProducts: any[] = [];
  message: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(productId);
    }
    this.loadUserProducts();
  }

  loadProduct(productId: string): void {
    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (error: any) => {
        console.error('Error al cargar el producto:', error);
        this.message = 'Error al cargar el producto.';
      }
    });
  }

  loadUserProducts(): void {
    this.productService.getUserProducts().subscribe({
      next: (products) => {
        this.userProducts = products;
      },
      error: (error: any) => {
        console.error('Error al cargar los productos del usuario:', error);
        this.message = 'Error al cargar los productos del usuario.';
      }
    });
  }

  handleSubmit(form: NgForm): void {
    if (!this.proposedExchangeProduct || !this.product) {
      this.message = 'Selecciona los productos correctamente.';
      return;
    }

    if (form.valid) {
      const userRequested = this.product.user;

      const exchangeData = {
        productOffered: this.proposedExchangeProduct._id,
        productRequested: this.product._id,
        userRequested: userRequested
      };

      const token = this.authService.getToken();
      const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;

      this.http.post('/api/exchanges', exchangeData, { headers }).subscribe({
        next: () => {
          this.message = 'Propuesta de intercambio enviada correctamente.';
        },
        error: (error: any) => {
          console.error('Error al enviar la propuesta de intercambio:', error);
          this.message = 'Error al enviar la propuesta de intercambio.';
        }
      });
    }
  }
}
