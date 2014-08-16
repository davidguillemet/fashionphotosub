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
defined( '_JEXEC' ) or die( 'Restricted access' );
jimport('joomla.plugin.plugin');
class plgSystemEasyShareThis  extends JPlugin 
{
	function __construct(&$subject, $config = array()) {
		// call parent constructor
		parent::__construct($subject, $config);
	}
	function onAfterRender()
	{
		$app = JFactory::getApplication();
		if( $app->isAdmin()) {
         return false;
		}
		$document = JFactory::getDocument();
		$docType = $document->getType();
		$base_url=JURI::root();
		$icons = $this->params->get('icons');
		
		$padding_left= $this->params->get('padding_left').'px';
		$padding_right= $this->params->get('padding_right').'px';
		$padding_top= $this->params->get('padding_top').'px';
		$padding_bottom= $this->params->get('padding_bottom').'px';
		$margin_left= $this->params->get('margin_left').'px';
		$margin_right= $this->params->get('margin_right').'px';
		$margin_top= $this->params->get('margin_top').'px';
		$margin_bottom= $this->params->get('margin_bottom').'px';
		
		if($this->params->get('shorten'))
			$shorten = 'true' ;
		else
			$shorten = 'false' ;
		$alignment = $this->params->get('alignment');
		$items = json_decode(str_replace("|qq|", "\"", $this->params->get('slides')));
		foreach ($items as $item)
		{
			$imgname[]=$item->imgname;
			$imgthumb[]=$item->imgthumb;
			$appmode[]=$item->appmode;
			$appvalue[]=$item->appvalue;
		}
		for($i=0;$i<count($imgname);$i++)
		{
			if(!isset($social_net)){
				$social_net='';
			}
			if($appmode[$i]=='1')
			{
				if($imgname[$i]==='Twitter')
				{
					$social_net.="<span class='$appvalue[$i]$icons' st_via='' ></span>";
				}
				else
				{
					$social_net.="<span class='$appvalue[$i]$icons' ></span>";
				}
			}
			else
				$social_net.="";
		}
		$social_net="<div class='custom-easysharethis'>".$social_net.'</div>';
		$html = JResponse::getBody();
		$regex = "/{easy-sharethis}/is";
		if(strpos($html, '{easy-sharethis}'))
		{
			$string =$html;
			$regex = "/{easy-sharethis}/is";			
			preg_match_all($regex, $string, $matches); 			
			for($n = 0; $n < count($matches[0]); $n++)
			{
				if($n==0){
					$string=str_replace("</head>","<style type='text/css'>
		.custom-easysharethis{ 
			padding: $padding_top $padding_right $padding_bottom $padding_left !important;
			margin: $margin_top $margin_right $margin_bottom $margin_left !important; 
			}
		</style>
		</head>",$string);
				}
				$arr_org=$matches[0][$n];
				$string= str_replace($arr_org,"<div align='$alignment'><script type='text/javascript' src='https://ws.sharethis.com/button/buttons.js'></script><script type='text/javascript'>stLight.options({nativeCount:true,doNotHash : true, doNotCopy: true ,hashAddressBar: false,shorten: '$shorten'}); ;  </script>$social_net</div>",$string);
			}
			$html=$string;
			JResponse::setBody($html);
		}	
	}
}
  