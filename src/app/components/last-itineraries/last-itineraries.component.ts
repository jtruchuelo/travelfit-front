import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Itinerary } from '../../models/itinerary';
import { ItineraryService } from '../../services/itinerary.service';

@Component({
  selector: 'last-itineraries',
  templateUrl: './last-itineraries.component.html',
  styleUrls: ['./last-itineraries.component.css'],
  providers: [UserService],
})
export class LastItinerariesComponent implements OnInit {

  public identity;
  public lastItineraries: Array<Itinerary>;

  constructor(
    private _userService: UserService,
    private _itineraryService: ItineraryService,
  ) { }

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

  getItineraries() {
    this._itineraryService.getItineraries().subscribe(
      response => {
        if (response.data.status == 'success') {
           let temp: Array<Itinerary>= [];
           for (let i = 0; i < 4; i++) {
             temp.push(response.data.itineraries[i]);

          }
          this.lastItineraries = temp;
          console.log(this.lastItineraries);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
