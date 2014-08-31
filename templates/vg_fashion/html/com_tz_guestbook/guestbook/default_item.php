<?php
/*------------------------------------------------------------------------

# TZ Guestbook Extension

# ------------------------------------------------------------------------

# author    TuNguyenTemPlaza

# copyright Copyright (C) 2012 templaza.com. All Rights Reserved.

# @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL

# Websites: http://www.templaza.com

# Technical Support:  Forum - http://templaza.com/Forum

-------------------------------------------------------------------------*/
defined("_JEXEC") or die;
if (isset($this->display) && !empty($this->display)) :
    foreach ($this->display as $rr) : ?>
        <div class="warp-comment">
            <div class="nnt-warp-comment-class">
                <ul>
                    <?php if (isset($this->tit) && $this->tit == 1) : ?>
                        <li class="nnt-warl-comment-li-title">
                            <span>
                                <?php echo $rr->ctitle; ?>
                            </span>
                        </li>
                    <?php endif; ?>
                    <li class="nnt-warl-comment-li-comment">
                        <p>
                            <?php echo $rr->ccontent; ?>
                        </p>
                    </li>
                    <?php
                    if (isset($this->dat) && $this->dat == 1 || isset($this->nam) && $this->nam == 1) :?>
                        <li class="nnt-warl-comment-li-date-name">
							<?php
                    		if (isset($this->dat) && $this->dat == 1) :?>
                            <span class="nnt-warl-comment-li-date">
								<?php echo JText::sprintf(JHtml::_('date', $rr->cdate, JText::_('DATE_FORMAT_LC2'))); ?>
                            </span>
							<?php endif; ?>
							<?php
                    		if (isset($this->nam) && $this->nam == 1) :?>
                            <span class="nnt-warl-comment-li-name">
                                <?php echo $rr->cname; ?>
                            </span>
							<?php endif; ?>
							<!-- this spacer is mandatory to make sure the parent li is not collapsed because of the floated span elements -->
							<div class="spacer" style="clear: both;"></div>
                        </li>
                    <?php endif; ?>
                    <?php if ($rr->cpublic == 1) : ?>
                        <li class="nnt-warl-comment-li-mail">
                            <span>
                                <?php echo $rr->cemail; ?>
                            </span>
                        </li>
                    <?php endif; ?>
                    <?php
                    if (isset($this->fweb) && $this->fweb == 1 && !empty($rr->cwebsite)) :?>
                        <li class="nnt-warl-comment-li-site">
						<span>
                           <a target="_blank" href="<?php echo $rr->cwebsite; ?>" rel="nofollow">
                                <?php if (!empty($rr->cwebsite)) :
                                    echo $rr->cwebsite;
                                else :
                                    echo JText::_("COM_TZ_GUESTBOOK_NOT_WEBSITE_SITE");
                                endif;?>
                            </a>
						</span>
                        </li>
                    <?php endif; ?>
                </ul>
            </div>
        </div>
    <?php
    endforeach;
endif;
?>