import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {Itinerary} from '../models/itinerary';
import {Destination} from '../models/destination';
import {Poi} from '../models/poi';
import {global} from  './global';

@Injectable()
export class NewItineraryService {

  public url: string;
  private newItinerary: any;
  private itineraryCategories: any;
  private ready: boolean;

  constructor (
    public _http: HttpClient
  ) {
    this.url = global.url;
    this.ready = false;
  }

  // FUNCIONES CREACION ITINERARIO NUEVO
  // Creamos un nuevo destino y nuevo itinerario
  startNewItinerary(point:any, city:string, fromDate:string, toDate:string) {

    // Comprobar si el usuario esta logueado, si es así, coger el nombre y el id.
    let user = JSON.parse(localStorage.getItem('identity') ? localStorage.getItem('identity') : null);
    let newDestiny = [new Destination(1, point.reverse(), city, '1',new Date(fromDate), new Date(toDate), null,[], null)];
    if (user) {
      this.newItinerary = new Itinerary(1, 'Mi itinerario en ' + city, new Date(), new Date(fromDate), new Date(toDate), true, user.user_id, user.name, newDestiny);
    } else {
      this.newItinerary = new Itinerary(1, 'Mi itinerario en ' + city, new Date(), new Date(fromDate), new Date(toDate), true, null, null, newDestiny);
    }
    // console.log ("Start nuevo itinerario: ", this.newItinerary);
  }

  // Funcion para definir los parámetros elegidos por el usuario
  setCategoriesNewItinerary(categories: any) {
    this.itineraryCategories = categories;
  }

  // Funcion que pasa las parámetros del nuevo itinerario al backend para crearlo.
  createNewItinerary(): Observable<any> {
    if(this.ready) {
      let json = JSON.stringify({'new_itinerary': this.newItinerary,
                                  'categories': this.itineraryCategories});
      let headers = new HttpHeaders().set('Content-Type', 'application/json');

      console.log("Envio datos: " + json);
      return this._http.post(this.url+'new_itinerary', json, {headers:headers});
    }
  }

  responseToObject(response): Itinerary {

            let listPois = new Array<Poi>();
            let listDestination = new Array<Destination>();

            for (let i = 0; i < response['destinations']['pois'].length; i++) {
              listPois.push( new Poi (
                response['destinations']['pois'][i]['id'],
                response['destinations']['pois'][i]['name'],
                response['destinations']['pois'][i]['idApi'],
                new Date (response['destinations']['pois'][i]['startDate']),
                response['destinations']['pois'][i]['destination_id'],
                response['destinations']['pois'][i]['duration'],
                response['destinations']['pois'][i]['photo'],
                response['destinations']['pois'][i]['location'],
                response['destinations']['pois'][i]['description'],
                ));
            };

            listDestination.push( new Destination (
              response['destinations']['id'],
              response['destinations']['location'],
              response['destinations']['name'],
              response['destinations']['idApi'],
              new Date(response['destinations']['startDate']),
              new Date(response['destinations']['endDate']),
              response['destinations']['photo'],
              listPois,
              response['destinations']['itinerary_id'],
            ));

            return new Itinerary(
              response['itinerary_id'],
              response['name'],
              new Date(response['createdDate']),
              new Date (response['startDate']),
              new Date (response['endDate']),
              response['isPublic'],
              response['user_id'],
              response['user_name'],
              listDestination,
            );
  }

  check():boolean {
    if(this.newItinerary && this.itineraryCategories) {
      this.ready = true;
    }
    return this.ready;
  }

}
