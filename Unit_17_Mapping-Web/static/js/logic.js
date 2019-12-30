// Store our API endpoint as URL
var URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Use XMLHttpRequest function to make HTTP. https://javascript.info/xmlhttprequest
var queryUrl = new XMLHttpRequest(); 

// Perform a GET request to the query URL
queryUrl.open("GET",URL,false);
queryUrl.send(null);
queryUrl.responseText

// parse the JSON string, constructing the JavaScript object
var quake_json = JSON.parse(queryUrl.responseText);

// Define variables for our base layers
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var emeraldmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.emerald",
  accessToken: API_KEY
});

// Create a baseMaps object
var baseMaps = {
  "Street Map": streetmap,
  "Light Map": lightmap,
  "Outdoors Map": emeraldmap
};

// Define a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
  layers: emeraldmap
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps).addTo(myMap);


//markersize
function markerSize(num) {
  return num;
}

// set the color array for magnitudes based on USGS standard for Shaking Intensity
var colors = ['white','blue','green','yellow','orange','red']

// Loop through the quake_json object and create one marker for each earthquake
for (var i = 0; i < quake_json.features.length; i++) {
  var feature = quake_json.features[i];
  var loc = feature.geometry.coordinates;
  var magnitude = feature.properties.mag;
  var depth = feature.geometry.coordinates[2];

  // assign colored markers for the earth quakes,
  if (magnitude < 1){
    col = colors[0]
  } else if (magnitude >= 1 && magnitude < 2){
    col = colors[1]
  } else if (magnitude >= 2 && magnitude < 3){
    col = colors[2]
  } else if (magnitude >= 3 && magnitude < 4){
    col = colors[3]
  } else if (magnitude >= 4 && magnitude < 5){
    col = colors[4]
  } else {
    col = colors[5]
  }

  // Add circle markers to map
  L.circleMarker([loc[1], loc[0]], {
    fillOpacity: .6,
    color: "black",
    fillColor: col,
    weight: .5,
    radius: markerSize(magnitude)
  })
  // bind a popup containing magnitude, depth, time and color code based on magnitude
  .bindPopup("<h3>Magnitude : " + magnitude + "</h3>"+"<strong>Depth: </strong>" + depth + ' kilometers'+
      '<br>'+new Date(feature.properties.time) )
  .addTo(myMap);
}

// set up the legend in the lower right of the map 
//adopted from:https://gis.stackexchange.com/questions/133630/adding-leaflet-legend

var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
      
        magnitude = [0,1,2,3,4,5];
        div.innerHTML = '<h3>Earthquake<br>Magnitude</h3>'

    // loop through the magnitude and assign colors
    for (var i = 0; i < magnitude.length; i++) {
      div.innerHTML +=
          '<i class="legend" style="background:' + colors[i] + '; color:' + colors[i] + ';">....</i> ' +
          magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '++');
  }
  return div;
};

legend.addTo(myMap);