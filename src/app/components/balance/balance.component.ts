import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  saldo: number = 0;
  monto: number = 0;
  reservas: any[] = [];
  userId: string = '';

  constructor(private userService: UserService, private eventoService: EventoService) {}

  ngOnInit(): void {
    this.getSaldo();
    this.obtenerReservasUsuario();
  }

  getSaldo(): void {
    this.userService.getSaldo().subscribe(
      data => {
        this.saldo = data.saldo;
      },
      error => {
        console.error('Error fetching saldo', error);
      }
    );
  }

  agregarSaldo(): void {
    if (this.monto > 0) {
      this.userService.updateSaldo(this.monto).subscribe(
        () => {
          this.getSaldo();
        },
        error => {
          console.error('Error updating saldo', error);
        }
      );
    }
  }

  quitarSaldo(): void {
    if (this.monto > 0) {
      this.userService.updateSaldo(-this.monto).subscribe(
        () => {
          this.getSaldo();
        },
        error => {
          console.error('Error updating saldo', error);
        }
      );
    }
  }

  obtenerReservasUsuario(): void {
    if (this.userId) {
      this.eventoService.obtenerReservasUsuario().subscribe(
        data => {
          this.reservas = data;
        },
        error => {
          console.error('Error fetching reservas', error);
        }
      );
    } else {
      console.error('User ID is not available');
    }
  }
}
