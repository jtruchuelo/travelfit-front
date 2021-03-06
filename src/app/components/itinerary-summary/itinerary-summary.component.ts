import { Component, OnInit, Input } from '@angular/core';
import { Itinerary } from 'src/app/models/itinerary';
import * as L from 'leaflet';
import { NgbDatepickerConfig, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { positionElements } from '@ng-bootstrap/ng-bootstrap/util/positioning';

@Component({
  selector: 'itinerary-summary',
  templateUrl: './itinerary-summary.component.html',
  styleUrls: ['./itinerary-summary.component.css'],
  providers: [NgbDatepickerConfig]
})
export class ItinerarySummaryComponent implements OnInit {

  @Input('itinerary') itinerary: Itinerary;
  model: NgbDateStruct;
  fromDate: NgbDate;
  toDate: NgbDate;
  public options;
  startDate: any;

  constructor() {}

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && date.after(this.fromDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  onMapReady(map: L.Map) {
    setTimeout(() => {
      map.invalidateSize();
    }, 500);
  }

  calculateDays(itinerary:Itinerary): number {
    let a = new Date (itinerary.startDate);
    let b = new Date (itinerary.endDate);
    let difference = b.getTime() - a.getTime();
    return difference / (1000 * 3600 * 24);
  }

  ngOnInit() {
    // Calendario
    let dateCalendar = new Date (this.itinerary.startDate);
    this.startDate = {year: dateCalendar.getFullYear(), month: dateCalendar.getMonth()+1};
    this.fromDate = new NgbDate(dateCalendar.getFullYear(), dateCalendar.getMonth()+1, dateCalendar.getDate());
    dateCalendar = new Date (this.itinerary.endDate);
    this.toDate = new NgbDate(dateCalendar.getFullYear(), dateCalendar.getMonth()+1, dateCalendar.getDate());

    // Mapa
    let icon = new L.Icon.Default();
    icon.options.shadowSize = [0,0];

    let position;
    if (typeof this.itinerary.destinations['location'] === 'object') {
      position = [this.itinerary.destinations['location']['lat']];
      position.push(this.itinerary.destinations['location']['lng']);
    } else {
      let temp = JSON.parse(this.itinerary.destinations['location']);
      position = [temp['lat']];
      position.push(temp['lng']);
    }

    this.options = {
      layers: [
        L.marker([position[0], position[1]], {icon : icon}),
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'OpenStreetMaps' }),
      ],
      zoom: 14,
      center: L.latLng(position[0], position[1])
    };
  }

}
