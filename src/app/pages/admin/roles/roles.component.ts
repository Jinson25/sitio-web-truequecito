import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent implements OnInit {
  roles: any[] = [];
  selectedRole: any = null;
  newRole: any = {};
  view: 'list' | 'create' | 'edit' = 'list'; // Controls the current view

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.adminService.getAllRoles().subscribe((data: any) => {
      this.roles = data;
    });
  }

  createRole(): void {
    this.adminService.createRole(this.newRole).subscribe(() => {
      this.loadRoles();
      this.newRole = {};
      this.view = 'list';
      Swal.fire({
        icon: 'success',
        title: 'Rol creado',
        text: 'El rol se ha creado correctamente.',
      });
    },
    (error) => {
      console.error('Error creando rol', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al crear',
        text: 'Hubo un error al crear el rol.',
      });
    });
  }

  startEditRole(role: any): void {
    this.selectedRole = { ...role };
    this.view = 'edit';
  }

  saveEditRole(): void {
    if (this.selectedRole && this.selectedRole._id) {
      this.adminService.editRole(this.selectedRole._id, this.selectedRole).subscribe(() => {
        this.loadRoles();
        this.selectedRole = null;
        this.view = 'list';
        Swal.fire({
          icon: 'success',
          title: 'Rol guardado',
          text: 'El rol se ha guardado correctamente.',
        });
      },
      (error) => {
        console.error('Error editando rol', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar',
          text: 'Hubo un error al guardar el rol.',
        });
      });
    }
  }

  cancelEdit(): void {
    this.selectedRole = null;
    this.view = 'list';
  }

  deleteRole(id: string): void {
    if (id) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esto.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.adminService.deleteRole(id).subscribe(
            () => {
              this.loadRoles();
              Swal.fire({
                icon: 'success',
                title: 'Rol eliminado',
                text: 'El rol se ha eliminado correctamente.',
              });
            },
            (error) => {
              console.error('Error eliminando rol', error);
              Swal.fire({
                icon: 'error',
                title: 'Error al eliminar',
                text: 'Hubo un error al eliminar el rol.',
              });
            }
          );
        }
      });
    } else {
      console.error('ID del rol no está definido', id);
    }
  }

  toggleView(view: 'list' | 'create'): void {
    this.view = view;
  }
}