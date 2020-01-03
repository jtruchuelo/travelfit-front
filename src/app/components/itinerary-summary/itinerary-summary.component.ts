import { Component, OnInit, Input } from '@angular/core';
import { Itinerary } from 'src/app/models/itinerary';
import * as L from 'leaflet';
import { NgbDatepickerConfig, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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

  ngOnInit() {
    // Calendario
    let DateCalendar = new Date (this.itinerary.startDate);
    this.startDate = {year: DateCalendar.getFullYear(), month: DateCalendar.getMonth()+1};
    this.fromDate = new NgbDate(DateCalendar.getFullYear(), DateCalendar.getMonth()+1, DateCalendar.getDate());
    DateCalendar = new Date (this.itinerary.endDate);
    this.toDate = new NgbDate(DateCalendar.getFullYear(), DateCalendar.getMonth()+1, DateCalendar.getDate());

    // Mapa
    let icon = new L.Icon.Default();
    icon.options.shadowSize = [0,0];

    let position = [this.itinerary.destinations['location']['lat']];
    position.push(this.itinerary.destinations['location']['lng']);

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
