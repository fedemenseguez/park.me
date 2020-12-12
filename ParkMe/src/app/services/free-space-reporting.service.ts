import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FreeSpaceReportingService {

  reportFreeSpace(latLong: { lat: number, lng: number}): void {
    firebase.database().ref('slots').push(latLong, function(err) {
      if (err) {  // Data was not written to firebase.
        console.warn(err);
      }
    });
    alert('Reportado!')
  }
}
