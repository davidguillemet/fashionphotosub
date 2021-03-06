jQuery.extend(blueimp.Gallery.prototype.options, {
	slideClass: 'slide',
	slideshowInterval: 3000,
	titleElement: 'span',
	toggleControlsOnReturn: false,
	titleProperty: 'caption'
});

var ctrlTimer = null;
var ctrlDisplayTime = 4000;
var controlsClass = blueimp.Gallery.prototype.options.controlsClass;
var showThumbnailsTitle = "Afficher les vignettes";
var hideThumbnailsTitle = "Masquer les vignettes";
var thumbnailsAnimationDuration = 400;
var thumbnailsAreVisible = false;
var thumbnailTopMargin = 10;
var resizeProxy = null;

var slideTitles = [];

// Override blueimp setTitle function in order to allow HTML as image title
blueimp.Gallery.prototype.setTitle = function (index) {
    var text = slideTitles[index];
	if (!text)
	{
		text = this.slides[index].firstChild.title;
		// Remove title attribute to avoid tooltip on the image
		this.slides[index].firstChild.title = '';
		// and store it in a separate container (array)
		slideTitles[index] = text;
	}
    var titleElement = this.titleElement;
    if (titleElement.length) {
        this.titleElement.empty();
        if (text) {
			jQuery(titleElement).append(jQuery('<span>' + text + '</span>'));
        }
    }
	// Update image index indicator
	var counterText = '<i class="icon-th"></i>&nbsp;' + (index+1) + ' sur ' + this.getNumber();
	var counterElement = this.container.find("span.imageIndex");
	jQuery(counterElement).empty().append(counterText).attr('title', showThumbnailsTitle);
	adjustTitle(this.container);
}

// Override blueimp toggleControls method in order to let me decide when to dsiplay/hide controls
blueimp.Gallery.prototype.toggleControls = function () {
	// Do nothing...
}

function startHideGalleryControls(gallery)
{
	ctrlTimer = setUpControlTimer(gallery);
	
	// Show controls as son as the mouse moves
	jQuery(gallery).on("mousemove", function() { 
		if (ctrlTimer != null) clearTimeout(ctrlTimer);
		showGalleryControls(gallery);
		ctrlTimer = setUpControlTimer(gallery);
	});	
}
function openGallery(gallery)
{	
	// Keep controls displayed when the mouse is over the prev/next buttons
	jQuery(gallery).find(".next, .prev, .close, .play-pause, .indicator, .imageIndex")
	.mouseenter( function () {
		stopHideGalleryControls(gallery);
	} )
	.mouseleave( function () {
		startHideGalleryControls(gallery);
	} );
	
	var responsiveData = getResponsiveData();
	if (responsiveData != null && responsiveData.blueimpThumbnails)
	{
		jQuery(gallery).find("span.imageIndex")
		.css("cursor", "pointer")
		.on('click', function() {
			toggleThumbnails(gallery);
		});
	}
	
	resizeProxy = jQuery.proxy(checkThumbnailsSize, gallery);
	jQuery(window).on('resize', resizeProxy);
	
	// Add tooltip for controls
	jQuery(gallery).find(".next").attr('title', 'Appuyez sur -> pour afficher l\'image Suivante');
	jQuery(gallery).find(".prev").attr('title', 'Appuyez sur <- pour afficher l\'image Précédente');
	jQuery(gallery).find(".close").attr('title', 'Appuyez sur echap pour fermer la galerie');
	jQuery(gallery).find(".icon-play").attr('title', 'Appuyez sur espace pour démarrer le diaporama');
	jQuery(gallery).find(".icon-pause").attr('title', 'Appuyez sur espace pour arrêter le diaporama');
		
	startHideGalleryControls(gallery);
}
function galleryOpened(gallery)
{
	// Setup tooltips for thumbnails
	jQuery(gallery).find(".indicator li").tooltipster({
		position: 'top',
		offsetY: 2,
		contentAsHTML: true,
		interactive: true
	});	
}
function closeGallery(gallery)
{	
	// Unbind all events
	jQuery(gallery).off("open").off("close");
	jQuery(window).off('resize', resizeProxy);
	jQuery(gallery).find(".next, .prev, .close, .play-pause, .indicator, .imageIndex").off("mouseenter").off("mouseleave");
	
	var $imageIndex = jQuery(gallery).find("span.imageIndex");
	$imageIndex.off('click');
	if (thumbnailsAreVisible)
	{
		toggleThumbnails(gallery);
	}
	
	stopHideGalleryControls(gallery);
}
function stopHideGalleryControls(gallery)
{
	jQuery(gallery).off("mousemove");
	if (ctrlTimer != null) clearTimeout(ctrlTimer);
	showGalleryControls(gallery);
}
function setUpControlTimer(gallery)
{
	return setTimeout(function() { hideGalleryControls(gallery); }, ctrlDisplayTime );	
}
function hideGalleryControls(gallery)
{
	gallery.removeClass(controlsClass);
	if (thumbnailsAreVisible)
	{
		toggleThumbnails(gallery);
	}
	var $title = jQuery(gallery).find(".title");
	$title.css("left", "5px");
	$title.css("right", "5px");
}
function showGalleryControls(gallery)
{	
	gallery.addClass(controlsClass);
	adjustTitle(gallery);
}
function toggleThumbnails(gallery)
{
	var $indicators = jQuery(gallery).find(".indicator");
	var $imageIndex = jQuery(gallery).find("span.imageIndex");
	var $slides = jQuery(gallery).find(".slides");

	if (!thumbnailsAreVisible)
	{
		
		$slides.animate({bottom: getindicatorsHeight($indicators)}, thumbnailsAnimationDuration);
		var indicatorsHeight = $indicators.height();
		$indicators.css("height", "0px");
		$indicators.css("display", "block");
		$indicators.animate({height: indicatorsHeight}, thumbnailsAnimationDuration, "swing", function () {
			$indicators.css("height", "");
		});

		jQuery($imageIndex).attr('title', hideThumbnailsTitle);
		thumbnailsAreVisible = true;
	}
	else
	{
		$slides.animate({bottom: 0}, thumbnailsAnimationDuration);
		$indicators.animate({height: 0}, thumbnailsAnimationDuration, "swing", function () {
			$indicators.css("display", "none");
			$indicators.css("height", "");
		});
		
		jQuery($imageIndex).attr('title', showThumbnailsTitle);
		thumbnailsAreVisible = false;
	}
}
function checkThumbnailsSize()
{
	if (!thumbnailsAreVisible)
	{
		return;
	}	
	// A proxy is attached with the current context as the gallery itself
	var gallery = this;
	var $indicators = jQuery(gallery).find(".indicator");
	var $slides = jQuery(gallery).find(".slides");
	$slides.css('bottom', getindicatorsHeight($indicators));
}
function getindicatorsHeight($indicators)
{
	return $indicators.height() + getCssIntProperty($indicators, "bottom") + thumbnailTopMargin;
}
function adjustTitle(gallery)
{
	var $title = jQuery(gallery).find(".title");
	var $index = jQuery(gallery).find(".imageIndex");
	var indexDisplay = $index.css("display");
	if (indexDisplay == "none")
	{
		$title.css("left", "5px");	
		$title.css("right", "5px");	
	}
	else
	{
		var indexLeft = getCssIntProperty($index, "left");
		var indexWidth = $index.width();
		$title.css("left", (indexLeft + indexWidth + 20) + "px");	
		$title.css("right", "90px");	
	}
}
function getCssIntProperty(element, property)
{
	return parseInt(element.css(property), 10);
}