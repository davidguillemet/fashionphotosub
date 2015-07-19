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
defined('_JEXEC') or die('Restricted access');
$params = $this -> item -> params;
//$url    = JURI::getInstance() -> toString();
$url    = JUri::base().JRoute::_(TZ_PortfolioHelperRoute::getArticleRoute($this -> item -> slug,$this -> item -> catid));
?>
<?php if(($params -> get('show_twitter_button',1) == 1) OR ($params -> get('show_facebook_button',1) == 1)
         OR ($params -> get('show_google_button',1) == 1)):?>
    <div class="tz_portfolio_like_button">
<!--        <div class="TzAdd"></div>-->

        <div class="TzLikeButtonInner">
            <span class="TzLikeQuestion font-light"><?php echo JText::_('COM_TZ_PORTFOLIO_SOCIAL_QUESTION_TPL');?></span>
            <?php if($params -> get('show_facebook_button',1) == 1): ?>
                <!-- Facebook Button -->
                <div class="FacebookButton">
                    <iframe src="//www.facebook.com/plugins/like.php?href=<?php echo $url;?>&amp;width=80&amp;height=21&amp;colorscheme=light&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;send=false" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:120px; height:21px;" allowTransparency="true"></iframe>
                </div>
            <?php endif; ?>

            <?php if($params -> get('show_twitter_button',1) == 1): ?>
                <!-- Twitter Button -->
                <div class="TwitterButton">
                    <a href="<?php echo $url;?>" class="twitter-share-button"
                       data-count="horizontal"<?php //if($this->item->params->get('twitterUsername')): ?>
                       data-via="<?php //echo $this->item->params->get('twitterUsername'); ?>"<?php //endif; ?>
                                data-size="small">
                        <?php //echo JText::_('K2_TWEET'); ?>
                    </a>
                    <script type="text/javascript" src="//platform.twitter.com/widgets.js"></script>
                </div>
            <?php endif; ?>

            <?php if($params -> get('show_google_button',1) == 1): ?>
                <!-- Google +1 Button -->

                <div class="GooglePlusOneButton">
                    <!-- Place this tag where you want the +1 button to render. -->
                    <div class="g-plusone" data-size="medium" data-href="<?php echo $url?>"></div>

                    <!-- Place this tag after the last +1 button tag. -->
                    <script type="text/javascript">
                      (function() {
                        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
                        po.src = 'https://apis.google.com/js/plusone.js';
                        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
                      })();
                    </script>
                </div>
            <?php endif; ?>
            <div class="clearfix"></div>
        </div>
    </div>
<?php endif; ?>