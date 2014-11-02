<?php

function GetImageHeight($fileName, $thumbWidth)
{
	$size = getimagesize($fileName);
	$width = $size[0];
	$height = $size[1];
	
	$thumbHeigt = ( $thumbWidth * $height ) / $width;
	
	return round($thumbHeigt);
}

$filter = $_REQUEST['filter'];
$width = $_REQUEST['width'];
$category = $_REQUEST['category'];

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
				'id' => $properties[2],
				'height' => GetImageHeight($imageFileName, $width)
			);	
		}
    }
}

$result = array(
  'success' => TRUE,
  'message' => 'Retrieved pictures',
  'filter' => $filter,
  'category' => $category,
  'data' => $data
);


header('Content-Type: application/json');
echo json_encode($result);

?>

