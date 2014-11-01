///////////////////////////
// The location Categories
///////////////////////////////////////////
var catAsieSudEst = { id: "ase", text: "Asie du Sud-Est", parent: null };
var catPhilippines = { id: "phi", text: "Philippines", parent: catAsieSudEst };
var catMalaisie = { id: "mal", text: "Malaisie", parent: catAsieSudEst };
var catIndonesie = { id: "ind", text: "Indonésie", parent: catAsieSudEst };
catAsieSudEst.children = [catIndonesie, catMalaisie, catPhilippines];

var catRedSea = { id: "red", text: "Mer Rouge", parent: null };
var catEgypte = { if: "egy", text: "Egypte", parent: catRedSea };
catRedSea.children = [catEgypte];

var catMediterranee = { id: "med", text: "Méditerranée", parent: null }
var catFrance = { id: "fra", text: "France", parent: catMediterranee };
catMediterranee.children = [catFrance];

var cats = [
  catAsieSudEst,
  catMediterranee,
  catRedSea
];

var catsMap = null;

////////////////////////////////////////////
// The locations
// The location key is the joomla article ID
////////////////////////////////////////////
var locations = new Array();

locations["1"] = {
	id: "1",
	alias: "2014-anilao",
	title: "Anilao",
	desc: "Séjour chez <a href='http://www.clubocellaris.com/' target='_blank'>Cub Ocellaris</a>",
	position: new google.maps.LatLng(13.755980, 120.918013),
	year: 2014,
	cat: catPhilippines
};
locations["2"] = {
	id: "2",
	alias: "2013-komodo",
	title: "Komodo",
	desc: "Croisière sur le Tidak Apa'Apa (<a href='http://komodosailing.com/' target='_blank'>Komodo Sailing</a>)",
	position: new google.maps.LatLng(-8.576795, 119.658441),
	year: 2013,
	cat: catIndonesie
};
locations["3"] = {
	id: "3",
	alias: "2013-egypte",
	title: "Egypte",
	desc: "Croisière BDE avec <a href='http://www.sharkeducation.com/' target='_blank'>Shark Education</a>",
	position: new google.maps.LatLng(24.91917, 35.86944),
	year: 2013,
	cat: catEgypte
};
locations["4"] = {
	id: "4",
	alias: "2013-ciotat",
	title: "La Ciotat",
	desc: "Participation au stage bio de l'ASD12",
	position: new google.maps.LatLng(43.174996, 5.610905),
	year: 2013,
	cat: catFrance	
};

var markers = [];
var markerCluster = null;
var map = null;

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

    map = new google.maps.Map(
      document.getElementById('map-canvas'),
      mapOptions);
	
    return map;
}


function createMarker(loc)
{
  var marker = new google.maps.Marker({
    position: loc.position,
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

function populateCategoryMap(catArray)
{
	if (catArray == null) return;
	
	for (var i = 0; i < catArray.length; i++)
	{
		var cat = catArray[i];
		catsMap[cat.id] = cat;
		populateCategoryMap(cat.children);
	}
}

function addAllMarkers(map)
{
  var infowindow = new google.maps.InfoWindow({
    content: "holding..."
  });
	
  for (var key in locations)
  {
	  if (locations.hasOwnProperty(key))
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
  }
	
  var clusterOptions = {
    'imagePath': rootTemplate + "images/map/m"
  }

  markerCluster = new MarkerClusterer(map, markers, clusterOptions);
  
  catsMap = [];
  populateCategoryMap(cats);
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
  var markerDesc = "<div id='mapinfocontainer'><h3 class='mapinfotitle'><table style='width: 100%'><tr><td style='text-align: left;'>" + location.title + "</td>";
  markerDesc += "<td style='text-align: right;'><a href='javascript:map.panTo(locations[\"" + location.id + "\"].position)'><i class='icon-home' title='Centrer la carte sur ce point'></i></a></td><tr></table></h3>";
  markerDesc += "<p>" + location.desc + "</p>";
  markerDesc += "<p><a class='TzReadmore' hef='javascript:routeArticle(\"" + location.id + "\")'>Lire la suite...</a></p></div>";
  return markerDesc;
}

function routeArticle(id)
{
  // TODO...
  // Create a router.php which will build the SEF Url for the specified article
}

function categoryMatchFilter(cat, filterCat)
{
	// Check if the current category is the same as the filter category
	if (cat.id == filterCat.id) return true;
  
	// The current category is not the same as the filter category
	// -> Check parent category  
	// -> if The category has no parent, and since it is not the specified one, we return false
	if (cat.parent != null)
	{
		// Recursively check parent category
		return categoryMatchFilter(cat.parent, filterCat);
	}
	
	return false;
}

/////////
// filterCats is an array of category identifers
/////////
function applyCatFiltering(filterCats)
{
	var filteredMarkers = markers;
	
	// No Filtering, return all markers
	if (filterCats.length > 0)
	{
		filteredMarkers = new Array();
  
		for (var markerIndex = 0; markerIndex < markers.length; markerIndex++)
		{
			var currentMarker = markers[markerIndex];
			var markerMatch = false;
			for (var catIndex = 0; catIndex < filterCats.length && markerMatch == false; catIndex++)
			{
				var filterCatId = filterCats[catIndex];
				if (categoryMatchFilter(currentMarker.location.cat, catsMap[filterCatId]))
				{
					//alert("marker " + currentMarker.location.title + " match!");
					filteredMarkers.push(currentMarker);
					markerMatch = true;
				}
			}
		}
	}
    // Reset Markers from marker clusterer
	markerCluster.clearMarkers();
	// Add filtered MArkers and redraw the marker clusterer
	markerCluster.addMarkers(filteredMarkers);
}
