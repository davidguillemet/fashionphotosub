<?php die("Access Denied"); ?>#x#a:2:{s:6:"output";s:0:"";s:6:"result";s:9157:"(function($){$(document).ready(function(){if(typeof(window['nn_sliders_use_hash'])!="undefined"){nnSliders={init:function(){var $this=this;this.hash_id=decodeURIComponent(window.location.hash.replace('#',''));var nn_sliders_speed_fade=$('.nn_sliders .fade').length?$('.nn_sliders .fade').first().css('transition-duration'):'0.15s';var nn_sliders_speed_collapse=$('.nn_sliders .collapse').length?$('.nn_sliders .collapse').first().css('transition-duration'):'0.35s';this.insertCSSRule(['.nn_sliders .fade','.nn_sliders .collapse'],'transition-duration: 1ms');var timeout=$('.nn_tabs').length?250:0;setTimeout((function(){$this.initActiveClasses();if(nn_sliders_use_cookies){this.showByCookies();}$this.showByURL();$this.showByHash();}),timeout);setTimeout((function(){$this.initClickMode();if(nn_sliders_mode=='hover'){$this.initHoverMode();}
if(nn_sliders_use_cookies||nn_sliders_set_cookies){$this.initCookieHandling();}if(nn_sliders_use_hash){$this.initHashHandling();}
$this.initHashLinkList();$this.initIframeReloading();$this.insertCSSRule(['.nn_sliders .fade'],'transition-duration: '+nn_sliders_speed_fade);$this.insertCSSRule(['.nn_sliders .collapse'],'transition-duration: '+nn_sliders_speed_collapse);}),1000);},show:function(id,scroll,openparents){if(openparents){this.openParents(id,scroll);return;}
var $this=this;var $el=this.getElement(id);if(!$el.length){return;}
if(!$el.hasClass('in')){if(scroll){$el.one('shown shown.bs.collapse',function(e){$this.scroll(id);});}$el.collapse({toggle:true,parent:$el.parent().parent()});$el.collapse('show');}else{if(scroll){$this.scroll(id);}}
$el.focus();},scroll:function(id){var $el=this.getElement(id);if(!$el.length){return;}
switch(nn_sliders_scroll){case 2:var $scrollto=$el.closest('.nn_sliders-group').find('.nn_sliders-scroll').first();break;case 1:default:var $scrollto=$el.closest('.nn_sliders').find('.nn_sliders-scroll').first();break;}
if(!$scrollto.length){return;}
$('html,body').animate({scrollTop:$scrollto.offset().top});},getElement:function(id){return this.getSliderElement(id);},getTabElement:function(id){return $('a.nn_tabs-toggle[data-id="'+id+'"]');},getSliderElement:function(id){return $('#'+id+'.nn_sliders-body');},insertCSSRule:function(selector,rules,contxt){var context=contxt||document,stylesheet;if(typeof context.styleSheets=='object'){if(context.styleSheets.length){stylesheet=context.styleSheets[context.styleSheets.length-1];}
if(context.styleSheets.length){if(context.createStyleSheet){stylesheet=context.createStyleSheet();}else{context.getElementsByTagName('head')[0].appendChild(context.createElement('style'));stylesheet=context.styleSheets[context.styleSheets.length-1];}}
if(stylesheet.addRule){for(var i=0;i<selector.length;++i){stylesheet.addRule(selector[i],rules);}}else{stylesheet.insertRule(selector.join(',')+'{'+rules+'}',stylesheet.cssRules.length);}}},showByCookies:function(){var cookies=$.cookie(nn_sliders_cookie_name);if(!cookies){return false;}
cookies=cookies.split('___');for(var i=0;i<cookies.length;i++){var keyval=cookies[i].split('=');if(keyval.length<2){continue;}
var key=keyval.shift();if(key.substr(0,14)!='set-nn_sliders'){continue;}
this.openParents(decodeURIComponent(keyval.join('=')),0);}
return true;},showByURL:function(){var id=this.getUrlVar();if(id==''){return;}
this.showByID(id);},showByHash:function(){if(!this.hash_id){return;}
var id=this.hash_id;if(id==''||id.indexOf("&")!=-1||id.indexOf("=")!=-1){return;}
if($('a[name="nn_sliders-scrollto_'+id+'"]').length==0){this.showByHashAnchor(id);return;}
if(!nn_sliders_use_hash){return;}
this.showByID(id);},showByHashAnchor:function(id){var $anchor=$('a[name="'+id+'"]');if($anchor.length==0){return;}
if($anchor.closest('.nn_sliders').length==0){return;}
var $slider=$anchor.closest('.nn_sliders-body').first();if($slider.find('.nn_tabs').length>0){return;}
this.openParents($slider.attr('id'),0);setTimeout(function(){$('html,body').animate({scrollTop:$anchor.offset().top});},250);},showByID:function(id){var $el=$('a[name="nn_sliders-scrollto_'+id+'"]');if($el.length==0){return;}
this.openParents(id,nn_sliders_urlscroll);},openParents:function(id,scroll){var $el=this.getElement(id);if(!$el.length){return;}
var parents=new Array;var parent=this.getElementArray($el);while(parent){parents[parents.length]=parent;parent=this.getParent(parent.el);}
if(!parents.length){return false;}
this.stepThroughParents(parents,null,scroll);},stepThroughParents:function(parents,parent,scroll){$this=this;if(!parents.length&&parent){if(scroll){if(typeof(scroll)=='object'){$('html,body').animate({scrollTop:$(scroll).offset().top});}else{$this.scroll(parent.id);}}parent.el.focus();return;}
parent=parents.pop();if(parent.el.hasClass('in')||parent.el.parent().hasClass('active')){$this.stepThroughParents(parents,parent,scroll);return;}
switch(parent.type){case'tab':if(typeof(window['nnTabs'])=="undefined"){$this.stepThroughParents(parents,parent,scroll);break;}
parent.el.one('shown shown.bs.tab',function(e){$this.stepThroughParents(parents,parent,scroll);});nnTabs.show(parent.id);break;case'slider':if(typeof(window['nnSliders'])=="undefined"){$this.stepThroughParents(parents,parent,scroll);break;}
parent.el.one('shown shown.bs.collapse',function(e){$this.stepThroughParents(parents,parent,scroll);});nnSliders.show(parent.id);break;}},getParent:function($el){if(!$el){return false;}
var $parent=$el.parent().closest('.nn_tabs-pane, .nn_sliders-body');if(!$parent.length){return false;}
var parent=this.getElementArray($parent);return parent;},getElementArray:function($el){var id=$el.attr('data-toggle')?$el.attr('data-id'):$el.attr('id');var type=($el.hasClass('nn_tabs-pane')||$el.hasClass('nn_tabs-toggle'))?'tab':'slider'
return{'type':type,'id':id,'el':type=='tab'?this.getTabElement(id):this.getSliderElement(id)};},initActiveClasses:function(){$('.nn_sliders-body').on('show show.bs.collapse',function(e){$(this).parent().addClass('active');e.stopPropagation();});$('.nn_sliders-body').on('hidden hidden.bs.collapse',function(e){$(this).parent().removeClass('active');e.stopPropagation();});},initHashLinkList:function(){var $this=this;$('a[href^="#"]').each(function($i,el){$this.initHashLink(el);});},initHashLink:function(el){var $this=this;var $link=$(el);if($link.attr('data-toggle')){return;}
var id=$link.attr('href').replace('#','');var $anchor=$('a[name="'+id+'"]');if($anchor.length==0){return;}
if($anchor.closest('.nn_sliders').length==0){return;}
var $slider=$anchor.closest('.nn_sliders-body').first();if($slider.find('.nn_tabs').length>0){return;}
var slider_id=$slider.attr('id');if($link.closest('.nn_sliders').length>0){if($link.closest('.nn_sliders-body').first().attr('id')==slider_id){return;}}
$link.click(function(e){$this.openParents(slider_id,$anchor);e.stopPropagation();});},initHashHandling:function(el){$('.nn_sliders-body').on('shown shown.bs.collapse',function(e){var id=this.id
this.id='';window.location.hash=id;this.id=id;e.stopPropagation();});},initClickMode:function(el){$('body').on('click.collapse.data-api','a.nn_sliders-toggle',function(e){e.preventDefault();nnSliders.show($(this).attr('data-id'),$(this).hasClass('nn_sliders-item-scroll'));});},initHoverMode:function(el){$('body').on('hover.collapse.data-api','a.nn_sliders-toggle',function(e){e.preventDefault();nnSliders.show($(this).attr('data-id'));});},initCookieHandling:function(el){var $this=this;$('.nn_sliders-body').on('show show.bs.collapse',function(e){var id=$(this).attr('data-id');var $el=$this.getElement(id);var set=0;$el.closest('.nn_sliders').each(function($i,el){set=el.id;});var obj={};var cookies=$.cookie(nn_sliders_cookie_name);if(cookies){cookies=cookies.split('___');for(var i=0;i<cookies.length;i++){var keyval=cookies[i].split('=');if(keyval.length>1&&keyval[0]!=set){var key=keyval.shift();if(key.substr(0,14)=='set-nn_sliders'){obj[key]=keyval.join('=');}}}}
obj['set-nn_sliders-'+set]=id;var arr=[];for(var i in obj){if(i&&obj[i]){arr[arr.length]=i+'='+obj[i];}}
$.cookie(nn_sliders_cookie_name,arr.join('___'));});},initIframeReloading:function(){var $this=this;$('.nn_sliders-body.in iframe').each(function(){$(this).attr('reloaded',true);});$('.nn_sliders-body').on('show show.bs.collapse',function(e){if(typeof initialize=='function'){initialize();}
var $el=$(this);$el.find('iframe').each(function(){if(this.src&&!$(this).attr('reloaded')){this.src+='';$(this).attr('reloaded',true);}});});$(window).resize(function(){if(typeof initialize=='function'){initialize();}
$('.nn_sliders-body iframe').each(function(){$(this).attr('reloaded',false);});$('.nn_sliders-body.in iframe').each(function(){if(this.src){this.src+='';$(this).attr('reloaded',true);}});});},getUrlVar:function(){var search='slider';var query=window.location.search.substring(1);if(query.indexOf(search+'=')==-1){return'';}
var vars=query.split('&');for(var i=0;i<vars.length;i++){var keyval=vars[i].split('=');if(keyval[0]!=search){continue;}
return keyval[1];}
return'';}};nnSliders.init();}});})(jQuery);function openAllSliders(){jQuery('.nn_sliders-body:not(.in)').collapse('show');}
function closeAllSliders(){jQuery('.nn_sliders-body.in').collapse('hide');};";}