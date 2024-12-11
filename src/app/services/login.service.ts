// src/app/services/evento.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Hace que este servicio esté disponible en toda la aplicación
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/users/login'; // URL del servidor Express

  constructor(private http: HttpClient) {}

  loginUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario); // Realiza un POST al endpoint
  }
}