//IMPORTS
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// COMPONENTES
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { MyItinerariesComponent } from './components/my-itineraries/my-itineraries.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ItinerariesComponent } from './components/itineraries/itineraries.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { ItineraryComponent } from './components/itinerary/itinerary.component';

// GUARD
import { IdentityGuard } from './services/identity.guards';

// RUTAS
const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  //{path: 'login', component: LoginComponent},
  {path: 'logout/:sure', component: LoginComponent, canActivate: [IdentityGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'update', component: UserEditComponent, canActivate: [IdentityGuard]},
  {path: 'contact', component: ContactoComponent},
  {path: 'myItineraries', component: MyItinerariesComponent, canActivate: [IdentityGuard]},
  {path: 'itineraries', component: ItinerariesComponent},
  {path: 'preferences', component: PreferencesComponent},
  {path: 'itinerary/:id', component: ItineraryComponent},
  {path: 'itinerary/:user/:id', component: ItineraryComponent, canActivate: [IdentityGuard]},
  {path: '**', component: ErrorComponent}, // Ruta error default
];

// EXPORTAR RUTAS
export const appRoutingProviders: any[] = []; // Router como servicio
export const routing:  ModuleWithProviders = RouterModule.forRoot(appRoutes); // Módulo del router
