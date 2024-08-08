import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ExchangeService } from '../../services/exchange.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  exchangeId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private exchangeService: ExchangeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.exchangeId = this.route.snapshot.paramMap.get('exchangeId');
    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (product) => {
          this.product = product;
        },
        error: (error) => {
          console.error('Error fetching product:', error);
        }
      });
    }
  }

  acceptOffer(): void {
    if (this.exchangeId) {
      // Redirigir a la página de pago sin actualizar el estado de la oferta
      this.router.navigate(['/payment', this.exchangeId]);
    }
  }

  rejectOffer(): void {
    if (this.exchangeId) {
      this.exchangeService.updateExchangeStatus(this.exchangeId, 'rejected').subscribe({
        next: (response) => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al rechazar la oferta:', error);
        }
      });
    }
  }

  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/default_image.jpg';
  }
}
