<?php
/**
 * @package		Joomla.Site
 * @subpackage	Templates.vg_fashion
 * @copyright	Copyright (C) 2012 Valent�n Garc�a - http://www.valentingarcia.com.mx - All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access.
defined('_JEXEC') or die;

/****************************** IF DS DEPRECATED ******************************/

if( !defined('DS') ){
	define( 'DS', DIRECTORY_SEPARATOR );
}

//app
$app = JFactory::getApplication();
$sitename = $app->getCfg('sitename');

//doc
$doc = JFactory::getDocument();
//menu title
$menu = JFactory::getApplication()->getMenu();
$pagetitle = $menu->getActive()->title;
if( $pagetitle == '' ){ $pagetitle = $doc->getTitle(); }
	if( strlen( $pagetitle ) > 35 ){ $pagetitle_fontsize = 'style="font-size:275%;"'; }else{ $pagetitle_fontsize = ''; }
$this->setTitle( $pagetitle . '  |  ' . $sitename );
//menu page heading show or not
$vg_active = $menu->getActive();

//avoiding header in search component (com_search)
if( JRequest::getVar('option') != 'com_search' ){
	$vg_page_heading = $vg_active->params->get('page_heading');
}

if( $vg_page_heading != '' ){ $pagetitle = $vg_page_heading; }
/****** ====== PARAMETERS ====== ******/

/****** BASIC ******/
//logo
if( $this->params->get( 'vg_logo' ) ){
	$vg_logo = $this->baseurl . '/' . $this->params->get( 'vg_logo' );
}else{
	$vg_logo = $this->baseurl . '/templates/' . $this->template . '/images/img/logo.png';
}
$vg_css = $this->params->get( 'vg_css' );
//analytics
$vg_analytics = $this->params->get( 'vg_analytics' );

/****** SOCIAL ******/
$vg_twitter = $this->params->get( 'vg_twitter' );
$vg_facebook = $this->params->get( 'vg_facebook' );
$vg_dribbble = $this->params->get( 'vg_dribbble' );
$vg_youtube = $this->params->get( 'vg_youtube' );
$vg_skype = $this->params->get( 'vg_skype' );
$vg_twitter_tooltip = $this->params->get( 'vg_twitter_tooltip' );
$vg_facebook_tooltip = $this->params->get( 'vg_facebook_tooltip' );
$vg_dribbble_tooltip = $this->params->get( 'vg_dribbble_tooltip' );
$vg_youtube_tooltip = $this->params->get( 'vg_youtube_tooltip' );
$vg_skype_tooltip = $this->params->get( 'vg_skype_tooltip' );

/****** FULLSCREEN SLIDESHOW ******/
//status
$vg_slide_status = $this->params->get('vg_slide_status',1);
if( $vg_slide_status == 1 ){
	//controls
	$vg_slide_control = $this->params->get('vg_slide_control',1);
	//images
	$vg_slide_1 = $this->params->get('vg_slide_1');
	$vg_slide_2 = $this->params->get('vg_slide_2');
	$vg_slide_3 = $this->params->get('vg_slide_3');
	$vg_slide_4 = $this->params->get('vg_slide_4');
	$vg_slide_5 = $this->params->get('vg_slide_5');
	$vg_slide_6 = $this->params->get('vg_slide_6');
	$vg_slide_7 = $this->params->get('vg_slide_7');
	$vg_slide_8 = $this->params->get('vg_slide_8');
	$vg_slide_9 = $this->params->get('vg_slide_9');
	$vg_slide_10 = $this->params->get('vg_slide_10');
	$vg_slide_11 = $this->params->get('vg_slide_11');
	$vg_slide_12 = $this->params->get('vg_slide_12');
	$vg_slide_13 = $this->params->get('vg_slide_13');
	$vg_slide_14 = $this->params->get('vg_slide_14');
	$vg_slide_15 = $this->params->get('vg_slide_15');
	//slide interval
	$vg_slide_interval = $this->params->get('vg_slide_interval',5000);
	//transition
	$vg_transition = $this->params->get('vg_transition',1);
	//transition speed
	$vg_transition_speed = $this->params->get('vg_transition_speed',300);
	//audio
	$vg_audio_1 = $this->params->get('vg_audio_1'); //mp4
	$vg_audio_mp3 = $this->params->get('vg_audio_mp3'); 
	$vg_audio_oga = $this->params->get('vg_audio_oga'); 
}

