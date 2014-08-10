<?php
defined('_JEXEC') or die;

/**
 * -------------------------------------------------------------------
 * Software:			eorisis jQuery
 * Software Type:	Joomla! System Plug-in
 * 
 * @author		eorisis http://eorisis.com
 * @copyright	Copyright (C) 2012-2014 eorisis. All Rights Reserved.
 * @license		GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
 * 
 * 'eorisis jQuery' is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * See /misc/licence.txt
 * -------------------------------------------------------------------
**/

if (!version_compare(JVERSION, 3, '>=')) { jimport('joomla.plugin.plugin'); }
require_once(JPATH_SITE.'/plugins/system/eorisis_jquery/framework/lib/eorisis.php');

//	--------------------------------------------------

class plgSystemEorisis_jQuery extends JPlugin
{
	protected $J3;
	protected $doc;
	protected $web_root;
	protected $web_root_relative;
	protected $scheme;
	protected $is_html;
	protected $is_admin;
	protected $jq_lib_version_default;

	//	--------------------------------------------------

	/**
	 * Constructor.
	 *
	 * @param   object  &$subject  The object to observe
	 * @param   array   $config    An array that holds the plugin configuration
	 *
	 * @since 1.5
	 */
	public function __construct(&$subject, $config)
	{
		parent::__construct($subject, $config);

		$this->J3 = version_compare(JVERSION, 3, '>=');
		$this->jq_lib_version_default = '1.11.1';
	}

	//	--------------------------------------------------

