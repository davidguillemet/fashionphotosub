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

function initializeMap() {

  var locationId = "<?php echo JFactory::getApplication()->input->get('id'); ?>";
  var loc = locations[locationId];
  var map = createMap(loc.position.lat(), loc.position.lng(), <?php echo $params -> get('tz_gmap_zoomlevel',10);?>);
	
  var articleMarker = addSingleMarker(map, loc);    
}

google.maps.event.addDomListener(window, 'load', initializeMap);

</script>

<div class="TzGoogleMap">
<h3 class="TzGoogleMapTitle"><?php echo JText::_('COM_TZ_PORTFOLIO_GOOGLE_MAP_TITLE');?></h3>
<div id="map-canvas" style="width: 100%; height: 400px;">&nbsp;</div>
</div>
<?php endif;?>
