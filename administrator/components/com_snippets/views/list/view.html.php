<?php
/**
 * List View
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

jimport('joomla.application.component.view');

/**
 * List View
 */
class SnippetsViewList extends JViewLegacy
{
	protected $enabled;
	protected $list;
	protected $pagination;
	protected $state;
	protected $config;
	protected $parameters;

	/**
	 * Display the view
	 *
	 */
	public function display($tpl = null)
	{
		require_once JPATH_PLUGINS . '/system/nnframework/helpers/parameters.php';
		$this->parameters = NNParameters::getInstance();

		$this->enabled = SnippetsHelper::isEnabled();
		$this->list = $this->get('Items');
		$this->pagination = $this->get('Pagination');
		$this->state = $this->get('State');
		$this->config = $this->parameters->getComponentParams('snippets', $this->state->params);

		// Check for errors.
		if (count($errors = $this->get('Errors')))
		{
			JError::raiseError(500, implode("\n", $errors));
			return false;
		}

		$this->addToolbar();
		parent::display($tpl);
	}

	/**
	 * Add the page title and toolbar.
	 *
	 */
	protected function addToolbar()
	{
		$state = $this->get('State');
		$canDo = SnippetsHelper::getActions();

		$viewLayout = JFactory::getApplication()->input->get('layout', 'default');

		JHtml::stylesheet('nnframework/style.min.css', false, true);
		JHtml::stylesheet('com_snippets/style.min.css', false, true);

		if ($viewLayout == 'import')
		{
			// Set document title
			JFactory::getDocument()->setTitle(JText::_('SNIPPETS') . ': ' . JText::_('NN_IMPORT_ITEMS'));
			// Set ToolBar title
			JToolbarHelper::title(JText::_('SNIPPETS') . ': ' . JText::_('NN_IMPORT_ITEMS'), 'snippets icon-nonumber');
			// Set toolbar items for the page
			JToolBarHelper::back('JTOOLBAR_BACK', 'index.php?option=com_snippets');
		}
		else
		{
			// Set document title
			JFactory::getDocument()->setTitle(JText::_('SNIPPETS') . ': ' . JText::_('NN_LIST'));
			// Set ToolBar title
			JToolbarHelper::title(JText::_('SNIPPETS') . ': ' . JText::_('NN_LIST'), 'snippets icon-nonumber');
			// Set toolbar items for the page
			if ($canDo->get('core.create'))
			{
				JToolbarHelper::addNew('item.add');
			}
			if ($canDo->get('core.edit'))
			{
				JToolbarHelper::editList('item.edit');
			}
			if ($canDo->get('core.create'))
			{
				JToolbarHelper::custom('list.copy', 'copy', 'copy', 'JTOOLBAR_DUPLICATE', true);
			}
			if ($canDo->get('core.edit.state') && $state->get('filter.state') != 2)
			{
				JToolbarHelper::publish('list.publish', 'JTOOLBAR_PUBLISH', true);
				JToolbarHelper::unpublish('list.unpublish', 'JTOOLBAR_UNPUBLISH', true);
			}
			if ($canDo->get('core.delete') && $state->get('filter.state') == -2)
			{
				JToolbarHelper::deleteList('', 'list.delete', 'JTOOLBAR_EMPTY_TRASH');
			}
			else if ($canDo->get('core.edit.state'))
			{
				JToolbarHelper::trash('list.trash');
			}
			if ($canDo->get('core.create'))
			{
				JToolbarHelper::custom('list.export', 'box-remove', 'box-remove', 'NN_EXPORT');
				JToolbarHelper::custom('list.import', 'box-add', 'box-add', 'NN_IMPORT', false);
			}
			if ($canDo->get('core.admin'))
			{
				JToolbarHelper::preferences('com_snippets');
			}
		}
	}

	function maxlen($string = '', $maxlen = 60)
	{
		if (JString::strlen($string) > $maxlen)
		{
			$string = JString::substr($string, 0, $maxlen - 3) . '...';
		}
		return $string;
	}

	/**
	 * Returns an array of fields the table can be sorted by
	 *
	 * @return  array  Array containing the field name to sort by as the key and display text as value
	 *
	 * @since   3.0
	 */
	protected function getSortFields()
	{
		return array(
			'a.ordering' => JText::_('JGRID_HEADING_ORDERING'),
			'a.published' => JText::_('JSTATUS'),
			'a.alias' => JText::_('SNP_SNIPPET_ID'),
			'a.name' => JText::_('JGLOBAL_TITLE'),
			'a.description' => JText::_('JGLOBAL_DESCRIPTION'),
			'a.id' => JText::_('JGRID_HEADING_ID')
		);
	}
}
