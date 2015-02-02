<?php
/**
 * @package	AcyMailing for Joomla!
 * @version	4.8.1
 * @author	acyba.com
 * @copyright	(C) 2009-2014 ACYBA S.A.R.L. All rights reserved.
 * @license	GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
 */
defined('_JEXEC') or die('Restricted access');
?><div class="acymailing_module<?php echo $params->get('moduleclass_sfx')?>" id="acymailing_module_<?php echo $formName; ?>">
<?php
	if(!empty($mootoolsIntro)) echo '<p class="acymailing_mootoolsintro">'.$mootoolsIntro.'</p>'; ?>
	<div class="acymailing_mootoolsbutton">
		<?php
		 	$link = "rel=\"{handler: 'iframe', size: {x: ".$params->get('boxwidth',250).", y: ".$params->get('boxheight',200)."}}\" class=\"modal acymailing_togglemodule\"";
		 	$href=acymailing_completeLink('sub&task=display&formid='.$module->id,true);
		?>
		<p><a data-toggle="modal" href="<?php echo $href;?>" data-target="#newslettermodal" class="acymailing_togglemodule"><i class="icon-mail-alt"></i></a></p>
	</div>
</div>

<script type="text/javascript">

var acymailing = Array();
acymailing['NAMECAPTION'] = 'Votre nom';
acymailing['NAME_MISSING'] = 'Saisissez votre nom.';
acymailing['EMAILCAPTION'] = 'Votre adresse de messagerie';
acymailing['VALID_EMAIL'] = 'Saisissez une adresse courriel valide.';
acymailing['ACCEPT_TERMS'] = 'Veuillez accepter les Conditions d\'utilisation';
acymailing['CAPTCHA_MISSING'] = 'Veuillez entrer le code de sécurité affiché dans l\'image';
acymailing['NO_LIST_SELECTED'] = 'Veuillez sélectionner les listes auxquelles vous voulez vous inscrire';


(function($) {

  // Match to Bootstraps data-toggle for the modal
  // and attach an onclick event handler
  $('a[data-toggle="modal"]').on('click', function(e) {

    // From the clicked element, get the data-target arrtibute
    // which BS3 uses to determine the target modal
    var target_modal = $(e.currentTarget).data('target');
    // also get the remote content's URL
    var remote_content = e.currentTarget.href;

    // Find the target modal in the DOM
    var modal = $(target_modal);
    // Find the modal's <div class="modal-body"> so we can populate it
    var modalBody = $(target_modal + ' .modal-body');

    // Capture BS3's show.bs.modal which is fires
    // immediately when, you guessed it, the show instance method
    // for the modal is called
    modal.on('show.bs.modal', function () {
            // use your remote content URL to load the modal body
            modalBody.load(remote_content);
        }).modal();
        // and show the modal

    // Now return a false (negating the link action) to prevent Bootstrap's JS 3.1.1
    // from throwing a 'preventDefault' error due to us overriding the anchor usage.
    return false;
  });

})(jQuery);

</script>

<div id="newslettermodal" class="modal fade" role="dialog" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h3 id="termsLabel" class="modal-title">Newsletter</h3>
      </div>
      <div class="modal-body">
		  <div style="width: 100%"><p style="font-size: 40px; text-align: center; margin: 10px;"><i class="icon-spin5 animate-spin"></i></p></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->