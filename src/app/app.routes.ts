import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuPruebaComponent } from './componentes/menu-prueba/menu-prueba.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent}
];
