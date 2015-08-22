<?php die("Access Denied"); ?>#x#a:2:{s:6:"output";s:0:"";s:6:"result";s:36758:"/* Google Font 'Open Sans' */
/* Light => font-weight: 300 */
/* Normal => font-weight: 400 */
/* Semi Bold => font-weight: 600 */
/* Bold => font-weight: 700 */

body
{
	color: #a5a5a5;
	font-family: 'Open Sans';
	font-weight: 400;
}


body a
{
  color: #a0afe8;
  text-decoration: none;
}

body a:hover
{
	color : #ff5b0a;
    text-decoration: none;
}

/* Override bootstrap focus style */
body a:focus
{
	color: #a0afe8;
	text-decoration: none;
}

h3 
{
	font-family: 'Open Sans Condensed';
	font-weight: 600;
	line-height: 1.2;
}
label /* because of boostrap bold label */
{
	font-weight: inherit;
}

.content
{
	font-family: 'Open Sans';
	font-size: 16px;
	font-weight: 400;
}

.font-italic
{
	font-style: italic;
}

.title-block
{
	text-transform: uppercase;
}

.title-block h3
{
	display: block;
	font-size: 45px;
	margin: 13px 0 0 20px;
}

.footer
{
	z-index: 998; /* 1 less than shadowbox */
}

.compteur
{
	margin-right: 10px;
	margin-top: 9px;
}

.lead
{
	font-weight: 400;
	font-size: 20px;
	color: #e5e5e5;
}

.st_fblike_large > span > div > span,
.st_fblike_large > span > div > span > iframe
{
	width: 110px !important;
	height: 24px !important;
}

ul#slide-list
{
	padding: 0px;
}

/* Shadowbox */
#sb-title-inner, #sb-info-inner, #sb-loading-inner, div.sb-message
{
	font-family: "Open Sans";
	font-weight: 400;
}

/* Pour la recherhe AJAX */
.search
{
	float: right;
	padding: 5px;
	margin: 15px 10px;
	border: 1px solid #666;
	position: relative;
}

#offlajn-ajax-search103
{
	width: auto;
}

input#search-area103
{
	width: 230px;
    -moz-transition: all 200ms linear 0s;
    -webkit-transition: all 200ms linear 0s;
    -o-transition: all 200ms linear 0s;
	font-weight: 300;
	font-size: inherit;
}
input#search-area103:focus
{
	width: 300px;
}

#offlajn-ajax-tile-results
{
	display: none;
	margin: 0 10px 20px 10px;
}

#offlajn-ajax-tile-results .search-result-card .search-result-title > span
{
	font-size: 14px;
	font-weight: 400;
	text-align: left;
}

/* Navigation entre articles */
#tz-portfolio-template-navigation-bottom
{
	border-top: 4px solid #212121;
}
#tz-portfolio-template-navigation-top
{
	border-bottom: 4px solid #212121;
}
.TzNavigationItem
{
	color: #a0afe8;
	font-size: 20px;
	font-weight: 400;
	text-transform: uppercase;
	text-decoration: none;
	text-align: center;
	float: left;
	display: inline;
	width: 50%;
	padding: 20px;
	white-space: nowrap;
    -moz-transition: all 200ms linear 0s;
    -webkit-transition: all 200ms linear 0s;
    -o-transition: all 200ms linear 0s;
}
.TzNavigationItem .icon-right
{
	margin-left: 10px;
}
.TzNavigationItem .icon-left
{
	margin-right: 10px;
}
.TzNavigationItem:hover
{
	color: #ff5b0a;
	background-color: #212121;
}
#tz-portfolio-template-navigation-bottom .next, #tz-portfolio-template-navigation-top .next
{
	border-left: 2px solid #212121;	
}
#tz-portfolio-template-navigation-bottom .previous, #tz-portfolio-template-navigation-top .previous
{
	border-right: 2px solid #212121;	
}

/* Pour les menus */
.navbar
{
	-moz-border-radius: 0px;
	-webkit-border-radius: 0px;
	border-radius: 0px;
	border: none;
}
.navbar-brand
{
	padding: 0px;
}
.navbar-brand img
{
	height: 80px;
	margin-right: 20px;
    opacity: 0.7;
    filter:alpha(opacity=70);
    -moz-transition: all 200ms linear 0s;
    -webkit-transition: all 200ms linear 0s;
    -o-transition: all 200ms linear 0s;
}
.navbar-brand img:hover
{
    opacity: 1;
    filter:alpha(opacity=100);
}
.navbar-toggle
{
	margin-right: 55px;
}

.dropdown-menu
{
	padding: 0px;
}

.dropdown-menu > li > a
{
	padding: 5px 20px;
}

.dropdown-menu > li > a:hover,
.dropdown-menu > li > a:focus
{
	color: #fff;
	background-color: #0081c2;
}
.navbar-inverse .navbar-nav > li > a
{
	color: #9d9d9d;
	text-transform: uppercase;
	font-family: 'Open Sans Condensed';
	font-weight: 700;
	font-size: 20px;
}
.dropdown-menu > li > a
{
	text-transform: uppercase;
}
.navbar-nav > li > .dropdown-menu
{
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	border-radius: 0px;
}

@media screen and (min-width: 960px) {

	.navbar .nav > li > .dropdown-menu:after
	{
		content: '';
		display: inline-block;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-bottom: 6px solid #fff;
		position: absolute;
		top: -6px;
		left: 20px;
	}
	
}
@media (max-width: 959px) {
	
	#navbar > ul.navbar-nav
	{
		text-align: left;
	}
	 	
	.navbar-nav .open .dropdown-menu
	{
		background-color: #ffffff;
		-moz-border-radius: 0px;
		-webkit-border-radius: 0px;
		border-radius: 0px;
	}
	.navbar-inverse .navbar-nav .open .dropdown-menu > li > a
	{
		color: #333333;
	}
	.navbar-inverse .navbar-nav .open .dropdown-menu > li > a:hover,
	.navbar-inverse .navbar-nav .open .dropdown-menu > li > a:focus
	{
		color: #fff;
		background-color: #0081c2;
	}
	
}

