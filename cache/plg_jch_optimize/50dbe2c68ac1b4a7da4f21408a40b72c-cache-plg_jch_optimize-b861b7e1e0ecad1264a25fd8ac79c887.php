<?php die("Access Denied"); ?>#x#a:2:{s:6:"output";s:0:"";s:6:"result";s:19558:"@charset "utf-8";
/*
	Copyright 2012. Azamat Umarov.
*/
/*
	LIST OF SECTION ::::::::::::	
		1 ---- BASE STYLES
		2 ---- NAVIGATION (MENU)
		3 ---- CONTENT
		4 ---- SOCIAL ICONS
		5 ---- BLOG
		6 ---- CONTACT
		7 ---- ABOUT
		8 ---- PORTFOLIO
		9 ---- ISOTOPE FILTER
		10 ---- RIGHT SIDEBAR
		11 ---- FOOTER
		12 ---- FOR IPAD, IPHONE AND MOBILE DEVICES
	
Columns styles are in column.css. 	
*/

/*:::::::::: BASE STYLES ::::::::::*/
body{
	padding:0;	
	margin:0;	
	width:100%;	
	height:100%;
}
@font-face {
	font-family: 'Gnuolane';
	src: url(/fashion/templates/vg_fashion/fonts/gnuolane_free-webfont.eot) format('embedded-opentype'),
		 url(/fashion/templates/vg_fashion/fonts/gnuolane_free-webfont.ttf) format('truetype');
	font-weight: normal;
	font-style: normal;

}
*{
	outline:none;
	border:none;
	line-height:1.5;
}
h3{
	font-family:'Gnuolane';
	font-weight:normal;
	line-height:1.2;
}
.spacer{
	clear:both;	
	width:100%;	
	height:0;
}
.wrapper {
	width:960px;	
	height:auto;	
	margin:0 auto;	
	padding:0;
}
.controller {
	width:100%; 
	height:auto; 
	margin:0;	
	padding:0; 
	float:left;	
}
.header{
	width:100%;	
	/*height:80px; The height is driven by the bootstrap navbar height */	
	float:left;	
	margin:0;	
	padding:0;
}
.logo{
	width:220px;
	height:80px;
	float:left;
	margin:0 10px;
}

/*:::::::::: NAVIGATION (MENU) ::::::::::*/
#smoothmenu1{
	width:940px;
	/*height:80px; The height is driven by the bootstrap navbar height */
	float:left;
	margin:0 0 0 10px;
	background:url(/fashion/templates/vg_fashion/images/img/blackBG.png) repeat;
	z-index:99;
	position:relative;
	font-weight: 600;
	font-size: 16px;
}
a.mobile-menu-button{
	display:none;
}
.header-hider{
	width:40px;
	height:80px;
	/*float:right;
	margin:0 10px 0 0;*/
	position:relative;
	z-index:99;
	left: 910px;
}
.header-hider a.hider{
	background:url(/fashion/templates/vg_fashion/images/img/controllers.png) no-repeat left top;
	width:100%;
	height:100%;
	display:block;
}
.header-hider a.opener{
	display:none;
	background:url(/fashion/templates/vg_fashion/images/img/controllers.png) no-repeat top right;
	width:100%;
	height:100%;
}

/*:::::::::: CONTENT ::::::::::*/
.content{
	width:100%;
	height:auto;
	float:left;
	margin:20px 0 0 0;
	padding:0;
	font-family:Arial;
	font-size:13px;
}
.title-block{
	width:940px;
	height:80px;
	margin:0 10px 20px 10px;
	background:url(/fashion/templates/vg_fashion/images/img/blackBG.png) repeat;
}
.title-block h3{
	margin:13px 0 0 20px;
	padding:0;
	font-size:45px;
	color:#FFF;
	float:left;
}
.content-hider{
	width:40px;
	height:80px;
	float:right;
	position:relative;
}
.content-hider a.c-hider{
	background:url(/fashion/templates/vg_fashion/images/img/controllers.png) no-repeat bottom left;
	width:100%;
	height:100%;
	display:block;
}
.content-hider a.c-opener{
	display:none;
	background:url(/fashion/templates/vg_fashion/images/img/controllers.png) no-repeat bottom right;
	width:100%;
	height:100%;
}

