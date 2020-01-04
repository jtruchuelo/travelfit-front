import { Component, OnInit } from '@angular/core';
import { Itinerary } from '../../models/itinerary';
import { ItineraryService } from '../../services/itinerary.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'my-itineraries',
  templateUrl: './my-itineraries.component.html',
  styleUrls: ['./my-itineraries.component.css'],
  providers: [UserService]
})
export class MyItinerariesComponent implements OnInit {

  public pageTitle: string;
  public itineraries: Array<Itinerary>;
  public identity;
  public userToken;

  constructor(
    private _itineraryService: ItineraryService,
    private _userService: UserService
  ) {
    this.pageTitle = 'Mis Itinerarios'
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.userToken = this._userService.getToken();
    this.getMyItineraries();
  }

  calculateDays(itinerary:Itinerary): number {
    let a = new Date (itinerary.startDate);
    let b = new Date (itinerary.endDate);
    let difference = b.getTime() - a.getTime();
    return difference / (1000 * 3600 * 24);
  }

  getMyItineraries(){
    this._itineraryService.getMyItineraries(this.identity.user_id, this.userToken).subscribe(
      response => {
        if (response.data.status == 'success') {
          this.itineraries = response.data.itineraries;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
