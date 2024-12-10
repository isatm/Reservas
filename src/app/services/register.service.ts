// src/app/services/evento.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Hace que este servicio esté disponible en toda la aplicación
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000/users'; // URL del servidor Express

  constructor(private http: HttpClient) {}

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario); // Realiza un POST al endpoint
  }
}
