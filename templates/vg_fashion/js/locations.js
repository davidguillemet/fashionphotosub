
var startYear = 2005;
var dateCats = null;
var cats = null;
var catsMap = null;
var locations = null;

var initialPosition = null;
var initialZoomLevel = null;

// Filtre
var displayAllLocations = false;
var areaFilters = [];
var dateFilters = [];

var markers = [];
var markerCluster = null;
var map = null;
var infowindow = null;
var googleMapHeight = null;
var googleMapZindex = null;
var $mapCanvas = null;

var clusterOptions = {
	imagePath: rootTemplate + "images/map/m",
	averageCenter: true,
	gridSize: 20
};

function loadLocationsData()
{
  jQuery.getJSON(rootUrl + "data/locations.json", function(data) {
	initializeLocationsData(data);
    if (onLocationsDataLoaded) onLocationsDataLoaded();
  });
}

function initializeLocationsData(data)
{
	// Data is coming from json data file data/locations.json
	// which contains categories and locations
	locations = data.locations;
	cats = data.categories;
	catsMap = [];
	populateCategoryMap(cats);
	
	// Dynamically create year categories
	dateCats = [];
	var today = new Date();
	var endYear = today.getFullYear();
	
	for (var year = startYear; year <= endYear; year++)
	{
		dateCats.push({
			id: "" + year,
			text: "" + year
		});
	}
}

function populateCategoryMap(catArray) {
	if (catArray == null) return;

	for (var i = 0; i < catArray.length; i++) {
		var cat = catArray[i];
		catsMap[cat.id] = cat;
		populateCategoryMap(cat.children);
	}
}

function buildLocationCloud()
{
	var tagCloud = [];
	var catMap = [];
	// Weight for a single trip
	var singleWeight = 1;
	
	for (var locIndex = 0; locIndex < locations.length; locIndex++)
	{
		var loc = locations[locIndex];
		if (loc.id == null) continue; // No Gallery for this location.
		var locCats = loc.cat;
		for (var catIndex = 0; catIndex < locCats.length; catIndex++)
		{
			var catId = locCats[catIndex];
			var locationCat = catsMap[catId];

			if (catMap[locationCat.alias] == null)
			{
				catMap[locationCat.alias] = locationCat;
				locationCat.weight = singleWeight;
				locationCat.link =
				{
					"data-option-value": "." + locationCat.alias,
					"href": "#" + locationCat.alias,
					"class": "btn btn-small"
				};
				tagCloud.push(locationCat);
			}
			else
			{
				locationCat.weight += singleWeight;
			}
		}
	}
	
	return tagCloud;
}

function GetLocations(articleId)
{
	var articleLocations = [];
	
	for (var locIndex = 0; locIndex < locations.length; locIndex++)
	{
		var loc = locations[locIndex];
		if (loc.id == articleId)
		{
			articleLocations.push(loc);
		}
	}
	
	return articleLocations;
}

function buildCustomControl(parentControl, icon, title)
{
	var newControl = document.createElement('span');
	newControl.className = "GMapControl";
	newControl.style.fontFamily = 'Arial,sans-serif';
	newControl.style.fontSize = '18px';
	newControl.style.cursor = 'pointer';
	newControl.title = title;
	newControl.innerHTML = '<i class="icon-' + icon + '"></i>';
	parentControl.appendChild(newControl);
	return newControl;
}

function toggleFullScreen(controlFullScreen)
{
	var currentCenter = map.getCenter();

	if (controlFullScreen.fullScreen == false)
	{
		controlFullScreen.fullScreen = true;
				
		$mapCanvas.css("position", 'fixed')
      		.css('top', 0)
      		.css('left', 0)
      	  	.css("width", '100%')
      		.css("height", '100%')
	  		.css("z-index", 100000);

		controlFullScreen.innerHTML = '<i class="icon-resize-small"></i>';
		controlFullScreen.title = "Réduire";
			
	}
	else
	{
		controlFullScreen.fullScreen = false;

	    $mapCanvas.css("position", 'relative')
	    	.css('top', 0)
	    	.css("width", "100%")
	    	.css("height", googleMapHeight)
			.css("z-index", googleMapZindex);
			
		controlFullScreen.innerHTML = '<i class="icon-resize-full"></i>';
		controlFullScreen.title = "Plein écran";
	}
		
	google.maps.event.trigger(map, 'resize');
	map.setCenter(currentCenter);
	return false;
}

function SetOriginalPositionAndZoom(map)
{
	// Thi smethod is overwritten in deafult_gmap.php
	map.panTo(initialPosition);
	map.setZoom(initialZoomLevel);	
}

function ToggleDisplayAllLocations(control)
{
	if (displayAllLocations == true)
	{
		// Turn off locations without pictures		
		displayAllLocations = false;
		control.innerHTML = '<i class="icon-toggle-off"></i>';
	}
	else
	{
		// Turn on locations without pictures
		displayAllLocations = true;
		control.innerHTML = '<i class="icon-toggle-on"></i>';
	}
	applyCatFiltering(areaFilters, dateFilters);
}

