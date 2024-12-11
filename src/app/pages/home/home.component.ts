import { Component } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { EventoService } from '../../services/evento.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, SearchBarComponent,HttpClientModule,FormsModule,CommonModule,RouterModule],
  providers: [EventoService], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  nombre: string = '';
  ubicacion: string = '';
  fechaInicio: string | null = null;
  fechaFin: string | null = null;
  pagina: number = 1;
  limite: number = 10;
  eventos: any[] = [];

  evento: any[] = []; //para entrar al evento

  constructor(private eventoService: EventoService) {}

  ngOnInit(): void {
    this.eventoService.obtenerEvento().subscribe({
      next: (data) => {
        console.log(data);
        this.evento = data; // Guardar los datos en la variable
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      },
    });
  }

  buscarEventos(): void {
    this.eventoService.filtrarEventos({
      nombre: this.nombre,
      ubicacion: this.ubicacion,
      fechaInicio: this.fechaInicio ?? undefined,
      fechaFin: this.fechaFin ?? undefined,
    }).subscribe({
      next: (data) => {
        this.eventos = data;
      },
      error: (err) => {
        console.error('Error al filtrar eventos:', err);
      }
    });
  }
  }