/*:::::::::: SOCIAL ICONS ::::::::::*/
.social-icons{
	height:100%;
	width:auto;
	float:right;
	margin:0 5px 0 0;
}
a.social-mobile{
	text-decoration:none;
	color:#eee;
	float:right;
	margin:22px 0;
	width:50px;
	text-align:center;
	display:none;
}
.social-icons a{
	text-decoration:none;
	width:30px;
	height:50px;
	display:block;
	float:left;
	margin:15px 10px 0 0;
	font-family:Arial, Helvetica, sans-serif;
}
.social-icons a.twitter{background:url(/fashion/templates/vg_fashion/images/img/icons/twitter.png) no-repeat center;}
.social-icons a.facebook{background:url(/fashion/templates/vg_fashion/images/img/icons/facebook.png) no-repeat center;}
.social-icons a.dribble{background:url(/fashion/templates/vg_fashion/images/img/icons/dribble.png) no-repeat center;}
.social-icons a.youtube{background:url(/fashion/templates/vg_fashion/images/img/icons/youtube.png) no-repeat center;}
.social-icons a.skype{background:url(/fashion/templates/vg_fashion/images/img/icons/skype.png) no-repeat center;}


/*:::::::: BLOG :::::::::*/
.blog-block{
	width:100%;
	height:auto;
	float:left;
	margin:0 0 20px 0;
	padding:0;
	background:url(/fashion/templates/vg_fashion/images/img/blackBG.png) repeat;
}
.blog-block img{
	width:100%;
	height:auto;
	margin:0;
}
.blog-block h3{
	margin:15px 20px 15px 20px;
	padding:0;
	color:#eee;
	font-size:24px;
}
.blog-block h3 a{
	color:#eee;
	text-decoration:none;
}
.blog-block h3 a:hover{
	color:#FFF;
}
.blog-block p{
	margin:0 20px 15px 20px;
	padding:0;
	color:#e5e5e5;
}
ul.slides p{
	margin:0;
	padding:5px 0;
	color:#eee;
}
ul.slides p span{
	padding:5px 20px;
}
.descrip{
	float:left;
	width:430px;
}
span.bottom-line{
	width:150px;
	/*width:25%;*/
	height:auto;
	margin:20px 0;
	display:block;
	font-size:12px;
	float:right;
	border-left:1px solid #222222;
}
span.bottom-line span{
	margin:5px 10px 5px 20px;
	padding:0 0 0 20px;
	display:inline-block;
}
span.bottom-line a{
	text-decoration:none;
	color:#999999;
	padding:0 0 2px 0;
	background:url(/fashion/templates/vg_fashion/images/img/link-border-grey.png) repeat-x bottom;
}
span.bottom-line a:hover{
	color:#999999;
}
span.comment-link{background:url(/fashion/templates/vg_fashion/images/img/icon-comment.png) no-repeat left center;}
span.author-link{background:url(/fashion/templates/vg_fashion/images/img/icon-author.png) no-repeat left center;}
span.time-link{background:url(/fashion/templates/vg_fashion/images/img/icon-time.png) no-repeat left center;}
span.permalink-link{background:url(/fashion/templates/vg_fashion/images/img/icon-permalink.png) no-repeat left center;}

