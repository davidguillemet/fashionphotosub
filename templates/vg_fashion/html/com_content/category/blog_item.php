<?php
/**
 * @package		Joomla.Site
 * @subpackage	Templates.vg_fashion
 * @copyright	Copyright (C) 2012 Valentín García - http://www.valentingarcia.com.mx - All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

$params =& $this->item->params;
$images = json_decode($this->item->images);
$app = JFactory::getApplication();
//$canEdit = $this->item->params->get('access-edit');

JHtml::addIncludePath(JPATH_COMPONENT . '/helpers');

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

<?php if ($this->item->state == 0) : ?>
<!-- unpublished -->
<?php endif; ?>

<div class="blog-block">
    
	<?php //IMAGE?>
	<?php  if (isset($images->image_intro) and !empty($images->image_intro)) : ?>
		
		<div class="single-image"><img title="<?php echo htmlspecialchars($images->image_intro_alt); ?>" src="<?php echo htmlspecialchars($images->image_intro); ?>" alt="<?php echo htmlspecialchars($images->image_intro_alt); ?>" /></div>
	
	<?php endif; ?>
	
	<?php //VIMEO-YOUTUBE-SLIDER ?>
	<?php  if ( $images->image_intro_caption != '' ) :	?>
	
		<?php //get if is vimeo, youtube or slider ?>
		<?php 
		$vg_caption_cont = explode( ':', $images->image_intro_caption );
		
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
			
				<?php if ($params->get('link_titles') && $params->get('access-view')) : ?>
					<a href="<?php echo JRoute::_(ContentHelperRoute::getArticleRoute($this->item->slug, $this->item->catid)); ?>">
						<?php echo $this->escape($this->item->title); ?></a>
				<?php else : ?>
					<?php echo $this->escape($this->item->title); ?>
				<?php endif; ?>
			
			</h3>
			
		<?php endif; ?>
		
		<?php echo $this->item->event->afterDisplayTitle; ?>

		<?php echo $this->item->event->beforeDisplayContent; ?>

        <?php echo $this->item->introtext; ?>
		
		<?php echo $this->item->event->afterDisplayContent; ?>
		
	</div>
	
	<?php if ($params->get('show_publish_date') or $params->get('show_print_icon') or $params->get('show_email_icon') or $params->get('show_author')) ://<--C1. ?>
	
    <span class="bottom-line">
        
		<!--span class="comment-link"><a href="#">2 comments</a></span-->
        <?php //ICONS ?>
		<?php if ($params->get('show_print_icon') || $params->get('show_email_icon')) : ?>
			<div class="actions">
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
			</div>
		<?php endif; ?>
		
		<?php if ($params->get('show_author') && !empty($this->item->author )) : ?>
		
			<span class="author-link"><a href="#" onclick="return 0;"><?php echo $this->item->author; ?></a></span>
			
		<?php endif; ?>
		
		<?php //PUBLISHED DATE ?>
        <?php if ($params->get('show_publish_date')) : ?>
			
			<span class="time-link"><a href="#" onclick="return 0;"><?php echo JHtml::_('date', $this->item->publish_up, JText::_('M')) . ' ' . JHtml::_('date', $this->item->publish_up, JText::_('d')) . ', ' . JHtml::_('date', $this->item->publish_up, JText::_('Y')); ?></a></span>
        
		<?php endif; ?>
		
		<?php //if ($params->get('show_readmore') && $this->item->readmore) ://<--B1.
			if ($params->get('access-view')) :
				$link = JRoute::_(ContentHelperRoute::getArticleRoute($this->item->slug, $this->item->catid));
			else :
				$menu = JFactory::getApplication()->getMenu();
				$active = $menu->getActive();
				$itemId = $active->id;
				$link1 = JRoute::_('index.php?option=com_users&view=login&Itemid=' . $itemId);
				$returnURL = JRoute::_(ContentHelperRoute::getArticleRoute($this->item->slug));
				$link = new JURI($link1);
				$link->setVar('return', base64_encode($returnURL));
			endif;
			?>
			
		<span class="permalink-link">
			
			<a href="<?php echo $link; ?>">
				<?php 
				if (!$params->get('access-view')) :
					echo JText::_('COM_CONTENT_REGISTER_TO_READ_MORE');
				elseif ($readmore = $this->item->alternative_readmore) :
					echo $readmore;
				if ($params->get('show_readmore_title', 0) != 0) :
					echo JHtml::_('string.truncate', ($this->item->title), $params->get('readmore_limit'));
				endif;
				elseif ($params->get('show_readmore_title', 0) == 0) :
					echo JText::sprintf('COM_CONTENT_READ_MORE_TITLE');
				else :
					echo JText::_('COM_CONTENT_READ_MORE');
					echo JHtml::_('string.truncate', ($this->item->title), $params->get('readmore_limit'));
				endif; 
				?>
			</a>
		
		</span>
		
		<?php //endif;//.B1--> ?>
		
    </span>
	
	<?php endif;//.C1--> ?>
	
</div>
