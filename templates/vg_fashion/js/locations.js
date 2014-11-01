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
	desc: "Une semaine de Muck Dive chez <a href='http://www.clubocellaris.com/' target='_blank'>Ocellaris</a>",
	position: new google.maps.LatLng(13.755980, 120.918013),
	date: "Janvier 2014",
	cat: catPhilippines
};
locations["2"] = {
	id: "2",
	alias: "2013-komodo",
	title: "Komodo",
	desc: "Croisière sur le Tidak Apa'Apa (<a href='http://komodosailing.com/' target='_blank'>Komodo Sailing</a>)",
	position: new google.maps.LatLng(-8.576795, 119.658441),
	date: "Octobre 2013",
	cat: catIndonesie
};
locations["3"] = {
	id: "3",
	alias: "2013-egypte",
	title: "Egypte",
	desc: "Croisière BDE avec <a href='http://www.sharkeducation.com/' target='_blank'>Shark Education</a>",
	position: new google.maps.LatLng(24.91917, 35.86944),
	date: "Août 2013",
	cat: catEgypte
};
locations["4"] = {
	id: "4",
	alias: "2013-ciotat",
	title: "La Ciotat",
	desc: "Participation au stage bio de l'ASD12",
	position: new google.maps.LatLng(43.174996, 5.610905),
	date: "Juin 2013",
	cat: catFrance	
};
locations["5"] = {
	id: "5",
	alias: "2013-sipadan",
	title: "Sipadan",
	desc: "Croisière Sipadan à bord du Celebes Explorer",
	position: new google.maps.LatLng(4.115236,118.628458),
	date: "Mai 2013",
	cat: catMalaisie	
};
locations["6"] = {
	id: "6",
	alias: "2013-mabul",
	title: "Mabul",
	desc: "Séjour au <a href='http://www.sipadanmabulresort.com/' target='_blank'>Sipadan MAbul ResorT</a>",
	position: new google.maps.LatLng(4.243302, 118.631540),
	date: "Mai 2013",
	cat: catMalaisie	
};

var initialPosition = null;
var initialZoomLevel = null;

function HomeControl(controlDiv, map) {

  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  controlDiv.style.padding = '5px';

  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = 'white';
  controlUI.style.color = '#555555';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '2px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Recentrer la carte sur le point de départ';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '18px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<i class="icon-home"></i>';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to the initial position and zoom level
  google.maps.event.addDomListener(controlUI, 'click', function() {
    map.panTo(initialPosition);
	map.setZoom(initialZoomLevel);
  });

}


var markers = [];
var markerCluster = null;
var map = null;
var infowindow = null;

function createMap(latitude, longitude, zoomValue)
{
	initialPosition = new google.maps.LatLng(latitude, longitude);
	initialZoomLevel = zoomValue;
	
	// Create coogle map options
    var mapOptions = {
      backgroundColor: 'transparent',
      center: initialPosition,
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

	// Create the Google Map instance
    map = new google.maps.Map(
      document.getElementById('map-canvas'),
      mapOptions);
	
	// Create a Custo control to center the map on the initial position with initial zoom level 
	var homeControlDiv = document.createElement('div');
	var homeControl = new HomeControl(homeControlDiv, map);
	homeControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);

    // Create  single InfoWindow for all popup markers
	infowindow = new google.maps.InfoWindow({
      content: "holding..."
    });
	
    return map;
}


function createMarker(loc, single)
{
  // Create the marker object 
  var marker = new google.maps.Marker({
    position: loc.position,
    title: loc.title,
    icon: rootTemplate + "images/map/diver.png"
  });
  
  marker.single = single;
  marker.location = loc;
  marker.html = null;
  
  // attach an event handler to this marker top open the info window
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(getMarkerDesc(this));
    infowindow.open(map, this);
  });
 
  return marker;
}

function addSingleMarker(map, location)
{
  var marker = createMarker(location, true);
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
  for (var key in locations)
  {
	  if (locations.hasOwnProperty(key))
	  {
	      var loc = locations[key];
	      var marker = createMarker(loc, false);
		  
		  markers.push(marker);	
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
    marker.html = buildLocationDesc(marker.location, marker.single);
  }
  return marker.html;
}

function buildLocationDesc(location, single)
{
  var markerDesc = "<div id='mapinfocontainer'><h3 class='mapinfotitle'><table class='mapinfotitletable' style='width: 100%'><tr>";
  markerDesc += "<td style='text-align: left;'>" + location.title + "</td>";
  markerDesc += "<td style='text-align: right;'>";
  markerDesc += "<a href='javascript:map.panTo(locations[\"" + location.id + "\"].position)'><i class='icon-home' title='Centrer la carte sur ce lieu'></i></a>";
  markerDesc += "<a href='javascript:map.panTo(locations[\"" + location.id + "\"].position);map.setZoom(map.getZoom()+1)'><i class='icon-zoom-in' title='Zoom avant sur ce lieu'></i></a>";
  markerDesc += "<a href='javascript:map.panTo(locations[\"" + location.id + "\"].position);map.setZoom(map.getZoom()-1)'><i class='icon-zoom-out' title='Zoom arrière sur ce lieu'></i></a>";
  markerDesc += "</td><tr></table></h3>";
  markerDesc += "<em><i class='icon-calendar'></i>" + location.date + "</em>"
  markerDesc += "<p>" + location.desc + "</p>";
  if (single == false)
  {
	  // no need to add the read more link inside the article itself... 
	  markerDesc += "<p><a class='TzReadmore' hef='javascript:routeArticle(\"" + location.id + "\")'>Lire la suite...</a></p></div>";
  }
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
