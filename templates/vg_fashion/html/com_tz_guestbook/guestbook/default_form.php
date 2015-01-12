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
JHtml::addIncludePath(JPATH_COMPONENT . '/helpers/html');
?>

{slider <p style="text-align:center; margin-bottom: 0px; font-size: 24px;"><i class="icon-edit"></i>&nbsp;<?php echo JText::_("COM_TZ_GUESTBOOK_SING_GUESTBOOK"); ?></p>|closed|guestbook}
<div id="warp-fom">
	<form ACTION="" method="POST">
		
		<div class="guestbook-form-container">
		<div class="guestbook-col1">
			
			<div class="warp-in">
				<input id="warp-input1" class="conten-input tz_check_name mandatory" type="text" name="name"
					maxlength="<?php echo $this->count_name; ?>"
					<?php if (isset($this->auth->name) && $this->auth->name != ""): ?>
						value="<?php echo $this->auth->name; ?>"
					<?php else : ?>
						value="<?php echo JText::_("COM_TZ_GUESTBOOK_FULL_NAME"); ?>"
					<?php endif; ?>
				/>

				<p class="guestbook-warning"><span class="tz_input_name" id="pname"></span></p>
			</div>

			<div class="warp-in">
				<input id="warp-input2" class="conten-input tz_check_email mandatory" type="text" name="email"
					maxlength="<?php echo $this->count_email; ?>"
					<?php if (isset($this->auth->email) && $this->auth->email != "") : ?>
						value="<?php echo $this->auth->email; ?>"
					<?php else : ?>
						value="<?php echo JText::_("COM_TZ_GUESTBOOK_EMAIL"); ?>"
					<?php endif; ?>
				/>
			</div>
			
			<div id="nnt_com1" class="warp-in">
				<label id="warp-label" for="warp-check">
					<input id="warp-check" type="checkbox" name="check" value="1"/>
					<?php echo JText::_("COM_TZ_GUESTBOOK_SHOW_EMIAL_IN_PUBLIC"); ?>
				</label>
				<p class="guestbook-warning"><span class="tz_input_email" id="pemail"></span></p>
			</div>
			
			<div class="warp-in">
				
				<input id="warp-input4" class="conten-input tz_check_website" type="text" name="website"
					maxlength="<?php echo $this->count_web; ?>" value="<?php echo JText::_("COM_TZ_GUESTBOOK_WEBSITE"); ?>"/>
				<p class="guestbook-warning"><span class="tz_input_website" id="p_website"></span></p>
			</div>
			
			<div class="warp-in">
				
				<input id="warp-input3" class="conten-input tz_check_title mandatory" type="text" name="title"
					maxlength="<?php echo $this->count_tit; ?>"
					value="<?php echo JText::_("COM_TZ_GUESTBOOK_TITLE"); ?>"/>
				<p class="guestbook-warning"><span class="tz_input_title" id="ptitle"></span></p>
			</div>
		</div>
			
		<div class="guestbook-col2">
			<div class="warp-in">
				<textarea name="conten" id="text-ra" class="mandatory"
					maxlength="<?php echo $this->count_comm; ?>"><?php echo JText::_("COM_TZ_GUESTBOOK_YOUR_GUESTBOOK"); ?></textarea>

				<p class="tz_input_comment" id="p_nntconten"></p>
				<input type="hidden" id="checkcapcha" name="checkcapcha" value="<?php echo $this->capchat; ?>"/>
			</div>
		</div>
		</div>

		<?php if (isset($this->capchat) and $this->capchat == 1) : ?>
			<div class="warp-in-capchat">
				<div id="nnt-comment-label-capchat">
					<?php echo $this->form->getLabel('captcha'); ?>
				</div>
			<div id="nnt-comment-input-capchat">
		<?php echo $this->form->getInput('captcha'); ?>
			</div>
				<div class="clearr"></div>
					<div id="nnt-comment-input-loi-capchat">
						<p id="nnt_p_capchar"></p>
					</div>
				</div>
		<?php endif; ?>
		<input type="hidden" id="jform_mycategory" name="category" value="11"><!-- Uncategorized -->
		<div class="warp-in2">
			<input id="warp-input-sub" type="button" name="send"
				value="<?php echo JText::_("COM_TZ_GUESTBOOK_SEND_GUESTBOOK"); ?>"/>
		</div>
	</form>
</div>
{/sliders}


<div id="tz-Guestbook-warp">
	<div id="tz-Guestbook"></div>
	<div id="tz-Guestbook-seccess">
		<span>
			<?php if (isset($this->hstatus) && $this->hstatus == 1) :
				echo JText::_("COM_TZ_GUESTBOOK_NOTICE");
					else :
				echo JText::_("COM_TZ_GUESTBOOK_NOTICE_2");
			endif; ?>
			<i class="icon-emo-beer"></i>
		</span>
	</div>

	<div class="clre"></div>
</div>