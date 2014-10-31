///////////////////////////
// The location Categories
///////////////////////////////////////////
var cats = []

cats["ase"] = { desc: "Asie du Sud-Est", parent: null };
cats["ind"] = { desc: "Indonésie", parent: "ase" };
cats["mal"] = { desc: "Malaisie", parent: "ase" };
cats["phi"] = { desc: "Philippines", parent: "ase" };

////////////////////////////////////////////
// The locations
// The location key is the joomla article ID
////////////////////////////////////////////
var locations = [];

locations["1"] = {
	id: "1",
	title: "Anilao",
	desc: "Séjour chez <a href='http://www.clubocellaris.com/' target='_blank'>Cub Ocellaris</a>",
	lat: 13.755980,
	lng: 120.918013,
	year: 2014,
	cat: ["phi"]
};
locations["2"] = {
	id: "2",
	title: "Komodo",
	desc: "Croisière sur le Tidak Apa'Apa (<a href='http://komodosailing.com/' target='_blank'>Komodo Sailing</a>)",
	lat: -8.576795,
	lng: 119.658441,
	year: 2013,
	cat: ["ind"]
};

var markers = [];
var markerCluster = null;

function createMap(latitude, longitude, zoomValue)
{
    var mapOptions = {
      backgroundColor: 'transparent',
      center: { lat: latitude, lng: longitude },
      zoom: zoomValue,
      scrollwheel: false,
      overviewMapControl: true,
      overviewMapControlOptions: { opened: true },
      mapTypeControlOptions: {
        mapTypeIds: [
          google.maps.MapTypeId.HYBRID,
          google.maps.MapTypeId.SATELLITE,
          google.maps.MapTypeId.TERRAIN,
          google.maps.MapTypeId.ROADMAP
        ],
        style: google.maps.MapTypeControlStyle.DEFAULT
      },
      mapTypeId: google.maps.MapTypeId.HYBRID
    };

    var map = new google.maps.Map(
      document.getElementById('map-canvas'),
      mapOptions);
	
    return map;
}


function createMarker(loc)
{
  var myLatlng = new google.maps.LatLng(loc.lat, loc.lng);
  var marker = new google.maps.Marker({
    position: myLatlng,
    title: loc.title,
    icon: rootTemplate + "images/map/diver.png"
  });
  return marker;
}

function addSingleMarker(map, location)
{
  var marker = createMarker(location);
  marker.setMap(map);
  return marker;
}

function addAllMarkers(map)
{
  var infowindow = new google.maps.InfoWindow({
    content: "holding..."
  });
	
  for (var key in locations)
  {
    var loc = locations[key];
    var marker = createMarker(loc);
    marker.location = loc;
    marker.html = null;
	
    markers.push(marker);
	
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(getMarkerDesc(this));
      infowindow.open(map, this);
    });
  }
	
  var clusterOptions = {
    'imagePath': rootTemplate + "images/map/m"
  }

  var markerCluster = new MarkerClusterer(map, markers, clusterOptions);
}

function getMarkerDesc(marker)
{
  if (marker.html == null)
  {
    marker.html = buildLocationDesc(marker.location);
  }
  return marker.html;
}

function buildLocationDesc(location)
{
  var markerDesc = "<h3>" + location.title + "</h3>";
  markerDesc += "<p>" + location.desc + "</p>";
  markerDesc += "<p><a class='readmore' hef='javascript:routeArticle(\"' + location.id + '\")'>Lire la suite...</a></p>";
  return markerDesc;
}

function routeArticle(id)
{
  // TODO...
  // Create a router.php which will build the SEF Url for the specified article
}

function categoryBelongsTo(catId, filterCatId)
{
  // Check if the current category is the same as the filter category
  if (catId == filterCatId) return true;
  
  // The current category is not the same as the filter category
  // -> Check parent category
  var currentCat = cats[catId];
  
  // The category has no parent, and since it is not the specified one, we return false
  if (currentCat.parent == null) return false;
  
  // Recursively check parent category
  return categoryBelongsTo(currentCat.parent, filterCatId);
}

function applyCatFiltering(catId)
{
  var filteredMarkers = [];
  
  for (var i = 0; i < markers.length; i++)
  {
    var currentMarker = markers[i];
    if (categoryBelongsTo(currentMarker.cat, catId))
    {
      filteredMarkers.push(filteredMarkers);
    }
  }
  
  return filteredMarkers;
}
