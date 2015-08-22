<?php die("Access Denied"); ?>#x#a:2:{s:6:"output";s:0:"";s:6:"result";s:13091:"var dateCats=null;var cats=null;var categoriesMap=null;var locations=null;var tagCloud=null;var initialPosition=null;var initialZoomLevel=null;var displayAllLocations=false;var areaFilters=[];var dateFilters=[];var markers=[];var markerCluster=null;var map=null;var infowindow=null;var googleMapHeight=null;var googleMapZindex=null;var $mapCanvas=null;var clusterOptions={imagePath:rootTemplate+"images/map/m",averageCenter:true,gridSize:20};function loadLocationsData(buildTagCloud)
{jQuery.getJSON(rootUrl+"data/locations.json",function(data){initializeLocationsData(data,buildTagCloud);if(onLocationsDataLoaded)onLocationsDataLoaded();});}
function initializeLocationsData(data,buildTagCloud)
{locations=data.locations;cats=data.categories;categoriesMap=[];populateCategoryMap(cats);if(buildTagCloud)
{buildLocationCloud();updateCategoriesWithNoGallery(cats);updateDateCategoriesWithNoGallery(dateCats);dateCats.sort(function(d1,d2){return d2.text.localeCompare(d1.text);})}}
function populateCategoryMap(catArray){if(catArray==null)return;for(var i=0;i<catArray.length;i++){var cat=catArray[i];categoriesMap[cat.id]=cat;populateCategoryMap(cat.children);}}
function buildLocationCloud()
{tagCloud=[];dateCats=[];var mapAliasToCategory=[];var mapYearToDateCategory=[];var singleWeight=1;var tripIdentifiers=[];for(var locIndex=0;locIndex<locations.length;locIndex++)
{var loc=locations[locIndex];var galleryCount=0;for(var tripIndex=0;tripIndex<loc.trips.length;tripIndex++)
{var currentTrip=loc.trips[tripIndex];var tripDate=currentTrip.date;var tripYear=tripDate.substring(tripDate.length-4);var dateCategory=mapYearToDateCategory[tripYear];if(dateCategory==null)
{dateCategory={"id":tripYear,"text":tripYear,"gallery":false};mapYearToDateCategory[tripYear]=dateCategory;dateCats.push(dateCategory);}
if(currentTrip.id!=null&&tripIdentifiers[currentTrip.id]==null)
{tripIdentifiers[currentTrip.id]="y";galleryCount++;dateCategory.gallery=true;}}
if(galleryCount==0)continue;var locCats=loc.cat;for(var catIndex=0;catIndex<locCats.length;catIndex++)
{var catId=locCats[catIndex];var locationCat=categoriesMap[catId];if(mapAliasToCategory[locationCat.alias]==null)
{mapAliasToCategory[locationCat.alias]=locationCat;locationCat.weight=(singleWeight*galleryCount);locationCat.link={"data-option-value":"."+locationCat.alias,"href":"#"+locationCat.alias,"class":"btn btn-small"};tagCloud.push(locationCat);}
else
{locationCat.weight+=(singleWeight*galleryCount);}}}}
function GetLocations(articleId)
{var articleLocations=[];for(var locIndex=0;locIndex<locations.length;locIndex++)
{var loc=locations[locIndex];for(var tripIndex=0;tripIndex<loc.trips.length;tripIndex++)
{var currentTrip=loc.trips[tripIndex];if(currentTrip.id==articleId)
{articleLocations.push(loc);break;}}}
return articleLocations;}
function buildCustomControl(parentControl,icon,title)
{var newControl=document.createElement('span');newControl.className="GMapControl";newControl.style.fontFamily='Arial,sans-serif';newControl.style.fontSize='18px';newControl.style.cursor='pointer';newControl.title=title;newControl.innerHTML='<i class="icon-'+icon+'"></i>';parentControl.appendChild(newControl);return newControl;}
function toggleFullScreen(controlFullScreen)
{var currentCenter=map.getCenter();if(controlFullScreen.fullScreen==false)
{controlFullScreen.fullScreen=true;$mapCanvas.css("position",'fixed').css('top',0).css('left',0).css("width",'100%').css("height",'100%').css("z-index",100000);controlFullScreen.innerHTML='<i class="icon-resize-small"></i>';controlFullScreen.title="Réduire";}
else
{controlFullScreen.fullScreen=false;$mapCanvas.css("position",'relative').css('top',0).css("width","100%").css("height",googleMapHeight).css("z-index",googleMapZindex);controlFullScreen.innerHTML='<i class="icon-resize-full"></i>';controlFullScreen.title="Plein écran";}
google.maps.event.trigger(map,'resize');map.setCenter(currentCenter);return false;}
function SetOriginalPositionAndZoom(map)
{map.panTo(initialPosition);map.setZoom(initialZoomLevel);}
function updateCategoriesWithNoGallery(areaCategories)
{for(var catIndex=0;catIndex<areaCategories.length;catIndex++)
{var category=areaCategories[catIndex];if(category.weight==null)
{if(displayAllLocations==true)
{category.disabled=false;}
else
{category.disabled=true;}}
if(category.children!=null)
{updateCategoriesWithNoGallery(category.children);}}}
function updateDateCategoriesWithNoGallery(dateCategories)
{for(var dateIndex=0;dateIndex<dateCategories.length;dateIndex++)
{var dateCategory=dateCategories[dateIndex];if(dateCategory.gallery==false)
{if(displayAllLocations==true)
{dateCategory.disabled=false;}
else
{dateCategory.disabled=true;}}}}
function ToggleDisplayAllLocations(control)
{if(displayAllLocations==true)
{displayAllLocations=false;control.innerHTML='<i class="icon-toggle-off"></i>';}
else
{displayAllLocations=true;control.innerHTML='<i class="icon-toggle-on"></i>';}
updateCategoriesWithNoGallery(cats);updateDateCategoriesWithNoGallery(dateCats);applyCatFiltering(areaFilters,dateFilters);}
function HomeControl(controlDiv,map,insideArticle){controlDiv.style.padding='5px';var controlUI=document.createElement('div');controlUI.style.backgroundColor='white';controlUI.style.color='#555555';controlUI.style.borderStyle='solid';controlUI.style.borderWidth='1px';controlUI.style.textAlign='center';controlUI.style.padding='2px';controlDiv.appendChild(controlUI);var controlHome=buildCustomControl(controlUI,"home","Recentrer la carte sur le point de départ");google.maps.event.addDomListener(controlHome,'click',function(){if(markerCluster!=null)
{markerCluster.fitMapToMarkers();markerCluster.repaint();}
else
{SetOriginalPositionAndZoom(map);}});if(insideArticle){var controlGlobe=buildCustomControl(controlUI,"globe","Accéder à la carte globale des galeries");google.maps.event.addDomListener(controlGlobe,'click',function(){routeArticle(60,17,101);});}else{var controlClear=buildCustomControl(controlUI,"cancel-circled","Initialiser les filtres");google.maps.event.addDomListener(controlClear,'click',function(){clearFilters();});controlToggleDisplay=buildCustomControl(controlUI,displayAllLocations?"toggle-on":"toggle-off","Afficher les destinations sans galerie");controlToggleDisplay.displayAll=true;google.maps.event.addDomListener(controlToggleDisplay,'click',function(){ToggleDisplayAllLocations(this);});}
var controlFullScreen=buildCustomControl(controlUI,"resize-full","Plein écran");controlFullScreen.fullScreen=false;google.maps.event.addDomListener(controlFullScreen,'click',function(){toggleFullScreen(this);});var $customControls=jQuery(controlUI).find(".GMapControl");$customControls.tipsy({gravity:'n',delayIn:0,delayOut:0,opacity:1,fade:true});}
function createMap(latitude,longitude,zoomValue,insideArticle){initialPosition=new google.maps.LatLng(latitude,longitude);initialZoomLevel=zoomValue;var mapOptions={backgroundColor:'black',center:initialPosition,zoom:zoomValue,scrollwheel:false,overviewMapControl:true,overviewMapControlOptions:{opened:true},mapTypeControlOptions:{mapTypeIds:[google.maps.MapTypeId.HYBRID,google.maps.MapTypeId.SATELLITE,google.maps.MapTypeId.TERRAIN,google.maps.MapTypeId.ROADMAP],style:google.maps.MapTypeControlStyle.DEFAULT},mapTypeId:google.maps.MapTypeId.HYBRID};map=new google.maps.Map(document.getElementById("map-canvas"),mapOptions);$mapCanvas=jQuery("#map-canvas");googleMapHeight=$mapCanvas.css('height');googleMapZindex=$mapCanvas.css('z-index');var homeControlDiv=document.createElement('div');var homeControl=new HomeControl(homeControlDiv,map,insideArticle);homeControlDiv.index=1;map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);infowindow=new google.maps.InfoWindow({content:"holding..."});return map;}
function createMarker(loc,articleId)
{var marker=new google.maps.Marker({position:loc.position,title:loc.title,icon:rootTemplate+"images/map/diver.png"});marker.articleId=articleId;marker.location=loc;marker.html=null;google.maps.event.addListener(marker,'click',function(){infowindow.setContent(getMarkerDesc(this));infowindow.open(map,this);});return marker;}
function addAllMarkers(map)
{for(var locIndex=0;locIndex<locations.length;locIndex++)
{var loc=locations[locIndex];var marker=createMarker(loc,null);markers.push(marker);}
var filteredMarkers=getFilteredMarkers();markerCluster=new MarkerClusterer(map,filteredMarkers,clusterOptions);markerCluster.fitMapToMarkers();}
function getMarkerDesc(marker)
{var location=marker.location;var articleId=marker.articleId;var locationPosLiteral="{lat:"+location.position.lat+", lng:"+location.position.lng+"}";var markerDesc="<div id='mapinfocontainer'><h3 class='mapinfotitle'><table class='mapinfotitletable' style='width: 100%'><tr>";markerDesc+="<td style='text-align: left; padding-right: 20px;'>"+location.title+"</td>";markerDesc+="<td style='text-align: right;'>";markerDesc+="<a href='javascript:map.panTo("+locationPosLiteral+")'><i class='icon-target' title='Centrer la carte sur ce lieu'></i></a>";markerDesc+="<a href='javascript:map.setCenter("+locationPosLiteral+");map.setZoom(map.getZoom()+1)'><i class='icon-zoom-in' title='Zoom avant'></i></a>";markerDesc+="<a href='javascript:map.setCenter("+locationPosLiteral+");map.setZoom(map.getZoom()-1)'><i class='icon-zoom-out' title='Zoom arrière'></i></a>";markerDesc+="</td><tr></table></h3>";markerDesc+="<p>"+location.desc+"</p>";for(var tripIndex=0;tripIndex<location.trips.length;tripIndex++)
{var currentTrip=location.trips[tripIndex];if(currentTrip.display==false)continue;if(articleId!=null&&articleId!=currentTrip.id)continue;if(articleId==null&&currentTrip.id!=null)
{markerDesc+="<p><a href='javascript:routeArticle("+currentTrip.id+", 8, 101)' style='font-weight: 600'><i class='icon-camera'></i>&nbsp;"+currentTrip.date+"</a></p>";}
else
{markerDesc+="<p><i class='icon-calendar'></i>"+currentTrip.date+"</p>";}}
markerDesc+="</div>";return markerDesc;}
function categoryMatchFilter(cat,filterCat)
{if(cat.id==filterCat.id)return true;return false;}
function applyFilteredMarkers(filteredMarkers)
{markerCluster.clearMarkers();markerCluster.addMarkers(filteredMarkers);markerCluster.fitMapToMarkers();markerCluster.repaint();if(filteredMarkers.length==0)
{SetOriginalPositionAndZoom(map);}}
function filterAreas(areaFilterCats,initialMarkers)
{var areaFilterMarkers=new Array();for(var markerIndex=0;markerIndex<initialMarkers.length;markerIndex++)
{var currentMarker=initialMarkers[markerIndex];var markerMatch=false;for(var catIndex=0;catIndex<areaFilterCats.length&&markerMatch==false;catIndex++)
{var areaFilterCatId=areaFilterCats[catIndex];for(var locCatIndex=0;locCatIndex<currentMarker.location.cat.length&&markerMatch==false;locCatIndex++)
{if(categoryMatchFilter(categoriesMap[currentMarker.location.cat[locCatIndex]],categoriesMap[areaFilterCatId]))
{areaFilterMarkers.push(currentMarker);markerMatch=true;}}}}
return areaFilterMarkers;}
function filterDates(dateFilterCats,initialMarkers)
{var dateFilteredMarkers=[];for(var markerIndex=0;markerIndex<initialMarkers.length;markerIndex++)
{var currentMarker=initialMarkers[markerIndex];var markerMatch=false;for(var catIndex=0;catIndex<dateFilterCats.length&&markerMatch==false;catIndex++)
{var filterYear=dateFilterCats[catIndex];for(var tripIndex=0;tripIndex<currentMarker.location.trips.length;tripIndex++)
{var currentTrip=currentMarker.location.trips[tripIndex];var tripDate=currentTrip.date;var tripYear=tripDate.substring(tripDate.length-4);if(filterYear==tripYear)
{markerMatch=true;}
else
{currentTrip.display=false;}}}
if(markerMatch==true)
{dateFilteredMarkers.push(currentMarker);}}
return dateFilteredMarkers;}
function removeLocationsWithoutPictures(initialMarkers)
{var markersWithPictures=new Array();for(var markerIndex=0;markerIndex<initialMarkers.length;markerIndex++)
{var currentMarker=initialMarkers[markerIndex];var markerMatch=false;for(var tripIndex=0;tripIndex<currentMarker.location.trips.length;tripIndex++)
{var currentTrip=currentMarker.location.trips[tripIndex];if(currentTrip.id!=null)
{markerMatch=true;}
else
{currentTrip.display=false;}}
if(markerMatch==true)
{markersWithPictures.push(currentMarker);}}
return markersWithPictures;}
function makeAllTripsVisible()
{for(var locIndex=0;locIndex<locations.length;locIndex++)
{var currentLocation=locations[locIndex];for(var tripIndex=0;tripIndex<currentLocation.trips.length;tripIndex++)
{currentLocation.trips[tripIndex].display=true;}}}
function getFilteredMarkers()
{makeAllTripsVisible();var filteredMarkers=markers;if(displayAllLocations==false)
{filteredMarkers=removeLocationsWithoutPictures(filteredMarkers);}
if(areaFilters!=null&&areaFilters.length>0)
{filteredMarkers=filterAreas(areaFilters,filteredMarkers);}
if(dateFilters!=null&&dateFilters.length>0)
{filteredMarkers=filterDates(dateFilters,filteredMarkers);}
return filteredMarkers;}
function applyCatFiltering(areaFilterCats,dateFilterCats)
{infowindow.close();areaFilters=areaFilterCats;dateFilters=dateFilterCats;var filteredMarkers=getFilteredMarkers();applyFilteredMarkers(filteredMarkers)};";}