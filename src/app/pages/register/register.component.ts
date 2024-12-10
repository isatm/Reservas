import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [RegisterService], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  correo: string = '';
  role: string = '';

  constructor(private registerService: RegisterService) {}

  crearUsuario(): void {
    const usuario = {
      username: this.username,
      password: this.password,
      correo: this.correo,
      role: this.role
    };

    this.registerService.crearUsuario(usuario).subscribe(
      (response) => {
        console.log('Usuario creado exitosamente:', response);
        alert('Usuario creado exitosamente');
      },
      (error) => {
        console.error('Error al crear el Usuario:', error);
        alert('Hubo un error al crear el Usuario.');
      }
    );
  }
}