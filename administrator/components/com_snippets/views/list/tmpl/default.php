<?php
/**
 * List View Template: Default
 *
 * @package         Snippets
 * @version         3.3.3
 *
 * @author          Peter van Westen <peter@nonumber.nl>
 * @link            http://www.nonumber.nl
 * @copyright       Copyright © 2014 NoNumber All Rights Reserved
 * @license         http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

defined('_JEXEC') or die;

// Include the component HTML helpers.
JHtml::addIncludePath(JPATH_COMPONENT . '/helpers/html');
JHtml::_('behavior.tooltip');
JHtml::_('script', 'system/multiselect.js', false, true);

JHtml::stylesheet('nnframework/style.min.css', false, true);
JHtml::stylesheet('contenttemplater/style.min.css', false, true);

$listOrder = $this->escape($this->state->get('list.ordering'));
$listDirn = $this->escape($this->state->get('list.direction'));
$ordering = ($listOrder == 'a.ordering');

$sortFields = $this->getSortFields();

$editor = JFactory::getEditor();

$user = JFactory::getUser();
$canCreate = $user->authorise('core.create', 'com_snippets');
$canEdit = $user->authorise('core.edit', 'com_snippets');
$canChange = $user->authorise('core.edit.state', 'com_snippets');
$canCheckin = $user->authorise('core.manage', 'com_checkin');
$saveOrder = ($listOrder == 'a.ordering');
if ($saveOrder)
{
	$saveOrderingUrl = 'index.php?option=com_snippets&task=list.saveOrderAjax&tmpl=component';
	JHtml::_('sortablelist.sortable', 'itemList', 'adminForm', strtolower($listDirn), $saveOrderingUrl);
}

$cols = 7;

// Version check
require_once JPATH_PLUGINS . '/system/nnframework/helpers/versions.php';
if ($this->config->show_update_notification)
{
	echo NNVersions::getInstance()->getMessage('snippets', '', '', 'component');
}
?>
	<script type="text/javascript">
		Joomla.orderTable = function()
		{
			table = document.getElementById("sortTable");
			direction = document.getElementById("directionTable");
			order = table.options[table.selectedIndex].value;
			if (order != '<?php echo $listOrder; ?>') {
				dirn = 'asc';
			} else {
				dirn = direction.options[direction.selectedIndex].value;
			}
			Joomla.tableOrdering(order, dirn, '');
		}
	</script>
	<form action="<?php echo JRoute::_('index.php?option=com_snippets&view=list'); ?>" method="post" name="adminForm" id="adminForm">
		<div id="filter-bar" class="btn-toolbar">
			<div class="filter-search btn-group pull-left">
				<label for="filter_search" class="element-invisible"><?php echo JText::_('JSEARCH_FILTER'); ?></label>
				<input type="text" name="filter_search" placeholder="<?php echo JText::_('JSEARCH_FILTER'); ?>" id="filter_search" value="<?php echo $this->escape($this->state->get('filter.search')); ?>" title="<?php echo JText::_('JSEARCH_FILTER'); ?>" />
			</div>
			<div class="btn-group pull-left hidden-phone">
				<button class="btn tip" type="submit" rel="tooltip" title="<?php echo JText::_('JSEARCH_FILTER_SUBMIT'); ?>">
					<span class="icon-search"></span></button>
				<button class="btn tip" type="button" rel="tooltip" onclick="document.id('filter_search').value='';this.form.submit();" title="<?php echo JText::_('JSEARCH_FILTER_CLEAR'); ?>">
					<span class="icon-remove"></span></button>
			</div>
			<div class="btn-group pull-right hidden-phone">
				<label for="limit" class="element-invisible"><?php echo JText::_('JFIELD_PLG_SEARCH_SEARCHLIMIT_DESC'); ?></label>
				<?php echo $this->pagination->getLimitBox(); ?>
			</div>
			<div class="btn-group pull-right hidden-phone">
				<label for="directionTable" class="element-invisible"><?php echo JText::_('JFIELD_ORDERING_DESC'); ?></label>
				<select name="directionTable" id="directionTable" class="input-medium" onchange="Joomla.orderTable()">
					<option value=""><?php echo JText::_('JFIELD_ORDERING_DESC'); ?></option>
					<option value="asc" <?php echo $listDirn == 'asc' ? 'selected="selected"' : ''; ?>><?php echo JText::_('JGLOBAL_ORDER_ASCENDING'); ?></option>
					<option value="desc" <?php echo $listDirn == 'desc' ? 'selected="selected"' : ''; ?>><?php echo JText::_('JGLOBAL_ORDER_DESCENDING'); ?></option>
				</select>
			</div>
			<div class="btn-group pull-right">
				<label for="sortTable" class="element-invisible"><?php echo JText::_('JGLOBAL_SORT_BY'); ?></label>
				<select name="sortTable" id="sortTable" class="input-medium" onchange="Joomla.orderTable()">
					<option value=""><?php echo JText::_('JGLOBAL_SORT_BY'); ?></option>
					<?php echo JHtml::_('select.options', $sortFields, 'value', 'text', $listOrder); ?>
				</select>
			</div>
		</div>
		<div class="clearfix"></div>

		<table class="table table-striped" id="itemList">
			<thead>
				<tr>
					<th width="1%" class="nowrap center hidden-phone">
						<?php echo JHtml::_('grid.sort', '<span class="icon-menu-2"></span>', 'a.ordering', $listDirn, $listOrder, null, 'asc', 'JGRID_HEADING_ORDERING'); ?>
					</th>
					<th width="1%" class="hidden-phone">
						<input type="checkbox" name="checkall-toggle" value="" title="<?php echo JText::_('JGLOBAL_CHECK_ALL'); ?>" onclick="Joomla.checkAll(this)" />
					</th>
					<th width="1%" class="nowrap center">
						<?php echo JHtml::_('grid.sort', 'JSTATUS', 'a.published', $listDirn, $listOrder); ?>
					</th>
					<th class="title">
						<?php echo JHtml::_('grid.sort', 'SNP_SNIPPET_ID', 'a.alias', $listDirn, $listOrder); ?>
					</th>
					<th class="title">
						<?php echo JHtml::_('grid.sort', 'JGLOBAL_TITLE', 'a.name', $listDirn, $listOrder); ?>
					</th>
					<th class="title hidden-phone">
						<?php echo JHtml::_('grid.sort', 'JGLOBAL_DESCRIPTION', 'a.description', $listDirn, $listOrder); ?>
					</th>
					<th width="1%" class="nowrap center hidden-phone">
						<?php echo JHtml::_('grid.sort', 'JGRID_HEADING_ID', 'a.id', $listDirn, $listOrder); ?>
					</th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<td colspan="<?php echo $cols; ?>">
						<?php echo $this->pagination->getListFooter(); ?>
					</td>
				</tr>
			</tfoot>
			<tbody>
				<?php if (empty($this->list)): ?>
					<tr>
						<td colspan="<?php echo $cols; ?>">
							<?php echo JText::_('NN_NO_ITEMS_FOUND'); ?>
						</td>
					</tr>
				<?php else: ?>

					<?php foreach ($this->list as $i => $item) :
						$canCheckinItem = ($canCheckin || $item->checked_out == 0 || $item->checked_out == $user->get('id'));
						$canChangeItem = ($canChange && $canCheckinItem);
						?>
						<tr class="row<?php echo $i % 2; ?>" sortable-group-id="ct">
							<td class="order nowrap center hidden-phone">
								<?php if ($canChange) :
									$disableClassName = '';
									$disabledLabel = '';
									if (!$saveOrder) :
										$disabledLabel = JText::_('JORDERINGDISABLED');
										$disableClassName = 'inactive tip-top';
									endif; ?>
									<span class="sortable-handler <?php echo $disableClassName ?>" rel="tooltip" title="<?php echo $disabledLabel ?>">
										<span class="icon-menu"></span>
									</span>
									<input type="text" style="display:none" name="order[]" size="5" value="<?php echo $item->ordering; ?>" class="width-20 text-area-order" />
								<?php else : ?>
									<span class="sortable-handler inactive">
										<span class="icon-menu"></span>
									</span>
								<?php endif; ?>
							</td>
							<td class="center hidden-phone">
								<?php echo JHtml::_('grid.id', $i, $item->id); ?>
							</td>
							<td class="center center">
								<?php echo JHtml::_('jgrid.published', $item->published, $i, 'list.', $canChangeItem); ?>
							</td>
							<td>
								<?php if ($item->checked_out) : ?>
									<?php echo JHtml::_('jgrid.checkedout', $i, $editor, $item->checked_out_time, 'list.', $canCheckin); ?>
								<?php endif; ?>
								<?php if ($canEdit) : ?>
									<a href="<?php echo JRoute::_('index.php?option=com_snippets&task=item.edit&id=' . $item->id); ?>">
										<?php echo $this->escape(str_replace(JURI::root(), '', $item->alias)); ?></a>
								<?php else : ?>
									<?php echo $this->escape(str_replace(JURI::root(), '', $item->alias)); ?>
								<?php endif; ?>
							</td>
							<td>
								<?php echo $this->escape($item->name); ?>
							</td>
							<td class="hidden-phone">
								<?php
								$description = explode('---', $item->description);
								$descr = nl2br($this->escape(trim($description['0'])));
								if (isset($description['1']))
								{
									$descr = '<span rel="tooltip" title="' . makeTooltipSafe(trim($description['1'])) . '">' . $descr . '</span>';
								}
								echo $descr;
								?>
							</td>
							<td class="center hidden-phone">
								<?php echo (int) $item->id; ?>
							</td>
						</tr>
					<?php endforeach; ?>
				<?php endif; ?>
			</tbody>
		</table>

		<input type="hidden" name="task" value="" />
		<input type="hidden" name="boxchecked" value="0" />
		<input type="hidden" name="filter_order" value="<?php echo $listOrder; ?>" />
		<input type="hidden" name="filter_order_Dir" value="<?php echo $listDirn; ?>" />
		<?php echo JHtml::_('form.token'); ?>
	</form>

<?php
// PRO Check
require_once JPATH_PLUGINS . '/system/nnframework/helpers/licenses.php';
echo NNLicenses::getInstance()->getMessage('SNIPPETS', 0);

// Copyright
echo NNVersions::getInstance()->getCopyright('SNIPPETS', '', 13003, 'snippets', 'component');

function makeTooltipSafe($str)
{
	return str_replace(
		array('"', '::', "&lt;", "\n"),
		array('&quot;', '&#58;&#58;', "&amp;lt;", '<br />'),
		htmlentities(trim($str), ENT_QUOTES, 'UTF-8')
	);
}
