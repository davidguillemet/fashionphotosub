<?php die("Access Denied"); ?>#x#a:2:{s:6:"output";s:0:"";s:6:"result";s:720:"var markerCluster=null;function onLocationsDataLoaded()
{var articleId="222";var articleLocations=GetLocations(articleId);var articleMarkers=[];var map=null;var useCluster=(articleLocations.length>1);for(var locIdx=0;locIdx<articleLocations.length;locIdx++)
{var loc=articleLocations[locIdx];if(map==null)
{map=createMap(loc.position.lat,loc.position.lng,10,true);}
var articleMarker=createMarker(loc,articleId);if(useCluster)
{articleMarkers.push(articleMarker);}
else
{articleMarker.setMap(map);}}
if(useCluster)
{markerCluster=new MarkerClusterer(map,articleMarkers,clusterOptions);markerCluster.fitMapToMarkers();SetOriginalPositionAndZoom=function(map)
{markerCluster.fitMapToMarkers();}}}
loadLocationsData(false);";}