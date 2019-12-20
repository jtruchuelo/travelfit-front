import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent, NgbdModalComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { MyItinerariesComponent } from './components/my-itineraries/my-itineraries.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ItinerariesComponent } from './components/itineraries/itineraries.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    ContactoComponent,
    MyItinerariesComponent,
    UserEditComponent,
    NgbdModalComponent,
    ItinerariesComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    // BrowserAnimationsModule,
    routing,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    NgbdModalComponent
  ],
  entryComponents: [LoginComponent],
  providers: [
    appRoutingProviders, NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
