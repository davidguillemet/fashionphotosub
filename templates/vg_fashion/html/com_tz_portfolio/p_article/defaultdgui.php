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

// no direct access
defined('_JEXEC') or die;

JHtml::addIncludePath(JPATH_COMPONENT . '/helpers');

$app    = JFactory::getApplication();
$template = $app->getTemplate();
// Create shortcuts to some parameters.
$params		= $this->item->params;
$images     = json_decode($this->item->images);
$urls       = json_decode($this->item->urls);
$canEdit	= $this->item->params->get('access-edit');
JHtml::_('behavior.caption');
$user		= JFactory::getUser();
$doc        = JFactory::getDocument();

$tmpl   = JRequest::getString('tmpl');

if($this -> listTags):
    foreach($this -> listTags as $tag){
        $tags[] = $tag -> name;
    }
    $tags   = implode(',',$tags);
$doc -> setMetaData('keywords',$tags);
endif;
$description    = strip_tags($this -> item -> introtext);
$description    = explode(' ',$description);
$description    = array_splice($description,0,25);
$description    = trim(implode(' ',$description));
if(!strpos($description,'...'))
    $description    .= '...';
$doc -> setMetaData('description',$description);
$doc -> setMetaData('copyright','Copyright © '.date('Y',time()).' TemPlaza. All Rights Reserved.');
ob_start();
?>
<meta property="og:title" content="<?php echo $this -> item -> title;?>"/>
<meta property="og:url" content="<?php echo JURI::getInstance() -> toString();?>"/>
<meta property="og:description" content="<?php echo $description;?>"/>
<?php $meta = ob_get_contents();?>
<?php ob_end_clean();?>
<?php $doc -> addCustomTag($meta);?>

<link rel="stylesheet/less" type="text/css" href="components/com_tz_portfolio/css/tz_lib_style.less">
<script src="components/com_tz_portfolio/js/less-1.0.21.min.js" type="text/javascript"></script>
    
<div class="TzPortfolioItemPage item-page<?php echo $this->pageclass_sfx?>">
    <div class="TzItemPageInner">
