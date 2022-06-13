// Sounds transit express line (C) route_id = 102576

// get distance between clicked location and stop

// objList = [
//   { name: 'South Lake Union Streetcar', route: 100340, stops: [] },
//   { name: 'A Line', route: 100512, stops: [] },
//   { name: 'B Line', route: 102548, stops: [] },
//   { name: 'C Line', route: 102576, stops: [] },
//   { name: 'D Line', route: 102581, stops: [] },
//   { name: 'E Line', route: 102615, stops: [] },
//   { name: 'F Line', route: 102619, stops: [] },
//   { name: 'First Hill Streetcar', route: 102638, stops: [] },
// ];

// Unique token for Nick. Delete.
// mapboxgl.accessToken =
L.mapbox.accessToken =
  'pk.eyJ1IjoibmJtYXBwZXIiLCJhIjoiY2w0OTVscThtMDB4MzNjbzUycGZ0ZHdvcyJ9.J2mT0VTSBDZuh5X4T2AQMA';

// this function creates a new map with a certain sto of properties as defined in the object parameter
// const map = new mapboxgl.Map({
//   container: 'map',
//   style: 'mapbox://styles/mapbox/streets-v11',
//   center: [-122.332, 47.606],
//   zoom: 14,
// });

const latlng = L.latLng(47.6, -122.3);
// below uses clusters
const map = L.mapbox
  .map('map')
  .setView(latlng, 14)
  .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

// let map = L.map('map', {
// 	center: [-122.332, 47.606],
// 	zoom: 12
// });
// map.addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'))
// .setView([-122.332, 47.606], 12)
// const map = L.map(box
//         .map('map')
//         .setView(, 12)
//         .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

// const markers = new L.MarkerClusterGroup();

const routes = document.getElementById('routes');
const currentMarkers = [];
routes.addEventListener('change', function () {
  // console.log(routes.value);
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

const testStops = [
  {
    id: 26705,
    intersection: 'Fairview Ave N & Aloha St',
    latitude: 47.6275864,
    longitude: -122.332207,
  },
  {
    id: 26680,
    intersection: 'Westlake Ave & Olive Way',
    latitude: 47.6132927,
    longitude: -122.337341,
  },
  {
    id: 26689,
    intersection: 'Westlake Ave & 7th Ave',
    latitude: 47.6156235,
    longitude: -122.337807,
  },
];

// console.log(stops)
function addStopsToMap(route) {
  const stopList = route.stops;

  for (let i = 0; i < stopList.length; i++) {
    // console.log(stopList[i])
    createMarker(stopList[i]);
  }
}
// addStopsToMap(currentRoute);

// let myroute = currentRoute.stops;
// console.log('myRoute:')
// console.log(myroute)
// console.log('testStops:')
// console.log(test)
// function func(selectedRoute) {
//   const stopList = selectedRoute.stops;
//   for (let i = 0; i < stopList.length; i++) {
//     console.log(testStops[i])
//     createMarker(stopList[i])
//   }
// }

// func(currentRoute);
const myIcon = L.icon({
  iconUrl: 'bus-stop.png',
  // iconRetinaUrl: 'my-icon@2x.png',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  // shadowUrl: 'my-icon-shadow.png',
  // shadowRetinaUrl: 'my-icon-shadow@2x.png',
  // shadowSize: [68, 95],
  // shadowAnchor: [22, 94]
});

function createMarker(stop) {
  // const a = chicago.data[i];
  const { id, intersection, latitude, longitude } = stop;
  const marker = L.marker(new L.LatLng(latitude, longitude), {
    // myIcon,
    icon: L.mapbox.marker.icon({
      'marker-symbol': 'post',
      'marker-color': '0044FF',
    }),
    title: intersection,
  });
  // marker.remove();

  marker.bindPopup(intersection).addTo(map);
  // markers.addLayer(marker);
  currentMarkers.push(marker);
}


function getBusMarkers() {
  
}



// function createMarker(stop) {
//   const { id, name, latitude, longitude } = stop;
//   const marker = new mapboxgl.Marker()
//   .setLngLat([longitude, latitude])
//   .addTo(map);
// }
