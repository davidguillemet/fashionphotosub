<?php
/**
 * @package		Joomla.Site
 * @subpackage	Templates.vg_fashion
 * @copyright	Copyright (C) 2012 Valentín García - http://www.valentingarcia.com.mx - All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;
//vars
if( $text == '' ){
	$text = JText::_('VG_FS_SEARCH');
}
?>

<div class="search-block">
    <form action="<?php echo JRoute::_('index.php');?>" method="post">
        <input id="mod-search-searchword" name="searchword" type="text" value="<?php echo $text; ?>" onblur="if(this.value=='') this.value='<?php echo $text; ?>';" onfocus="if(this.value=='<?php echo $text; ?>') this.value='';" />
		<input type="hidden" name="task" value="search" />
    	<input type="hidden" name="option" value="com_search" />
    	<input type="hidden" name="Itemid" value="<?php echo $mitemid; ?>" />
	</form>
</div>

<script>
$f(document).ready(function(){
	$f('#mod-search-searchword').attr('value');
});
</script>