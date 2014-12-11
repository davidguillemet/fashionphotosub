///////////////////////////
// The location Categories
///////////////////////////////////////////

var catAsieSudEst = {
	id: "ase",
	text: "Asie du Sud-Est",
	alias: "asie-du-sud-est",
	parent: null
};

var catPhilippines = {
	id: "phi",
	text: "Philippines",
	alias: "philippines",
	parent: catAsieSudEst
};
var catMalaisie = {
	id: "mal",
	text: "Malaisie",
	alias: "malaisie",
	parent: catAsieSudEst
};
var catIndonesie = {
	id: "ind",
	text: "Indonésie",
	alias: "indonesie",
	parent: catAsieSudEst
};
catAsieSudEst.children = [catIndonesie, catMalaisie, catPhilippines];

var catCaraibes = {
	id: "car",
	text: "Caraïbes",
	alias: "caraibes",
	parent: null
};

var catRedSea = {
	id: "red",
	text: "Mer Rouge",
	alias: "mer-rouge",
	parent: null
};
var catEgypte = {
	id: "egy",
	text: "Egypte",
	alias: "egypte",
	parent: catRedSea
};
catRedSea.children = [catEgypte];

var catMediterranee = {
	id: "med",
	text: "Méditerranée",
	alias: "mediterranee",
	parent: null
}
var catFrance = {
	id: "fra",
	text: "France",
	alias: "france",
	parent: catMediterranee
};
var catEspagne = {
	id: "esp",
	text: "Espagne",
	alias: "espagne",
	parent: catMediterranee	
}
catMediterranee.children = [catFrance, catEspagne];

var catAtlantiqueNord = {
	id: "atl",
	text: "Atlantique Nord",
	alias: "atlantique-nord",
	parent: null
}
var catCaboVerde = {
	id: "cab",
	text: "Cap Vert",
	alias: "cap-vert",
	parent: catAtlantiqueNord
};
var catAzores = {
	id: "azo",
	text: "Açores",
	alias: "acores",
	parent: catAtlantiqueNord
};
catAtlantiqueNord.children = [catCaboVerde, catAzores];

var catPacifiqueNord = {
	id: "pac",
	text: "Pacifique Nord",
	alias: "pacifique-nord",
	parent: null
}
var catCanada = {
	id: "can",
	text: "Canada",
	alias: "canada",
	parent: catPacifiqueNord
};
var catMexique = {
	id: "mex",
	text: "Mexique",
	alias: "mexique",
	parent: catPacifiqueNord	
};
catPacifiqueNord.children = [catCanada, catMexique];

var cat2014 = {
	id: "2014",
	text: "2014",
	parent: null
};
var cat2013 = {
	id: "2013",
	text: "2013",
	parent: null
};
var cat2012 = {
	id: "2012",
	text: "2012",
	parent: null
};
var cat2011 = {
	id: "2011",
	text: "2011",
	parent: null
};
var cat2010 = {
	id: "2010",
	text: "2010",
	parent: null
};
var cat2009 = {
	id: "2009",
	text: "2009",
	parent: null
};
var cat2008 = {
	id: "2008",
	text: "2008",
	parent: null
};

var cats = [
	catAsieSudEst,
	catAtlantiqueNord,
	catCaraibes,
	catRedSea,
	catMediterranee,
	catPacifiqueNord
];