/* Nonumber slider */ 
.panel
{
	/* conflicts with bootstrap */
	background: transparent;
}
.nn_sliders.accordion>.accordion-group
{
	border: 1px solid #bbb;
	-webkit-border-radius: 0px;
	-moz-border-radius: 0px;
	border-radius: 0px;
}
.nn_sliders.accordion>.guestbook
{
	border: none;
	-moz-border-radius: 0px;
	-webkit-border-radius: 0px;
	border-radius: 0px;
}
.guestbook
{
	background: url(/fashion/templates/vg_fashion/images/img/blackBG.png) repeat;
}


/* Pour le livre d'or TZ Guestbook */
.guestbook-col1
{
	float: left;
	width: 50%;
}
.guestbook-col2
{
	float: left;
	width: 50%;
	height: 190px;
}
.guestbook-form-container
{
	overflow: hidden;
}
.guestbook-form-container .warp-in
{
	height: 100%;
}
.guestbook-warning
{
	margin: 5px 0px;
}

#TZGuestBook
{
	-moz-border-radius: 0px;
	-webkit-border-radius: 0px;
	border-radius: 0px;
	background: none;
}

#nnt_comment
{
	background: url(/fashion/templates/vg_fashion/images/img/blackBG.png) repeat;
	text-align: center;
	height: 100px;
}

#nnt_comment:hover
{
	color: #ff5b0a;
}

#nnt_comment_a1
{
	margin: auto;
	float: none;
	text-align: center;
	font-weight: 600;
	width: 100%;
	height: 90px;
	background: none;
	padding: 10px 0 0 0;
    -moz-transition: all 200ms linear 0s;
    -webkit-transition: all 200ms linear 0s;
    -o-transition: all 200ms linear 0s;
}
#nnt_comment_a1 > i
{
	font-size: 60px;	
}
#nnt_comment_a1:hover
{
	color: inherit;
	background: #212121;
}

#wrap-baiviet
{
	background: none;
	left: 8px;
}

.nnt-warp-comment-class
{
	background: url(/fashion/templates/vg_fashion/images/img/blackBG.png) repeat;
	border: none;
	margin: 0px 10px 10px 0;
}

[class^="nnt-warl-comment-li"] > span, [class^="nnt-warl-comment-li"] > p
{
	font-family: 'Open Sans';
	padding: 0;
}

[class^="nnt-warl-comment-li"]
{
	background: none;
	border: none;
	padding: 5px 15px 5px 17px;
	margin: 0;
	color: inherit;
}

.nnt-warl-comment-li-comment
{
	margin-bottom: 10px;
	padding-left: 25px;
	padding-right: 25px;
	width: auto;
	color: #a5a5a5;
}

.nnt-warl-comment-li-title
{
	width: 100%;
	height: auto;
	font-weight: 600;
	background: url(/fashion/templates/vg_fashion/images/notice.png) no-repeat 15px 15px;
	padding-top: 20px;
	padding-left : 37px;
	font-size: 20px;
	text-transform: uppercase;
}

.nnt-warl-comment-li-title span
{
	font-family: "Open Sans Condensed";
}

.nnt-warl-comment-li-date, .nnt-warl-comment-li-name, .nnt-warl-comment-li-date-name, .nnt-warl-comment-li-mail, .nnt-warl-comment-li-site
{
	font-size: 12px;
	font-style: italic;
	color: #a5a5a5;
	padding-bottom: 0px;
	padding-top: 0px;
}

.nnt-warl-comment-li-name
{
	float: right;
}

.nnt-warl-comment-li-date
{
	float: left;
	text-transform: capitalize;
}

.nnt-warl-comment-li-site, .nnt-warl-comment-li-mail
{
	text-align: right;
}

#tz-Guestbook-seccess
{
	width: 500px;
	height: 50px;
	display: none;
	left: 50%;
	top: 50%;
	margin-left: -250px;
	margin-top: -25px;
	z-index: 5000;
	position: fixed;
	
	text-align: center;
	background: #fff;
}
#tz-Guestbook-seccess span
{
	padding-top: 13px;
	display: block;
	font-size: 15px;
	color: #606060;
}

#warp-fom
{
	position: static;
	width: 100%;
	height: auto;
	border: none;
	background: none;
	color: inherit;
	text-align: initial;
	overflow: visible;
}

#tz-guestbook-form-title
{
	position: relative;
	padding: 10px 0 10px 15px;
	background-color: #4b91b5;
}

#tz-guestbook-form-title > span:first-child
{
	font-size: 22px;
	font-weight: 400;
	color: #e5e5e5;
	text-transform: uppercase;
}

#tz-guestbook-h5-img, #tz-guestbook-h5-img:hover
{
	position: absolute;
	left: auto;
	right: 0px;
	top: 0px;
	width: 50px;
	height: 50px;
	background-image: url(/fashion/templates/vg_fashion/images/close.png);
	background-repeat: no-repeat;
	background-position: center center;
}
#tz-guestbook-h5-img:hover
{
	cursor: pointer;
	color: #ff5b0a;
}

[id^="warp-input"], #warp-fom textarea
{
	border: 1px solid #d8d8d8;
	background: #ffffaa no-repeat;
	color: #a1a1a1;
	/*font-size: 15px;*/
	font-weight: 300;
	line-height: 1.2;
	resize: none;
}


.mandatory, #warp-fom textarea.mandatory
{
	border: 2px solid #d8d8d8;
}

.guestbook-warning
{
	/*height: 15px;*/
}
.guestbook-warning > span
{
	line-height: 1;
}

[class^="tz_input_"]
{
	font-family: inherit;
	padding-left: 2px;
}

.conten-input
{
	width: 100%;
}
#text-ra
{
	width: 100%;
	height: 100%;
}

