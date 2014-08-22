/**
 * Main JavaScript file
 *
 * @package         Tabs
 * @version         3.6.7
 *
 * @author          Peter van Westen <peter@nonumber.nl>
 * @link            http://www.nonumber.nl
 * @copyright       Copyright © 2014 NoNumber All Rights Reserved
 * @license         http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

(function($) {
	$(document).ready(function() {
		if (typeof( window['nn_tabs_use_hash'] ) != "undefined") {
			nnTabs = {
				show: function(id, scroll, openparents) {
					var $this = this;
					var $el = $('a[href$="#' + id + '"]');

					if (openparents) {
						var $parents = $el.parents().get().reverse();
						var hasparents = 0;
						$($parents).each(function() {
							if ($(this).hasClass('tab-pane') && !$(this).hasClass('in')) {
								$(this).parent().parent().find('a[href="#' + this.id + '"]').tab('show')
									.on('shown shown.bs.tab', function() {
										$el.tab('show');
									});
								hasparents = 1;
							}
						});

						if (!hasparents) {
							$el.tab('show');
						}
					} else {
						$el.tab('show');
					}

					$el.tab('show');

					var $pane = $('#' + id);
					$pane.addClass('in active').removeClass('fade');
					$pane.parent().find('> .tab-pane.fade').removeClass('in').removeClass('active');

					if (scroll) {
						this.scroll(id);
					}

					$el.focus();
				},

				scroll: function($id, hasprefix) {
					$('.nn_tabs-tab > a[href="#' + $id + '"]').closest('ul:not(.dropdown-menu)').each(function($i, $el) {
						$('html,body').animate({scrollTop: $($el).find('.nn_tabs-scroll').offset().top});
					});
				},

				setTabContentHeights: function() {
					$('.nn_tabs.bottom').each(function() {
						$(this).find('.tab-content').after($(this).find('.nav-tabs'));

					});

					$('.nn_tabs.outline_handles.left').each(function() {
						$(this).find('.tab-content')
							.css('margin-left', $(this).find('.nav-tabs').width())
							.css('min-height', $(this).find('.nav-tabs').height());
					});

					$('.nn_tabs.outline_handles.right').each(function() {
						$(this).find('.tab-content')
							.css('margin-right', $(this).find('.nav-tabs').width())
							.css('min-height', $(this).find('.nav-tabs').height());
					});
				}
			};

			if (nn_tabs_use_cookies) {
				var cookies = $.cookie(nn_tabs_cookie_name);
				if (cookies) {
					cookies = cookies.split('___');
					for (var i = 0; i < cookies.length; i++) {
						var keyval = cookies[i].split('=');
						if (keyval.length > 1) {
							var key = keyval.shift();
							if (key.substr(0, 11) == 'set-nn_tabs') {
								nnTabs.show(keyval.join('='));
							}
						}
					}
				}
			}
			if (nn_tabs_use_hash) {
				if (window.location.hash) {
					var id = window.location.hash.replace('#', '');
					if (id.indexOf("&") == -1 && id.indexOf("=") == -1 && $('.nn_tabs > .tab-content > #' + id).length > 0) {
						if (!nn_tabs_urlscroll) {
							// scroll to top to prevent browser scrolling
							$('html,body').animate({scrollTop: 0});
						}

						nnTabs.show(id, nn_tabs_urlscroll, 1);
					}
				}

				$('.nn_tabs-tab a[data-toggle="tab"]').on('show show.bs.tab', function($e) {
					window.location.hash = String($e.target).substr(String($e.target).indexOf("#") + 1);
					$e.stopPropagation();
				});
			}

			if (nn_tabs_mode == 'hover') {
				$('body').on('hover.tab.data-api', '[data-toggle="tab"]', function($e) {
					$e.preventDefault();
					$(this).tab('show');
				});
			}

			if (nn_tabs_use_cookies || nn_tabs_set_cookies) {
				$('.nn_tabs-tab a[data-toggle="tab"]').on('show show.bs.tab', function($e) {
					var id = String($e.target).substr(String($e.target).indexOf("#") + 1);
					var set = 0;
					$('.nn_tabs-tab > a[href="#' + id + '"]').closest('ul:not(.dropdown-menu)').each(function($i, $el) {
						set = $el.id;
					});

					var obj = {};
					var cookies = $.cookie(nn_tabs_cookie_name);
					if (cookies) {
						cookies = cookies.split('___');
						for (var i = 0; i < cookies.length; i++) {
							var keyval = cookies[i].split('=');
							if (keyval.length > 1 && keyval[0] != set) {
								var key = keyval.shift();
								if (key.substr(0, 11) == 'set-nn_tabs') {
									obj[key] = keyval.join('=');
								}
							}
						}
					}
					obj['set-nn_tabs-' + set] = id;

					var arr = [];
					for (var i in obj) {
						if (i && obj[i]) {
							arr[arr.length] = i + '=' + obj[i];
						}
					}

					$.cookie(nn_tabs_cookie_name, arr.join('___'));

				});
			}

			nnTabs.setTabContentHeights();
			$('.nn_tabs-tab a[data-toggle="tab"]').on('shown shown.bs.tab', function($e) {
				nnTabs.setTabContentHeights();
			});

			$('.nav-tabs-sm a').click(function() {
				var name = $(this).attr('href');
				if (name.substr(0, 1) == '#') {
					name = name.replace(/^#/, '');
					$('html,body').animate({scrollTop: $('a[name="' + name + '"]').offset().top});
				}
			});
		}
	});
})(jQuery);
