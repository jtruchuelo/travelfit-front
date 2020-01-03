import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {Itinerary} from '../models/itinerary';
import {Destination} from '../models/destination';
import {Poi} from '../models/poi';
import {global} from  './global';

@Injectable()
export class ItineraryService {

  public url: string;

  constructor (
    public _http: HttpClient
  ) {
    this.url = global.url;
  }

  // FUNCIONES OBTENER DATOS API
  // Obtener los itinerarios publicos del sistema
  getItineraries(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'itineraries', {headers:headers});
  }
}