	function onAfterInitialise()
	{
		$this->doc = JFactory::getDocument();
		$this->is_html = ($this->doc->getType() == 'html');
		if (!$this->is_html) { return; }

		$this->is_admin = JFactory::getApplication()->isAdmin();

		$loaded = array(
			'lib' => false,
			'noconflict' => false
		);

		//	--------------------------------------------------
		//	URLs

		$this->web_root = JURI::root();
		$this->web_root_relative = rtrim(JURI::root(true), '/').'/';
		$this->scheme = $this->scheme();
		$host = $this->scheme.'://'.$this->fqdn();
		$this->web_root = $this->valid_url(strtolower($host.$this->web_root_relative));

		//	Local URLs: JS/CSS
		$main_url_js = $this->local_url('js');
		$main_url_css = $this->local_url('css');

		//	Local URLs: media
		$media_url_js = $main_url_js.'media/eorisis-jquery/';
		$media_url_css = $main_url_css.'media/eorisis-jquery/';

		//	--------------------------------------------------
		//	jQuery Library

		if (!$this->area('jquery_load_area', 1))
		{
			$jq_lib_version_choice = (int)$this->params->get('jq_lib_version_choice', 1);

			switch ($jq_lib_version_choice)
			{
				case 1: $field = 'jq_lib_version'; break;		 // Specific
				case 2: $field = 'jq_lib_version_custom'; break; // Custom
			}

			$jq_lib_version = null;
			$url_local = $media_url_js.'lib/jquery-'.$this->clean_version($this->params->get('jq_lib_version', $this->jq_lib_version_default)).'.min.js';

			//	Use Specific or Custom Version
			if ($jq_lib_version_choice != 0)
			{
				$jq_lib_version = $this->clean_version($this->params->get($field, $this->jq_lib_version_default));

				//	CDN Source (Specific or Custom Version)
				if ($this->params->get('jq_lib_source_specific', 1) and ($jq_lib_version != ''))
				{
					$js_type = '.min';

					if (($jq_lib_version_choice == 2) and
						($this->params->get('jq_lib_version_custom_type', 1) == 2))
					{
						$js_type = '';
					}

					switch ($this->params->get('jq_lib_source_specific_cdn', 1))
					{
						case 1: $url = '//code.jquery.com/jquery-'.$jq_lib_version.$js_type.'.js'; break; // jQuery CDN
						case 2: $url = '//ajax.googleapis.com/ajax/libs/jquery/'.$this->version_correction($jq_lib_version).'/jquery'.$js_type.'.js'; break; // Google Ajax API CDN
						case 3: $url = '//cdnjs.cloudflare.com/ajax/libs/jquery/'.$this->version_correction($jq_lib_version).'/jquery'.$js_type.'.js'; break; // CDNJS (CloudFlare) CDN
						case 4: $url = '//ajax.aspnetcdn.com/ajax/jQuery/jquery-'.$jq_lib_version.$js_type.'.js'; break; // Microsoft CDN
					}

					//	CDN Fallback
					if ($this->cdn_fallback('jq_lib_cdn_fallback', 0, $url)) { $url = $url_local; }
				}

				//	Locally Hosted
				else { $url = $url_local; }

				$this->doc->addScript($url);

				//	jQuery Loaded
				$loaded['lib'] = true;
			}

			//	Always Latest
			else
			{
				switch ($this->params->get('jq_lib_source_latest', 1))
				{
					case 1: $url = '//code.jquery.com/jquery-latest.min.js'; break; // jQuery CDN
					case 2: $url = '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js'; break; // Google Ajax API CDN
				}

				//	CDN Fallback
				if ($this->cdn_fallback('jq_lib_cdn_fallback', 0, $url)) { $url = $url_local; }

				$this->doc->addScript($url);

				//	jQuery Loaded
				$loaded['lib'] = true;
			}

			//	--------------------------------------------------
			//	Migrate

			$jq_migrate = $this->params->get('jq_migrate', 1);

			if ((($jq_migrate == 1) and ($jq_lib_version != null) and version_compare($jq_lib_version, '1.9.0', '>=')) or
				 ($jq_migrate == 2) or
				 !$jq_lib_version_choice)
			{
				$migrate_version = $this->clean_version($this->params->get('jq_migrate_version', '1.2.1'));
				$url_local = $media_url_js.'plugins/migrate/jquery-migrate-'.$migrate_version.'.min.js';

				//	CDN Source
				if ($this->params->get('jq_migrate_source', 1))
				{
					switch ($this->params->get('jq_migrate_source_cdn', 1))
					{
						case 1: $url = '//code.jquery.com/jquery-migrate-'.$migrate_version.'.min.js'; break; // jQuery CDN
						case 2: $url = '//cdnjs.cloudflare.com/ajax/libs/jquery-migrate/'.$migrate_version.'/jquery-migrate.min.js'; break; // CDNJS (CloudFlare) CDN
						case 3: $url = '//ajax.aspnetcdn.com/ajax/jquery.migrate/jquery-migrate-'.$migrate_version.'.min.js'; break; // Microsoft CDN
					}

					//	CDN Fallback
					if ($this->cdn_fallback('jq_migrate_cdn_fallback', 0, $url)) { $url = $url_local; }
				}

				//	Locally Hosted
				else { $url = $url_local; }

				$this->doc->addScript($url);
			}
		}

		//	--------------------------------------------------
		//	jQuery UI

		if (!$this->area('jquery_ui_load_area', 0))
		{
			$jq_ui_elem = $this->params->get('jq_ui_elem', 'js_css');

			if (!$this->params->get('jq_ui_custom', 0))
			{
				$jq_ui_version = $this->clean_version($this->params->get('jq_ui_version', '1.11.0'));
				$file = 'jquery-ui.min';

				$url_js_part = $jq_ui_version.'/'.$file.'.js';
				$url_css_part = $jq_ui_version.'/themes/'.preg_replace('/[^a-z-]+/', '', $this->params->get('jq_ui_theme', 'ui-lightness')).'/'.$file.'.css';

				$url_js_local = $media_url_js.'ui/'.$url_js_part;
				$url_css_local = $media_url_css.'ui/'.$url_css_part;

				//	CDN Source
				if ($this->params->get('jq_ui_source', 1))
				{
					switch ($this->params->get('jq_ui_source_cdn', 1))
					{
						case 1: $main_url = '//code.jquery.com/ui/'; break; // jQuery CDN
						case 2: $main_url = '//ajax.googleapis.com/ajax/libs/jqueryui/'; break; // Google Ajax API CDN
						case 3: $main_url = '//ajax.aspnetcdn.com/ajax/jquery.ui/'; break; // Microsoft CDN
					}

					$url_js = $main_url.$url_js_part;
					$url_css = $main_url.$url_css_part;

					//	CDN Fallback
					if ($this->cdn_fallback('jq_ui_cdn_fallback', 0, $url_js) and ($jq_ui_elem != 'css')) { $url_js = $url_js_local; }
					if ($this->cdn_fallback('jq_ui_cdn_fallback', 0, $url_css) and ($jq_ui_elem != 'js')) { $url_css = $url_css_local; }
				}
				else // Locally Hosted
				{
					$url_js = $url_js_local;
					$url_css = $url_css_local;
				}
			}
			else // Use Custom UI Files
			{
				$url_js = false;
				$jq_ui_custom_js = preg_replace('/[^a-zA-Z0-9\/._-]+/', '', $this->params->get('jq_ui_custom_js'));
				if (substr($jq_ui_custom_js, -3) == '.js')
				{
					$url_js = $main_url_js.ltrim($jq_ui_custom_js, '/');
				}

				$url_css = false;
				$jq_ui_custom_css = preg_replace('/[^a-zA-Z0-9\/._-]+/', '', $this->params->get('jq_ui_custom_css'));
				if (substr($jq_ui_custom_css, -4) == '.css')
				{
					$url_css = $main_url_css.ltrim($jq_ui_custom_css, '/');
				}
			}

			//	--------------------------------------------------

			$media = preg_replace('/[^a-z]+/', '', $this->params->get('jq_ui_css_media', 'null'));
			if ($media == 'null')
			{
				$media = null;
			}

			if ($url_js and $jq_ui_elem != 'css') { $this->doc->addScript($url_js); }
			if ($url_css and $jq_ui_elem != 'js') { $this->doc->addStyleSheet($url_css, 'text/css', $media); }
		}

		//	--------------------------------------------------
		//	Chosen

		if (!$this->area('jq_chosen_load_area', 0))
		{
			$chosen_version = $this->clean_version($this->params->get('jq_chosen_version', '0.9.14'));
			$url_local = $media_url_js.'plugins/chosen/'.$chosen_version.'/chosen.jquery.min.js';

			//	CDN Source
			if ($this->params->get('jq_chosen_source', 1))
			{
				//	CDNJS (CloudFlare) CDN
				$url = '//cdnjs.cloudflare.com/ajax/libs/chosen/'.$chosen_version.'/chosen.jquery.min.js';

				//	CDN Fallback
				if ($this->cdn_fallback('jq_chosen_cdn_fallback', 0, $url)) { $url = $url_local; }
			}

			//	Locally Hosted
			else { $url = $url_local; }

			$this->doc->addScript($url);
		}

		//	--------------------------------------------------
		//	Easing

		if (!$this->area('jq_easing_load_area', 0))
		{
			$url_local = $media_url_js.'plugins/easing/jquery.easing.min.js';

			//	CDN Source
			if ($this->params->get('jq_easing_source', 1))
			{
				//	CDNJS (CloudFlare) CDN
				$url = '//cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js';

				//	CDN Fallback
				if ($this->cdn_fallback('jq_easing_cdn_fallback', 0, $url)) { $url = $url_local; }
			}

			//	Locally Hosted
			else { $url = $url_local; }

			$this->doc->addScript($url);
		}

		//	--------------------------------------------------
		//	jQuery noConflict

		$jq_no_conflict = $this->params->get('jq_no_conflict', 1);

		if (($loaded['lib'] and ($jq_no_conflict == 1)) or
			($jq_no_conflict == 2))
		{
			$this->doc->addScript($media_url_js.'jquery-noconflict.js');

			//	jQuery noConflict is now set
			$loaded['noconflict'] = true;
		}

		//	--------------------------------------------------

		eorisis_jquery::set_loaded($loaded);
	}

