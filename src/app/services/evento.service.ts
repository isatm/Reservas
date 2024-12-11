// src/app/services/evento.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Hace que este servicio esté disponible en toda la aplicación
})
export class EventoService {
  private apiUrl = 'http://localhost:3000/eventos'; // URL del servidor Express
  private apiUrl2 = 'http://localhost:3000/eventos/obtener';
  private apiUrl3 = 'http://localhost:3000/eventos/'; 
  constructor(private http: HttpClient) {}

  crearEvento(evento: any): Observable<any> {
    return this.http.post(this.apiUrl, evento); // Realiza un POST al endpoint
  }
  obtenerEvento(): Observable<Event[]> {  
    return this.http.get<Event[]>(this.apiUrl2);
  } 
  obtenerEventoPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl3}${id}`);
  }
}
