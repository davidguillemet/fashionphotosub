<?php
/**
 * sh404SEF - SEO extension for Joomla!
 *
 * @author      Yannick Gaultier
 * @copyright   (c) Yannick Gaultier 2014
 * @package     sh404SEF
 * @license     http://www.gnu.org/copyleft/gpl.html GNU/GPL
 * @version     4.4.6.2271
 * @date		2014-11-03
 */
defined( '_JEXEC' ) or die( 'Direct Access to this location is not allowed.' );

// ------------------  standard plugin initialize function - don't change ---------------------------
global $sh_LANG;
$sefConfig = & Sh404sefFactory::getConfig();
$shLangName = '';
$shLangIso = '';
$title = array();
$shItemidString = '';
$dosef = shInitializePlugin( $lang, $shLangName, $shLangIso, $option);
if ($dosef == false) return;
// ------------------  standard plugin initialize function - don't change ---------------------------

// ------------------  load language file - adjust as needed ----------------------------------------
//$shLangIso = shLoadPluginLanguage( 'com_XXXXX', $shLangIso, '_SEF_SAMPLE_TEXT_STRING');
// ------------------  load language file - adjust as needed ----------------------------------------

// remove common URL from GET vars list, so that they don't show up as query string in the URL
shRemoveFromGETVarsList('option');
shRemoveFromGETVarsList('lang');
if (!empty($Itemid))
  shRemoveFromGETVarsList('Itemid');
if (!empty($limit))
  shRemoveFromGETVarsList('limit');
if (isset($limitstart))
  shRemoveFromGETVarsList('limitstart'); // limitstart can be zero


// start by inserting the menu element title (just an idea, this is not required at all)
$view = isset($view) ? $view : null;
$Itemid = isset($Itemid) ? $Itemid : null;
$catid = isset($catid) ? $catid : null;


switch ($view)
{
 	case 'category':
		if (!empty($id))
		{
			$categories = JCategories::getInstance('Content');
			$cat = $categories->get($id);
		
			$categoryPath = array();
			while (isset($cat) && $cat->level != 0 && $cat->id != 1)
			{
				$categoryPath[] = $cat->alias;
				$cat = $cat->getParent();
			}
		
			// Add ancestor categories plus article category
			$title = array_reverse($categoryPath);
		}
		
		break;
	
	case 'p_article':
  	case 'article':
  
		// Get the article alias
		if (!empty($id))
		{
			$element = ShlDbHelper::selectObject( '#__content', array( 'id', 'catid', 'alias'), array( 'id' => $id));
			$categories = JCategories::getInstance('Content');
			$cat = $categories->get($element->catid);
			
			// Add ancestor categories plus article category
			$categoryPath = array();
			while (isset($cat) && $cat->level != 0 && $cat->id != 2)
			{
				$categoryPath[] = $cat->alias;
				$cat = $cat->getParent();
			}
		
			// Add ancestor categories plus article category
			$title = array_reverse($categoryPath);
						
			// Finally, add the article alias
			$alias = $element->alias;
			if ($element->id != 60)
			{
				if ($element->catid == "8")
				{
					// les alias de galerie sont de la forme yyyy-[mm-]xxxxxxx
					// pour les Urls sef, on aura donc .../yyyy/[mm/]xxxxxx
					$aliasArray = explode("-", $alias);
					$title = array_merge($title, $aliasArray);
				}
				else
				{
					$title[] = $alias;
				}
			}
		}
	  
		break;
	
	case 'xxxxxxx' :
		
		$dosef = false;  // these tasks do not require SEF URL
		break;

	default:
}

if (isset($id))
shRemoveFromGETVarsList('id');
if (isset($view))
shRemoveFromGETVarsList('view');
if (isset($catid))
shRemoveFromGETVarsList('catid');
if (isset($layout))
shRemoveFromGETVarsList('layout');


// ------------------  standard plugin finalize function - don't change ---------------------------
if ($dosef){
  $string = shFinalizePlugin( $string, $title, $shAppendString, $shItemidString,
      (isset($limit) ? @$limit : null), (isset($limitstart) ? @$limitstart : null),
      (isset($shLangName) ? @$shLangName : null));
}
// ------------------  standard plugin finalize function - don't change ---------------------------

