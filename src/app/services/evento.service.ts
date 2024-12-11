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

  // evento.service.ts
  obtenerEvento(filtrarPorUsuario: boolean = false): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    let params = new HttpParams();

    // Si el token está presente y queremos filtrar por usuario
    if (filtrarPorUsuario && token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
      params = params.set('user', 'true');
    }

    // Realizar la solicitud GET con los encabezados y parámetros según corresponda
    return this.http.get<any>(this.apiUrl2, { headers, params });
  }


  obtenerEventoPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl3}${id}`);
  }
}
