import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Geocoder } from '@maptiler/geocoder';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NewItineraryService } from '../../services/new.itinerary.service';
import { LastItinerariesComponent } from '../last-itineraries/last-itineraries.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

  @Input() point; city;

  public pageTitle: string;
  public geocoder;

  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private _router: Router,
    private _itineraryService: NewItineraryService,
  ) {
    this.pageTitle = 'Inicio';
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  dataChanged() {
    this.geocoder.on('select', (results)=>{
      this.point = results.center;
      this.city = results.text;
    });
  }

  onSubmit(form) {
    console.log("Adelante!");
    this._itineraryService.startNewItinerary(
      this.point,
      this.city,
      this.formatter.format(this.fromDate),
      this.formatter.format(this.toDate)
    );
    this._router.navigate(['preferences']);
  }

  ngOnInit() {
    this.geocoder = new Geocoder({
      key: 'x4ynnUXPe58SmIAXAHBz',
      input: document.getElementById('city')
    });
    this.geocoder.setLanguage('es');
    this.geocoder.geocode('city');
    this.city = '';
    this.point = null;
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

}
