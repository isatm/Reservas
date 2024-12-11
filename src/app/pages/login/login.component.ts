import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corregido el nombre de la propiedad
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private userService: UserService) {}

  loginUsuario(): void {
    const user = {
      username: this.username,
      password: this.password
    };

    this.userService.loginUsuario(user).subscribe(
      (response) => {
        console.log('Sesión iniciada exitosamente:', response);
        alert('Sesión iniciada exitosamente');
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        alert('Hubo un error al iniciar sesión.');
      }
    );
  }
}
