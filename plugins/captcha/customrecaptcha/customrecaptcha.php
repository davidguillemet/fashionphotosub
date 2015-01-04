<?php
/**
 * @copyright	Copyright (C) 2011 Simplify Your Web, Inc. All rights reserved.
 * @license		GNU General Public License version 3 or later; see LICENSE.txt
*/

defined('_JEXEC') or die;

/**
 * Custom Recaptcha Plugin.
 */
class PlgCaptchaCustomRecaptcha extends JPlugin
{
	const RECAPTCHA_API_SERVER = "http://www.google.com/recaptcha/api";
	const RECAPTCHA_API_SECURE_SERVER = "https://www.google.com/recaptcha/api";
	const RECAPTCHA_VERIFY_SERVER = "api-verify.recaptcha.net";

	public function __construct($subject, $config)
	{
		parent::__construct($subject, $config);
		$this->loadLanguage();
	}

	/**
	 * Initialise the captcha
	 *
	 * @param   string	$id	The id of the field
	 * @return  Boolean	True on success, false otherwise
	 * @since  2.5
	 */
	public function onInit($id)
	{
		$pubkey = $this->params->get('public_key', '');
		if ($pubkey == null || $pubkey == '') {
			throw new Exception(JText::_('PLG_CUSTOMRECAPTCHA_ERROR_NO_PUBLIC_KEY'));
		}
		
		$doc = JFactory::getDocument();
		$doc->addScriptDeclaration('var RecaptchaOptions = { '.$this->_getLanguage().' theme: \'custom\', custom_theme_widget: \'recaptcha_widget\' };');

		return true;
	}

	/**
	 * Gets the challenge HTML
	 *
	 * @return  string  The HTML to be embedded in the form
	 * @since  2.5
	 */
	public function onDisplay($name, $id, $class)
	{			
		$version = new JVersion();
		$jversion = explode('.', $version->getShortVersion());
		
		$server = self::RECAPTCHA_API_SERVER;
		if (intval($jversion[0]) > 2) {
			$app = JFactory::getApplication();
			if ($app->isSSLConnection()) {
				$server = self::RECAPTCHA_API_SECURE_SERVER;
			}
		} else {
			jimport('joomla.environment.browser');
			if (JBrowser::getInstance()->isSSLConnection()) {
				$server = self::RECAPTCHA_API_SECURE_SERVER;
			}
		}		
		
		$language = JFactory::getLanguage();
		
		$tag = explode('-', $language->getTag());
		$tag = $tag[0];
		
		$html = '';	
		
		// $html .= '<script type="text/javascript"> var RecaptchaOptions = { '.$this->_getLanguage().' theme: \'custom\', custom_theme_widget: \'recaptcha_widget\' }; </script>';
		// above line should be BEFORE form
				
		$html .= '<div id="recaptcha_widget" style="display:none">';
		$html .= '<input type="text" id="recaptcha_response_field" name="recaptcha_response_field">';
		$html .= '<br />';
		$html .= '<span class="recaptcha_only_if_image">'.JText::_('PLG_CUSTOMRECAPTCHA_INSTRUCTIONS_VISUAL').'</span>';
		$html .= '<span class="recaptcha_only_if_audio">'.JText::_('PLG_CUSTOMRECAPTCHA_INSTRUCTIONS_AUDIO').'</span>';
		$html .= '<div id="recaptcha_image" style="display:table"></div>';
		
		// Google adds an extra <br> before 'play sound again'... sucks...
		
		$html .= '<div class="recaptcha_only_if_incorrect_sol">'.JText::_('PLG_CUSTOMRECAPTCHA_ERROR_NO_PUBLIC_KEY').'</div>';		
		$html .= '<div class="recaptcha_reload"><a href="javascript:Recaptcha.reload()">'.JText::_('PLG_CUSTOMRECAPTCHA_REFRESH_BTN').'</a></div>';
		$html .= '<div class="recaptcha_only_if_image"><a href="javascript:Recaptcha.switch_type(\'audio\')">'.JText::_('PLG_CUSTOMRECAPTCHA_AUDIO_CHALLENGE').'</a></div>';
		$html .= '<div class="recaptcha_only_if_audio"><a href="javascript:Recaptcha.switch_type(\'image\')">'.JText::_('PLG_CUSTOMRECAPTCHA_VISUAL_CHALLENGE').'</a></div>';
		$html .= '<div class="recaptcha_help"><a href="javascript:Recaptcha.showhelp()">'.JText::_('PLG_CUSTOMRECAPTCHA_HELP_BTN').'</a></div>';		
		$html .= '<div class="recaptcha_only_if_privacy" id="recaptcha_privacy"><a href="http://www.google.com/intl/'.$tag.'/policies/" target="_blank">'.JText::_('PLG_CUSTOMRECAPTCHA_PRIVACY_AND_TERMS').'</a></div>';
		$html .= '</div>';
		
		$pubkey = $this->params->get('public_key', '');
		
		$html .= '<script type="text/javascript" src="'.$server.'/challenge?k='.$pubkey.'"></script>';
 		$html .= '<noscript>';
   		$html .= '<iframe src="'.$server.'/noscript?k='.$pubkey.'" height="300" width="500" frameborder="0"></iframe><br />';
   		$html .= '<textarea name="recaptcha_challenge_field" rows="3" cols="40"></textarea>';
   		$html .= '<input type="hidden" name="recaptcha_response_field" value="manual_challenge">';
 		$html .= '</noscript>';
		
		return $html;
	}