function HomeControl(controlDiv, map, single) {

	// Set CSS styles for the DIV containing the control
	// Setting padding to 5 px will offset the control
	// from the edge of the map
	controlDiv.style.padding = '5px';

	// Set CSS for the control border
	var controlUI = document.createElement('div');
	controlUI.style.backgroundColor = 'white';
	controlUI.style.color = '#555555';
	controlUI.style.borderStyle = 'solid';
	controlUI.style.borderWidth = '1px';
	controlUI.style.textAlign = 'center';
	controlUI.style.padding = '2px';
	controlDiv.appendChild(controlUI);

	// Set CSS for the control interior
	var controlHome = buildCustomControl(controlUI, "home", "Recentrer la carte sur le point de départ");
	// Setup the click event listeners: simply set the map to the initial position and zoom level
	google.maps.event.addDomListener(controlHome, 'click', function() {
		SetOriginalPositionAndZoom(map);
	});

	if (single) {
		// MAp dans un article -> lien vers la carte globale
		var controlGlobe = buildCustomControl(controlUI, "globe", "Accéder à la carte des galeries");
		// Navigate to the global google map (id = 60, catid = 17, itemid = 101 (celui du lenu parent))
		// index.php?option=com_tz_portfolio&amp;view=p_article&amp;id=60:map&amp;catid=17&amp;Itemid=101
		google.maps.event.addDomListener(controlGlobe, 'click', function() {
			routeArticle(60, 17, 101);
		});
	} else {
		// Map globale -> lien pour recentrer sur le point de départ
		var controlClear = buildCustomControl(controlUI, "cancel-circled", "Initialiser les filtres");
		// Setup the click event listeners: clear all filter
		google.maps.event.addDomListener(controlClear, 'click', function() {
			clearFilters();
		});
		
		// Control pour afficher ou pas les lieux sans photos
		controlToggleDisplay = buildCustomControl(controlUI, displayAllLocations ? "toggle-on" : "toggle-off", "Afficher les lieux sans photos");
		// Display all By default:
		controlToggleDisplay.displayAll = true;
		// Setup the click event listeners: clear all filter
		google.maps.event.addDomListener(controlToggleDisplay, 'click', function() {
			ToggleDisplayAllLocations(this);
		});
	}
	// A control to make the google map full screen
	var controlFullScreen = buildCustomControl(controlUI, "resize-full", "Plein écran");
	controlFullScreen.fullScreen = false;				
	google.maps.event.addDomListener(controlFullScreen, 'click', function() {
		toggleFullScreen(this);
	});

	// Call tipsy on all custom google map controls
	var $customControls = jQuery(controlUI).find(".GMapControl");
	$customControls.tipsy({
		gravity: 'n',
		delayIn: 0,
		delayOut: 0,
		opacity: 1,
		fade: true
	});
	
}

function createMap(latitude, longitude, zoomValue, single) {
	initialPosition = new google.maps.LatLng(latitude, longitude);
	initialZoomLevel = zoomValue;

	// Create coogle map options
	var mapOptions = {
		backgroundColor: 'black',
		center: initialPosition,
		zoom: zoomValue,
		scrollwheel: false,
		overviewMapControl: true,
		overviewMapControlOptions: {
			opened: true
		},
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
		document.getElementById("map-canvas"),
		mapOptions);
	
	// Get Map dimensions
	$mapCanvas = jQuery("#map-canvas");
	googleMapHeight = $mapCanvas.css('height');
	googleMapZindex = $mapCanvas.css('z-index');

	// Create a Custo control to center the map on the initial position with initial zoom level 
	var homeControlDiv = document.createElement('div');
	var homeControl = new HomeControl(homeControlDiv, map, single);
	homeControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);

	// Create  single InfoWindow for all popup markers
	infowindow = new google.maps.InfoWindow({
		content: "holding..."
	});

	return map;
}


