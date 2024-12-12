// src/app/event/event.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  evento: any = null;
  eventId: string | null = null;

  constructor(private route: ActivatedRoute, private eventoService: EventoService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id');
      console.log('eventId:', this.eventId);

      if (this.eventId) {
        this.eventoService.obtenerEventoPorId(this.eventId).subscribe({
          next: (data) => {
            console.log("La data:", data);
            this.evento = data;
          },
          error: (err) => {
            console.error('Error al obtener el evento:', err);
          },
        });
      } else {
        console.warn('No se ha proporcionado un eventId válido');
      }
    });
  }

  comprarEvento(): void {
    if (confirm('¿Estás seguro de que deseas comprar este evento?')) {
      if (this.eventId) {
        this.eventoService.crearReserva(this.eventId).subscribe({
          next: () => {
            alert('Reserva creada exitosamente');
            // Actualizar el saldo del usuario en la interfaz si es necesario
          },
          error: (err) => {
            console.error('Error al crear la reserva:', err);
            alert('Error al crear la reserva');
          },
        });
      }
    }
  }
}
