<?php
/**
 * Plugin Helper File
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

// Load common functions
require_once JPATH_PLUGINS . '/system/nnframework/helpers/functions.php';
require_once JPATH_PLUGINS . '/system/nnframework/helpers/text.php';
require_once JPATH_PLUGINS . '/system/nnframework/helpers/tags.php';
require_once JPATH_PLUGINS . '/system/nnframework/helpers/protect.php';

NNFrameworkFunctions::loadLanguage('plg_system_sliders');

/**
 * Plugin that replaces stuff
 */
class plgSystemSlidersHelper
{
	var $helpers = array();

	public function __construct(&$params)
	{
		$this->params = $params;

		$this->params->comment_start = '<!-- START: Sliders -->';
		$this->params->comment_end = '<!-- END: Sliders -->';

		$this->params->tag_open = preg_replace('#[^a-z0-9-_]#si', '', $this->params->tag_open);
		$this->params->tag_close = preg_replace('#[^a-z0-9-_]#si', '', $this->params->tag_close);
		$this->params->tag_link = preg_replace('#[^a-z0-9-_]#si', '', $this->params->tag_link);

		$disabled_components = is_array($this->params->disabled_components) ? $this->params->disabled_components : array(explode('|', $this->params->disabled_components));
		$this->params->disabled_components = array('com_acymailing');
		$this->params->disabled_components = array_merge($disabled_components, $this->params->disabled_components);

		
		$url = NNText::getURI();
		$this->params->cookie_name = 'nn_sliders_' . md5($url);

		require_once __DIR__ . '/helpers/helpers.php';
		$this->helpers = plgSystemSlidersHelpers::getInstance($this->params);
	}

	public function onContentPrepare(&$article, &$context)
	{
		NNFrameworkHelper::processArticle($article, $context, $this, 'replaceTags');
	}

	public function onAfterDispatch()
	{
		// only in html
		if (JFactory::getDocument()->getType() !== 'html' && JFactory::getDocument()->getType() !== 'feed')
		{
			return;
		}

		$buffer = JFactory::getDocument()->getBuffer('component');

		if (empty($buffer) || is_array($buffer))
		{
			return;
		}

		$this->helpers->get('head')->addHeadStuff();

		$this->replaceTags($buffer, 'component');

		JFactory::getDocument()->setBuffer($buffer, 'component');
	}

	public function onAfterRender()
	{
		// only in html and feeds
		if (JFactory::getDocument()->getType() !== 'html' && JFactory::getDocument()->getType() !== 'feed')
		{
			return;
		}

		$html = JResponse::getBody();

		if ($html == '')
		{
			return;
		}

		if (
			strpos($html, '{' . $this->params->tag_open) === false
			&& strpos($html, 'nn_sliders-scrollto') === false
		)
		{
			$this->helpers->get('head')->removeHeadStuff($html);

			$this->helpers->get('clean')->cleanLeftoverJunk($html);

			JResponse::setBody($html);

			return;
		}

		// only do stuff in body
		list($pre, $body, $post) = nnText::getBody($html);
		$this->replaceTags($body, 'body');
		$html = $pre . $body . $post;

		$this->helpers->get('clean')->cleanLeftoverJunk($html);

		JResponse::setBody($html);
	}

	public function replaceTags(&$string, $area = 'article')
	{
		$this->helpers->get('replace')->replaceTags($string, $area);
	}
}
