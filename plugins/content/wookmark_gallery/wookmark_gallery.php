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
			$width=$width.'px';
			$sh_width=$sh_width.'px';
			$itemWidth=$th_img_width+2;//+10;

			static $wookmark_css;
			if (!$wookmark_css) 
			{
				$document = JFactory::getDocument();
				
				($cls_but==1) ? $cls_but='true' : $cls_but = 'false';
				if(!$autoresize_gal)
				{
					$document->addCustomTag(
						"<style type='text/css'>" .
						".myapp{ width: $width; }" .
						"</style>");
				}
				($autoresize_gal==1) ? $autoresize_gal='true' : $autoresize_gal = 'false';
				if($jsfiles==1)
				{
					if($load1==1)
					{
						$document->addScript( JURI::root().'plugins/content/wookmark_gallery/wookmark_gallery/tmpl/js/jquery-1.7.2.min.js' );
					}
				}
				else
				{
					if($load1==1)
					{
						echo '<script src="'.$base_url.'plugins/content/wookmark_gallery/wookmark_gallery/tmpl/js/jquery-1.7.2.min.js" type="text/javascript"></script>';
					}
				}
				$wookmark_css = 1;
			}
			$string = $article->text;

			$containerCount = 0;
			$regex = "/{wookmark}(.*?){end-wookmark}/is";			
			preg_match_all($regex, $string, $matches);
			for ($n = 0; $n < count($matches[0]); $n++)
			{
				$arr_org = $matches[0][$n];
				$arr_folder_path = $matches[1][$n]; // image path 
					
				$singleRegex = "/{wookmark}(.*?){title}(.*?){align}(.*?){end-wookmark}/is";
				preg_match_all($singleRegex, $arr_org, $singleMatches);
				if (count($singleMatches[0]) > 0)
				{
					// only one match might happen...
					$arr_image_path = $singleMatches[1][0];
					$arr_image_title = $singleMatches[2][0];
					$imageAlign = $singleMatches[3][0];
					$returned = $this->fetchImgTxt($arr_image_path, $arr_image_title, $imageAlign);
					$string= str_replace($arr_org, $returned, $string);
				}
				else
				{
					$insertDB = false;
					$generateFile = false;
					// On peut avoir des paramètres du type "folder/folder|param1=value;param2=value;..."
					// ici, $arr_folder_path vaut "folder/folder|param1=value;param2=value;..."
					$parameters = explode("|", $arr_folder_path);
					// On remet "folder/folder" dans $arr_folder_path
					$arr_folder_path = $parameters[0];
					if (count($parameters) > 1)
					{
						// lecture des paramètres
						$parameters = explode(";", $parameters[1]);
						if (count($parameters) > 0)
						{
							for ($paramIndex = 0; $paramIndex < count($parameters); $paramIndex++)
							{
								$pair = explode("=", $parameters[$paramIndex]);
								if (count($pair) > 1)
								{
									$paramName = $pair[0];
									if ($paramName == "insert")
									{
										$insertDB = $this->readBooleanParameter($pair);
									}
									else if ($paramName == "new")
									{
										$generateFile = $this->readBooleanParameter($pair);
									}
								}
							}
						}
					}
					$returned = $this->fetchImgFold($arr_folder_path, $insertDB, $generateFile, $containerCount);
						
					$galleryHtml = "<div class='myapp' id='myapp$containerCount'><ul class='tiles' id='tiles$containerCount'>$returned</ul></div>";
					$galleryHtml .= "<div id='blueimp-gallery$containerCount' class='blueimp-gallery blueimp-gallery-controls'>" .
									"<div class='slides'></div>" .
									"<span class='title'></span>" .
									"<span class='imageIndex'></span>" .
							   		"<a class='prev'>‹</a>" .
 									"<a class='next'>›</a>" .
									"<a class='close'>×</a>" .
									"<a class='info'><i class='icon-info-circled'></i></a>" .
									"<a class='play-pause'><i class='icon-play'></i><i class='icon-pause'></i></a>" .
									"<ol class='indicator'></ol>" .
									"</div>";
						
					$string= str_replace($arr_org, $galleryHtml, $string);
					$containerCount++;
				}
			}

			$javascript = "
			<script type='text/javascript'>
			jQuery(document).imagesLoaded(function() {
				jQuery(document).ready(new function() {";
			
				for ($galleryIndex = 0; $galleryIndex < $containerCount; $galleryIndex++)
				{
					$javascript .= "
					var options$galleryIndex = {
						autoResize: $autoresize_gal, 
						container: jQuery('#myapp$galleryIndex'), 
						offset: $offset, 
						itemWidth: $itemWidth
					};
					var handler$galleryIndex = jQuery('#tiles$galleryIndex li');
					handler$galleryIndex.wookmark(options$galleryIndex);";
				}
			  
				$javascript .= "
				jQuery('.tiles li').tipsy({
					gravity: 's',
					html: true,
					delayIn: 0,
					delayOut: 0,
					offset: 0,
					opacity: 1,
					fade: true
					});
				});
			});
			</script>	";
		  
			$article->text = $string . $javascript;
		  
		}
	}

	function readBooleanParameter($pair)
	{
		$boolValue = false;
		$paramValue = $pair[1];
		if ($paramValue == "y" || $paramValue == "Y")
		{
			$boolValue = true;
		}
		return $boolValue;
	}
				
	function readIptcData($file, $folder_path, &$imgData)
	{
		$imgData[$file] = array();
		$size = getimagesize($folder_path.'/'.$file, $info);
		if(isset($info['APP13']))
		{
		    $iptc = iptcparse($info['APP13']);
				
			if (isset($iptc['2#120'])) // try caption first
			{
				$imgData[$file]['title'] = $iptc['2#120'][0];
			}
			else if (isset($iptc['2#005'])) // Or title if no cpation
			{
				$imgData[$file]['title'] = $iptc['2#005'][0];
			}						
			// Keywords
			if (isset($iptc['2#025']))
			{
				$imgData[$file]['keywords'] = implode('|', $iptc['2#025']);
			}	
		}					
	}

	function fetchImgFold($folder_path, $insertInDatabase, $generateFile, $galleryIndex)
	{
		$cacheFilePath = $folder_path . '/cachev2.txt';
		// 1 Check first igf the cache file exists
		$cacheExists = file_exists($cacheFilePath);
					
		if ($cacheExists && $generateFile == false)
		{
			// The cache exists and we don 't need to generate it again
			// -> Just return the cache value
			return file_get_contents($cacheFilePath);
		}
			
		// The cache file does not exist or we want to generate a new one
		$base_url=JURI::root();
		$tool = $this->params->def('tool');
		$base=trim(JURI::base(true),'/\\');
		$th_img_width = $this->params->def('th_img_width');
		$folder_path=trim($folder_path,'\\/').'/';
		$imgData = array();
		$dir = opendir($folder_path);
		while ($file = readdir($dir))
		{ 
			if (preg_match('/(.*?)\.gif/i',$file) || preg_match('/(.*?)\.png/i',$file) || preg_match('/(.*?)\.jpg/i',$file) || preg_match('/(.*?)\.jpeg/i',$file) )
			{ 
				$string1[] = $file;
				if ($insertInDatabase)
				{
   					// Read IPTC info from file (title + key words)
					$this->readIptcData($file, $folder_path, $imgData);
				}
			}
		}
		
		if ($insertInDatabase)
		{
			$this->updateImageTitles($folder_path, $imgData);
		}
					
		// Get image caption
		$fileInfo = $this->getFileInfo($folder_path);
		
		$tag='';
		for($c = 0; $c < count($string1); $c++)
		{
			$fileName = $string1[$c];
			$caption = str_replace("'", "&apos;", $fileInfo[$fileName]);
			
			$tag .= "<li title='$caption'>" .
					"<a href='$base_url$folder_path$string1[$c]' data-caption='$caption' data-gallery='#blueimp-gallery$galleryIndex'>" .
					"<img  src='$base_url".'plugins/content/wookmark_gallery/wookmark_gallery/tmpl/'."$tool.php?src=$base/$folder_path$string1[$c]&w=$th_img_width&q=100'>" .
					"</a>" .
					"</li>";	
		}
					
		// Write the cache file
		file_put_contents($cacheFilePath, $tag);
		return $tag;
	}
	
	private function updateImageTitles($imageFolder, $imgData)
	{
		$filePath = trim(substr($imageFolder, 7), '/');
					
		// Remove all entries for the current folder
		$db =& JFactory::getDBO();
		$DeleteQquery = 'DELETE FROM `#__phocagallery` WHERE filepath ="'. $filePath .'"';
		$db->setQuery($DeleteQquery);
		$db->query();
					
		// Prepare insert query
		$insertQuery = $db->getQuery(true);
					
		// Specify columns
		$columns = array('title','filename','filepath','metadata','published');
					
		// IPopulate values array
		$values = array();
		foreach ($imgData as $fileName => $data)
		{
			$values[] = '"' . $data['title'] . '","' . $fileName . '","' . $filePath . '","' . $data['keywords'] . '",1';
		}
		$insertQuery->insert($db->quoteName('#__phocagallery'));
		$insertQuery->columns($columns);
		$insertQuery->values($values);
					
		// Execute query
		$db->setQuery($insertQuery);
		$db->query();
	}

	private function getFileInfo($imageFolder)
	{
		$file_info = false;

		$db = JFactory::getDBO();
		$query = 'SELECT title, filename, filepath FROM `#__phocagallery` p WHERE p.filepath ="'. trim(substr($imageFolder, 7), '/') .'"';
		$db->setQuery($query);
		$data = $db->loadObjectList(); 
		if (count($data))
		{
			foreach ($data as $row)
			{
				$file_info[$row->filename] = $row->title;
			}
		}
		else
		{
			$absolute_path = JPATH_SITE;		
			$captions_txtfile = $absolute_path.'/'.$imageFolder.'captions.txt';

			if (file_exists($captions_txtfile))
			{
				$captions_file = array_map('trim', file($captions_txtfile));

				foreach($captions_file as $value)
				{
					if(!empty($value))
					{
						$captions_line = explode('|', $value);
						$file_info[$captions_line[0]] = $captions_line[1];
					}
				}
			}
		}

		return $file_info;
	}

	function fetchImgTxt($arr_img_path, $arr_title, $align)
	{
		$base_url=JURI::root();
		$tool = $this->params->def('tool');
		$base=trim(JURI::base(true),'/\\');
		$th_img_width = $this->params->def('th_img_width');
		$img_path=explode(',',$arr_img_path);
		$title=explode(',',$arr_title);
		$wookmarkPath = $base_url . "plugins/content/wookmark_gallery/wookmark_gallery/tmpl/" . $tool . ".php";
		$tag='';
		for ($i = 0; $i < count($img_path); $i++)
		{
			$tag .= "<span class='wookmark-single-" . $align . "'>" .
					"<a href='" . $base_url . $img_path[$i] . "' title='" . $title[$i] . "' data-gallery>" .
					"<img  src='" . $wookmarkPath . "?src=" . $base . "/" . $img_path[$i] . "&w=" . $th_img_width . "&q=100'>" .
					"</a></span>";
		}
		return $tag;
	}
}
?>