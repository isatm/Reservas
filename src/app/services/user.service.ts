// src/app/services/evento.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root', // Hace que este servicio esté disponible en toda la aplicación
  })
  export class UserService {
    private apiUrl1 = 'http://localhost:3000/users'; // URL del servidor Express
    private apiUrl2 = 'http://localhost:3000/users/login'; // URL del servidor Express
  
    constructor(private http: HttpClient) {}
 
    crearUsuario(usuario: any): Observable<any> {
        return this.http.post(this.apiUrl1, usuario); // Realiza un POST al endpoint
    }

    loginUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl2, usuario); // Realiza un POST al endpoint
    }

    guardarToken(token: string): void {
      localStorage.setItem('token', token); // Guardar el token en el localStorage
    }
  
    obtenerToken(): string | null {
      return localStorage.getItem('token'); // Obtener el token almacenado
    }
} 