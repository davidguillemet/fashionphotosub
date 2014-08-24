<?php

// no direct access
defined('_JEXEC') or die;
jimport('joomla.plugin.plugin');
jimport('joomla.html.parameter');

/**
 * DGUI Images Search plugin
 */
class plgSearchDGUI_Images extends JPlugin
{
    protected static $lookup;
	/**
	 * @return array An array of search areas
	 */
	function onContentSearchAreas()
	{
        JPlugin::loadLanguage('fr-FR.plg_search_dgui_images', JPATH_ADMINISTRATOR);
		static $areas = array(
			'dgui_images' => 'JGLOBAL_ARTICLES'
			);
			return $areas;
	}

	/**
	 * Content Search method
	 * The sql must return the following fields that are used in a common display
	 * routine: href, title, section, created, text, browsernav
	 * @param string Target search string
	 * @param string mathcing option, exact|any|all
	 * @param string ordering option, newest|oldest|popular|alpha|category
	 * @param mixed An array if the search it to be restricted to areas, null if search all
	 */
	function onContentSearch($text, $phrase='', $ordering='', $areas=null)
	{
		$db		= JFactory::getDbo();
		$app	= JFactory::getApplication();
		$user	= JFactory::getUser();
		$groups	= implode(',', $user->getAuthorisedViewLevels());
		$tag = JFactory::getLanguage()->getTag();

		$searchText = $text;
		if (is_array($areas)) {
			if (!array_intersect($areas, array_keys($this->onContentSearchAreas()))) {
				return array();
			}
		}

		$sContent		= $this->params->get('search_content',		1);
		$sArchived		= $this->params->get('search_archived',		1);
		$limit			= $this->params->def('search_limit',		50);

		$nullDate		= $db->getNullDate();
		$date = JFactory::getDate();
		$now = $date->toSql();

		$text = trim($text);
		if ($text == '') {
			return array();
		}

		$wheres = array();
		switch ($phrase) {
			case 'exact':
				$text		= $db->Quote('%'.$db->escape($text, true).'%', false);
				$wheres2	= array();
				$wheres2[]	= 'a.title LIKE '.$text;
				$wheres2[]	= 'a.metadata LIKE '.$text;
				$where		= '(' . implode(') OR (', $wheres2) . ')';
				break;

			case 'all':
			case 'any':
			default:
				$words = explode(' ', $text);
				$wheres = array();
				foreach ($words as $word) {
					$word		= $db->Quote('%'.$db->escape($word, true).'%', false);
					$wheres2	= array();
					$wheres2[]	= 'a.title LIKE '.$word;
					$wheres2[]	= 'a.metadata LIKE '.$word;
					$wheres[]	= implode(' OR ', $wheres2);
				}
				$where = '(' . implode(($phrase == 'all' ? ') AND (' : ') OR ('), $wheres) . ')';
				break;
		}

		$morder = '';
		switch ($ordering) {
			case 'alpha':
				$order = 'a.title ASC';
				break;

			case 'newest':
			default:
				$order = 'a.date DESC';
				break;
		}

		$rows = array();
		$query	= $db->getQuery(true);

		// search images
		if ($sContent && $limit > 0)
		{
			$query->clear();

			$query->select('a.title AS title');
			$query->select($query->concatenate(array('"images/"', 'a.filepath', '"/"', 'a.filename')).' AS image');

			$query->from('#__phocagallery AS a');
			$query->where('(' . $where . ')' . ' AND a.published = 1');
			$query->order($order);

			$db->setQuery($query, 0, $limit);
			$list = $db->loadObjectList();
			$limit -= count($list);

			$baseUri = JURI::base( true );
			if (isset($list))
			{
				foreach($list as $key => $item)
				{
					$list[$key]->href = $baseUri . "/" . $item->image;
				}
			}
			$rows[] = $list;
		}

		$results = array();
		
		if (count($rows))
		{
			foreach($rows as $row)
			{
				$new_row = array();
				foreach($row as $key => $article) {
					$new_row[] = $article;
				}
				$results = array_merge($results, (array) $new_row);
			}
		}

		return $results;
	}
}
