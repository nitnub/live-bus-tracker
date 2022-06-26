//
// Seattle JS
//

// create array to store references to all current markers
const currentMarkers = [];

// downtown Seattle lat/long
const latlng = L.latLng(47.61, -122.32);

// create map
let map;

function populateMap() {
  // get user key
  const userKey = document.getElementById('mapbox-key');
  L.mapbox.accessToken = userKey.value;

  // create map
  try {
    map = L.mapbox
      .map('map')
      .setView(latlng, 14)
      .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
  } catch (error) {
    // if user resubmits a key, refresh dropdown with starter route selected.
    routes.value = '102576';
  }
  // Set initial markers
  const starterRoute = getRoute('102576', allRoutes);

  if (currentMarkers.length >= 0) {
    for (let i = 0; i < currentMarkers.length; i++) {
      currentMarkers[i].remove();
    }
  }

  addStopsToMap(starterRoute);
}

// get handle on routes selector
try {const routes = document.getElementById('routes');

routes.addEventListener('change', () => {
  const selected = routes.value;
  const currentRoute = getRoute(selected, allRoutes);

  if (currentMarkers.length >= 0) {
    for (let i = 0; i < currentMarkers.length; i++) {
      currentMarkers[i].remove();
    }
  }

  addStopsToMap(currentRoute);
});
} catch(err) {

}

function getRoute(id, routes) {
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].route == id) {
      return routes[i];
    }
  }
  return 0;
}

function addStopsToMap(route) {
  const stopList = route.stops;

  for (let i = 0; i < stopList.length; i++) {
    createMarker(stopList[i]);
  }
}

// custom bus stop icon courtesy of https://www.flaticon.com/authors/mavadee
const myIcon = L.icon({
  iconUrl: 'icons/bus-stop-blue.png',
  iconSize: [38, 38],
});

// custom bus stop icon courtesy of https://www.freepik.com
const busIcon = L.icon({
  iconUrl: 'icons/bus.png',
  iconSize: [38, 38],
});

function createMarker(stop) {
  const { id, intersection, latitude, longitude } = stop;
  const marker = L.marker(new L.LatLng(latitude, longitude), {
    icon: myIcon,
    title: intersection,
  });
  marker.bindPopup(intersection).addTo(map);
  currentMarkers.push(marker);
}


//
// Boston JS
//

async function run() {
  // Get user's Mapbox key
  const userKey = document.getElementById('mapbox-key');
  mapboxgl.accessToken = userKey.value;
  console.log(userKey.value);

  // Create Boston Map
  const bostonMap = new mapboxgl.Map({
    container: 'boston-map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.104081, 42.365554],
    zoom: 14,
  });

  // Create an array to hold references to all current Boston markers
  const bostonMarkers = [];
  
  updateBusData(bostonMap, bostonMarkers);
  setInterval(() => {
    updateBusData(bostonMap, bostonMarkers);
  }, 10000);
}

// Request bus data from MBTA
async function getBusLocations() {
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}

// get bus data
async function updateBusData(targetMap, targetMarkers) {
  clearMarkers(targetMarkers);
  const locations = await getBusLocations();

  const len = await locations.length;

  for (let i = 0; i < len; i++) {
    const bus = locations[i];
    const lat = bus.attributes.latitude;
    const lon = bus.attributes.longitude;
    const busId = bus.attributes.label;
    const status = bus.attributes.current_status;
    console.log(bus);
    console.log(lon);
    console.log(lat);

    // Create a DOM element for each marker.
    const busDiv = document.createElement('div');
    const width = 38;
    const height = 38;
    busDiv.className = 'marker';
    busDiv.style.backgroundImage = "url('icons/bus.png')";
    busDiv.style.width = `${width}px`;
    busDiv.style.height = `${height}px`;
    busDiv.style.backgroundSize = '100%';
    busDiv.title = `Bus ${busId}`;

    busDiv.addEventListener('click', () => {
      window.alert(`Bus ${busId}`);
    });

    // Add markers to the map.
    new mapboxgl.Marker(busDiv).setLngLat([lon, lat]).addTo(targetMap);
    targetMarkers.push(busDiv);
  }
}

function clearMarkers(markerArray) {
  console.log('test');
  console.log('Length is = ', markerArray.length);
  if (markerArray.length >= 0) {
    for (let i = 0; i < markerArray.length; i++) {
      markerArray[i].remove();
    }
  }
  console.log(markerArray);
}
