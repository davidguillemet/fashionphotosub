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

defined('_JEXEC') or die();

$params = $this -> params;

$doc    = JFactory::getDocument();
$doc -> addScriptDeclaration('
jQuery(document).ready(function(){
    jQuery("#portfolio").tzInfiniteScroll({
        "params"    : '.$this -> params .',
        rootPath    : "'.JUri::root().'",
        itemID      : '.$this -> Itemid.',
         msgText    : "<i class=\"tz-icon-spinner tz-spin\"><\/i>'.JText::_('COM_TZ_PORTFOLIO_LOADING_TEXT').'",
        loadedText  : "'.JText::_('COM_TZ_PORTFOLIO_NO_MORE_PAGES').'"
        '.(isset($this -> commentText)?(',commentText : "'.$this -> commentText.'"'):'').'
    });
});');
?>
<div id="tz_append" class="text-center">
    <?php if($params -> get('tz_portfolio_layout') == 'ajaxButton'):?>
    <a href="javascript:" class="btn btn-large btn-block"><?php echo JText::_('COM_TZ_PORTFOLIO_ADD_ITEM_MORE');?></a>
    <?php endif;?>
</div>


<div id="loadaj" style="display: none;">
    <a href="<?php echo JURI::root().'index.php?option=com_tz_portfolio&amp;view=portfolio&amp;task=portfolio.ajax'
        .'&amp;layout=item'.(($this -> char)?'&amp;char='.$this -> char:'').'&amp;Itemid='
        .$this -> Itemid.'&amp;page=2'; ?>">
    </a>
</div>
