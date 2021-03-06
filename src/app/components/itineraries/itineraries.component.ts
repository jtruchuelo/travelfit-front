import { Component, OnInit } from '@angular/core';
import { Itinerary } from '../../models/itinerary';
import { ItineraryService } from '../../services/itinerary.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'itineraries',
  templateUrl: './itineraries.component.html',
  styleUrls: ['./itineraries.component.css'],
  providers: [UserService],
})

export class ItinerariesComponent implements OnInit {

  public pageTitle: string;
  public itineraries: Array<Itinerary>;
  public userToken;
  public identity;

  constructor(
    private _itineraryService: ItineraryService,
    private _userService: UserService,
  ) {
    this.pageTitle = 'Itinerarios de viaje';
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.getItineraries();
  }

  calculateDays(itinerary:Itinerary): number {
    let a = new Date (itinerary.startDate);
    let b = new Date (itinerary.endDate);
    let difference = b.getTime() - a.getTime();
    return difference / (1000 * 3600 * 24);
  }

  getItineraries(){
    this._itineraryService.getItineraries().subscribe(
      response => {
        if (response.data.status == 'success') {
          this.itineraries = response.data.itineraries;
          // console.log(this.itineraries);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
