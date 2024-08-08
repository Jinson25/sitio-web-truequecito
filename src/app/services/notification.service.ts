import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Notification } from '../shared/interfaces/notification.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([]);
  private notifications: Notification[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  formatNotificationMessage(message: string): string {
    switch (message) {
      case 'Propuesta de intercambio recibida':
        return 'Has recibido una nueva propuesta de intercambio';
      case 'El intercambio fue accepted':
        return 'Tu intercambio ha sido exitoso, Felicidades por tu nuevo producto';
      case 'El intercambio fue rejected':
        return 'Tu intercambio ha sido rechazado, se enviará de vuelta tu producto';
        case 'El intercambio fue pending':
          return 'El intercambio esta pendiente del pago'
      case 'El intercambio fue completed':
        return 'El intercambio ha sido completado, envia tu producto y cuando lo revisemos te vamos a notificar';
      default:
        return message;
    }
  }

  fetchNotifications(): void {
    const token = this.authService.getToken();
    if (!token) {
      console.error('Token no proporcionado');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Notification[]>('/api/notifications', { headers }).subscribe(
      (notifications) => {
        this.notifications = notifications.map(notification => ({
          ...notification,
          message: this.formatNotificationMessage(notification.message)
        }));
        this.notificationsSubject.next(this.notifications);
      },
      (error) => {
        console.error('Error fetching notifications', error);
      }
    );
  }

  getNotifications(): Observable<Notification[]> {
    return this.notificationsSubject.asObservable();
  }

  addNotification(notification: Notification): void {
    this.notifications.push(notification);
    this.notificationsSubject.next(this.notifications);
  }

  markAsRead(notificationId: string): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      console.error('Token no proporcionado');
      return of(null); // Retorna un Observable vacío en caso de no tener token
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`/api/notifications/${notificationId}/read`, {}, { headers });
  }

  getUnreadCount(): number {
    return this.notifications.filter(notification => !notification.read).length;
  }
}
