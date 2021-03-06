// Creating map object
var myMap = L.map("map", {
    center: [41.87, -87.62],
    zoom: 11
  });
  
  // Adding tile layer to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Store API query variables
  var baseURL = "https://data.cityofchicago.org/resource/4ijn-s7e5.json?";
  var date = "$where=inspection_date between '2018-01-01' and '2020-06-01'";
  var complaint = "&inspection_type=Complaint";
  var results = "&results=Fail";
  var limit = "&$limit=10000";
  
  // Assemble API query URL
  var url = baseURL + date + complaint + results + limit;
  
  // Grab the data with d3
  d3.json(url).then( 
    function(response) {
  
    // Create a new marker cluster group
    var markers = L.markerClusterGroup();
  
    // Loop through data
    for (var i = 0; i < response.length; i++) {
  
      // Set the data location property to a variable
      var location = response[i].location;
  
      // Check for location property
      if (location) {
  
        // Add a new marker to the cluster group and bind a pop-up
        markers.addLayer(L.marker(
          [+location.latitude, +location.longitude]) //long and lat need to be numbers, not strings
          .bindPopup(response[i].aka_name));
      }
      
  
    }
    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
  
  });