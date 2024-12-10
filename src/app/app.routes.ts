import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuPruebaComponent } from './componentes/menu-prueba/menu-prueba.component';
import { HomeComponent } from './componentes/home/home.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'register', component: RegisterComponent}
];
