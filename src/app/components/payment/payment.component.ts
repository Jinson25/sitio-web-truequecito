import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExchangeService } from '../../services/exchange.service';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Product, Proposal } from '../../shared/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PaymentComponent implements OnInit {
  exchangeId: string | null = null;
  exchange: Proposal | null = null;
  productOffered: Product | undefined;
  productRequested: Product | undefined;
  uniqueCode: string | undefined;
  selectedFile: File | null = null;
  userType: string = '';
  userAddress: string = '';
  phone: string = '';

  constructor(
    private route: ActivatedRoute,
    private exchangeService: ExchangeService,
    private productService: ProductService,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
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
        this.userType = exchange.userType || '';
        this.loadProducts(exchange.productOffered._id, exchange.productRequested._id);

        const currentUser = this.authService.getUser();
        if (currentUser) {
          this.userAddress = currentUser.address || '';
        } else {
          console.error('No authenticated user found or address not available');
        }
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
    if (!this.selectedFile || !this.exchangeId || !this.isValidPhoneNumber()) {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'No se seleccionó ningún archivo o el número de teléfono es inválido.',
        timer: 1500,
        showConfirmButton: false
      });
      return;
    }
  
    const formData = new FormData();
    formData.append('receipt', this.selectedFile);
    formData.append('exchangeId', this.exchangeId);
    formData.append('userType', this.userType);
    formData.append('address', this.userAddress);
    formData.append('phoneNumber', this.phone);
  
    this.exchangeService.uploadReceipt(formData).subscribe({
      next: (response) => {
        if (response.exchange.status === 'completed') {
          Swal.fire({
            icon: 'success',
            title: 'Intercambio completado',
            text: 'Ambos comprobantes han sido subidos. El intercambio está pendiente de revisión por el administrador.',
            timer: 3500,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/']);
          });
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Comprobante enviado',
            text: 'Comprobante enviado exitosamente, le hemos notificado al usuario para que realice su pago.',
            timer: 4500,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/']);
          });
        }
      },
      error: (error) => {
        console.error('Error al enviar el comprobante:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al enviar el comprobante.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }
  

  isValidPhoneNumber(): boolean {
    return this.phone.length === 10 && /^\d+$/.test(this.phone);
  }

  updateExchangeStatusToAccepted(): void {
    if (this.exchangeId) {
      this.exchangeService.updateExchangeStatus(this.exchangeId, 'accepted').subscribe({
        next: (response) => {
        },
        error: (error) => {
          console.error('Error al aceptar la oferta:', error);
        }
      });
    }
  }

  verifyAndCompleteExchange(): void {
    if (this.exchange) {
      const otherReceipt = this.userType === 'offered' ? this.exchange.receiptRequested : this.exchange.receiptOffered;

      if (otherReceipt) {
        this.exchangeService.updateExchangeStatus(this.exchange._id, 'completed').subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Intercambio completado',
              text: 'Ambos comprobantes han sido subidos. El intercambio está pendiente de revisión por el administrador.',
              timer: 3500,
              showConfirmButton: false
            }).then(() => {
              this.router.navigate(['/']);
            });
          },
          error: (error) => {
            console.error('Error al completar el trueque:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al completar el trueque.',
              timer: 1500,
              showConfirmButton: false
            });
          }
        });
      } else {
        const otherUserType = this.userType === 'offered' ? 'requested' : 'offered';
        Swal.fire({
          icon: 'info',
          title: 'Comprobante enviado',
          text: `Comprobante enviado exitosamente, le hemos notificado al usuario para que realice su pago.`,
          timer: 4500,
          showConfirmButton: false
        });
      }
    }
  }

  shouldShowPaymentButton(): boolean {
    return this.exchange ? this.exchange.status !== 'completed' : false;
  }

  cancelarTrueque(): void {
    console.log('Trueque cancelado');
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event): void {
    if (this.exchangeId) {
      this.exchangeService.setExchangeStatusPending(this.exchangeId).subscribe({
        next: (response) => {
        },
        error: (error) => {
          console.error('Error al actualizar el estado del intercambio:', error);
        }
      });
    }
  }

  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/default_image.jpg';
  }
}