var dateCats = [
	cat2014,
	cat2013,
	cat2012,
	cat2011,
	cat2010,
	cat2009,
	cat2008
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
	cat: [catAsieSudEst, catPhilippines]
};
locations["2"] = {
	id: "2",
	alias: "2013-komodo",
	title: "Komodo",
	desc: "Croisière sur le Tidak Apa'Apa (<a href='http://komodosailing.com/' target='_blank'>Komodo Sailing</a>)",
	position: new google.maps.LatLng(-8.576795, 119.658441),
	date: "Octobre 2013",
	cat: [catAsieSudEst, catIndonesie]
};
locations["3"] = {
	id: "3",
	alias: "2013-egypte",
	title: "Egypte",
	desc: "Croisière BDE avec <a href='http://www.sharkeducation.com/' target='_blank'>Shark Education</a>",
	position: new google.maps.LatLng(24.91917, 35.86944),
	date: "Août 2013",
	cat: [catEgypte, catRedSea]
};
locations["4"] = {
	id: "4",
	alias: "2013-ciotat",
	title: "La Ciotat",
	desc: "Participation au stage bio de l'ASD12",
	position: new google.maps.LatLng(43.174996, 5.610905),
	date: "Juin 2013",
	cat: [catFrance, catMediterranee]
};
locations["5"] = {
	id: "5",
	alias: "2013-sipadan",
	title: "Sipadan",
	desc: "Croisière Sipadan à bord du Celebes Explorer",
	position: new google.maps.LatLng(4.115236, 118.628458),
	date: "Mai 2013",
	cat: [catAsieSudEst, catMalaisie]
};
locations["6"] = {
	id: "6",
	alias: "2013-mabul",
	title: "Mabul",
	desc: "Séjour au <a href='http://www.sipadanmabulresort.com/' target='_blank'>Sipadan MAbul ResorT</a>",
	position: new google.maps.LatLng(4.243302, 118.631540),
	date: "Mai 2013",
	cat: [catAsieSudEst, catMalaisie]
};
locations["7"] = {
	id: "7",
	alias: "2009-lembeh",
	title: "Lembeh",
	desc: "Séjour au <a href='http://www.diverslodgelembeh.com/' target='_blank'>Divers Lodge Lembeh</a>",
	position: new google.maps.LatLng(1.40617, 125.17007),
	date: "Novembre 2009",
	cat: [catAsieSudEst, catIndonesie]
};
locations["62"] = {
	id: "62",
	alias: "2013-capvert",
	title: "Cap Vert",
	desc: "Séjour au Cap Vert, Île de Sal",
	position: new google.maps.LatLng(16.597557, -22.908165),
	date: "Mars 2013",
	cat: [catAtlantiqueNord, catCaboVerde]
};
locations["63"] = {
	id: "63",
	alias: "2012-acores",
	title: "Les Açores",
	desc: "Séjour aux Açores (Pico et Faîal)",
	position: new google.maps.LatLng(38.539841, -28.576521),
	date: "Septembre 2012",
	cat: [catAtlantiqueNord, catAzores]
};
locations["64"]= {
	id: "64",
	alias: "2012-weda",
	title: "Weda",
	desc: "Séjour au <a href='http://www.wedaresort.com/' target='_blank'>Weda Reef & Rainforest Resort</a><br>Halmahera, archipel des Moluques",
	position: new google.maps.LatLng(0.41958, 127.905836),
	date: "Mars 2012",
	cat: [catAsieSudEst, catIndonesie]
};
locations["65"]= {
	id: "65",
	alias: "2012-lembeh",
	title: "Lembeh",
	desc: "Séjour au <a href='http://www.diverslodgelembeh.com/' target='_blank'>Divers Lodge Lembeh</a>",
	position: new google.maps.LatLng(1.405637, 125.171176),
	date: "Mars 2012",
	cat: [catAsieSudEst, catIndonesie]
};
locations["66"]= {
	id: "66",
	alias: "2011-bali",
	title: "Bali",
	desc: "Safari avec <a href='http://www.ikandive.com/' target='_blank'>Ikandive</a>",
	position: new google.maps.LatLng(-8.529796, 115.508977),
	date: "Novembre 2011",
	cat: [catAsieSudEst, catIndonesie]
};
locations["67"]= {
	id: "67",
	alias: "2011-colombie",
	title: "Colombie Britannique",
	desc: "Séjour au <a href='http://www.godspocket.com/' target='_blank'>God's Pocket Resort</a>",
	position: new google.maps.LatLng(50.840275, -127.592334),
	date: "Novembre 2011",
	cat: [catPacifiqueNord, catCanada]
};
locations["68"]= {
	id: "68",
	alias: "2011-cerbere",
	title: "Cerbère",
	desc: "Stage 'Limaces de rêve' au centre <a href='http://www.capcerbere.com/' target='_blank'>Cap Cerbère</a>",
	position: new google.maps.LatLng(42.440418,	3.167233),
	date: "Juillet 2011",
	cat: [catFrance, catMediterranee]
};
locations["69"]= {
	id: "69",
	alias: "2011-marseille",
	title: "Marseille",
	desc: "Week-end sur l'île du Frioul",
	position: new google.maps.LatLng(43.281941, 5.309277),
	date: "Juin 2011",
	cat: [catFrance, catMediterranee]
};
locations["78"]= {
	id: "78",
	alias: "2011-martinique",
	title: "La Martinique",
	desc: "Séjour au centre UCPA de Saint-Pierre",
	position: new google.maps.LatLng(14.747452, -61.177325),
	date: "Janvier 2011",
	cat: [catCaraibes]
};
locations["79"]= {
	id: "79",
	alias: "2011-dominique",
	title: "La Dominique",
	desc: "Séjour chez <a href='http://www.east-carib-dive.com/' target='_blank'>La Doudou</a>",
	position: new google.maps.LatLng(15.445076, -61.446619),
	date: "Janvier 2011",
	cat: [catCaraibes]
};
locations["155"] = {
	id: "155",
	alias: "2010-11-marseille",
	title: "Marseille",
	desc: "Week-End avec <a href='http://mcmplongee.fr/' target='_blank'>Les Plaisirs De La Mer</a>",
	position: new google.maps.LatLng(43.293747, 5.363297),
	date: "Novembre 2010",
	cat: [catFrance, catMediterranee]
};
locations["156"] = {
	id: "156",
	alias: "2010-challenge",
	title: "Challenge de Marseille",
	desc: "Participation au <a href='http://www.challenge-de-marseille.com/' target='_blank'>Challenge de Photo Sous-Marine de Marseille</a>",
	position: new google.maps.LatLng(43.26615, 5.371403),
	date: "Octobre 2010",
	cat: [catFrance, catMediterranee]
};
locations["157"] = {
	id: "157",
	alias: "2010-port-de-la-selva",
	title: "Port de la Selva",
	desc: "Séjour au <a href='http://fr.cips-dive.com/' target='_blank'>CIPS</a> de Port de la Selva",
	position: new google.maps.LatLng(42.338554, 3.203014),
	date: "Septembre 2010",
	cat: [catEspagne, catMediterranee]
};
locations["158"] = {
	id: "158",
	alias: "2010-egypte",
	title: "Egypte",
	desc: "Croisière 'Odysée' dans le grand sud Egyptien",
	position: new google.maps.LatLng(25.53253, 34.63388),
	date: "Août 2010",
	cat: [catRedSea, catEgypte]
};
locations["159"] = {
	id: "159",
	alias: "2010-08-marseille",
	title: "Marseille",
	desc: "Week-end à Marseille",
	position: new google.maps.LatLng(43.293747, 5.363297),
	date: "Août 2010",
	cat: [catFrance, catMediterranee]
};
locations["160"] = {
	id: "160",
	alias: "2010-glenans",
	title: "Les Glénans",
	desc: "Séjour au <a href='http://www.cip-glenan.fr/' target='_blank'>CIP</a> des Glénans",
	position: new google.maps.LatLng(47.723101, -4.00383),
	date: "Juillet 2010",
	cat: [catAtlantiqueNord, catFrance]
};
locations["161"] = {
	id: "161",
	alias: "2010-llafranc",
	title: "Llafranc",
	desc: "Séjour 'bio' avec Robert Oms",
	position: new google.maps.LatLng(41.895178, 3.18566),
	date: "Juin 2010",
	cat: [catMediterranee, catEspagne]
};
locations["162"] = {
	id: "162",
	alias: "2010-socorro",
	title: "Socorro",
	desc: "Croisière à bord du <a href='http://www.nautilusexplorer.com/' target='_blank'>Nautilus Explorer</a>",
	position: new google.maps.LatLng(18.776, -110.978),
	date: "Mars 2010",
	cat: [catPacifiqueNord, catMexique]
};



