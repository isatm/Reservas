import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  /*username = '';
  password = '';
  email = '';
  role = '';

  constructor(private registerService: RegisterService) {}

  register() {
    if (!this.username || !this.password || !this.email || !this.role) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const userData = {
      username: this.username,
      password: this.password,
      email: this.email,
      role: this.role,
    };

    this.registerService.registerUser(userData).subscribe({
      next: (response) => {
        alert('Registro exitoso.');
        console.log('Usuario registrado:', response);
      },
      error: (error) => {
        alert('Error al registrar el usuario.');
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Solicitud completada.');
      },
    });
  }*/
}