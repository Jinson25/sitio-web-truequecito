import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../../services/exchange.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Proposal } from '../../shared/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import SwiperCore, { Pagination, Scrollbar, A11y } from 'swiper';
import { SwiperModule } from 'swiper/angular';
import { SwiperOptions } from 'swiper/types';

SwiperCore.use([Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-proposals-list',
  templateUrl: './proposals-list.component.html',
  styleUrls: ['./proposals-list.component.css'],
  standalone: true,
  imports: [CommonModule, SwiperModule]
})
export class ProposalsListComponent implements OnInit {
  exchangesReceived: Proposal[] = [];
  exchangesSent: Proposal[] = [];
  currentUser: any;

  configReceived: SwiperOptions = {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  configSent: SwiperOptions = {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 1,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  constructor(
    private exchangeService: ExchangeService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    if (this.currentUser) {
      this.loadReceivedExchanges();
      this.loadSentExchanges();
    } else {
      console.error('Usuario no autenticado');
    }
  }

  loadReceivedExchanges(): void {
    this.exchangeService.getReceivedExchanges().subscribe({
      next: (exchanges: Proposal[]) => {
        this.exchangesReceived = exchanges.map((exchange: Proposal) => {
          const updatedExchange = {
            ...exchange,
            userType: 'offered'
          };

          // Agregar notificación
          this.notificationService.addNotification({
            id: exchange._id,
            message: `Propuesta de intercambio recibida para ${exchange.productRequested.title}`,
            timestamp: new Date(),
            read: false
          });

          return updatedExchange;
        });

        this.updateSwiperConfig();
      },
      error: (error) => {
        console.error('Error al cargar los intercambios recibidos:', error);
      }
    });
  }

  loadSentExchanges(): void {
    this.exchangeService.getSentExchanges().subscribe({
      next: (exchanges: Proposal[]) => {
        this.exchangesSent = exchanges.map((exchange: Proposal) => {
          const updatedExchange = {
            ...exchange,
            userType: 'requested'
          };

          return updatedExchange;
        });

        this.updateSwiperConfig();
      },
      error: (error) => {
        console.error('Error al cargar los intercambios enviados:', error);
      }
    });
  }

  updateSwiperConfig(): void {
    this.configReceived.loop = this.exchangesReceived.length > 1;
    this.configSent.loop = this.exchangesSent.length > 1;
  }

  navigateToProduct(productId: string, exchangeId: string): void {
    this.router.navigate(['/product', productId, exchangeId]);
  }

  navigateToPayment(exchangeId: string): void {
    this.router.navigate(['/payment', exchangeId]);
  }

  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/default_image.jpg';
  }

  acceptExchange(exchangeId: string, productId: string): void {
    this.exchangeService.updateExchangeStatus(exchangeId, 'accepted').subscribe({
      next: (response) => {
        this.loadReceivedExchanges();
        this.router.navigate(['/product', productId, exchangeId]);
      },
      error: (error) => {
        console.error('Error al aceptar el intercambio:', error);
      }
    });
  }

  rejectExchange(exchangeId: string): void {
    this.exchangeService.updateExchangeStatus(exchangeId, 'rejected').subscribe({
      next: (response) => {
        this.loadReceivedExchanges();
      },
      error: (error) => {
        console.error('Error al rechazar el intercambio:', error);
      }
    });
  }
}
