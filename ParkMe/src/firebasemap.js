//AIzaSyCc-JEvXUfrQzDZaJ1ZZHQ8_7j02HazCtM

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

firebase.initializeApp(config);

/**
 * Data object to be written to Firebase.
 */
var data = { sender: null, timestamp: null, lat: null, lng: null };

function makeInfoBox(controlDiv, map) {
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
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '100%';
    controlText.style.padding = '10px';
    controlText.textContent =
        'Selecciona algun estacionamiento disponible';
    controlUI.appendChild(controlText);
}

/**
 * Creates a map object with a click listener and a heatmap.
 */
function initMap() {
debugger;
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 18,
        styles: [{
            featureType: 'poi',
            stylers: [{ visibility: 'off' }]  // Turn off POI.
        },
        {
            featureType: 'transit.station',
            stylers: [{ visibility: 'off' }]  // Turn off bus, train stations etc.
        }],
        disableDoubleClickZoom: true,
        streetViewControl: false,
    });

    // Create the DIV to hold the control and call the makeInfoBox() constructor passing in this DIV.
    let infoWindow = new google.maps.InfoWindow();
    var infoBoxDiv = document.createElement('div');
    makeInfoBox(infoBoxDiv, map);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(infoBoxDiv);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                infoWindow.setPosition(pos);
                infoWindow.setContent("Location found.");
                infoWindow.open(map);
                map.setCenter(pos);
            },
            () => {
                handleLocationError(true, infoWindows, map.getCenter());
            }
        );
    }
}
