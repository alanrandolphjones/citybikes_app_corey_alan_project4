// Google Maps Javascript API key: AIzaSyBNBO04zSveUymLn4nS5LYIVCRPTc2zMLk


const app = {};

app.events = () => {

    const locationPromise = new Promise((resolve, reject) => {
        navigator.geolocation.watchPosition(function (pos) {

            resolve(pos);

        })
    })

    locationPromise.then((pos) => {

        const lat1 = pos.coords.latitude

        const lng1 = pos.coords.longitude

        app.getMap(lat1, lng1)

        app.getMarkers(lat1, lng1)

    })

}

const cityBikesURL = 'http://api.citybik.es/v2/networks/bixi-toronto';

app.getLocations = () => {
    $.ajax({
        url: cityBikesURL,
        method: 'GET',
        dataType: 'json',
        data: {
            'fields': 'stations'
        }
    }).then((res) => {
        const stations = res.network.stations;
        app.setLocations(stations);
    });
}

app.setLocations = (stations) => {
    console.log(stations);
    stations.forEach((location) => {
        app.markers = new google.maps.Marker({
            position: new google.maps.LatLng(location.latitude, location.longitude),
            map: app.map,
            icon: 'your_location_marker.png'
        });

        console.log(app.markers);
    });
}

app.getMarkers = (lat1, lng1) => {

    app.home = new google.maps.Marker({
        position: new google.maps.LatLng(lat1, lng1),
        map: app.map, // notice how we pass it the map we made earlier? This is how it knows which map to put the marker on
        icon: 'your_location_marker.png'
    });
}

app.getMap = function (lat1, lng1) {
    // Call current location, then input the position into a map object
    const mapOptions = {
        center: { lat: lat1, lng: lng1 },
        zoom: 17
    }

    const $mapDiv = $('#map')[0]

    app.map = new google.maps.Map($mapDiv, mapOptions);
    app.getLocations();
}


app.init = () => {
    app.events()
}

$(function () {
    // 4. call load map when the document is ready
    app.init()
});