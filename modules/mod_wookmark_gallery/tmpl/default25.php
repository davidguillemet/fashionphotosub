<?php 
/*------------------------------------------------------------------------
# mod_wookmark_gallery - Woomark Image Gallery
# ------------------------------------------------------------------------
# author    Infyways Solutions
# copyright Copyright (C) 2012 Infyways Solutions. All Rights Reserved.
# @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
# Websites: http://www.infyways.com
# Technical Support:  Forum - http://support.infyways/com
-------------------------------------------------------------------------*/
defined('_JEXEC') or die('Restricted access');
$document = JFactory::getDocument();
$base_url=JURI::root();
$width=$width.'px';
$sh_width=$sh_width.'px';

($cls_but==1) ? $cls_but='true' : $cls_but = 'false';
$document->addStyleSheet(JURI::root().'modules/mod_wookmark_gallery/tmpl/css/jquery.fancybox.css');
if(!$autoresize_gal)
{
	$document->addCustomTag("<style type='text/css'>
	.woomark$module->id{
		width: $width;}
	</style>");
}
($autoresize_gal==1) ? $autoresize_gal='true' : $autoresize_gal = 'false';
$document->addCustomTag("<style type='text/css'>
	.fancybox-custom .fancybox-skin {
			box-shadow: 0 0 $sh_width $sh_color;
		}
		.wooTitle p{
			text-decoration:none;
		}
</style>");
if($jsfiles==1)
{
	if($load1==1)
	{
		$document->addScript( JURI::root().'modules/mod_wookmark_gallery/tmpl/js/jquery-1.7.2.min.js' );
	}
$document->addScript(JURI::root().'modules/mod_wookmark_gallery/tmpl/js/images.loaded.js' );
$document->addScript(JURI::root().'modules/mod_wookmark_gallery/tmpl/js/jquery.wookmark.js' );
$document->addScript(JURI::root().'modules/mod_wookmark_gallery/tmpl/js/jquery.fancybox.js' );
}
else
{
	if($load1==1)
	{
		echo '<script src="'.$base_url.'modules/mod_wookmark_gallery/tmpl/js/jquery-1.7.2.min.js" type="text/javascript"></script>';
	}
	echo '<script src="'.$base_url.'modules/mod_wookmark_gallery/tmpl/js/images.loaded.js" type="text/javascript"></script>
		<script src="'.$base_url.'modules/mod_wookmark_gallery/tmpl/js/jquery.wookmark.js" type="text/javascript"></script>
		  <script src="'.$base_url.'modules/mod_wookmark_gallery/tmpl/js/jquery.fancybox.js" type="text/javascript"></script>';
}

?>
<div class="woomark<?php echo $module->id?>">
	<ul class="tiles" id="wook<?php echo $module->id?>">
	<?php 
	if($image_fetch)
	{
		$document->addCustomTag("<style type='text/css'>
		.fancybox-title-float-wrap .child {
		display: none;}
		</style>");
		$filePath=$folder_path;
		$filePath=trim($filePath,'\\/').'/';
		$dir = opendir($filePath);
			while ($file = readdir($dir))
			{ 
			   if (preg_match('/(.*?)\.gif/i',$file) || preg_match('/(.*?)\.png/i',$file) || preg_match('/(.*?)\.jpg/i',$file) || preg_match('/(.*?)\.jpeg/i',$file) )
			   { 
			   $string1[] = $file;
			   }
			}
			for($c=0;$c <count($string1) ; $c++)
			{
				?>
				<li>
						<a class="fancybox<?php echo $module->id?>" data-fancybox-group="gallery" href="<?php echo $base_url.$filePath.$string1[$c]?>">
							<img src="<?php echo $base_url?>modules/mod_wookmark_gallery/tmpl/<?php echo $tool;?>.php?src=<?php echo $filePath.$string1[$c];?>&w=<?php echo $th_img_width;?>&q=100">
						</a>
				</li>
				<?php
			}		
	}
	else
	{
		foreach ($items as $item)
		{
			$img_path[]=str_replace(' ','%20',$item->imgname);
			$caption[]=$item->imgcaption;
			$link[]=$item->imglink;
		}
		
		
		$document->addCustomTag("<style type='text/css'>
		.fancybox-title-float-wrap .child {
		display: $lg_cap;}
		</style>");
		for($i = 0; $i < count($img_path); $i++)
		{
		$img_path[$i]=trim($img_path[$i],chr(13));
		$caption[$i]=trim($caption[$i],chr(13));
		$link[$i]=trim($link[$i],chr(13));
			?>
				<li>
					<?php if(!$link_option) 
					{?>
					<a  class="fancybox<?php echo $module->id?>" data-fancybox-group="gallery" href="<?php echo $base_url.$img_path[$i]?>" <?php  if($caption_option==1 || $caption_option==3) {?>title="<?php echo $caption[$i];?>"<?php }?> >
						<img src="<?php echo $base_url?>modules/mod_wookmark_gallery/tmpl/<?php echo $tool;?>.php?src=<?php echo $img_path[$i];?>&w=<?php echo $th_img_width;?>&q=100"><?php if($caption_option==2 || $caption_option==3) {?><p class="wooTitle"><?php echo $caption[$i];?></p><?php } ?>
					</a>
					<?php 
					}
					else
					{
					?>
					<a   <?php if(trim($link[$i])!='') { ?>href="<?php echo $link[$i];?>" <?php }  if($caption_option==1 || $caption_option==3) {?>title="<?php echo $caption[$i];?>"<?php }?>  target="<?php echo $target;?>">
						<img src="<?php echo $base_url?>modules/mod_wookmark_gallery/tmpl/<?php echo $tool;?>.php?src=<?php echo $img_path[$i];?>&w=<?php echo $th_img_width;?>&q=100"><?php if($caption_option==2 || $caption_option==3) {?><p class="wooTitle"><?php echo $caption[$i];?></p><?php } ?>
					</a>
					<?php 
					}?>
				</li>
			<?php
		}
	}
	?>
	</ul>
</div>
	<script type="text/javascript">
	jQuery.noConflict();
	jQuery(document).imagesLoaded(function() {
    jQuery(document).ready(new function() {
      var options = {
        autoResize: <?php echo $autoresize_gal;?>, 
        container: jQuery('.woomark<?php echo $module->id?>'), 
        offset: <?php echo $offset;?>, 
        itemWidth: <?php echo $th_img_width+10;?> 
      };
      var handler = jQuery('#wook<?php echo $module->id;?> li');
      handler.wookmark(options);
	  jQuery('.fancybox<?php echo $module->id?>').fancybox({
	  helpers: {
					title : {
						type : 'float' //float,inside,over,outside
					},
					overlay : {
						speedIn : <?php echo $op_speed?>,
						speedOut:<?php echo $cl_speed?>,
						opacity : <?php echo $bg_opc;?>,
						openSpeed: <?php echo $op_speed?>,
						closeSpeed: <?php echo $cl_speed?>,
						css : {
							'background-color' : '<?php echo $bg_color;?>'
						}
					}
				},
				openEffect  : '<?php echo $effect;?>', //elastic,fade ,none
				closeEffect	: '<?php echo $effect;?>',
				wrapCSS    : 'fancybox-custom',
				padding: <?php echo $fan_border;?>,
				closeBtn  : <?php echo $cls_but;?>
	  });
    });
    });
	
  </script>	