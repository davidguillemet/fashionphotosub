<?php
/**
 * @package		Joomla.Site
 * @subpackage	Templates.vg_fashion
 * @copyright	Copyright (C) 2012 Valentín García - http://www.valentingarcia.com.mx - All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

$params =& $this->item->params;
$app = JFactory::getApplication();

JHtml::addIncludePath(JPATH_COMPONENT . '/helpers');

?>

<div class="items-more blog-block">
	<div class="descrip">
		<h3><?php echo JText::_('COM_CONTENT_MORE_ARTICLES'); ?></h3>

			<p>

				<?php
					foreach ($this->link_items as &$item) :
				?>
					<a href="<?php echo JRoute::_(ContentHelperRoute::getArticleRoute($item->slug, $item->catid)); ?>"><?php echo $item->title; ?></a>
					<br/>
				<?php endforeach; ?>
			</p>

	</div>
</div>


