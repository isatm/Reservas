import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Hace que este servicio esté disponible en toda la aplicación
})
export class EventoService {
  private apiUrl = 'http://localhost:3000/eventos'; 
  private apiUrl2 = 'http://localhost:3000/eventos/obtener';
  private apiUrl3 = 'http://localhost:3000/eventos/'; 

  constructor(private http: HttpClient) {}

  crearEvento(evento: any): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No se encontró un token de autenticación');
    }

    const headers = { Authorization: `Bearer ${token}` };

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

    return this.http.get<any>(this.apiUrl2, { headers, params });
  }

  obtenerEventoPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl3}${id}`);
  }
}
