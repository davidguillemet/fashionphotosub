<?php

function GetImageHeight($fileName, $thumbWidth)
{
	$size = getimagesize($fileName);
	$width = $size[0];
	$height = $size[1];
	
	$thumbHeigt = ( $thumbWidth * $height ) / $width;
	
	return round($thumbHeigt);
}

$categories = array(
	"bivalve" => "20|170",
	"decapode" => "37|186",
	"octopode" => "36|185",
	"tetrabranchiaux" => "35|184",
	"anaspide" => "26|179",
	"cephalaspide" => "25|178",
	"gymnosomata" => "24|177",
	"notaspide" => "27|180",
	"aeolidien" => "30|173",
	"arminace" => "31|174",
	"dendronotace" => "32|175",
	"doridien" => "33|176",
	"sacoglosse" => "28|181",
	"thecosomata" => "29|182",
	"prosobranche" => "22|171"
);

$action = $_REQUEST['action'];
$filter = $_REQUEST['filter'];
$width = $_REQUEST['width'];

// Read the image file content
$imageFile = "mollusques.txt";
$images = file($imageFile);

$data = array();

if ($action == 'count')
{
	// Initialize total count
	$data['all'] = 0;
}

// Browse images from the file
foreach($images as $image_properties)
{
    if(!empty($image_properties))
    {
		$cat = "";
		$addImage = false;
        $properties = explode('|', $image_properties);
		
		// Check if one of the mollusque property is the one which is specified in the query
		// 0 = image name
		// 1 = image caption
		// 2 = article ID
		// 3 to N = classes
		$count = count($properties);
		for ($i = 3; $i < $count && $addImage == false; $i++)
		{
			$currentProperty = trim($properties[$i]);
			if ($action == 'count')
			{
				if (is_null($data[$currentProperty]))
				{
					$data[$currentProperty] = 0;
				}
				$data[$currentProperty]++;
			}
			else if (strcasecmp($currentProperty, $filter) == 0)
			{
				$addImage = true;
				// The catagory is the final category of the specy
				$finalcat = trim($properties[count($properties) - 1]);
				$cat = $categories[$finalcat];
			}
		}	
		
		if ($action == 'count')
		{
			$data['all']++;
		}
		else if ($addImage)
		{
			$imageFileName = $properties[0];
			$data[] = array(
				'img' => $imageFileName,
				'desc' => $properties[1],
				'id' => $properties[2],
				'cat' => $cat,
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

