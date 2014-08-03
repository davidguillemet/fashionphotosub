<?php
/**
 * @package		Joomla.Site
 * @subpackage	Templates.vg_fashion
 * @copyright	Copyright (C) 2012 Valentín García - http://www.valentingarcia.com.mx - All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

$app = JFactory::getApplication();
$templateparams = $app->getTemplate(true)->params;

JHtml::addIncludePath(JPATH_COMPONENT . '/helpers');
$cparams = JComponentHelper::getParams('com_media');

// If the page class is defined, add to class as suffix.
// It will be a separate class if the user starts it with a space
?>

<?php if ($this->params->get('show_page_heading') != 0 or $this->params->get('show_category_title')): ?>
	<div class="blog-block">
		<h1>
			<?php echo $this->escape($this->params->get('page_heading')); ?>
			<?php if ($this->params->get('show_category_title')){ echo '<span class="subheading-category">'.$this->category->title.'</span>'; } ?>
		</h1>
	</div>
<?php endif; ?>


<?php if ($this->params->get('show_description', 1) || $this->params->def('show_description_image', 1)) : ?>
	<div class="category-desc blog-block">
	<?php if ($this->params->get('show_description_image') && $this->category->getParams()->get('image')) : ?>
		<img src="<?php echo $this->category->getParams()->get('image'); ?>"/>
	<?php endif; ?>
	<?php if ($this->params->get('show_description') && $this->category->description) : ?>
		<?php echo JHtml::_('content.prepare', $this->category->description, '', 'com_content.category'); ?>
	<?php endif; ?>
	<div class="clr"></div>
	</div>
<?php endif; ?>



<?php 
//LEADING COUNT
$leadingcount = 0; 
?>
<?php if (!empty($this->lead_items)) : ?>

<?php foreach ($this->lead_items as &$item) : ?>
	<?php
		$this->item = &$item;
	echo $this->loadTemplate('item');
	?>
	<?php
		$leadingcount++;
	?>
<?php endforeach; ?>


<?php endif; ?>
<?php
	$introcount = (count($this->intro_items));
	$counter = 0;
?>
<?php if (!empty($this->intro_items)) : ?>

	<?php foreach ($this->intro_items as $key => &$item) : ?>
	<?php
		$key = ($key - $leadingcount) + 1;
		$rowcount = (((int) $key - 1) % (int) $this->columns) + 1;
		$row = $counter / $this->columns;

		if ($rowcount == 1) : ?>
	<div class="items-row">
	<?php endif; ?>
	<article class="item">
		<?php
			$this->item = &$item;
			echo $this->loadTemplate('item');
		?>
	</article>
	<?php $counter++; ?>
	<?php if (($rowcount == $this->columns) or ($counter == $introcount)): ?>
				<span class="row-separator"></span>
				</div>

			<?php endif; ?>
	<?php endforeach; ?>


<?php endif; ?>

<?php if (!empty($this->link_items)) : ?>

	<?php echo $this->loadTemplate('links'); ?>

<?php endif; ?>


	<?php if (is_array($this->children[$this->category->id]) && count($this->children[$this->category->id]) > 0 && $this->params->get('maxLevel') != 0) : ?>
		<div class="cat-children blog-block">
		<h3>
<?php echo JTEXT::_('JGLOBAL_SUBCATEGORIES'); ?>
</h3>
			<p><?php echo $this->loadTemplate('children'); ?></p>
		</div>
	<?php endif; ?>

<?php if (($this->params->def('show_pagination', 1) == 1  || ($this->params->get('show_pagination') == 2)) && ($this->pagination->pagesTotal > 1)) : ?>
		<div class="pager">
				<?php  if ($this->params->def('show_pagination_results', 1)) : ?>
				<!--a href="#"><?php echo $this->pagination->getPagesCounter(); ?></a-->

				<?php endif; ?>
				<?php echo $this->pagination->getPagesLinks(); ?>
		</div>
<?php  endif; ?>