.vimeo-video{
	width:100%;
	height:350px;
}
.youtube-video{
	width:100%;
	height:370px;
}
.pager{
	width:100%;
	float:left;
	clear:both;
	margin:0 0 20px 0;
}
.pager a{
	width:60px;
	height:25px;
	display:block;
	float:left;
	padding:5px 0 0 0;
	margin:0 20px 0 0;
	text-align:center;
	background:url(/fashion/templates/vg_fashion/images/img/blackBG.png) repeat;
	color:#999;
	text-decoration:none;
	font-size:12px;
}
.pager a:hover{
	color:#FFF;
}
.comment-block{
	width:100%;
	height:auto;
	float:left;
	margin:0 0 20px 0;
	padding:0;
	background:url(/fashion/templates/vg_fashion/images/img/blackBG.png) repeat;
}
.left-comments{
	margin:20px 20px 0 20px;
	float:left;
	clear:both;
	display:block
}
.left-comments img{
	width:60px;
	height:60px;
	margin:0 10px 5px 0;
}
.comment-block p{
	color:#999;
}
.left-comments a{
	color:#FFF;
	border-bottom:1px dotted #FFF;
	text-decoration:none;
}
.left-comments a:hover{
	color:#999;
	border-bottom:1px dotted #999;
}
.comment-block p span{
	font-size:11px;
	color:#484848;
}
.comment-block form{
	float:left;
	clear:both;
}
input.com-text{
	width:167px;
	height:24px;
	margin:20px 0 20px 20px;
	padding:3px 5px;
	background:#070707;
	color:#999;
}
.comment-block textarea{
	width:560px;
	height:130px;
	margin:0 0 20px 20px;
	background:#070707;
	color:#999;
	padding:10px;
	font-family:Arial;
	font-size:13px;
}
input.com-submit{
	background:#000;
	border:1px solid #070707;
	margin:0 0 20px 20px;
	color:#999;
	padding:8px 20px;
	cursor:pointer;
	text-align:center;
}
input.com-submit:hover{
	color:#FFF;
}

/*:::::: CONTACT ::::::*/
.map{
	width:100%;
	height:300px;
}
a.send{
	background:#000;
	border:1px solid #070707;
	margin:0 0 20px 20px;
	color:#999;
	padding:8px 20px;
	cursor:pointer;
	text-align:center;
	text-decoration:none;
	float:left;
	clear:both;
}
a.send:hover{
	color:#FFF;
}
.alertMessage{
	margin:10px 0 20px 20px;
	color:#999;
}
.alertMessage ul{
	list-style-type:circle;
	margin:0 0 20px 20px;
	padding:0;
	color:#999;
}

/*:::::: ABOUT :::::::*/
.about-block{
	width:100%;
	height:auto;
	float:left;
	margin:0 0 20px 0;
	padding:0;
	background:url(/fashion/templates/vg_fashion/images/img/blackBG.png) repeat;
}

.about-block img{
	width:100%;
	height:auto;
	margin:0;
}
.about-block h3{
	margin:15px 20px 15px 20px;
	padding:0;
	color:#eee;
	font-size:24px;
}
.about-block h3 a{
	color:#eee;
	text-decoration:none;
}
.about-block h3 a:hover{
	color:#FFF;
}
.about-block p{
	margin:0 20px 15px 20px;
	padding:0;
	color:#e5e5e5;
}
.section{
	margin:0 0 20px 0;
	float:left;
	clear:both;
}
.block{
	width:100%;
	height:auto;
	float:left;
	margin:0 0 20px 0;
	padding:0;
	background:url(/fashion/templates/vg_fashion/images/img/blackBG.png) repeat;
}
.block h3{
	margin:15px 20px 15px 20px;
	padding:0;
	color:#eee;
	font-size:24px;
}
.block h3 a{
	color:#eee;
	text-decoration:none;
}
.block h3 a:hover{
	color:#FFF;
}
.block p{
	margin:0 20px 15px 20px;
	padding:0;
	color:#e5e5e5;
}
.slides img{
	width:100%;
}
.errorPage{
	font-size:200px;
	color:#eee;
	margin:0 auto;
	text-align:center;
	font-family:'Gnuolane';
}
/*:::::: PORTFOLIO ::::::*/
#portfolio{
	width:100%;
}
.portfolio-list{
	margin:0;
	padding:0;
	width:960px;
	list-style-type:none;
	float:left;
	display:block;
}
.portfolio-list h3{
	margin:0;
	padding:7px 20px;
	background:#e5e5e5;
	font-size:16px;
}
.portfolio-list h3 a{
	text-decoration:none;
	color:#484848;
}
.portfolio-list h3 a:hover{
	color:#000;
}
.portfolio-4 img{
	width:100%;
}
.portfolio-4 h3{
	width:180px;
}

