<?php
defined('_JEXEC') or die;

/**
 * ------------------------------------------------------------------
 * Software:		eorisis framework
 * @author		eorisis http://eorisis.com
 * @copyright	Copyright (C) 2012-2014 eorisis. All Rights Reserved.
 * ------------------------------------------------------------------
**/

class eorisis_jquery
{
	protected static $loaded;

	//	--------------------------------------------------

	public static function set_loaded($loaded) // $loaded array set onAfterInitialise
	{
		foreach ($loaded as $key => $value)
		{
			$loaded[$key] = filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
		}

		self::$loaded = $loaded;
	}

	public static function loaded($value = null)
	{
		if ($value)
		{
			return self::$loaded[$value];
		}
		else
		{
			return (object)self::$loaded;
		}
	}
}
