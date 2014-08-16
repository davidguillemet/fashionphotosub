<?php
/*------------------------------------------------------------------------
# plg_sys_sharethis - Easy ShareThis
# ------------------------------------------------------------------------
# author    Infyways Solutions
# copyright Copyright (C) 2012 Infyways Solutions. All Rights Reserved.
# @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
# Websites: http://www.infyways.com
# Technical Support:  Forum - http://support.infyways/com
-------------------------------------------------------------------------*/
// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );
class JFormFieldGsslidesmanager extends JFormField {

    protected $type = 'gsslidesmanager';

    protected function getInput() {

        $document = JFactory::getDocument();
        $document->addScriptDeclaration("JURI='" . JURI::root() . "'");
        $path = 'plugins/system/easysharethis/admin/elements/gsslidesmanager/';
        JHTML::_('script', $path.'gsslidesmanager.js');
        JHTML::_('script', $path.'FancySortable.js');
        JHTML::_('stylesheet', $path.'gsslidesmanager.css');

        $html = '<input name="' . $this->name . '" id="gsslides" type="hidden" value="' . $this->value . '" />'
                . '<ul id="gsslideslist" style="clear:both;"></ul>';

        return $html;
    }
    protected function getLabel() {

        return '';
    }

}

