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
$params         = $this -> item -> params;
$doc            = JFactory::getDocument();
$socialInfos    = $this -> socialInfo;
$url = JRoute::_(TZ_PortfolioHelperRoute::getPortfolioArticleRoute($this -> item -> slug,$this -> item -> catid),true,-1);
//$url    = 'http://www.templaza.com';
?>
{easy-sharethis}
