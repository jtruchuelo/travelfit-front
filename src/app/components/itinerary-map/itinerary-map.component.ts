import { Component, OnInit, Input } from '@angular/core';
import { Itinerary } from 'src/app/models/itinerary';
import * as L from 'leaflet';

@Component({
  selector: 'itinerary-map',
  templateUrl: './itinerary-map.component.html',
  styleUrls: ['./itinerary-map.component.css']
})
export class ItineraryMapComponent implements OnInit {

  @Input('itinerary') itinerary: Itinerary;
  public options;
  public listado;
  public dayNumber;
  public mymap;
  public layerGroupMap;

  constructor() {}

  ngOnInit() {
    this.listado = this.getDaysLocations(this.itinerary);
    this.dayNumber = this.listado.keys().next().value;

    // Mapa
    let center = [this.itinerary.destinations['location']['lat']];
    center.push(this.itinerary.destinations['location']['lng']);
    this.mymap = L.map('map', {
      center: L.latLng(center[0], center[1]),
      zoom: 14
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.mymap);
    this.setMarkers(this.dayNumber);
  }

  setMarkers(day) {
    let array = this.listado.get(day);
    let icon = new L.Icon.Default();
    icon.options.shadowSize = [0,0];
    let markers = [];
    if (typeof this.layerGroupMap == 'undefined') {
      this.layerGroupMap = L.layerGroup();
      this.layerGroupMap.addTo(this.mymap);
    } else {
      this.layerGroupMap.clearLayers();
    }
    for (let i=0; i<array.length; i+=2) {
      if (typeof array[i] === 'object') {
        markers[i] = L.marker([array[i]['lat'], array[i]['lng']], {icon : icon}).bindPopup(array[i+1]).addTo(this.layerGroupMap);
      } else {
        let temp = JSON.parse(array[i]);
        markers[i] = L.marker([temp['lat'], temp['lng']], {icon : icon}).bindPopup(array[i+1]).addTo(this.layerGroupMap);
      }
    }
    let group = new L.featureGroup();
    for (var i = 0; i < array.length; i+=2) {
      if (typeof array[i] === 'object') {
        L.marker( L.latLng(array[i]['lat'], array[i]['lng'])).addTo(group);
      } else {
        let temp = JSON.parse(array[i]);
        L.marker( L.latLng(temp['lat'], temp['lng'])).addTo(group);
      }
    }
    this.mymap.fitBounds(group.getBounds());
  }


  goToDay(number) {
    this.dayNumber = number;
    this.setMarkers(this.dayNumber);
  }

  asIsOrder(a, b) {
    return -1;
  }

  getDaysLocations(itinerary: Itinerary) {

    let pois = itinerary.destinations['pois'];
    let array = new Map;
    for (let poi of pois) {
      if (array.has(poi['startDate'].substring(8, 10).replace(/^0+/, ''))) {
        let temp = array.get(poi['startDate'].substring(8, 10).replace(/^0+/, ''));
        temp.push(poi['location'], poi['name']);
        array.set(poi['startDate'].substring(8, 10).replace(/^0+/, ''), temp);
      } else {
        array.set(poi['startDate'].substring(8, 10).replace(/^0+/, ''), [poi['location'], poi['name']]);
      }
    }
    // console.log(array);
    return array;
  }
}
