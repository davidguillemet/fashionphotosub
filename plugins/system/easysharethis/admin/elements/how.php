<?php
/*------------------------------------------------------------------------
# easysharethis.php - Easy ShareThis
# ------------------------------------------------------------------------
# author    Infyways Solutions
# copyright Copyright (C) 2011 Infyways Solutions. All Rights Reserved.
# @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
# Websites: http://www.infyways.com
# Technical Support:  Forum - http://support.infyways.com
-------------------------------------------------------------------------*/
// no direct access
defined('_JEXEC') or die('Restricted access');
jimport('joomla.html.html');
$version=(float)JVERSION;
$version=(int)($version*10);
if($version==15)
{
jimport('joomla.html.parameter.element');
	class JElementHow extends JElement {
	function fetchElement($name, $value, &$node, $control_name){
			return '<div id="gk_how_to_use">' . JText::_("<div style='color: #555555; float: left; font-size: 12px;'>Here is the syntax how to use it. Write the below code where you want to show the plugin.<p style='font-size: 11px; text-align: center;margin: 60px -10px 0; border-top: 1px solid #eee; padding: 6px 0'>{easy-sharethis}<br/></p></div>") . '</div>';
		}
	}
}
else
{	
	
	jimport('joomla.form.formfield');
	class JFormFieldHow extends JFormField {
		protected $type = 'How';
		protected function getInput() {
			return '<div id="gk_how_to_use">' . JText::_("<div style='color: #555555; float: left; font-size: 12px;'>Here is the syntax how to use it. Write the below code where you want to show the plugin.<p style='font-size: 11px; text-align: center;margin: 60px -10px 0; border-top: 1px solid #eee; padding: 6px 0'>{easy-sharethis}<br/></p></div>") . '</div>';
		}
	}
}
/* eof */