	/**
	  * Calls an HTTP POST function to verify if the user's guess was correct
	  *
	  * @return  True if the answer is correct, false otherwise
	  * @since  2.5
	  */
	public function onCheckAnswer($code)
	{
		$input      = JFactory::getApplication()->input;
		$privatekey = $this->params->get('private_key');
		$remoteip   = $input->server->get('REMOTE_ADDR', '', 'string');
		$challenge  = $input->get('recaptcha_challenge_field', '', 'string');
		$response   = $input->get('recaptcha_response_field', '', 'string');

		// Check for Private Key
		if (empty($privatekey)) {
			$this->_subject->setError(JText::_('PLG_CUSTOMRECAPTCHA_ERROR_NO_PRIVATE_KEY'));
			return false;
		}

		// Check for IP
		if (empty($remoteip)) {
			$this->_subject->setError(JText::_('PLG_CUSTOMRECAPTCHA_ERROR_NO_IP'));
			return false;
		}

		// Discard spam submissions
		if ($challenge == null || strlen($challenge) == 0 || $response == null || strlen($response) == 0) {
			$this->_subject->setError(JText::_('PLG_CUSTOMRECAPTCHA_ERROR_EMPTY_SOLUTION'));
			return false;
		}

		$response = $this->_recaptcha_http_post(
			self::RECAPTCHA_VERIFY_SERVER, "/verify",
			array(
				'privatekey' => $privatekey,
				'remoteip'   => $remoteip,
				'challenge'  => $challenge,
				'response'   => $response
			)
		);

		$answers = explode("\n", $response[1]);

		if (trim($answers[0]) == 'true') {
			return true;
		} else {
			// @todo use exceptions here
			$this->_subject->setError(JText::_('PLG_CUSTOMRECAPTCHA_ERROR_'.strtoupper(str_replace('-', '_', $answers[1]))));
			return false;
		}
	}

	/**
	 * Encodes the given data into a query string format.
	 *
	 * @param   string  $data  Array of string elements to be encoded
	 * @return  string  Encoded request
	 * @since  2.5
	 */
	private function _recaptcha_qsencode($data)
	{
		$req = "";
		
		foreach ($data as $key => $value) {
			$req .= $key . '=' . urlencode(stripslashes($value)) . '&';
		}

		// Cut the last '&'
		$req = rtrim($req, '&');
		
		return $req;
	}

