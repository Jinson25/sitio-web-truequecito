import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/interfaces/auth.interfaces';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-usuario.component.html',
  styleUrls: ['./gestion-usuario.component.css']
})
export class GestionUsuarioComponent implements OnInit {
  users: User[] = [];
  newUser: Partial<User> = {}; // Cambiado a Partial<User>
  editUser: User | null = null;
  view: 'list' | 'create' | 'edit' = 'list'; // Controls the current view

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.adminService.getAllUsers().subscribe(
      (data: any[]) => {
        this.users = data.map(user => ({
          ...user,
          id: user._id // Mapear _id a id
        }));
      },
      (error) => {
        this.handleError('Error fetching users:', error);
      }
    );
  }

  createUser(): void {
    this.adminService.createUser(this.newUser).subscribe(
      (data: User) => {
        this.users.push(data);
        this.newUser = {}; // Reset the form
        this.view = 'list'; // Return to the user list view
        Swal.fire(
          'Creado!',
          'El usuario ha sido creado.',
          'success'
        );
      },
      (error) => {
        this.handleError('Error creating user:', error);
        Swal.fire(
          'Error!',
          'No se pudo crear el usuario.',
          'error'
        );
      }
    );
  }

  startEditUser(user: User): void {
    this.editUser = { ...user }; // Create a copy for editing
    this.view = 'edit'; // Switch to edit view
    console.log('Editing user:', this.editUser); // Verifica el valor de editUser
  }

  saveEditUser(): void {
    if (this.editUser) {
      console.log('Editing user:', this.editUser); // Verifica el valor de editUser
      if (!this.editUser.id) {
        console.error('User ID is missing');
        return;
      }

      this.adminService.editUser(this.editUser.id, this.editUser).subscribe(
        (data: User) => {
          const index = this.users.findIndex(u => u.id === data.id);
          if (index !== -1) {
            this.users[index] = data;
          }
          this.editUser = null; // Reset the edit form
          this.view = 'list'; // Return to the user list view
          Swal.fire(
            'Guardado!',
            'Los cambios han sido guardados.',
            'success'
          );
        },
        (error) => {
          this.handleError('Error editing user:', error);
          Swal.fire(
            'Error!',
            'No se pudieron guardar los cambios.',
            'error'
          );
        }
      );
    }
  }

  cancelEdit(): void {
    this.editUser = null;
    this.view = 'list'; // Return to the user list view
  }

  deleteUser(id: string): void {
    if (id) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.adminService.deleteUser(id).subscribe(
            () => {
              this.users = this.users.filter(user => user.id !== id);
              Swal.fire(
                'Eliminado!',
                'El usuario ha sido eliminado.',
                'success'
              );
            },
            (error) => {
              this.handleError('Error deleting user:', error);
              Swal.fire(
                'Error!',
                'No se pudo eliminar el usuario.',
                'error'
              );
            }
          );
        }
      });
    } else {
      console.error('User ID is undefined');
    }
  }

  toggleView(view: 'list' | 'create'): void {
    this.view = view;
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    // Optionally, you can show a user-friendly error message
  }
}
