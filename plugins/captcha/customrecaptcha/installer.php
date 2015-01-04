<?php
/**
 * @copyright	Copyright (C) 2011 Simplify Your Web, Inc. All rights reserved.
 * @license		GNU General Public License version 3 or later; see LICENSE.txt
 */

// No direct access to this file
defined('_JEXEC') or die;

/**
 * Script file of the Custom Recaptcha plugin
 */
class plgcaptchacustomrecaptchaInstallerScript
{		
	/**
	 * Called before an install/update/uninstall method
	 *
	 * @return  boolean  True on success
	 */
	public function preflight($type, $parent) 
	{
		echo '<br />';
	}
	
	/**
	 * Called after an install/update/uninstall method
	 *
	 * @return  boolean  True on success
	 */
	public function postflight($type, $parent) 
	{			
		if ($type != 'uninstall') {
			
			$version = new JVersion();
			$jversion = explode('.', $version->getShortVersion());
			
// 			if (intval($jversion[0]) > 2) {
// 				echo '<div style="padding: 0 0 20px 0; text-align: center">';
// 			} else {
// 				echo '<div style="padding: 0 0 20px 0">';
// 			}
			
// 			echo '<img src="../plugins/captcha/customrecaptcha/images/logo.png" style="float: none" />';
// 			echo '<br /><br />'.JText::_('PLG_CAPTCHA_CUSTOMRECAPTCHA_VERSION');
// 			echo '<br /><br />Olivier Buisard @ <a href="http://www.simplifyyourweb.com" target="_blank">Simplify Your Web</a>';
// 			echo '</p>';
			
			// get key values from the standard ReCaptcha plugin packaged with Joomla!
			
			$db = JFactory::getDBO();
			$query = $db->getQuery(true);
			
			$query->select('*');
			$query->from($db->quoteName('#__extensions'));
			$query->where('name=\'plg_captcha_recaptcha\'');
				
			$db->setQuery($query);
				
			$results = $db->loadObjectList();
				
			if ($error = $db->getErrorMsg()) {
				throw new Exception($error);		
			}
			
			foreach ($results as $result) { // hopefully we only get one occurence	
				$plugin_captcha_params = new JRegistry();
				$plugin_captcha_params->loadString($result->params);
				
				$public_key = $plugin_captcha_params->get('public_key');
				$private_key = $plugin_captcha_params->get('private_key');
				
				if (!empty($public_key)) {
					$query->clear();
					
					$query->select('*');
					$query->from($db->quoteName('#__extensions'));
					$query->where('name=\'plg_captcha_customrecaptcha\'');
					
					$db->setQuery($query);
						
					$custom_recaptcha_plugins = $db->loadObjectList();
						
					if ($error = $db->getErrorMsg()) {
						throw new Exception($error);
					}
					
					foreach ($custom_recaptcha_plugins as $custom_recaptcha_plugin) { // hopefully we only get one occurence
						$query->clear();
						
						$plugin_custom_params = new JRegistry();
						$plugin_custom_params->loadString($custom_recaptcha_plugin->params);
						
						if ($plugin_custom_params->get('public_key') == '') { // only done if no key is already present
							$plugin_custom_params->set('public_key', $public_key);
							$plugin_custom_params->set('private_key', $private_key);
							
							$query->update($db->quoteName('#__extensions'));
							$query->set('params=\''.$plugin_custom_params->toString().'\'');
							$query->where('extension_id='.$custom_recaptcha_plugin->extension_id);
							
							$db->setQuery($query);
							
							$db->query();
							
							if ($error = $db->getErrorMsg()) {
								throw new Exception($error);
							}
												
							$class = '';
							$style = '';
							
							if (intval($jversion[0]) > 2) {
								$class = 'alert alert-success';
							} else {
								$style = 'margin: 5px 0; padding: 8px 35px 8px 14px; border-radius: 4px; border: 1px solid #D6E9C6; background-color: #DFF0D8; color: #468847;';
							}
							
							echo '<div class="'.$class.'" style="'.$style.'">';
							echo '    <span>'.JText::_('PLG_CAPTCHA_CUSTOMRECAPTCHA_MESSAGE_LOADINGKEYSSUCCESSFUL').'</span>';
							echo '</div>';
						}
					}
				}
			}
		}
		
		return true;
	}	
	
	/**
	 * Called on installation
	 *
	 * @return  boolean  True on success
	 */
	public function install($parent) {}
	
	/**
	 * Called on update
	 *
	 * @return  boolean  True on success
	 */
	public function update($parent) {}
	
	/**
	 * Called on uninstallation
	 */
	public function uninstall($parent) {}
	
}
?>