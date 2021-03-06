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

/**
 * Input:
 * 
 * $displayData['fbLayout']
 * $displayData['url']
 * $displayData['enableFbSend']
 * $displayData['fbAction']
 * $displayData['fbWidth']
 * $displayData['fbShowFaces']
 * $displayData['fbColorscheme']
 * $displayData['enableFbShare']
 */
// Security check to ensure this file is being included by a parent file.
if (!defined('_JEXEC')) die('Direct Access to this location is not allowed.');

?>
      <!-- Facebook like button -->
	  <fb:like href="<?php echo $displayData['url']; ?>" send="<?php echo $displayData['enableFbSend'] ? 'true' : 'false'; ?>"
	   action="<?php echo $displayData['fbAction']; ?>" width="<?php echo $displayData['fbWidth']; ?>" layout="<?php echo $displayData['fbLayout']; ?>"
	   show_faces="<?php echo $displayData['fbShowFaces']; ?>" colorscheme="<?php echo $displayData['fbColorscheme']; ?>"
	   <?php echo $displayData['enableFbShare'] ? '' : ' data-share="true"'; ?> >
	  </fb:like>
					
      <!-- End Facebook like button -->				