/****** FULLSCREEN VIDEO ******/
$vg_video_status  = $this->params->get('vg_video_status',0);
if( $vg_video_status == 1 ){
	$vg_video_image = $this->params->get('vg_video_image');
	$vg_video_1 = $this->params->get('vg_video_1');
}

/****** ====== count modules in right and main content ====== ******/
if( $this->countModules('fashion-right-top') or $this->countModules('fashion-right') or $this->countModules('fashion-right-bottom') ){
	$vg_column_main = 2;
	$vg_column_right = 4;
	$vg_column_right_show = true;
}else{
	$vg_column_main = 1;
	$vg_column_right_show = false;
}

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible" />
<script type="text/javascript">var rootUrl = "<?php echo $this->baseurl; ?>/";</script>

<!--script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/plugin/jquery-latest.pack.js"></script-->
<!--script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/jquery.min.js"></script-->
<jdoc:include type="head" />

<link rel="shortcut icon" type="image/x-icon" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/favicon.png" />
<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/ddsmoothmenu.css" type="text/css" />
<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/columns.css" type="text/css" />

<!-- supersized -->
<?php if( $vg_slide_status == 1 ){ ?>
	<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/supersized.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/supersized.shutter.css" type="text/css" media="screen" />
<?php } ?>

<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/fancybox.css" type="text/css" />

<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/flexslider.css" type="text/css" media="screen" />
<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/gridNavigation.css" type="text/css" />
<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/custom.css" type="text/css" />
<link href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/joomla.css" rel="stylesheet" type="text/css" />
<link href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/style.css" rel="stylesheet" type="text/css" />

<!--script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/plugin/jquery.form.js"></script-->
<!--script type="text/javascript">jQuery.noConflict();</script-->
<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/jquery.color.js"></script>
<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/jquery.isotope.min.js"></script>
<!--script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/jquery.easing.min.js"></script-->
<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/jquery.jplayer.min.js"></script>

<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/ddsmoothmenu.js"></script>

<!-- supersized -->
<?php if( $vg_slide_status == 1 ){ ?>
	<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/supersized.3.2.7.js"></script>
	<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/supersized.shutter.js"></script>
<?php } ?>

<!--
<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/jwplayer.js"></script>
<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/jquery.qtip.min.js"></script>
<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/jquery.flexslider-min.js"></script>
<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/jquery.fancybox.js"></script>
<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/jquery.gridnav.js"></script>
-->
<!--script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script-->
<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/fashionCustom.js"></script>

<?php if( $vg_slide_status == 1 ){//<--A2. ?>

<script>

$f(function($){
	/* :::::::::::::: SUPER SIZED SLIDER ::::::::::::: */	
	$.supersized({
	
		// Functionality
		slide_interval          :   <?php echo $vg_slide_interval; ?>,		// Length between transitions
		transition              :   <?php echo $vg_transition; ?>, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
		transition_speed		:	<?php echo $vg_transition_speed; ?>,		// Speed of transition
		
		// Components							
		slide_links				:	'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
		slides 					:  	[			// Slideshow Images
									<?php
									//path to directory to scan
									$directory = "images/supersized/";

									//get all image files with a .jpg extension.
									$images = glob($directory . "*.jpg");

									//print each file name
									foreach($images as $image)
									{	
										echo "{image : '" . $image . "', title : '" . basename($image, '.jpg') . "'},";
									}
									?>
									],
		random					: 1,
		image_protect			: 0
		
	});
});

$f(document).ready(function(){
	/* :::::::::::::: AUDIO PLAYER ::::::::::::: */
	$f("#jquery_jplayer_1").jPlayer({
		ready: function (event) {
			$f(this).jPlayer("setMedia", {
				<?php 
				$supplied_formats = '';//start var 
				$audio_files = '';//start var 
				?>
				<?php if( $vg_audio_1 ){ $audio_files .= 'm4a:"' . $vg_audio_1 . '",'; $supplied_formats .= 'm4a,'; } //mp4 ?>
				<?php if( $vg_audio_mp3 ){ $audio_files .= 'mp3:"' . $vg_audio_mp3 . '",'; $supplied_formats .= 'mp3,'; } //mp3 ?>
				<?php if( $vg_audio_oga ){ $audio_files .= 'oga:"' . $vg_audio_oga . '",'; $supplied_formats .= 'oga,'; } //ogg or oga ?>
				<?php echo rtrim($audio_files, ','); ?>
			}).jPlayer("play");
		},
		swfPath: "<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js",
		supplied: "<?php echo rtrim($supplied_formats, ','); ?>",
		wmode: "window"
	});
});
</script>

<?php }//A2.--> ?>