.viewport{
	position:relative;
	width:100%;
	height:138px;
	overflow:hidden;
}
.viewport span {
	display: none;
	font-size: 1.0em;
	font-weight: bold;
	height: 100%;
	position: absolute;
	text-align: center;
	text-decoration: none;
	width: 100%;
	z-index: 100;
}
.viewport img {
	height: auto;
	position: relative;
	width: 100%;
}
.dark-background {
	background-color: rgba(01, 01, 01, 0.8);
	color: #fff;
	text-shadow: #000 0px 0px 20px;
}
.dark-background em {
	color: #ccc;
}
a.zoom{
	background:url(/fashion/templates/vg_fashion/images/img/zoom.png) no-repeat;
	width:20px;
	height:20px;
	display:block;
	float:left;
	margin:60px 0 0 70px;
}
a.more{
	background:url(/fashion/templates/vg_fashion/images/img/permalink.png) no-repeat;
	width:20px;
	height:20px;
	display:block;
	float:left;
	margin:60px 0 0 40px;
}
a.img{
	position:relative;
	display:block;
	width:100%;
}
#portfolio-filter{
	list-style-type:none;
	margin:0 10px 10px 10px;
	padding:0;
	float:left;
	clear:both;
	width:940px;
}
#portfolio-filter li{
	float:left;
	margin:0;
	padding:0;
}
#portfolio-filter li a{
	margin:0 10px 10px 0;
	padding:8px 15px;
	text-decoration:none;
	color:#999999;
	display:block;
	background:#070707;
}
/*#portfolio-filter li a.current{
	color:#111;
	background:#e5e5e5;
}*/

/*:::::: Isotope filtering :::::::*/
.isotope-item {	z-index: 2;}
.isotope-hidden.isotope-item {	pointer-events: none;	z-index: 1;}
.isotope, .isotope .isotope-item {	-webkit-transition-duration: 0.7s;	-moz-transition-duration: 0.7s;	transition-duration: 0.7s;}
.isotope {-webkit-transition-property: height, width;	-moz-transition-property: height, width;	transition-property: height, width;}
.isotope .isotope-item {	-webkit-transition-property: -webkit-transform, opacity;	-moz-transition-property:-moz-transform, opacity;transition-property:transform, opacity;}

/*:::::: RIGHT SIDEBAR ::::::*/
.search-block{
	width:100%;
	height:auto;
	float:left;
	clear:both;
	background:url(/fashion/templates/vg_fashion/images/img/blackBG.png) repeat;
	padding:10px 0;
	margin:0 0 20px 0;
}
.search-block form{
	width:280px;
	height:40px;
	margin:0 10px;
	background:#070707;
	
}
.search-block input{
	margin:13px 0 0 10px;
	width:260px;
	background:none;
	border:none;
	color:#999;
	font-size:13px;
}
.right-block{
	width:100%;
	height:auto;
	float:left;
	clear:both;
	background:url(/fashion/templates/vg_fashion/images/img/blackBG.png) repeat;
	padding:0;
	margin:0 0 20px 0;
}
.right-block h3{
	font-size:24px;
	color:#484848;
	background:#e5e5e5;
	padding:10px 20px;
}
.right-block ul{
	list-style-type:none;
	padding:10px 0 5px 0;
}
.right-block ol{
	padding:10px 0 5px 0;
	margin:0 0 0 20px;
}
.right-block ul.archive li{
	margin:10px 20px;
	padding:0 0 10px;
	color:#555;
}
.right-block ul.archive li a{
	color:#999;
	text-decoration:none;
	margin:0 10px 0 0;
	border-bottom:1px dotted #999;
	padding:0 0 2px 0;
}
.right-block ul.archive li a:hover{
	color:#FFF;
	border-bottom:1px dotted #fff;
}
.right-block ol.archive li{
	margin:10px 20px;
	padding:0 0 10px;
	color:#555;
}
.right-block ol.archive li a{
	color:#999;
	text-decoration:none;
	margin:0 10px 0 0;
	border-bottom:1px dotted #999;
	padding:0 0 2px 0;
}
.right-block ol.archive li a:hover{
	color:#FFF;
	border-bottom:1px dotted #fff;
}
.right-block ul.last-work{
	padding:0;
}
.right-block ul.last-work li{
	margin:20px 0 0 20px;
	padding:0;
}
.right-block ul.last-work li img{
	width:260px;
	height:100px;
}
.right-block p{
	color:#999;
	margin:20px;
}
.right-block p span{
	color:#FFF;
}

