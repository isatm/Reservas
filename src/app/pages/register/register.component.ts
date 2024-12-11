import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [UserService], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  correo: string = '';
  role: string = '';
  isLoading: boolean = false;

  selectRole(role: string): void {
    this.role = role;  // Actualiza el valor del rol
  }

  constructor(private userService: UserService, private router: Router) {}

  crearUsuario(): void {
    
    if (!this.username || !this.password || !this.correo || !this.role) {
      alert('Por favor, complete todos los campos antes de continuar.');
      return; // Detener el proceso si falta algún campo
    }
    const usuario = {
      username: this.username,
      password: this.password,
      correo: this.correo,
      role: this.role
    };

    this.isLoading = true;

    this.userService.crearUsuario(usuario).subscribe(
      (response) => {
        console.log('Usuario registrado exitosamente:', response);
        alert('Usuario registrado exitosamente');
      },
      (error) => {
        console.error('Error al registrar el Usuario:', error);
        alert('Hubo un error al registrar el Usuario.');
      }
    );
    this.router.navigate(['/login']);
  }
}