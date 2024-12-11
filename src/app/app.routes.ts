import { Routes } from '@angular/router';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { HomeComponent } from './pages/home/home.component';
import { EventComponent } from './pages/event/event.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { MyEventsComponent } from './pages/my-events/my-events.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'home', component: HomeComponent},
    {path: 'createEvent', component: CreateEventComponent},
    {path: 'event', component: EventComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'myEvents', component: MyEventsComponent},
    {path: 'event/:id', component: EventComponent}
];