/*:::::::: FOOTER :::::::::*/
.footer{
	width:130px;
	height:35px;
	margin:0 0 0 415px;
	padding:0;
	position:fixed;
	bottom:0;
}
.mask {
	background: url(/fashion/templates/vg_fashion/images/img/overlay2.png) repeat;
	display: block;
	height: 100%;
	left: 0;
	overflow: hidden;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: -998;
}
.jp-play, .jp-pause{
	width: 22px;
	height: 20px;
	text-indent: -9999px;
	opacity: 1;
	z-index:999;
	position:relative;
	float:left;
	margin:6px 0 0 0;
}
.jp-pause{
	background:transparent url(/fashion/templates/vg_fashion/images/img/audio-on.png) no-repeat left center;
}
.jp-play{
	background:transparent url(/fashion/templates/vg_fashion/images/img/audio-off.png) no-repeat left center;
}
#jp_container_1{
	position:relative;
	float:left;
	margin:0;
}
#jquery_jplayer_1{
	width:0;
	display:none;
	float:left;
}
#video-wrap{
	position:fixed;
	left:0;
	top:0;
	z-index:-99;
}
@media only screen and (min-width: 768px) and (max-width: 959px){
.wrapper{
	width:750px;
}

#smoothmenu1{
	width:730px;
	margin: 0 0 0 10px;
}
.header-hider
{
	left: 700px;
}
.title-block{
	width:730px;
}
.footer{
	width:160px;
	height:40px;
	margin:0 0 0 295px;
}
#controls-wrapper{
	/*width:150px;*/
	width: 100%;
}
#prevslide, #nextslide{
	width:30px;
	height:30px;
	margin:0;
	padding:5px 0 0 0;
	background-position:center;
}
.jp-play, .jp-pause{
	width:20px;
	height:30px;
	padding:1px 5px 5px 5px;
	margin:0;
	background-position:center;
}
.column-2{
	width:410px;
}
.column-1{
	width:730px;
}
.column-5{
	margin: 0 15px 20px 15px;
}
input.com-text{
	width:360px;
	margin:20px 0 0 20px;
}
.comment-block textarea{
	width:350px;
	margin:20px 0 20px 20px;
}
.portfolio-list{
	width:750px;
}
#portfolio-filter{
	width:750px;
}
.youtube-video{
	width:100%;
	height:270px;
}
.descrip{
	width:410px;
}
span.bottom-line{
	width:410px;
	border:none;
	border-top:1px solid #222;
	padding:10px 0;
}
}

@media only screen and (min-width: 480px) and (max-width: 767px){
.wrapper{
	width:470px;
}
.logo{
	margin:0;
}
#smoothmenu1{
	width:460px;
	margin:0 0 0 0px;
	/*height:80px; The height is driven by the bootstrap navbar height */
	text-align:center;
}
.header-hider
{
	left: 420px;
}
a.mobile-menu-button{
	display:block;
	font-family:'Gnuolane';
	font-weight:normal;
	font-size:20px;
	text-decoration:none;
	color:#eee;
	padding:25px 0 31px 0;
	width:100%;
}
.title-block{
	width:460px;
	margin:0 0 20px 0;
}
.social-icons{
	background:url(/fashion/templates/vg_fashion/images/img/blackBG.png) repeat;
	position:absolute;
	height:auto;
	padding:0 13px 10px 13px;
	margin:80px 0 0 364px;
	z-index:999;
	display:none;
	float:right;
}
.open-social, a.social-mobile{display:block;}

