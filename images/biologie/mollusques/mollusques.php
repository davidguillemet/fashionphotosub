<?php

define('__ROOT__', dirname(dirname(dirname(dirname(__FILE__)))));

define( '_JEXEC', 1 );
define('JPATH_BASE', __ROOT__);
require_once ( JPATH_BASE .'/includes/defines.php' );
require_once ( JPATH_BASE .'/includes/framework.php' );

/* Create the Application */
$app = JFactory::getApplication('site');

require_once (__ROOT__ . '/libraries/import.php');

function GetImageHeight($fileName, $thumbWidth)
{
	$size = getimagesize($fileName);
	$width = $size[0];
	$height = $size[1];
	
	$thumbHeigt = ( $thumbWidth * $height ) / $width;
	
	return round($thumbHeigt);
}

function GetArticleRoute($articleId, $itemId, $catid)
{
	if (strlen($articleId) > 0)
	{
		// Pour Metasepia pfefferi:
		// Url générée    : index.php?option=com_tz_portfolio&amp;view=p_article&amp;id=51&amp;catid=13&amp;Itemid=153
		// Url SEF routée : index.php/biologie/la-galerie-des-mollusques/item/13-biologie/mollusques/metasepia-pfefferi/51
		// --> même résultat avaec id=51 ou id=51:metasepia-pfefferi
		// Pour Anilao :
		// index.php?option=com_tz_portfolio&amp;view=p_article&amp;id=1:2014-anilao&amp;catid=8&amp;Itemid=101
		// ItemId = 101 = "Galeries"
		// id = 1 = "Anilao"
		// catid = 8 = "Galeries"
		$link = 'index.php?option=com_tz_portfolio&amp;view=p_article&amp;id=' . $articleId . '&amp;catid=' . $catid . '&amp;Itemid='. $itemId;
		// Since this script is located in images/biologie/mollusques folder, this base pathhas been added as a prefix.
		// -> Just remove it
		$routedUrl = str_replace("images/biologie/mollusques/", "", JRoute::_($link));
		return $routedUrl;
	}
	return "";
}

$filter = $_REQUEST['filter'];
$width = $_REQUEST['width'];

// Read the image file content
$imageFile = "mollusques.txt";
// 153 est l'id du menu "Galerie des mollusques"
$itemId = 153;
// 13 est la catégorie Mollusques (sous Biologie)
$catid = 13;
$images = file($imageFile);

$data = array();

// Browse images from the file
foreach($images as $image_properties)
{
    if(!empty($image_properties))
    {
		$addImage = false;
        $properties = explode('|', $image_properties);
		
		if (strcasecmp("all", $filter) == 0)
		{
			$addImage = true;
		}
		else
		{
			// Check if one of the mollusque property is the one which is specified in the query
			// 0 = image name
			// 1 = image caption
			// 2 = article ID
			// 3 to N = classes
			$count = count($properties);
			for ($i = 3; $i < $count && $addImage == false; $i++)
			{
				if (strcasecmp(trim($properties[$i]), $filter) == 0)
				{
					$addImage = true;
				}
			}	
		}
		
		if ($addImage)
		{
			$imageFileName = $properties[0];
			$data[] = array(
				'img' => $imageFileName,
				'desc' => $properties[1],
				'link' => GetArticleRoute($properties[2], $itemId, $catid),
				'height' => GetImageHeight($imageFileName, $width)
			);	
		}
    }
}

$result = array(
  'success' => TRUE,
  'message' => 'Retrieved pictures',
  'filter' => $filter,
  'data' => $data
);


header('Content-Type: application/json');
echo json_encode($result);

?>

