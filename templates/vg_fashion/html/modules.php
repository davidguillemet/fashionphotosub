<?php
/**
 * @package		Joomla.Site
 * @subpackage	Templates.vg_fashion
 * @copyright	Copyright (C) 2012 Valentín García - http://www.valentingarcia.com.mx - All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access.
defined('_JEXEC') or die;

//header
function modChrome_menu($module, &$params, &$attribs){

	echo $module->content;
	
}

//top
function modChrome_top($module, &$params, &$attribs){

	echo '<div class="blog-block' . $moduleclass_sfx . '">';
	
		echo $module->content;
	
	echo '</div>';
	
}

//bottom
function modChrome_bottom($module, &$params, &$attribs){

	echo '<div class="blog-block' . $moduleclass_sfx . '">';
	
		echo $module->content;
	
	echo '</div>';
	
}

//bottomletter
function modChrome_bottomletter($module, &$params, &$attribs){

	//echo '<div class="blog-block' . $moduleclass_sfx . '">';
	
		echo $module->content;
	
	//echo '</div>';
	
}

//topletter
function modChrome_topletter($module, &$params, &$attribs){

	$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'));
	$mytitle = $module->title;
	
	echo '<div class="blog-block' . $moduleclass_sfx . '">
		<div class="content-top">';
	
			if ($module->showtitle) {
				echo '<h3>' . $mytitle . ' </h3>';
			}
		
			echo $module->content;
		
			echo '</div>
		</div>';
	
}

//right
function modChrome_right($module, &$params, &$attribs){

	$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'));
	$mytitle = $module->title;
	
	echo '<div class="right-block' . $moduleclass_sfx . '">';
	
		if ($module->showtitle) {
			echo '<h3>' . $mytitle . ' </h3>';
		}
    
		echo $module->content;
	
	echo '</div>';
	
}

//social
/*function modChrome_social($module, &$params, &$attribs){

	$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'));
	$mytitle = $module->title;
	
	//if ($module->showtitle) {
		echo '<a href="#" class="social-mobile">' . $mytitle . ' </a>';
	//}
	
	echo ''; 
				
				echo $module->content;
	
	echo '';
	
}*/

/*************NOUTILIZADOS*********************/
/*/menu
function modChrome_menu($module, &$params, &$attribs){

	$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'));
	
	if( $moduleclass_sfx != '' ){ echo '<div class="'. $moduleclass_sfx .'">'; }
				
				echo $module->content;
	
	if(  $moduleclass_sfx != '' ){ echo '</div>'; }
	
}

function modChrome_section($module, &$params, &$attribs){
	
	//vars
	$content = '';
	$text = $module->content;
	$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'));//id
	$mytitle = explode( '::', $module->title);//title
	
	//shortcodes
	$bbcode = array(
		"/\[service\](.*?)\[\/service\]/is" => "<div class=\"service-content\">$1</div>", //services
		"/\[s-image\](.*?)\[\/s-image\]/is" => "<div class=\"service-01\">$1</div>",
		"/\[s-title\](.*?)\[\/s-title\]/is" => "<h2 style=\"margin-bottom:10px;\">$1</h2>",
		"/\[s-text\](.*?)\[\/s-text\]/is" => "<h3>$1</h3>",
		"/\[slider-left\](.*?)\[\/slider-left\]/is" => "<div id=\"content-left\">$1</div>",//slider-left
		"/\[slider-left\](.*?)\[\/slider-left\]/is" => "<div id=\"content-left\"><div id=\"content-image\" style=\"background-image:url($1);\"></div><div class=\"image-01\"></div><div class=\"image-02\"></div></div>",
		"/\[scroll-right\](.*?)\[\/scroll-right\]/is" => "<div class=\"scroll-pane\" id=\"content-right\">$1</div>"//scroll
	);
			
			
						
	//replace shortcodes
	$content .= preg_replace(array_keys($bbcode), array_values($bbcode), $text);

	echo '<div class="page" id="'. $moduleclass_sfx .'">';
				
				if ($module->showtitle) {
					echo '<div class="section-label">
					<p class="section-label-text">' . $mytitle[0] . '</p>
					<p class="section-label-story" style="letter-spacing:6px;">' . $mytitle[1] . '</p>
					</div>';
				}
				
				echo $content;
	
	echo '</div>';
	
}

function modChrome_couple($module, &$params, &$attribs){

	$mytitle = explode( ' ', $module->title);
	
	echo '<div class="' . $moduleclass_sfx . '">';
	if ($module->showtitle) {
		echo '<h4 class="myhead"><span>' . $mytitle[0] . '</span> ' . $mytitle[1] . ' ' . $mytitle[2] . ' ' . $mytitle[3] . ' ' . $mytitle[4] . ' ' . $mytitle[5] . ' ' . $mytitle[6] . ' ' . $mytitle[7] . ' ' . $mytitle[8] . '</h4>';
	}
	echo $module->content;
	echo '</div>';
	
}*/


