import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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

  constructor(private userService: UserService) {}

  crearUsuario(): void {
    const usuario = {
      username: this.username,
      password: this.password,
      correo: this.correo,
      role: this.role
    };

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
  }
}