import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewItineraryService } from '../../services/new.itinerary.service';
import { Itinerary } from 'src/app/models/itinerary';
import { ItinerarySummaryComponent } from '../itinerary-summary/itinerary-summary.component';
import { ItineraryMapComponent } from '../itinerary-map/itinerary-map.component';
import { ItineraryTimelineComponent } from '../itinerary-timeline/itinerary-timeline.component';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { ItineraryService } from '../../services/itinerary.service';


@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css'],
  providers: [UserService, ItineraryService],
})


export class ItineraryComponent implements OnInit {

  private userToken;
  private identity;

  private new: boolean;
  private loading: boolean;
  private modifyEnable: boolean;
  public summary: boolean;
  public timeline: boolean;
  public map: boolean;
  public actualItinerary: Itinerary;
  public status;
  public statusItinerary;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _newItineraryService: NewItineraryService,
    private _itineraryService: ItineraryService,
    private _userService: UserService,
  ) {
    this.new = false;
    this.loading = true;
    this.summary = true; // Default
    this.timeline = false;
    this.map = false;
    this.modifyEnable = true;
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

  setActualItinerary(itinerary, save) {
    // console.log (itinerary);
    if (itinerary !== this.actualItinerary) {
        this.actualItinerary = itinerary;
        if (this.userToken && save){
          this._itineraryService.saveItineraryUser(this.actualItinerary, this.userToken).subscribe(
            response => {
              console.log("guardado!");
            },
            error => {
              console.log(<any>error);
            }
          );
        }
    }
  }

  ngOnInit() {
    this.userToken = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this._route.params.subscribe(params => {
      if(params['id'] == 'new') {
        this.new = true;
        this.modifyEnable = false;
        this._newItineraryService.createNewItinerary().subscribe(
          response => {
            // this.actualItinerary = this._newItineraryService.responseToObject(response);
            this.setActualItinerary(response, true);
            this.new = false;
            this.loading = false;
          },
          error => {
            console.log(<any>error);
          }
        );
      } else {
        let regex = new RegExp('^\\d+$');
        if (regex.test(params['id'])) {
          this.new = false;
          if (this.userToken && params['user'] == this.identity.user_id) {
            this._itineraryService.getItinerary(params['id'], this.identity.user_id, this.userToken).subscribe(
              response => {
                let tempItinerary = response['itinerary'];
                let tempDestination = response['itinerary']['destinations'][0];
                tempItinerary['destinations'] = tempDestination;
                this.setActualItinerary(tempItinerary, false);
                this.modifyEnable = true;
                this.loading = false;
              },
              error => {
                console.log(<any>error);
              }
            );
          } else {
            this._itineraryService.getItinerary(params['id']).subscribe(
              response => {
                let tempItinerary = response['itinerary'];
                let tempDestination = response['itinerary']['destinations'][0];
                tempItinerary['destinations'] = tempDestination;
                this.setActualItinerary(tempItinerary, false);
                this.modifyEnable = false;
                this.loading = false;
              },
              error => {
                console.log(<any>error);
              }
            );
          }
        }
      }
    });
  }

  deleteItinerary(itinerary: Itinerary) {
    this._itineraryService.deleteItinerary(itinerary, this.userToken).subscribe(
      response => {
        $('#editModal').modal('hide');
        this._router.navigate(['myItineraries']);
      },
      error => {
        this.statusItinerary = 'error';
        console.log (<any>error);
      }
    );

  }

  onSubmit(form) {
    this._itineraryService.updateItinerary(this.actualItinerary, this.userToken).subscribe(
      response => {
        this.status = 'success';
      },
      error => {
        this.status = 'error';
        console.log (<any>error);
      }
    );
  }
}