.warp-in2
{
	margin: 0 20px;
}

.warp-in, .warp-in:first-child
{
	margin: 10px 20px 0 20px;
}

#nnt_com1
{
	margin-top: 0px;
}
#warp-label
{
	float: none;
	padding-left: 0px;
	color: inherit;
	margin-bottom: 0px;
}
#warp-check
{
	float: none;
	margin-left: 2px;
	margin-right: 7px;
}

#warp-input-sub
{
	background-color: #4b91b5;
	border: none;
	-moz-border-radius: 1px;
	-webkit-border-radius: 1px;
	border-radius: 1px;
	-webkit-box-shadow: none;
	-moz-box-shadow: none;
	box-shadow: none;
	color: #e5e5e5;
	text-shadow: none;
	font-size: 20px;
	height: 45px;
	width: 100%;
	margin: 0px;
	margin-top: 15px;
}
#warp-input-sub:hover
{
	background-color: #65a8ca;
}

.guestbook-ajax-loader
{
	font-size: 20px;
}

/* Pour les filtres du Portfolio */
#TzContent #tz_options .option-combo a, .mollusques a.btn
{
	background-color: rgb(7, 7, 7);
	color: #e5e5e5;
	border: none;
	padding: 5px 10px 5px 10px;
	text-transform: capitalize;
	text-decoration: none;
	-moz-transition: all 200ms linear 0s;
	-webkit-transition: all 200ms linear 0s;
	-o-transition: all 200ms linear 0s;
	
	-moz-box-shadow: 3px 3px 10px 2px #656565;
	-webkit-box-shadow: 3px 3px 10px 2px #656565;
	-o-box-shadow: 3px 3px 10px 2px #656565;
	box-shadow: 3px 3px 10px 2px #656565;
	filter:progid:DXImageTransform.Microsoft.Shadow(color=#656565, Direction=135, Strength=10);
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	border-radius: 5px;

    opacity: 0.8;
    filter:alpha(opacity=80);

}

.mollusques #all 
{
	background-color: rgb(229, 229, 229);
	color: rgb(7, 7, 7);
	cursor: default;	
}

#TzContent #tz_options .option-combo a.selected, .mollusques a.selected
{
	background-color: #e5e5e5;
	color: rgb(7, 7, 7);
}

#TzContent #tz_options .option-combo a:hover, .mollusques a.btn:hover
{
	background-color: rgb(229, 229, 229);
	color: rgb(7, 7, 7);
}

.mollusques a.btn
{
	border: 1px solid #e5e5e5;
}

.tz_portfolio_image:hover span.icon_image,
.tz_portfolio_gallery:hover span.icon_gallery,
.tz_portfolio_video:hover span.icon_video,
.element .TzInner:hover .TzPortfolioDescription,
.element .TzInner:hover .bg-item,
.TzElement .TzInfo,
.TzElement:hover .TzInfo
{
    -moz-transition: all 200ms linear 0s;
    -webkit-transition: all 200ms linear 0s;
    -o-transition: all 200ms linear 0s;
}

a.bg-item
{
	text-decoration: none;
}

#filter > a
{
	line-height: 43px;
}

/* Pour l'affichage du portfolio */
/* Lignes 663 à 759 */
.TzElement{

}
.element{
    background:none;
}
div#TzContent .tz_item .TzInner
{
    padding:0;
    margin: 0  6px 6px 0;
    border:none;
    /*box-shadow: 2px 2px #B9B9B9;*/
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.element .TzInner:hover .TzPortfolioMedia img{
    transform:scale(1.2);
    -moz-transition: all 400ms linear 200ms;
    -webkit-transition: all 400ms linear 200ms;
    -o-transition: all 400ms linear 200ms;
}
.element .TzInner .TzPortfolioMedia img{
    -moz-transition: all 300ms linear 200ms;
    -webkit-transition: all 300ms linear 200ms;
    -o-transition: all 300ms linear 200ms;
}
.element .TzInner:hover .TzPortfolioMedia span.icon_gallery,
.element .TzInner:hover .TzPortfolioMedia span.icon_video{
	opacity:1;
    filter:alpha(opacity=100);
}
#TzContent{
    margin-left: 4px;
    width:auto;
}
div#TzContent .tz_item .TzInner .TzPortfolioMedia,
div#TzContent .landscape_field .TzInner .TzPortfolioMedia
{
    height:212px !important;
    overflow: hidden;
}
div#TzContent .tz_feature_item .TzInner .TzPortfolioMedia,
div#TzContent .portrait_field .TzInner .TzPortfolioMedia{

    height:427px !important;
    overflow: hidden;
}


div#TzContent .tz_item .tz_portfolio_image,
div#TzContent .tz_item .tz_portfolio_image_gallery,
div#TzContent .tz_item .tz_portfolio_video{
    margin:0;
    height:100%;
}
#TzContent .tz_item .TzPortfolioDescription{
    position: absolute;
    left:0;
    bottom: 0px;
    width: 100%;
    text-align:center;
    opacity: 1;
    filter:alpha(opacity=100);
    z-index: 10;
    padding: 0px;
	margin-bottom: 5px;
}
.bg-item{
    background: #000;
    top:0;
    bottom:0;
    left:0;
    right:0;
    opacity:0;
    filter:alpha(opacity=0);
    position: absolute;
    z-index: 0;
    -moz-transition: all 200ms linear 0ms;
    -webkit-transition: all 200ms linear 0ms;
    -o-transition: all 200ms linear 0ms;
}
.element .TzInner:hover .TzPortfolioDescription,
.element .TzInner:hover .icon_image{
    opacity: 1 !important;
    filter:alpha(opacity=100);

}
.element .TzInner:hover .bg-item{
    opacity: 0.5;
    filter:alpha(opacity=50);
}
.element .TzPortfolioMedia img{
    min-height: 100%;
    min-width: 100%;
    width: auto;
    height: auto;
    max-width:none;
}
.TzArticleMedia img{
    width:100%;
}

