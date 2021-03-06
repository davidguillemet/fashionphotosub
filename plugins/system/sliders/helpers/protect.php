<?php
/**
 * Plugin Helper File: Protect
 *
 * @package         Sliders
 * @version         4.0.1
 *
 * @author          Peter van Westen <peter@nonumber.nl>
 * @link            http://www.nonumber.nl
 * @copyright       Copyright © 2014 NoNumber All Rights Reserved
 * @license         http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

defined('_JEXEC') or die;

class plgSystemSlidersHelperProtect
{
	var $helpers = array();
	var $params = null;

	public function __construct()
	{
		require_once __DIR__ . '/helpers.php';
		$this->helpers = plgSystemSlidersHelpers::getInstance();
		$this->params = $this->helpers->getParams();

		$this->params->protected_tags = array(
			'{' . $this->params->tag_open,
			'{/' . $this->params->tag_close,
			$this->params->tag_link
		);
	}

	public function protect(&$string)
	{
		NNProtect::protectFields($string);
		NNProtect::protectSourcerer($string);
	}

	public function protectTags(&$string)
	{
		NNProtect::protectTags($string, $this->params->protected_tags);
	}

	public function unprotectTags(&$string)
	{
		NNProtect::unprotectTags($string, $this->params->protected_tags);
	}
}
