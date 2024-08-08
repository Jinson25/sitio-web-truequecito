import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../shared/interfaces/notification.interface';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  standalone: true,
  imports: [CommonModule, NgClass, DatePipe],
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe((notifications) => {
      this.notifications = notifications;
      console.log('Notificaciones cargadas:', notifications);
    });
  }

  markAsRead(notificationId: string): void {
    console.log('Marcando como leído el ID:', notificationId);
    this.notificationService.markAsRead(notificationId).subscribe(() => {
      this.notifications = this.notifications.map(notification => {
        if (notification.id === notificationId) {
          return { ...notification, read: true };
        }
        return notification;
      });
    });
  }
}
