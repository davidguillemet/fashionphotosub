<?php

define('__ROOT__', dirname(__FILE__));

define( '_JEXEC', 1 );
define('JPATH_BASE', __ROOT__);
require_once ( JPATH_BASE .'/includes/defines.php' );
require_once ( JPATH_BASE .'/includes/framework.php' );

/* Create the Application */
$app = JFactory::getApplication('site');

require_once (__ROOT__ . '/libraries/import.php');

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
		$routedUrl = JRoute::_($link);		
		return $routedUrl;
	}
	return "";
}

$id = $_REQUEST['id'];
$catid = $_REQUEST['catid'];
$itemid = $_REQUEST['itemid'];


$result = array(
  'success' => TRUE,
  'message' => 'Build SEF URL',
  'data' => GetArticleRoute($id, $itemid, $catid)
);


header('Content-Type: application/json');
echo json_encode($result);

?>

