/**
 * @package Woomark Image Gallery
 * @version 1.1
 * @author Infyways Solutions http://www.infyways.com
 * @copyright Copyright (C) 2011 - 2012 Infyways Solutions.
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 *
 */

jQuery.noConflict();
jQuery(document).ready(function(){

	//////////////////////Dynamic/Static/////////////////
	if(jQuery('#jform_params_autoresize_gal').val()=='1'){
		jQuery('#jform_params_width').parent().hide();
		jQuery('#jform_params_width-lbl').parent().hide();
    }
	else
	{
		jQuery('#jform_params_width').parent().show();
		jQuery('#jform_params_width-lbl').parent().show();
	}
	jQuery('#jform_params_autoresize_gal').change(function(){
		if(jQuery('#jform_params_autoresize_gal').val()=='1'){
			jQuery('#jform_params_width').parent().hide();
			jQuery('#jform_params_width-lbl').parent().hide();
		}
		else
		{
			jQuery('#jform_params_width').parent().show();
			jQuery('#jform_params_width-lbl').parent().show();
		}
    });
	//////////////////////Fetch Image From Folder/Individual image path/////////////////
	if(jQuery('#jform_params_image_fetch').val()=='1'){
		jQuery('#jform_params_folder_path').parent().show();
		jQuery('#jform_params_path').parent().hide();
		jQuery('#jform_params_path-lbl').parent().hide();
		jQuery('#jform_params_lg_cap').parent().hide();
		jQuery('#jform_params_lg_cap-lbl').parent().hide();
		jQuery('#jform_params_cap_pos').parent().hide();
		jQuery('#jform_params_cap_pos-lbl').parent().hide();
		jQuery('#jform_params_cap_text').parent().hide();
		jQuery('#jform_params_cap_text-lbl').parent().hide();
    }
	else
	{
		jQuery('#jform_params_folder_path').parent().hide();
		jQuery('#jform_params_folder_path-lbl').parent().hide();
		jQuery('#jform_params_path').parent().show();
		jQuery('#jform_params_path-lbl').parent().show();
		jQuery('#jform_params_lg_cap').parent().show();
		jQuery('#jform_params_lg_cap-lbl').parent().show();
		if(jQuery('#jform_params_lg_cap').val()=='inline-block'){
			jQuery('#jform_params_cap_pos').parent().show();
			jQuery('#jform_params_cap_pos-lbl').parent().show();
		}
		else{
			jQuery('#jform_params_cap_pos').parent().hide();
			jQuery('#jform_params_cap_pos-lbl').parent().hide();
		}
		jQuery('#jform_params_lg_cap').change(function(){
			if(jQuery('#jform_params_lg_cap').val()=='inline-block'){
				jQuery('#jform_params_cap_pos').parent().show();
				jQuery('#jform_params_cap_pos-lbl').parent().show();
			}
			else{
				jQuery('#jform_params_cap_pos').parent().hide();
				jQuery('#jform_params_cap_pos-lbl').parent().hide();
			}
		 });
	}
	
	jQuery('#jform_params_image_fetch').change(function(){
		if(jQuery('#jform_params_image_fetch').val()=='1'){
			jQuery('#jform_params_folder_path').parent().show();
			jQuery('#jform_params_path').parent().hide();
			jQuery('#jform_params_path-lbl').parent().hide();
			jQuery('#jform_params_lg_cap').parent().hide();
			jQuery('#jform_params_lg_cap-lbl').parent().hide();
			jQuery('#jform_params_cap_pos').parent().hide();
			jQuery('#jform_params_cap_pos-lbl').parent().hide();
			jQuery('#jform_params_cap_text').parent().hide();
			jQuery('#jform_params_cap_text-lbl').parent().hide();
		}
		else
		{
			jQuery('#jform_params_folder_path').parent().hide();
			jQuery('#jform_params_folder_path-lbl').parent().hide();
			jQuery('#jform_params_path').parent().show();
			jQuery('#jform_params_path-lbl').parent().show();
			jQuery('#jform_params_lg_cap').parent().show();
			jQuery('#jform_params_lg_cap-lbl').parent().show();
			if(jQuery('#jform_params_lg_cap').val()=='inline-block'){
				jQuery('#jform_params_cap_pos').parent().show();
				jQuery('#jform_params_cap_pos-lbl').parent().show();
			}
			else{
				jQuery('#jform_params_cap_pos').parent().hide();
				jQuery('#jform_params_cap_pos-lbl').parent().hide();
			}
			jQuery('#jform_params_lg_cap').change(function(){
			if(jQuery('#jform_params_lg_cap').val()=='inline-block'){
				jQuery('#jform_params_cap_pos').parent().show();
				jQuery('#jform_params_cap_pos-lbl').parent().show();
			}
			else{
				jQuery('#jform_params_cap_pos').parent().hide();
				jQuery('#jform_params_cap_pos-lbl').parent().hide();
			}
		 });
		}
    });
    jQuery('#element-box div.m').css('display','block');
});