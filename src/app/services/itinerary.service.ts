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

  // FUNCIONES OBTENER DATOS API TRAVEL FIT
  // Obtener los itinerarios publicos del sistema
  getItineraries(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'itineraries', {headers:headers});
  }

  getItinerary(id:string, user:string = null, token:string = null): Observable<any> {
    if (!token && !user) {
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this._http.get(this.url+'itineraries/'+id, {headers:headers});
    } else {
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', token);
      return this._http.post(this.url+'itineraries/'+user+'/'+id, null, {headers:headers});
    }
  }

  getMyItineraries(id:string, token:string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    return this._http.post(this.url+'itineraries/'+id, null, {headers:headers});
  }

  // Guardar itinerario completo
  saveItineraryUser(itinerary: Itinerary, token:string): Observable<any> {
    let json = JSON.stringify(itinerary);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);

    return this._http.post(this.url+'itineraries', json, {headers:headers});
  }

  updateItinerary(itinerary: Itinerary, token:string): Observable<any> {
    let json = JSON.stringify(itinerary);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                  .set('Authorization', token);
    return this._http.put(this.url + 'itineraries/' + itinerary.id, json, {headers:headers});
  }

  deleteItinerary(itinerary: Itinerary, token:string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                  .set('Authorization', token);
    return this._http.delete(this.url + 'itineraries/' + itinerary.id, {headers:headers});
  }

}