/* ligne 945 à 975 */
.TzPortfolioDescription{
    position: absolute;
    bottom: 20px;
    left: 20px;
}
#TzContent .TzPortfolioDescription h3.TzPortfolioTitle a,
.TzElement .TzInfo h3.TzTitle span{
    font-size: 18px;
    color:#ffffff;
    cursor: inherit;
    text-transform: uppercase;
    text-shadow: 0px 2px 3px #000;
    font-weight: 700;
    text-decoration: none;
}
#TzContent .tz_feature_item .TzPortfolioDescription h3.TzPortfolioTitle a,
#TzContent .landscape_field .TzPortfolioDescription h3.TzPortfolioTitle a{
    font-size: 18px;
}
#TzContent .TzPortfolioDescription span.btn{
    background:none;
    box-shadow: none;
    border:none;
    text-shadow: none;
    color:#fff;
    padding:0;
}
#TzContent .TzPortfolioDescription  h3.TzPortfolioTitle{
    margin:0;
    line-height: 25px;
    padding: 10px 15px 0;
}

/* tz_append */
#tz_append .TzInner{
    height:auto;
    background: #929292;
}
#portfolio #tz_append a.tzNomore{
    background-image: none;
    display:  none !important;
}
#tz_append-a{
    display: none;
}
#portfolio #tz_append{
    height:212px;

}
#portfolio #tz_append a{
    padding:0;
    display: block;
    width: 100%;
    height: 212px;
    background: url(/fashion/templates/vg_fashion/images/add-item.png) center no-repeat;
    box-shadow: none;
    z-index: 10;
    position: relative;
    font-size: 0;
}

.AuthorAvatar {
	margin-right: 20px;
	float : left;
}

/* tagName */
span.tagName{
    color:#fff;
    font-size: 10px;
    padding-left: 15px;
    text-shadow: 0 2px 3px #000;
    text-transform: uppercase;
}
.TzPortfolioDescription span.tagName{
    padding: 0;
    display:block;
}

/* Media Ico */
/* Lignes 915 à 932 */
.tz_portfolio_image span.icon_image,
.tz_portfolio_image_gallery span.icon_gallery,
.tz_portfolio_video span.icon_video{
    position: absolute;
    top:0;
    right:0;
    opacity: 1;
    filter:alpha(opacity=100);
    z-index: 10;
    height: 51px;
    width: 51px;
}
.tz_portfolio_image:hover span.icon_image,
.tz_portfolio_image_gallery:hover span.icon_gallery,
.tz_portfolio_video:hover span.icon_video{
    opacity: 1;
    filter:alpha(opacity=100);
}
.tz_portfolio_image span.icon_image{
    background: url(/fashion/templates/vg_fashion/images/icon-image.png) center no-repeat ;

}
.tz_portfolio_image_gallery span.icon_gallery{
    background: url(/fashion/templates/vg_fashion/images/icon-gallery.png) center no-repeat ;

}
.tz_portfolio_video span.icon_video{
    background: url(/fashion/templates/vg_fashion/images/icon-video.png) center no-repeat ;

}


.TzTimeLineMedia, .TzPortfolioMedia, .TzArticle-info
{
    margin-bottom: 0px;
}

#TzContent .tz_item a
{
    display: block;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center center;
}

#TzContent .tz_item .rating a
{
    display: inline-block;
}

#disqus_thread {
    background: none;
    margin: 0 0 20px 0;
    padding: 0px;
    position: relative;
    border: none;
}

/* Increase Margin bottom for Supersized  controls */
.column-1
{
	margin-bottom: 50px;
}
#controls-wrapper
{
	z-index: 6;
}
#controls
{
	z-index: auto;
}

/* DGUI Horizontal Related Articles */
/* dgui_gallery_item = paramètre "classe de page" du menu "Galeries"*/
.dgui_gallery_item .TzRelated ul
{
	list-style: none;
	margin-left: 0px;
	padding-left: 0px;
}

.dgui_gallery_item .TzRelated li
{
    display: inline-block;
    list-style: none;
}
.dgui_gallery_item .TzRelated li.TzItem
{
	padding: 4px 15px 4px 0;
}

.dgui_gallery_item .TzRelated li.TzItem.last
{
	padding: 4px 0 4px 0;
}

.dgui_gallery_item .TzRelated li.TzItem a
{
	text-decoration: none;
}

.dgui_gallery_item .TzImage
{
	display: inline-block;
	position: relative;
	overflow: hidden;
}

.dgui_gallery_item .TzRelated .TzItem img
{
	-moz-transition: all 400ms linear 200ms;
	-webkit-transition: all 400ms linear 200ms;
	-o-transition: all 400ms linear 200ms;
}
.dgui_gallery_item .TzRelated .TzItem:hover img
{
    -ms-transform: scale(1.2,1.2); /* IE 9 */
    -webkit-transform: scale(1.2,1.2); /* Chrome, Safari, Opera */
    transform: scale(1.2,1.2);
}

.TzRelatedImageBg
{
    background: #000;
	padding: 10px 0;
	text-align: center;
	font-size: 14px;
    bottom:0px;
    left:0px;
    right:0px;
	top: 0px;
    opacity:0;
    filter:alpha(opacity=0);
    position: absolute;
    -moz-transition: all 200ms linear 0ms;
    -webkit-transition: all 200ms linear 0ms;
    -o-transition: all 200ms linear 0ms;	
}
.dgui_gallery_item .TzImage:hover .TzRelatedImageBg
{
    opacity: 0.4;
    filter:alpha(opacity=40);
}

.TzRelatedImageDesc
{
	position: absolute;
	width: 100%;
	text-align: center;
	padding-bottom: 5px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	color: #fff;
	font-weight: 400;
	text-shadow: 0px 2px 3px #000;
}

.TzRelatedImageDesc a, .TzRelatedImageDesc a:hover
{
	color: #fff;
}

