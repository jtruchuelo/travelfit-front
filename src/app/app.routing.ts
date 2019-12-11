//IMPORTS
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// COMPONENTES
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { MyItinerariesComponent } from './components/my-itineraries/my-itineraries.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

// RUTAS
const appRoutes: Routes = [
  {path: '', component: HomeComponent}, // ruta inicial, hay que cambiar al home page component cuando exista
  {path: 'inicio', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout/:sure', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'modificar', component: UserEditComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'mis-itinerarios', component: MyItinerariesComponent},
  {path:'**', component: ErrorComponent}, // Ruta error default
];

// EXPORTAR RUTAS
export const appRoutingProviders: any[] = []; // Router como servicio
export const routing:  ModuleWithProviders = RouterModule.forRoot(appRoutes); // Módulo del router
