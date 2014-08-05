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
defined('_JEXEC') or die('Restricted access');
class JFormFieldGsslidesmanager extends JFormField {

    protected $type = 'gsslidesmanager';

    protected function getInput() {

        $document = JFactory::getDocument();
        $document->addScriptDeclaration("JURI='" . JURI::root() . "'");
        $path = 'modules/mod_wookmark_gallery/admin/elements/gsslidesmanager/';
        JHTML::_('behavior.modal');
        JHTML::_('script', $path.'gsslidesmanager.js');
        JHTML::_('script', $path.'FancySortable.js');
        JHTML::_('stylesheet', $path.'gsslidesmanager.css');

        $html = '<input name="' . $this->name . '" id="gsslides" type="hidden" value="' . $this->value . '" />'
                . '<input name="gsaddslide" id="gsaddslide" type="button" value="' . JText::_('Add a slide') . '" onclick="javascript:addslidegs();"/>'
                . '<ul id="gsslideslist" style="clear:both;"></ul>'
                . '<input name="gsaddslide" id="gsaddslide" type="button" value="' . JText::_('Add a slide') . '" onclick="javascript:addslidegs();"/>';

        return $html;
    }
    protected function getLabel() {

        return '';
    }

}

