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

?>
<?php if ($params->get('show_modify_date',1)) : ?>
	<span class="TzModified font-italic">
		<i class="icon-edit" style="font-size: 16px"></i>
		<?php echo JText::_('TZ_DATE_MODIFIED'); ?>
		<?php echo JText::sprintf(JHtml::_('date', $this->item->modified, JText::_('DATE_FORMAT_LC1'))); ?>
	</span>
<?php endif; ?>
