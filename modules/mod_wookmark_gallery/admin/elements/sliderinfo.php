<?php
/*------------------------------------------------------------------------
# mod_responsive_gallery - Responsive Image Gallery
# ------------------------------------------------------------------------
# author    Infyways Solutions
# copyright Copyright (C) 2012 Infyways Solutions. All Rights Reserved.
# @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
# Websites: http://www.infyways.com
# Technical Support:  Forum - http://support.infyways/com
-------------------------------------------------------------------------*/
// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );
	jimport('joomla.form.formfield');
	class JFormFieldSliderinfo extends JFormField {
	protected $type = 'Sliderinfo';
	protected function getInput() {
		return '<div id="gk_sliderinfo">' . JText::_("<div style='color: #555555; float: left; font-size: 12px;'><b>	Note: Slider Settings</b> parameters will be enabled only when <b>Image path Selection</b> is set to <b>Individual Image Path</b></div>") . '</div></br>';
	}
}