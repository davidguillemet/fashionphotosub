<?php
/**
 * @package   AdminTools
 * @copyright Copyright (c)2010-2014 Nicholas K. Dionysopoulos
 * @license   GNU General Public License version 3, or later
 */

// Protect from unauthorized access
defined('_JEXEC') or die;

$config = $this->nginxconf;

JHTML::_('behavior.framework', true);

$this->loadHelper('select');

$nginxConfPath = rtrim(JPATH_ROOT, '/\\') . '/nginx.conf';

?>
<div class="alert alert-info">
	<p>
		<span class="icon icon-question-sign"></span>
		<strong>
			<?php echo JText::_('ATOOLS_LBL_NGINXMAKER_WILLTHISWORK'); ?>
		</strong>
	</p>
	<p>
		<?php if ($this->isSupported == 0): ?>
			<?php echo JText::_('ATOOLS_LBL_NGINXMAKER_WILLTHISWORK_NO'); ?>
		<?php elseif ($this->isSupported == 1): ?>
			<?php echo JText::_('ATOOLS_LBL_NGINXMAKER_WILLTHISWORK_YES'); ?>
		<?php else: ?>
			<?php echo JText::_('ATOOLS_LBL_NGINXMAKER_WILLTHISWORK_MAYBE'); ?>
		<?php endif;?>
	</p>
</div>

<div class="alert">
	<h3><?php echo JText::_('ATOOLS_LBL_NGINXMAKER_WARNING'); ?></h3>

	<p><?php echo JText::sprintf('ATOOLS_LBL_NGINXMAKER_WARNTEXT', $nginxConfPath); ?></p>

	<p><?php echo JText::_('ATOOLS_LBL_NGINXMAKER_TUNETEXT'); ?></p>
</div>

<form name="adminForm" id="adminForm" action="index.php" method="post"
	  class="form form-horizontal form-horizontal-wide">
<input type="hidden" name="option" value="com_admintools"/>
<input type="hidden" name="view" value="nginxmaker"/>
<input type="hidden" name="task" value="save"/>
<input type="hidden" name="<?php echo JFactory::getSession()->getFormToken(); ?>" value="1"/>

