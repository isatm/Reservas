// src/app/services/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl1 = 'http://localhost:3000/users';
  private apiUrl2 = 'http://localhost:3000/users/login';
  private apiUrlSaldo = 'http://localhost:3000/users/saldo';

  constructor(private http: HttpClient) {}

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl1, usuario);
  }

  loginUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl2, usuario);
  }

  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  getSaldo(): Observable<any> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrlSaldo, { headers });
  }

  updateSaldo(amount: number): Observable<any> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrlSaldo, { amount }, { headers });
  }
}