<link rel="stylesheet" type="text/css" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/shadowbox/shadowbox.css">
<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/shadowbox/shadowbox.js"></script>
<script type="text/javascript">
Shadowbox.init({
    handleOversize: "drag",
    modal: true,
	displayNav: true,
	slideshowDelay: 5,
	overlayOpacity: 0.8
});
</script>

<style>
<?php echo $vg_css; ?>
</style>

</head>

<body>
<!-- Wrapper -->
<div class="wrapper">
    <div class="controller">
    
        <!-- Header -->
        <div class="header">
        	<div class="header-hidden-content">
            	<div class="logo"><a href="index.php"><img src="<?php echo $vg_logo ; ?>" alt="<?php echo $sitename; ?>" /></a></div>
                
                <!-- Navigation -->
                <div id="smoothmenu1" class="ddsmoothmenu">
                <a href="#main-nav-menu" class="mobile-menu-button button"><?php echo JText::_('VG_FS_NAV') ?></a>
					
					<jdoc:include type="modules" name="fashion-menu" style="menu" />
					
                </div>
            </div>
            <!-- /Navigation -->
            <div class="header-hider">
            	<a href="#" class="hider"></a>
                <a href="#" class="opener"></a>
            </div>
        </div>
        <!-- /Header -->
        
        <!-- Content -->
        <div class="content">
			
            <!-- Title -->
            <div class="title-block" style="<?php if( $vg_page_heading == '' ){ echo 'display:none;'; } ?>">
            	
				<h3 <?php echo $pagetitle_fontsize; ?>><?php echo $pagetitle; ?></h3>
				
                <div class="content-hider">
                	<a href="#" class="c-hider"></a>
                    <a href="#" class="c-opener"></a>
                </div>
				
				<a href="#" class="social-mobile"><?php echo JText::_('VG_FS_BE_SOCIAL') ?></a>
                <div class="social-icons">
                	
					<?php if( $vg_twitter ){ echo '<a href="' . $vg_twitter . '" class="twitter" title="' . $vg_twitter_tooltip . '"></a>'; } ?>
					<?php if( $vg_facebook ){ echo '<a href="' . $vg_facebook . '" class="facebook" title="' . $vg_facebook_tooltip . '"></a>'; } ?>
					<?php if( $vg_dribbble ){ echo '<a href="' . $vg_dribbble . '" class="dribble" title="' . $vg_dribbble_tooltip . '"></a>'; } ?>
					<?php if( $vg_youtube ){ echo '<a href="' . $vg_youtube . '" class="youtube" title="' . $vg_youtube_tooltip . '"></a>'; } ?>
					<?php if( $vg_skype ){ echo '<a href="' . $vg_skype . '" class="skype" title="' . $vg_skype_tooltip . '"></a>'; } ?>
					
                </div>
				
            </div>
            <!-- /Title -->
            
            <jdoc:include type="modules" name="fashion-content-top" style="top" />
			
            <!-- Main -->
            <div class="column-<?php echo $vg_column_main; ?>" id="id-<?php echo $this->params->get( 'component_id' ); ?>">
			
				<div class="<?php echo $this->pageclass_sfx;?>">
				
					<jdoc:include type="message" />
					
					<jdoc:include type="modules" name="fashion-content-top-a" style="topletter" />
			
					<jdoc:include type="modules" name="fashion-content-top-b" style="topletter" />
			
					<jdoc:include type="component" />
				
					<jdoc:include type="modules" name="fashion-content-bottom" style="bottom" />
					
				</div>
                
            </div>
            <!-- /Main -->
            
			<jdoc:include type="modules" name="fashion-content-bottom-a" style="bottomletter" />
			
			<?php if( $vg_column_right_show == true ){//<-- A1. ?>
			
            <!-- Right -->
            <div class="column-<?php echo $vg_column_right; ?>">
                
                <jdoc:include type="modules" name="fashion-right-top" style="right" />
				
				<jdoc:include type="modules" name="fashion-right" style="right" />
				
				<jdoc:include type="modules" name="fashion-right-bottom" style="right" />
                
            </div>
            <!-- /Right -->
			
			<?php }//A1.--> ?>
            
        </div>
        <!-- /Content -->
        
        <!-- Footer -->
        <div class="footer">
        
			<!-- supersized -->
			<?php if( $vg_slide_status == 1 && $vg_slide_control == 1 ){//<--A3. ?>
			
			<div id="progress-back" class="load-item">
				<div id="progress-bar"></div>
			</div>			
            
			<!--Control Bar-->
            <div id="controls-wrapper" class="load-item">
                
				<div id="controls">
					<a id="play-button"><img id="pauseplay" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/img/pause.png"/></a>
					<div id="slidecounter">
					<span class="slidenumber"></span> / <span class="totalslides"></span>
					</div>
					<div id="slidecaption"></div>
					<ul id="slide-list"></ul>
                </div>
				
            </div>
			
			<?php }//A3.--> ?>
			
        </div>
        <!-- /Footer -->
            
    </div>
