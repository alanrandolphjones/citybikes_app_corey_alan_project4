// Google Maps Javascript API key: AIzaSyBNBO04zSveUymLn4nS5LYIVCRPTc2zMLk


const app = {};

app.loadMarkers = () => {

    //Call Watch position and turn position into a marker


    navigator.geolocation.watchPosition(function (position) {

        const latit = position.coords.latitude

        const longit = position.coords.longitude

        const home = new google.maps.Marker({
            position: new google.maps.LatLng(latit, longit),
            map: app.map, // notice how we pass it the map we made earlier? This is how it knows which map to put the marker on
            icon: 'your_location_marker.png'

        })

    })

}

app.loadMap = function () {
    // Call current location, then input the position into a map object

    navigator.geolocation.getCurrentPosition(function (position) {

        const latit = position.coords.latitude

        const longit = position.coords.longitude

        const mapOptions = {
            center: { lat: latit, lng: longit },
            zoom: 17
        }

        const $mapDiv = $('#map')[0]

        app.map = new google.maps.Map($mapDiv, mapOptions);

        app.loadMarkers()
    
    })

}

$(function () {
    // 4. call load map when the document is ready
    app.loadMap();
});