import { Component, OnInit, Input } from '@angular/core';
import { Itinerary } from 'src/app/models/itinerary';

@Component({
  selector: 'itinerary-timeline',
  templateUrl: './itinerary-timeline.component.html',
  styleUrls: ['./itinerary-timeline.component.css']
})
export class ItineraryTimelineComponent implements OnInit {

  @Input('itinerary') itinerary: Itinerary;
  public pois;

  constructor() { }

  ngOnInit() {
    this.pois = this.getPois(this.itinerary.destinations['pois']);
  }

  asIsOrder(a, b) {
    return -1;
  }

  getPois(pois) {
    let array = new Map;
    for (let poi of pois) {
      if (array.has(poi['startDate'].substring(8, 10).replace(/^0+/, ''))) {
        let temp = array.get(poi['startDate'].substring(8, 10).replace(/^0+/, ''));
        temp.push(poi);
        array.set(poi['startDate'].substring(8, 10).replace(/^0+/, ''), temp);
      } else {
        array.set(poi['startDate'].substring(8, 10).replace(/^0+/, ''), [poi]);
      }
    }
    return array;
  }

  /* modifyPoi(key, poi) {
    console.log (poi);
    $('#modifyPoi').modal('toggle');
  }

  deletePoi(key, id) {
      console.log(key, id);
  } */

}