	//	/onAfterInitialise
	//	--------------------------------------------------

	function onBeforeCompileHead()
	{
		if ($this->J3 and $this->is_html)
		{
			$unset = array();

			//	jQuery Library
			if (!$this->area('jquery_load_area', 1))
			{
				$unset = array(
					'jquery.min.js',
					'jquery-noconflict.js'
				);

				if (version_compare(JVERSION, '3.2', '>='))
				{
					$unset[] = 'jquery-migrate.min.js';
				}
			}

			//	Chosen
			if (!$this->area('jq_chosen_load_area', 0))
			{
				$unset[] = 'chosen.jquery.min.js';
//				$unset[] = 'ajax-chosen.min.js'; // TODO
			}

			//	--------------------------------------------------

			if (!empty($unset))
			{
				$head = $this->doc->getHeadData();
				$scripts = $head['scripts'];

				foreach ($unset as $file)
				{
					unset($scripts[$this->web_root_relative.'media/jui/js/'.$file]);
				}

				$head['scripts'] = $scripts;
				$this->doc->setHeadData($head);
			}
		}
	}

	//	--------------------------------------------------

	protected function area($field, $default)
	{
		$area = $this->params->get($field, $default);

		if (!$area or
			(($area == 1) and $this->is_admin) or
			(($area == 2) and !$this->is_admin))
		{
			return true;
		}
	}

