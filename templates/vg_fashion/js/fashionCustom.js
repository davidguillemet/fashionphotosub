var $f = jQuery.noConflict();


$f(document).ready(function(){ 
	
	function HideMenuBar(hiderElement)
	{
		var contentHeight = 80;
		$f(hiderElement).css('display', 'none');
		$f('.opener').css('display', 'block');
		$f('.header-hidden-content').css('position', 'fixed');
		$f("ul.nav").removeClass('menu-open');
		$f('.header-hidden-content').animate({ top: '-80px' }, 300,'linear' );		
	}

	/* :::::::::::::: HEADER HIDER ::::::::::::: */
	$f('.hider').click(function(event){
		var hiderElement = this;
		event.preventDefault;
		/* collapse Bootstrap menu */
		var navbar = $f('#navbar');
		var expanded = navbar.attr('aria-expanded');
		if (expanded == 'true')
		{
			$f('.dropdown-toggle').dropdown();
			$f('#navbar').collapse('hide');
			$f('#navbar').on('hidden.bs.collapse', function () {
				HideMenuBar(hiderElement);
				$f('#navbar').unbind('hidden.bs.collapse');
			})
		}
		else
		{
			HideMenuBar(hiderElement);
		}
	});
	
	/* :::::::::::::: HEADER OPENER ::::::::::::: */
	$f('.opener').click(function(event){
		event.preventDefault;		
		$f(this).css('display', 'none');
		$f('.hider').css('display', 'block');
		$f('.header-hidden-content').animate({ top: '0' }, 300,'linear', function(){
			$f('.header-hidden-content').css('position', 'static');
		});
	});
	
	/* :::::::::::::: MOBILE MENU ::::::::::::: */
	$f('.mobile-menu-button').click(function(e){
    	e.preventDefault();
    	$f("ul.nav").toggleClass('menu-open'); //toggle()
    	
    });
	var currentWindowWidth = $f(window).width();
	
	/* :::::::::::::: CONTENT HIDER ::::::::::::: */
	$f('.c-hider').click(function(event){
		event.preventDefault;
		var contentHeight = $f(window).height();
		$f('.content').css('position', 'fixed');
		$f(".social-icons").removeClass('open-social');
		$f(this).css('display', 'none');
		$f('.c-opener').css('display', 'block');
		$f('.content').animate({ top: contentHeight+'px' }, 400, function(){
			$f('.content').css("top", "100%");
			$f('.content-hider').animate({ top: '-150px' }, 400);	
		});										  
	});
	
	/* :::::::::::::: CONTENT OPENER ::::::::::::: */
	$f('.c-opener').click(function(event){
		event.preventDefault;
		var contentHeight = $f(window).height();
		
		$f(this).css('display', 'none');
		$f('.c-hider').css('display', 'block');
		$f('.content-hider').animate({ top: '0px' }, 400, function(){
			$f('.content').animate({ 'top': "80px" }, 400, function(){
				$f('.content').css('position', 'static');
			});
		});
		
	});
		
	/* :::::::::::::: MOBILE SOCIAL ICONS ::::::::::::: */
	$f('.social-mobile').click(function(e){
    	e.preventDefault();
    	$f(".social-icons").toggleClass('open-social'); //toggle()
    	
    });
		
	/* :::::::::::::: PORTFOLIO HOVER EFFECT ::::::::::::: */
	var currentWindowWidth = $f(window).width();
	if(currentWindowWidth >= 775){
		$f('.viewport').mouseenter(function(e) {
			$f(this).children('a').children('img').animate({ height: '178', left: '-20', top: '-20', width: '260'}, 100);
			$f(this).children('span').fadeIn(200);
			$f(this).children('span').addClass('dark-background');
		}).mouseleave(function(e) {
			$f(this).children('a').children('img').animate({ height: '138', left: '-0', top: '0', width: '220'}, 100);
			$f(this).children('span').fadeOut(200);
			$f(this).children('span').removeClass('dark-background');
		});
	}

});


// column-1 width = 100% (300px) -> 460px -> 730px -> 940px
var responsiveData = [
	{ contentWidth: 300, thumbWidth: 220, chart: false, blueimpThumbnails: false },
	{ contentWidth: 460, thumbWidth: 189, chart: false, blueimpThumbnails: false },
	{ contentWidth: 730, thumbWidth: 216, chart: false, blueimpThumbnails: true },
	{ contentWidth: 940, thumbWidth: 214, chart: true, blueimpThumbnails: true }
];

function getContentWidth()
{
	return jQuery(window).width();
}

function getResponsiveData(width)
{
	var contentWidth = width == null ? getContentWidth() : width;
	var dataIndex = -1;
	if (contentWidth < 480)
	{
		dataIndex = 0;
	}
	else if (contentWidth < 768)
	{
		dataIndex = 1;
	}
	else if (contentWidth < 960)
	{
		dataIndex = 2;
	}
	else
	{
		dataIndex = 3;
	}
	
	if (dataIndex != -1)
	{
		return responsiveData[dataIndex];
	}
	else
	{
		return null;
	}
}

var isCallingRouter = false;
function routeArticle(id, catid, itemid)
{
	if (isCallingRouter ==  true) return;
	
	isCallingRouter = true;

	jQuery.ajax({
      url: rootUrl + "router.php",
      dataType: 'json',
      data: { id: id, catid: catid, itemid: itemid },
      success: onRouterResponse
    });
}

function onRouterResponse(response)
{
    isCallingRouter = false;

    var routedUrl = response.data;
	location.href = routedUrl;
}
