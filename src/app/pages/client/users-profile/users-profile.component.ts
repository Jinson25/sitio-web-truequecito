import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../shared/interfaces/auth.interfaces';
import { Product } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-users-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {
  user: User = { id: '', email: '', username: '', avatar: '', token: '', role: '', following: [], followers: [], likes: [] };
  userProducts: Product[] = [];
  message: string = '';
  isEditModalOpen: boolean = false;
  activeComponent: string = 'profile';
  Id: string = ''; // No se necesita un valor por defecto

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getUser();
    });
  }

  getUser(): void {
    this.http.get<User>(`http://localhost:5000/api/user/${this.Id}`)
      .subscribe(
        (data) => this.user = data,
        (error) => console.error('Error fetching user:', error)
      );
  }


  showComponent(component: string): void {
    this.activeComponent = component;
  }

  followUser(): void {
    this.http.post(`http://localhost:5000/api/user/${this.Id}/follow`, {})
      .subscribe(
        (response: any) => {
          this.message = response.message;
          this.getUser();
        },
        (error) => console.error('Error following user:', error)
      );
  }
}