function buildLocationCloud()
{
	var tagCloud = [];
	var catMap = [];
	// Weight for a single trip
	var singleWeight = 1;
	
	for (var key in locations)
	{
		if (locations.hasOwnProperty(key)) {
			
			var loc = locations[key];
			var locCats = loc.cat;
			for (var catIndex = 0; catIndex < locCats.length; catIndex++)
			{
				var locationCat = locCats[catIndex];
				
				if (catMap[locationCat.id] == null)
				{					
					catMap[locationCat.id] = locationCat;
					locationCat.weight = singleWeight;
					locationCat.link = {
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
	}
	
	return tagCloud;
}

var initialPosition = null;
var initialZoomLevel = null;

function buildCustomControl(parentControl, icon, title) {
	var newControl = document.createElement('span');
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
		map.panTo(initialPosition);
		map.setZoom(initialZoomLevel);
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
	}
	// A control to make the google map full screen
	var controlFullScreen = buildCustomControl(controlUI, "resize-full", "Plein écran");
	controlFullScreen.fullScreen = false;				
	google.maps.event.addDomListener(controlFullScreen, 'click', function() {
		toggleFullScreen(this);
	});

}


var markers = [];
var markerCluster = null;
var map = null;
var infowindow = null;
var googleMapHeight = null;
var googleMapZindex = null;
var $mapCanvas = null;

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

function populateCategoryMap(catArray) {
	if (catArray == null) return;

	for (var i = 0; i < catArray.length; i++) {
		var cat = catArray[i];
		catsMap[cat.id] = cat;
		populateCategoryMap(cat.children);
	}
}

function addAllMarkers(map) {
	for (var key in locations) {
		if (locations.hasOwnProperty(key)) {
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

function getMarkerDesc(marker) {
	if (marker.html == null) {
		marker.html = buildLocationDesc(marker.location, marker.single);
	}
	return marker.html;
}

function buildLocationDesc(location, single) {
	var markerDesc = "<div id='mapinfocontainer'><h3 class='mapinfotitle'><table class='mapinfotitletable' style='width: 100%'><tr>";
	markerDesc += "<td style='text-align: left; padding-right: 20px;'><a href='javascript:routeArticle(" + location.id + ", 8, 101)'>" + location.title + "</a></td>";
	markerDesc += "<td style='text-align: right;'>";
	markerDesc += "<a href='javascript:map.panTo(locations[\"" + location.id + "\"].position)'><i class='icon-target' title='Centrer la carte sur ce lieu'></i></a>";
	markerDesc += "<a href='javascript:map.setCenter(locations[\"" + location.id + "\"].position);map.setZoom(map.getZoom()+1)'><i class='icon-zoom-in' title='Zoom avant'></i></a>";
	markerDesc += "<a href='javascript:map.setCenter(locations[\"" + location.id + "\"].position);map.setZoom(map.getZoom()-1)'><i class='icon-zoom-out' title='Zoom arrière'></i></a>";
	markerDesc += "</td><tr></table></h3>";
	markerDesc += "<em><i class='icon-calendar'></i>" + location.date + "</em>"
	markerDesc += "<p>" + location.desc + "</p>";
	if (single == false) {
		// no need to add the read more link inside the article itself... 
		// routeArticle is defined in fashionCustom.js (fashion template js folder)
		markerDesc += "<p><a class='TzReadmore' href='javascript:routeArticle(" + location.id + ", 8, 101)'>Lire la suite...</a></p></div>";
	}
	return markerDesc;
}


function categoryMatchFilter(cat, filterCat) {
	// Check if the current category is the same as the filter category
	if (cat.id == filterCat.id) return true;

	// The current category is not the same as the filter category
	// -> Check parent category  
	// -> if The category has no parent, and since it is not the specified one, we return false
	//if (cat.parent != null) {
		// Recursively check parent category
	//	return categoryMatchFilter(cat.parent, filterCat);
	//}

	return false;
}

function applyFilteredMarkers(filteredMarkers) {
	// Reset Markers from marker clusterer
	markerCluster.clearMarkers();
	// Add filtered MArkers and redraw the marker clusterer
	markerCluster.addMarkers(filteredMarkers);

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
				if (categoryMatchFilter(currentMarker.location.cat[locCatIndex], catsMap[areaFilterCatId]))
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

/////////
// areaFilterCats is an array of area category identifers
// dateFilterCats is an array of date identifers
/////////

function applyCatFiltering(areaFilterCats, dateFilterCats) {
	var filteredMarkers = markers;

	if (areaFilterCats != null && areaFilterCats.length > 0)
	{
		// Apply area filter first
		filteredMarkers = filterAreas(areaFilterCats, filteredMarkers);
	}

	if (dateFilterCats != null && dateFilterCats.length > 0)
	{
		// And then apply date filter
		filteredMarkers = filterDates(dateFilterCats, filteredMarkers);
	}

	applyFilteredMarkers(filteredMarkers)
}
