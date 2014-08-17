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
<?php if ($params->get('show_create_date',1)) : ?>
	<span class="TzCreate date" itemprop="dateCreated">
		<?php setlocale(LC_TIME, "fr_FR"); echo strftime("%e %B %Y", strtotime($this->item->created)); ?>
	</span>
<?php endif; ?>