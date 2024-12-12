import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private apiUrl = 'http://localhost:3000/eventos';

  constructor(private http: HttpClient) {}

  crearEvento(evento: any): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No se encontró un token de autenticación');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.apiUrl, evento, { headers });
  }

  obtenerEvento(filtrarPorUsuario: boolean = false): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    let params = new HttpParams();

    if (filtrarPorUsuario && token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
      params = params.set('user', 'true');
    }

    return this.http.get<any>(`${this.apiUrl}/obtener`, { headers, params });
  }

  obtenerEventoPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  crearReserva(eventId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/${eventId}/reservas`, {}, { headers });
  }

  obtenerReservasUsuario(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/reservas/${userId}`, { headers });
  }
  
  filtrarEventos(filtros: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró un token de autenticación');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log('Filtros enviados al servicio:', filtros); // Agrega este log para verificar los valores enviados

    return this.http.post<any>(`${this.apiUrl}/filter`, filtros, { headers });
  }
}


