import { Component } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule,RouterModule],
  providers: [EventoService], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  evento: any[] = [];
  eventosFiltrados: any[] = [];
  nombre: string = '';
  precio: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';

  constructor(private EventoService: EventoService) {}

  ngOnInit(): void {
    this.EventoService.obtenerEvento(false).subscribe({
      next: (data) => {
        console.log(data);
        this.evento = data; 
        this.eventosFiltrados = data; 
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      },
    });
  }

  filtrarEventos() {
    const filtros = {
      nombre: this.nombre || null,
      precio: this.precio || null,
      fechaInicio: this.fechaInicio || null,
      fechaFinal: this.fechaFin || null
    };

    if (this.fechaInicio !== null && this.fechaFin === null) {
      alert('Debe ingresar ambas fechas.');
      return;
    }

    this.EventoService.filtrarEventos(filtros).subscribe(
      (data) => {
        console.log('Eventos f  iltrados:', data);
        this.eventosFiltrados = data; // Actualiza la lista de eventos filtrados
      },
      (error) => {
        console.error('Error al filtrar eventos:', error);
      }
    );
}
}