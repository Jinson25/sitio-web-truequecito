import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExchangeService } from '../../services/exchange.service';
import { ProductService } from '../../services/product.service';
import { Product, Proposal } from '../../shared/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PaymentComponent implements OnInit {
  exchangeId: string | null = null;
  exchange: Proposal | null = null;
  productOffered: Product | undefined;
  productRequested: Product | undefined;
  uniqueCode: string | undefined;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private exchangeService: ExchangeService,
    private productService: ProductService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.exchangeId = this.route.snapshot.paramMap.get('exchangeId');
    
    if (this.exchangeId) {
      this.loadExchange(this.exchangeId);
    }
  }

  private loadExchange(exchangeId: string): void {
    this.exchangeService.getExchangeById(exchangeId).subscribe({
      next: (exchange: Proposal) => {
        this.exchange = exchange;
        this.uniqueCode = exchange.uniqueCode;
        this.loadProducts(exchange.productOffered._id, exchange.productRequested._id);
      },
      error: (error: any) => {
        console.error('Error fetching exchange:', error);
      }
    });
  }

  private loadProducts(productOfferedId: string, productRequestedId: string): void {
    this.productService.getProductById(productOfferedId).subscribe({
      next: (product: Product) => {
        this.productOffered = product;
      },
      error: (error: any) => {
        console.error('Error fetching offered product:', error);
      }
    });
    this.productService.getProductById(productRequestedId).subscribe({
      next: (product: Product) => {
        this.productRequested = product;
      },
      error: (error: any) => {
        console.error('Error fetching requested product:', error);
      }
    });
  }

  getImageSrc(images: string[] | undefined): string {
    return images && images.length > 0 ? images[0] : 'assets/default_image.jpg';
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  submitComprobante(): void {
    if (!this.selectedFile || !this.exchangeId) {
      console.error('No file selected or exchange ID is missing');
      return;
    }

    const formData = new FormData();
    formData.append('receipt', this.selectedFile);
    formData.append('exchangeId', this.exchangeId);
    formData.append('userType', 'offered'); // o 'requested' dependiendo del usuario

    this.exchangeService.uploadReceipt(formData).subscribe({
      next: (response) => {
        console.log('Comprobante enviado:', response);
        alert('Espera que el otro usuario haga el pago');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error al enviar el comprobante:', error);
      }
    });
  }

  finalizarTrueque(): void {
    if (this.exchangeId) {
      console.log('Finalizing exchange with ID:', this.exchangeId); // Agregar mensaje de consola
      this.exchangeService.updateExchangeStatus(this.exchangeId, 'accepted').subscribe({
        next: (response) => {
          console.log('Exchange finalized:', response); // Agregar mensaje de consola
          alert('Espera que el otro usuario haga el pago');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al finalizar el trueque:', error);
        }
      });
    }
  }

  cancelarTrueque(): void {
    console.log('Trueque cancelado');
    // Lógica para cancelar el trueque
  }

  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/default_image.jpg';
  }
}