/* Templaza Article */

.line-hr
{
	border-top: 1px solid #757575;
	margin: 10px 0;
}

q, blockquote {
quotes: '\201C' '\201D' '\2018' '\2019';
font-family: "Open Sans";
font-style: italic;
padding: 0 20px;
font-size: 18px;
line-height: 22px;
display: block;
-webkit-margin-before: 1em;
-webkit-margin-after: 1em;
-webkit-margin-start: 40px;
-webkit-margin-end: 40px;
border-left: 5px solid #555;
}

blockquote:before {
content: '\201C';
}

blockquote:after {
content: '\201D';
}

.TzItemPageInner, .foxcontainer
{
	background: url(/fashion/templates/vg_fashion/images/img/blackBG.png) repeat;
}

.item-portfolio-content {
padding: 0 40px 40px;
}

.TzPortfolioItemPage .TzItemPageInner h2.TzArticleTitle, .TzBlog .TzBlogInner .TzCategoryTitle, .foxcontainer h2
{
	font-size: 36px;
	font-family: 'Open Sans Condensed';
	text-transform: uppercase;
	color: #eee;
	font-weight: 600;
	margin: 0;
	padding-top: 10px;
	padding-bottom: 10px;
}

.TzBlog .TzBlogInner .TzCategoryTitle, .TzBlog .TzBlogInner .TzCategoryDesc
{
	background: url(/fashion/templates/vg_fashion/images/img/blackBG.png) repeat;
	padding: 0 40px;
}

.TzBlog .TzBlogInner .TzCategoryTitle
{
	padding-top: 20px;
}

.TzBlog .TzBlogInner .TzCategoryDesc
{
	margin-bottom: 30px;
	padding-bottom: 10px;
}

.TzPortfolioItemPage .TzItemPageInner h3, .foxcontainer h2
{
	font-size: 24px;
	text-transform: uppercase;
	color: #e5e5e5;
	font-weight: 600;
	margin: 0;
	padding-top: 20px;
	padding-bottom: 10px;
}


.TzItemPageInner p, .foxcontainer
{
	margin: 0 0 10px;
	padding: 0;
	color: #a5a5a5;
}

.TzPortfolioItemPage .TzArticleInfo {
border: none;
padding: 0;
}

.TzArticleInfo span
{
background: none;
-moz-border-radius: 0px;
-webkit-border-radius: 0px;
border-radius: 0px;
padding: 0;
color: #757575;
font-size: 11px;
line-height: 20px;
text-transform: uppercase;
font-weight: 400;
text-shadow: none;
}

span.date, span.p_tag, span.TZCommentCount, span.TzPortfolioCommentCount, span.TzArticleTag
{
	line-height: 20px;
	font-size: 12px;
	color: #a5a5a5;
	text-transform: uppercase;
	font-style: italic;
}

span.TzArticleTag, .TZCommentCount, .TzPortfolioCommentCount
{
	margin: 0 0 0 15px;
	padding-bottom: 2px;
	padding-top: 2px;
}

.TzArticleInfoBottom span {
color: #a5a5a5;
font-size: 14px;
}

.TzArticleInfoBottom span.TzHits {
padding-right: 15px;
}

.TzItemPage .TzArticleInfoBottom, .TzPortfolioItemPage .TzArticleInfoBottom {
color: #161616;
padding: 0 0 20px 0;
}

.TzGoogleMap, .TzItemPage .TzArticleTag, .TzPortfolioItemPage .TzArticleTag {
margin-bottom: 15px;
}

.TzGoogleMap {
margin-bottom: 30px;
}


.TzItemPage .TzArticleExtraField h3, 
.TzPortfolioItemPage .TzArticleExtraField h3, 
.TzItemPage .TzAttachments h3, 
.TzPortfolioItemPage .TzAttachments h3, 
.TzItemPage h3.TzGoogleMap, 
.TzPortfolioItemPage h3.TzGoogleMap, 
.TzItemPage .TzArticleTag h3, 
.TzPortfolioItemPage .TzArticleTag h3, 
.TzPortfolioItemPage .TzRelated h3, 
.TzPortfolioItemPage h3.TzCommentTitle, 
.TzPortfolioItemPage h3.TzArticleAuthorTitle,
.TzPortfolioItemPage h3.TzGoogleMapTitle,
.foxcontainer h3 
{
	font-weight: 400;
	font-size: 16px;
	font-family: verdana;
	color: #757575;
	text-transform: uppercase;
	margin: 30px 0 15px 0;
	border-color: #757575;
	border-style: solid;
	border-width: 0 0 8px 0;
	-moz-border-radius: 0px;
	-webkit-border-radius: 0px;
	border-radius: 0px;
	padding: 0 0 5px 0;
}

.AuthorDetails > h2.AuthorName
{
	font-family : 'Open Sans', Arial, sans-serif;;
	font-size: 22px;
	font-weight: 400;
	color: #ff5b0a;
}

/* Blog Category */
.TzItemsRow .column-1 {
width: 940px;
float: none;
margin: 0 0 20px 0;
}

.TzItemsRow .TzItem {
	background: url(/fashion/templates/vg_fashion/images/img/blackBG.png) repeat;
	padding: 20px 40px;
	margin-left: 0px;
}


.TzBlog .TzBlogInner h3.TzBlogTitle
{
	margin: 0 0 3px 0;
	text-transform: uppercase;
	font-size: 21px;
	color: #444;
	line-height: 20px;
}

.TzBlog h3.TzBlogTitle a {
color: #eee;
font-size: 22px;
text-decoration: none !important;
}

.TzArticleBlogInfo {
border: none;
background: url(/fashion/templates/vg_fashion/images/line.png) left bottom no-repeat;
padding-bottom: 20px;
margin: 0 0 17px 0;
}

.TzBlog .TzBlogInner .TzDescription
{
	margin: 0 0 10px 0;
}

