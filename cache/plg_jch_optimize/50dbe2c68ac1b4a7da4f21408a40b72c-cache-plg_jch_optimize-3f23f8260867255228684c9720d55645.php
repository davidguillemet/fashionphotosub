<?php die("Access Denied"); ?>#x#a:2:{s:6:"output";s:0:"";s:6:"result";s:3178:"/*
 * jQuery FlexSlider v1.8
 * http://www.woothemes.com/flexslider/
 *
 * Copyright 2012 WooThemes
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

/* Browser Resets */
.flex-container a:active,
.flexslider a:active,
.flex-container a:focus,
.flexslider a:focus  {outline: none;}
.slides,
.flex-control-nav,
.flex-direction-nav {margin: 0; padding: 0; list-style: none;}

/* FlexSlider Necessary Styles
*********************************/
.flexslider {width: 100%; margin: 0; padding:0;}
.flexslider .slides > li {display: none; -webkit-backface-visibility: hidden;} /* Hide the slides before the JS is loaded. Avoids image jumping */
.flexslider .slides img {max-width: 100%; display: block;}
.flex-pauseplay span {text-transform: capitalize;}

/* Clearfix for the .slides element */
.slides:after {content: "."; display: block; clear: both; visibility: hidden; line-height: 0; height: 0;}
html[xmlns] .slides {display: block;}
* html .slides {height: 1%;}

/* No JavaScript Fallback */
/* If you are not using another script, such as Modernizr, make sure you
 * include js that eliminates this class on page load */
.no-js .slides > li:first-child {display: block;}


/* FlexSlider Default Theme
*********************************/
.flexslider {background: none;  position: relative; }
.flexslider .slides {zoom: 1;}
.flexslider .slides > li {position: relative;}
/* Suggested container for "Slide" animation setups. Can replace this with your own, if you wish */
.flex-container {zoom: 1; position: relative;}

/* Caption style */
/* IE rgba() hack */
.flex-caption {background:none; -ms-filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#4C000000,endColorstr=#4C000000);
filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#4C000000,endColorstr=#4C000000); zoom: 1;}
.flex-caption {width:100%; margin: 0; position: absolute; left: 0; bottom: 0; background: rgba(0,0,0,.5); color: #fff; text-shadow: 0 -1px 0 rgba(0,0,0,.3); font-size: 13px;}
.flex-caption span{}

/* Direction Nav */
.flex-direction-nav { height: 0;}
.flex-direction-nav li a {width: 27px; height:27px; margin:20px 0 0 20px; display: block; background: url(/fashion/templates/vg_fashion/images/img/bg_direction_nav.png) no-repeat; position: absolute; top:0; cursor: pointer; text-indent: -999em;}
.flex-direction-nav li .next {background-position: -27px 0; left:30px;}
.flex-direction-nav li .prev {}
.flex-direction-nav li .disabled {opacity: .3; filter:alpha(opacity=30); cursor: default;}

/* Control Nav */
.flex-control-nav {width: 100%; position: absolute; bottom: -30px; text-align: center;}
.flex-control-nav li {margin: 0 0 0 5px; display: inline-block; zoom: 1; *display: inline;}
.flex-control-nav li:first-child {margin: 0;}
.flex-control-nav li a {width: 13px; height: 13px; display: block; background: url(/fashion/templates/vg_fashion/images/img/bg_control_nav.png) no-repeat; cursor: pointer; text-indent: -999em;}
.flex-control-nav li a:hover {background-position: 0 -13px;}
.flex-control-nav li a.active {background-position: 0 -26px; cursor: default;}";}