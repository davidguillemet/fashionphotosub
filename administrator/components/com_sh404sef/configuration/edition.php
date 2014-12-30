<?php
/**
 * sh404SEF - SEO extension for Joomla!
 *
 * @author      Yannick Gaultier
 * @copyright   (c) Yannick Gaultier 2014
 * @package     sh404SEF
 * @license     http://www.gnu.org/copyleft/gpl.html GNU/GPL
 * @version     4.4.6.2271
 * @date		2014-11-03
 */
class Sh404sefConfigurationEdition
{
	public static $id = 'full';
	public static $name = '';

	public static function is($edition)
	{
		return $edition == self::id;
	}
}