.TzBlog h3.TzBlogTitle a.TzReadmore, #mapinfocontainer a.TzReadmore
{
height: auto;
display: inline-block;
font-size: 20px;
float: right;
border: 1px solid #444444;
color: #999;
margin: 0;
padding: 5px 15px 5px 5px;
text-transform: none;
font-weight: 600;
-moz-transition: all 200ms linear 0s;
-webkit-transition: all 200ms linear 0s;
-o-transition: all 200ms linear 0s;
}

#mapinfocontainer a.TzReadmore
{
	width: auto;
	font-size: 14px;
	float: none;
	padding-left: 25px;
	border-left: 0px;
	background-position: 0px center;
	margin: 0px;
}



.TzBlog h3.TzBlogTitle a.TzReadmore:hover, #mapinfocontainer a.TzReadmore:hover
{
	color: #ff5b0a;
	border: 1px solid #ff5b0a;
}

.TzBlogInner .TzCategoryDesc hr.line-hr {
border: none;
margin: 0px;
}

/* Pagination */
.pagination-list
{
	background: url(/fashion/templates/vg_fashion/images/img/blackBG.png) repeat;
	padding: 10px;
	margin-bottom: 30px;
}

div.TzPagination
{
	text-align: center;
	width: 100%;
}

.TzPagination a
{
	text-decoration: none;
}

.TzPagination ul.pagination-list li:first-child.active > a
{
	background-position: -12px center;
}
.TzPagination ul.pagination-list li:first-child.active > a:hover
{
	background-position: 12px center;
}

.TzPagination ul.pagination-list li:first-child.disabled > a
{
	background-position: 12px center;
}

.TzPagination ul.pagination-list li:first-child > a,
.TzPagination ul.pagination-list li:last-child > a
{
	background-image: url(/fashion/templates/vg_fashion/images/btn_result.png);
	background-repeat: no-repeat;
}

.TzPagination ul.pagination-list li:last-child.active > a
{
	background-position: -40px center;
}
.TzPagination ul.pagination-list li:last-child.active > a:hover
{
	background-position: -65px center;
}

.TzPagination ul.pagination-list li:last-child.disabled > a
{
	background-position: -65px center;
}

.TzPagination ul.pagination-list li:first-child a, 
.TzPagination ul.pagination-list li:last-child a
{
	position: relative;
	text-indent: 999px;
}

.TzPagination ul li:last-child
{
	margin-right: 0;
}

.TzPagination ul li:last-child a, .TzPagination ul li:first-child a
{
	text-indent: 999px;
	display: inline-block;
	width: 39px;
	overflow: hidden;
}

.TzPagination ul.pagination-list li a
{
	margin: 0 !important;
	color: #aeaeae;
	font-size: 15px;
	font-weight: 600;
	padding: 8px 14px;
	background: none;
	border: 1px solid #a9a9a9;
	float: left;
}

div.TzPagination ul li
{
	margin: 0 4px;
	display: inline-block;
	padding: 0;
	background: none;
}

.TzBlog .TzBlogInner .TzPagination a
{
	color: #a9a9a9;
}

.TzBlog .TzBlogInner .TzPagination a:hover
{
	color: #444;
}

.TzPagination ul.pagination-list li a
{
	border-color: #a9a9a9;
    -moz-transition: background-color 200ms linear 0ms;
    -webkit-transition: background-color 200ms linear 0ms;
    -o-transition: background-color 200ms linear 0ms;
}

.TzPagination ul.pagination-list li.active a:hover
{
	background-color: #a9a9a9;
}

.TzPagination ul.pagination-list li.disabled a
{
	border-color: #323232;
}

.TzPagination ul.pagination-list li.disabled a:hover
{
	background-color: none;
}

.TzBlog .TzBlogInner .TzPagination .disabled a
{
	color: #323232;
}


/* Listes */
ul
{
	padding-left: 30px;
	margin: 15px 0;
}

ul#supersized
{
	padding: 0;
	margin: 0;	
}

ul.list
{
	display: block;
	list-style-type: disc;
	-webkit-margin-before: 1em;
	-webkit-margin-after: 1em;
	-webkit-margin-start: 0px;
	-webkit-margin-end: 0px;
	-webkit-padding-start: 40px;
	padding: 0;
	margin: 0;
}

ul.list li
{
	background: url(/fashion/templates/vg_fashion/images/marker.gif) 0 8px no-repeat;
	padding: 4px 0 8px 23px;
	list-style: none;
}

ul.check
{
	list-style: none;
	margin: 15px 0;
	padding: 0;
}
ul.check > li:first-child
{
	margin-top: 0;
}
ul.check > li
{
	padding: 4px 0 0 30px;
	line-height: 24px;
	margin-top: 5px;
	background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAB50RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNS4xqx9I6wAAABZ0RVh0Q3JlYXRpb24gVGltZQAwMS8yMS8xMRTK2QYAAAD/SURBVEiJvZbhrYIwFEY/jQN0BEfgbfBGcATdwBEcwQ10g+cIbqAb6AawwfFHIda+thRt/ZIbSrhwLuQEmAGqnXl1whcgpjakGRY1IEbSud92NSADYChJ0qygXUtJJ0lI+nEPLAoBGtnJ/wEkScCn1QAdNutQz6eANc/8xfpKAW6AKQ3Z8ZrfVL+7Y4BVXynA0QPsxoaKTXYCll6zCQAuOXfuGtJ6F+icKQ1w9Y63/XnZEGGfayj3AABgmwPwIb4xqUR1zYEIOIwAWhK65kLUTxpLUtcpEIM1x89+KiAFEVZh17gsXadCBrVhgq6hGnvVXyVtnPVbKfnRiuYrv0QPpLh+2CdG8E0AAAAASUVORK5CYII=") 0 0 no-repeat;
}

/* Ajax Login & Register */

#footer-toolbar
{
	float: right;
	height: 100%;
}

