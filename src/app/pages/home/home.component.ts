import { Component } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { EventoService } from '../../services/evento.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, SearchBarComponent,HttpClientModule,FormsModule,CommonModule],
  providers: [EventoService], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  evento: any[] = [];

  constructor(private EventoService: EventoService) {}

  ngOnInit(): void {
    this.EventoService.obtenerEvento().subscribe({
      next: (data) => {
        console.log(data);
        this.evento = data; // Guardar los datos en la variable
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      },
    });
  }
}
