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
<p style="text-align: center">
<span class='st_sharethis_large' displayText='ShareThis'></span>
<span class='st_twitter_large' displayText='Tweet'></span>
<span class='st_linkedin_large' displayText='LinkedIn'></span>
<span class='st_pinterest_large' displayText='Pinterest'></span>
<span class='st_email_large' displayText='Email'></span>
<span class='st_googleplus_large' displayText='Google +'></span>
<span class='st_google_bmarks_large' displayText='Bookmarks'></span>
<span class='st_facebook_large' displayText='Facebook'></span>
<span class='st_fblike_large' displayText='Facebook Like'></span>
</p>