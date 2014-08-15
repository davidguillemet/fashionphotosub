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
jimport('joomla.plugin.plugin');
class plgContentWookmark_Gallery extends JPlugin
{
	public function onContentPrepare($context, &$article, &$params, $page = 0)
	{
		if (strpos($article->text, 'end-wookmark') === false) 
		{
			return true;
		}
		$base_url=JURI::root();
		$load1 = $this->params->def('load1');
		$jsfiles = $this->params->def('jsfiles');
		$resizer = $this->params->def('resizer');
		$width = $this->params->def('width');
		$autoresize_gal = $this->params->get('autoresize_gal');
		$image_fetch = $this->params->def('image_fetch');
		$lg_cap = $this->params->def('lg_cap');
		$th_img_width = $this->params->def('th_img_width');
		$cap_pos = $this->params->def('cap_pos');
		$offset = $this->params->def('offset');
		$bg_color = $this->params->def('bg_color');
		$bg_opc = $this->params->def('bg_opc');
		$op_speed = $this->params->def('op_speed');
		$cl_speed = $this->params->def('cl_speed');
		$sh_color = $this->params->def('sh_color');
		$sh_width = $this->params->def('sh_width');
		$cls_but = $this->params->def('cls_but');
		$fan_border = $this->params->def('fan_border');
		$effect = $this->params->def('effect');
		
		//check if there is a tooltip at all for performance
		if(strpos($article->text, '{end-wookmark}'))
		{
			static $wookmark_css;
			if (!$wookmark_css) 
			{
			
				$document = JFactory::getDocument();
				$width=$width.'px';
				$sh_width=$sh_width.'px';
				$itemWidth=$th_img_width+10;
				
				($cls_but==1) ? $cls_but='true' : $cls_but = 'false';
				//$document->addStyleSheet(JURI::root().'plugins/content/wookmark_gallery/wookmark_gallery/tmpl/css/jquery.fancybox.css');
				if(!$autoresize_gal)
				{
					$document->addCustomTag("<style type='text/css'>
					.myapp{
						width: $width;}
					</style>");
				}
				($autoresize_gal==1) ? $autoresize_gal='true' : $autoresize_gal = 'false';
				$document->addCustomTag("<style type='text/css'>
					.fancybox-custom .fancybox-skin {
							box-shadow: 0 0 $sh_width $sh_color;
						}
				</style>");
				if($jsfiles==1)
				{
					if($load1==1)
					{
						$document->addScript( JURI::root().'plugins/content/wookmark_gallery/wookmark_gallery/tmpl/js/jquery-1.7.2.min.js' );
					}
				$document->addScript(JURI::root().'plugins/content/wookmark_gallery/wookmark_gallery/tmpl/js/images.loaded.js' );
				$document->addScript(JURI::root().'plugins/content/wookmark_gallery/wookmark_gallery/tmpl/js/jquery.wookmark.js' );
				$document->addScript(JURI::root().'plugins/content/wookmark_gallery/wookmark_gallery/tmpl/js/jquery.fancybox.js' );
				}
				else
				{
					if($load1==1)
					{
						echo '<script src="'.$base_url.'plugins/content/wookmark_gallery/wookmark_gallery/tmpl/js/jquery-1.7.2.min.js" type="text/javascript"></script>';
					}
					echo '<script src="'.$base_url.'plugins/content/wookmark_gallery/wookmark_gallery/tmpl/js/images.loaded.js" type="text/javascript"></script>
							<script src="'.$base_url.'plugins/content/wookmark_gallery/wookmark_gallery/tmpl/js/jquery.wookmark.js" type="text/javascript"></script>
						  <script src="'.$base_url.'plugins/content/wookmark_gallery/wookmark_gallery/tmpl/js/jquery.fancybox.js" type="text/javascript"></script>';
				}
				$wookmark_css = 1;
			}
			$string = $article->text;
			if($image_fetch)
			{
					$regex = "/{wookmark}(.*?){end-wookmark}/is";			
					preg_match_all($regex, $string, $matches);
					for($n = 0; $n < count($matches[0]); $n++)
					{
						$arr_org = $matches[0][$n];
						$arr_folder_path = $matches[1][$n]; // image path 
						$returned = $this->fetchImgFold($arr_folder_path);// returned value
						$matches[0][$n]=str_replace($matches[0][$n],"<div class='myapp'><ul class='tiles'>$returned</ul></div>",$matches[0][$n]);
						$string= str_replace($arr_org,$matches[0][$n],$string);
					}
			}
			else
			{
					$regex = "/{wookmark}(.*?){title}(.*?){end-wookmark}/is";			
					preg_match_all($regex, $string, $matches);
					for($n = 0; $n < count($matches[0]); $n++)
					{
						$arr_org = $matches[0][$n];
						$arr_folder_path = $matches[1][$n]; // image path 
						$arr_title = $matches[2][$n]; // image path 
						$returned = $this->fetchImgTxt($arr_folder_path,$arr_title);// returned value
						$matches[0][$n]=str_replace($matches[0][$n],"<div class='myapp'><ul class='tiles'>$returned</ul></div>",$matches[0][$n]);
						$string= str_replace($arr_org,$matches[0][$n],$string);
					}
			}
			$article->text=$string."<script type='text/javascript'>
			jQuery(document).imagesLoaded(function() {
			jQuery(document).ready(new function() {
			  var options = {
				autoResize: $autoresize_gal, 
				container: jQuery('.myapp'), 
				offset: $offset, 
				itemWidth: $itemWidth
			  };
			  var handler = jQuery('.tiles li');
			  handler.wookmark(options);
			});
			});
		  </script>	";
		}
	}

	function fetchImgFold($folder_path)
	{
		$base_url=JURI::root();
		$tool = $this->params->def('tool');
		$base=trim(JURI::base(true),'/\\');
		$th_img_width = $this->params->def('th_img_width');
		$folder_path=trim($folder_path,'\\/').'/';
		$dir = opendir($folder_path);
		while ($file = readdir($dir))
		{ 
		   if (preg_match('/(.*?)\.gif/i',$file) || preg_match('/(.*?)\.png/i',$file) || preg_match('/(.*?)\.jpg/i',$file) || preg_match('/(.*?)\.jpeg/i',$file) )
		   { 
			   $string1[] = $file;
		   }
		}
		$tag='';
		for($c=0;$c <count($string1) ; $c++)
		{
		
			$tag.="<li>
					<a rel='shadowbox[gallery]' href='$base_url$folder_path$string1[$c]'>
						<img src='$base_url".'plugins/content/wookmark_gallery/wookmark_gallery/tmpl/'."$tool.php?src=$base/$folder_path$string1[$c]&w=$th_img_width&q=100'>
					</a>
			</li>";
		
		}
		return $tag;
	}
	
	function fetchImgTxt($arr_img_path,$arr_title)
	{
		$base_url=JURI::root();
		$tool = $this->params->def('tool');
		$base=trim(JURI::base(true),'/\\');
		$th_img_width = $this->params->def('th_img_width');
		$img_path=explode(',',$arr_img_path);
		$title=explode(',',$arr_title);
		$tag='';
		for($i = 0; $i < count($img_path); $i++)
		{
			$tag.="<li>
					<a rel='shadowbox[gallery]' href='$base_url$img_path[$i]' title='$title[$i]'>
						<img src='$base_url".'plugins/content/wookmark_gallery/wookmark_gallery/tmpl/'."$tool.php?src=$base/$img_path[$i]&w=$th_img_width&q=100'>
					</a>
				</li>";
		}
		return $tag;
	}
}
?>