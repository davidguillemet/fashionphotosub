/**
 * Main JavaScript file
 *
 * @package         Sliders
 * @version         3.5.5
 *
 * @author          Peter van Westen <peter@nonumber.nl>
 * @link            http://www.nonumber.nl
 * @copyright       Copyright © 2014 NoNumber All Rights Reserved
 * @license         http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

(function($) {
	$(document).ready(function() {
		if (typeof( window['nn_sliders_use_hash'] ) != "undefined") {
			nnSliders = {
				show: function(id, scroll, ignoreparents) {
					var openparents = 0;
					var $el = $('#' + id);
					if (!ignoreparents) {
						$el.closest('.nn_sliders').closest('.accordion-body').each(function(i, parent) {
							if (!$(parent).hasClass('in')) {
								nnSliders.show(parent.id, 0);
								openparents = 1;
							}
						});
					}
					if (openparents) {
						nnSliders.show(id, scroll, 1);
					} else {
						if (!$el.hasClass('in')) {
							$el.collapse({
								toggle: true,
								parent: $el.parent().parent()
							});
							if (!$el.hasClass('in')) {
								$el.collapse('toggle');
							}
							if (scroll) {
								nnSliders.scroll(id, 0);
							}
						} else {
							if (scroll) {
								nnSliders.scroll(id, 1);
							}
						}

						$el.focus();
					}
				},
				scroll: function(id, onlyscroll) {
					if (nn_sliders_scroll == 2) {
						if (onlyscroll) {
							$('#' + id).closest('.accordion-group').each(function(i, el) {
								$('html,body').animate({ scrollTop: $(el).find('.nn_sliders-scroll').offset().top});
							});
						} else {
							$('#' + id).bind('shown', function(event) {
								$('#' + id).closest('.accordion-group').each(function(i, el) {
									$('html,body').animate({ scrollTop: $(el).find('.nn_sliders-scroll').offset().top });
								});
								$(this).unbind(event);
							});
						}
					} else {
						$('#' + id).closest('.nn_sliders').each(function(i, el) {
							$('html,body').animate({ scrollTop: $(el).find('.nn_sliders-scroll').offset().top });
						});
					}
				}
			};

			$('.nn_sliders > .accordion-group > .accordion-body').on('show show.bs.collapse', function(e) {
				$(this).parent().addClass('active');
				e.stopPropagation();
			});
			$('.nn_sliders > .accordion-group > .accordion-body').on('hidden hidden.bs.collapse', function(e) {
				$(this).parent().removeClass('active');
				e.stopPropagation();
			});

			if (nn_sliders_use_cookies) {

				var cookies = $.cookie(nn_sliders_cookie_name);
				if (cookies) {
					cookies = cookies.split('___');
					for (var i = 0; i < cookies.length; i++) {
						var keyval = cookies[i].split('=');
						if (keyval.length > 1) {
							var key = keyval.shift();
							if (key.substr(0, 14) == 'set-nn_sliders') {
								nnSliders.show(keyval.join('='));
							}
						}
					}
				}
			}

			if (nn_sliders_use_hash) {
				if (window.location.hash) {
					var id = window.location.hash.replace('#', '');
					if (id.indexOf("&") == -1 && id.indexOf("=") == -1 && $('#' + id + '.accordion-body').length > 0) {
						if (!nn_sliders_urlscroll) {
							// scroll to top to prevent browser scrolling
							$('html,body').animate({ scrollTop: 0 });
						}
						nnSliders.show(id, nn_sliders_urlscroll);
					}
				}
				$('.nn_sliders > .accordion-group > .accordion-body').on('show show.bs.collapse', function(e) {
					// prevent scrolling on setting hash, so temp empty the id of the element
					var id = this.id
					this.id = '';
					window.location.hash = id;
					this.id = id;
					e.stopPropagation();
				});
			}

			if (window.location.hash) {
				/* Open parent tabs and scroll to named anchor links within tabs */
				var id = window.location.hash.replace('#', '');
				var $el = $('a[name="' + id + '"][data-toggle!="collapse"]');

				if ($el) {
					var hasparents = 0;
					$el.closest('.nn_sliders').closest('.accordion-body').each(function(i, parent) {
						if (!$(parent).hasClass('in')) {
							nnSliders.show(parent.id, 0);
							hasparents = 1;
						}
					});

					if (hasparents) {
						setTimeout(function() {
							$('html,body').animate({ scrollTop: $el.offset().top});
						}, 500);
					}
				}
			}

			if (nn_sliders_mode == 'hover') {
				$('body').on('hover.collapse.data-api', '.nn_sliders a[data-toggle="collapse"]', function(e) {
					e.preventDefault();
					nnSliders.show($(this).closest('.accordion-group').find('.accordion-body').first().attr('id'), 0, 0);
				});
			}

			if (nn_sliders_use_cookies || nn_sliders_set_cookies) {
				$('.nn_sliders > .accordion-group > .accordion-body').on('show show.bs.collapse', function(e) {
					var id = this.id;
					var set = 0;
					$(this).closest('.nn_sliders').each(function($i, $el) {
						set = $el.id;
					});

					var obj = {};
					var cookies = $.cookie(nn_sliders_cookie_name);
					if (cookies) {
						cookies = cookies.split('___');
						for (var i = 0; i < cookies.length; i++) {
							var keyval = cookies[i].split('=');
							if (keyval.length > 1 && keyval[0] != set) {
								var key = keyval.shift();
								if (key.substr(0, 14) == 'set-nn_sliders') {
									obj[key] = keyval.join('=');
								}
							}
						}
					}
					obj['set-nn_sliders-' + set] = id;

					var arr = [];
					for (var i in obj) {
						if (i && obj[i]) {
							arr[arr.length] = i + '=' + obj[i];
						}
					}

					$.cookie(nn_sliders_cookie_name, arr.join('___'));

				});
			}
		}
	});
})(jQuery);

/* For custom use */
function openAllSliders() {
	(function($) {
		$('.nn_sliders').each(function(e, el) {
			id = $(el).find('.accordion-body').first().attr('id');
			nnSliders.show(id);
		});
	})(jQuery);
}

function closeAllSliders() {
	(function($) {
		$('.nn_sliders').each(function(e, el) {
			id = $(el).find('.accordion-body').first().attr('id');
			var $el = $('#' + id);
			$el.collapse('hide');
		});
	})(jQuery);
}