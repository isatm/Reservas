import { Routes } from '@angular/router';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { HomeComponent } from './pages/home/home.component';
import { EventComponent } from './pages/event/event.component';
import { RegisterComponent } from './pages/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'createEvent', component: CreateEventComponent},
    {path: 'event/:id', component: EventComponent},
    {path: 'register', component: RegisterComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}