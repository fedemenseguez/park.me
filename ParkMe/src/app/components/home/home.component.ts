import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var google: any;
let map: any;
let marker: any;
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
let infowindow: any;
const iconBase = 'http://maps.google.com/mapfiles/ms/icons/';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title= "view"
  @ViewChild('map', {static: false}) mapElement: ElementRef;

  constructor() { 
    this.initMap();
  }

  ngOnInit(): void {
    
  }

  initMap() {
    navigator.geolocation.getCurrentPosition((location) => {
      map = new google.maps.Map(this.mapElement.nativeElement, {
        center: { lat: location.coords.latitude, lng: location.coords.longitude },
        zoom: 15
      });
  
      infowindow = new google.maps.InfoWindow();
  
  
      marker = new google.maps.Marker({
        position: { lat: location.coords.latitude, lng: location.coords.longitude },
        map,
        title: 'Click to zoom',
        icon: iconBase + 'blue-dot.png'
      });
  
      map.addListener('center_changed', () => {
        window.setTimeout(() => {
          map.panTo(marker.getPosition());
        }, 3000);
      });
  
      marker.addListener('click', (event: any) => {
        infowindow.setPosition(event.latLng);
        infowindow.setContent('<h2>Yes, I wanna be a donor!</h2>' +
        '<h3><a href="/add-donor/' + marker.getPosition().lat() + '/' + marker.getPosition().lng()  + '">Register Here</a></h3>');
        infowindow.open(map, marker);
      });
    }, (error) => {
      console.log(error);
    }, options);
  }
}
