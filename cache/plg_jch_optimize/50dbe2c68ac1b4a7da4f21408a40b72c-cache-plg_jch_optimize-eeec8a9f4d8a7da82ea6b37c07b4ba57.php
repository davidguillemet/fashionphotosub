<?php die("Access Denied"); ?>#x#a:2:{s:6:"output";s:0:"";s:6:"result";s:5032:"/*

	Supersized - Fullscreen Slideshow jQuery Plugin
	Version : 3.2.7
	Site	: www.buildinternet.com/project/supersized
	
	Theme 	: Shutter 1.2
	Author	: Sam Dunn
	Company : One Mighty Roar (www.onemightyroar.com)
	License : MIT License / GPL License
	
*/

	/* Controls Bar
	----------------------------*/
	#controls-wrapper { margin:0 auto; height:42px; width:100%; bottom:0px; left:0; z-index:4; background:url(/fashion/templates/vg_fashion/img/nav-bg.png) repeat-x; position:fixed; }
		#controls { overflow:hidden; height:100%; position:relative; text-align:left; z-index:5; }
			#slidecounter { float:left; color:#999; font:14px "Helvetica Neue", Helvetica, Arial, sans-serif; text-shadow:#000 0 -1px 0; margin:0px 10px 0 15px; line-height:42px; }
			#slidecaption { overflow:hidden; float:left; color:#FFF; font:400 14px "Helvetica Neue", Helvetica, Arial, sans-serif; text-shadow:#000 1px 1px 2px; margin:0 20px 0 0; line-height:42px; }
			
			#navigation { float:right; margin:0px 20px 0 0; }
				#play-button{ float:left; margin-top:1px;border-right:1px solid #333; background:url(/fashion/templates/vg_fashion/img/bg-hover.png) repeat-x 0 44px; }
					#play-button:hover{ background-position:0 1px; cursor:pointer; }
				
				#prevslide, #nextslide{ position:absolute; height:43px; width:43px; top:50%; margin-top:-21px; opacity:0.6; }
					#prevslide{ left:10px; background:url(/fashion/templates/vg_fashion/img/back.png); }
					#nextslide{ right:10px; background:url(/fashion/templates/vg_fashion/img/forward.png); }
						#prevslide:active, #nextslide:active{ margin-top:-19px; }
						#prevslide:hover, #nextslide:hover{ cursor:pointer; }
				
				ul#slide-list{ padding:15px 0; float:left; position:absolute; left:50%; }
					ul#slide-list li{ list-style:none; width:12px; height:12px; float:left; margin:0 5px 0 0; }
						ul#slide-list li.current-slide a, ul#slide-list li.current-slide a:hover{ background-position:0 0px; }
						ul#slide-list li a{ display:block; width:12px; height:12px; background:url(/fashion/templates/vg_fashion/img/nav-dot.png) no-repeat 0 -24px; }
							ul#slide-list li a:hover{ background-position:0 -12px; cursor:pointer; }
				
				#tray-button{ float:right; margin-top:1px; border-left:1px solid #333; background:url(/fashion/templates/vg_fashion/img/bg-hover.png) repeat-x 0 44px; }
					#tray-button:hover{ background-position:0 1px; cursor:pointer; }
		
	
	/* Progress Bar
	----------------------------*/					
	#progress-back{ z-index:5; position:fixed; bottom:42px; left:0; height:8px; width:100%; background:url(/fashion/templates/vg_fashion/img/progress-back.png) repeat-x; }
		#progress-bar{ position:relative; height:8px; width:100%; background:url(/fashion/templates/vg_fashion/img/progress-bar.png) repeat-x; }
	
	
	/* Thumbnail Navigation
	----------------------------*/	
	#nextthumb,#prevthumb { z-index:2; display:none; position:fixed; bottom:61px; height:75px; width:100px; overflow:hidden; background:#ddd; border:1px solid #fff; -webkit-box-shadow:0 0 5px #000; }
		#nextthumb { right:12px; }
		#prevthumb { left:12px; }
			#nextthumb img, #prevthumb img { width:150px; height:auto;  }
			#nextthumb:active, #prevthumb:active { bottom:59px; }
			#nextthumb:hover, #prevthumb:hover { cursor:pointer; }
	
	
	/* Thumbnail Tray
	----------------------------*/			
	#thumb-tray{ position:fixed; z-index:3; bottom:0; left:0; background:url(/fashion/templates/vg_fashion/img/bg-black.png); height:150px; width:100%; overflow:hidden; text-align:center; -moz-box-shadow: 0px 0px 4px #000; -webkit-box-shadow: 0px 0px 4px #000; box-shadow: 0px 0px 4px #000; }
		
		#thumb-back, #thumb-forward{ position:absolute; z-index:5; bottom:42px; height:108px; width:40px; }
			#thumb-back{ left:0; background: url(/fashion/templates/vg_fashion/img/thumb-back.png) no-repeat center center;}
			#thumb-forward{ right:0; background:url(/fashion/templates/vg_fashion/img/thumb-forward.png) no-repeat center center;}
				#thumb-back:hover, #thumb-forward:hover{ cursor:pointer; background-color:rgba(256,256,256, 0.1); }
					#thumb-back:hover{ border-right:1px solid rgba(256,256,256, 0.2); }
					#thumb-forward:hover{ border-left:1px solid rgba(256,256,256, 0.2); }
		
		
		ul#thumb-list{ display:inline-block; list-style:none; position:relative; left:0px; padding:0 0px; }
			ul#thumb-list li{ background:#111; list-style:none; display:inline; width:150px; height:108px; overflow:hidden; float:left; margin:0; }
				ul#thumb-list li img { width:200px; height:auto; opacity:0.5; -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"; filter:alpha(opacity=60); -webkit-transition: all 100ms ease-in-out; -moz-transition: all 100ms ease-in-out; -o-transition: all 100ms ease-in-out; -ms-transition: all 100ms ease-in-out; transition: all 100ms ease-in-out; }
				ul#thumb-list li.current-thumb img, ul#thumb-list li:hover img{ opacity:1; -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)"; filter:alpha(opacity=100); }
				ul#thumb-list li:hover{ cursor:pointer; }";}