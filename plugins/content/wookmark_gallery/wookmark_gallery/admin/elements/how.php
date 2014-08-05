<?php
/*------------------------------------------------------------------------
# plg_wookmark_gallery - Wookmark Image Gallery Plugin
# ------------------------------------------------------------------------
# author    Infyways Solutions
# copyright Copyright (C) 2012 Infyways Solutions. All Rights Reserved.
# @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
# Websites: http://www.infyways.com
# Technical Support:  Forum - http://support.infyways/com
-------------------------------------------------------------------------*/
// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );
$version=(float)JVERSION;
$version=(int)($version*10);
if($version==15)
{
	jimport('joomla.html.parameter.element');
	class JElementHow extends JElement {
	function fetchElement($name, $value, &$node, $control_name){       
			return '<div id="gk_about_us">' . JText::_("<div style='color: #555555; float: left; font-size: 12px;'>How to use the plugin??<hr/> 
			1)If you are using this plugin and you want to grab images from a folder. Then
			write the following pattern inside your article<br/>Syntax : {wookmark}path/to/image_folder{end-wookmark}<br/>e.g. {wookmark}images/test/{end-wookmark}<br/><br/> 2) If you want to grab individual images along with their title. Then use the
			following pattern.<br/>Syntax: {wookmark}image_path1,image_path2,image_path3{title}Title1,Title2,Title3{end-wookmark}<br/>e.g. {wookmark}images/test/new1.jpg,images/as/2.jpg{title}Text1,Text2{end-wookmark}</div>") . '</div>';
		}
	}
}
else
{
	jimport('joomla.form.formfield');
	class JFormFieldHow extends JFormField {
		protected $type = 'How';
		protected function getInput() {
			return '<div id="gk_about_us">' . JText::_("<div style='color: #555555; float: left; font-size: 12px;'>How to use the plugin??<hr/> 
			1)If you are using this plugin and you want to grab images from a folder. Then
			write the following pattern inside your article<br/>Syntax : {wookmark}path/to/image_folder{end-wookmark}<br/>e.g. {wookmark}images/test/{end-wookmark}<br/><br/> 2) If you want to grab individual images along with their title. Then use the
			following pattern.<br/>Syntax: {wookmark}image_path1,image_path2,image_path3{title}Title1,Title2,Title3{end-wookmark}<br/>e.g. {wookmark}images/test/new1.jpg,images/as/2.jpg{title}Text1,Text2{end-wookmark}</div>") . '</div>';
		}
	}
}