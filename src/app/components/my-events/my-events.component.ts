// src/app/my-events/my-events.component.ts

import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule, RouterModule],
  providers: [EventoService],
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  evento: any[] = [];
  noEvents: boolean = false;
  eventoEditando: any = null;

  constructor(private EventoService: EventoService) {}

  ngOnInit(): void {
    this.EventoService.obtenerEvento(true).subscribe({
      next: (data) => {
        console.log(data);
        if (data.message) {
          this.noEvents = true;
        } else {
          this.evento = data;
        }
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      },
    });
  }

  editarEvento(evento: any): void {
    this.eventoEditando = { ...evento };
  }

  guardarEvento(): void {
    if (this.eventoEditando) {
      this.EventoService.modificarEvento(this.eventoEditando.eve_id, this.eventoEditando).subscribe({
        next: () => {
          this.eventoEditando = null;
          this.ngOnInit(); // Recargar la lista de eventos
        },
        error: (err) => {
          console.error('Error saving event:', err);
        },
      });
    }
  }

  eliminarEvento(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      this.EventoService.eliminarEvento(id).subscribe({
        next: () => {
          this.ngOnInit(); // Recargar la lista de eventos
        },
        error: (err) => {
          console.error('Error deleting event:', err);
        },
      });
    }
  }
}
