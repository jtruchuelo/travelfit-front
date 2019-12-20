import { Component, OnInit } from '@angular/core';
import { Itinerary } from '../../models/itinerary';
import { ItineraryService } from '../../services/itinerary.service';

@Component({
  selector: 'itineraries',
  templateUrl: './itineraries.component.html',
  styleUrls: ['./itineraries.component.css'],
  providers: [ItineraryService]
})

export class ItinerariesComponent implements OnInit {

  public pageTitle: string;
  public itineraries: Array<Itinerary>;

  constructor(
    private _itineraryService: ItineraryService
  ) {
    this.pageTitle = 'Itinerarios de viaje';
  }

  ngOnInit() {
    this.getItineraries();
  }

  getItineraries(){
    this._itineraryService.getItineraries().subscribe(
      response => {
        if (response.data.status == 'success') {
          this.itineraries = response.data.itineraries;
          console.log(this.itineraries);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
