import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../../services/info.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css',
})
export class ConfiguracionComponent implements OnInit {
  info: any = {
    mission: '',
    vision: '',
    history: '',
    team: '',
    generalInfo: '',
  };
  constructor(private http: HttpClient, private infoService: InfoService) {}

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(): void {
    this.infoService.getInfo().subscribe(
      (data: any) => {
        this.info = data;
      },
      (error) => {
        console.error('Error cargando información', error);
      }
    );
  }

  saveInfo(): void {
    this.infoService.updateInfo('66b11e3f778cad4fbc37bb0e', this.info).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: '¡Guardado!',
          text: 'La información ha sido guardada correctamente',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
        });
      },
      (error) => {
        console.error('Error actualizando información', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al guardar la información. Por favor, inténtalo nuevamente.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d33',
        });
      }
    );
  }
}
