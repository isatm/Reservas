import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-menu-prueba',
  standalone: true,
  imports: [HomeComponent,MenuPruebaComponent],
  templateUrl: './menu-prueba.component.html',
  styleUrl: './menu-prueba.component.css'
})
export class MenuPruebaComponent {

}
