import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Hace que este servicio esté disponible en toda la aplicación
})
export class EventoService {
  private apiUrl = 'http://localhost:3000/eventos'; // URL del servidor Express

  constructor(private http: HttpClient) {}

  crearEvento(evento: any): Observable<any> {
    // Obtener el token de localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No se encontró un token de autenticación');
    }

    // Crear los encabezados con el token
    const headers = { Authorization: `Bearer ${token}` };

    // Realizar el POST con el token en los encabezados
    return this.http.post(this.apiUrl, evento, { headers });
  }

  obtenerEvento(): Observable<any> {
    // Obtener el token de localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No se encontró un token de autenticación');
    }

    // Crear los encabezados con el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Realizar el GET con el token en los encabezados
    return this.http.get<Event[]>(this.apiUrl, { headers });
  }
}
