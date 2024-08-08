import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/interfaces/auth.interfaces';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions } from 'swiper';
import { SwiperModule } from 'swiper/angular';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css'],
  standalone: true,
  imports: [CommonModule, SwiperModule],
})
export class PublicProfileComponent implements OnInit, OnChanges {
  @Input() userId!: string;
  user: User = {
    id: '',
    username: '',
    email: '',
    token: '',
    role: '',
    following: [],
    followers: [],
    likes: [],
    products: [],
    name: '',
    location: '',
    address: '',
    phone: ''
  };
  loading: boolean = true;
  error: string = '';
  isFollowing: boolean = false;
  hasLiked: boolean = false;
  currentUserId: string = ''; // ID del usuario actual

  config: SwiperOptions = {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getUser()?.id || ''; // Obtener el ID del usuario actual desde el servicio de autenticación
    console.log('ID del usuario actual:', this.currentUserId);
  }

  ngOnChanges(): void {
    if (this.userId) {
      this.resetState();
      this.loadUserProfile();
    }
  }

  resetState(): void {
    this.loading = true;
    this.error = '';
    this.isFollowing = false;
    this.hasLiked = false;
  }

  loadUserProfile(): void {
    console.log('Cargando perfil para userId:', this.userId);
    this.userService.getUserById(this.userId).subscribe({
      next: (data) => {
        console.log('Datos del usuario recibidos:', data);
        this.user = data.user;
        // Verificar que cada producto tenga imágenes definidas
        this.user.products?.forEach(product => {
          if (!product.images) {
            product.images = [];
          }
        });
        this.isFollowing = Array.isArray(this.user.followers) ? this.user.followers.includes(this.currentUserId) : false;
        this.hasLiked = Array.isArray(this.user.likes) ? this.user.likes.includes(this.currentUserId) : false;
        console.log('isFollowing:', this.isFollowing);
        console.log('hasLiked:', this.hasLiked);
        console.log('User Products:', this.user.products); // Verificar productos del usuario
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
        this.error = 'No se pudo obtener el perfil del usuario. Inténtalo de nuevo más tarde.';
        this.loading = false;
      }
    });
  }

  followUser(): void {
    console.log('Toggling follow status. isFollowing:', this.isFollowing);
    if (this.isFollowing) {
      this.userService.unfollowUser(this.userId).subscribe({
        next: () => {
          this.isFollowing = false;
          this.user.followers = this.user.followers?.filter(followerId => followerId !== this.currentUserId) || [];
          console.log('Dejado de seguir al usuario. Followers actualizados:', this.user.followers);
        },
        error: (error) => {
          console.error('Error al dejar de seguir al usuario:', error);
        }
      });
    } else {
      this.userService.followUser(this.userId).subscribe({
        next: () => {
          this.isFollowing = true;
          this.user.followers = [...(this.user.followers || []), this.currentUserId];
          console.log('Seguido al usuario. Followers actualizados:', this.user.followers);
        },
        error: (error) => {
          console.error('Error al seguir al usuario:', error);
        }
      });
    }
  }

  likeUser(): void {
    console.log('Toggling like status. hasLiked:', this.hasLiked);
    if (!this.hasLiked) {
      this.userService.likeUser(this.userId).subscribe({
        next: () => {
          this.hasLiked = true;
          this.user.likes = [...(this.user.likes || []), this.currentUserId];
          console.log('Dado like al usuario. Likes actualizados:', this.user.likes);
        },
        error: (error) => {
          console.error('Error al dar like al usuario:', error);
        }
      });
    }
  }

  proposeExchange(productId: string): void {
    this.router.navigate(['/propose-exchange', productId]);
  }
}
