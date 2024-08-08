import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeService } from '../../../services/exchange.service';
import { AuthService } from '../../../services/auth.service';
import { Exchange } from '../../../shared/interfaces/exchange.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-intercambios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-intercambios.component.html',
  styleUrls: ['./gestion-intercambios.component.css']
})
export class GestionIntercambiosComponent implements OnInit {
  exchanges: Exchange[] = [];
  error: string | null = null;
  currentUserId: string | undefined;
  selectedReceiptUrl: string | null = null;

  constructor(
    private exchangeService: ExchangeService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getUser();
    console.log('Current user:', currentUser);

    if (currentUser && currentUser.id) {
      this.currentUserId = currentUser.id;
      console.log('Current user ID:', this.currentUserId);
    } else {
      console.log('Usuario no autenticado o ID no encontrado');
    }
    this.loadCompletedExchanges();
  }

  loadCompletedExchanges(): void {
    this.exchangeService.getCompletedExchanges().subscribe({
      next: (data) => {
        console.log('Completed exchanges fetched:', data);
        this.exchanges = data.filter(exchange => exchange.status === 'completed');
        console.log('Filtered exchanges:', this.exchanges);
        this.error = null;
      },
      error: (error) => {
        console.error('Error fetching completed exchanges:', error);
        this.error = 'Failed to load completed exchanges. Please try again later.';
      }
    });
  }

  cancelExchange(exchangeId: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cancelar intercambio'
    }).then((result) => {
      if (result.isConfirmed) {
        this.exchangeService.cancelExchange(exchangeId).subscribe({
          next: (response) => {
            console.log('Exchange cancelled:', response.exchange);
            this.exchanges = this.exchanges.filter(exchange => exchange._id !== exchangeId);
            Swal.fire(
              'Cancelado!',
              'El intercambio ha sido cancelado.',
              'success'
            );
          },
          error: (error: any) => {
            console.error('Error cancelando el intercambio:', error);
            Swal.fire(
              'Error!',
              'Hubo un problema al cancelar el intercambio. Por favor, intenta nuevamente.',
              'error'
            );
          }
        });
      }
    });
  }

  acceptExchange(exchangeId: string): void {
    console.log('Accepting exchange with ID:', exchangeId); // Log para verificar el exchangeId
    this.exchangeService.acceptExchange(exchangeId).subscribe({
      next: (response) => {
        console.log('Exchange accepted:', response.exchange);
        Swal.fire(
          'Intercambio Completado!',
          'El intercambio ha sido completado.',
          'success'
        );
        this.exchanges = this.exchanges.filter(exchange => exchange._id !== exchangeId);
        console.log('Updated exchanges after acceptance:', this.exchanges);
      },
      error: (error: any) => {
        console.error('Error al aceptar el intercambio:', error);
        Swal.fire(
          'Error!',
          'Hubo un problema al aceptar el intercambio. Por favor, intenta nuevamente.',
          'error'
        );
      }
    });
  }
  

  viewReceipt(receiptUrl: string): void {
    const baseUrl = 'http://localhost:5000/uploads/'; // Cambia esto según tu configuración del servidor
    this.selectedReceiptUrl = `${baseUrl}${receiptUrl.replace(/^uploads[\\/]/, '')}`;
    console.log('Mostrando el comprobante:', this.selectedReceiptUrl);

    if (!this.selectedReceiptUrl) {
      console.error('No se pudo cargar el comprobante:', receiptUrl);
    }
  }

  closeReceiptModal(): void {
    console.log('Cerrando el modal del comprobante');
    this.selectedReceiptUrl = null;
  }
}
