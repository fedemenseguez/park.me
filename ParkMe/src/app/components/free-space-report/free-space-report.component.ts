import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FreeSpaceReportingService } from 'src/app/services/free-space-reporting.service';
('@angular/core');

declare var google: any;
@Component({
  selector: 'app-free-space-report',
  templateUrl: './free-space-report.component.html',
  styleUrls: ['./free-space-report.component.css'],
})
export class FreeSpaceReportComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef | undefined;
  map: google.maps.Map | undefined;
  geocoder: google.maps.Geocoder | undefined;
  lat = -31.4066574;
  lng = -64.2069805;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 13,
  };
  locationSet = false;

  constructor(readonly freeSpaceReportingService: FreeSpaceReportingService) {}

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap?.nativeElement, this.mapOptions);
    this.geocoder = new google.maps.Geocoder();
  }

  addMarker(address: any) {
    console.log(address);
    this.geocoder?.geocode({ address: address }, (results, status) => {
      console.log(results);
      console.log(status);
      var latLng = {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng(),
      };
      console.log(latLng);
      if (status == 'OK') {
        this.map?.setCenter(results[0].geometry.location);
        this.map?.setZoom(16);
        this.locationSet = true;
        new google.maps.Marker({
          map: this.map,
          position: results[0].geometry.location,
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  geocodeAddress(
    geocoder: google.maps.Geocoder,
    resultsMap: google.maps.Map
  ) {
    const address = (document.getElementById("address") as HTMLInputElement)
      .value;
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        resultsMap.setCenter(results[0].geometry.location);
        new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location,
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  searchPlace(form: NgForm) {
    this.addMarker(form.value.address);
  }

  submitFreeSpaceReport(form: NgForm) {
    this.freeSpaceReportingService.reportFreeSpace();
  }
}
