/*
 * blueimp Gallery jQuery plugin 1.2.2
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, window, document */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define([
            'jquery',
            './blueimp-gallery'
        ], factory);
    } else {
        factory(
            window.jQuery,
            window.blueimp.Gallery
        );
    }
}(function ($, Gallery) {
    'use strict';

    // Global click handler to open links with data-gallery attribute
    // in the Gallery lightbox:
    $(document).on('click', '[data-gallery]', function (event) {
        // Get the container id from the data-gallery attribute:
        var id = $(this).data('gallery'),
            widget = $(id),
            container = (widget.length && widget) ||
                $(Gallery.prototype.options.container),
            callbacks = {
                onopen: function () {
                    container
                        .data('gallery', this)
                        .trigger('open');
                },
                onopened: function () {
                    container.trigger('opened');
                },
                onslide: function () {
                    container.trigger('slide', arguments);
                },
                onslideend: function () {
                    container.trigger('slideend', arguments);
                },
                onslidecomplete: function () {
                    container.trigger('slidecomplete', arguments);
                },
                onclose: function () {
                    container.trigger('close');
                },
                onclosed: function () {
                    container
                        .trigger('closed')
                        .removeData('gallery');
                }
            },
            options = $.extend(
                // Retrieve custom options from data-attributes
                // on the Gallery widget:
                container.data(),
                {
                    container: container[0],
                    index: this,
                    event: event
                },
                callbacks
            ),
            // Select all links with the same data-gallery attribute:
            links = $('[data-gallery="' + id + '"]');
			
        if (options.filter)
		{
            links = links.filter(options.filter);
        }
		
		if (blueimp.Gallery.prototype.options.customFilter)
		{
			links = links.filter(blueimp.Gallery.prototype.options.customFilter);
		}
		if (blueimp.Gallery.prototype.options.sort)
		{
			links = links.sort(blueimp.Gallery.prototype.options.sort);
		}
		
		var $container = jQuery(id);
		if (!$container.length)
		{
			$container = jQuery(Gallery.prototype.options.container);
		}
		
		container.on('open', function (event) {
			openGallery(this);
		}).on('close', function (event) {
			closeGallery(this);
		}).on('opened', function (event) {
			galleryOpened(this);
		});
		
		var responsiveData = getResponsiveData();
		var indicators = container.find(".indicator");
		if (responsiveData.blueimpThumbnails && !indicators.length)
		{
			container.append("<ol class='indicator'></o>");
		}
		
		if (!responsiveData.blueimpThumbnails && indicators.length)
		{
			jQuery(".indicator").remove();
		}
		
        return new Gallery(links, options);
    });

}));
