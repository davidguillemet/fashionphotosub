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

$doc    = JFactory::getDocument();
$params = $this -> item -> params;
if($params -> get('tz_show_gmap',1) == 1):
  
?>

<script type="text/javascript">

var markerCluster = null;

function onLocationsDataLoaded()
{
	var articleId = "<?php echo JFactory::getApplication()->input->get('id'); ?>";
	var articleLocations = GetLocations(articleId);
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
		var articleMarker = createMarker(loc, articleId);
		if (useCluster)
		{
			// several markers, add them to the cluster later...
			articleMarkers.push(articleMarker);
		}
		else
		{
			// Ony one marker, add it to the map right now
			articleMarker.setMap(map);
		}
	}
	
	if (useCluster)
	{
		markerCluster = new MarkerClusterer(map, articleMarkers, clusterOptions);
		markerCluster.fitMapToMarkers();
		SetOriginalPositionAndZoom = function(map)
		{
			// This method overwrittes the original method SetOriginalPositionAndZoom which is defined in location.js
			markerCluster.fitMapToMarkers();			
		}
	}
	
}

google.load("maps", "3", { other_params : "key=AIzaSyCKLtTlcioENuFJU6ruZwtIrwxr7S07nTw", callback: function() { loadLocationsData(false); } } );

</script>

<div class="TzGoogleMap">
<h3 class="TzGoogleMapTitle"><?php echo JText::_('COM_TZ_PORTFOLIO_GOOGLE_MAP_TITLE');?></h3>
<div id="map-canvas" style="width: 100%; height: 400px;">&nbsp;</div>
</div>
<?php endif; ?>
