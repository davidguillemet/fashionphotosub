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
<?php if($params -> get('show_comment',1)):?>
	<h3 class="TzCommentTitle"><?php echo JText::_('COM_TZ_PORTFOLIO_COMMENT_TITLE');?></h3>
	<?php echo $this -> item -> event -> onTZPortfolioCommentDisplay;?>
<?php endif;?>
