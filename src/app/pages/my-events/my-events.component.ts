import { Component } from '@angular/core';
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
export class MyEventsComponent {
  evento: any[] = [];
  noEvents: boolean = false; 

  constructor(private EventoService: EventoService) {}

  // home.component.ts
  ngOnInit(): void {
    this.EventoService.obtenerEvento(false).subscribe({
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
