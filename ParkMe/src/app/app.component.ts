import { Component, } from '@angular/core';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAuJ8u4qfLZIursyt0_-auisQvFezm1fi0",
  authDomain: "parkme-445d3.firebaseapp.com",
  databaseURL: 'https://parkme-445d3-default-rtdb.firebaseio.com/',
  projectId: "parkme-445d3",
  storageBucket: "parkme-445d3.appspot.com",
  messagingSenderId: "960866532925",
  appId: "1:960866532925:web:1f099b456759cf51963454",
  measurementId: "G-3XEFMBDFKR"
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ParkMe';

  ngOnInit(): void {    
    firebase.initializeApp(config);
  }
}
