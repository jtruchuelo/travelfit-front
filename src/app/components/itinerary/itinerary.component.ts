import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewItineraryService } from '../../services/new.itinerary.service';
import { Itinerary } from 'src/app/models/itinerary';
import { ItinerarySummaryComponent } from '../itinerary-summary/itinerary-summary.component';
import { ItineraryMapComponent } from '../itinerary-map/itinerary-map.component';
import { ItineraryTimelineComponent } from '../itinerary-timeline/itinerary-timeline.component';


@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css'],
})


export class ItineraryComponent implements OnInit {

  private new: boolean;
  public summary: boolean;
  public timeline: boolean;
  public map: boolean;
  public actualItinerary: Itinerary;
  public res: any;

  constructor(
    private _route: ActivatedRoute,
    private _itineraryService: NewItineraryService,

  ) {
    this.new = false;
    this.res =  {"id":1,"name":"Mi itinerario en Madrid","createdDate":"2020-01-03 02:57:20","startDate":"2020-01-03 12:00:00","endDate":"2020-01-13 12:00:00","isPublic":true,"user_id":8,"user_name":"Pepito","destinations":{"id":1,"location":{"lat":40.4167047,"lng":-3.7035825},"name":"Madrid","idApi":"city:13","startDate":"2020-01-03 12:00:00","endDate":"2020-01-13 12:00:00","photo":"https:\/\/media-cdn.sygictraveldata.com\/media\/612664395a40232133447d33247d38313134353835393232.jpg","pois":[{"id":"","destination_id":1,"name":"Estadio Santiago Bernab\u00e9u","idApi":"poi:1443","location":{"lat":40.4530434,"lng":-3.6882928},"duration":7200,"photo":"https:\/\/media-cdn.sygictraveldata.com\/media\/poi:1443","description":"Coloquialmente conocido como El Bernab\u00e9u, este estadio de f\u00fatbol es el tercero m\u00e1s grande de Europa.","startDate":"2020-01-03 10:00:00"},{"id":"","destination_id":1,"name":"Las Ventas","idApi":"poi:1390","location":{"lat":40.4321352,"lng":-3.663294},"duration":7200,"photo":"https:\/\/media-cdn.sygictraveldata.com\/media\/poi:1390","description":"Esta gran estructura dise\u00f1ada en un estilo morisco se utiliza como plaza de toros y estadio.","startDate":"2020-01-03 16:00:00"},{"id":"","destination_id":1,"name":"Estadio Metropolitano","idApi":"poi:16283716","location":{"lat":40.4361743,"lng":-3.5998958},"duration":7200,"photo":"https:\/\/media-cdn.sygictraveldata.com\/media\/poi:16283716","description":"El Estadio Metropolitano \u2014seg\u00fan la denominaci\u00f3n para competiciones UEFA\u2014,\u200b\u200b conocido por razones de patrocinio, como Wanda Metropolitano,\u200b\u200b\u2026","startDate":"2020-01-04 10:00:00"},{"id":"","destination_id":1,"name":"Estadio Vicente Calder\u00f3n","idApi":"poi:56543","location":{"lat":40.4017248,"lng":-3.7205837},"duration":900,"photo":"https:\/\/media-cdn.sygictraveldata.com\/media\/poi:56543","description":"El estadio Vicente Calder\u00f3n fue un recinto deportivo espa\u00f1ol, feudo  del Club Atl\u00e9tico de Madrid desde 1966 hasta 2017, situado en el\u2026","startDate":"2020-01-04 16:00:00"},{"id":"","destination_id":1,"name":"Bullfighting Museum","idApi":"poi:36737","location":{"lat":40.4329309,"lng":-3.6634362},"duration":7200,"photo":"https:\/\/media-cdn.sygictraveldata.com\/media\/poi:36737","description":"Ven aqu\u00ed para aprender m\u00e1s sobre la controversial tradici\u00f3n espa\u00f1ola de la lucha de toros El museo ofrece una exposici\u00f3n muy informativa\u2026","startDate":"2020-01-05 10:00:00"},{"id":"","destination_id":1,"name":"WiZink Center","idApi":"poi:5127608","location":{"lat":40.4238495,"lng":-3.6717706},"duration":7200,"photo":"https:\/\/media-cdn.sygictraveldata.com\/media\/poi:5127608","description":"El Palacio de Deportes de la Comunidad de Madrid \u2014WiZink Center por motivos de patrocinio\u2014\u200b es un pabell\u00f3n multiusos situado en el barrio\u2026","startDate":"2020-01-05 16:00:00"},{"id":"","destination_id":1,"name":"Museo del Club Atl\u00e9tico de Madrid","idApi":"poi:56544","location":{"lat":40.4023978,"lng":-3.719945},"duration":5400,"photo":"https:\/\/media-cdn.sygictraveldata.com\/media\/poi:56544","description":"El museo muestra elementos relacionados con el Atl\u00e9tico de Madrid FC. Sus exposiciones ense\u00f1an la historia de este club, desde sus inicios\u2026","startDate":"2020-01-06 10:00:00"},{"id":"","destination_id":1,"name":"Ciudad Deportiva Real Madrid","idApi":"poi:5188367","location":{"lat":40.4767815,"lng":-3.6105647},"duration":3600,"photo":"https:\/\/media-cdn.sygictraveldata.com\/media\/poi:5188367","description":null,"startDate":"2020-01-06 16:00:00"},{"id":"","destination_id":1,"name":"Campo de f\u00fatbol de Vallecas","idApi":"poi:7463771","location":{"lat":40.3918425,"lng":-3.658646},"duration":7200,"photo":"https:\/\/media-cdn.sygictraveldata.com\/media\/poi:7463771","description":"El Estadio de Vallecas, anteriormente conocido como Estadio Teresa Rivero, es un estadio de la Comunidad de Madrid cedido al club de f\u00fatbol\u2026","startDate":"2020-01-07 10:00:00"},{"id":"","destination_id":1,"name":"Estadio Vicente Calder\u00f3n","idApi":"poi:32034599","location":{"lat":40.4017209,"lng":-3.7205875},"duration":7200,"photo":"https:\/\/media-cdn.sygictraveldata.com\/media\/poi:32034599","description":"El estadio Vicente Calder\u00f3n fue un recinto deportivo espa\u00f1ol, feudo  del Club Atl\u00e9tico de Madrid desde 1966 hasta 2017, situado en el\u2026","startDate":"2020-01-07 16:00:00"},{"id":"","destination_id":1,"name":"Estadio Nacional Complutense","idApi":"poi:17390291","location":{"lat":40.4378428,"lng":-3.7284806},"duration":7200,"photo":"https:\/\/media-cdn.sygictraveldata.com\/media\/poi:17390291","description":"El Estadio Nacional Complutense, tambi\u00e9n llamado Campo Central de la Ciudad Universitaria o simplemente Central, se ubica en la Ciudad\u2026","startDate":"2020-01-08 10:00:00"},{"id":"","destination_id":1,"name":"Centro deportivo municipal Casa de Campo","idApi":"poi:6067498","location":{"lat":40.4155614,"lng":-3.734586},"duration":7200,"photo":null,"description":null,"startDate":"2020-01-08 16:00:00"},{"id":"","destination_id":1,"name":"Carlos Sainz Center","idApi":"poi:5185819","location":{"lat":40.4065981,"lng":-3.7271773},"duration":7200,"photo":null,"description":null,"startDate":"2020-01-09 10:00:00"},{"id":"","destination_id":1,"name":"Madrid Arena","idApi":"poi:5143971","location":{"lat":40.4130368,"lng":-3.7381992},"duration":7200,"photo":"https:\/\/media-cdn.sygictraveldata.com\/media\/poi:5143971","description":null,"startDate":"2020-01-09 16:00:00"},{"id":"","destination_id":1,"name":"Plaza de toros de Las Ventas","idApi":"poi:38385708","location":{"lat":40.4322712,"lng":-3.6633985},"duration":7200,"photo":null,"description":null,"startDate":"2020-01-10 10:00:00"},{"id":"","destination_id":1,"name":"La Almudena","idApi":"poi:25651078","location":{"lat":40.4207077,"lng":-3.632674},"duration":3600,"photo":null,"description":null,"startDate":"2020-01-10 16:00:00"},{"id":"","destination_id":1,"name":"Centro El Horno","idApi":"poi:11694109","location":{"lat":40.411062,"lng":-3.704477},"duration":7200,"photo":null,"description":null,"startDate":"2020-01-11 10:00:00"},{"id":"","destination_id":1,"name":"Complejo Deportivo Somontes","idApi":"poi:5138537","location":{"lat":40.49201,"lng":-3.7569749},"duration":3600,"photo":null,"description":null,"startDate":"2020-01-11 16:00:00"},{"id":"","destination_id":1,"name":"Centro Comercial La Ermita","idApi":"poi:5187239","location":{"lat":40.4069885,"lng":-3.7258894},"duration":5400,"photo":null,"description":null,"startDate":"2020-01-12 10:00:00"},{"id":"","destination_id":1,"name":"Golf La Moraleja 2","idApi":"poi:5170289","location":{"lat":40.5042071,"lng":-3.6257291},"duration":14400,"photo":null,"description":null,"startDate":"2020-01-12 16:00:00"},{"id":"","destination_id":1,"name":"Golf Estudio","idApi":"poi:12756296","location":{"lat":40.468353,"lng":-3.6934014},"duration":14400,"photo":null,"description":null,"startDate":"2020-01-13 10:00:00"},{"id":"","destination_id":1,"name":"Club de Campo Villa de Madrid","idApi":"poi:5050258","location":{"lat":40.4513802,"lng":-3.7533283},"duration":14400,"photo":null,"description":null,"startDate":"2020-01-13 16:00:00"}],"itinerary_id":1}};
    this.actualItinerary = this.res;
    this.summary = true; // Default
    this.timeline = false;
    this.map = false;
  }

  estado(estado: string) {
    switch(estado) {
      case 'summary' : {
        this.summary = true;
        this.timeline = false;
        this.map = false;
        break
      }
      case 'timeline' : {
        this.summary = false;
        this.timeline = true;
        this.map = false;
        break
      }
      case 'map' : {
        this.summary = false;
        this.timeline = false;
        this.map = true;
        break
      }
    }
  }

  ngOnInit() {
    /* this._route.params.subscribe(params => {
      if(params['id'] == 'new') {
        this.new = true;
        this._itineraryService.createNewItinerary().subscribe(
          response => {

            // this.actualItinerary = this._itineraryService.responseToObject(response);
            this.actualItinerary = response;
            this.new = false;
            console.log(this.actualItinerary);
          },
          error => {
            console.log(<any>error);
          }
        );
      } else {
        let regex = new RegExp('/^\d+$/');
        if (regex.test(params['id'])) {
          // Busca el itinerario con id LUEGO
        }
      }
    }); */
  }

}
