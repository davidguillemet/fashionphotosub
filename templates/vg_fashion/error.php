<?php
/**
 * @package		Joomla.Site
 * @subpackage	Templates.vg_fashion
 * @copyright	Copyright (C) 2012 Valentín García - http://www.valentingarcia.com.mx - All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access.
defined('_JEXEC') or die;

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible" />

<jdoc:include type="head" />

<link rel="shortcut icon" type="image/x-icon" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/favicon.png" />
<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/ddsmoothmenu.css" type="text/css" />
<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/columns.css" type="text/css" />

<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/fancybox.css" type="text/css" />

<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/flexslider.css" type="text/css" media="screen" />
<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/gridNavigation.css" type="text/css" />
<link href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/joomla.css" rel="stylesheet" type="text/css" />
<link href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/style.css" rel="stylesheet" type="text/css" />

<style>
<?php echo $vg_css; ?>
</style>

</head>

<body>
<!-- Wrapper -->
<div class="wrapper">
    <div class="controller">
        
        <!-- Content -->
        <div class="content">
            
           <!-- Main -->
            <div class="column-1">
			
				<div class="">
					
					<div class="block">
						<h2 class="errorPage">404</h2>
						<p class="error-404"><?php echo JText::_('VG_FS_404'); ?><br/><a href="<?php echo $this->baseurl; ?>">Go Home</a></p>
					</div>
					
				</div>
                
            </div>
            <!-- /Main -->
            
        </div>
        <!-- /Content -->
        
        <!-- Footer -->
        <div class="footer">
        
		</div>
        <!-- /Footer -->
            
    </div>
</div>
<!-- /Wrapper -->
	
<jdoc:include type="modules" name="fashion-analytics" style="none" />





</body>
</html>
