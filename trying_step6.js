window.onload = function(){
alert('If you would like to use your current location as your starting point please type in the latitude and longitude into the start box and press enter.');
}; 
//locate button runs the location method and then adds to map
L.easyButton('fas fa-map-marker-alt', function(){
  map.locate({setView: true});
}).addTo(map);

function onLocationFound(e) { 

  var radius = e.accuracy / 2; 

  L.marker(e.latlng).addTo(map)
    .bindPopup("<br/>Copy and paste the numbers below into the start to start from your location, press enter, and then click anywhere on the map to designate an end location or type in your final destination " + "<br/> " + e.latitude + ", " + e.longitude).openPopup();

  if (radius < 30) {
      L.circle(e.latlng, radius, {color: 'green'}).addTo(map);
  }
  else {
      L.circle(e.latlng, radius, {color: 'red'}).addTo(map);
    }
   
}

function onLocationError(e) {
  alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

//This specifies that the locate method should run
map.locate({
  setView: true, //this option centers the map on location and zooms
  maxZoom: 16, // this option prevents the map from zooming further than 16, maintaining some spatial context even if the accuracy of the location reading allows for closer zoom
  timeout: 15000, // this option specifies when the browser will stop attempting to get a fix on the device's location. Units are miliseconds. Change this to 15000 and test the change. Before you submit, change this to 15000.
  watch: false, // you can set this option from false to true to track a user's movement over time instead of just once. For our purposes, however, leave this option as is.
});