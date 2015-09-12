<?php
/**
 * @package		Joomla.Site
 * @subpackage	Templates.vg_fashion
 * @copyright	Copyright (C) 2012 Valentín García - http://www.valentingarcia.com.mx - All rights reserved.
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

/****** FULLSCREEN SLIDESHOW ******/
//status
$vg_slide_status = $this->params->get('vg_slide_status',1);
if( $vg_slide_status == 1 ){
	//controls
	$vg_slide_control = $this->params->get('vg_slide_control',1);
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
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,300,600,700,400&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,600&subset=latin-ext' rel='stylesheet' type='text/css'>
<script type="text/javascript">
var rootUrl = "<?php echo $this->baseurl; ?>/";
var rootTemplate = rootUrl + "templates/<?php echo $this->template; ?>/"
</script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-27250055-1', 'auto');
  ga('send', 'pageview');
</script>  

<jdoc:include type="head" />

<link rel="shortcut icon" type="image/x-icon" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/favicon.ico" />
<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/bootstrap/css/bootstrap.css" type="text/css" />
<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/columns.css" type="text/css" />

<!-- supersized -->
<?php if( $vg_slide_status == 1 ){ ?>
	<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/supersized.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/supersized.shutter.css" type="text/css" media="screen" />
<?php } ?>

<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/joomla.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/style.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/fontello.css" type="text/css" />
<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/animation.css" type="text/css" />
<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/tooltipster.css" type="text/css" />
<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/tooltipster-dgui.css" type="text/css" />
<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/jqcloud.css" type="text/css" />

<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/jquery.imagesloaded.js"></script>
<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/jquery.wookmark.js"></script>
<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/jquery.tooltipster.min.js"></script>
<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/jqcloud-1.0.4.min.js"></script>

<!-- supersized -->
<?php if( $vg_slide_status == 1 ){ ?>
	<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/supersized.3.2.7.js"></script>
	<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/supersized.shutter.js"></script>
<?php } ?>

<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/select2/select2.js"></script>
<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/select2/select2_locale_fr.js"></script>
<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/select2/select2.css" type="text/css" />

<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/markerclusterer.js"></script>
<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/locations.js"></script>
<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/fashionCustom.js"></script>
<script type="text/javascript" src="<?php echo $this->baseurl; ?>/media/com_acymailing/js/acymailing_module.js"></script>


<?php if( $vg_slide_status == 1 ){//<--A2. ?>

<script>

$f(function($){
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
									shuffle($images);

									//print each file name
									foreach($images as $image)
									{	
										echo "{image : '" . $this->baseurl . "/" . $image . "', title : '" . basename($image, '.jpg') . "'},";
									}
									?>
									],
		random					: 0,
		image_protect			: 0,
		autoplay				: 0,
		keyboard_nav			: 0
	});
});

</script>

<?php }//A2.--> ?>

<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/blueimp/css/blueimp-gallery.css">
<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/blueimp/css/blueimp-gallery-indicator.css">
<script src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/blueimp/js/blueimp-helper.js"></script>
<script src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/blueimp/js/blueimp-gallery.js"></script>
<script src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/blueimp/js/blueimp-gallery-indicator.js"></script>
<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/blueimp/js/jquery.blueimp-gallery.js"></script>
<script type="text/javascript" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/blueimp/js/blueimpCustom.js"></script>

<style>
<?php echo $vg_css; ?>
</style>

<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/custom.css" type="text/css" />

<script>
jQuery.fn.tooltipster('setDefaults', {
	touchDevices: false,
	theme: 'tooltipster-dgui',
	delay: 0,
	onlyOne: true
});
</script>

</head>

<body>
<!-- Wrapper -->
<div class="wrapper">
    <div class="controller">
    
        <!-- Header -->
        <div class="header">
        	<div class="header-hidden-content">
                
                <!-- Navigation -->
    			<div id="smoothmenu1" class="navbar navbar-inverse">
					<div class="container-fluid">
						<div class="navbar-header">
							<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
								<span class="sr-only">Toggle navigation</span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
							</button>
							<a class="navbar-brand" href="index.php"><img src="<?php echo $vg_logo ; ?>" alt="<?php echo $sitename; ?>" /></a>
						</div>
						<div id="navbar" class="navbar-collapse collapse">
							<jdoc:include type="modules" name="fashion-menu" style="none" />
						</div><!--/.nav-collapse -->
					</div><!--/.container-fluid -->
				</div>
			<!-- /Navigation -->

			</div>
            
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
				
				<div class="content-hider">
                	<a href="#" class="c-hider"></a>
                    <a href="#" class="c-opener"></a>
                </div>
				
				<div class="search">
				<jdoc:include type="modules" name="fashion-search" style="none" />
				</div>
            	
				<h3 <?php echo $pagetitle_fontsize; ?>><?php echo $pagetitle; ?></h3>                
								
            </div>
            <!-- /Title -->
            
            <jdoc:include type="modules" name="fashion-content-top" style="top" />
			
            <!-- Main -->
            <div class="column-<?php echo $vg_column_main; ?>" id="id-<?php echo $this->params->get( 'component_id' ); ?>">
			
				<div class="<?php if (isset($this->pageclass_sfx)) echo $this->pageclass_sfx;?>">
				
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
			
				<div id="prevthumb"></div>
				<div id="nextthumb"></div>
 
				<div id="thumb-tray" class="load-item">
					<div id="thumb-back"></div>
					<div id="thumb-forward"></div>
				</div>
				
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
						<a id="tray-button"><img id="tray-arrow" src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/img/button-tray-up.png"/></a>
						<div id="footer-toolbar">
							<img src='http://imu351.infomaniak.ch/compteur2.php?url=www.davidphotosub.com/1' border='0' alt='' class="compteur"/>
							<jdoc:include type="modules" name="fashion-login" style="none" />
						</div>
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

<div id='blueimp-gallery' class='blueimp-gallery blueimp-gallery-controls'>
  <div class='slides'></div>
  <span class='title'></span>
  <span class='imageIndex'></span>
  <a class='prev'>‹</a>
  <a class='next'>›</a>
  <a class='close'><i class='icon-cancel'></i></a>
  <a class='play-pause'><i class='icon-play'></i><i class='icon-pause'></i></a>
  <ol class='indicator'></ol>
</div>
<div id='UniversalAJAXLiveSearchGallery' class='blueimp-gallery blueimp-gallery-controls'>
  <div class='slides'></div>
  <span class='title'></span>
  <span class='imageIndex'></span>
  <a class='prev'>‹</a>
  <a class='next'>›</a>
  <a class='close'><i class='icon-cancel'></i></a>
  <a class='play-pause'><i class='icon-play'></i><i class='icon-pause'></i></a>
  <ol class='indicator'></ol>
</div>

</body>
</html>
