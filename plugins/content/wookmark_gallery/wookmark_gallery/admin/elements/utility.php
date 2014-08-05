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

jimport('joomla.html.html');
$version=(float)JVERSION;
$version=(int)($version*10);
if($version==15)
{
	jimport('joomla.html.parameter.element');
	class JElementUtility extends JElement {
	function fetchElement($name, $value, &$node, $control_name){
			$doc = JFactory::getDocument();
			  //$doc->addScript(JURI::root()."plugins/content/wookmark_gallery/admin/".'jquery.min.js');
			 $doc->addScript(JURI::root()."plugins/content/wookmark_gallery/admin/".'admin_script15.min.js');        
			return null;
		}
	}
}
else
{
	jimport('joomla.form.formfield');
	class JFormFieldUtility extends JFormField
	{
		protected  $type = 'Utility';
		protected function getInput()
		{
			$doc = JFactory::getDocument();
			//$doc->addScript(JURI::root(true).'/plugins/content/wookmark_gallery/wookmark_gallery/admin/jquery.min.js');
			$doc->addScript(JURI::root(true).'/plugins/content/wookmark_gallery/wookmark_gallery/admin/admin_script25.min.js');
		}
		protected function getLabel()
		{
			return '';
		}
	}
}


