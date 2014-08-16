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
$version=(float)JVERSION;
$version=(int)($version*10);
if($version==15)
{
	jimport('joomla.html.parameter.element');
	class JElementAbout extends JElement {
	function fetchElement($name, $value, &$node, $control_name){       
			return '<div id="gk_about_us">' . JText::_("<div style='color: #555555; float: left; font-size: 12px;'>Easy ShareThis is developed by <a href='http://www.infyways.com' target='_blank' style='color: #AB3F0A'>Infyways</a>. For any support and queries <a href='http://support.infyways.com' target='_blank' style='color: #AB3F0A'>Click Here</a>. For other Joomla! extensions please visit :<a href='http://www.infyways.com/store' target='_blank' style='color: #AB3F0A'>http://www.infyways.com/store</a>. Please rate and review our extension at Joomla Extensions  Directory. <p style='font-size: 11px; text-align: center;margin: 60px -10px 0; border-top: 1px solid #eee; padding: 6px 0'>Easy ShareThis is released under the <a href='http://www.gnu.org/licenses/gpl-2.0.html' target='_blank' style='color: #AB3F0A'>GNU/GPL v2 license.</a></p></div>") . '</div>';
		}
	}
}
else
{
	jimport('joomla.form.formfield');
	class JFormFieldAbout extends JFormField {
		protected $type = 'About';
		protected function getInput() {
			return '<div id="gk_about_us">' . JText::_("<div style='color: #555555; float: left; font-size: 12px;'>Easy ShareThis is developed by <a href='http://www.infyways.com' target='_blank' style='color: #AB3F0A'>Infyways</a>. For any support and queries <a href='http://support.infyways.com' target='_blank' style='color: #AB3F0A'>Click Here</a>. For other Joomla! extensions please visit :<a href='http://www.infyways.com/store' target='_blank' style='color: #AB3F0A'>http://www.infyways.com/store</a>. Please rate and review our extension at Joomla Extensions  Directory. <p style='font-size: 11px; text-align: center;margin: 60px -10px 0; border-top: 1px solid #eee; padding: 6px 0'>Easy ShareThis is released under the <a href='http://www.gnu.org/licenses/gpl-2.0.html' target='_blank' style='color: #AB3F0A'>GNU/GPL v2 license.</a></p></div>") . '</div>';
		}
	}
}
/* eof */