</div>
<!-- /Wrapper -->

<?php if( $vg_slide_status == 1 ){//<--A6. ?>

	<div class="mask"></div>

<?php }//.A6--> ?>	
	
<jdoc:include type="modules" name="fashion-analytics" style="none" />

<?php if( $vg_analytics ){//<--A4. ?>

<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
try {
var pageTracker = _gat._getTracker("<?php echo $vg_analytics; ?>");
pageTracker._trackPageview();
} catch(err) {}
</script>

<?php }//A4.--> ?>

<?php if( $vg_video_status == 1 ){//<--A5. ?>
	<script>
	$f(document).ready(function(){
	
	$f(window).resize(function () {
		window.win_w = $f(window).width();
		window.win_h = $f(window).height();
	});
	$f(window).resize();
	function isiPhone(){
		return (
			(navigator.platform.indexOf("iPhone") != -1) ||
			(navigator.platform.indexOf("iPod") != -1)
		);
	}
	if($f("#video-wrap").length){
		$f("ul#supersized").css('display', 'none');
		$f("ul#supersized").css('visibility', 'hidden');
		var deviceAgent = navigator.userAgent.toLowerCase();
		var agentID = deviceAgent.match(/(ipod|ipad)/);
		if (agentID) {
			jwplayer("video-wrap").setup({
				flashplayer: "<?php echo JURI::base(); ?>/templates/vg_fashion/images/media/player.swf",
				levels: [
					{file: "<?php echo $vg_video_1; ?>"}
				],
				height: win_h-150,
				width: win_w,
				image: "<?php echo JURI::base(); ?>/<?php echo $vg_video_image; ?>",
				'controlbar': 'none',
				'autostart': 'true'
			});
			$f('#video-wrap_wrapper, #video-wrap ').addClass('ipad');
		}
		else if(isiPhone()){
			jwplayer("video-wrap").setup({
				flashplayer: "<?php echo JURI::base(); ?>/templates/vg_fashion/images/media/player.swf",
				levels: [
				{file: "<?php echo $vg_video_1; ?>"}
				],
				height: 740,
				width: win_w,
				image: "<?php echo JURI::base(); ?>/<?php echo $vg_video_image; ?>",
				'controlbar': 'none',
				'autostart': 'true'
			});
			$f('#video-wrap_wrapper, #video-wrap ').addClass('ipad');
		}
		else {
			jwplayer("video-wrap").setup({
				flashplayer: "<?php echo JURI::base(); ?>/templates/vg_fashion/images/media/player.swf",
				file: "<?php echo $vg_video_1; ?>",
				height: win_h,
				width: win_w,
				image: "<?php echo JURI::base(); ?>/<?php echo $vg_video_image; ?>",
				'stretching': 'fill',
				'controlbar': 'none',
				icons:false,
				'autostart': 'true'
			});
		}
	}
	
	});
	</script>
	
	<div id="video-wrap"></div>

<?php }//.A5--> ?>

</body>
</html>
