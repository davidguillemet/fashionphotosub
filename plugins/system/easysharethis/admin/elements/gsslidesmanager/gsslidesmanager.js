/**
 * @package Easy ShareThis
 * @version 2.1
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
    
    slideimg.setProperty('width','32px');
    slideimg.setProperty('height','32px');
}

function addslidegs(imgname,imgthumb,appmode,appvalue) {
    if (!imgname) imgname = '';
    if (!imgthumb) imgthumb = '../plugins/system/easysharethis/admin/elements/gsslidesmanager/unknown.png';
	if (!appmode) {
        appmode = '';
	appmodeoption= '<option value="1" selected="selected">Enable</option>'
	+'<option value="0">Disable</option>';
	} else {
		if (appmode == '1') {
			appmodeoption= '<option value="1" selected="selected">Enable</option>'
			+'<option value="0">Disable</option>';
		} else {
			appmodeoption= '<option value="1" >Enable</option>'
			+'<option value="0" selected="selected">Disable</option>';
		}
	}
	 if (!appvalue) appvalue = '';
		
    index = checkIndex(0);
    var gsslide = new Element('li', {
        'class': 'gsslide',
        'id': 'gsslide'+index
        });
    gsslide.set('html','<div class="gsslidehandle"><div class="gsslidenumber">'+index+'</div></div><div class="gsslidecontainer">'
		
		+ '<div class="gssliderow"><div class="gsslideimgcontainer"><img src="'+imgthumb+'" width="32" height="32"/></div>'
		
		+'<input name="gsslideimgname'+index+'" id="gsslideimgname'+index+'" class="gsslideimgname"  type="text" value="'+imgname+'" disabled="disabled" ><select name="gsslideappmode'+index+'" class="gsslideappmode">'+appmodeoption+'</select>'
		
		+'<input name="gsslideappvalue'+index+'" id="gsslideappvalue'+index+'" class="gsslideappvalue"  type="hidden" value="'+appvalue+'"  >'
		
		+'</div>'
		 
        + '</div><div style="clear:both;"></div>');

    document.id('gsslideslist').adopt(gsslide);

    storeslidegs();
    makesortables();
}


function checkIndex(i) {
    while ($('gsslide'+i)) i++;
    return i;
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
        slide['appmode'] = el.getElement('.gsslideappmode').value;
        slide['appvalue'] = el.getElement('.gsslideappvalue').value;
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
                slide['appmode'],
                slide['appvalue']
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
    +"if (task == 'plugin.cancel' || document.formvalidator.isValid(document.id('style-form'))) {	Joomla.submitform(task, document.getElementById('style-form'));"
    +"if (self != top) {"
    +"window.top.setTimeout('window.parent.SqueezeBox.close()', 1000);"
    +"}"
    +"} else {"
    +"alert('Formulaire invalide');"
    +"}}";
    document.body.appendChild(script);
});


	
	
    