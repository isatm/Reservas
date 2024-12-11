import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // Importa Router

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

  constructor(private userService: UserService, private router: Router) {} // Inyecta el router

  navegarARegister() {
    this.router.navigate(['/register']);
  }
  navegarAHome() {
    this.router.navigate(['/home']);
  }
  
  loginUsuario(): void {
    const user = {
      username: this.username,
      password: this.password
    };
    if (!this.username || !this.password) {
      alert('Por favor, complete todos los campos antes de iniciar sesión.');
      return; // Detener el flujo si los campos están vacíos
    }

    this.userService.loginUsuario(user).subscribe(
      (response) => {
        console.log('Sesión iniciada exitosamente:', response);
        this.userService.guardarToken(response.token);
        alert('Sesión iniciada exitosamente');
        
        // Redirige al home
        this.router.navigate(['/home']); 
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        alert('Hubo un error al iniciar sesión.');
      }
    );
  }
}