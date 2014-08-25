var $f = jQuery.noConflict();


/* :::::::::::::: SMOOTHMENU ::::::::::::: */
ddsmoothmenu.init({
	mainmenuid: "smoothmenu1", //menu DIV id
	orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
	classname: 'ddsmoothmenu', //class added to menu's outer DIV
	//customtheme: ["#1c5a80", "#18374a"],
	contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
})

$f(document).ready(function(){ 
	
	/* :::::::::::::: HEADER HIDER ::::::::::::: */
	$f('.hider').click(function(event){
		event.preventDefault;
		var contentHeight = 80;
		$f(this).css('display', 'none');
		$f('.opener').css('display', 'block');
		$f('.header-hidden-content').css('position', 'fixed');
		$f("ul.nav").removeClass('menu-open');
		$f('.header-hidden-content').animate({ top: '-80px' }, 300,'linear' );		
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
	if(currentWindowWidth <= 767){
		$f("#smoothmenu1").removeClass('ddsmoothmenu');	
	}else{$f("#smoothmenu1").addClass('ddsmoothmenu')}
	
	/* :::::::::::::: CONTENT HIDER ::::::::::::: */
	$f('.c-hider').click(function(event){
		event.preventDefault;
		var contentHeight = $f(window).height();
		$f('.content').css('position', 'fixed');
		$f(".social-icons").removeClass('open-social');
		$f(this).css('display', 'none');
		$f('.c-opener').css('display', 'block');
		$f('.content').animate({ top: contentHeight+'px' }, 400, function(){
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
	
	/* :::::::::::::: SOCIAL ICONS QTIP ::::::::::::: */
	/*$f('.social-icons a[href][title]').qtip({
		content: {
			text: false // Use each elements title attribute
		},
		position: {
			corner: {
				target: 'topMiddle',
				tooltip: 'bottomMiddle'
		  	}
		},
		show: { effect: { type: 'slide', length:150}},
		hide: { effect: { type: 'slide', length:350}},
		style: { 
			width: 'auto',
			background: '#090909',
			color: '#eee',
			textAlign: 'center',
			border: {
				width: 2,
				color: '#111'
			},
			name: 'dark',
			'font-size': 11,
			'font-family': 'Arial'
		}
	});*/
	
	/* :::::::::::::: MOBILE SOCIAL ICONS ::::::::::::: */
	$f('.social-mobile').click(function(e){
    	e.preventDefault();
    	$f(".social-icons").toggleClass('open-social'); //toggle()
    	
    });
	
	/* :::::::::::::: FLEXSLIDER ::::::::::::: */
	/*$f(window).load(function() {
		$f('.flexslider').flexslider({
			animation: 'fade',
			controlNav: false,
			slideshowSpeed: 4000,
			animationDuration: 300
		});
		
	});*/
	
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
	
	/* :::::::::::::: FANCYBOX ::::::::::::: */
	/*$f('.fancybox').fancybox({});*/
	
	/* :::::::::::::: PORTFOLIO FILTER (ISOTOPE) ::::::::::::: */
	// Needed variables
	var $container	 	= $f("#portfolio-list");
	var $filter 		= $f("#portfolio-filter");
		
	// Run Isotope  
	$container.isotope({
		filter				: '*',
		layoutMode   		: 'masonry',
		animationOptions	: {
		duration			: 750,
		easing				: 'linear'
	   }
	});	
	
	// Isotope Filter 
	$filter.find('a').click(function(){
	  var selector = $f(this).attr('data-filter');
		$container.isotope({ 
		filter				: selector,
		animationOptions	: {
		duration			: 750,
		easing				: 'linear',
		queue				: false,
	   }
	  });
	  return false;
	});	
	
	// Copy categories to item classes
	$filter.find('a').click(function() {
		var currentOption = $f(this).attr('data-filter');
		$filter.find('a').removeClass('current');
		$f(this).addClass('current');
	});	
	
	/*::::: FILTER BACKGROUND HOVER EFFECT :::::*/
	 $f("#portfolio-filter li a").hover(function() {
                $f(this).stop().animate({ backgroundColor: "#e5e5e5", color: "#070707" }, 600);
        },function() {
                 $f(this).stop().animate({ backgroundColor: "#070707", color: "#999999" }, 400);
	});
});



$f(function($){
	
	/*:::::::::: GRID NAVIGATION EFFECTS ::::::::::::*/
	/*$f('#tj_container').gridnav({
		rows	: 3,
		type	: {
			mode		: 'seqfade', 	// use def | fade | seqfade | updown | sequpdown | showhide | disperse | rows
			speed		: 500,			// for fade, seqfade, updown, sequpdown, showhide, disperse, rows
			easing		: '',			// for fade, seqfade, updown, sequpdown, showhide, disperse, rows	
			factor		: 100,			// for seqfade, sequpdown, rows
			reverse		: ''			// for sequpdown
		}
	});*/
	
});