	//	--------------------------------------------------

	protected function clean($data)
	{
		$data = trim($data);
		return filter_var($data, FILTER_SANITIZE_STRING);
	}

	//	--------------------------------------------------

	protected function valid_url($url)
	{
		if (filter_var($url, FILTER_VALIDATE_URL) !== false)
		{
			return $this->clean($url);
		}
	}

	//	--------------------------------------------------

	protected function clean_version($version)
	{
		$version = preg_replace('/[^0-9a-zA-Z.-]+/', '', $version);
		$version = str_replace('..', '', $version);

		if ($version != '.')
		{
			return $version;
		}

		return '';
	}

	//	--------------------------------------------------

	protected function version_correction($version)
	{
		if (strlen($version) == 3)
		{
			$version = $version.'.0';
		}

		return $version;
	}

	//	--------------------------------------------------

	protected function cdn_fallback($field, $default, $url)
	{
		$fallback = false;

		if (function_exists('curl_version') and
			$this->params->get($field, $default))
		{
			$cURL = curl_init($this->scheme.':'.$url);
			curl_setopt($cURL, CURLOPT_NOBODY, true);

			//	Send User-Agent with the request
			if ($this->params->get('curl_useragent', 0))
			{
				curl_setopt(
					$cURL,
					CURLOPT_USERAGENT,
					$this->clean($this->params->get('curl_useragent_txt', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:31.0) Gecko/20100101 Firefox/31.0'))
				);
			}

			$result = curl_exec($cURL);

			if ($result)
			{
				$code = curl_getinfo($cURL, CURLINFO_HTTP_CODE);

				if ($code !== 200)
				{
					$fallback = true;
				}
			}

			curl_close($cURL);
		}

		return $fallback;
	}

	//	--------------------------------------------------

	protected function clean_scheme($url)
	{
		return str_replace(array('https://', 'http://'), '', $url);
	}

	//	--------------------------------------------------

	protected function scheme()
	{
		$scheme = $this->params->get('scheme', 'auto');

		if ($scheme == 'auto')
		{
			return JURI::getInstance($this->web_root)->getScheme();
		}
		else
		{
			return preg_replace('/[^https]/', '', $scheme);
		}
	}

	//	--------------------------------------------------

	protected function clean_domain($domain)
	{
		$domain = filter_var(trim($domain, '/'), FILTER_SANITIZE_URL);
		$domain = $this->clean_scheme($domain);

		if (strstr($domain, '/'))
		{
			$domain = substr($domain, 0, strpos($domain, '/'));
		}

		return strtolower($domain);
	}

	//	--------------------------------------------------

	protected function fqdn()
	{
		if ($this->params->get('domain_fqdn', 1) == 1)
		{
			return parse_url($this->web_root, PHP_URL_HOST);
		}
		else
		{
			return $this->clean_domain($this->params->get('domain_fqdn_custom'));
		}
	}

	//	--------------------------------------------------

	protected function local_url($field)
	{
		switch ($this->params->get('local_urls_'.$field, 0))
		{
			case 1: return str_replace(array('https:', 'http:'), '', $this->web_root); // Scheme Relative
			case 2: return $this->web_root;				// Absolute
			case 0: return $this->web_root_relative;	// Relative
		}
	}
}