	/**
	 * Submits an HTTP POST to a reCAPTCHA server.
	 *
	 * @param   string  $host
	 * @param   string  $path
	 * @param   array   $data
	 * @param   int     $port
	 * @return  array   Response
	 * @since  2.5
	 */
	private function _recaptcha_http_post($host, $path, $data, $port = 80)
	{
		$req = $this->_recaptcha_qsencode($data);

		$http_request  = "POST $path HTTP/1.0\r\n";
		$http_request .= "Host: $host\r\n";
		$http_request .= "Content-Type: application/x-www-form-urlencoded;\r\n";
		$http_request .= "Content-Length: " . strlen($req) . "\r\n";
		$http_request .= "User-Agent: reCAPTCHA/PHP\r\n";
		$http_request .= "\r\n";
		$http_request .= $req;

		$response = '';
		if (($fs = @fsockopen($host, $port, $errno, $errstr, 10)) == false ) {
			die('Could not open socket');
		}

		fwrite($fs, $http_request);

		while (!feof($fs)) {
			// One TCP-IP packet
			$response .= fgets($fs, 1160);
		}

		fclose($fs);
		$response = explode("\r\n\r\n", $response, 2);

		return $response;
	}

	/**
	 * Get the language tag or a custom translation
	 * Note: audio is always in English
	 *
	 * @return  string
	 * @since  2.5
	 */
	private function _getLanguage()
	{
		$language = JFactory::getLanguage();

		$tag = explode('-', $language->getTag());
		$tag = $tag[0];
		//$available = array('en', 'pt', 'fr', 'de', 'nl', 'ru', 'es', 'tr'); // available by Google		
		
		// remaining translations that are created by the widget and that there is no handle on
		$custom[] = 'custom_translations : {';
		$custom[] = "\t".'instructions_audio : "' . JText::_('PLG_CUSTOMRECAPTCHA_INSTRUCTIONS_AUDIO') . '",';
		$custom[] = "\t".'play_again : "' . JText::_('PLG_CUSTOMRECAPTCHA_PLAY_AGAIN') . '",';
		$custom[] = "\t".'cant_hear_this : "' . JText::_('PLG_CUSTOMRECAPTCHA_CANT_HEAR_THIS') . '",';
		$custom[] = "\t".'audio_challenge : "' . JText::_('PLG_CUSTOMRECAPTCHA_AUDIO_CHALLENGE') . '",';
		$custom[] = "\t".'image_alt_text : "' . JText::_('PLG_CUSTOMRECAPTCHA_IMAGE_ALT_TEXT') . '"';
		$custom[] = '},';		

		// if the language is not available or if the translation is set to be overridden, add a custom translation
		/*if (!in_array($tag, $available) || $this->params->get('override_language', 0)) {
			$custom[] = 'custom_translations : {';
			$custom[] = "\t".'instructions_visual : "' . JText::_('PLG_CUSTOMRECAPTCHA_INSTRUCTIONS_VISUAL') . '",';
			$custom[] = "\t".'instructions_audio : "' . JText::_('PLG_CUSTOMRECAPTCHA_INSTRUCTIONS_AUDIO') . '",';
			$custom[] = "\t".'play_again : "' . JText::_('PLG_CUSTOMRECAPTCHA_PLAY_AGAIN') . '",';
			$custom[] = "\t".'cant_hear_this : "' . JText::_('PLG_CUSTOMRECAPTCHA_CANT_HEAR_THIS') . '",';
			$custom[] = "\t".'visual_challenge : "' . JText::_('PLG_CUSTOMRECAPTCHA_VISUAL_CHALLENGE') . '",';
			$custom[] = "\t".'audio_challenge : "' . JText::_('PLG_CUSTOMRECAPTCHA_AUDIO_CHALLENGE') . '",';
			$custom[] = "\t".'refresh_btn : "' . JText::_('PLG_CUSTOMRECAPTCHA_REFRESH_BTN') . '",';
			$custom[] = "\t".'help_btn : "' . JText::_('PLG_CUSTOMRECAPTCHA_HELP_BTN') . '",';
			$custom[] = "\t".'incorrect_try_again : "' . JText::_('PLG_CUSTOMRECAPTCHA_INCORRECT_TRY_AGAIN') . '",';
			$custom[] = '},';
		}	*/	
		
		//if (in_array($tag, $available)) {
			$custom[] = "lang : '" . $tag . "',";
		//} else {
			//$custom[] = "lang : '" . $this->params->get('default_language', 'en') . "',";
		//}

		return implode("\n", $custom);
	}
}
