/**
 * @package  Woomark Image Gallery
 * @version 1.2
 * @author Infyways Solutions http://www.infyways.com
 * @copyright Copyright (C) 2011 - 2012 Infyways Solutions.
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 *
 */
function jInsertEditorText( text, editor ) {
    var newEl = new Element('span').set('html',text);
    var valeur = newEl.getChildren()[0].getAttribute('src');
    $(editor).value = valeur;
    addthumbnail(valeur, editor);
}

function addthumbnail(imgsrc, editor) {
    var slideimg = $(editor).getParent().getElement('img');
    var testurl = 'http';
    if (imgsrc.toLowerCase().indexOf(testurl.toLowerCase()) != -1) {
        slideimg.src = imgsrc;
    } else {
        slideimg.src = JURI+imgsrc;
    }
    
    slideimg.setProperty('width','64px');
    slideimg.setProperty('height','64px');
}
function addslidegs(imgname,imgthumb,imgcaption,imglink) {
    if (!imgname) imgname = '';
    if (!imgthumb) imgthumb = '../modules/mod_wookmark_gallery/admin/elements/gsslidesmanager/unknown.png';
	if (!imgcaption) imgcaption = '';
    imgcaption = imgcaption.replace(/\|dq\|/g,"&quot;");
	
	if (!imglink) imglink = '';
    imglink = imglink.replace(/\|dq\|/g,"&quot;");
	 
    index = checkIndex(0);
    var gsslide = new Element('li', {
        'class': 'gsslide',
        'id': 'gsslide'+index
        });
    gsslide.set('html','<div class="gsslidehandle"><div class="gsslidenumber">'+index+'</div></div><div class="gsslidecontainer">'
        + '<input name="gsslidedelete'+index+'" class="gsslidedelete" type="button" value="'+Joomla.JText._('MOD_SLIDESHOWGS_REMOVE2', '')+'" onclick="javascript:removeslide(this.getParent().getParent());" />'
		
		+ '<div class="gssliderow"><div class="gsslideimgcontainer"><img src="'+imgthumb+'" width="64" height="64"/></div>'
		
		+ '<input name="gsslideimgname'+index+'" id="gsslideimgname'+index+'" class="gsslideimgname hasTip" title="Image::This is the main image for the slide, it will also be used to create the thumbnail" type="text" value="'+imgname+'" onchange="javascript:addthumbnail(this.value, this);" />'
		 
		+ '<a class="modal gsselectimg" href="index.php?option=com_media&view=images&tmpl=component&e_name=gsslideimgname'+index+'" rel="{handler: \'iframe\', size: {x: 570, y: 400}}" >'+Joomla.JText._('Select an Image', 'select image')+'</a></div>'
		
		+ '<div class="gssliderow"><span class="gsslidelabel camcaption">'+Joomla.JText._('Caption', 'Caption')+'</span><input name="gsslidecaption'+index+'" class="gsslidecaption" type="text" value="'+imgcaption+'" onchange="javascript:storesetwarning();" /></div>'
		
		+ '<div class="gssliderow"><span class="gsslidelabel camlink">'+Joomla.JText._('Link', 'Link')+'</span><input name="gsslidelink'+index+'" class="gsslidelink" type="text" value="'+imglink+'" onchange="javascript:storesetwarning();" /></div>'
		
        + '</div><div style="clear:both;"></div>');

    document.id('gsslideslist').adopt(gsslide);

    storeslidegs();
    makesortables();
    SqueezeBox.initialize({});
    SqueezeBox.assign(gsslide.getElement('a.modal'), {
        parse: 'rel'
    });
}


function checkIndex(i) {
    while ($('gsslide'+i)) i++;
    return i;
}


function removeslide(slide) {
    if (confirm(Joomla.JText._('Remove this slide', 'Remove this slide')+' ?')) {
        slide.destroy();
        storeslidegs();
    }
}

function storesetwarning() {
// $('gsstoreslide').setStyle('background-color', 'red');
}

function storeremovewarning() {
// $('gsstoreslide').setStyle('background-color', 'white');
}

function storeslidegs() {
    var i = 0;
    var slides = new Array();
    document.id('gsslideslist').getElements('.gsslide').each(function(el) {
        slide = new Object();
		slide['imgname'] = el.getElement('.gsslideimgname').value;
		slide['imgthumb'] = el.getElement('img').src;
        slide['imgcaption'] = el.getElement('.gsslidecaption').value;
        slide['imgcaption'] = slide['imgcaption'].replace(/"/g,"|dq|");
		slide['imglink'] = el.getElement('.gsslidelink').value;
        slide['imglink'] = slide['imglink'].replace(/"/g,"|dq|");
        slides[i] = slide;
        i++;
    });

    slides = JSON.encode(slides);
    slides = slides.replace(/"/g,"|qq|");
    document.id('gsslides').value = slides;
    storeremovewarning();

}

function callslides() {
    var slides = JSON.decode(document.id('gsslides').value.replace(/\|qq\|/g,"\""));
    if (slides) {
        slides.each(function(slide) {
            addslidegs(
                slide['imgname'],
                slide['imgthumb'],
                slide['imgcaption'],
                slide['imglink']
                );
        });
        storeremovewarning();
    }
}
	
	
function makesortables() {
    var sb = new Sortables('gsslideslist', {
        /* set options */
        clone:true,
        revert: true,
        handle:'.gsslidehandle',
        /* initialization stuff here */
        initialize: function() {
      
        },
        /* once an item is selected */
        onStart: function(el) {
            el.setStyle('background','#add8e6');
        },
        /* when a drag is complete */
        onComplete: function(el) {
            el.setStyle('background','#fff');
            storesetwarning();
        },
        onSort: function(el, clone) {
		
        }
    });
}
	
window.addEvent('domready', function() {
    callslides();		

    var script = document.createElement("script");
    script.setAttribute('type','text/javascript');
    script.text="Joomla.submitbutton = function(task){"
    +"storeslidegs();"
    +"if (task == 'module.cancel' || document.formvalidator.isValid(document.id('module-form'))) {	Joomla.submitform(task, document.getElementById('module-form'));"
    +"if (self != top) {"
    +"window.top.setTimeout('window.parent.SqueezeBox.close()', 1000);"
    +"}"
    +"} else {"
    +"alert('Formulaire invalide');"
    +"}}";
    document.body.appendChild(script);
});


	
	
    