function createMarker(loc, single) {
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

function addSingleMarker(map, location) {
	var marker = createMarker(location, true);
	marker.setMap(map);
	return marker;
}

function addAllMarkers(map)
{
	for (var locIndex = 0; locIndex < locations.length; locIndex++)
	{
		var loc = locations[locIndex];
		var marker = createMarker(loc, false);
		markers.push(marker);
	}
	
	var filteredMarkers = getFilteredMarkers();
	
	markerCluster = new MarkerClusterer(map, filteredMarkers, clusterOptions);
}

function getMarkerDesc(marker)
{
	if (marker.html == null)
	{
		marker.html = buildLocationDesc(marker.location, marker.single);
	}
	return marker.html;
}

function buildLocationDesc(location, single) {
	var locationPosLiteral = "{lat:" + location.position.lat + ", lng:" + location.position.lng + "}";
	var markerDesc = "<div id='mapinfocontainer'><h3 class='mapinfotitle'><table class='mapinfotitletable' style='width: 100%'><tr>";
	
	// In case of a single location (map inside article content), or if the id is null (no picture for the location),
	// wedon't need to display a link...
	var addLink = (single == false && location.id != null);
	
	markerDesc += "<td style='text-align: left; padding-right: 20px;'>";
	if (addLink) markerDesc += "<a href='javascript:routeArticle(" + location.id + ", 8, 101)'>";
	markerDesc += location.title;
	if (addLink) markerDesc += "</a>";
	markerDesc += "</td>";
	markerDesc += "<td style='text-align: right;'>";
	markerDesc += "<a href='javascript:map.panTo(" + locationPosLiteral + ")'><i class='icon-target' title='Centrer la carte sur ce lieu'></i></a>";
	markerDesc += "<a href='javascript:map.setCenter(" + locationPosLiteral + ");map.setZoom(map.getZoom()+1)'><i class='icon-zoom-in' title='Zoom avant'></i></a>";
	markerDesc += "<a href='javascript:map.setCenter(" + locationPosLiteral + ");map.setZoom(map.getZoom()-1)'><i class='icon-zoom-out' title='Zoom arrière'></i></a>";
	markerDesc += "</td><tr></table></h3>";
	markerDesc += "<em><i class='icon-calendar'></i>" + location.date + "</em>"
	markerDesc += "<p>" + location.desc + "</p>";
	if (addLink)
	{
		// no need to add the read more link inside the article itself... 
		// routeArticle is defined in fashionCustom.js (fashion template js folder)
		markerDesc += "<p><a class='TzReadmore' href='javascript:routeArticle(" + location.id + ", 8, 101)'>Lire la suite...</a></p></div>";
	}
	return markerDesc;
}


function categoryMatchFilter(cat, filterCat)
{
	// Check if the current category is the same as the filter category
	if (cat.id == filterCat.id) return true;
	return false;
}

function applyFilteredMarkers(filteredMarkers)
{
	// Reset Markers from marker clusterer
	markerCluster.clearMarkers();
	// Add filtered MArkers and redraw the marker clusterer
	markerCluster.addMarkers(filteredMarkers);
	markerCluster.fitMapToMarkers();
	markerCluster.repaint();
	
	if (filteredMarkers.length == 0)
	{
		SetOriginalPositionAndZoom(map);
	}
}

function filterAreas(areaFilterCats, initialMarkers)
{
	var areaFilterMarkers = new Array();
	for (var markerIndex = 0; markerIndex < initialMarkers.length; markerIndex++)
	{
		var currentMarker = initialMarkers[markerIndex];
		var markerMatch = false;
		
		for (var catIndex = 0; catIndex < areaFilterCats.length && markerMatch == false; catIndex++)
		{
			var areaFilterCatId = areaFilterCats[catIndex];
			for (var locCatIndex = 0; locCatIndex < currentMarker.location.cat.length && markerMatch == false; locCatIndex++)
			{
				if (categoryMatchFilter(catsMap[currentMarker.location.cat[locCatIndex]], catsMap[areaFilterCatId]))
				{
					areaFilterMarkers.push(currentMarker);
					markerMatch = true;
				}
			}
		}
	}
	return areaFilterMarkers;
}

function filterDates(dateFilterCats, initialMarkers)
{
	var dataFilterdMarkers = new Array();
	for (var markerIndex = 0; markerIndex < initialMarkers.length; markerIndex++)
	{
		var currentMarker = initialMarkers[markerIndex];
		var markerMatch = false;
		
		for (var catIndex = 0; catIndex < dateFilterCats.length && markerMatch == false; catIndex++)
		{
			var filterYear = dateFilterCats[catIndex];
			var markerDate = currentMarker.location.date;
			var markerYear = markerDate.substring(markerDate.length - 4);
			if (filterYear == markerYear)
			{
				dataFilterdMarkers.push(currentMarker);
				markerMatch = true;
			}
		}
	}
	return dataFilterdMarkers;
}

// Locations without pictures have no id property...
// -> the location id is the correspondig article id
function removeLocationsWithoutPictures(initialMarkers)
{
	var markersWithPictures = new Array();
	for (var markerIndex = 0; markerIndex < initialMarkers.length; markerIndex++)
	{
		var currentMarker = initialMarkers[markerIndex];
		if (currentMarker.location.id != null)
		{
			markersWithPictures.push(currentMarker);
		}
	}
	return markersWithPictures;
}

/////////
// areaFilterCats is an array of area category identifers
// dateFilterCats is an array of date identifers
/////////

function getFilteredMarkers()
{
	var filteredMarkers = markers;
	
	if (displayAllLocations == false)
	{
		// Remove locations without pictures
		filteredMarkers = removeLocationsWithoutPictures(filteredMarkers);
	}

	if (areaFilters != null && areaFilters.length > 0)
	{
		// Apply area filter first
		filteredMarkers = filterAreas(areaFilters, filteredMarkers);
	}

	if (dateFilters != null && dateFilters.length > 0)
	{
		// And then apply date filter
		filteredMarkers = filterDates(dateFilters, filteredMarkers);
	}
	
	return filteredMarkers;
}

function applyCatFiltering(areaFilterCats, dateFilterCats) 
{
	areaFilters = areaFilterCats;
	dateFilters = dateFilterCats;
	
	var filteredMarkers = getFilteredMarkers();
		
	applyFilteredMarkers(filteredMarkers)
}
