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
    this._route.params.subscribe(params => {
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
    });
  }

}
