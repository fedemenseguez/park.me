import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import firebase from 'firebase';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'view';
  @ViewChild('map', { static: false }) mapElement: ElementRef;

  infowindow: any;
  map: any;
  marker: any;
  currentPosition: any;
  slotMarkers: any = {};
  config = {
    apiKey: 'AIzaSyAuJ8u4qfLZIursyt0_-auisQvFezm1fi0',
    authDomain: 'parkme-445d3.firebaseapp.com',
    databaseURL: 'https://parkme-445d3-default-rtdb.firebaseio.com/',
    projectId: 'parkme-445d3',
    storageBucket: 'parkme-445d3.appspot.com',
    messagingSenderId: '960866532925',
    appId: '1:960866532925:web:1f099b456759cf51963454',
    measurementId: 'G-3XEFMBDFKR',
  };

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  icons = {
    parking: 'http://maps.google.com/mapfiles/kml/paddle/grn-blank.png',
    car:
      'http://earth.google.com/images/kml-icons/track-directional/track-0.png',
  };

  constructor() {
    this.initMap();
  }

  ngOnInit(): void {}

  initMap() {
    // this.map = new google.maps.Map(document.getElementById('map'), {
    //   center: { lat: 0, lng: 0 },
    //   zoom: 18,
    //   styles: [
    //     {
    //       featureType: 'poi',
    //       stylers: [{ visibility: 'off' }], // Turn off POI.
    //     },
    //     {
    //       featureType: 'transit.station',
    //       stylers: [{ visibility: 'off' }], // Turn off bus, train stations etc.
    //     },
    //   ],
    //   disableDoubleClickZoom: true,
    //   streetViewControl: false,
    // });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          center: this.currentPosition,
          zoom: 16,
          styles: [
            {
              featureType: 'poi',
              stylers: [{ visibility: 'off' }], // Turn off POI.
            },
            {
              featureType: 'transit.station',
              stylers: [{ visibility: 'off' }], // Turn off bus, train stations etc.
            },
          ],
          disableDoubleClickZoom: false,          
          streetViewControl: false,
        });

        this.infowindow = new google.maps.InfoWindow();
        var infoBoxDiv = document.createElement('div');
        this.makeInfoBox(infoBoxDiv, this.map);
        this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
          infoBoxDiv
        );

        this.map.setCenter(this.currentPosition);
        const z = new google.maps.Marker({
          position: new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          ),
          icon: this.icons.car,
          map: this.map,
        });

        this.map.addListener('click', (e: any) => {
          const data = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          };
          this.addToFirebase(data);
        });
      },
      (error) => {
        console.log(error);
      },
      this.options
    );

    var slots = firebase.database().ref('slots');
    slots.once('value').then((snapshot) => {
      snapshot.forEach((data: any) => {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(data.val().lat, data.val().lng),
          icon: this.icons.parking,
          map: this.map,
          remoteKey: data.key,
        });
        this.slotMarkers[data.key] = marker;
        this.removeSlotHandler(this.map, this.infowindow, marker);
      });
    });
  }

  makeInfoBox(controlDiv: any, map: any) {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '2px';
    controlUI.style.marginBottom = '22px';
    controlUI.style.marginTop = '10px';
    controlUI.style.textAlign = 'center';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    // var controlText = document.createElement('div');
    // controlText.style.color = 'rgb(25,25,25)';
    // controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    // controlText.style.fontSize = '100%';
    // controlText.style.padding = '10px';
    // controlText.textContent = 'Selecciona algun estacionamiento disponible';
    // controlUI.appendChild(controlText);
  }

  // getTimestamp(addClick: any) {
  //   // Reference to location for saving the last click time.
  //   var ref = firebase.database().ref('last_message/' + data.sender);

  //   ref.onDisconnect().remove(); // Delete reference from firebase on disconnect.

  //   // Set value to timestamp.
  //   ref.set(firebase.database.ServerValue.TIMESTAMP, function (err) {
  //     if (err) {
  //       // Write to last message was unsuccessful.
  //       console.log(err);
  //     } else {
  //       // Write to last message was successful.
  //       ref.once(
  //         'value',
  //         function (snap) {
  //           addClick(snap.val()); // Add click with same timestamp.
  //         },
  //         function (err) {
  //           console.warn(err);
  //         }
  //       );
  //     }
  //   });
  // }

  addToFirebase(data: any) {
    // this.getTimestamp((timestamp: any) => {
    // Add the new timestamp to the record data.
    // data.timestamp = timestamp;
    var ref = firebase
      .database()
      .ref('slots')
      .push(data, function (err) {
        if (err) {
          // Data was not written to firebase.
          console.warn(err);
        }
      });
    // });
  }

  /**
   * Creates a map object with a click listener and a heatmap.
   */
  // initMap() {
  //   var map = new google.maps.Map(document.getElementById('map'), {
  //     center: { lat: 0, lng: 0 },
  //     zoom: 18,
  //     styles: [
  //       {
  //         featureType: 'poi',
  //         stylers: [{ visibility: 'off' }], // Turn off POI.
  //       },
  //       {
  //         featureType: 'transit.station',
  //         stylers: [{ visibility: 'off' }], // Turn off bus, train stations etc.
  //       },
  //     ],
  //     disableDoubleClickZoom: true,
  //     streetViewControl: false,
  //   });

  //   // Create the DIV to hold the control and call the makeInfoBox() constructor passing in this DIV.
  //   let infoWindow = new google.maps.InfoWindow();
  //   var infoBoxDiv = document.createElement('div');
  //   makeInfoBox(infoBoxDiv, map);
  //   map.controls[google.maps.ControlPosition.TOP_CENTER].push(infoBoxDiv);

  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         currentPosition = {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         };
  //         map.setCenter(currentPosition);
  //         const marker = new google.maps.Marker({
  //           position: new google.maps.LatLng(
  //             position.coords.latitude,
  //             position.coords.longitude
  //           ),
  //           icon: icons.car,
  //           map: map,
  //         });
  //       },
  //       () => {
  //         handleLocationError(true, infoWindows, map.getCenter());
  //       }
  //     );
  //   }

  //   var slots = firebase.database().ref('slots');
  //   slots.once('value').then((snapshot) => {
  //     snapshot.forEach(function (data) {
  //       const marker = new google.maps.Marker({
  //         position: new google.maps.LatLng(data.val().lat, data.val().lng),
  //         icon: icons.parking,
  //         map: map,
  //         remoteKey: data.key,
  //       });
  //       slotMarkers[data.key] = marker;
  //       removeSlotHandler(map, infoWindow, marker);
  //     });
  //   });

  //   // // Listen for clicks and add the location of the click to firebase.
  //   // map.addListener('click', function(e) {
  //   //     const data = {};
  //   //     data.lat = e.latLng.lat();
  //   //     data.lng = e.latLng.lng();
  //   //     addToFirebase(data);
  //   // });
  // }

  removeSlotHandler(map: any, infowindow: any, marker: any) {
    google.maps.event.addListener(marker, 'click', () => {
      var button = document.createElement('button');
      button.innerHTML = 'Estacionar aqu&iacute;';
      button.classList.add('btn');
      button.classList.add('btn-success');
      button.addEventListener('click', () => {
        marker.setMap(null);
        delete this.slotMarkers[marker.remoteKey];
        firebase.database().ref(`slots/${marker.remoteKey}`).remove();
      });
      infowindow.setContent(button);
      infowindow.open(map, marker);
    });
  }
}
