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

var articleMarker;
var initialZoomLevel = <?php echo $params -> get('tz_gmap_zoomlevel',10);?>;

function HomeControl(controlDiv, map, location) {

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
  controlUI.title = 'Centrer la carte sur ' + location.title;
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '18px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<i class="icon-home"></i>';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to
  // Chicago
  google.maps.event.addDomListener(controlUI, 'click', function() {
    map.panTo(articleMarker.getPosition());
	map.setZoom(initialZoomLevel);
  });

}

function initializeMap() {

  var locationId = "<?php echo JFactory::getApplication()->input->get('id'); ?>";
  var loc = locations[locationId];
  var latitude = loc.lat;
  var longitude = loc.lng;
  
  var map = createMap(latitude, longitude, initialZoomLevel);
	
  articleMarker = addSingleMarker(map, loc);
  var homeControlDiv = document.createElement('div');
  var homeControl = new HomeControl(homeControlDiv, map, loc);

  homeControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);
  
}

google.maps.event.addDomListener(window, 'load', initializeMap);

</script>

<div class="TzGoogleMap">
<h3 class="TzGoogleMapTitle"><?php echo JText::_('COM_TZ_PORTFOLIO_GOOGLE_MAP_TITLE');?></h3>
<div id="map-canvas" style="width: 100%; height: 400px;">&nbsp;</div>
</div>
<?php endif;?>