<!-- ======================================================================= -->
<fieldset>
	<legend><?php echo JText::_('ATOOLS_LBL_HTMAKER_BASICSEC') ?></legend>

	<div class="control-group">
		<label class="control-label" for="nodirlists"
			   class="control-label"><?php echo JText::_('ATOOLS_LBL_HTMAKER_NODIRLISTS'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('nodirlists', array('class' => 'input-small'), $config->nodirlists) ?>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="fileinj"><?php echo JText::_('ATOOLS_LBL_HTMAKER_FILEINJ'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('fileinj', array('class' => 'input-small'), $config->fileinj) ?>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="phpeaster"><?php echo JText::_('ATOOLS_LBL_HTMAKER_PHPEASTER'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('phpeaster', array('class' => 'input-small'), $config->phpeaster) ?>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="leftovers"><?php echo JText::_('ATOOLS_LBL_HTMAKER_LEFTOVERS'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('leftovers', array('class' => 'input-small'), $config->leftovers) ?>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="nohoggers"><?php echo JText::_('ATOOLS_LBL_HTMAKER_NOHOGGERS'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('nohoggers', array('class' => 'input-small'), $config->nohoggers) ?>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label"
			   for="hoggeragents"><?php echo JText::_('ATOOLS_LBL_HTMAKER_HOGGERAGENTS'); ?></label>

		<div class="controls">
			<textarea cols="80" rows="10" name="hoggeragents" id="hoggeragents"
					  class="input-wide"><?php echo implode("\n", $config->hoggeragents) ?></textarea>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="blockcommon"><?php echo JText::_('ATOOLS_LBL_HTMAKER_BLOCKCOMMON'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('blockcommon', array('class' => 'input-small'), $config->blockcommon) ?>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="enablesef"><?php echo JText::_('ATOOLS_LBL_HTMAKER_ENABLESEF'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('enablesef', array('class' => 'input-small'), $config->enablesef) ?>
		</div>
	</div>
</fieldset>
<!-- ======================================================================= -->
<fieldset>
	<legend><?php echo JText::_('ATOOLS_LBL_HTMAKER_SERVERPROT'); ?></legend>

	<h3><?php echo JText::_('ATOOLS_LBL_HTMAKER_SERVERPROT_TOGGLES'); ?></h3>

	<div class="control-group">
		<label class="control-label" for="backendprot"><?php echo JText::_('ATOOLS_LBL_HTMAKER_BACKENDPROT'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('backendprot', array('class' => 'input-small'), $config->backendprot) ?>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label"
			   for="frontendprot"><?php echo JText::_('ATOOLS_LBL_HTMAKER_FRONTENDPROT'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('frontendprot', array('class' => 'input-small'), $config->frontendprot) ?>
		</div>
	</div>

	<h3><?php echo JText::_('ATOOLS_LBL_HTMAKER_SERVERPROT_FINETUNE'); ?></h3>

	<div class="control-group">
		<label class="control-label" for="bepexdirs"><?php echo JText::_('ATOOLS_LBL_HTMAKER_BEPEXDIRS'); ?></label>

		<div class="controls">
			<textarea cols="80" rows="10" name="bepexdirs"
					  id="bepexdirs"><?php echo implode("\n", $config->bepexdirs) ?></textarea>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="bepextypes"><?php echo JText::_('ATOOLS_LBL_HTMAKER_BEPEXTYPES'); ?></label>

		<div class="controls">
			<textarea cols="80" rows="10" name="bepextypes"
					  id="bepextypes"><?php echo implode("\n", $config->bepextypes) ?></textarea>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="fepexdirs"><?php echo JText::_('ATOOLS_LBL_HTMAKER_FEPEXDIRS'); ?></label>

		<div class="controls">
			<textarea cols="80" rows="10" name="fepexdirs"
					  id="fepexdirs"><?php echo implode("\n", $config->fepexdirs) ?></textarea>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="fepextypes"><?php echo JText::_('ATOOLS_LBL_HTMAKER_FEPEXTYPES'); ?></label>

		<div class="controls">
			<textarea cols="80" rows="10" name="fepextypes"
					  id="fepextypes"><?php echo implode("\n", $config->fepextypes) ?></textarea>
		</div>
	</div>

	<h3><?php echo JText::_('ATOOLS_LBL_HTMAKER_SERVERPROT_EXCEPTIONS'); ?></h3>

	<div class="control-group">
		<label class="control-label"
			   for="exceptionfiles"><?php echo JText::_('ATOOLS_LBL_HTMAKER_EXCEPTIONFILES'); ?></label>

		<div class="controls">
			<textarea cols="80" rows="10" name="exceptionfiles"
					  id="exceptionfiles"><?php echo implode("\n", $config->exceptionfiles) ?></textarea>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label"
			   for="exceptiondirs"><?php echo JText::_('ATOOLS_LBL_HTMAKER_EXCEPTIONDIRS'); ?></label>

		<div class="controls">
			<textarea cols="80" rows="10" name="exceptiondirs"
					  id="exceptiondirs"><?php echo implode("\n", $config->exceptiondirs) ?></textarea>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label"
			   for="fullaccessdirs"><?php echo JText::_('ATOOLS_LBL_HTMAKER_FULLACCESSDIRS'); ?></label>

		<div class="controls">
			<textarea cols="80" rows="10" name="fullaccessdirs"
					  id="fullaccessdirs"><?php echo implode("\n", $config->fullaccessdirs) ?></textarea>
		</div>
	</div>
</fieldset>

<!-- ======================================================================= -->
<fieldset>
	<legend><?php echo JText::_('ATOOLS_LBL_HTMAKER_KITCHENSINK') ?></legend>
	<div class="control-group">
		<label class="control-label"
			   for="cfipfwd"><?php echo JText::_('ATOOLS_LBL_HTMAKER_CFIPFWD'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('cfipfwd', array('class' => 'input-small'), $config->cfipfwd) ?>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label"
			   for="opttimeout"><?php echo JText::_('ATOOLS_LBL_HTMAKER_OPTTIMEOUT'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('opttimeout', array('class' => 'input-small'), $config->opttimeout) ?>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label"
			   for="optsockets"><?php echo JText::_('ATOOLS_LBL_HTMAKER_OPTSOCKETS'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('optsockets', array('class' => 'input-small'), $config->optsockets) ?>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label"
			   for="opttcpperf"><?php echo JText::_('ATOOLS_LBL_HTMAKER_OPTTCPPERF'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('opttcpperf', array('class' => 'input-small'), $config->opttcpperf) ?>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label"
			   for="optoutbuf"><?php echo JText::_('ATOOLS_LBL_HTMAKER_OPTOUTBUF'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('optoutbuf', array('class' => 'input-small'), $config->optoutbuf) ?>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label"
			   for="optfhndlcache"><?php echo JText::_('ATOOLS_LBL_HTMAKER_OPTFHNDLCACHE'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('optoutbuf', array('class' => 'input-small'), $config->optfhndlcache) ?>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label"
			   for="encutf8"><?php echo JText::_('ATOOLS_LBL_HTMAKER_ENCUTF8'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('encutf8', array('class' => 'input-small'), $config->encutf8) ?>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label"
			   for="nginxsecurity"><?php echo JText::_('ATOOLS_LBL_HTMAKER_NGINXSECURITY'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('nginxsecurity', array('class' => 'input-small'), $config->nginxsecurity) ?>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label"
			   for="maxclientbody"><?php echo JText::_('ATOOLS_LBL_HTMAKER_MAXCLIENTBODY'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('maxclientbody', array('class' => 'input-small'), $config->maxclientbody) ?>
		</div>
	</div>

</fieldset>
<!-- ======================================================================= -->
<fieldset>
	<legend><?php echo JText::_('ATOOLS_LBL_HTMAKER_OPTUTIL'); ?></legend>
	<div class="control-group">
		<label class="control-label" for="fileorder"><?php echo JText::_('ATOOLS_LBL_HTMAKER_FILEORDER'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('fileorder', array('class' => 'input-small'), $config->fileorder) ?>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="exptime"><?php echo JText::_('ATOOLS_LBL_HTMAKER_EXPTIME'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('exptime', array('class' => 'input-small'), $config->exptime) ?>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label"
			   for="autocompress"><?php echo JText::_('ATOOLS_LBL_HTMAKER_AUTOCOMPRESS'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('autocompress', array('class' => 'input-small'), $config->autocompress) ?>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="wwwredir"><?php echo JText::_('ATOOLS_LBL_HTMAKER_WWWREDIR'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::wwwredirs('wwwredir', null, $config->wwwredir) ?>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="olddomain"><?php echo JText::_('ATOOLS_LBL_HTMAKER_OLDDOMAIN'); ?></label>

		<div class="controls">
			<input type="text" name="olddomain" id="olddomain" class="input-xlarge"
				   value="<?php echo $config->olddomain ?>">
		</div>
	</div>
	<div class="control-group">
		<label class="control=label" for="hstsheader"><?php echo JText::_('ATOOLS_LBL_HTMAKER_HSTSHEADER'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('hstsheader', array('class' => 'input-small'), $config->hstsheader) ?>
		</div>
	</div>
	<div class="control-group">
		<label class="control=label" for="noframe"><?php echo JText::_('ATOOLS_LBL_HTMAKER_NOFRAME'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::booleanlist('noframe', array('class' => 'input-small'), $config->noframe) ?>
		</div>
	</div>
</fieldset>
<!-- ======================================================================= -->
<fieldset>
	<legend><?php echo JText::_('ATOOLS_LBL_HTMAKER_SYSCONF'); ?></legend>
	<div class="control-group">
		<label class="control-label" for="httpshost"><?php echo JText::_('ATOOLS_LBL_HTMAKER_HTTPSHOST'); ?></label>

		<div class="controls">
			<input type="text" name="httpshost" id="httpshost" value="<?php echo $config->httpshost ?>">
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="httphost"><?php echo JText::_('ATOOLS_LBL_HTMAKER_HTTPHOST'); ?></label>

		<div class="controls">
			<input type="text" name="httphost" id="httphost" value="<?php echo $config->httphost ?>">
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="symlinks"><?php echo JText::_('ATOOLS_LBL_HTMAKER_SYMLINKS'); ?></label>

		<div class="controls">
			<?php echo AdmintoolsHelperSelect::symlinks('symlinks', array('class' => 'input-small'), $config->symlinks) ?>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="rewritebase"><?php echo JText::_('ATOOLS_LBL_HTMAKER_REWRITEBASE'); ?></label>

		<div class="controls">
			<input type="text" name="rewritebase" id="rewritebase" value="<?php echo $config->rewritebase ?>">
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="fastcgi_pass"><?php echo JText::_('ATOOLS_LBL_HTMAKER_FASTCGIPASS'); ?></label>

		<div class="controls">
			<input type="text" name="fastcgi_pass" id="fastcgi_pass" value="<?php echo $config->fastcgi_pass ?>">
		</div>
	</div>

	<div style="clear:left"></div>
</fieldset>
<!-- ======================================================================= -->
</form>