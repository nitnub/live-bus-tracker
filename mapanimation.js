L.mapbox.accessToken =
  'pk.eyJ1IjoibmJtYXBwZXIiLCJhIjoiY2w0YzN1aXJiMXJzdjNqcWl1Y2x0cmkzdSJ9.vPMwYi2_oF4ST-AC1xRDMQ';

// downtown Seattle lat/long
const latlng = L.latLng(47.6, -122.3);

// create map
const map = L.mapbox
  .map('map')
  .setView(latlng, 14)
  .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

// create array to store references to all current markers
const currentMarkers = [];

// get handle on routes selector
const routes = document.getElementById('routes');
routes.addEventListener('change', () => {
  const selected = routes.value;
  console.log(selected);
  const currentRoute = getRoute(selected, allRoutes);

  if (currentMarkers.length >= 0) {
    for (let i = 0; i < currentMarkers.length; i++) {
      currentMarkers[i].remove();
    }
  }

  addStopsToMap(currentRoute);
});

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
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
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

function getBusMarkers() {}
