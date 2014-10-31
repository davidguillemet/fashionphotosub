var locations = [];
locations["1"] = {
	title: "Anilao",
	lat: 13.755980,
	lng: 120.918013,
	cat: ["2014","asie-sud-est","philippines"]
};
locations["2"] = {
	title: "Komodo",
	lat: -8.576795,
	lng: 119.658441,
	cat: ["2013", "asie-sud-est", "indonesie"]
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
		marker.locationId = loc.title;
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
		marker.html = buildLocationDesc(marker.locationId);
	}
	return marker.html;
}

function buildLocationDesc(locationId)
{
	return locationId; // TODO : generate real HTML
}