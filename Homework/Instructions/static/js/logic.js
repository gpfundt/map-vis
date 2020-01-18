// Create a map using Leaflet that plots all of the earthquakes from your data set 
// based on their longitude and latitude.

// * Your data markers should reflect the magnitude of the earthquake in their size 
// and color. Earthquakes with higher magnitudes should appear larger and darker in 
// color.

// * Include popups that provide additional information about the earthquake when a 
// marker is clicked.

// * Create a legend that will provide context for your map data.

// * Your visualization should look something like the map above.


url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
API_KEY = "pk.eyJ1IjoiZ3BmdW5kdDMiLCJhIjoiY2s1aXc5aDUzMGo0ODNrbXNndnlyZHFtNyJ9.YWGks_INxxA82dgB6gRLoA";


var myMap = L.map('map', {
    center: [49,-66],
    zoom: 3
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

d3.json(url, function(data){
    buildMap(data)

function buildMap(data){
    L.geoJSON(data, {
        style: function (feature) {
            return {color: feature.properties.mag};
        }
    }).bindPopup(function (layer) {
        console.log(layer.feature.properties.mag)
        return layer.feature.properties.mag;
    }).addTo(myMap);
};
});