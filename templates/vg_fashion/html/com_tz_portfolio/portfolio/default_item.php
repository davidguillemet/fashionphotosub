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

defined('_JEXEC') or die();

$doc    = JFactory::getDocument();
 JFactory::getLanguage()->load('com_content');
JFactory::getLanguage()->load('com_tz_portfolio');

?>

<?php if($this -> listsArticle):?>

    <?php
    $params = $this -> params;
    ?>
            <?php $i=0;?>
            <?php foreach($this -> listsArticle as $row):  ?>
                <?php
                    $tags = $row->tagName;

                    $tmpl   = null;
                    if($params -> get('tz_use_lightbox',1) == 1){
                        $tmpl   = '&tmpl=component';
                    }
                    $tzRedirect = $params -> get('tz_portfolio_redirect','p_article'); //Set params for $tzRedirect
                    $itemParams = new JRegistry($row -> attribs); //Get Article's Params
                    //Check redirect to view article
                    if($itemParams -> get('tz_portfolio_redirect')){
                        $tzRedirect = $itemParams -> get('tz_portfolio_redirect');
                    }
                    if($tzRedirect == 'article'){
                        $row ->link   = JRoute::_(TZ_PortfolioHelperRoute::getArticleRoute($row -> slug, $row -> catid).$tmpl);
                        $commentLink   = JRoute::_(TZ_PortfolioHelperRoute::getArticleRoute($row -> slug, $row -> catid),true,-1);
                    }
                    else{
                        $row ->link   = JRoute::_(TZ_PortfolioHelperRoute::getPortfolioArticleRoute($row -> slug, $row -> catid).$tmpl);
                        $commentLink   = JRoute::_(TZ_PortfolioHelperRoute::getPortfolioArticleRoute($row -> slug, $row -> catid),true,-1);
                    }
        
                    if($params -> get('tz_column_width',230))
                        $tzItemClass    = ' tz_item';
                    else
                        $tzItemClass    = null;
                ?>
                <?php
                    if($row -> featured == 1)
                        $tzItemFeatureClass    = ' tz_feature_item';
                    else
                        $tzItemFeatureClass    = null;

                    $class  = null;
                    if($params -> get('tz_filter_type','tags') == 'tags'){
                        $class  = $row -> tagName;
                    }
                    elseif($params -> get('tz_filter_type','tags') == 'categories'){
                        $class  = 'category'.$row -> catid;
                    }



                    $article_ID = $row->id;

                    $db = JFactory::getDbo();
                    $query = "SELECT *, tpf.title as title_value from #__tz_portfolio_fields tpf INNER JOIN #__tz_portfolio tp ON(tpf.id = tp.fieldsid)
                        WHERE tp.contentid = $article_ID AND tp.value = 'Yes'";

                    $db->setQuery($query);
                    $fields = $db->loadObjectList();
                    $fieldClass = '';

                    if($fields){
                        foreach ($fields as $field) {
                            $fieldClass = strtolower($field->title_value);
                        }
                    }


                ?>
                <div class="element <?php echo $class.$tzItemClass.$tzItemFeatureClass;?> <?php if($fieldClass){ echo $fieldClass.'_field';} ?>" data-order="<?php echo strtotime($row->created); ?>">
                    <div class="TzInner">
                        <?php
                         if($params -> get('show_image',1) == 1 OR $params -> get('show_image_gallery',1) == 1
                                 OR $params -> get('show_video',1) == 1):
                        ?>

                        <?php
                            $media          = JModelLegacy::getInstance('Media','TZ_PortfolioModel');
                            $mediaParams    = $this -> mediaParams;
                            $mediaParams -> merge($media -> getCatParams($row -> catid));

                            $media -> setParams($mediaParams);
                            $listMedia      = $media -> getMedia($row -> id);
							if($fieldClass){
							$listMedia[0]->landscape = $fieldClass;
							}

                            $this -> assign('listMedia',$listMedia);
                            $this -> assign('itemLink',$row ->link);
                        ?>
                            <?php echo $this -> loadTemplate('media');?>
                        <?php endif;?>

                        <div class="TzPortfolioDescription">
                        <?php if($params -> get('show_title',1)): ?>
                            <h3 class="TzPortfolioTitle name">
                                <?php if($params->get('link_titles',1)) : ?>
                                    <a<?php if($params -> get('tz_use_lightbox') == 1){echo ' class="fancybox fancybox.iframe"';}?> href="<?php echo $row ->link; ?>">
                                        <?php echo $this->escape($row -> title); ?>
                                    </a>
                                <?php else : ?>
                                    <?php echo $this->escape($row -> title); ?>
                                <?php endif; ?>
                            </h3>
                        <?php endif;?>
                        <?php  if($row->tagName){
                                $arrtags = explode(" ",$row->tagName);

                                $rowtag = implode(" - ",$arrtags);
                            ?>
                            <span class="tagName">- <?php echo $rowtag; ?> -</span>
                        <?php }

                        ?>

                        <?php //Show vote?>
                        <?php echo $row -> event -> TZPortfolioVote;?>

                        <?php echo $row -> event -> beforeDisplayContent; ?>

                        <div class="TzSeparator"></div>

                        <?php if (($params->get('show_author',1)) or ($params->get('show_category',1)) or ($params->get('show_create_date',1)) or ($params->get('show_modify_date',1)) or ($params->get('show_publish_date',1)) or ($params->get('show_parent_category',1)) or ($params->get('show_hits',1))) : ?>
                            <div class="TzArticle-info">
                        <?php endif; ?>

                        <?php if ($params->get('show_category',1)) : ?>
                        <div class="TZcategory-name">
                            <?php $title = $this->escape($row->category_title);
                            $url = '<a href="' . JRoute::_(TZ_PortfolioHelperRoute::getCategoryRoute($row->catid)) . '">' . $title . '</a>'; ?>
                            <?php if ($params->get('link_category',1)) : ?>
                            <?php echo JText::sprintf('COM_CONTENT_CATEGORY', $url); ?>
                            <?php else : ?>
                            <?php echo JText::sprintf('COM_CONTENT_CATEGORY', $title); ?>
                            <?php endif; ?>
                        </div>
                        <?php endif; ?>
                        <?php if ($params->get('show_publish_date',1)) : ?>
                        <div class="published">
                            <?php echo JText::sprintf('COM_CONTENT_PUBLISHED_DATE_ON', JHtml::_('date', $row->publish_up, JText::_('DATE_FORMAT_LC2'))); ?>
                        </div>
                        <?php endif; ?>

                        <?php
                            $extraFields    = JModelLegacy::getInstance('ExtraFields','TZ_PortfolioModel',array('ignore_request' => true));
                            $extraFields -> setState('article.id',$row -> id);
                            $extraFields -> setState('category.id',$row -> catid);
                            $extraFields -> setState('orderby',$params -> get('fields_order'));

                            $extraParams    = $extraFields -> getParams();
                            $itemParams     = new JRegistry($row -> attribs);

                            if($itemParams -> get('tz_fieldsid'))
                                $extraParams -> set('tz_fieldsid',$itemParams -> get('tz_fieldsid'));

                            $extraFields -> setState('params',$extraParams);
                            $this -> item -> params = $extraParams;
                            $this -> assign('listFields',$extraFields -> getExtraFields());
                        ?>

                        <?php if (($params->get('show_author',1)) or ($params->get('show_category',1)) or ($params->get('show_create_date',1)) or ($params->get('show_modify_date',1)) or ($params->get('show_publish_date',1)) or ($params->get('show_parent_category',1)) or ($params->get('show_hits',1))) :?>
                            </div>
                        <?php endif; ?>



                        </div>
                        <a class="bg-item <?php if($params -> get('tz_use_lightbox',1) == 1){ ?>fancybox fancybox.iframe <?php } ?>" href="<?php echo $row ->link; ?>"> &nbsp; </a>

                    </div><!--Inner-->
                </div>
                <?php echo $row->event->afterDisplayContent; ?>

                <?php $i++;?>
            <?php endforeach;?>

<?php endif;?>