<!--        --><?php //if ($this->params->get('show_page_heading', 1)) : ?>
<!--            <h1 class="TzHeadingTitle">-->
<!--            --><?php //echo $this->escape($this->params->get('page_heading')); ?>
<!--            </h1>-->
<!--        --><?php //endif; ?>
        <?php
        if (!empty($this->item->pagination) AND $this->item->pagination && !$this->item->paginationposition && $this->item->paginationrelative)
        {
         echo $this->item->pagination;
        }
         ?>

        <?php
            if($params -> get('show_image',1) == 1 OR $params -> get('show_image_gallery',1) == 1
                 OR $params -> get('show_video',1) == 1):
        ?>
            <?php echo $this -> loadTemplate('media');?>
        <?php endif;?>
        <div class="item-portfolio-content">
        <?php if ($params->get('show_title',1)) : ?>
        <h2 class="TzArticleTitle">
            <?php if ($params->get('link_titles',1) AND !empty($this->item->readmore_link)) : ?>
            <?php
            if($params -> get('tz_use_lightbox') == 1):
                $titleLink = JRoute::_(TZ_PortfolioHelperRoute::getPortfolioArticleRoute($this -> item -> slug, $this -> item -> catid).$tmpl);
            else:
                $titleLink  = $this->item->readmore_link;
            endif;
            ?>

                <?php echo $this->escape($this->item->title); ?>

            <?php else : ?>
            <?php echo $this->escape($this->item->title); ?>
            <?php endif; ?>
        </h2>
            <?php endif; ?>

        <?php $useDefList = (($params->get('show_author',1)) or ($params->get('show_category',1)) or ($params->get('show_parent_category',1))
        or ($params->get('show_create_date',1)) or ($params->get('show_modify_date',1)) or ($params->get('show_publish_date',1))
        or ($params->get('show_hits',1))); ?>

        <?php if ($useDefList) : ?>
        <div class="TzArticleInfo">
        <?php endif; ?>

            <?php if ($params->get('show_create_date',1)) : ?>
                <span class="date">
                <?php setlocale(LC_TIME, "fr_FR"); echo strftime("%e %B %Y", strtotime($this->item->created)); ?>
                </span>
            <?php endif; ?>

             <?php if($params -> get('show_vote',1)):?>
                <span class="TzVote">
                    <span class="TzLine">|</span>
                    <span><?php echo JText::_('COM_TZ_PORTFOLIO_RATING');?></span>
                    <?php echo $this->item->event->beforeDisplayContent; ?>
                </span>
            <?php endif;?>

            <?php if ($params->get('show_author',1) && !empty($this->item->author )) : ?>
                <span class="TzCreatedby">
                    <span class="TzLine">|</span>
                <?php $author = $this->item->created_by_alias ? $this->item->created_by_alias : $this->item->author; ?>
                <?php if ($params->get('link_author') == true): ?>
                <?php
                    $target = '';
                    if(isset($tmpl) AND !empty($tmpl)):
                        $target = ' target="_blank"';
                    endif;
                    $needle = 'index.php?option=com_tz_portfolio&view=users&created_by=' . $this->item->created_by;
                    $item = JSite::getMenu()->getItems('link', $needle, true);
                    $cntlink = !empty($item) ? $needle . '&Itemid=' . $item->id : $needle;
                ?>
                <?php echo JText::sprintf('COM_CONTENT_WRITTEN_BY', JHtml::_('link', JRoute::_($cntlink), $author,$target)); ?>
                <?php else: ?>
                    <?php echo JText::sprintf('COM_CONTENT_WRITTEN_BY', $author); ?>
                <?php endif; ?>
                </span>
            <?php endif; ?>

            <?php if ($params->get('show_category',1)) : ?>
            <span class="TzArticleCategory">
                    <span class="TzLine">|</span>
                <?php
                    $title = $this->escape($this->item->category_title);
                    $url    = $title;
                    $target = '';
                    if(isset($tmpl) AND !empty($tmpl)):
                        $target = ' target="_blank"';
                    endif;
                    $url = '<a href="'.JRoute::_(TZ_PortfolioHelperRoute::getCategoryRoute($this->item->catslug)).'"'.$target.'>'.$title.'</a>';

                ?>
                <?php if ($params->get('link_category',1) and $this->item->catslug) : ?>
                    <?php echo JText::sprintf('COM_CONTENT_CATEGORY', $url); ?>
                <?php else : ?>
                    <?php echo JText::sprintf('COM_CONTENT_CATEGORY', $title); ?>
                <?php endif; ?>
            </span>
            <?php endif; ?>

            <?php if ($params->get('show_parent_category') && $this->item->parent_slug != '1:root') : ?>
            <span class="TzArticleParentCategory">
                    <span class="TzLine">|</span>
                <?php
                    $title = $this->escape($this->item->parent_title);
                    $url    = $title;
                    $target = '';
                    if(isset($tmpl) AND !empty($tmpl)):
                        $target = ' target="_blank"';
                    endif;
                    $url = '<a href="'.JRoute::_(TZ_PortfolioHelperRoute::getCategoryRoute($this->item->parent_slug)).'"'.$target.'>'.$title.'</a>';
                ?>
                <?php if ($params->get('link_parent_category') and $this->item->parent_slug) : ?>
                    <?php echo JText::sprintf('COM_CONTENT_PARENT', $url); ?>
                <?php else : ?>
                    <?php echo JText::sprintf('COM_CONTENT_PARENT', $title); ?>
                <?php endif; ?>
            </span>
            <?php endif; ?>

            <?php if($params -> get('tz_show_count_comment') == 1):?>
                <span class="TZCommentCount">
                    <?php if($params -> get('tz_comment_type') == 'facebook'):?>
                        <fb:comments-count href="<?php echo JRoute::_(TZ_PortfolioHelperRoute::getPortfolioArticleRoute($this->item->slug,$this -> item -> catid));?>"></fb:comments-count>
                    <?php endif;?>
                    <?php if($params -> get('tz_comment_type') == 'jcomment'): ?>
                        <?php
                            $comments = JPATH_SITE.'/components/com_jcomments/jcomments.php';
                            if (file_exists($comments)){
                                require_once($comments);
                                if(class_exists('JComments')){
                                   echo"("; echo JComments::getCommentsCount((int) $this -> item -> id,'com_tz_portfolio');echo ")";
                                }
                            }
                        ?>
                    <?php endif;?>
                    <?php if($params -> get('tz_comment_type') == 'disqus'):?>
                        <?php if(isset($this -> item -> commentCount)):?>
                            <?php echo $this -> item -> commentCount;?>
                        <?php endif;?>
                    <?php endif;?>
					<?php echo JText::_('COM_TZ_PORTFOLIO_COMMENT_COUNT_TPL');?>
                </span>
            <?php endif;?>

            <?php if ($params->get('show_publish_date')) : ?>
                <span class="TZPublished">
                <?php echo JText::sprintf( JHtml::_('date', $this->item->publish_up, JText::_('DATE_FORMAT_LC2'))); ?>
                </span>
            <?php endif; ?>

        <?php echo $this -> loadTemplate('tag');?>

        <?php if ($useDefList) : ?>
          <div class="clr"></div>
            </div>
        <?php endif; ?>

        <?php if (!$this->print) : ?>
            <?php if ($canEdit ||  $params->get('show_print_icon') || $params->get('show_email_icon')) : ?>
                <div class="TzIcon">
                    <div class="btn-group pull-right">
                        <a class="btn dropdown-toggle" data-toggle="dropdown" href="#"> <i class="icon-cog"></i> <span class="caret"></span> </a>
                        <?php // Note the actions class is deprecated. Use dropdown-menu instead. ?>
                        <ul class="dropdown-menu actions">
                            <?php if ($params->get('show_print_icon')) : ?>
                                <li class="print-icon"> <?php echo JHtml::_('icon.print_popup',  $this->item, $params); ?> </li>
                            <?php endif; ?>
                            <?php if ($params->get('show_email_icon')) : ?>
                                <li class="email-icon"> <?php echo JHtml::_('icon.email',  $this->item, $params); ?> </li>
                            <?php endif; ?>
                            <?php if ($canEdit) : ?>
                                <li class="edit-icon"> <?php echo JHtml::_('icon.edit', $this->item, $params); ?> </li>
                            <?php endif; ?>
                        </ul>
                    </div>
                </div>
            <?php endif; ?>
        <?php else : ?>
            <div class="pull-right">
                <?php echo JHtml::_('icon.print_screen',  $this->item, $params); ?>
            </div>
        <?php endif; ?>

         <hr class="line-hr">
		 {easy-sharethis}

        <?php  if (!$params->get('show_intro')) :
            echo $this->item->event->afterDisplayTitle;
        endif; ?>

        <?php if (isset ($this->item->toc)) : ?>
            <?php echo $this->item->toc; ?>
        <?php endif; ?>

        <?php if (isset($urls) AND ((!empty($urls->urls_position) AND ($urls->urls_position=='0')) OR  ($params->get('urls_position')=='0' AND empty($urls->urls_position) ))
                OR (empty($urls->urls_position) AND (!$params->get('urls_position')))): ?>
            <?php echo $this->loadTemplate('links'); ?>
        <?php endif; ?>

    <?php if ($params->get('access-view')):?>

        <?php
        if (!empty($this->item->pagination) AND $this->item->pagination AND !$this->item->paginationposition AND !$this->item->paginationrelative):
            echo $this->item->pagination;
         endif;
        ?>

        <?php $this -> item -> text = trim($this -> item -> text);
            $this -> item -> fulltext = trim($this -> item -> fulltext);?>
        <?php if(!empty($this -> item -> text)):?>
        <div class="TzArticleDescription">
              <?php echo $this -> item -> text;?>
        </div>
        <?php endif;?>

		{easy-sharethis}
        <hr class="line-hr">

        <?php if ($params->get('show_modify_date',1)) : ?>
            <div class="TzArticleInfoBottom">
                <?php if ($params->get('show_hits',1)) : ?>
                <span class="TzHits font-italic">
                    <?php echo JText::_('TZ_READ'); ?>
                    <?php echo JText::sprintf($this->item->hits); ?>
                    <?php echo JText::_('TZ_READ_TIME'); ?>
                </span>
                <?php endif; ?>
                <?php if ($params->get('show_modify_date',1)) : ?>
                <span class="TzModified font-italic">
                     <?php echo JText::_('TZ_DATE_MODIFIED'); ?>
                    <?php echo JText::sprintf(JHtml::_('date', $this->item->modified, JText::_('DATE_FORMAT_LC2'))); ?>
                </span>

                <?php endif; ?>
            </div>
        <?php endif; ?>

        <?php echo $this -> loadTemplate('social_network');?>


        <?php echo $this -> loadTemplate('attachments');?>



        <?php echo $this -> loadTemplate('gmap');?>

        <?php
            require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'users'.DIRECTORY_SEPARATOR.'default_author.php');
        ?>

        <h3 class="TzCommentTitle"><?php echo JText::_('COM_TZ_PORTFOLIO_COMMENT_TITLE');?></h3>
        <?php echo $this -> item -> event -> onTZPortfolioCommentDisplay;?>

    <?php echo $this -> loadTemplate('extra_fields');?>


    <?php echo $this -> loadTemplate('related');?>

        </div>

       <?php if (!empty($this->item->pagination) AND $this->item->pagination AND $this->item->paginationposition AND !$this->item->paginationrelative): ?>
            <div class="item-portfolio-bottom">
                <?php if ($params->get('show_title',1)) : ?>
                <h5 class="TzArticleTitle">
                <?php echo $this->escape($this->item->title); ?>
                </h5>
                <?php endif; ?>
             <?php
                echo $this->item->pagination;?>
                <div class="clr"></div>
            </div>

        <?php endif; ?>

        <?php if (isset($urls) AND ((!empty($urls->urls_position)  AND ($urls->urls_position=='1')) OR ( $params->get('urls_position')=='1') )): ?>
            <?php echo $this->loadTemplate('links'); ?>
        <?php endif; ?>
            <?php //optional teaser intro text for guests ?>
        <?php elseif ($params->get('show_noauth') == true and  $user->get('guest') ) : ?>
            <?php echo $this->item->introtext; ?>
            <?php //Optional link to let them register to see the whole article. ?>
            <?php if ($params->get('show_readmore') && $this->item->fulltext != null) :
                $link1 = JRoute::_('index.php?option=com_users&view=login');
                $link = new JURI($link1);?>
                <p class="readmore">
                <?php if($params -> get('tz_use_lightbox') == 1):?>
                <a href="<?php echo $link; ?>">
                <?php endif;?>

                <?php $attribs = json_decode($this->item->attribs);  ?>
                <?php
                if ($attribs->alternative_readmore == null) :
                    echo JText::_('COM_CONTENT_REGISTER_TO_READ_MORE');
                elseif ($readmore = $this->item->alternative_readmore) :
                    echo $readmore;
                    if ($params->get('show_readmore_title', 0) != 0) :
                        echo JHtml::_('string.truncate', ($this->item->title), $params->get('readmore_limit'));
                    endif;
                elseif ($params->get('show_readmore_title', 0) == 0) :
                    echo JText::sprintf('COM_CONTENT_READ_MORE_TITLE');
                else :
                    echo JText::_('COM_CONTENT_READ_MORE');
                    echo JHtml::_('string.truncate', ($this->item->title), $params->get('readmore_limit'));
                endif; ?>
                <?php if($params -> get('tz_use_lightbox') == 1):?>
                </a>
                <?php endif;?>
                </p>
            <?php endif; ?>
        <?php endif; ?>



        <?php
        if (!empty($this->item->pagination) AND $this->item->pagination AND $this->item->paginationposition AND $this->item->paginationrelative):
             echo $this->item->pagination;?>
        <?php endif; ?>

        <?php echo $this->item->event->afterDisplayContent; ?>
    </div>
</div>
<script src="templates/<?php echo $template; ?>/js/fluidvids.js" type="text/javascript"></script>
<script type="text/javascript">
    jQuery(window).bind('load resize', function(){
        var left_width =  jQuery('.ja-sidebar').outerWidth();

        var win_width = jQuery('#ja-mainbody').width();
//        alert(win_width);
        main_width = win_width - left_width;
        jQuery('#ja-content').css('width',main_width);
        jQuery('#ja-mainbody').css('background-color','#eee');
    });
</script>