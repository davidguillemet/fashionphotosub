<?php
/*------------------------------------------------------------------------

# TZ Portfolio Extension

# ------------------------------------------------------------------------

# author    DuongTVTemPlaza

# copyright Copyright (C) 2012 templaza.com. All Rights Reserved.

# @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL

# Websites: http://www.templaza.com

# Technical Support:  Forum - http://templaza.com/Forum

-------------------------------------------------------------------------*/

$doc    = &JFactory::getDocument();
$params = $this -> item -> params;
if($params -> get('tz_show_gmap',1) == 1):
  
?>

<script type="text/javascript">

var markerCluster = null;

function onLocationsDataLoaded()
{
	var locationId = "<?php echo JFactory::getApplication()->input->get('id'); ?>";
	var articleLocations = GetLocations(locationId);
	var articleMarkers = [];
	var map = null;
	var useCluster = (articleLocations.length > 1);
	for (var locIdx = 0; locIdx < articleLocations.length; locIdx++)
	{
		var loc = articleLocations[locIdx];
		if (map == null)
		{
			map = createMap(loc.position.lat, loc.position.lng, <?php echo $params->get('tz_gmap_zoomlevel', 10); ?> , true);
		}
		var articleMarker = null;
		if (useCluster)
		{
			// several markers, add them to the cluster later...
			articleMarker = createMarker(loc, true);
			articleMarkers.push(articleMarker);
		}
		else
		{
			// Ony one marker, add it to the map right now
			articleMarker = addSingleMarker(map, loc);			
		}
	}
	
	if (useCluster)
	{
		markerCluster = new MarkerClusterer(map, articleMarkers, clusterOptions);
		markerCluster.fitMapToMarkers();
		SetOriginalPositionAndZoom = function(map) {
			// This method overwrittes the original method SetOriginalPositionAndZoom which is defined in location.js
			markerCluster.fitMapToMarkers();			
		}
	}
	
}

loadLocationsData(false);

</script>

<div class="TzGoogleMap">
<h3 class="TzGoogleMapTitle"><?php echo JText::_('COM_TZ_PORTFOLIO_GOOGLE_MAP_TITLE');?></h3>
<div id="map-canvas" style="width: 100%; height: 400px;">&nbsp;</div>
</div>
<?php endif; ?>
