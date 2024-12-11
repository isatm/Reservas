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
  busqueda: string = ''; // Variable para almacenar la búsqueda

  constructor(private EventoService: EventoService) {}

  ngOnInit(): void {
    this.EventoService.obtenerEvento(false).subscribe({
      next: (data) => {
        console.log(data);
        this.evento = data; // Guardar todos los eventos
        this.eventosFiltrados = data; // Inicializar la lista filtrada
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      },
    });
  }

  filtrarEventos(event: Event): void {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    const busquedaLower = this.busqueda.toLowerCase();

    // Filtrar eventos según el término de búsqueda
    this.eventosFiltrados = this.evento.filter((e) =>
      e.eve_nombre.toLowerCase().includes(busquedaLower) ||
      e.eve_descripcion.toLowerCase().includes(busquedaLower)
    );
  }
}