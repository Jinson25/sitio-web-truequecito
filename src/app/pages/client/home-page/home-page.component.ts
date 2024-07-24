import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../../../services/exchange.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../../../components/product-list/product-list.component';
import { ProfileInfoCardComponent } from '../../../components/profile-info-card/profile-info-card.component';
import { ProposalsListComponent } from '../../../components/proposals-list/proposals-list.component'; // Importar el componente de propuestas

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ProductListComponent, ProfileInfoCardComponent, ProposalsListComponent], // Agregar ProposalsListComponent a los imports
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  exchangesReceived: any[] = [];
  exchangesSent: any[] = [];
  currentUser: any;

  constructor(private exchangeService: ExchangeService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    if (this.currentUser) {
      this.loadReceivedExchanges();
      this.loadSentExchanges();
    } else {
    }
  }

  loadReceivedExchanges(): void {
    this.exchangeService.getReceivedExchanges().subscribe({
      next: (exchanges) => {
        this.exchangesReceived = exchanges;
      },
      error: (error) => {
        console.error('Error al cargar los intercambios recibidos:', error);
      }
    });
  }

  loadSentExchanges(): void {
    this.exchangeService.getSentExchanges().subscribe({
      next: (exchanges) => {
        this.exchangesSent = exchanges;
      },
      error: (error) => {
        console.error('Error al cargar los intercambios enviados:', error);
      }
    });
  }

  navigateToProduct(productId: string): void {
    this.router.navigate(['/product', productId]);
  }

  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = '../../../../assets/default_image.jpg';
  }
}