.social-icons a{
	float:none;
	height:40px;
	margin:0;
}
.footer{
	width:160px;
	height:40px;
	margin:0 0 0 155px;
}
#controls-wrapper{
	/*width:150px;*/
}
#prevslide, #nextslide{
	width:30px;
	height:30px;
	margin:0;
	padding:5px 0 0 0;
	background-position:center;
}
#play-button{
	/*width:20px;
	height:30px;
	padding:12px 3px 0 12px;
	margin:0;*/
}
#controls{
	/*width:100px;*/
}
#slide-list
{
	display: none;
}
.jp-play, .jp-pause{
	width:20px;
	height:30px;
	padding:1px 5px 5px 5px;
	margin:0;
	background-position:center;
}
.column-2{
	width:460px;
	margin:0;
}
.column-4{
	width:460px;
	margin:0;
}
.column-1{
	width:460px;
	margin:0;
}
.column-5{
	margin:0 5px 20px 5px;
}
.right-block ul.last-work li{
	margin:20px 0 0 100px;
}
.search-block form{
	width:440px;
	
}
.search-block input{
	width:420px;
}
input.com-text{
	width:410px;
	margin:20px 0 0 20px;
}
.comment-block textarea{
	width:400px;
	margin:20px 0 20px 20px;
}
.portfolio-list{
	width:470px;
}
#portfolio-filter{
	width:470px;
	margin:0 0 10px 0;
}
.youtube-video{
	width:100%;
	height:300px;
}
.descrip{
	width:460px;
}
span.bottom-line{
	width:460px;
	border:none;
	border-top:1px solid #222;
	padding:10px 0;
}
}
@media only screen and (min-width: 200px) and (max-width: 479px){
.wrapper{
	width:300px;
}
.logo{
	margin:0;
}
#smoothmenu1{
	width:300px;
	margin:0;
}
a.mobile-menu-button{
	display:block;
	font-family:'Gnuolane';
	font-weight:normal;
	font-size:20px;
	text-decoration:none;
	color:#eee;
	padding:25px 0 31px 0;
	width:100%;
	text-align:center;
}
.header-hider{
	margin: 0;
	width: 30px;
	left: 270px;
}
.title-block{
	width:300px;
	margin:0 0 20px 0;
}
.content-hider{
	width:30px;
}
.social-icons{
	background:url(/fashion/templates/vg_fashion/images/img/blackBG.png) repeat;
	position:absolute;
	height:auto;
	padding:0 13px 10px 13px;
	margin:80px 0 0 214px;
	z-index:999;
	display:none;
}
.open-social, a.social-mobile{display:block;}

.social-icons a{
	float:none;
	height:40px;
	margin:0;
}
.footer{
	width:160px;
	height:40px;
	margin:0 0 0 70px;
}
#controls-wrapper{
	/*width:150px;*/
}
#prevslide, #nextslide{
	width:30px;
	height:30px;
	margin:0;
	padding:5px 0 0 0;
	background-position:center;
}
#play-button{
	/*width:20px;
	height:30px;
	padding:12px 3px 0 12px;
	margin:0;*/
}
#controls{
	/*width:100px;*/
}
#slide-list
{
	display: none;
}

.jp-play, .jp-pause{
	width:20px;
	height:30px;
	padding:1px 5px 5px 5px;
	margin:0;
	background-position:center;
}
.column-2{
	width:300px;
	margin:0;
}
.column-4{
	margin:0;
}
.column-1{
	width:100%;
	margin:0;
}
.column-5{
	margin:0 0 20px 40px;
}
input.com-text{
	width:250px;
	margin:20px 0 0 20px;
}
.comment-block textarea{
	width:240px;
	margin:20px 0 20px 20px;
}
.portfolio-list{
	width:300px;
}#portfolio-filter{
	width:300px;
	margin:0 0 10px 0;
}
.youtube-video{
	width:100%;
	height:235px;
}
.header-hider a.hider{
	background-position:-5px 0;
}
.header-hider a.opener{
	background-position:-45px 0;
}
.content-hider a.c-hider{
	background-position:-5px -80px;
}
.content-hider a.c-opener{
	background-position:-45px -80px;
}
.descrip{
	width:300px;
}
span.bottom-line{
	width:300px;
	border:none;
	border-top:1px solid #222;
	padding:10px 0;
}
}";}