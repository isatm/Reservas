import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
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
  styleUrls: ['./event.component.css'], // Corregido de 'styleUrl' a 'styleUrls'
})
export class EventComponent implements OnInit {
  evento: any = null;
  eventId: string | null = null;

  
  constructor(private route: ActivatedRoute, private eventoService: EventoService) {}

  ngOnInit(): void {
    // Usamos paramMap reactivo para obtener el id dinámicamente
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id'); // Obtiene el parámetro id de la URL
      console.log('eventId:', this.eventId); // Verifica si el ID es correcto

      if (this.eventId) {
        this.eventoService.obtenerEventoPorId(this.eventId).subscribe({
          next: (data) => {
            console.log("La data:", data);
            this.evento = data; // Asigna los datos al objeto evento
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
  }

