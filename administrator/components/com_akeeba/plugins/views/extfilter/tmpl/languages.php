<?php
/**
 * @package AkeebaBackup
 * @copyright Copyright (c)2009-2014 Nicholas K. Dionysopoulos
 * @license GNU General Public License version 3, or later
 *
 * @since 2.1
 */

// Protect from unauthorized access
defined('_JEXEC') or die();

JLoader::import('joomla.html.html');
JHtml::_('behavior.framework');

?>
<div class="alert alert-info">
	<strong><?php echo JText::_('CPANEL_PROFILE_TITLE'); ?>: #<?php echo $this->profileid; ?></strong>
	<?php echo $this->profilename; ?>
</div>

<table class="table table-striped" width="100%">
	<thead>
		<tr>
			<th width="50px"><?php echo JText::_('EXTFILTER_LABEL_STATE'); ?></th>
			<th><?php echo JText::_('EXTFILTER_LABEL_LANGUAGE'); ?></th>
			<th><?php echo JText::_('EXTFILTER_LABEL_AREA'); ?></th>
		</tr>
	</thead>
	<tfoot>
		<tr>
			<td colspan="3">&nbsp;</td>
		</tr>
	</tfoot>
	<tbody>
	<?php
	$i = 0;
	foreach($this->languages as $language):
	$i++;
	$link = JURI::base().'index.php?option=com_akeeba&view=extfilter&task=toggleLanguage&item='.$language['item'].'&root='.$language['root'].'&random='.time();
	$area = ($language['root'] == 'frontend') ? JText::_('EXTFILTER_LABEL_FRONTEND') : JText::_('EXTFILTER_LABEL_BACKEND');
	if($language['status'])
	{
		if(version_compare(JVERSION, '3.0', 'lt')) {
			$image = JHTML::_('image.administrator', 'admin/publish_x.png');
		} else {
			$image = '<i class="icon-unpublish"></i>';
		}
		$html = '<b>'.$language['language'].'</b>';
	}
	else
	{
		if(version_compare(JVERSION, '3.0', 'lt')) {
			$image = JHTML::_('image.administrator', 'admin/tick.png');
		} else {
			$image = '<i class="icon-publish"></i>';
		}
		$html = $language['language'];
	}

	?>
		<tr class="row<?php echo $i%2; ?>">
			<td style="text-align: center;"><a href="<?php echo $link ?>"><?php echo $image ?></a></td>
			<td><a href="<?php echo $link ?>"><?php echo $html ?></a></td>
			<td><?php echo $area ?></td>
		</tr>
	<?php
	endforeach;
	?>
	</tbody>
</table>