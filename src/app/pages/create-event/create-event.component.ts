import { Component } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [EventoService], 
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent {
  nombre: string = '';
  descripcion: string = '';
  fechaInicio: string = '';
  fechaFinal: string = '';
  precio: number = 0;
  imagen: string = '';

  constructor(private eventoService: EventoService) {}

  crearEvento(): void {
    const evento = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      fechaInicio: this.fechaInicio,
      fechaFinal: this.fechaFinal,
      precio: this.precio,
      imagen: this.imagen,
    };

    this.eventoService.crearEvento(evento).subscribe(
      (response) => {
        console.log('Evento creado exitosamente:', response);
        alert('Evento creado exitosamente');
      },
      (error) => {
        console.error('Error al crear el evento:', error);
        alert('Hubo un error al crear el evento.');
      }
    );
  }
}
