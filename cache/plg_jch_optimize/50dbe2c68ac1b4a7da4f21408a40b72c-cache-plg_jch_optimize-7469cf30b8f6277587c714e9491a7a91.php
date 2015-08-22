<?php die("Access Denied"); ?>#x#a:2:{s:6:"output";s:0:"";s:6:"result";s:4232:"var $f=jQuery.noConflict();$f(document).ready(function(){function HideMenuBar(hiderElement)
{var contentHeight=80;$f(hiderElement).css('display','none');$f('.opener').css('display','block');$f('.header-hidden-content').css('position','fixed');$f("ul.nav").removeClass('menu-open');$f('.header-hidden-content').animate({top:'-80px'},300,'linear');}
$f('.hider').click(function(event){var hiderElement=this;event.preventDefault;var navbar=$f('#navbar');var expanded=navbar.attr('aria-expanded');if(expanded=='true')
{$f('.dropdown-toggle').dropdown();$f('#navbar').collapse('hide');$f('#navbar').on('hidden.bs.collapse',function(){HideMenuBar(hiderElement);$f('#navbar').unbind('hidden.bs.collapse');})}
else
{HideMenuBar(hiderElement);}});$f('.opener').click(function(event){event.preventDefault;$f(this).css('display','none');$f('.hider').css('display','block');$f('.header-hidden-content').animate({top:'0'},300,'linear',function(){$f('.header-hidden-content').css('position','static');});});$f('.mobile-menu-button').click(function(e){e.preventDefault();$f("ul.nav").toggleClass('menu-open');});var currentWindowWidth=$f(window).width();$f('.c-hider').click(function(event){event.preventDefault;var contentHeight=$f(window).height();$f('.content').css('position','fixed');$f(".social-icons").removeClass('open-social');$f(this).css('display','none');$f('.c-opener').css('display','block');$f('.content').animate({top:contentHeight+'px'},400,function(){$f('.content').css("top","100%");$f('.content-hider').animate({top:'-150px'},400);});});$f('.c-opener').click(function(event){event.preventDefault;var contentHeight=$f(window).height();$f(this).css('display','none');$f('.c-hider').css('display','block');$f('.content-hider').animate({top:'0px'},400,function(){$f('.content').animate({'top':"80px"},400,function(){$f('.content').css('position','static');});});});$f('.social-mobile').click(function(e){e.preventDefault();$f(".social-icons").toggleClass('open-social');});var currentWindowWidth=$f(window).width();if(currentWindowWidth>=775){$f('.viewport').mouseenter(function(e){$f(this).children('a').children('img').animate({height:'178',left:'-20',top:'-20',width:'260'},100);$f(this).children('span').fadeIn(200);$f(this).children('span').addClass('dark-background');}).mouseleave(function(e){$f(this).children('a').children('img').animate({height:'138',left:'-0',top:'0',width:'220'},100);$f(this).children('span').fadeOut(200);$f(this).children('span').removeClass('dark-background');});}
var $container=$f("#portfolio-list");var $filter=$f("#portfolio-filter");$container.isotope({filter:'*',layoutMode:'masonry',animationOptions:{duration:750,easing:'linear'}});$filter.find('a').click(function(){var selector=$f(this).attr('data-filter');$container.isotope({filter:selector,animationOptions:{duration:750,easing:'linear',queue:false,}});return false;});$filter.find('a').click(function(){var currentOption=$f(this).attr('data-filter');$filter.find('a').removeClass('current');$f(this).addClass('current');});$f("#portfolio-filter li a").hover(function(){$f(this).stop().animate({backgroundColor:"#e5e5e5",color:"#070707"},600);},function(){$f(this).stop().animate({backgroundColor:"#070707",color:"#999999"},400);});});var responsiveData=[{thumbWidth:210,chart:false},{thumbWidth:184,chart:false},{thumbWidth:210,chart:false},{thumbWidth:210,chart:true}];function getContentWidth()
{var contentWidthCssValue=$f(".column-1").css('width');var contentWidth=parseInt(contentWidthCssValue.substr(0,contentWidthCssValue.length-2));return contentWidth;}
function getResponsiveData(width)
{var contentWidth=width==null?getContentWidth():width;var dataIndex=-1;if(contentWidth<460)
{dataIndex=0;}
else if(contentWidth<730)
{dataIndex=1;}
else if(contentWidth<940)
{dataIndex=2;}
else
{dataIndex=3;}
if(dataIndex!=-1)
{return responsiveData[dataIndex];}
else
{return null;}}
var isCallingRouter=false;function routeArticle(id,catid,itemid)
{if(isCallingRouter==true)return;isCallingRouter=true;jQuery.ajax({url:rootUrl+"router.php",dataType:'json',data:{id:id,catid:catid,itemid:itemid},success:onRouterResponse});}
function onRouterResponse(response)
{isCallingRouter=false;var routedUrl=response.data;location.href=routedUrl;};";}