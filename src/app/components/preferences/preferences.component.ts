import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewItineraryService } from '../../services/new.itinerary.service';

@Component({
  selector: 'preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  public pageTitle: string;
  public status: boolean;

  private categories = {
    "discovering": false,
    "hiking": false,
    "playing": false,
    "shopping": false,
    "sightseeing": false,
    "doing_sports": false
  }

  constructor(
    private _router: Router,
    private _itineraryService: NewItineraryService
  ) {
    this.pageTitle = 'Preferencias';
    this.status = true;
  }

  ngOnInit() {

  }

  onSubmit(form) {
    this._itineraryService.setCategoriesNewItinerary(this.categories);
    if(this.status = this._itineraryService.check() && this.status == true) {
      this._router.navigate(['itinerary/new']);
    };
  }
}
