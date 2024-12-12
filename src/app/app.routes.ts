import { Routes } from '@angular/router';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { HomeComponent } from './components/home/home.component';
import { EventComponent } from './components/event/event.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MyEventsComponent } from './components/my-events/my-events.component';
import { BalanceComponent } from './components/balance/balance.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'home', component: HomeComponent},
    {path: 'createEvent', component: CreateEventComponent},
    {path: 'event', component: EventComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'myEvents', component: MyEventsComponent},
    {path: 'event/:id', component: EventComponent},
    {path: 'balance', component: BalanceComponent}
];
