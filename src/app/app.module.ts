import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as bootstrap from "bootstrap";
import * as $ from "jquery";

import { AppComponent } from './app.component';
import { LoginComponent, NgbdModalComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { MyItinerariesComponent } from './components/my-itineraries/my-itineraries.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ItinerariesComponent } from './components/itineraries/itineraries.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { ItineraryComponent } from './components/itinerary/itinerary.component';
import { ItinerarySummaryComponent } from './components/itinerary-summary/itinerary-summary.component';
import { ItineraryMapComponent } from './components/itinerary-map/itinerary-map.component';
import { ItineraryTimelineComponent } from './components/itinerary-timeline/itinerary-timeline.component';
import { LastItinerariesComponent } from './components/last-itineraries/last-itineraries.component';

import { NewItineraryService } from './services/new.itinerary.service';
import { ItineraryService } from './services/itinerary.service';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';


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
    ItinerariesComponent,
    PreferencesComponent,
    ItineraryComponent,
    ItinerarySummaryComponent,
    ItineraryMapComponent,
    ItineraryTimelineComponent,
    LastItinerariesComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    // BrowserAnimationsModule,
    routing,
    FormsModule,
    HttpClientModule,
    LeafletModule,
  ],
  exports: [
    NgbdModalComponent,
  ],
  entryComponents: [LoginComponent],
  providers: [
    appRoutingProviders, NgbActiveModal, NewItineraryService, ItineraryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
