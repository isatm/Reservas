// src/app/services/evento.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Hace que este servicio esté disponible en toda la aplicación
})
export class EventoService {
  private apiUrl = 'http://localhost:3000/eventos'; // URL del servidor Express
  private apiUrl2 = 'http://localhost:3000/eventos/obtener';
  private apiUrl3 = 'http://localhost:3000/eventos/'; 
  private apiUrl4 = 'http://localhost:3000/eventos/filtrar'
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

  filtrarEventos(filtros: { nombre?: string, categoria?: string, ubicacion?: string, fechaInicio?: string, fechaFin?: string}): Observable<any[]> {
    let params = new HttpParams();

    // Añadir filtros a los parámetros
    if (filtros.nombre) {
      params = params.set('nombre', filtros.nombre);
    }
    if (filtros.categoria) {
      params = params.set('categoria', filtros.categoria);
    }
    if (filtros.ubicacion) {
      params = params.set('ubicacion', filtros.ubicacion);
    }
    if (filtros.fechaInicio) {
      params = params.set('fechaInicio', filtros.fechaInicio);
    }
    if (filtros.fechaFin) {
      params = params.set('fechaFin', filtros.fechaFin);
    }

    // Hacer la solicitud GET con los parámetros
    return this.http.get<any[]>(this.apiUrl4, { params });
  }
}