#mod_improved_ajax_login-106
{
	height: 100%;
	float: right;
}
.selectBtn, .logout
{
	height: 100%;
	font-size: 20px;
	padding: 10px;
	border-left: 1px solid #333;
}

#mod-search-searchword
{
  margin-top:2px;
}


/* Wookmark Gallery */
.myapp
{
	margin: 10px 0 10px 0;
	position: relative;
}

.tiles
{
	list-style-type: none;
	position: relative;
	margin: 0;
	padding-left: 0px;
}

.tiles li
{
	list-style: none outside none;
	background-image: none;
	display: none;

	-webkit-transition: all 0.3s ease-out;
	-moz-transition: all 0.3s ease-out;
	-o-transition: all 0.3s ease-out;
	transition: all 0.3s ease-out;
}

.tiles li.inactive
{
	visibility: hidden;
	opacity: 0;
	filter:alpha(opacity=0);
}

.tiles li img
{
	border: 1px solid #dedede;
}

.wmcontainer
{
	position: relative;
}

.wmdesc
{
	position: absolute;
	bottom: 0px;
	right: 0px;
	left: 0px;
	font-size: 14px;
	text-align: center;
	vertical-align: middle;
	color: #FFF;
	padding-bottom: 5px;
	text-shadow: 0px 2px 3px #000;
	z-index:2;
}

.wmdesc a, .wmdesc a:hover
{
	color: #fff;
}

.wmbg
{
	position: absolute;
	bottom: 0px;
	right: 0px;
	left: 0px;
	top: 0px;
	background-color: #000;
    opacity: 0;
	z-index:1;
    filter:alpha(opacity=0);
    -moz-transition: all 200ms linear 0ms;
    -webkit-transition: all 200ms linear 0ms;
    -o-transition: all 200ms linear 0ms;	
}

.wmlinks
{
	font-size: 22px;
	text-align: center;
	margin-bottom: 20px;
}

.tiles li:hover .wmbg
{
    opacity: 0.5;
    filter:alpha(opacity=50);
}


.wookmark-placeholder
{
	border-radius: 2px;
	-moz-border-radius: 2px;
	-webkit-border-radius: 2px;
	background-color: #eee;
	border: 1px solid #dedede;
	z-index: -1;
}

[class^="wookmark-single-"]
{
	margin-top: 6px;
	margin-bottom: 10px;
	border: 1px solid white;
}
.wookmark-single-right
{
	float: right;
	margin-left: 15px;
}
.wookmark-single-left
{
	float: left;
	margin-right: 15px;
}


/* Fox Contact */

.fox-contact-header .custom
{
	margin-top: 0px;
	padding: 10px 25px 0 25px;
}

div#foxcontainer_c149
{
	width: auto;
	padding: 40px 40px 20px 40px;
	overflow: hidden;
	margin: auto;
}

div#foxcontainer_c149 .fox_form select,
div#foxcontainer_c149 .fox_form textarea,
div#foxcontainer_c149 .fox_form input[type="text"]
{
	background-color: transparent;
	-webkit-border-radius: 0px;
	-moz-border-radius: 0px;
	border-radius: 0px;
	color: #a5a5a5;
	font-size: 16px;
	font-weight: 300;
}

div#foxcontainer_c149 .fox_form textarea:hover,
div#foxcontainer_c149 .fox_form textarea:focus,
div#foxcontainer_c149 .fox_form input[type="text"]:hover, 
div#foxcontainer_c149 .fox_form input[type="text"]:focus
{
	background-color: transparent;
	color: #a5a5a5;
	border-width: 2px;
}

div#foxcontainer_c149 .fox_form textarea
{
	resize: vertical;
}

div#foxcontainer_c149 .btn
{
	-webkit-border-radius: 0px;
	-moz-border-radius: 0px;
	border-radius: 0px;
}

div#foxcontainer_c149 .controls > .btn
{
	float: left;
}

div#foxcontainer_c149 .submit-button span,
div#foxcontainer_c149 .reset-button span
{
	padding: 1px 0px 4px 0px;
}

div#foxcontainer_c149 .fcaptchafieldcontainer
{
	background-color: transparent;
	padding: 5px 0 5px 0;
}

div#foxcontainer_c149 .fox_captcha_img
{
	padding: 0px;
	border: none;
	-webkit-border-radius: 0px;
	-moz-border-radius: 0px;
	border-radius: 0px;
	box-shadow: 0 0 7px rgba(192, 192, 192, 0.698);
}

div#foxcontainer_c149 .alert
{
	-webkit-border-radius: 0px;
	-moz-border-radius: 0px;
	border-radius: 0px;
	margin-bottom: 40px;
}

div#foxcontainer_c149 .foxform-extended .control-label
{
	text-align: left;
}
#cid_149-buttons
{
	margin-top: 40px;
	padding-top: 20px;
	border-top: 1px solid #e5e5e5;
}

/** Pour la bio **/
.TreeTagVert {
	color: #bfa12b;
	border: 2px solid #bfa12b;
	padding-left: 2px;
	padding-right: 2px;
}
.TreeVert {
	width: 25px;
	height: 20px;
	background: #bfa12b;
}

.TreeTag {
	border: 2px solid #5c8aa7;
	padding-left: 2px;
	padding-right: 2px;
}

.TreeTagPointer {
	color: blue;
	cursor: pointer;
}

.Tree {
	width: 25px;
	height: 20px;
	background: #5c8aa7;
}

.TreeCell {
	width: 25px;
}


.TreeLabel {
	position: absolute;
	border: 2px solid #5c8aa7;
	padding: 4px 2px;
	width: 120px;
	/*height: 16px;*/
	line-height: 16px;
	text-align: center;
	font-size:12px;
	margin: 0px;
}
.TreeBranch {
	position: absolute;
	background-image: url(/fashion/templates/vg_fashion/images/TreeTag.jpg);
	background-repeat: repeat;
	_font-size: 0px;
	_line-height: 0px;
}
.mollusques .TreeBranch
{
	background-image: none;
	background-color: #e5e5e5;
}

