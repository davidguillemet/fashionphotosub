<?php
/*------------------------------------------------------------------------
# mod_wookmark_gallery - Woomark Image Gallery
# ------------------------------------------------------------------------
# author    Infyways Solutions
# copyright Copyright (C) 2012 Infyways Solutions. All Rights Reserved.
# @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
# Websites: http://www.infyways.com
# Technical Support:  Forum - http://support.infyways/com
-------------------------------------------------------------------------*/
defined( '_JEXEC' ) or die( 'Restricted access' );
class modWookGalleryHelper {

    static function getItems($params) {
        $items = json_decode(str_replace("|qq|", "\"", $params->get('slides')));
        return $items;
    }
}