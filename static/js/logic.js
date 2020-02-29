
url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
API_KEY = "pk.eyJ1IjoiZ3BmdW5kdDMiLCJhIjoiY2s1aXc5aDUzMGo0ODNrbXNndnlyZHFtNyJ9.YWGks_INxxA82dgB6gRLoA";

var myMap = L.map('map', {
    center: [49,-66],
    zoom: 1.6
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

d3.json(url, function(data){
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
        var color = "";
        if (Math.floor(feature.properties.mag) < 1) {
            color = "#90ee90"; //light green
        }
        else if (Math.floor(feature.properties.mag) < 2) {
            color = "green";
        }
        else if (Math.floor(feature.properties.mag) < 3) {
            color = "yellow";
        }
        else if (Math.floor(feature.properties.mag) < 4) {
            color = "orange";
        }
        else if (Math.floor(feature.properties.mag) < 5) {
            color = "red";
        }
        else if (Math.floor(feature.properties.mag) < 6) {
            color = "#5c0003"; //dark red
        }

        var circles = {
            radius: feature.properties.mag,
            color: color,
            weight: feature.properties.mag *5,
            opacity: 1,
            fillOpacity: .8}
            console.log(circles)
            return L.circleMarker(latlng, circles) 
            }

        }).addTo(myMap)
});