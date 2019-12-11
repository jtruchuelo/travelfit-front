import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-itineraries',
  templateUrl: './my-itineraries.component.html',
  styleUrls: ['./my-itineraries.component.css']
})
export class MyItinerariesComponent implements OnInit {

  public pageTitle: string;

  constructor() {
    this.pageTitle = 'Mis Itinerarios'
  }

  ngOnInit() {
  }

}