.MollusqueLabel
{
	position: absolute;
}

/*  NoNumber Tooltip */
span.tooltips-link.bluetip {
    background-color: #EEEEEE;
    padding: 3px 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
}
div.popover.bluetip {
    background-color: #FFFFFF;
    color: #4b91b5;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
	padding: 0px;
}
div.popover.bluetip .arrow {
    border-top-color: #339933;
}
div.popover.bluetip .popover-title {
    background-color: #4b91b5;
    color: #FFFFFF;
    font-size: 1.5em;
    font-weight: bold;
    -webkit-border-radius: 10px 10px 0 0;
    -moz-border-radius: 10px 10px 0 0;
    border-radius: 10px 10px 0 0;
}

/* Google Map */
#mapinfocontainer > h3.mapinfotitle
{
	margin: 0px;
	padding: 0px;
	color: #555;
}
#mapinfocontainer > p
{
	color: #555;
}

#mapinfocontainer table.mapinfotitletable
{
    padding: 0px;
    margin: 0px;
    border: none;
    border-collapse: collapse;
    border-spacing: 0px;
}

#mapinfocontainer p
{
	margin: 10px 0px 0px 0px;
}

/* JQuery Select2 */
.select2-container-multi .select2-choices .select2-search-choice
{
	padding: 2px 5px 2px 18px;
}

/* D3JS */
.node
{
 	cursor: pointer;
}
.inactivenode
{
	cursor: default;
}
.node:hover
{
	background-color: yellow;
}

.node text {
  font-family: 'Open Sans';
  color: #ccc;
}

.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}

#area-filter-container
{
	width: 50%;
	float: left;
}
#date-filter-container
{
	width: 50%;
	float: right;
}

/* Acy mailing */
#sbox-window
{
	padding: 0px;
}
div.acymailing_fulldiv
{
	padding: 10px;
}

.acymailing_module_form .acymailing_introtext
{
	margin-bottom: 0px;
}

.acymailing_module div
{
	height: 100%;	
}
#footer-toolbar div.acymailing_module
{
	float: right;
}
#newslettermodal div.acymailing_module
{
	float: none;
}

.acymailing_module_form
{
	overflow: hidden;
}

.acymailing_module_form input.inputbox
{
	padding: 3px 10px;
	margin-top: 10px;
}

.acymailing_mootoolsbutton a.acymailing_togglemodule
{
	font-size: 20px;
	padding: 10px;
	border-left: 1px solid #333;
	display: inline-block;
}

.modal-header
{
	text-align: center;
	text-transform: uppercase;
}

/* iFrame responsives pour les vidéos */
.iframe-responsive-wrapper        {
    position: relative;
}

.iframe-responsive-wrapper .iframe-ratio {
    display: block;
    width: 100%;
    height: auto;
}

.iframe-responsive-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

@media only screen and (min-width: 768px) and (max-width: 959px) {

	.TzBlog h3.TzBlogTitle a
	{
		font-size: 18px;
	}
	.TzBlog h3.TzBlogTitle a.TzReadmore
	{
		font-size: 15px;
	}
	
	.TzNavigationItem
	{
		font-size: 16px;
	}
	
	.TzItemsRow .column-1
	{
		width: 730px;
	}
	
	#area-filter-container
	{
		width: 50%;
		float: left;
	}
	#date-filter-container
	{
		width: 50%;
		float: right;
	}
	.title-block h3
	{
		display: block;
		font-size: 30px;
		margin: 20px 0 0 20px;
	}
	
	div.infobox_v3, div.boite-a-droite, div.tright, div.floatright, table.floatright
	{
		clear: none;
		float: none;
	}
	
	.dgui_gallery_item .TzRelated li.TzItem
	{
		padding: 4px 14px 4px 0;
	}

	.dgui_gallery_item .TzRelated li.TzItem.last
	{
		display: none;
	}
	
}

@media only screen and (min-width: 480px) and (max-width: 767px) {

	.TzBlog h3.TzBlogTitle a
	{
		font-size: 18px;
	}
	.TzBlog h3.TzBlogTitle a.TzReadmore
	{
		display: none;
	}

	.TzItemsRow .column-1
	{
		width: 460px;
	}

	#area-filter-container
	{
		width: 100%;
		float: left;
	}
	#date-filter-container
	{
		width: 100%;
		float: left;
	}
	
	.navigationcpation
	{
		display: none;
	}

	.navigationicon
	{
		font-size: 35px;
	}
	
	.title-block h3
	{
		display: none;
	}

	div.infobox_v3, div.boite-a-droite, div.tright, div.floatright, table.floatright
	{
		clear: none;
		float: none;
	}
	.guestbook-col1
	{
		float: none;
		width: 100%;
	}
	.guestbook-col2
	{
		float: left;
		width: 100%;
	}
	input#search-area103
	{
		width: 385px;
	}
	input#search-area103:focus
	{
		width: 385px;
	}
}

@media only screen and (min-width: 200px) and (max-width: 479px) {

	.TzBlog h3.TzBlogTitle a
	{
		font-size: 16px;
	}
	.TzBlog h3.TzBlogTitle a.TzReadmore
	{
		display: none;
	}

	.TzItemsRow .column-1
	{
		width: 300px;
	}

	#area-filter-container
	{
		width: 100%;
		float: left;
	}
	#date-filter-container
	{
		width: 100%;
		float: left;
	}

	.navigationcpation
	{
		display: none;
	}
	
	.navigationicon
	{
		font-size: 35px;
	}
	
	.title-block h3
	{
		display: none;
	}

	div.infobox_v3, div.boite-a-droite, div.tright, div.floatright, table.floatright
	{
		clear: none;
		float: none;
	}
	.guestbook-col1
	{
		float: none;
		width: 100%;
	}
	.guestbook-col2
	{
		float: left;
		width: 100%;
	}
	input#search-area103:focus
	{
		width: 230px;
	}
}";}