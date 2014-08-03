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
$images = json_decode($this->item->images);
$urls = json_decode($this->item->urls);
JHtml::addIncludePath(JPATH_COMPONENT . '/helpers');

// Create shortcut to parameters.
$params = $this->item->params;

//modify width as css style inline
jimport( 'joomla.application.module.helper' );
if( count(JModuleHelper::getModules('fashion-right-top')) or count(JModuleHelper::getModules('fashion-right')) or count(JModuleHelper::getModules('fashion-right-bottom')) ){
	if ($params->get('show_publish_date') or $params->get('show_print_icon') or $params->get('show_email_icon') or $params->get('show_author')){
		//$vg_push_style_article = 'width:930px !important;';
		$vg_push_class_article = '';
	}else{
		$vg_push_class_article = 'descrip-medium';
	}
}else{
	if ($params->get('show_publish_date') or $params->get('show_print_icon') or $params->get('show_email_icon') or $params->get('show_author')){
		//$vg_push_style_article = 'width:780px !important;';
		$vg_push_class_article = 'descrip-large';
	}else{
		$vg_push_class_article = '';
	}
}
?>
<div class="blog-block<?php echo $this->pageclass_sfx?>">
    
	<?php //IMAGE?>
	<?php  if (isset($images->image_fulltext) and !empty($images->image_fulltext)) : ?>
		
		<div class="single-image"><img src="<?php echo htmlspecialchars($images->image_fulltext); ?>" alt="<?php echo htmlspecialchars($images->image_fulltext_alt); ?>" /></div>
	
	<?php endif; ?>
	
	<?php //VIMEO-YOUTUBE-SLIDER-MAP ?>
	<?php  if ( $images->image_fulltext_caption != '' ) :	?>
	
		<?php //get if is vimeo, youtube or slider ?>
		<?php 
		$vg_caption_cont = explode( ':', $images->image_fulltext_caption );
		
		switch( $vg_caption_cont[0] ){
			case 'vimeo':
				echo '<div class="vimeo-video">
					<iframe src="http://player.vimeo.com/video/' . $vg_caption_cont[1] . '?portrait=0&amp;color=ffffff" width="100%" height="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
				</div>';
			break;
			case 'youtube':
				echo '<div class="youtube-video">
					<iframe width="100%" height="100%" src="http://www.youtube.com/embed/' . $vg_caption_cont[1] . '" frameborder="0" allowfullscreen></iframe>
				</div>';
			break;
			case 'slide':
			
				echo '<div class="flexslider">
					<ul class="slides">';
				
						$directorio = $vg_caption_cont[1];
						$handle = opendir($directorio);
						while ($file = readdir($handle)) {
							if($file!= "." && $file != ".." && $file!="Thumbs.db"){
							$validar = explode('.',$file);//Que sólo sean imagenes
								if($validar[1] == 'jpg' || $validar[1] == 'gif' || $validar[1] == 'png'){ 
									echo '<li><img src="'.$directorio.$file.'" alt="Fashion" /></li>';
								}
							}
						}
				
					echo '</ul>
				</div>';
				
			break;
			case 'map':
				echo '<div class="map" id="map' . $this->item->id . '"></div>
				<script>
				$f(document).ready(function(){ 
					var myOptions = {
						center: new google.maps.LatLng(' . $vg_caption_cont[1] . '),
						zoom: 8,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					var map = new google.maps.Map(document.getElementById("map' . $this->item->id . '"),  myOptions);
				});
				</script>';
			break;
		}
		?>
		
	<?php endif; ?>
	
	<div class="descrip <?php echo $vg_push_class_article; ?>" style="<?php echo $vg_push_style_article; ?>">
        
		<?php //TITLE ?>
		<?php if ($params->get('show_title')) : ?>
			<h3>
				<?php echo $this->escape($this->item->title); ?>
			</h3>
		<?php endif; ?>

		<?php  echo $this->item->event->afterDisplayTitle; ?>
		
		<?php echo $this->item->event->beforeDisplayContent; ?>
		
		<?php //TEXT ?>
		<?php echo $this->item->text; ?>
		
		<?php //LINKS ?>
		<?php if (isset($urls) AND ((!empty($urls->urls_position) AND ($urls->urls_position == '0')) OR ($params->get('urls_position') == '0' AND empty($urls->urls_position)))
		OR (empty($urls->urls_position) AND (!$params->get('urls_position')))): ?>

			<?php echo $this->loadTemplate('links'); ?>
			
		<?php endif; ?>
		
		<?php echo $this->item->event->afterDisplayContent; ?>
		
		<?php //VARS FOR INFO DATA ?>
		<?php $useDefList = (($params->get('show_author')) or ($params->get('show_category')) or ($params->get('show_parent_category'))
		or ($params->get('show_create_date')) or ($params->get('show_modify_date')) or ($params->get('show_publish_date'))
		or ($params->get('show_hits'))); ?>
	
	</div>
    
	<?php if ($useDefList) ://<--C1. ?>
	
	<span class="bottom-line">
        
		<?php //ICONS ?>
		<?php if ($params->get('access-edit') ||  $params->get('show_print_icon') || $params->get('show_email_icon')) : ?>
			<div class="actions">
				<?php if (!$this->print) : ?>
					<?php if ($params->get('show_print_icon')) : ?>
						<span class="print-icon">
							<?php echo JHtml::_('icon.print_popup', $this->item, $params); ?>
						</span>
					<?php endif; ?>

					<?php if ($params->get('show_email_icon')) : ?>
						<span class="email-icon">
							<?php echo JHtml::_('icon.email', $this->item, $params); ?>
						</span>
					<?php endif; ?>
					<?php if ($this->user->authorise('core.edit', 'com_content.article.'.$this->item->id)) : ?>
						<span class="edit-icon">
							<?php echo JHtml::_('icon.edit', $this->item, $params); ?>
						</span>
					<?php endif; ?>
				<?php else : ?>
					<span>
						<?php echo JHtml::_('icon.print_screen', $this->item, $params); ?>
					</span>
				<?php endif; ?>
			</div>
		<?php endif; ?>

		<!--span class="comment-link"><a href="#">2 comments</a></span-->
        
		<?php //INFO ?>
		<?php if ($useDefList) : ?>
			
			<!--span class="article-info-term"><?php  echo JText::_('COM_CONTENT_ARTICLE_INFO'); ?></span-->
		
		<?php endif; ?>
		
		
		<?php //PARENT CATEGORY ?>
		<?php if ($params->get('show_parent_category') && $this->item->parent_slug != '1:root') : ?>
		
			<span class="parent-category-name">
				<?php 	$title = $this->escape($this->item->parent_title);
						$url = '<a href="'.JRoute::_(ContentHelperRoute::getCategoryRoute($this->item->parent_slug)).'">'.$title.'</a>';?>
				<?php if ($params->get('link_parent_category') and $this->item->parent_slug) : ?>
					<?php echo JText::sprintf('COM_CONTENT_PARENT', $url); ?>
					<?php else : ?>
					<?php echo JText::sprintf('COM_CONTENT_PARENT', $title); ?>
				<?php endif; ?>
			</span>
		
		<?php endif; ?>
		
		<?php //CATEGORY ?>
		<?php if ($params->get('show_category')) : ?>
		
			<span class="category-name">
				<?php 	$title = $this->escape($this->item->category_title);
						$url = '<a href="'.JRoute::_(ContentHelperRoute::getCategoryRoute($this->item->catslug)).'">'.$title.'</a>';?>
				<?php if ($params->get('link_category') and $this->item->catslug) : ?>
					
					<?php echo $url; ?>
					
				<?php else : ?>
					
					<a href="#"><?php echo $title; ?></a>
					
				<?php endif; ?>
			</span>
		
		<?php endif; ?>
		
		<?php //AUTHOR ?>
		<?php if ($params->get('show_author') && !empty($this->item->author )) : ?>
		
			<span class="author-link">
			
				<?php $author = $this->item->author; ?>
				<?php $author = ($this->item->created_by_alias ? $this->item->created_by_alias : $author);?>

				<?php if (!empty($this->item->contactid ) &&  $params->get('link_author') == true):?>
					
					<a href="<?php echo JRoute::_('index.php?option=com_contact&view=contact&id=' . $this->item->contactid); ?>"><?php echo $author; ?></a>
					
				<?php else :?>
					
					<a href="#"><?php echo $author; ?></a>
					
				<?php endif; ?>
		
			</span>
			
		<?php endif; ?>		
		
		<?php //CREATED DATE ?>
		<?php if ($params->get('show_create_date')) : ?>
		
			<span class="time-link"><a href="#"><?php echo JHtml::_('date', $this->item->created, JText::_('M d, Y')); ?></a></span>
		
		<?php endif; ?>
		
		<?php //PUBLISHED DATE ?>
		<?php if ($params->get('show_publish_date')) : ?>
		
			<span class="time-link"><a href="#"><?php echo JText::sprintf('COM_CONTENT_PUBLISHED_DATE_ON', JHtml::_('date', $this->item->publish_up, JText::_('M d, Y'))); ?></a></span>
		
		<?php endif; ?>
		
		<?php //MODIFIED DATE ?>
		<?php if ($params->get('show_modify_date')) : ?>
		
			<span class="time-link"><a href="#"><?php echo JText::sprintf('COM_CONTENT_LAST_UPDATED', JHtml::_('date', $this->item->modified, JText::_('M d, Y'))); ?></a></span>
		
		<?php endif; ?>
		
		<?php //HITS ?>
		<?php if ($params->get('show_hits')) : ?>
			
			<span class="hits">
				<?php echo JText::sprintf('COM_CONTENT_ARTICLE_HITS', $this->item->hits); ?>
			</span>
		
		<?php endif; ?>
		
		<?php //TOC ?>
		<?php if (isset ($this->item->toc)) : ?>
			<?php echo $this->item->toc; ?>
		<?php endif; ?>

    </span>
	
	<?php endif;//.C1--> ?>
	
</div>

<div class="pager">
	<?php
	//if (!empty($this->item->pagination) && $this->item->pagination && !$this->item->paginationposition && $this->item->paginationrelative):
		echo $this->item->pagination;
	//endif;
	?>
</div>
                