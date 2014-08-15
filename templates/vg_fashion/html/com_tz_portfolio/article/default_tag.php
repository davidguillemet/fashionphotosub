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

// no direct access
defined('_JEXEC') or die('Restricted access');

$params = $this -> item -> params;
$tmpl           = JRequest::getString('tmpl');

?>
<?php if($params -> get('show_tags',1)):?>
    <?php if($this -> listTags):?>


<!--            <h3>--><?php //echo JText::_('COM_TZ_PORTFOLIO_TAG_TITLE');?><!--</h3>-->
        <span class="p_tag">
                <?php $count_tag = count($this -> listTags); $i=1; foreach($this -> listTags as $row):?>
                    <?php echo $row -> name; if($i > 1 && $i != $count_tag){ ?>, <?php } ?>
                <?php $i++; endforeach;?>
        </span>
    <?php endif;?>
<?php endif; ?>
