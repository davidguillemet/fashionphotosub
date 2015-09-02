<?php
/*------------------------------------------------------------------------

# TZ Portfolio Extension

# ------------------------------------------------------------------------

# author    DuongTVTemPlaza

# copyright Copyright (C) 2012 templaza.com. All Rights Reserved.

# @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL

# Websites: http://www.templaza.com

# Technical Support:  Forum - http://templaza.com/Forum

-------------------------------------------------------------------------*/

//no direct access
defined('_JEXEC') or die();

$doc    = JFactory::getDocument();
$doc->addStyleDeclaration('
    body .ja-mainbody{ background:none;}
    body > .container{
    width:100%;
    }
');

?>
<?php if($this -> listsArticle):?>
    <?php $params = $this -> params; ?>
    <link rel="stylesheet/less" type="text/css" href="components/com_tz_portfolio/css/tz_lib_style.less">
    <script src="components/com_tz_portfolio/js/less-1.0.21.min.js" type="text/javascript"></script>

    <script type="text/javascript">
        function tz_init(defaultwidth){
            var contentWidth    = jQuery('#TzContent').width();
            var columnWidth     = defaultwidth;
            var curColCount     = 0;
            
            var maxColCount     = 0;
            var newColCount     = 0;
            var newColWidth     = 0;
            var featureColWidth = 0;

            curColCount = Math.floor(contentWidth / columnWidth);

            maxColCount = curColCount + 1;
            if((maxColCount - (contentWidth / columnWidth)) > ((contentWidth / columnWidth) - curColCount)){
                newColCount     = curColCount;
            }
            else{
                newColCount = maxColCount;
            }

            newColWidth = contentWidth;
            featureColWidth = contentWidth;


            if(newColCount > 1){
                newColWidth = Math.floor(contentWidth / newColCount);
                featureColWidth = newColWidth * 2;
            }

            jQuery('.element').width(newColWidth);
            jQuery('.tz_item').each(function(){
                jQuery(this).find('img').first().attr('width','100%');
            });

            jQuery('.tz_feature_item').width(featureColWidth);
            jQuery('.landscape_field').width(featureColWidth);
            var $container = jQuery('#portfolio');
            $container.imagesLoaded(function(){
                $container.isotope({
                    masonry:{
                        columnWidth: newColWidth
                    }
                });

            });
        }
    </script>

    <div id="TzContent">
        <div id="tz_options" class="clearfix">

            <?php if($params -> get('tz_show_filter',1)):?>

            <div class="option-combo">
                <?php if ($this->params->get('show_page_heading', 1)) : ?>
                <h1>
                    <?php echo $this->escape($this->params->get('page_heading')); ?>
                </h1>
                <?php endif; ?>
				
				<div id="filter-wrapper" style="padding: 5px; width: 100%">
                	<div id="filter" class="option-set clearfix" data-option-key="filter" style="width: 100%; height: 240px; overflow: visible">
                	</div>
				</div>
            </div>
            <?php endif;?>

            <?php if($params -> get('show_sort',1)):?>
                <div class="option-combo">
                  <h2><?php echo JText::_('COM_TZ_PORTFOLIO_SORT')?></h2>
                  <div id="sort" class="option-set clearfix" data-option-key="sortBy">
                      <a class="btn btn-small" href="#title" data-option-value="name"><?php echo JText::_('Title');?></a>
                      <a class="btn btn-small" href="#date" data-option-value="date"><?php echo JText::_('Date');?></a>
                  </div>
                </div>
            <?php endif;?>

            <?php if($params -> get('show_layout',1)):?>
                <div class="option-combo">
                    <h2><?php echo JText::_('COM_TZ_PORTFOLIO_LAYOUT');?></h2>
                    <div id="layouts" class="option-set clearfix" data-option-key="layoutMode">
                    <?php
                        if(count($params -> get('layout_type',array('masonry','fitRows','straightDown')))>0):
                            foreach($params -> get('layout_type',array('masonry','fitRows','straightDown')) as $param):
                    ?>
                            <a class="btn btn-small" href="#<?php echo $param?>" data-option-value="<?php echo $param?>">
                                <?php echo $param?>
                            </a>
                        <?php endforeach;?>
                    <?php endif;?>
                    </div>
                </div>
            <?php endif;?>

        </div>

        <div id="portfolio" class="super-list variable-sizes clearfix">
            <?php if($params -> get('tz_portfolio_layout') == 'ajaxButton'):?>

                    <div id="tz_append" class="element tz_item  isotope-item" data-order="0" >
                        <div class="TzInner">

                            <a href="javascript:" class="btn btn-large btn-block"><?php echo JText::_('COM_TZ_PORTFOLIO_ADD_ITEM_MORE');?></a>
							<div class="bg-item"></div>
                        </div>
                    </div>

            <?php endif;?>

            <?php echo $this -> loadTemplate('item');?>

            <?php if($params -> get('tz_portfolio_layout') == 'ajaxButton' || $params -> get('tz_portfolio_layout') == 'ajaxInfiScroll'):?>
            <?php echo $this -> loadTemplate('infinite_scroll');?>
            <?php endif;?>
        </div>

        <?php if($params -> get('tz_portfolio_layout') == 'default'):?>
            <?php if (($params->def('show_pagination', 1) == 1  || ($params->get('show_pagination') == 2)) && ($this->pagination->get('pages.total') > 1)) : ?>
                <div class="TzPagination Portfolio_pagination" >
                    <?php  if ($params->def('show_pagination_results', 1)) : ?>
                    <p class="counter">
                        <?php echo $this->pagination->getPagesCounter(); ?>
                    </p>
                    <?php endif; ?>

                    <?php echo $this->pagination->getPagesLinks(); ?>
                </div>
            <?php endif;?>
        <?php endif;?>




<?php $layout = $params -> get('layout_type',array('masonry'));?>
<script type="text/javascript">
     var resizeTimer = null;
     function getFilterOptions() {
         var tags    =   [];
         jQuery('#filter a').each(function (index) {
             tags.push(jQuery(this).attr('data-option-value').replace('.',''));
         });
         return tags;
     }

    jQuery(window).bind('load resize', function() {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout("tz_init("+"<?php echo $params -> get('tz_column_width',233);?>)", 100);
    });

    var $container = jQuery('#portfolio');
    $items = $container.children('.element');
    $container.imagesLoaded( function(){
        $container.isotope({
            itemSelector : '.element',
            layoutMode: '<?php echo $layout[0];?>',
            sortBy:'order',			sortAscending: false,
            getSortData: {
                name: function( $elem ) {
                    var name = $elem.find('.name'),
                        itemText = name.length ? name : $elem;
                    return itemText.text();
                },
                date: function($elem){
                    var number = $elem.hasClass('element') ?
                      $elem.find('.create').text() :
                      $elem.attr('data-date');
                    return number;

                },
                order: function($elem){
                    var _order = $elem.hasClass('element') ?
                            $elem.attr('data-order'):
                            $elem.find('.order').text();
                    return parseInt(_order);
                }
            }
        }, function($elem){
                    var $elem   = $container.find('.element'),
                            max_order   = $container.find('.element:first').attr('data-order');
                    if($elem.length){
                        $elem.each(function(index){
                            if(parseInt(max_order) < parseInt(jQuery(this).attr('data-order'))){
                                max_order   = parseInt(jQuery(this).attr('data-order')) +1;
                            }
                        })
                    }

					if (jQuery('#tz_append').length)
					{
						jQuery('#tz_append').attr('data-order',max_order);
                    	var $opClass = getFilterOptions(),
                            $b_class = jQuery('#tz_append').attr('class').split(' ');

                    	if($opClass.length){
                        	jQuery.each($opClass,function(i,el){
                            	if (jQuery.inArray(el,$b_class) === -1){
                                	jQuery('#tz_append').addClass(el);
                            	}
                        	});
                    	}
					}
                }

        );
        tz_init('<?php echo $params -> get('tz_column_width',233);?>');
    });

    function loadPortfolio(){
          
		  var $optionSets = jQuery('#tz_options .option-set');
		  
          var $optionLinks = $optionSets.find('a');
          
		  $optionLinks.click(function(event){
              event.preventDefault();
            var $this = jQuery(this);
            // don't proceed if already selected
            if ( $this.hasClass('selected') ) {
              return false;
            }
            var $optionSet = $this.parents('.option-set');
            $optionSet.find('.selected').removeClass('selected');
            $this.addClass('selected');

            // make option object dynamically, i.e. { filter: '.my-filter-class' }
            var options = {},
                key = $optionSet.attr('data-option-key'),
                value = $this.attr('data-option-value');
            // parse 'false' as false boolean

            value = value === 'false' ? false : value;
            options[ key ] = value;
              
            if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {

              // changes in layout modes need extra logic
              changeLayoutMode( $this, options )
            } else {
              // otherwise, apply new options
              $container.isotope(options);

            }

            return false;
          });

    }

	var previousContentWidth = null;
	
	function onLocationsDataLoaded()
	{
		previousContentWidth = getContentWidth();
		updateCloud(true);
	}
	
	function updateCloud(pageIsLoading)
	{
		var $filterContainer = jQuery("#filter");
		var newContentWidth = getContentWidth();

		if (pageIsLoading != true && newContentWidth != previousContentWidth)
		{
			// Called from onResize event
			// -> clear the filter container and resize it
			$filterContainer.empty();
			$filterContainer.css("width", newContentWidth);
		}
		
		// Display jQCloud on page loading or when the content has been resized
		if (pageIsLoading == true || newContentWidth != previousContentWidth)
		{
			$filterContainer.jQCloud(tagCloud, {
				delayedMode: true,
				removeOverflowing: false,
				afterCloudRender: loadPortfolio
			});
		}
		
		previousContentWidth = newContentWidth;
	}
		
	loadLocationsData(true);

	jQuery( window ).resize(updateCloud);

      </script>

        <script type="text/javascript">

                jQuery(window).load(function(){
                    var left_width =  jQuery('.ja-sidebar').outerWidth(true);
                     
                    var win_width = jQuery('#ja-mainbody').width();
                    main_width = win_width - left_width;
                    jQuery('#ja-content').css('width',main_width);
                    jQuery('#ja-content').css('min-height',jQuery(window).height()+1);
                    jQuery('#ja-mainbody').css('background-color','#eee');

                });
                jQuery(window).resize(function(){
                    var left_width =  jQuery('.ja-sidebar').outerWidth(true);
                    var win_width = jQuery('#ja-mainbody').width();
                    main_width = win_width - left_width;
                    jQuery('#ja-content').css('width',main_width);
                    jQuery('#ja-content').css('min-height',jQuery(window).height()+1);
                    jQuery('#ja-mainbody').css('background-color','#eee');
                });
        </script>

    </div> <!-- #content -->
<?php endif;?>

