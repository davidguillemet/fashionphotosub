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
defined('_JEXEC') or die;

$params = $this -> item -> params;
?>
<?php if ($params->get('show_hits',1)) : ?>
	<span class="TzHits font-italic">
		<i class="icon-eye" style="font-size: 18px"></i>
		<?php echo JText::_('TZ_READ'); ?>
		<?php echo JText::sprintf($this->item->hits); ?>
		<?php echo JText::_('TZ_READ_TIME'); ?>
		<meta itemprop="interactionCount" content="UserPageVisits:<?php echo $this->item->hits; ?>" />
	</span>
<?php endif; ?>
