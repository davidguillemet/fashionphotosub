
        (function(){
var dojo = odojo;

var dijit = odijit;

var dojox = odojox;

dojo.declare("OfflajnSkin", null, {
	constructor: function(args) {
    dojo.mixin(this,args);
    this.init();
    if(this.hidden.changeSkin){
      this.hidden.changeSkin();
      this.hidden.changeSkin = null;
    }
    if(window[this.name+'delay'] == true){
      window[this.name+'delay'] == false;
      this.hidden.value = this.hidden.options[1].value;
      this.changeSkin();
    }
  },
  
  init: function() {
    var label = dojo.byId(this.name + '-lbl');
    this.label = label ? label.innerHTML.toLowerCase() : 'preset';
    this.hidden = dojo.byId(this.id);
    //this.span = dojo.create("span", {style: "margin-left: 10px; position: absolute;"}, this.hidden.parentNode.parentNode, "last");
    this.span = dojo.create("span", {style: "margin-left: 10px;"}, this.hidden.parentNode.parentNode, "last");
    this.c = dojo.connect(this.hidden, 'onchange', this, 'changeSkin');  
  },
  
  changeSkin: function() {
    if(this.hidden.value != 'custom'){
      this.changeSkinNext();
      this.hidden.value = 'custom';
      this.fireEvent(this.hidden, 'change');
    }
  },
  
  changeSkinNext: function() {
    var value = this.hidden.value;
    var def = this.data[value];
    for (var k in def) {
      var p = dojo.byId(this.control + k);
      
      if(!p) {
        var n = this.id.replace(this.name, '');
        p = dojo.byId(n + k);        
      }
      if(p) {
        var v = def[k];
        if(v.indexOf("**") >= 0){
            var newv = v.split('|*|');
            var oldv = p.value.split('|*|');
            for(var i = 0; i < oldv.length; i++){
                if(newv[i] != '**'){
                    oldv[i] = newv[i];
                }
            }
            v = oldv.join('|*|');
        }else if(v.length > 0 && v.indexOf("{") == 0){
          var orig = {};
          if(p.value.length > 0 && p.value.indexOf("{") == 0){
            orig = dojo.fromJson(p.value);
          }
          var newValues = dojo.fromJson(v);
          for(var key in newValues){
            if(!orig[key]) orig[key] = {};
            for(var key2 in newValues[key]){
              orig[key][key2] = newValues[key][key2];
            }
          }
          v = dojo.toJson(orig);
        }
        p.value = v;
        this.fireEvent(p, 'change');
      }
    } 
    this.span.innerHTML = "The <b>"+value.replace(/^.*?_/,"").replace(/_/g," ")+" "+this.label+"</b> has been set.";
        
    if(this.dependency){
      window[this.dependency+'delay'] = true;
    }
  },
 
   fireEvent: function(element,event){
    if ((document.createEventObject && !dojo.isIE) || (document.createEventObject && dojo.isIE && dojo.isIE < 9)){
      var evt = document.createEventObject();
      return element.fireEvent('on'+event,evt);
    }else{
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent(event, true, true );
      return !element.dispatchEvent(evt);
    }
  }
});


dojo.declare("OfflajnList", null, {
	constructor: function(args) {
    this.fireshow = 0;
    this.map = {};
    this.names = new Array();
    this.list = new Array;
	  dojo.mixin(this,args);
    this.showed = 0;
    this.focus = 0;
    this.zindex = 6;
    window.offlajnlistzindex = 10;
    if(this.height) this.height++;
    this.lineHeight = 20;
    this.init();
  },
  
  init: function() { 
    this.hidden = dojo.byId(this.name);
    this.active = this.hidden;
    
    this.hidden.listobj = this;
    this.hidden.options = this.options;
    this.hidden.selectedIndex = this.selectedIndex;

    dojo.connect(this.hidden, 'onchange', this, 'setValue');
    this.change = 0;
    
    this.container = dojo.byId('offlajnlistcontainer' + this.name);
    dojo.style(this.container, 'minWidth', Math.ceil(dojo.style(this.container, 'width')+1)+'px');
    if(dojo.isIE == 7) {
      var span = dojo.query('#offlajnlistcontainer' + this.name + ' span');
      dojo.style(this.container, 'width', dojo.style(span[0], 'width')+30+'px');
    }
    this.offlajnlist = dojo.query('.offlajnlist', this.container)[0];
    
    this.currentText = dojo.query('.offlajnlistcurrent', this.container)[0];
    dojo.connect(this.container, 'onclick', this, 'controller');
    this.options.forEach(function(o, i){
      this.map[o.value] = i;
      this.names[i] = o.text;
    },this);
    this.keyListener;
  },
  
  initSelectBox: function(){
    if(this.selectbox) return;
    
    this.selectbox = dojo.create('div', {'id': 'offlajnlistelements' + this.name, 'class': 'offlajnlistelements', 'innerHTML': this.elements }, this.container, "after");
    this.list = dojo.query('.listelement', this.selectbox);
    
    
    this.list.connect('onmouseenter', this, 'addActive');
    
    dojo.style(this.selectbox, {
      opacity: 0,
      display: 'block'
    });
    
    this.lineHeight = dojo.position(this.list[0]).h;
    dojo.style(this.selectbox, {
      height: (this.height) ? this.height * this.lineHeight + 'px' : 'auto'
    });
    
    if(this.height) {
      this.content = dojo.query('#offlajnlistelements' + this.name + ' .content')[0];
      dojo.style(this.content, 'height', this.list.length * this.lineHeight + 'px');
      this.scrollbar = new OfflajnScroller({
        'extraClass': 'single-select',
        'selectbox': this.selectbox,
        'content': this.content
      });
    }
    
    this.maxW = 0;
    this.list.forEach(function(el, i){
      if (this.options[i].value == 'optgroup') dojo.addClass(el, "optgroup");
      el.i = i;
    },this);
    
    this.list.connect('onclick', this, 'selected');
    
    this.selectbox.h = dojo.marginBox(this.selectbox).h;
    dojo.style(this.selectbox, {
      height: 0
    });
    dojo.connect(document, 'onclick', this, 'blur');
    dojo.connect(this.selectbox, 'onclick', this, 'focused');
    
    if(this.fireshow)
      this.fireEvent(this.hidden, 'click');
  },
  
  controller: function(){
    this.focused();
    this.initSelectBox();
    if(this.showed == 0){
      this.reposition();
      this.showList();
    }else{
      this.hideList();
    }
  },
  
  reposition: function(){
    var pos = dojo.coords(this.container, true);
    if(this.selectbox){
      dojo.style(this.selectbox, {
        left: pos.l + "px",
        top: pos.t + pos.h  + "px",
        width: pos.w -2 +"px" //-2px because of the side-borders
      });
      if(this.content) {
        dojo.style(this.content,{
        
         'width': pos.w - 12 + 'px',
         'float': 'left'
         });
      }
    }
  },
  
  showList: function(){
    this.keyListener = dojo.connect(document, 'keydown', this, 'keySearch');
    if(this.anim) this.anim.stop();
    this.showed = 1;
    dojo.addClass(this.container,'openedlist');
    dojo.addClass(this.selectbox,'openedlist');
    dojo.removeClass(this.active,'active');
    dojo.addClass(this.list[this.hidden.selectedIndex],'selected active');
    if(this.height) {
      var p = this.hidden.selectedIndex * this.lineHeight;
      this.scrollbar.setPosition(p);
    }
    this.active = this.list[this.hidden.selectedIndex];
    
    dojo.style(this.offlajnlist, 'zIndex', ++window.offlajnlistzindex);
    dojo.style(this.selectbox, {
      display: 'block',
      zIndex: window.offlajnlistzindex-1
    });
    window.offlajnlistzindex++;
    
    this.anim = dojo.animateProperty({
      node: this.selectbox,
      properties: {
          opacity : 1,
          height: this.selectbox.h
      }
    }).play();
  },
  
  keySearch: function(e) {
    //console.log(String.fromCharCode(e.keyCode));
    if(e.keyCode == 13) {
      this.hideList();
      this.fireEvent(this.hidden, 'change');
      this.change = 0;
    } else if(e.keyCode == 38) {
      e.preventDefault();
      var index = this.hidden.selectedIndex-1;  
        this.setSelected(index);        
    } else if(e.keyCode == 40) {
      e.preventDefault();
      var index = this.hidden.selectedIndex+1;
        this.setSelected(index);
    }
    //console.log(this.names);
    var scroll = this.scrollbar;
    for(var i=0;i<this.names.length;i++) {
      if(this.names[i].toLowerCase().indexOf(String.fromCharCode(e.keyCode).toLowerCase()) == 0) {
        this.setSelected(i);        
        break;
      } 
    } 
  },
  
  hideList: function(){
    dojo.disconnect(this.keyListener);
    if(this.anim) this.anim.stop();
    if(!this.selectbox) return;
    
    this.showed = 0;

    var h = dojo.marginBox(this.selectbox).h;
    dojo.removeClass(this.container,'openedlist');
    this.anim = dojo.animateProperty({
      node: this.selectbox,
      properties: {
          opacity : 0,
          height: 0
      },
      onEnd: dojo.hitch(this, function(el){
        dojo.style(el, {
          display: 'none',
          height: '0',
          zIndex: this.zindex-1
        });
        dojo.style(this.offlajnlist, 'zIndex', this.zindex);
        dojo.removeClass(this.selectbox,'openedlist');
      })
    }).play();
  },
  
  selected: function(e){
    if (dojo.hasClass(e.currentTarget, 'optgroup')) return;
    if(this.list[this.hidden.selectedIndex])
      dojo.removeClass(this.list[this.hidden.selectedIndex],'selected active');
    this.hidden.selectedIndex = e.target.i;
    this.hidden.value = this.hidden.options[this.hidden.selectedIndex].value;
    
    this.currentText.innerHTML = this.hidden.options[this.hidden.selectedIndex].text;
    if(this.list[this.hidden.selectedIndex])
      dojo.addClass(this.list[this.hidden.selectedIndex],'selected active');
    this.hideList();
    this.fireEvent(this.hidden, 'change');
    this.change = 0;
  },
  
  setSelected: function(val) {
    if(!this.list[val]) return;
    if(this.list[this.hidden.selectedIndex])
      dojo.removeClass(this.list[this.hidden.selectedIndex],'selected active');
    
    this.hidden.selectedIndex = val;
    this.hidden.value = this.hidden.options[this.hidden.selectedIndex].value;
    
    this.currentText.innerHTML = this.hidden.options[this.hidden.selectedIndex].text;
    if(this.list[this.hidden.selectedIndex])
      dojo.addClass(this.list[this.hidden.selectedIndex],'selected active');
      
    if(this.height) {
        var p = this.hidden.selectedIndex * this.lineHeight;
        this.scrollbar.setPosition(p);
    }
  },
  
  addActive: function(e){
    var el = e.target;
    if(el != this.active){
      dojo.removeClass(this.active,'active');
      dojo.addClass(el,'active');
      this.active = el;
    }
  },

  focused: function(){
    this.focus = 1;
  },

  blur: function(e){
    if(!this.focus){
      this.hideList();
    }
    this.focus = 0;
  },

  setValue: function(e) {
    if(!this.change && this.map[this.hidden.value] != this.hidden.selectedIndex) {
      this.change = 1;
      e.target.i = this.map[this.hidden.value] ? this.map[this.hidden.value] : 0;
      this.selected(e);
    }
  },

  fireEvent: function(element,event){
    if ((document.createEventObject && !dojo.isIE) || (document.createEventObject && dojo.isIE && dojo.isIE < 9)){
      var evt = document.createEventObject();
      return element.fireEvent('on'+event,evt);
    }else{
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent(event, true, true );
      return !element.dispatchEvent(evt);
    }
  }
});

dojo.declare("OfflajnScroller", null, {
	constructor: function(args) {
   this.scrollspeed = 10;
   this.curr = 0;
	 dojo.mixin(this,args);
	 this.initScrollbar();
  },
  
  initScrollbar: function() {
    (!dojo.isMozilla) ? dojo.connect(this.selectbox, 'onmousewheel', this, 'scrollWheel') : dojo.connect(this.selectbox, 'DOMMouseScroll', this, 'scrollWheel');
    var right = dojo.create('div', {'class': 'gk_hack offlajnscrollerright'}, this.selectbox);
    this.sc = dojo.create('div', {'class': 'gk_hack offlajnscrollerbg'}, right);
    this.scrollbg = dojo.create('div', {'class': 'gk_hack offlajnscrollerscrollbg'}, this.sc);
    this.scrollbtn = dojo.create('div', {'class': 'gk_hack offlajnscrollerscrollbtn'} ,this.sc );
    if(this.extraClass) {
      dojo.addClass(right, this.extraClass);
      dojo.addClass(this.sc, this.extraClass);
      dojo.addClass(this.scrollbg, this.extraClass);
      dojo.addClass(this.scrollbtn, this.extraClass);
    }
    if(this.extraClass == 'multi-select') {
      this.scrollup = dojo.create('div', {'class': 'gk_hack offlajnscrollerarrowup'}, this.sc, 'first');
      this.scrolldown = dojo.create('div', {'class': 'gk_hack offlajnscrollerarrowdown' }, this.sc, 'last');     
      this.scrupc = dojo.connect(this.scrollup, 'onmousedown', this, 'upScroll');
      this.scrdownc = dojo.connect(this.scrolldown, 'onmousedown', this, 'downScroll');   
    }    
    dojo.connect(this.scrollbtn, 'onmousedown', this, 'onscrolldown');
    dojo.connect(this.scrollbg, 'onclick', this, 'scrollTo');
    this.scrbg = dojo.position(this.scrollbg, true);
    this.scrollbtnprop = dojo.position(this.scrollbtn, true);
    
    this.scrollReInit();
  },
  
  scrollReInit: function(){
    dojo.style(this.scrollbtn, 'display', 'block');
    this.maxHeight = parseInt(dojo.position(this.content).h);
    this.windowHeight = parseInt(dojo.style(this.selectbox, 'height'));
    this.scrollRatio = this.maxHeight/this.windowHeight;
    
    this.maxTop = -1 * (this.maxHeight-this.windowHeight);
    if(this.maxTop > 0) this.maxTop = 0;
    var scrollArrowHeight = 0;
    this.scrollHeight = 0;
    var marginVertical = dojo.marginBox(this.scrollbg).h-dojo.position(this.scrollbg).h;
    if(this.extraClass == 'multi-select') {
      scrollArrowHeight = dojo.marginBox(this.scrollup).h;
      this.scrollHeight = (this.windowHeight+(-2*scrollArrowHeight-marginVertical-2));
      this.scrollBtnmaxTop = (this.scrollHeight-this.scrollHeight/this.scrollRatio)-2;
    } else {
      this.scrollHeight = (this.windowHeight-10);
      this.scrollBtnmaxTop = (this.scrollHeight-this.scrollHeight/this.scrollRatio);
    }
    dojo.style(this.scrollbg, 'height', this.scrollHeight+'px');
    var scrollBtn = (this.scrollHeight/this.scrollRatio-2);
    if(scrollBtn<10){
      scrollBtn = 10;
      this.scrollBtnmaxTop = (this.scrollHeight-scrollBtn-2);
    }
    this.scrollBtnH = scrollBtn;
    dojo.style(this.scrollbtn, 'height', scrollBtn+'px');
    if(this.scrollBtnmaxTop < 0) this.scrollBtnmaxTop = 0; 
    if(this.windowHeight > this.maxHeight) this.hideScrollBtn();  
  },
  
  hideScrollBtn: function() {
    dojo.style(this.scrollbtn, 'display', 'none');
  },
  
  goToBottom: function(){
    this.scrolling(-1000,1000);
  },
  
  onscrolldown: function(e) {
    this.scrdown = 1;
    this.currentpos = e.clientY;
    this.scrbtnpos = dojo.style(this.scrollbtn, 'top');
    this.mousemove = dojo.connect(document, 'onmousemove', this, 'onscrollmove');
    this.mouseup = dojo.connect(document, 'onmouseup', this, 'mouseUp');
  },
  
  onscrollmove: function(e) {
    var diff = this.currentpos-e.clientY;
    if(diff == 0) return;
    var lastt = (dojo.style(this.scrollbtn, 'top'));
    var pos = dojo.style(this.content, 'top');
    this.scrolling(diff, 	(((lastt-diff)/this.scrollBtnmaxTop)*this.maxTop-pos)/diff);
    this.currentpos = e.clientY;
  },
  
  scrollTo: function(e) {
    var pos = e.clientY;
    var sc = dojo.position(this.scrollbg);
    var currpos = pos - sc.y;    
    if(currpos < this.maxTop) currpos = maxTop; 
    if(currpos > this.scrollBtnmaxTop) currpos = this.scrollBtnmaxTop;
    dojo.style(this.scrollbtn, 'top', currpos + 'px');
    var scroll = -1*currpos * this.scrollRatio;
    dojo.style(this.content, 'top', scroll + 'px');
  },
  
  setPosition: function(p) {
    var pos = -1*p;
    if(pos < this.maxTop) pos = this.maxTop;
    this.setScrollBtn(pos);
    dojo.style(this.content, 'top', pos + 'px');
  },
  
  onscrollup: function(e) {
    e.stopPropagation();
    this.scrdown = 0;
  },
  
  upScroll: function(e) {
    this.mouseup = dojo.connect(document, 'onmouseup', this, 'mouseUp');
    e.stopPropagation();
    this.btnScroll(1);
  },
  
  downScroll: function(e) {
    this.mouseup = dojo.connect(document, 'onmouseup', this, 'mouseUp');
    e.stopPropagation();
    this.btnScroll(-1);
  },
  
  btnScroll: function(direction){
    this.dscr = 1;
    var fn = dojo.hitch(this, 'scrolling', direction, this.scrollspeed/4);
    fn();
    this.inter = window.setInterval(fn, 50);
  },
    
  scrolling: function(p, ratio) {
    if(ratio == undefined) ratio = this.scrollspeed;
    var pos = dojo.style(this.content, 'top');
    var scr = pos + (p * ratio);

    
    if(scr < this.maxTop) scr = this.maxTop;
    if(scr > 0) scr = 0;
    dojo.style(this.content, 'top', scr + 'px');
   
    this.setScrollBtn(scr);
    this.curr = scr;
    this.onScroll();
  },
  
  onScroll: function(){
  
  },
    
  setScrollBtn: function(val) {
    var top = (this.scrollBtnmaxTop*(val/this.maxTop));
    dojo.style(this.scrollbtn, 'top', top+'px');
  },
  
  mouseUp: function(e) {
    if(this.mousemove)
      dojo.disconnect(this.mousemove);
    if(this.mouseup)
      dojo.disconnect(this.mouseup);
    e.stopPropagation();
    this.inter = window.clearInterval(this.inter);
    if( this.dscr == 1) {
      this.dscr = 0;
    }
  },
  
  scrollWheel: function(e) {
    var pos = 0;
    pos = (e.detail != "") ? e.detail : e.wheelDelta;  
    if(dojo.isMozilla || dojo.isOpera) {  
      if (pos < 0) {
        this.scrolling(1);
      } else {
        this.scrolling(-1);
      }
    } else {
      if (pos < 0) {
        this.scrolling(-1);
      } else {
        this.scrolling(1);
      }
    }
    dojo.stopEvent(e);
  }
  
});


dojo.declare("OfflajnCombine", null, {
	constructor: function(args) {
    dojo.mixin(this,args);
    this.fields = new Array();
    this.init();
  },
  
  
  init: function() {
    this.hidden = dojo.byId(this.id);
    //console.log(this.hidden.value);
    dojo.connect(this.hidden, 'onchange', this, 'reset');
    for(var i = 0;i < this.num; i++){
      this.fields[i] = dojo.byId(this.id+i);
      this.fields[i].combineobj = this;
      if(this.fields[i].loaded) this.fields[i].loaded();
      dojo.connect(this.fields[i], 'change', this, 'change');
    }
    this.reset();
    
    this.outer = dojo.byId('offlajncombine_outer' + this.id);
    this.items = dojo.query('.offlajncombinefieldcontainer', this.outer);
    if(this.switcherid) {
      this.switcher = dojo.byId(this.switcherid);
      dojo.connect(this.switcher, 'onchange', this, 'hider');
      this.hider();
    }
  },
  
  reset: function(){
    this.value = this.hidden.value;
    //console.log(this.hidden);
    var values = this.value.split('|*|');
    for(var i = 0;i < this.num; i++){
      if(this.fields[i].value != values[i]){
        this.fields[i].value = values[i];
        this.fireEvent(this.fields[i], 'change');
      }
    }
  },
  
  change: function(){
    var value = '';
    for(var i = 0;i < this.num; i++){
      value+= this.fields[i].value+'|*|';
    }
    this.hidden.value = value;
    this.fireEvent(this.hidden, 'change');
  },
  
  hider: function() {
    var w = dojo.position(this.outer).w;
    if(!this.hiderdiv) { 
      //this.hiderdiv = dojo.query('.offlajncombine_hider', this.switcher.parentNode.parentNode.parentNode)[0];
      this.hiderdiv = dojo.query('.offlajncombine_hider', this.switcher.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode)[0];
      
      dojo.style(this.hiderdiv, 'width',  w - 38 + 'px');
    }
    
    var switcherVal = this.switcher.value;
    
    
    
    if(this.islist == 1){
      if(switcherVal > 0) {
        switcherVal=0;
      } else {
        switcherVal=1;
      }
    }
    
    if(switcherVal == 0) {
      this.items.forEach(function(item, i){
        if(i >= this.hideafter && item != this.switcher.parentNode.parentNode) dojo.style(item, 'opacity', '0.5');
      }, this);
      if(this.hideafter == 0)
        dojo.style(this.hiderdiv, 'display', 'block');
    } else {
      this.items.forEach(function(item, i){
        if(item != this.switcher.parentNode.parentNode) dojo.style(item, 'opacity', '1');
      }, this);
      if(this.hideafter == 0)
        dojo.style(this.hiderdiv, 'display', 'none');
    }
  },

  fireEvent: function(element,event){
    if ((document.createEventObject && !dojo.isIE) || (document.createEventObject && dojo.isIE && dojo.isIE < 9)){
      var evt = document.createEventObject();
      return element.fireEvent('on'+event,evt);
    }else{
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent(event, true, true );
      return !element.dispatchEvent(evt);
    }
  }
});


dojo.declare("OfflajnText", null, {
	constructor: function(args) {
    dojo.mixin(this,args);
    this.init();
  },
  
  
  init: function() {
    this.hidden = dojo.byId(this.id);
    dojo.connect(this.hidden, 'change', this, 'reset');
    
    this.input = dojo.byId(this.id+'input');
    this.switcher = dojo.byId(this.id+'unit');
  
    
    if(this.validation == 'int'){
      dojo.connect(this.input, 'keyup', this, 'validateInt');
      this.validateInt();
    }else if(this.validation == 'float'){
      dojo.connect(this.input, 'keyup', this, 'validateFloat');
      this.validateFloat();
    }
    dojo.connect(this.input, 'onblur', this, 'change');
    if(this.switcher){
      dojo.connect(this.switcher, 'change', this, 'change');
    }else{
      if(this.attachunit != '')
        this.switcher = {'value': this.attachunit, 'noelement':true};
      
    }
    this.container = dojo.byId('offlajntextcontainer' + this.id);
    if(this.mode == 'increment') {
      this.arrows = dojo.query('.arrow', this.container);
      dojo.connect(this.arrows[0], 'onmousedown', dojo.hitch(this, 'mouseDown', 1));
      dojo.connect(this.arrows[1], 'onmousedown', dojo.hitch(this, 'mouseDown', -1));
    }
    dojo.connect(this.input, 'onfocus', this, dojo.hitch(this, 'setFocus', 1));
    dojo.connect(this.input, 'onblur', this, dojo.hitch(this, 'setFocus', 0));
  },
  
  reset: function(e){
    if(this.hidden.value != this.input.value+(this.switcher? '||'+this.switcher.value : '')){
      var v = this.hidden.value.split('||');
      this.input.value = v[0];
      if(this.switcher && this.switcher.noelement != true){
        this.switcher.value = v[1];
        this.fireEvent(this.switcher, 'change');
      }
      if(e) dojo.stopEvent(e);
      this.fireEvent(this.input, 'change');
    }
  },
  
  change: function(){
    this.hidden.value = this.input.value+(this.switcher? '||'+this.switcher.value : '');
    this.fireEvent(this.hidden, 'change');
    if(this.onoff) this.hider();
  },
  
  setFocus: function(mode) {
    if(mode){
      dojo.addClass(this.input.parentNode, 'focus');
    } else {
      dojo.removeClass(this.input.parentNode, 'focus');
    }
  },
  
  hider: function() {
    if(!this.hiderdiv) {
      this.hiderdiv = dojo.create('div', {'class': 'offlajntext_hider'}, this.container);
      dojo.style(this.hiderdiv, 'width', dojo.position(this.container).w + 'px');
    }
    if(parseInt(this.switcher.value)) {
      dojo.style(this.container, 'opacity', '1');
      dojo.style(this.hiderdiv, 'display', 'none');
    } else {
      dojo.style(this.container, 'opacity', '0.5');
      dojo.style(this.hiderdiv, 'display', 'block');
    }
  },
  
  validateInt: function(){
    var val = parseInt(this.input.value, 10);
    if(!val) val = 0;
    this.input.value = val;
  },
  
  validateFloat: function(){
    var val = parseFloat(this.input.value);
    if(!val) val = 0;
    this.input.value = val;
  },
  
  mouseDown: function(m){
    dojo.connect(document, 'onmouseup', this, 'mouseUp');
    var f = dojo.hitch(this, 'modifyValue', m);
    f();
    this.interval = setInterval(f, 200);
  },
  
  mouseUp: function(){
    clearInterval(this.interval);
  },

  modifyValue: function(m) {
    var val = 0;
    if(this.validation == 'int') {
      val = parseInt(this.input.value);
    } else if(this.validation == 'float') {
      val = parseFloat(this.input.value);
    }
    val = val + m*this.scale;
    if(val < 0 && this.minus == 0) val = 0; 
    this.input.value = val;
    this.change();
    this.fireEvent(this.input, 'change');
  },

  fireEvent: function(element,event){
    if ((document.createEventObject && !dojo.isIE) || (document.createEventObject && dojo.isIE && dojo.isIE < 9)){
      var evt = document.createEventObject();
      return element.fireEvent('on'+event,evt);
    }else{
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent(event, true, true );
      return !element.dispatchEvent(evt);
    }
  }
});


dojo.declare("OfflajnImagemanager", null, {
	constructor: function(args) {
    this.dnd = false;
    dojo.mixin(this,args);
    this.map = {};
    var div = document.createElement('div');
    if(typeof(FileReader) != "undefined" && !!FileReader && (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div))){
      this.dnd = true;
    }
    this.init();
  },
  
  
  init: function() {
    this.btn = dojo.byId('offlajnimagemanager'+this.id);
    dojo.connect(this.btn, 'onclick', this, 'showWindow');

    this.selectedImage = "";
    this.hidden = dojo.byId(this.id);
    dojo.connect(this.hidden, 'change', this, 'reset');

    // fix for default value when Joomla is in a subfolder
    if (this.hidden.value.indexOf(this.siteurl) < 0) {
      dojo.attr(this.hidden, 'value', this.siteurl + this.hidden.value);
    }
    
    this.imgprev = dojo.query('.offlajnimagemanagerimg div', this.btn)[0];
    //if(this.hidden.value != "") dojo.style(this.imgprev,'backgroundImage','url("'+this.root+this.hidden.value+'")');
    if(this.hidden.value != "") dojo.style(this.imgprev,'backgroundImage','url("'+this.hidden.value+'")');
    this.images = new Array();
  },
  
  reset: function(){
    if(this.hidden.value != this.selectedImage){
      // fix for default value when Joomla is in a subfolder && param is in combine
      if (this.hidden.value.indexOf(this.siteurl) < 0) {
        dojo.attr(this.hidden, 'value', this.siteurl + this.hidden.value);
      }

      this.selectedImage = this.hidden.value;
      if(this.selectedImage == '') this.selectedImage = this.folder;
      this.saveImage();
      this.fireEvent(this.hidden, 'change');
    }
  },
  
  showOverlay: function(){
    if(!this.overlayBG){
      this.overlayBG = dojo.create('div',{'class': 'blackBg'}, dojo.body());
    }
    dojo.removeClass(this.overlayBG, 'hide');
    dojo.style(this.overlayBG,{
      'opacity': 0.3
    });
  },
  
  showWindow: function(){
    this.showOverlay();
    if(!this.window){
      this.window = dojo.create('div', {'class': 'OfflajnWindow'}, dojo.body());
      var closeBtn = dojo.create('div', {'class': 'OfflajnWindowClose'}, this.window);
      dojo.connect(closeBtn, 'onclick', this, 'closeWindow');
      var inner = dojo.create('div', {'class': 'OfflajnWindowInner'}, this.window);
      dojo.create('h3', {'innerHTML': 'Image Manager'}, inner);
      dojo.create('div', {'class': 'OfflajnWindowLine'}, inner);
      var imgAreaOuter = dojo.create('div', {'class': 'OfflajnWindowImgAreaOuter'}, inner);
      this.imgArea = dojo.create('div', {'class': 'OfflajnWindowImgArea'}, imgAreaOuter);
      
      dojo.place(this.createFrame(''), this.imgArea);
      
      for(var i in this.imgs){
        if(i >=0 )
          dojo.place(this.createFrame(this.imgs[i]), this.imgArea);
      }
      
      var left = dojo.create('div', {'class': 'OfflajnWindowLeftContainer'}, inner);
      var right = dojo.create('div', {'class': 'OfflajnWindowRightContainer'}, inner);
      
      dojo.create('h4', {'innerHTML': 'Upload Your Image'}, left);
      if (this.dnd) {
        this.uploadArea = dojo.create('div', { 'innerHTML': 'Drag images here or<br />', 'class': 'OfflajnWindowUploadarea'}, left);
        
        this.input = dojo.create('input', {'type': 'file'}, this.uploadArea);
        dojo.create('span', {innerHTML: 'Upload', 'class': 'upload'}, this.uploadArea);
        
        dojo.style(this.input, 'display', 'none');
        dojo.connect(this.uploadArea, 'onclick', this, 'openFilebrowser');
        dojo.connect(this.input, 'onchange', this, 'uploadInputFile');
      }else{
        this.uploadArea = dojo.create('form', {
          'action': 'index.php?option=offlajnupload&identifier='+this.identifier,
          'enctype': 'multipart/form-data',
          'method': 'post',
          'target': 'uploadiframe',
          'class': 'OfflajnWindowUploadareaForm'
        }, left);
        dojo.create('input', {'name': 'img', 'type': 'file'}, this.uploadArea);
        dojo.create('button', {'innerHTML': 'Upload', 'type': 'submit'}, this.uploadArea);
        var iframe = dojo.create('iframe', {'name': 'uploadiframe', 'style': 'display:none;'}, this.uploadArea);
        dojo.connect(iframe, 'onload', this, 'alterUpload');
      }
      
      dojo.create('h4', {'innerHTML': 'Currently Selected Image'}, right);
      
      this.selectedframe = dojo.create('div', {'class': 'OfflajnWindowImgFrame'}, right);
      this.selectedframe.img1 = dojo.create('div', {'class': 'OfflajnWindowImgFrameImg'}, this.selectedframe);
      this.selectedframe.img2 = dojo.create('img', {}, this.selectedframe);
      dojo.create('div', {'class': 'OfflajnWindowImgFrameSelected'}, this.selectedframe);
      
      dojo.connect(this.selectedframe, 'onmouseenter', dojo.hitch(this,function(img){dojo.addClass(img, 'show');}, this.selectedframe.img2));
      dojo.connect(this.selectedframe, 'onmouseleave', dojo.hitch(this,function(img){dojo.removeClass(img, 'show');}, this.selectedframe.img2));
      
      dojo.create('div', {'class': 'OfflajnWindowDescription', 'innerHTML': this.description}, right);
      
      var saveCont = dojo.create('div', {'class': 'OfflajnWindowSaveContainer'}, right);
      var savebtn = dojo.create('div', {'class': 'OfflajnWindowSave', 'innerHTML': 'SAVE'}, saveCont);
      dojo.connect(savebtn, 'onclick', this, 'saveImage');
      
      this.initUploadArea();
      
      this.scrollbar = new OfflajnScroller({
        'extraClass': 'multi-select',
        'selectbox': this.imgArea.parentNode,
        'content': this.imgArea,
        'scrollspeed' : 30
      });
    }
    dojo.removeClass(this.window, 'hide');
    this.exit = dojo.connect(document, "onkeypress", this, "keyPressed");
    this.loadSavedImage();
  },
  
  loadSavedImage: function() {
    var val = this.hidden.value;
    if(val == "") val = this.folder;
    val = val.replace(this.siteurl, "");
    if(val == '' || this.images[val] == undefined) return;
    var el = this.images[val];
    el.currentTarget = el.parentNode;
    this.select(el);
  },
  
  closeWindow: function(){
    dojo.addClass(this.window, 'hide');
    dojo.addClass(this.overlayBG, 'hide');
  },
  
  openFilebrowser: function(e){
    if(e.target == this.input) return;
    this.input.click();
  },
  
  createFrame: function(im, folder){
    if(!folder) folder = this.folder;
    if(this.map[im]){
      dojo.place(this.map[im], this.map[im].parentNode, 'last');
      return this.map[im];
    }
    var frame = dojo.create('div', {'class': 'OfflajnWindowImgFrame'});
    dojo.create('div', {'class': 'OfflajnWindowImgFrameImg', 'style': (im != '' ? {
      'backgroundImage': 'url("'+this.root+folder+im+'")'
    }:{}) }, frame);
    if(im != '')
      var img = dojo.create('img', {'src': this.root+folder+im}, frame);
    
    var caption = im != '' ? im.replace(/^.*[\\\/]/, '') : 'No image';
    dojo.create('div', {'class': 'OfflajnWindowImgFrameCaption', 'innerHTML': "<span>"+caption+"</span>"}, frame);
    
    frame.selected = dojo.create('div', {'class': 'OfflajnWindowImgFrameSelected'}, frame);
    
    frame.img = im;
    this.map[im] = frame;
    if(im != ''){
      dojo.connect(frame, 'onmouseenter', dojo.hitch(this,function(img){dojo.addClass(img, 'show');}, img));
      dojo.connect(frame, 'onmouseleave', dojo.hitch(this,function(img){dojo.removeClass(img, 'show');}, img));
      this.images[folder+im] = img;
    }
    dojo.connect(frame, 'onclick', this, 'select');
    return frame;
  },
  
  select: function(e){
    var el = e.currentTarget;
    if(el.img != this.active && this.map[this.active]){
      dojo.removeClass(this.map[this.active], 'active');
    }
    dojo.addClass(el, 'active');
    this.active = el.img;
    dojo.style(this.selectedframe.img1, 'backgroundImage', 'url("'+this.root+this.folder+this.active+'")');
    dojo.attr(this.selectedframe.img2, 'src', this.root+this.folder+this.active);
    this.selectedImage = this.folder+this.active;
    dojo.addClass(this.selectedframe, 'active');
  },
  
  initUploadArea: function(){
    dojo.connect(this.uploadArea, "ondragleave", this, function(e){
      var target = e.target;
    	if (target && target === this.uploadArea) {
    		dojo.removeClass(this.uploadArea, 'over');
    	}
      dojo.stopEvent(e);
    });
    dojo.connect(this.uploadArea, "ondragenter", this, function(e){
    	dojo.addClass(this.uploadArea, 'over');
      dojo.stopEvent(e);
    });
    dojo.connect(this.uploadArea, "ondragover", this, function(e){
      dojo.stopEvent(e);
    });
    dojo.connect(this.uploadArea, "ondrop", this, function(e){
    	this.filesAdded(e.dataTransfer.files);
    	dojo.removeClass(this.uploadArea, 'over');
      dojo.stopEvent(e);
    });
  },
  
  filesAdded: function(files){
    if (typeof files !== "undefined") {
  		for (var i=0, l=files.length; i<l; i++){
  			this.uploadFile(files[i]);
  		}
  	}
    this.scrollbar.scrollReInit();
    this.scrollbar.goToBottom();
  },
  
  uploadInputFile: function(){
    this.uploadFile(this.input.files[0]);
    this.scrollbar.scrollReInit();
    this.scrollbar.goToBottom();
  },
  
  uploadFile: function(file){
    var xhr = new XMLHttpRequest();
    xhr.open("post", this.uploadurl+"&name="+file.name+"&identifier="+this.identifier, true);
    
    // Set appropriate headers
    var boundary = "upload--"+(new Date).getTime();
    //xhr.setRequestHeader("Content-Type", "multipart/form-data; boundary=");
    xhr.setRequestHeader("X-File-Name", file.name);
    xhr.setRequestHeader("X-File-Size", file.fileSize);
    xhr.setRequestHeader("X-File-Type", file.type);

    dojo.connect(xhr, 'onload',dojo.hitch(this,'fileUploaded', file.name, xhr));
    
    if(xhr.upload)
      dojo.connect(xhr.upload, 'onprogress', dojo.hitch(this, 'fileProgress', xhr));
    else
      dojo.connect(xhr, 'onprogress', dojo.hitch(this, 'fileProgress', xhr));
      
    var frame = this.createFrame(file.name);
    this.changeFrameImg(frame, 'blank.png', '/media/system/images/');
    
    frame.span = dojo.query('span', frame)[0];
    frame.span.innerHTML = '0%';
    
    
    var caption = dojo.query('.OfflajnWindowImgFrameCaption', frame)[0];
    frame.progress = dojo.create('div', {'class':'progress'}, caption, 'first');
    dojo.place(frame, this.imgArea);
    this.captionW = dojo.position(caption).w-2;
    
    xhr.frame = frame;
    
    xhr.send(file);
  },
  
  changeFrameImg: function(frame, im, folder){
    if(!folder) folder = this.folder;
    dojo.attr(dojo.query("img", frame)[0], 'src', this.root+folder+im+"?"+new Date().getTime()
);
    dojo.style(dojo.query(".OfflajnWindowImgFrameImg", frame)[0], {
      'backgroundImage': 'url("'+this.root+folder+im+"?"+new Date().getTime()+'")'
    });
  },
  
  fileProgress: function(xhr, e){
    if (e.lengthComputable) {
      var ratio = (e.loaded / e.total);
  		xhr.frame.span.innerHTML = parseInt(ratio * 100) + "%";
      dojo.style(xhr.frame.progress, 'width', (ratio*this.captionW)+'px');
  	}
  },
  
  fileUploaded: function(name, xhr, e, data){
    
    var r = eval("(" + xhr.response+ ")");
    if(r.err){
      this.map[name] = null;
      dojo.destroy(xhr.frame);
      alert(r.err);
      return;
    }
    var img = dojo.query('.OfflajnWindowImgFrameImg',xhr.frame)[0];
    dojo.style(img, 'opacity', 0);
    this.changeFrameImg(xhr.frame, name);
    dojo.style(xhr.frame.progress, 'width', this.captionW+'px');
    xhr.frame.span.innerHTML = name;
    
    dojo.animateProperty({
      node: img,
      duration: 1000,
      properties: {
        opacity : 1
      }
    }).play();
    
    setTimeout(dojo.hitch(this,function(p){
      dojo.animateProperty({
        node: p,
        duration: 300,
        properties: {
          opacity : 0
        }
      }).play();
    },xhr.frame.progress),1000);
  },
  
  alterUpload: function(){
    var data = window["uploadiframe"].document.body.innerHTML;
    if(!data || data == '') return;
    var r = eval("(" + window["uploadiframe"].document.body.innerHTML + ")");
    if(r.err){
      alert(r.err);
      return;
    }else if(r.name){
      var frame = this.createFrame(r.name);
      var caption = dojo.query('.OfflajnWindowImgFrameCaption', frame)[0];
      frame.progress = dojo.create('div', {'class':'progress', 'style' : {'width':(dojo.position(caption).w-2)+'px'} }, caption, 'first');
      dojo.place(frame, this.imgArea);
      this.scrollbar.scrollReInit();
      this.scrollbar.goToBottom();
      setTimeout(dojo.hitch(this,function(p){
        dojo.animateProperty({
          node: p,
          duration: 300,
          properties: {
            opacity : 0
          }
        }).play();
      },frame.progress),1000);
    }
  },

  fireEvent: function(element,event){
    if ((document.createEventObject && !dojo.isIE) || (document.createEventObject && dojo.isIE && dojo.isIE < 9)){
      var evt = document.createEventObject();
      return element.fireEvent('on'+event,evt);
    }else{
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent(event, true, true );
      return !element.dispatchEvent(evt);
    }
  },
  
  keyPressed: function(e) {
    if(e.keyCode == 27) { 
      this.closeWindow();
      dojo.disconnect(this.exit);
    }
  },
  
  saveImage: function() {
    //dojo.style(this.imgprev,'backgroundImage', 'url("'+this.root+this.selectedImage+'")');
    dojo.style(this.imgprev,'backgroundImage', 'url("'+this.selectedImage+'")');
    if(this.selectedImage != this.hidden.value) {
      this.closeWindow();
      if(this.folder == this.selectedImage) this.selectedImage = "";
      this.hidden.value = this.siteurl + this.selectedImage;
      this.fireEvent(this.hidden, 'change');
    }
  }
  
});

/*
 * jPicker 1.1.6
 *
 * jQuery Plugin for Photoshop style color picker
 *
 * Copyright (c) 2010 Christopher T. Tillman
 * Digital Magic Productions, Inc. (http://www.digitalmagicpro.com/)
 * MIT style license, FREE to use, alter, copy, sell, and especially ENHANCE
 *
 * Painstakingly ported from John Dyers' excellent work on his own color picker based on the Prototype framework.
 *
 * John Dyers' website: (http://johndyer.name)
 * Color Picker page:   (http://johndyer.name/post/2007/09/PhotoShop-like-JavaScript-Color-Picker.aspx)
 *
 */
(function($, version)
{
  Math.precision = function(value, precision)
    {
      if (precision === undefined) precision = 0;
      return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
    };
  var Slider = // encapsulate slider functionality for the ColorMap and ColorBar - could be useful to use a jQuery UI draggable for this with certain extensions
      function(bar, options)
      {
        var $this = this, // private properties, methods, and events - keep these variables and classes invisible to outside code
          arrow = bar.find('img:first'), // the arrow image to drag
          minX = 0,
          maxX = 100,
          rangeX = 100,
          minY = 0,
          maxY = 100,
          rangeY = 100,
          x = 0,
          y = 0,
          offset,
          timeout,
          changeEvents = new Array(),
          fireChangeEvents =
            function(context)
            {
              for (var i = 0; i < changeEvents.length; i++) changeEvents[i].call($this, $this, context);
            },
          mouseDown = // bind the mousedown to the bar not the arrow for quick snapping to the clicked location
            function(e)
            {
              var off = bar.offset();
              offset = { l: off.left | 0, t: off.top | 0 };
              clearTimeout(timeout);
              timeout = setTimeout( // using setTimeout for visual updates - once the style is updated the browser will re-render internally allowing the next Javascript to run
                function()
                {
                  setValuesFromMousePosition.call($this, e);
                }, 0);
              // Bind mousemove and mouseup event to the document so it responds when dragged of of the bar - we will unbind these when on mouseup to save processing
              $(document).bind('mousemove', mouseMove).bind('mouseup', mouseUp);
              e.preventDefault(); // don't try to select anything or drag the image to the desktop
            },
          mouseMove = // set the values as the mouse moves
            function(e)
            {
              clearTimeout(timeout);
              timeout = setTimeout(
                function()
                {
                  setValuesFromMousePosition.call($this, e);
                }, 0);
              e.stopPropagation();
              e.preventDefault();
              return false;
            },
          mouseUp = // unbind the document events - they aren't needed when not dragging
            function(e)
            {
              $(document).unbind('mouseup', mouseUp).unbind('mousemove', mouseMove);
              e.stopPropagation();
              e.preventDefault();
              return false;
            },
          setValuesFromMousePosition = // calculate mouse position and set value within the current range
            function(e)
            {
              var locX = e.pageX - offset.l,
                  locY = e.pageY - offset.t,
                  barW = bar.w, // local copies for YUI compressor
                  barH = bar.h;
              // keep the arrow within the bounds of the bar
              if (locX < 0) locX = 0;
              else if (locX > barW) locX = barW;
              if (locY < 0) locY = 0;
              else if (locY > barH) locY = barH;
              val.call($this, 'xy', { x: ((locX / barW) * rangeX) + minX, y: ((locY / barH) * rangeY) + minY });
            },
          draw =
            function()
            {
              var arrowOffsetX = 0,
                arrowOffsetY = 0,
                barW = bar.w,
                barH = bar.h,
                arrowW = arrow.w,
                arrowH = arrow.h;
              setTimeout(
                function()
                {
                  if (rangeX > 0) // range is greater than zero
                  {
                    // constrain to bounds
                    if (x == maxX) arrowOffsetX = barW;
                    else arrowOffsetX = ((x / rangeX) * barW) | 0;
                  }
                  if (rangeY > 0) // range is greater than zero
                  {
                    // constrain to bounds
                    if (y == maxY) arrowOffsetY = barH;
                    else arrowOffsetY = ((y / rangeY) * barH) | 0;
                  }
                  // if arrow width is greater than bar width, center arrow and prevent horizontal dragging
                  if (arrowW >= barW) arrowOffsetX = (barW >> 1) - (arrowW >> 1); // number >> 1 - superfast bitwise divide by two and truncate (move bits over one bit discarding lowest)
                  else arrowOffsetX -= arrowW >> 1;
                  // if arrow height is greater than bar height, center arrow and prevent vertical dragging
                  if (arrowH >= barH) arrowOffsetY = (barH >> 1) - (arrowH >> 1);
                  else arrowOffsetY -= arrowH >> 1;
                  // set the arrow position based on these offsets
                  arrow.css({ left: arrowOffsetX + 'px', top: arrowOffsetY + 'px' });
                }, 0);
            },
          val =
            function(name, value, context)
            {
              var set = value !== undefined;
              if (!set)
              {
                if (name === undefined || name == null) name = 'xy';
                switch (name.toLowerCase())
                {
                  case 'x': return x;
                  case 'y': return y;
                  case 'xy':
                  default: return { x: x, y: y };
                }
              }
              if (context != null && context == $this) return;
              var changed = false,
                  newX,
                  newY;
              if (name == null) name = 'xy';
              switch (name.toLowerCase())
              {
                case 'x':
                  newX = value && (value.x && value.x | 0 || value | 0) || 0;
                  break;
                case 'y':
                  newY = value && (value.y && value.y | 0 || value | 0) || 0;
                  break;
                case 'xy':
                default:
                  newX = value && value.x && value.x | 0 || 0;
                  newY = value && value.y && value.y | 0 || 0;
                  break;
              }
              if (newX != null)
              {
                if (newX < minX) newX = minX;
                else if (newX > maxX) newX = maxX;
                if (x != newX)
                {
                  x = newX;
                  changed = true;
                }
              }
              if (newY != null)
              {
                if (newY < minY) newY = minY;
                else if (newY > maxY) newY = maxY;
                if (y != newY)
                {
                  y = newY;
                  changed = true;
                }
              }
              changed && fireChangeEvents.call($this, context || $this);
            },
          range =
            function (name, value)
            {
              var set = value !== undefined;
              if (!set)
              {
                if (name === undefined || name == null) name = 'all';
                switch (name.toLowerCase())
                {
                  case 'minx': return minX;
                  case 'maxx': return maxX;
                  case 'rangex': return { minX: minX, maxX: maxX, rangeX: rangeX };
                  case 'miny': return minY;
                  case 'maxy': return maxY;
                  case 'rangey': return { minY: minY, maxY: maxY, rangeY: rangeY };
                  case 'all':
                  default: return { minX: minX, maxX: maxX, rangeX: rangeX, minY: minY, maxY: maxY, rangeY: rangeY };
                }
              }
              var changed = false,
                  newMinX,
                  newMaxX,
                  newMinY,
                  newMaxY;
              if (name == null) name = 'all';
              switch (name.toLowerCase())
              {
                case 'minx':
                  newMinX = value && (value.minX && value.minX | 0 || value | 0) || 0;
                  break;
                case 'maxx':
                  newMaxX = value && (value.maxX && value.maxX | 0 || value | 0) || 0;
                  break;
                case 'rangex':
                  newMinX = value && value.minX && value.minX | 0 || 0;
                  newMaxX = value && value.maxX && value.maxX | 0 || 0;
                  break;
                case 'miny':
                  newMinY = value && (value.minY && value.minY | 0 || value | 0) || 0;
                  break;
                case 'maxy':
                  newMaxY = value && (value.maxY && value.maxY | 0 || value | 0) || 0;
                  break;
                case 'rangey':
                  newMinY = value && value.minY && value.minY | 0 || 0;
                  newMaxY = value && value.maxY && value.maxY | 0 || 0;
                  break;
                case 'all':
                default:
                  newMinX = value && value.minX && value.minX | 0 || 0;
                  newMaxX = value && value.maxX && value.maxX | 0 || 0;
                  newMinY = value && value.minY && value.minY | 0 || 0;
                  newMaxY = value && value.maxY && value.maxY | 0 || 0;
                  break;
              }
              if (newMinX != null && minX != newMinX)
              {
                minX = newMinX;
                rangeX = maxX - minX;
              }
              if (newMaxX != null && maxX != newMaxX)
              {
                maxX = newMaxX;
                rangeX = maxX - minX;
              }
              if (newMinY != null && minY != newMinY)
              {
                minY = newMinY;
                rangeY = maxY - minY;
              }
              if (newMaxY != null && maxY != newMaxY)
              {
                maxY = newMaxY;
                rangeY = maxY - minY;
              }
            },
          bind =
            function (callback)
            {
              if ($.isFunction(callback)) changeEvents.push(callback);
            },
          unbind =
            function (callback)
            {
              if (!$.isFunction(callback)) return;
              var i;
              while ((i = $.inArray(callback, changeEvents)) != -1) changeEvents.splice(i, 1);
            },
          destroy =
            function()
            {
              // unbind all possible events and null objects
              $(document).unbind('mouseup', mouseUp).unbind('mousemove', mouseMove);
              bar.unbind('mousedown', mouseDown);
              bar = null;
              arrow = null;
              changeEvents = null;
            };
        $.extend(true, $this, // public properties, methods, and event bindings - these we need to access from other controls
          {
            val: val,
            range: range,
            bind: bind,
            unbind: unbind,
            destroy: destroy
          });
        // initialize this control
        arrow.src = options.arrow && options.arrow.image;
        arrow.w = options.arrow && options.arrow.width || arrow.width();
        arrow.h = options.arrow && options.arrow.height || arrow.height();
        bar.w = options.map && options.map.width || bar.width();
        bar.h = options.map && options.map.height || bar.height();
        // bind mousedown event
        bar.bind('mousedown', mouseDown);
        bind.call($this, draw);
      },
    ColorValuePicker = // controls for all the input elements for the typing in color values
      function(picker, color, bindedHex, alphaPrecision)
      {
        var $this = this, // private properties and methods
          inputs = picker.find('td.Text input'),
          red = inputs.eq(3),
          green = inputs.eq(4),
          blue = inputs.eq(5),
          alpha = inputs.length > 7 ? inputs.eq(6) : null,
          hue = inputs.eq(0),
          saturation = inputs.eq(1),
          value = inputs.eq(2),
          hex = inputs.eq(inputs.length > 7 ? 7 : 6),
          ahex = inputs.length > 7 ? inputs.eq(8) : null,
          keyDown = // input box key down - use arrows to alter color
            function(e)
            {
              if (e.target.value == '' && e.target != hex.get(0) && (bindedHex != null && e.target != bindedHex.get(0) || bindedHex == null)) return;
              if (!validateKey(e)) return e;
              switch (e.target)
              {
                case red.get(0):
                  switch (e.keyCode)
                  {
                    case 38:
                      red.val(setValueInRange.call($this, (red.val() << 0) + 1, 0, 255));
                      color.val('r', red.val(), e.target);
                      return false;
                    case 40:
                      red.val(setValueInRange.call($this, (red.val() << 0) - 1, 0, 255));
                      color.val('r', red.val(), e.target);
                      return false;
                  }
                  break;
                case green.get(0):
                  switch (e.keyCode)
                  {
                    case 38:
                      green.val(setValueInRange.call($this, (green.val() << 0) + 1, 0, 255));
                      color.val('g', green.val(), e.target);
                      return false;
                    case 40:
                      green.val(setValueInRange.call($this, (green.val() << 0) - 1, 0, 255));
                      color.val('g', green.val(), e.target);
                      return false;
                  }
                  break;
                case blue.get(0):
                  switch (e.keyCode)
                  {
                    case 38:
                      blue.val(setValueInRange.call($this, (blue.val() << 0) + 1, 0, 255));
                      color.val('b', blue.val(), e.target);
                      return false;
                    case 40:
                      blue.val(setValueInRange.call($this, (blue.val() << 0) - 1, 0, 255));
                      color.val('b', blue.val(), e.target);
                      return false;
                  }
                  break;
                case alpha && alpha.get(0):
                  switch (e.keyCode)
                  {
                    case 38:
                      alpha.val(setValueInRange.call($this, parseFloat(alpha.val()) + 1, 0, 100));
                      color.val('a', Math.precision((alpha.val() * 255) / 100, alphaPrecision), e.target);
                      return false;
                    case 40:
                      alpha.val(setValueInRange.call($this, parseFloat(alpha.val()) - 1, 0, 100));
                      color.val('a', Math.precision((alpha.val() * 255) / 100, alphaPrecision), e.target);
                      return false;
                  }
                  break;
                case hue.get(0):
                  switch (e.keyCode)
                  {
                    case 38:
                      hue.val(setValueInRange.call($this, (hue.val() << 0) + 1, 0, 360));
                      color.val('h', hue.val(), e.target);
                      return false;
                    case 40:
                      hue.val(setValueInRange.call($this, (hue.val() << 0) - 1, 0, 360));
                      color.val('h', hue.val(), e.target);
                      return false;
                  }
                  break;
                case saturation.get(0):
                  switch (e.keyCode)
                  {
                    case 38:
                      saturation.val(setValueInRange.call($this, (saturation.val() << 0) + 1, 0, 100));
                      color.val('s', saturation.val(), e.target);
                      return false;
                    case 40:
                      saturation.val(setValueInRange.call($this, (saturation.val() << 0) - 1, 0, 100));
                      color.val('s', saturation.val(), e.target);
                      return false;
                  }
                  break;
                case value.get(0):
                  switch (e.keyCode)
                  {
                    case 38:
                      value.val(setValueInRange.call($this, (value.val() << 0) + 1, 0, 100));
                      color.val('v', value.val(), e.target);
                      return false;
                    case 40:
                      value.val(setValueInRange.call($this, (value.val() << 0) - 1, 0, 100));
                      color.val('v', value.val(), e.target);
                      return false;
                  }
                  break;
              }
            },
          keyUp = // input box key up - validate value and set color
            function(e)
            {
              if (e.target.value == '' && e.target != hex.get(0) && (bindedHex != null && e.target != bindedHex.get(0) || bindedHex == null)) return;
              if (!validateKey(e)) return e;
              switch (e.target)
              {
                case red.get(0):
                  red.val(setValueInRange.call($this, red.val(), 0, 255));
                  color.val('r', red.val(), e.target);
                  break;
                case green.get(0):
                  green.val(setValueInRange.call($this, green.val(), 0, 255));
                  color.val('g', green.val(), e.target);
                  break;
                case blue.get(0):
                  blue.val(setValueInRange.call($this, blue.val(), 0, 255));
                  color.val('b', blue.val(), e.target);
                  break;
                case alpha && alpha.get(0):
                  alpha.val(setValueInRange.call($this, alpha.val(), 0, 100));
                  color.val('a', Math.precision((alpha.val() * 255) / 100, alphaPrecision), e.target);
                  break;
                case hue.get(0):
                  hue.val(setValueInRange.call($this, hue.val(), 0, 360));
                  color.val('h', hue.val(), e.target);
                  break;
                case saturation.get(0):
                  saturation.val(setValueInRange.call($this, saturation.val(), 0, 100));
                  color.val('s', saturation.val(), e.target);
                  break;
                case value.get(0):
                  value.val(setValueInRange.call($this, value.val(), 0, 100));
                  color.val('v', value.val(), e.target);
                  break;
                case hex.get(0):
                  hex.val(hex.val().replace(/[^a-fA-F0-9]/g, '').toLowerCase().substring(0, 6));
                  bindedHex && bindedHex.val(hex.val());
                  color.val('hex', hex.val() != '' ? hex.val() : null, e.target);
                  break;
                case bindedHex && bindedHex.get(0):
                  if(bindedHex[0].alphaSupport){
                    bindedHex.val(bindedHex.val().replace(/[^a-fA-F0-9]/g, '').toLowerCase().substring(0, 8));
                    hex.val(bindedHex.val());
                    color.val('ahex', bindedHex.val() != '' ? bindedHex.val() : null, e.target);
                  }else{
                    bindedHex.val(bindedHex.val().replace(/[^a-fA-F0-9]/g, '').toLowerCase().substring(0, 6));
                    hex.val(bindedHex.val());
                    color.val('hex', bindedHex.val() != '' ? bindedHex.val() : null, e.target);
                  }
                  break;
                case ahex && ahex.get(0):
                  ahex.val(ahex.val().replace(/[^a-fA-F0-9]/g, '').toLowerCase().substring(0, 2));
                  color.val('a', ahex.val() != null ? parseInt(ahex.val(), 16) : null, e.target);
                  break;
              }
            },
          blur = // input box blur - reset to original if value empty
            function(e)
            {
              if (color.val() != null)
              {
                switch (e.target)
                {
                  case red.get(0): red.val(color.val('r')); break;
                  case green.get(0): green.val(color.val('g')); break;
                  case blue.get(0): blue.val(color.val('b')); break;
                  case alpha && alpha.get(0): alpha.val(Math.precision((color.val('a') * 100) / 255, alphaPrecision)); break;
                  case hue.get(0): hue.val(color.val('h')); break;
                  case saturation.get(0): saturation.val(color.val('s')); break;
                  case value.get(0): value.val(color.val('v')); break;
                  case hex.get(0):
                  case bindedHex && bindedHex.get(0):
                    if(bindedHex[0].alphaSupport){
                      hex.val(color.val('ahex'));
                      bindedHex && bindedHex.val(color.val('ahex'));
                    }else{
                      hex.val(color.val('hex'));
                      bindedHex && bindedHex.val(color.val('hex'));
                    }
                    break;
                  case ahex && ahex.get(0): ahex.val(color.val('ahex').substring(6)); break;
                }
              }
            },
          validateKey = // validate key
            function(e)
            {
              switch(e.keyCode)
              {
                case 9:
                case 16:
                case 29:
                case 37:
                case 39:
                  return false;
                case 'c'.charCodeAt():
                case 'v'.charCodeAt():
                  if (e.ctrlKey) return false;
              }
              return true;
            },
          setValueInRange = // constrain value within range
            function(value, min, max)
            {
              if (value == '' || isNaN(value)) return min;
              if (value > max) return max;
              if (value < min) return min;
              return value;
            },
          colorChanged =
            function(ui, context)
            {
              var all = ui.val('all');
              if (context != red.get(0)) red.val(all != null ? all.r : '');
              if (context != green.get(0)) green.val(all != null ? all.g : '');
              if (context != blue.get(0)) blue.val(all != null ? all.b : '');
              if (alpha && context != alpha.get(0)) alpha.val(all != null ? Math.precision((all.a * 100) / 255, alphaPrecision) : '');
              if (context != hue.get(0)) hue.val(all != null ? all.h : '');
              if (context != saturation.get(0)) saturation.val(all != null ? all.s : '');
              if (context != value.get(0)) value.val(all != null ? all.v : '');
              if (context != hex.get(0) && (bindedHex && context != bindedHex.get(0) || !bindedHex)) hex.val(all != null ? all.hex : '');
              if(bindedHex[0] && bindedHex[0].alphaSupport){
                if (bindedHex && context != bindedHex.get(0) && context != hex.get(0)) bindedHex.val(all != null ? all.ahex : '');
              }else{
                if (bindedHex && context != bindedHex.get(0) && context != hex.get(0)) bindedHex.val(all != null ? all.hex : '');
              }
              if(bindedHex[0] && OfflajnfireEvent)
                OfflajnfireEvent(bindedHex[0], 'change');
              if (ahex && context != ahex.get(0)) ahex.val(all != null ? all.ahex.substring(6) : '');
            },
          destroy =
            function()
            {
              // unbind all events and null objects
              red.add(green).add(blue).add(alpha).add(hue).add(saturation).add(value).add(hex).add(bindedHex).add(ahex).unbind('keyup', keyUp).unbind('blur', blur);
              red.add(green).add(blue).add(alpha).add(hue).add(saturation).add(value).unbind('keydown', keyDown);
              color.unbind(colorChanged);
              red = null;
              green = null;
              blue = null;
              alpha = null;
              hue = null;
              saturation = null;
              value = null;
              hex = null;
              ahex = null;
            };
        $.extend(true, $this, // public properties and methods
          {
            destroy: destroy
          });
        if(bindedHex && bindedHex[0]){
          if(bindedHex[0].alphaSupport){
            bindedHex.val(bindedHex.val().replace(/[^a-fA-F0-9]/g, '').toLowerCase().substring(0, 8));
          }else{
            bindedHex.val(bindedHex.val().replace(/[^a-fA-F0-9]/g, '').toLowerCase().substring(0, 6));
          }
        }
        red.add(green).add(blue).add(alpha).add(hue).add(saturation).add(value).add(hex).add(bindedHex).add(ahex).bind('keyup', keyUp).bind('change', keyUp).bind('blur', blur);
        red.add(green).add(blue).add(alpha).add(hue).add(saturation).add(value).bind('keydown', keyDown);
        color.bind(colorChanged);
      };
  $.jPicker =
    {
      List: [], // array holding references to each active instance of the control
      Color: // color object - we will be able to assign by any color space type or retrieve any color space info
             // we want this public so we can optionally assign new color objects to initial values using inputs other than a string hex value (also supported)
        function(init)
        {
          var $this = this,
            r,
            g,
            b,
            a,
            h,
            s,
            v,
            changeEvents = new Array(),
            fireChangeEvents = 
              function(context)
              {
                for (var i = 0; i < changeEvents.length; i++) changeEvents[i].call($this, $this, context);
              },
            val =
              function(name, value, context)
              {
                var set = value !== undefined;
                if (!set)
                {
                  if (name === undefined || name == null || name == '') name = 'all';
                  if (r == null) return null;
                  switch (name.toLowerCase())
                  {
                    case 'ahex': return ColorMethods.rgbaToHex({ r: r, g: g, b: b, a: a });
                    case 'hex': return val('ahex').substring(0, 6);
                    case 'all': return { r: r, g: g, b: b, a: a, h: h, s: s, v: v, hex: val.call($this, 'hex'), ahex: val.call($this, 'ahex') };
                    default:
                      var ret={};
                      for (var i = 0; i < name.length; i++)
                      {
                        switch (name.charAt(i))
                        {
                          case 'r':
                            if (name.length == 1) ret = r;
                            else ret.r = r;
                            break;
                          case 'g':
                            if (name.length == 1) ret = g;
                            else ret.g = g;
                            break;
                          case 'b':
                            if (name.length == 1) ret = b;
                            else ret.b = b;
                            break;
                          case 'a':
                            if (name.length == 1) ret = a;
                            else ret.a = a;
                            break;
                          case 'h':
                            if (name.length == 1) ret = h;
                            else ret.h = h;
                            break;
                          case 's':
                            if (name.length == 1) ret = s;
                            else ret.s = s;
                            break;
                          case 'v':
                            if (name.length == 1) ret = v;
                            else ret.v = v;
                            break;
                        }
                      }
                      return ret == {} ? val.call($this, 'all') : ret;
                      break;
                  }
                }
                if (context != null && context == $this) return;
                var changed = false;
                if (name == null) name = '';
                if (value == null)
                {
                  if (r != null)
                  {
                    r = null;
                    changed = true;
                  }
                  if (g != null)
                  {
                    g = null;
                    changed = true;
                  }
                  if (b != null)
                  {
                    b = null;
                    changed = true;
                  }
                  if (a != null)
                  {
                    a = null;
                    changed = true;
                  }
                  if (h != null)
                  {
                    h = null;
                    changed = true;
                  }
                  if (s != null)
                  {
                    s = null;
                    changed = true;
                  }
                  if (v != null)
                  {
                    v = null;
                    changed = true;
                  }
                  changed && fireChangeEvents.call($this, context || $this);
                  return;
                }
                switch (name.toLowerCase())
                {
                  case 'ahex':
                  case 'hex':
                    var ret = ColorMethods.hexToRgba(value && (value.ahex || value.hex) || value || '00000000');
                    val.call($this, 'rgba', { r: ret.r, g: ret.g, b: ret.b, a: name == 'ahex' ? ret.a : a != null ? a : 255 }, context);
                    break;
                  default:
                    if (value && (value.ahex != null || value.hex != null))
                    {
                      val.call($this, 'ahex', value.ahex || value.hex || '00000000', context);
                      return;
                    }
                    var newV = {}, rgb = false, hsv = false;
                    if (value.r !== undefined && !name.indexOf('r') == -1) name += 'r';
                    if (value.g !== undefined && !name.indexOf('g') == -1) name += 'g';
                    if (value.b !== undefined && !name.indexOf('b') == -1) name += 'b';
                    if (value.a !== undefined && !name.indexOf('a') == -1) name += 'a';
                    if (value.h !== undefined && !name.indexOf('h') == -1) name += 'h';
                    if (value.s !== undefined && !name.indexOf('s') == -1) name += 's';
                    if (value.v !== undefined && !name.indexOf('v') == -1) name += 'v';
                    for (var i = 0; i < name.length; i++)
                    {
                      switch (name.charAt(i))
                      {
                        case 'r':
                          if (hsv) continue;
                          rgb = true;
                          newV.r = value && value.r && value.r | 0 || value && value | 0 || 0;
                          if (newV.r < 0) newV.r = 0;
                          else if (newV.r > 255) newV.r = 255;
                          if (r != newV.r)
                          {
                            r = newV.r;
                            changed = true;
                          }
                          break;
                        case 'g':
                          if (hsv) continue;
                          rgb = true;
                          newV.g = value && value.g && value.g | 0 || value && value | 0 || 0;
                          if (newV.g < 0) newV.g = 0;
                          else if (newV.g > 255) newV.g = 255;
                          if (g != newV.g)
                          {
                            g = newV.g;
                            changed = true;
                          }
                          break;
                        case 'b':
                          if (hsv) continue;
                          rgb = true;
                          newV.b = value && value.b && value.b | 0 || value && value | 0 || 0;
                          if (newV.b < 0) newV.b = 0;
                          else if (newV.b > 255) newV.b = 255;
                          if (b != newV.b)
                          {
                            b = newV.b;
                            changed = true;
                          }
                          break;
                        case 'a':
                          newV.a = value && value.a != null ? value.a | 0 : value != null ? value | 0 : 255;
                          if (newV.a < 0) newV.a = 0;
                          else if (newV.a > 255) newV.a = 255;
                          if (a != newV.a)
                          {
                            a = newV.a;
                            changed = true;
                          }
                          break;
                        case 'h':
                          if (rgb) continue;
                          hsv = true;
                          newV.h = value && value.h && value.h | 0 || value && value | 0 || 0;
                          if (newV.h < 0) newV.h = 0;
                          else if (newV.h > 360) newV.h = 360;
                          if (h != newV.h)
                          {
                            h = newV.h;
                            changed = true;
                          }
                          break;
                        case 's':
                          if (rgb) continue;
                          hsv = true;
                          newV.s = value && value.s != null ? value.s | 0 : value != null ? value | 0 : 100;
                          if (newV.s < 0) newV.s = 0;
                          else if (newV.s > 100) newV.s = 100;
                          if (s != newV.s)
                          {
                            s = newV.s;
                            changed = true;
                          }
                          break;
                        case 'v':
                          if (rgb) continue;
                          hsv = true;
                          newV.v = value && value.v != null ? value.v | 0 : value != null ? value | 0 : 100;
                          if (newV.v < 0) newV.v = 0;
                          else if (newV.v > 100) newV.v = 100;
                          if (v != newV.v)
                          {
                            v = newV.v;
                            changed = true;
                          }
                          break;
                      }
                    }
                    if (changed)
                    {
                      if (rgb)
                      {
                        r = r || 0;
                        g = g || 0;
                        b = b || 0;
                        var ret = ColorMethods.rgbToHsv({ r: r, g: g, b: b });
                        h = ret.h;
                        s = ret.s;
                        v = ret.v;
                      }
                      else if (hsv)
                      {
                        h = h || 0;
                        s = s != null ? s : 100;
                        v = v != null ? v : 100;
                        var ret = ColorMethods.hsvToRgb({ h: h, s: s, v: v });
                        r = ret.r;
                        g = ret.g;
                        b = ret.b;
                      }
                      a = a != null ? a : 255;
                      fireChangeEvents.call($this, context || $this);
                    }
                    break;
                }
              },
            bind =
              function(callback)
              {
                if ($.isFunction(callback)) changeEvents.push(callback);
              },
            unbind =
              function(callback)
              {
                if (!$.isFunction(callback)) return;
                var i;
                while ((i = $.inArray(callback, changeEvents)) != -1) changeEvents.splice(i, 1);
              },
            destroy =
              function()
              {
                changeEvents = null;
              }
          $.extend(true, $this, // public properties and methods
            {
              val: val,
              bind: bind,
              unbind: unbind,
              destroy: destroy
            });
          if (init)
          {
            if (init.ahex != null) val('ahex', init);
            else if (init.hex != null) val((init.a != null ? 'a' : '') + 'hex', init.a != null ? { ahex: init.hex + ColorMethods.intToHex(init.a) } : init);
            else if (init.r != null && init.g != null && init.b != null) val('rgb' + (init.a != null ? 'a' : ''), init);
            else if (init.h != null && init.s != null && init.v != null) val('hsv' + (init.a != null ? 'a' : ''), init);
          }
        },
      ColorMethods: // color conversion methods  - make public to give use to external scripts
        {
          hexToRgba:
            function(hex)
            {
              hex = this.validateHex(hex);
              if (hex == '') return { r: null, g: null, b: null, a: null };
              var r = '00', g = '00', b = '00', a = '255';
              if (hex.length == 6) hex += 'ff';
              if (hex.length > 6)
              {
                r = hex.substring(0, 2);
                g = hex.substring(2, 4);
                b = hex.substring(4, 6);
                a = hex.substring(6, hex.length);
              }
              else
              {
                if (hex.length > 4)
                {
                  r = hex.substring(4, hex.length);
                  hex = hex.substring(0, 4);
                }
                if (hex.length > 2)
                {
                  g = hex.substring(2, hex.length);
                  hex = hex.substring(0, 2);
                }
                if (hex.length > 0) b = hex.substring(0, hex.length);
              }
              return { r: this.hexToInt(r), g: this.hexToInt(g), b: this.hexToInt(b), a: this.hexToInt(a) };
            },
          validateHex:
            function(hex)
            {
              hex = hex.toLowerCase().replace(/[^a-f0-9]/g, '');
              if (hex.length > 8) hex = hex.substring(0, 8);
              return hex;
            },
          rgbaToHex:
            function(rgba)
            {
              return this.intToHex(rgba.r) + this.intToHex(rgba.g) + this.intToHex(rgba.b) + this.intToHex(rgba.a);
            },
          intToHex:
            function(dec)
            {
              var result = (dec | 0).toString(16);
              if (result.length == 1) result = ('0' + result);
              return result.toLowerCase();
            },
          hexToInt:
            function(hex)
            {
              return parseInt(hex, 16);
            },
          rgbToHsv:
            function(rgb)
            {
              var r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255, hsv = { h: 0, s: 0, v: 0 }, min = 0, max = 0, delta;
              if (r >= g && r >= b)
              {
                max = r;
                min = g > b ? b : g;
              }
              else if (g >= b && g >= r)
              {
                max = g;
                min = r > b ? b : r;
              }
              else
              {
                max = b;
                min = g > r ? r : g;
              }
              hsv.v = max;
              hsv.s = max ? (max - min) / max : 0;
              if (!hsv.s) hsv.h = 0;
              else
              {
                delta = max - min;
                if (r == max) hsv.h = (g - b) / delta;
                else if (g == max) hsv.h = 2 + (b - r) / delta;
                else hsv.h = 4 + (r - g) / delta;
                hsv.h = parseInt(hsv.h * 60);
                if (hsv.h < 0) hsv.h += 360;
              }
              hsv.s = (hsv.s * 100) | 0;
              hsv.v = (hsv.v * 100) | 0;
              return hsv;
            },
          hsvToRgb:
            function(hsv)
            {
              var rgb = { r: 0, g: 0, b: 0, a: 100 }, h = hsv.h, s = hsv.s, v = hsv.v;
              if (s == 0)
              {
                if (v == 0) rgb.r = rgb.g = rgb.b = 0;
                else rgb.r = rgb.g = rgb.b = (v * 255 / 100) | 0;
              }
              else
              {
                if (h == 360) h = 0;
                h /= 60;
                s = s / 100;
                v = v / 100;
                var i = h | 0,
                    f = h - i,
                    p = v * (1 - s),
                    q = v * (1 - (s * f)),
                    t = v * (1 - (s * (1 - f)));
                switch (i)
                {
                  case 0:
                    rgb.r = v;
                    rgb.g = t;
                    rgb.b = p;
                    break;
                  case 1:
                    rgb.r = q;
                    rgb.g = v;
                    rgb.b = p;
                    break;
                  case 2:
                    rgb.r = p;
                    rgb.g = v;
                    rgb.b = t;
                    break;
                  case 3:
                    rgb.r = p;
                    rgb.g = q;
                    rgb.b = v;
                    break;
                  case 4:
                    rgb.r = t;
                    rgb.g = p;
                    rgb.b = v;
                    break;
                  case 5:
                    rgb.r = v;
                    rgb.g = p;
                    rgb.b = q;
                    break;
                }
                rgb.r = (rgb.r * 255) | 0;
                rgb.g = (rgb.g * 255) | 0;
                rgb.b = (rgb.b * 255) | 0;
              }
              return rgb;
            }
        }
    };
  var Color = $.jPicker.Color, List = $.jPicker.List, ColorMethods = $.jPicker.ColorMethods; // local copies for YUI compressor
  $.fn.jPicker =
    function(options)
    {
      var $arguments = arguments;
      return this.each(
        function()
        {
          var $this = this, settings = $.extend(true, {}, $.fn.jPicker.defaults, options); // local copies for YUI compressor
          if ($($this).get(0).nodeName.toLowerCase() == 'input') // Add color picker icon if binding to an input element and bind the events to the input
          {
            $.extend(true, settings,
              {
                window:
                {
                  bindToInput: true,
                  expandable: true,
                  input: $($this)
                }
              });
            if($($this).val()=='')
            {
              settings.color.active = new Color({ hex: null });
              settings.color.current = new Color({ hex: null });
            }
            else if (ColorMethods.validateHex($($this).val()))
            {
              settings.color.active = new Color({ hex: $($this).val(), a: settings.color.active.val('a') });
              settings.color.current = new Color({ hex: $($this).val(), a: settings.color.active.val('a') });
            }
          }
          if (settings.window.expandable)
            $($this).before('<span class="jPicker"><span class="Icon"><span class="Color">&nbsp;</span><span class="Alpha">&nbsp;</span><span class="Image" title="Click To Open Color Picker"><span class=ImageIcon>&nbsp;</span></span><span class="Container">&nbsp;</span></span></span>');
          else settings.window.liveUpdate = false; // Basic control binding for inline use - You will need to override the liveCallback or commitCallback function to retrieve results
          var isLessThanIE7 = parseFloat(navigator.appVersion.split('MSIE')[1]) < 7 && document.body.filters, // needed to run the AlphaImageLoader function for IE6
            container = null,
            colorMapDiv = null,
            colorBarDiv = null,
            colorMapL1 = null, // different layers of colorMap and colorBar
            colorMapL2 = null,
            colorMapL3 = null,
            colorBarL1 = null,
            colorBarL2 = null,
            colorBarL3 = null,
            colorBarL4 = null,
            colorBarL5 = null,
            colorBarL6 = null,
            colorMap = null, // color maps
            colorBar = null,
            colorPicker = null,
            elementStartX = null, // Used to record the starting css positions for dragging the control
            elementStartY = null,
            pageStartX = null, // Used to record the mousedown coordinates for dragging the control
            pageStartY = null,
            activePreview = null, // color boxes above the radio buttons
            currentPreview = null,
            okButton = null,
            cancelButton = null,
            grid = null, // preset colors grid
            iconColor = null, // iconColor for popup icon
            iconAlpha = null, // iconAlpha for popup icon
            iconImage = null, // iconImage popup icon
            moveBar = null, // drag bar
            setColorMode = // set color mode and update visuals for the new color mode
              function(colorMode)
              {
                var active = color.active, // local copies for YUI compressor
                  clientPath = images.clientPath,
                  hex = active.val('hex'),
                  rgbMap,
                  rgbBar;
                settings.color.mode = colorMode;
                switch (colorMode)
                {
                  case 'h':
                    setTimeout(
                      function()
                      {
                        setBG.call($this, colorMapDiv, 'transparent');
                        setImgLoc.call($this, colorMapL1, 0);
                        setAlpha.call($this, colorMapL1, 100);
                        setImgLoc.call($this, colorMapL2, 260);
                        setAlpha.call($this, colorMapL2, 100);
                        setBG.call($this, colorBarDiv, 'transparent');
                        setImgLoc.call($this, colorBarL1, 0);
                        setAlpha.call($this, colorBarL1, 100);
                        setImgLoc.call($this, colorBarL2, 260);
                        setAlpha.call($this, colorBarL2, 100);
                        setImgLoc.call($this, colorBarL3, 260);
                        setAlpha.call($this, colorBarL3, 100);
                        setImgLoc.call($this, colorBarL4, 260);
                        setAlpha.call($this, colorBarL4, 100);
                        setImgLoc.call($this, colorBarL6, 260);
                        setAlpha.call($this, colorBarL6, 100);
                      }, 0);
                    colorMap.range('all', { minX: 0, maxX: 100, minY: 0, maxY: 100 });
                    colorBar.range('rangeY', { minY: 0, maxY: 360 });
                    if (active.val('ahex') == null) break;
                    colorMap.val('xy', { x: active.val('s'), y: 100 - active.val('v') }, colorMap);
                    colorBar.val('y', 360 - active.val('h'), colorBar);
                    break;
                  case 's':
                    setTimeout(
                      function()
                      {
                        setBG.call($this, colorMapDiv, 'transparent');
                        setImgLoc.call($this, colorMapL1, -260);
                        setImgLoc.call($this, colorMapL2, -520);
                        setImgLoc.call($this, colorBarL1, -260);
                        setImgLoc.call($this, colorBarL2, -520);
                        setImgLoc.call($this, colorBarL6, 260);
                        setAlpha.call($this, colorBarL6, 100);
                      }, 0);
                    colorMap.range('all', { minX: 0, maxX: 360, minY: 0, maxY: 100 });
                    colorBar.range('rangeY', { minY: 0, maxY: 100 });
                    if (active.val('ahex') == null) break;
                    colorMap.val('xy', { x: active.val('h'), y: 100 - active.val('v') }, colorMap);
                    colorBar.val('y', 100 - active.val('s'), colorBar);
                    break;
                  case 'v':
                    setTimeout(
                      function()
                      {
                        setBG.call($this, colorMapDiv, '000000');
                        setImgLoc.call($this, colorMapL1, -780);
                        setImgLoc.call($this, colorMapL2, 260);
                        setBG.call($this, colorBarDiv, hex);
                        setImgLoc.call($this, colorBarL1, -520);
                        setImgLoc.call($this, colorBarL2, 260);
                        setAlpha.call($this, colorBarL2, 100);
                        setImgLoc.call($this, colorBarL6, 260);
                        setAlpha.call($this, colorBarL6, 100);
                      }, 0);
                    colorMap.range('all', { minX: 0, maxX: 360, minY: 0, maxY: 100 });
                    colorBar.range('rangeY', { minY: 0, maxY: 100 });
                    if (active.val('ahex') == null) break;
                    colorMap.val('xy', { x: active.val('h'), y: 100 - active.val('s') }, colorMap);
                    colorBar.val('y', 100 - active.val('v'), colorBar);
                    break;
                  case 'r':
                    rgbMap = -1040;
                    rgbBar = -780;
                    colorMap.range('all', { minX: 0, maxX: 255, minY: 0, maxY: 255 });
                    colorBar.range('rangeY', { minY: 0, maxY: 255 });
                    if (active.val('ahex') == null) break;
                    colorMap.val('xy', { x: active.val('b'), y: 255 - active.val('g') }, colorMap);
                    colorBar.val('y', 255 - active.val('r'), colorBar);
                    break;
                  case 'g':
                    rgbMap = -1560;
                    rgbBar = -1820;
                    colorMap.range('all', { minX: 0, maxX: 255, minY: 0, maxY: 255 });
                    colorBar.range('rangeY', { minY: 0, maxY: 255 });
                    if (active.val('ahex') == null) break;
                    colorMap.val('xy', { x: active.val('b'), y: 255 - active.val('r') }, colorMap);
                    colorBar.val('y', 255 - active.val('g'), colorBar);
                    break;
                  case 'b':
                    rgbMap = -2080;
                    rgbBar = -2860;
                    colorMap.range('all', { minX: 0, maxX: 255, minY: 0, maxY: 255 });
                    colorBar.range('rangeY', { minY: 0, maxY: 255 });
                    if (active.val('ahex') == null) break;
                    colorMap.val('xy', { x: active.val('r'), y: 255 - active.val('g') }, colorMap);
                    colorBar.val('y', 255 - active.val('b'), colorBar);
                    break;
                  case 'a':
                    setTimeout(
                      function()
                      {
                        setBG.call($this, colorMapDiv, 'transparent');
                        setImgLoc.call($this, colorMapL1, -260);
                        setImgLoc.call($this, colorMapL2, -520);
                        setImgLoc.call($this, colorBarL1, 260);
                        setImgLoc.call($this, colorBarL2, 260);
                        setAlpha.call($this, colorBarL2, 100);
                        setImgLoc.call($this, colorBarL6, 0);
                        setAlpha.call($this, colorBarL6, 100);
                      }, 0);
                    colorMap.range('all', { minX: 0, maxX: 360, minY: 0, maxY: 100 });
                    colorBar.range('rangeY', { minY: 0, maxY: 255 });
                    if (active.val('ahex') == null) break;
                    colorMap.val('xy', { x: active.val('h'), y: 100 - active.val('v') }, colorMap);
                    colorBar.val('y', 255 - active.val('a'), colorBar);
                    break;
                  default:
                    throw ('Invalid Mode');
                    break;
                }
                switch (colorMode)
                {
                  case 'h':
                    break;
                  case 's':
                  case 'v':
                  case 'a':
                    setTimeout(
                      function()
                      {
                        setAlpha.call($this, colorMapL1, 100);
                        setAlpha.call($this, colorBarL1, 100);
                        setImgLoc.call($this, colorBarL3, 260);
                        setAlpha.call($this, colorBarL3, 100);
                        setImgLoc.call($this, colorBarL4, 260);
                        setAlpha.call($this, colorBarL4, 100);
                      }, 0);
                    break;
                  case 'r':
                  case 'g':
                  case 'b':
                    setTimeout(
                      function()
                      {
                        setBG.call($this, colorMapDiv, 'transparent');
                        setBG.call($this, colorBarDiv, 'transparent');
                        setAlpha.call($this, colorBarL1, 100);
                        setAlpha.call($this, colorMapL1, 100);
                        setImgLoc.call($this, colorMapL1, rgbMap);
                        setImgLoc.call($this, colorMapL2, rgbMap - 260);
                        setImgLoc.call($this, colorBarL1, rgbBar - 780);
                        setImgLoc.call($this, colorBarL2, rgbBar - 520);
                        setImgLoc.call($this, colorBarL3, rgbBar);
                        setImgLoc.call($this, colorBarL4, rgbBar - 260);
                        setImgLoc.call($this, colorBarL6, 260);
                        setAlpha.call($this, colorBarL6, 100);
                      }, 0);
                    break;
                }
                if (active.val('ahex') == null) return;
                activeColorChanged.call($this, active);
              },
            activeColorChanged = // Update color when user changes text values
              function(ui, context)
              {
                if (context == null || (context != colorBar && context != colorMap)) positionMapAndBarArrows.call($this, ui, context);
                setTimeout(
                  function()
                  {
                    updatePreview.call($this, ui);
                    updateMapVisuals.call($this, ui);
                    updateBarVisuals.call($this, ui);
                  }, 0);
              },
            mapValueChanged = // user has dragged the ColorMap pointer
              function(ui, context)
              {
                var active = color.active;
                if (context != colorMap && active.val() == null) return;
                var xy = ui.val('all');
                switch (settings.color.mode)
                {
                  case 'h':
                    active.val('sv', { s: xy.x, v: 100 - xy.y }, context);
                    break;
                  case 's':
                  case 'a':
                    active.val('hv', { h: xy.x, v: 100 - xy.y }, context);
                    break;
                  case 'v':
                    active.val('hs', { h: xy.x, s: 100 - xy.y }, context);
                    break;
                  case 'r':
                    active.val('gb', { g: 255 - xy.y, b: xy.x }, context);
                    break;
                  case 'g':
                    active.val('rb', { r: 255 - xy.y, b: xy.x }, context);
                    break;
                  case 'b':
                    active.val('rg', { r: xy.x, g: 255 - xy.y }, context);
                    break;
                }
              },
            colorBarValueChanged = // user has dragged the ColorBar slider
              function(ui, context)
              {
                var active = color.active;
                if (context != colorBar && active.val() == null) return;
                switch (settings.color.mode)
                {
                  case 'h':
                    active.val('h', { h: 360 - ui.val('y') }, context);
                    break;
                  case 's':
                    active.val('s', { s: 100 - ui.val('y') }, context);
                    break;
                  case 'v':
                    active.val('v', { v: 100 - ui.val('y') }, context);
                    break;
                  case 'r':
                    active.val('r', { r: 255 - ui.val('y') }, context);
                    break;
                  case 'g':
                    active.val('g', { g: 255 - ui.val('y') }, context);
                    break;
                  case 'b':
                    active.val('b', { b: 255 - ui.val('y') }, context);
                    break;
                  case 'a':
                    active.val('a', 255 - ui.val('y'), context);
                    break;
                }
              },
            positionMapAndBarArrows = // position map and bar arrows to match current color
              function(ui, context)
              {
                if (context != colorMap)
                {
                  switch (settings.color.mode)
                  {
                    case 'h':
                      var sv = ui.val('sv');
                      colorMap.val('xy', { x: sv != null ? sv.s : 100, y: 100 - (sv != null ? sv.v : 100) }, context);
                      break;
                    case 's':
                    case 'a':
                      var hv = ui.val('hv');
                      colorMap.val('xy', { x: hv && hv.h || 0, y: 100 - (hv != null ? hv.v : 100) }, context);
                      break;
                    case 'v':
                      var hs = ui.val('hs');
                      colorMap.val('xy', { x: hs && hs.h || 0, y: 100 - (hs != null ? hs.s : 100) }, context);
                      break;
                    case 'r':
                      var bg = ui.val('bg');
                      colorMap.val('xy', { x: bg && bg.b || 0, y: 255 - (bg && bg.g || 0) }, context);
                      break;
                    case 'g':
                      var br = ui.val('br');
                      colorMap.val('xy', { x: br && br.b || 0, y: 255 - (br && br.r || 0) }, context);
                      break;
                    case 'b':
                      var rg = ui.val('rg');
                      colorMap.val('xy', { x: rg && rg.r || 0, y: 255 - (rg && rg.g || 0) }, context);
                      break;
                  }
                }
                if (context != colorBar)
                {
                  switch (settings.color.mode)
                  {
                    case 'h':
                      colorBar.val('y', 360 - (ui.val('h') || 0), context);
                      break;
                    case 's':
                      var s = ui.val('s');
                      colorBar.val('y', 100 - (s != null ? s : 100), context);
                      break;
                    case 'v':
                      var v = ui.val('v');
                      colorBar.val('y', 100 - (v != null ? v : 100), context);
                      break;
                    case 'r':
                      colorBar.val('y', 255 - (ui.val('r') || 0), context);
                      break;
                    case 'g':
                      colorBar.val('y', 255 - (ui.val('g') || 0), context);
                      break;
                    case 'b':
                      colorBar.val('y', 255 - (ui.val('b') || 0), context);
                      break;
                    case 'a':
                      var a = ui.val('a');
                      colorBar.val('y', 255 - (a != null ? a : 255), context);
                      break;
                  }
                }
              },
            updatePreview =
              function(ui)
              {
                try
                {
                  var all = ui.val('all');
                  activePreview.css({ backgroundColor: all && '#' + all.hex || 'transparent' });
                  setAlpha.call($this, activePreview, all && Math.precision((all.a * 100) / 255, 4) || 0);
                }
                catch (e) { }
              },
            updateMapVisuals =
              function(ui)
              {
                switch (settings.color.mode)
                {
                  case 'h':
                    setBG.call($this, colorMapDiv, new Color({ h: ui.val('h') || 0, s: 100, v: 100 }).val('hex'));
                    break;
                  case 's':
                  case 'a':
                    var s = ui.val('s');
                    setAlpha.call($this, colorMapL2, 100 - (s != null ? s : 100));
                    break;
                  case 'v':
                    var v = ui.val('v');
                    setAlpha.call($this, colorMapL1, v != null ? v : 100);
                    break;
                  case 'r':
                    setAlpha.call($this, colorMapL2, Math.precision((ui.val('r') || 0) / 255 * 100, 4));
                    break;
                  case 'g':
                    setAlpha.call($this, colorMapL2, Math.precision((ui.val('g') || 0) / 255 * 100, 4));
                    break;
                  case 'b':
                    setAlpha.call($this, colorMapL2, Math.precision((ui.val('b') || 0) / 255 * 100));
                    break;
                }
                var a = ui.val('a');
                setAlpha.call($this, colorMapL3, Math.precision(((255 - (a || 0)) * 100) / 255, 4));
              },
            updateBarVisuals =
              function(ui)
              {
                switch (settings.color.mode)
                {
                  case 'h':
                    var a = ui.val('a');
                    setAlpha.call($this, colorBarL5, Math.precision(((255 - (a || 0)) * 100) / 255, 4));
                    break;
                  case 's':
                    var hva = ui.val('hva'),
                        saturatedColor = new Color({ h: hva && hva.h || 0, s: 100, v: hva != null ? hva.v : 100 });
                    setBG.call($this, colorBarDiv, saturatedColor.val('hex'));
                    setAlpha.call($this, colorBarL2, 100 - (hva != null ? hva.v : 100));
                    setAlpha.call($this, colorBarL5, Math.precision(((255 - (hva && hva.a || 0)) * 100) / 255, 4));
                    break;
                  case 'v':
                    var hsa = ui.val('hsa'),
                        valueColor = new Color({ h: hsa && hsa.h || 0, s: hsa != null ? hsa.s : 100, v: 100 });
                    setBG.call($this, colorBarDiv, valueColor.val('hex'));
                    setAlpha.call($this, colorBarL5, Math.precision(((255 - (hsa && hsa.a || 0)) * 100) / 255, 4));
                    break;
                  case 'r':
                  case 'g':
                  case 'b':
                    var hValue = 0, vValue = 0, rgba = ui.val('rgba');
                    if (settings.color.mode == 'r')
                    {
                      hValue = rgba && rgba.b || 0;
                      vValue = rgba && rgba.g || 0;
                    }
                    else if (settings.color.mode == 'g')
                    {
                      hValue = rgba && rgba.b || 0;
                      vValue = rgba && rgba.r || 0;
                    }
                    else if (settings.color.mode == 'b')
                    {
                      hValue = rgba && rgba.r || 0;
                      vValue = rgba && rgba.g || 0;
                    }
                    var middle = vValue > hValue ? hValue : vValue;
                    setAlpha.call($this, colorBarL2, hValue > vValue ? Math.precision(((hValue - vValue) / (255 - vValue)) * 100, 4) : 0);
                    setAlpha.call($this, colorBarL3, vValue > hValue ? Math.precision(((vValue - hValue) / (255 - hValue)) * 100, 4) : 0);
                    setAlpha.call($this, colorBarL4, Math.precision((middle / 255) * 100, 4));
                    setAlpha.call($this, colorBarL5, Math.precision(((255 - (rgba && rgba.a || 0)) * 100) / 255, 4));
                    break;
                  case 'a':
                    var a = ui.val('a');
                    setBG.call($this, colorBarDiv, ui.val('hex') || '000000');
                    setAlpha.call($this, colorBarL5, a != null ? 0 : 100);
                    setAlpha.call($this, colorBarL6, a != null ? 100 : 0);
                    break;
                }
              },
            setBG =
              function(el, c)
              {
                el.css({ backgroundColor: c && c.length == 6 && '#' + c || 'transparent' });
              },
            setImg =
              function(img, src)
              {
                if (isLessThanIE7 && (src.indexOf('AlphaBar.png') != -1 || src.indexOf('Bars.png') != -1 || src.indexOf('Maps.png') != -1))
                {
                  img.attr('pngSrc', src);
                  img.css({ backgroundImage: 'none', filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + src + '\', sizingMethod=\'scale\')' });
                }
                else img.css({ backgroundImage: 'url(\'' + src + '\')' });
              },
            setImgLoc =
              function(img, y)
              {
                img.css({ top: y + 'px' });
              },
            setAlpha =
              function(obj, alpha)
              {
                obj.css({ visibility: alpha > 0 ? 'visible' : 'hidden' });
                if (alpha > 0 && alpha < 100)
                {
                  if (isLessThanIE7)
                  {
                    var src = obj.attr('pngSrc');
                    if (src != null && (src.indexOf('AlphaBar.png') != -1 || src.indexOf('Bars.png') != -1 || src.indexOf('Maps.png') != -1))
                      obj.css({ filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + src + '\', sizingMethod=\'scale\') progid:DXImageTransform.Microsoft.Alpha(opacity=' + alpha + ')' });
                    else obj.css({ opacity: Math.precision(alpha / 100, 4) });
                  }
                  else obj.css({ opacity: Math.precision(alpha / 100, 4) });
                }
                else if (alpha == 0 || alpha == 100)
                {
                  if (isLessThanIE7)
                  {
                    var src = obj.attr('pngSrc');
                    if (src != null && (src.indexOf('AlphaBar.png') != -1 || src.indexOf('Bars.png') != -1 || src.indexOf('Maps.png') != -1))
                      obj.css({ filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + src + '\', sizingMethod=\'scale\')' });
                    else obj.css({ opacity: '' });
                  }
                  else obj.css({ opacity: '' });
                }
              },
            revertColor = // revert color to original color when opened
              function()
              {
                color.active.val('ahex', color.current.val('ahex'));
              },
            commitColor = // commit the color changes
              function()
              {
                color.current.val('ahex', color.active.val('ahex'));
              },
            radioClicked =
              function(e)
              {
                $(this).parents('tbody:first').find('input:radio[value!="'+e.target.value+'"]').removeAttr('checked');
                setColorMode.call($this, e.target.value);
              },
            currentClicked =
              function()
              {
                revertColor.call($this);
              },
            cancelClicked =
              function()
              {
                revertColor.call($this);
                settings.window.expandable && hide.call($this);
                $.isFunction(cancelCallback) && cancelCallback.call($this, color.active, cancelButton);
              },
            okClicked =
              function()
              {
                commitColor.call($this);
                settings.window.expandable && hide.call($this);
                $.isFunction(commitCallback) && commitCallback.call($this, color.active, okButton);
              },
            iconImageClicked =
              function()
              {
                show.call($this);
              },
            currentColorChanged =
              function(ui, context)
              {
                var hex = ui.val('hex');
                currentPreview.css({ backgroundColor: hex && '#' + hex || 'transparent' });
                setAlpha.call($this, currentPreview, Math.precision(((ui.val('a') || 0) * 100) / 255, 4));
              },
            expandableColorChanged =
              function(ui, context)
              {
                var hex = ui.val('hex');
                var va = ui.val('va');
                iconColor.css({ backgroundColor: hex && '#' + hex || 'transparent' });
                setAlpha.call($this, iconAlpha, Math.precision(((255 - (va && va.a || 0)) * 100) / 255, 4));
                if (settings.window.bindToInput&&settings.window.updateInputColor)
                  settings.window.input.css(
                    {
                      backgroundColor: hex && '#' + hex || 'transparent',
                      color: va == null || va.v > 75 ? '#000000' : '#ffffff',
                      textShadow: va == null || va.v > 75 ? '1px 1px 1px rgba(255,255,255,0.22)' : '1px 1px 1px rgba(0,0,0,0.22)'
                    });
              },
            moveBarMouseDown =
              function(e)
              {
                var element = settings.window.element, // local copies for YUI compressor
                  page = settings.window.page;
                elementStartX = parseInt(container.css('left'));
                elementStartY = parseInt(container.css('top'));
                pageStartX = e.pageX;
                pageStartY = e.pageY;
                // bind events to document to move window - we will unbind these on mouseup
                $(document).bind('mousemove', documentMouseMove).bind('mouseup', documentMouseUp);
                e.preventDefault(); // prevent attempted dragging of the column
              },
            documentMouseMove =
              function(e)
              {
                container.css({ left: elementStartX - (pageStartX - e.pageX) + 'px', top: elementStartY - (pageStartY - e.pageY) + 'px' });
                if (settings.window.expandable && !$.support.boxModel) container.prev().css({ left: container.css("left"), top: container.css("top") });
                e.stopPropagation();
                e.preventDefault();
                return false;
              },
            documentMouseUp =
              function(e)
              {
                $(document).unbind('mousemove', documentMouseMove).unbind('mouseup', documentMouseUp);
                e.stopPropagation();
                e.preventDefault();
                return false;
              },
            quickPickClicked =
              function(e)
              {
                e.preventDefault();
                e.stopPropagation();
                color.active.val('ahex', $(this).attr('title') || null, e.target);
                return false;
              },
            commitCallback = $.isFunction($arguments[1]) && $arguments[1] || null,
            liveCallback = $.isFunction($arguments[2]) && $arguments[2] || null,
            cancelCallback = $.isFunction($arguments[3]) && $arguments[3] || null,
            show =
              function()
              {
                color.current.val('ahex', color.active.val('ahex'));
                var attachIFrame = function()
                  {
                    if (!settings.window.expandable || $.support.boxModel) return;
                    var table = container.find('table:first');
                    container.before('<iframe/>');
                    container.prev().css({ width: table.width(), height: container.height(), opacity: 0, position: 'relative', left: container.css("left"), top: container.css("top") });
                  };
                if (settings.window.expandable)
                {
                  $(document.body).children('div.jPicker.Container').css({zIndex:100000});
                  container.css({zIndex:200000});
                }
                switch (settings.window.effects.type)
                {
                  case 'fade':
                    container.fadeIn(settings.window.effects.speed.show, attachIFrame);
                    break;
                  case 'slide':
                    container.slideDown(settings.window.effects.speed.show, attachIFrame);
                    break;
                  case 'show':
                  default:
                    container.show(settings.window.effects.speed.show, attachIFrame);
                    break;
                }
              },
            hide =
              function()
              {
                var removeIFrame = function()
                  {
                    if (settings.window.expandable) container.css({ zIndex: 100000 });
                    if (!settings.window.expandable || $.support.boxModel) return;
                    container.prev().remove();
                  };
                switch (settings.window.effects.type)
                {
                  case 'fade':
                    container.fadeOut(settings.window.effects.speed.hide, removeIFrame);
                    break;
                  case 'slide':
                    container.slideUp(settings.window.effects.speed.hide, removeIFrame);
                    break;
                  case 'show':
                  default:
                    container.hide(settings.window.effects.speed.hide, removeIFrame);
                    break;
                }
              },
            initialize =
              function()
              {
                var win = settings.window,
                    popup = win.expandable ? $($this).prev().find('.Container:first') : null;
                container = win.expandable ? $('<div/>') : $($this);
                container.addClass('jPicker Container');
                if (win.expandable) container.hide();
                container.get(0).onselectstart = function(event){ if (event.target.nodeName.toLowerCase() !== 'input') return false; };
                // inject html source code - we are using a single table for this control - I know tables are considered bad, but it takes care of equal height columns and
                // this control really is tabular data, so I believe it is the right move
                var all = color.active.val('all');
                if (win.alphaPrecision < 0) win.alphaPrecision = 0;
                else if (win.alphaPrecision > 2) win.alphaPrecision = 2;
                var controlHtml='<table class="jPicker" cellpadding="0" cellspacing="0"><tbody>' + (win.expandable ? '<tr><td class="Move" colspan="5">&nbsp;</td></tr>' : '') + '<tr><td rowspan="9"><h2 class="Title">' + (win.title || localization.text.title) + '</h2><div class="Map"><span class="Map1">&nbsp;</span><span class="Map2">&nbsp;</span><span class="Map3">&nbsp;</span><img src="' + images.clientPath + images.colorMap.arrow.file + '" class="Arrow"/></div></td><td rowspan="9"><div class="Bar"><span class="Map1">&nbsp;</span><span class="Map2">&nbsp;</span><span class="Map3">&nbsp;</span><span class="Map4">&nbsp;</span><span class="Map5">&nbsp;</span><span class="Map6">&nbsp;</span><img src="' + images.clientPath + images.colorBar.arrow.file + '" class="Arrow"/></div></td><td colspan="2" class="Preview">' + localization.text.newColor + '<div><span class="Active" title="' + localization.tooltips.colors.newColor + '">&nbsp;</span><span class="Current" title="' + localization.tooltips.colors.currentColor + '">&nbsp;</span></div>' + localization.text.currentColor + '</td><td rowspan="9" class="Button"><input type="button" class="Ok" value="' + localization.text.ok + '" title="' + localization.tooltips.buttons.ok + '"/><input type="button" class="Cancel" value="' + localization.text.cancel + '" title="' + localization.tooltips.buttons.cancel + '"/><hr/><div class="Grid">&nbsp;</div></td></tr><tr class="Hue"><td class="Radio"><label title="' + localization.tooltips.hue.radio + '"><input type="radio" value="h"' + (settings.color.mode == 'h' ? ' checked="checked"' : '') + '/>H:</label></td><td class="Text"><input type="text" maxlength="3" value="' + (all != null ? all.h : '') + '" title="' + localization.tooltips.hue.textbox + '"/>&nbsp;&deg;</td></tr><tr class="Saturation"><td class="Radio"><label title="' + localization.tooltips.saturation.radio + '"><input type="radio" value="s"' + (settings.color.mode == 's' ? ' checked="checked"' : '') + '/>S:</label></td><td class="Text"><input type="text" maxlength="3" value="' + (all != null ? all.s : '') + '" title="' + localization.tooltips.saturation.textbox + '"/>&nbsp;%</td></tr><tr class="Value"><td class="Radio"><label title="' + localization.tooltips.value.radio + '"><input type="radio" value="v"' + (settings.color.mode == 'v' ? ' checked="checked"' : '') + '/>V:</label><br/><br/></td><td class="Text"><input type="text" maxlength="3" value="' + (all != null ? all.v : '') + '" title="' + localization.tooltips.value.textbox + '"/>&nbsp;%<br/><br/></td></tr><tr class="Red"><td class="Radio"><label title="' + localization.tooltips.red.radio + '"><input type="radio" value="r"' + (settings.color.mode == 'r' ? ' checked="checked"' : '') + '/>R:</label></td><td class="Text"><input type="text" maxlength="3" value="' + (all != null ? all.r : '') + '" title="' + localization.tooltips.red.textbox + '"/></td></tr><tr class="Green"><td class="Radio"><label title="' + localization.tooltips.green.radio + '"><input type="radio" value="g"' + (settings.color.mode == 'g' ? ' checked="checked"' : '') + '/>G:</label></td><td class="Text"><input type="text" maxlength="3" value="' + (all != null ? all.g : '') + '" title="' + localization.tooltips.green.textbox + '"/></td></tr><tr class="Blue"><td class="Radio"><label title="' + localization.tooltips.blue.radio + '"><input type="radio" value="b"' + (settings.color.mode == 'b' ? ' checked="checked"' : '') + '/>B:</label></td><td class="Text"><input type="text" maxlength="3" value="' + (all != null ? all.b : '') + '" title="' + localization.tooltips.blue.textbox + '"/></td></tr><tr class="Alpha"><td class="Radio">' + (win.alphaSupport ? '<label title="' + localization.tooltips.alpha.radio + '"><input type="radio" value="a"' + (settings.color.mode == 'a' ? ' checked="checked"' : '') + '/>A:</label>' : '&nbsp;') + '</td><td class="Text">' + (win.alphaSupport ? '<input type="text" maxlength="' + (3 + win.alphaPrecision) + '" value="' + (all != null ? Math.precision((all.a * 100) / 255, win.alphaPrecision) : '') + '" title="' + localization.tooltips.alpha.textbox + '"/>&nbsp;%' : '&nbsp;') + '</td></tr><tr class="Hex"><td colspan="2" class="Text"><label title="' + localization.tooltips.hex.textbox + '">#:<input type="text" maxlength="6" class="Hex" value="' + (all != null ? all.hex : '') + '"/></label>' + (win.alphaSupport ? '<input type="text" maxlength="2" class="AHex" value="' + (all != null ? all.ahex.substring(6) : '') + '" title="' + localization.tooltips.hex.alpha + '"/></td>' : '&nbsp;') + '</tr></tbody></table>';
                if (win.expandable)
                {
                  container.html(controlHtml);
                  if($(document.body).children('div.jPicker.Container').length==0)$(document.body).prepend(container);
                  else $(document.body).children('div.jPicker.Container:last').after(container);
                  container.mousedown(
                    function()
                    {
                      $(document.body).children('div.jPicker.Container').css({zIndex:100000});
                      container.css({zIndex:200000});
                    });
                  container.css( // positions must be set and display set to absolute before source code injection or IE will size the container to fit the window
                    {
                      left:
                        win.position.x == 'left' ? (popup.offset().left - 530 - (win.position.y == 'center' ? 25 : 0)) + 'px' :
                        win.position.x == 'center' ? (popup.offset().left - 260) + 'px' :
                        win.position.x == 'right' ? (popup.offset().left - 10 + (win.position.y == 'center' ? 25 : 0)) + 'px' :
                        win.position.x == 'screenCenter' ? (($(document).width() >> 1) - 260) + 'px' : (popup.offset().left + parseInt(win.position.x)) + 'px',
                      position: 'fixed',
                      top: win.position.y == 'top' ? 100 + 'px' :
                           win.position.y == 'center' ? (popup.offset().top - 156) + 'px' :
                           win.position.y == 'bottom' ? (popup.offset().top + 25) + 'px' : (popup.offset().top + parseInt(win.position.y)) + 'px'
                    });
                }
                else
                {
                  container = $($this);
                  container.html(controlHtml);
                }
                // initialize the objects to the source code just injected
                var tbody = container.find('tbody:first');
                colorMapDiv = tbody.find('div.Map:first');
                colorBarDiv = tbody.find('div.Bar:first');
                var MapMaps = colorMapDiv.find('span'),
                    BarMaps = colorBarDiv.find('span');
                colorMapL1 = MapMaps.filter('.Map1:first');
                colorMapL2 = MapMaps.filter('.Map2:first');
                colorMapL3 = MapMaps.filter('.Map3:first');
                colorBarL1 = BarMaps.filter('.Map1:first');
                colorBarL2 = BarMaps.filter('.Map2:first');
                colorBarL3 = BarMaps.filter('.Map3:first');
                colorBarL4 = BarMaps.filter('.Map4:first');
                colorBarL5 = BarMaps.filter('.Map5:first');
                colorBarL6 = BarMaps.filter('.Map6:first');
                // create color pickers and maps
                colorMap = new Slider(colorMapDiv,
                  {
                    map:
                    {
                      width: images.colorMap.width,
                      height: images.colorMap.height
                    },
                    arrow:
                    {
                      image: images.clientPath + images.colorMap.arrow.file,
                      width: images.colorMap.arrow.width,
                      height: images.colorMap.arrow.height
                    }
                  });
                colorMap.bind(mapValueChanged);
                colorBar = new Slider(colorBarDiv,
                  {
                    map:
                    {
                      width: images.colorBar.width,
                      height: images.colorBar.height
                    },
                    arrow:
                    {
                      image: images.clientPath + images.colorBar.arrow.file,
                      width: images.colorBar.arrow.width,
                      height: images.colorBar.arrow.height
                    }
                  });
                colorBar.bind(colorBarValueChanged);
                colorPicker = new ColorValuePicker(tbody, color.active, win.expandable && win.bindToInput ? win.input : null, win.alphaPrecision);
                var hex = all != null ? all.hex : null,
                    preview = tbody.find('.Preview'),
                    button = tbody.find('.Button');
                activePreview = preview.find('.Active:first').css({ backgroundColor: hex && '#' + hex || 'transparent' });
                currentPreview = preview.find('.Current:first').css({ backgroundColor: hex && '#' + hex || 'transparent' }).bind('click', currentClicked);
                setAlpha.call($this, currentPreview, Math.precision(color.current.val('a') * 100) / 255, 4);
                okButton = button.find('.Ok:first').bind('click', okClicked);
                cancelButton = button.find('.Cancel:first').bind('click', cancelClicked);
                grid = button.find('.Grid:first');
                setTimeout(
                  function()
                  {
                    setImg.call($this, colorMapL1, images.clientPath + 'Maps.png');
                    setImg.call($this, colorMapL2, images.clientPath + 'Maps.png');
                    setImg.call($this, colorMapL3, images.clientPath + 'map-opacity.png');
                    setImg.call($this, colorBarL1, images.clientPath + 'Bars.png');
                    setImg.call($this, colorBarL2, images.clientPath + 'Bars.png');
                    setImg.call($this, colorBarL3, images.clientPath + 'Bars.png');
                    setImg.call($this, colorBarL4, images.clientPath + 'Bars.png');
                    setImg.call($this, colorBarL5, images.clientPath + 'bar-opacity.png');
                    setImg.call($this, colorBarL6, images.clientPath + 'AlphaBar.png');
                    setImg.call($this, preview.find('div:first'), images.clientPath + 'preview-opacity.png');
                  }, 0);
                tbody.find('td.Radio input').bind('click', radioClicked);
                // initialize quick list
                if (color.quickList && color.quickList.length > 0)
                {
                  var html = '';
                  for (i = 0; i < color.quickList.length; i++)
                  {
                    /* if default colors are hex strings, change them to color objects */
                    if ((typeof (color.quickList[i])).toString().toLowerCase() == 'string') color.quickList[i] = new Color({ hex: color.quickList[i] });
                    var alpha = color.quickList[i].val('a');
                    var ahex = color.quickList[i].val('ahex');
                    if (!win.alphaSupport && ahex) ahex = ahex.substring(0, 6) + 'ff';
                    var quickHex = color.quickList[i].val('hex');
                    html+='<span class="QuickColor"' + (ahex && ' title="#' + ahex + '"' || '') + ' style="background-color:' + (quickHex && '#' + quickHex || '') + ';' + (quickHex ? '' : 'background-image:url(' + images.clientPath + 'NoColor.png)') + (win.alphaSupport && alpha && alpha < 255 ? ';opacity:' + Math.precision(alpha / 255, 4) + ';filter:Alpha(opacity=' + Math.precision(alpha / 2.55, 4) + ')' : '') + '">&nbsp;</span>';
                  }
                  setImg.call($this, grid, images.clientPath + 'bar-opacity.png');
                  grid.html(html);
                  grid.find('.QuickColor').click(quickPickClicked);
                }
                setColorMode.call($this, settings.color.mode);
                color.active.bind(activeColorChanged);
                $.isFunction(liveCallback) && color.active.bind(liveCallback);
                color.current.bind(currentColorChanged);
                // bind to input
                if (win.expandable)
                {
                  $this.icon = popup.parents('.Icon:first');
                  iconColor = $this.icon.find('.Color:first').css({ backgroundColor: hex && '#' + hex || 'transparent' });
                  iconAlpha = $this.icon.find('.Alpha:first');
                  setImg.call($this, iconAlpha, images.clientPath + 'bar-opacity.png');
                  setAlpha.call($this, iconAlpha, Math.precision(((255 - (all != null ? all.a : 0)) * 100) / 255, 4));
                  iconImage = $this.icon.find('.Image .ImageIcon:first').css(
                    {
                      background: 'url(\'' + images.clientPath + images.picker.file + '\') center center no-repeat',
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      paddingLeft: '2px'
                    }).bind('click', iconImageClicked);
                  if (win.bindToInput&&win.updateInputColor)
                    win.input.css(
                      {
                        backgroundColor: hex && '#' + hex || 'transparent',
                        color: all == null || all.v > 75 ? '#000000' : '#ffffff',
                        textShadow: all == null || all.v > 75 ? '1px 1px 1px rgba(255,255,255,0.22)' : '1px 1px 1px rgba(0,0,0,0.22)'
                      });
                  moveBar = tbody.find('.Move:first').bind('mousedown', moveBarMouseDown);
                  color.active.bind(expandableColorChanged);
                }
                else show.call($this);
              },
            destroy =
              function()
              {
                container.find('td.Radio input').unbind('click', radioClicked);
                currentPreview.unbind('click', currentClicked);
                cancelButton.unbind('click', cancelClicked);
                okButton.unbind('click', okClicked);
                if (settings.window.expandable)
                {
                  iconImage.unbind('click', iconImageClicked);
                  moveBar.unbind('mousedown', moveBarMouseDown);
                  $this.icon = null;
                }
                container.find('.QuickColor').unbind('click', quickPickClicked);
                colorMapDiv = null;
                colorBarDiv = null;
                colorMapL1 = null;
                colorMapL2 = null;
                colorMapL3 = null;
                colorBarL1 = null;
                colorBarL2 = null;
                colorBarL3 = null;
                colorBarL4 = null;
                colorBarL5 = null;
                colorBarL6 = null;
                colorMap.destroy();
                colorMap = null;
                colorBar.destroy();
                colorBar = null;
                colorPicker.destroy();
                colorPicker = null;
                activePreview = null;
                currentPreview = null;
                okButton = null;
                cancelButton = null;
                grid = null;
                commitCallback = null;
                cancelCallback = null;
                liveCallback = null;
                container.html('');
                for (i = 0; i < List.length; i++) if (List[i] == $this) List.splice(i, 1);
              },
            images = settings.images, // local copies for YUI compressor
            localization = settings.localization,
            color =
              {
                active: (typeof(settings.color.active)).toString().toLowerCase() == 'string' ? new Color({ ahex: !settings.window.alphaSupport && settings.color.active ? settings.color.active.substring(0, 6) + 'ff' : settings.color.active }) : new Color({ ahex: !settings.window.alphaSupport && settings.color.active.val('ahex') ? settings.color.active.val('ahex').substring(0, 6) + 'ff' : settings.color.active.val('ahex') }),
                current: (typeof(settings.color.active)).toString().toLowerCase() == 'string' ? new Color({ ahex: !settings.window.alphaSupport && settings.color.active ? settings.color.active.substring(0, 6) + 'ff' : settings.color.active }) : new Color({ ahex: !settings.window.alphaSupport && settings.color.active.val('ahex') ? settings.color.active.val('ahex').substring(0, 6) + 'ff' : settings.color.active.val('ahex') }),
                quickList: settings.color.quickList
              };
          $.extend(true, $this, // public properties, methods, and callbacks
            {
              commitCallback: commitCallback, // commitCallback function can be overridden to return the selected color to a method you specify when the user clicks "OK"
              liveCallback: liveCallback, // liveCallback function can be overridden to return the selected color to a method you specify in live mode (continuous update)
              cancelCallback: cancelCallback, // cancelCallback function can be overridden to a method you specify when the user clicks "Cancel"
              color: color,
              show: show,
              hide: hide,
              destroy: destroy // destroys this control entirely, removing all events and objects, and removing itself from the List
            });
          List.push($this);
          setTimeout(
            function()
            {
              initialize.call($this);
            }, 0);
        });
    };
  $.fn.jPicker.defaults = /* jPicker defaults - you can change anything in this section (such as the clientPath to your images) without fear of breaking the program */
      {
      window:
        {
          title: null, /* any title for the jPicker window itself - displays "Drag Markers To Pick A Color" if left null */
          effects:
          {
            type: 'fade', /* effect used to show/hide an expandable picker. Acceptable values "slide", "show", "fade" */
            speed:
            {
              show: 'fast', /* duration of "show" effect. Acceptable values are "fast", "slow", or time in ms */
              hide: 'fast' /* duration of "hide" effect. Acceptable values are "fast", "slow", or time in ms */
            }
          },
          position:
          {
            x: 'screenCenter', /* acceptable values "left", "center", "right", "screenCenter", or relative px value */
            y: 'top' /* acceptable values "top", "bottom", "center", or relative px value */
          },
          expandable: false, /* default to large static picker - set to true to make an expandable picker (small icon with popup) - set automatically when binded to input element */
          liveUpdate: true, /* set false if you want the user to have to click "OK" before the binded input box updates values (always "true" for expandable picker) */
          alphaSupport: false, /* set to true to enable alpha picking */
          alphaPrecision: 0, /* set decimal precision for alpha percentage display - hex codes do not map directly to percentage integers - range 0-2 */
          updateInputColor: true /* set to false to prevent binded input colors from changing */
        },
      color:
        {
          mode: 'h', /* acceptabled values "h" (hue), "s" (saturation), "v" (value), "r" (red), "g" (green), "b" (blue), "a" (alpha) */
          active: new Color({ ahex: '#ffcc00ff' }), /* acceptable values are any declared $.jPicker.Color object or string HEX value (e.g. #ffc000) WITH OR WITHOUT the "#" prefix */
          quickList: /* the quick pick color list */
            [
              new Color({ h: 360, s: 33, v: 100 }), /* acceptable values are any declared $.jPicker.Color object or string HEX value (e.g. #ffc000) WITH OR WITHOUT the "#" prefix */
              new Color({ h: 360, s: 66, v: 100 }),
              new Color({ h: 360, s: 100, v: 100 }),
              new Color({ h: 360, s: 100, v: 75 }),
              new Color({ h: 360, s: 100, v: 50 }),
              new Color({ h: 180, s: 0, v: 100 }),
              new Color({ h: 30, s: 33, v: 100 }),
              new Color({ h: 30, s: 66, v: 100 }),
              new Color({ h: 30, s: 100, v: 100 }),
              new Color({ h: 30, s: 100, v: 75 }),
              new Color({ h: 30, s: 100, v: 50 }),
              new Color({ h: 180, s: 0, v: 90 }),
              new Color({ h: 60, s: 33, v: 100 }),
              new Color({ h: 60, s: 66, v: 100 }),
              new Color({ h: 60, s: 100, v: 100 }),
              new Color({ h: 60, s: 100, v: 75 }),
              new Color({ h: 60, s: 100, v: 50 }),
              new Color({ h: 180, s: 0, v: 80 }),
              new Color({ h: 90, s: 33, v: 100 }),
              new Color({ h: 90, s: 66, v: 100 }),
              new Color({ h: 90, s: 100, v: 100 }),
              new Color({ h: 90, s: 100, v: 75 }),
              new Color({ h: 90, s: 100, v: 50 }),
              new Color({ h: 180, s: 0, v: 70 }),
              new Color({ h: 120, s: 33, v: 100 }),
              new Color({ h: 120, s: 66, v: 100 }),
              new Color({ h: 120, s: 100, v: 100 }),
              new Color({ h: 120, s: 100, v: 75 }),
              new Color({ h: 120, s: 100, v: 50 }),
              new Color({ h: 180, s: 0, v: 60 }),
              new Color({ h: 150, s: 33, v: 100 }),
              new Color({ h: 150, s: 66, v: 100 }),
              new Color({ h: 150, s: 100, v: 100 }),
              new Color({ h: 150, s: 100, v: 75 }),
              new Color({ h: 150, s: 100, v: 50 }),
              new Color({ h: 180, s: 0, v: 50 }),
              new Color({ h: 180, s: 33, v: 100 }),
              new Color({ h: 180, s: 66, v: 100 }),
              new Color({ h: 180, s: 100, v: 100 }),
              new Color({ h: 180, s: 100, v: 75 }),
              new Color({ h: 180, s: 100, v: 50 }),
              new Color({ h: 180, s: 0, v: 40 }),
              new Color({ h: 210, s: 33, v: 100 }),
              new Color({ h: 210, s: 66, v: 100 }),
              new Color({ h: 210, s: 100, v: 100 }),
              new Color({ h: 210, s: 100, v: 75 }),
              new Color({ h: 210, s: 100, v: 50 }),
              new Color({ h: 180, s: 0, v: 30 }),
              new Color({ h: 240, s: 33, v: 100 }),
              new Color({ h: 240, s: 66, v: 100 }),
              new Color({ h: 240, s: 100, v: 100 }),
              new Color({ h: 240, s: 100, v: 75 }),
              new Color({ h: 240, s: 100, v: 50 }),
              new Color({ h: 180, s: 0, v: 20 }),
              new Color({ h: 270, s: 33, v: 100 }),
              new Color({ h: 270, s: 66, v: 100 }),
              new Color({ h: 270, s: 100, v: 100 }),
              new Color({ h: 270, s: 100, v: 75 }),
              new Color({ h: 270, s: 100, v: 50 }),
              new Color({ h: 180, s: 0, v: 10 }),
              new Color({ h: 300, s: 33, v: 100 }),
              new Color({ h: 300, s: 66, v: 100 }),
              new Color({ h: 300, s: 100, v: 100 }),
              new Color({ h: 300, s: 100, v: 75 }),
              new Color({ h: 300, s: 100, v: 50 }),
              new Color({ h: 180, s: 0, v: 0 }),
              new Color({ h: 330, s: 33, v: 100 }),
              new Color({ h: 330, s: 66, v: 100 }),
              new Color({ h: 330, s: 100, v: 100 }),
              new Color({ h: 330, s: 100, v: 75 }),
              new Color({ h: 330, s: 100, v: 50 }),
              new Color({ h: 180, s: 10, v: 0 })
            ]
        },
      images:
        {
          clientPath: '/jPicker/images/', /* Path to image files */
          colorMap:
          {
            width: 256,
            height: 256,
            arrow:
            {
              file: 'mappoint.gif', /* ColorMap arrow icon */
              width: 15,
              height: 15
            }
          },
          colorBar:
          {
            width: 20,
            height: 256,
            arrow:
            {
              file: 'rangearrows.gif', /* ColorBar arrow icon */
              width: 20,
              height: 7
            }
          },
          picker:
          {
            file: 'brush.png', /* Color Picker icon */
            width: 17,
            height: 16
          }
        },
      localization: /* alter these to change the text presented by the picker (e.g. different language) */
        {
          text:
          {
            title: 'Drag Markers To Pick A Color',
            newColor: 'new',
            currentColor: 'current',
            ok: 'OK',
            cancel: 'Cancel'
          },
          tooltips:
          {
            colors:
            {
              newColor: 'New Color - Press &ldquo;OK&rdquo; To Commit',
              currentColor: 'Click To Revert To Original Color'
            },
            buttons:
            {
              ok: 'Commit To This Color Selection',
              cancel: 'Cancel And Revert To Original Color'
            },
            hue:
            {
              radio: 'Set To &ldquo;Hue&rdquo; Color Mode',
              textbox: 'Enter A &ldquo;Hue&rdquo; Value (0-360&deg;)'
            },
            saturation:
            {
              radio: 'Set To &ldquo;Saturation&rdquo; Color Mode',
              textbox: 'Enter A &ldquo;Saturation&rdquo; Value (0-100%)'
            },
            value:
            {
              radio: 'Set To &ldquo;Value&rdquo; Color Mode',
              textbox: 'Enter A &ldquo;Value&rdquo; Value (0-100%)'
            },
            red:
            {
              radio: 'Set To &ldquo;Red&rdquo; Color Mode',
              textbox: 'Enter A &ldquo;Red&rdquo; Value (0-255)'
            },
            green:
            {
              radio: 'Set To &ldquo;Green&rdquo; Color Mode',
              textbox: 'Enter A &ldquo;Green&rdquo; Value (0-255)'
            },
            blue:
            {
              radio: 'Set To &ldquo;Blue&rdquo; Color Mode',
              textbox: 'Enter A &ldquo;Blue&rdquo; Value (0-255)'
            },
            alpha:
            {
              radio: 'Set To &ldquo;Alpha&rdquo; Color Mode',
              textbox: 'Enter A &ldquo;Alpha&rdquo; Value (0-100)'
            },
            hex:
            {
              textbox: 'Enter A &ldquo;Hex&rdquo; Color Value (#000000-#ffffff)',
              alpha: 'Enter A &ldquo;Alpha&rdquo; Value (#00-#ff)'
            }
          }
        }
    };
})(jQuery, '1.1.6');
jQuery.noConflict();


function OfflajnfireEvent(element,event){
    if ((document.createEventObject && !dojo.isIE) || (document.createEventObject && dojo.isIE && dojo.isIE < 9)){
      var evt = document.createEventObject();
      return element.fireEvent('on'+event,evt);
    }else{
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent(event, true, true );
      return !element.dispatchEvent(evt);
    }
}


dojo.declare("OfflajnRadio", null, {
	constructor: function(args) {
	 dojo.mixin(this,args);
   this.selected = -1;
	 this.init();
  },
  
  init: function() {
    this.hidden = dojo.byId(this.id);
    this.hidden.radioobj = this;
    dojo.connect(this.hidden, 'change', this, 'reset');
    this.container = dojo.byId('offlajnradiocontainer' + this.id);
    this.items = dojo.query('.radioelement', this.container);
    if(this.mode == "image") this.imgitems = dojo.query('.radioelement_img', this.container);
    dojo.forEach(this.items, function(item, i){
      if(this.hidden.value == this.values[i]) this.selected = i;
      dojo.connect(item, 'onclick', dojo.hitch(this, 'selectItem', i));
    }, this);
    
    this.reset();
  },
  
  reset: function(){
    var i = this.map[this.hidden.value];
    if(!i) i = 0;
    this.selectItem(i);
  },
  
  selectItem: function(i) {
    if(this.selected == i) {
      if(this.mode == "image") this.changeImage(i);
     return;
    }
    if(this.selected >= 0) dojo.removeClass(this.items[this.selected], 'selected');
    if(this.mode == "image") this.changeImage(i);
    this.selected = i;
    dojo.addClass(this.items[this.selected], 'selected');
    if(this.hidden.value != this.values[this.selected]){
      this.hidden.value = this.values[this.selected];
      this.fireEvent(this.hidden, 'change');
    }
  },
  
  changeImage: function(i) {
    dojo.style(this.imgitems[this.selected], 'backgroundPosition', '0px 0px');
    dojo.style(this.imgitems[i], 'backgroundPosition', '0px -8px');
  },

  fireEvent: function(element,event){
    if ((document.createEventObject && !dojo.isIE) || (document.createEventObject && dojo.isIE && dojo.isIE < 9)){
      var evt = document.createEventObject();
      return element.fireEvent('on'+event,evt);
    }else{
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent(event, true, true );
      return !element.dispatchEvent(evt);
    }
  }
});



dojo.declare("OfflajnSwitcher", null, {
	constructor: function(args) {
	 dojo.mixin(this,args);
   this.w = 11;
	 this.init();
  },
  
  
  init: function() {
    this.switcher = dojo.byId('offlajnswitcher_inner' + this.id);
    this.input = dojo.byId(this.id);
    this.state = this.map[this.input.value];
    this.click = dojo.connect(this.switcher, 'onclick', this, 'controller');
    dojo.connect(this.input, 'onchange', this, 'setValue');
    this.elements = new Array();
    this.getUnits();
    this.setSwitcher();
  },
  
  getUnits: function() {
    var units = dojo.create('div', {'class': 'offlajnswitcher_units' }, this.switcher.parentNode, "after");
    dojo.forEach(this.units, function(item, i){
      this.elements[i] = dojo.create('span', {'class': 'offlajnswitcher_unit', 'innerHTML': item }, units);
      if(this.mode) {
        this.elements[i].innerHTML = '';
        this.elements[i] = dojo.create('img', {'src': this.url + item }, this.elements[i]);
      }     
      this.elements[i].i = i;
      dojo.connect(this.elements[i], 'onclick', this, 'selectUnit');
    }, this);
  },
  
  getBgpos: function() {
    var pos = dojo.style(this.switcher, 'backgroundPosition');
    if(dojo.isIE <= 8){
      pos = dojo.style(this.switcher, 'backgroundPositionX')+' '+dojo.style(this.switcher, 'backgroundPositionY');
    }
    var bgp = pos.split(' ');
    bgp[1] = parseInt(bgp[1]);
    return !bgp[1] ? 0 : bgp[1];
  },
  
  selectUnit: function(e) {
    this.state = (e.target.i) ? 0 : 1;
    this.controller();
  },
  
  setSelected: function() {
    var s = (this.state) ? 0 : 1;
    dojo.removeClass(this.elements[s], 'selected');
    dojo.addClass(this.elements[this.state], 'selected');
  },
  
  controller: function() {
    if(this.anim) this.anim.stop();
    this.state ? this.setSecond() : this.setFirst();
  },
  
  
  setValue: function() {
    if(this.values[this.state] != this.input.value) {
      this.controller();
    }
  },
  
  setSwitcher: function() {
    (this.state) ? this.setFirst() : this.setSecond();
  },
  
  changeState: function(state){
    if(this.state != state){
      this.state = state;
      this.stateChanged();
    }
    this.setSelected();
  },  
  
  stateChanged: function(){
    this.input.value = this.values[this.state];
    this.fireEvent(this.input, 'change'); 
  },

  fireEvent: function(element,event){
    if ((document.createEventObject && !dojo.isIE) || (document.createEventObject && dojo.isIE && dojo.isIE < 9)){
      var evt = document.createEventObject();
      return element.fireEvent('on'+event,evt);
    }else{
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent(event, true, true );
      return !element.dispatchEvent(evt);
    }
  },
  
  setFirst: function() {
    this.changeState(1);
    var bgp = this.getBgpos();
    this.anim = new dojo.Animation({
      curve: new dojo._Line(bgp, 0),
      node: this.switcher,
      duration: 200,
      onAnimate: function(){
				var str = "center " + Math.floor(arguments[0])+"px";
				dojo.style(this.node,"backgroundPosition",str);
			}
    }).play();
  },
  
  
  setSecond: function() {
    this.changeState(0);  
    var bgp = this.getBgpos();
    this.anim = new dojo.Animation({
      curve: new dojo._Line(bgp, -1*this.w),
      node: this.switcher,
      duration: 200,
      onAnimate: function(){
				var str =  "center " + Math.floor(arguments[0])+"px";
				dojo.style(this.node,"backgroundPosition",str);
			}
    }).play();
  }
  
});


dojo.declare("OfflajnOnOff", null, {
	constructor: function(args) {
	 dojo.mixin(this,args);
   this.w = 26;
	 this.init();
  },
  
  
  init: function() {
    this.switcher = dojo.byId('offlajnonoff' + this.id);
    this.input = dojo.byId(this.id);
    this.state = parseInt(this.input.value);
    this.click = dojo.connect(this.switcher, 'onclick', this, 'controller');
    if(this.mode == 'button') {
      this.img = dojo.query('.onoffbutton_img', this.switcher);
      if(dojo.hasClass(this.switcher, 'selected')) dojo.style(this.img[0], 'backgroundPosition', '0px -11px'); 
    } else {
      dojo.connect(this.switcher, 'onmousedown', this, 'mousedown');
    }
    dojo.connect(this.input, 'onchange', this, 'setValue');
  },
  
  controller: function() {
    if(!this.mode) {
      if(this.anim) this.anim.stop();
      this.state ? this.setOff() : this.setOn();
    } else if(this.mode == "button") {
      this.state ? this.setBtnOff() : this.setBtnOn();
    }
  },
    
  setBtnOn: function() {
    dojo.style(this.img[0], 'backgroundPosition', '0px -11px');
    dojo.addClass(this.switcher, 'selected');
    this.changeState(1);
  },
  
  setBtnOff: function() {
    dojo.style(this.img[0], 'backgroundPosition', '0px 0px');
    dojo.removeClass(this.switcher, 'selected');
    this.changeState(0);
  },
  
  setValue: function() {
    if(this.state != this.input.value) {
      this.controller();
    }
  },
  
  changeState: function(state){
    if(this.state != state){
      this.state = state;
      this.stateChanged();
    }
  },  
  
  stateChanged: function(){
    this.input.value = this.state;
    this.fireEvent(this.input, 'change'); 
  },
  
  mousedown: function(e){
    this.startState = this.state;
    this.move = dojo.connect(document, 'onmousemove', this, 'mousemove');
    this.up = dojo.connect(document, 'onmouseup', this, 'mouseup');
    this.startX = e.clientX;
  },
  
  mousemove: function(e){
    var x = e.clientX-this.startX;
    if(!this.startState) x-=this.w;
    if(x > 0){
      x = 0;
      this.changeState(1);
    }
    if(x < -1*this.w){
      x = -1*this.w;
      this.changeState(0);
    }
		var str = x+"px 0px";
    dojo.style(this.switcher,"backgroundPosition",str);
  },
  
  mouseup: function(e){
    dojo.disconnect(this.move);
    dojo.disconnect(this.up);
  },

  fireEvent: function(element,event){
    if ((document.createEventObject && !dojo.isIE) || (document.createEventObject && dojo.isIE && dojo.isIE < 9)){
      var evt = document.createEventObject();
      return element.fireEvent('on'+event,evt);
    }else{
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent(event, true, true );
      return !element.dispatchEvent(evt);
    }
  },
  
  getBgpos: function() {
    var pos = dojo.style(this.switcher, 'backgroundPosition');
    if(dojo.isIE <= 8){
      pos = dojo.style(this.switcher, 'backgroundPositionX')+' '+dojo.style(this.switcher, 'backgroundPositionY');
    }
    var bgp = pos.split(' ');
    bgp[0] = parseInt(bgp[0]);
    return !bgp[0] ? 0 : bgp[0];
  },
  
  setOn: function() {
    this.changeState(1);
    
    this.anim = new dojo.Animation({
      curve: new dojo._Line(this.getBgpos(),0),
      node: this.switcher,
      onAnimate: function(){
				var str = Math.floor(arguments[0])+"px 0px";
				dojo.style(this.node,"backgroundPosition",str);
			}
    }).play();
  },
  
  
  setOff: function() {
    this.changeState(0);
      
    this.anim = new dojo.Animation({
      curve: new dojo._Line(this.getBgpos(), -1*this.w),
      node: this.switcher,
      onAnimate: function(){
				var str = Math.floor(arguments[0])+"px 0px";
				dojo.style(this.node,"backgroundPosition",str);
			}
    }).play();
  }
  
});

/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.window"]){
dojo._hasResource["dojo.window"]=true;
dojo.provide("dojo.window");
dojo.getObject("window",true,dojo);
dojo.window.getBox=function(){
var _1=(dojo.doc.compatMode=="BackCompat")?dojo.body():dojo.doc.documentElement;
var _2=dojo._docScroll();
return {w:_1.clientWidth,h:_1.clientHeight,l:_2.x,t:_2.y};
};
dojo.window.get=function(_3){
if(dojo.isIE&&window!==document.parentWindow){
_3.parentWindow.execScript("document._parentWindow = window;","Javascript");
var _4=_3._parentWindow;
_3._parentWindow=null;
return _4;
}
return _3.parentWindow||_3.defaultView;
};
dojo.window.scrollIntoView=function(_5,_6){
try{
_5=dojo.byId(_5);
var _7=_5.ownerDocument||dojo.doc,_8=_7.body||dojo.body(),_9=_7.documentElement||_8.parentNode,_a=dojo.isIE,_b=dojo.isWebKit;
if((!(dojo.isMoz||_a||_b||dojo.isOpera)||_5==_8||_5==_9)&&(typeof _5.scrollIntoView!="undefined")){
_5.scrollIntoView(false);
return;
}
var _c=_7.compatMode=="BackCompat",_d=(_a>=9&&_5.ownerDocument.parentWindow.frameElement)?((_9.clientHeight>0&&_9.clientWidth>0&&(_8.clientHeight==0||_8.clientWidth==0||_8.clientHeight>_9.clientHeight||_8.clientWidth>_9.clientWidth))?_9:_8):(_c?_8:_9),_e=_b?_8:_d,_f=_d.clientWidth,_10=_d.clientHeight,rtl=!dojo._isBodyLtr(),_11=_6||dojo.position(_5),el=_5.parentNode,_12=function(el){
return ((_a<=6||(_a&&_c))?false:(dojo.style(el,"position").toLowerCase()=="fixed"));
};
if(_12(_5)){
return;
}
while(el){
if(el==_8){
el=_e;
}
var _13=dojo.position(el),_14=_12(el);
if(el==_e){
_13.w=_f;
_13.h=_10;
if(_e==_9&&_a&&rtl){
_13.x+=_e.offsetWidth-_13.w;
}
if(_13.x<0||!_a){
_13.x=0;
}
if(_13.y<0||!_a){
_13.y=0;
}
}else{
var pb=dojo._getPadBorderExtents(el);
_13.w-=pb.w;
_13.h-=pb.h;
_13.x+=pb.l;
_13.y+=pb.t;
var _15=el.clientWidth,_16=_13.w-_15;
if(_15>0&&_16>0){
_13.w=_15;
_13.x+=(rtl&&(_a||el.clientLeft>pb.l))?_16:0;
}
_15=el.clientHeight;
_16=_13.h-_15;
if(_15>0&&_16>0){
_13.h=_15;
}
}
if(_14){
if(_13.y<0){
_13.h+=_13.y;
_13.y=0;
}
if(_13.x<0){
_13.w+=_13.x;
_13.x=0;
}
if(_13.y+_13.h>_10){
_13.h=_10-_13.y;
}
if(_13.x+_13.w>_f){
_13.w=_f-_13.x;
}
}
var l=_11.x-_13.x,t=_11.y-Math.max(_13.y,0),r=l+_11.w-_13.w,bot=t+_11.h-_13.h;
if(r*l>0){
var s=Math[l<0?"max":"min"](l,r);
if(rtl&&((_a==8&&!_c)||_a>=9)){
s=-s;
}
_11.x+=el.scrollLeft;
el.scrollLeft+=s;
_11.x-=el.scrollLeft;
}
if(bot*t>0){
_11.y+=el.scrollTop;
el.scrollTop+=Math[t<0?"max":"min"](t,bot);
_11.y-=el.scrollTop;
}
el=(el!=_e)&&!_14&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
_5.scrollIntoView(false);
}
};
}

dojo.require("dojo.window");

dojo.declare("FontConfigurator", null, {
	constructor: function(args) {  
    dojo.mixin(this,args);
    window.loadedFont = {};
    this.init();
  },
  
  
  init: function() {
    this.btn = dojo.byId(this.id+'change');
    dojo.connect(this.btn, 'onclick', this, 'showWindow');    
    this.settings = dojo.clone(this.origsettings);
    this.hidden = dojo.byId(this.id);
    dojo.connect(this.hidden, 'onchange', this, 'reset');
    this.reset();
  },
  
  reset: function(){  
    if(this.hidden.value == '') this.hidden.value = dojo.toJson(this.settings);        
    if(this.hidden.value != dojo.toJson(this.settings)){
      var newsettings = {};
      try{            
        newsettings = dojo.fromJson(this.hidden.value.replace(/\\"/g, '"'));
        if(dojo.isArray(newsettings)){
          newsettings = {};
        }                
      }catch(e){
        this.hidden.value = dojo.toJson(newsettings);
      }      
      for(var s in this.origsettings){
        if(!newsettings[s]){
          newsettings[s] = this.origsettings[s];
        }
      } 
      this.settings = this.origsettings = newsettings;
    }
  },
  
  showOverlay: function(){
    if(!this.overlayBG){
      this.overlayBG = dojo.create('div',{'class': 'blackBg'}, dojo.body());
    }
    dojo.removeClass(this.overlayBG, 'hide');
    dojo.style(this.overlayBG,{
      'opacity': 0.3
    });
  },
  
  showWindow: function(e){
    dojo.stopEvent(e);
    this.showOverlay();
    if(!this.window){
      this.window = dojo.create('div', {'class': 'OfflajnWindowFont'}, dojo.body());
      var closeBtn = dojo.create('div', {'class': 'OfflajnWindowClose'}, this.window);
      dojo.connect(closeBtn, 'onclick', this, 'closeWindow');
      var inner = dojo.create('div', {'class': 'OfflajnWindowInner'}, this.window);
      var h3 = dojo.create('h3', {'innerHTML': 'Font selector'+this.elements.tab['html']}, inner);
      
      this.reset = dojo.create('div', {'class': 'offlajnfont_reset hasOfflajnTip', 'tooltippos': 'T','title' : 'It will clear the settings on the current tab.', 'innerHTML': '<div class="offlajnfont_reset_img"></div>'}, h3);
      dojo.global.toolTips.connectToolTips(h3);
      dojo.connect(this.reset, 'onclick', this, 'resetValues');
      
      this.tab = dojo.byId(this.id+'tab');
      
      dojo.connect(this.tab, 'change', this, 'changeTab');

      dojo.create('div', {'class': 'OfflajnWindowLine'}, inner);
      var fields = dojo.create('div', {'class': 'OfflajnWindowFields'}, inner);
      
      
      dojo.create('div', {'class': 'OfflajnWindowField', 'innerHTML': 'Type<br />'+this.elements.type['html']}, fields);
      this.type = dojo.byId(this.elements.type.id);

      this.familyc = dojo.create('div', {'class': 'OfflajnWindowField'}, fields);
      
      
      dojo.create('div', {'class': 'OfflajnWindowField', 'innerHTML': 'Size<br />'+this.elements.size['html']}, fields);
      this.size = dojo.byId(this.elements.size['id']);
      
      dojo.create('div', {'class': 'OfflajnWindowField', 'innerHTML': 'Color<br />'+this.elements.color['html']}, fields);
      this.color = dojo.byId(this.elements.color['id']);
      
      dojo.create('div', {'class': 'OfflajnWindowField', 'innerHTML': 'Weight<br />'+this.elements.textdecor['html']}, fields);
      this.textdecor = dojo.byId(this.elements.textdecor.id);
      
      dojo.create('div', {'class': 'OfflajnWindowField', 'innerHTML': 'Decoration<br />'/*+this.elements.bold['html']*/+this.elements.italic['html']+this.elements.underline['html']}, fields);
     /* this.bold = dojo.byId(this.elements.bold['id']);*/
      this.italic = dojo.byId(this.elements.italic['id']);
      this.underline = dojo.byId(this.elements.underline['id']);
      
      dojo.create('div', {'class': 'OfflajnWindowField', 'innerHTML': 'Align<br />'+this.elements.align['html']}, fields);
      this.align = dojo.byId(this.elements.align['id']);
      
      dojo.create('div', {'class': 'OfflajnWindowField', 'innerHTML': 'Alternative font<br />'+this.elements.afont['html']}, fields);
      this.afont = dojo.byId(this.elements.afont['id']);
      
      dojo.create('div', {'class': 'OfflajnWindowField', 'innerHTML': 'Text shadow<br />'+this.elements.tshadow['html']}, fields);
      this.tshadow = dojo.byId(this.elements.tshadow['id']);
      
      dojo.create('div', {'class': 'OfflajnWindowField', 'innerHTML': 'Line height<br />'+this.elements.lineheight['html']}, fields);
      this.lineheight = dojo.byId(this.elements.lineheight['id']);
      
      dojo.create('div', {'class': 'OfflajnWindowTester', 'innerHTML': '<span>Grumpy wizards make toxic brew for the evil Queen and Jack.</span>'}, inner);
      this.tester = dojo.query('.OfflajnWindowTester span', inner)[0];
      var saveCont = dojo.create('div', {'class': 'OfflajnWindowSaveContainer'}, inner);
      var savebtn = dojo.create('div', {'class': 'OfflajnWindowSave', 'innerHTML': 'SAVE'}, saveCont);
      dojo.connect(savebtn, 'onclick', this, 'save');
      
      eval(this.script);
      
      
      dojo.connect(this.type, 'change', this, 'changeType');
      dojo.connect(this.size, 'change', dojo.hitch(this, 'changeSet', 'size'));
      dojo.connect(this.size, 'change', this, 'changeSize');
      dojo.connect(this.color, 'change', dojo.hitch(this, 'changeSet', 'color'));
      dojo.connect(this.color, 'change', this, 'changeColor');
      dojo.connect(this.textdecor, 'change', dojo.hitch(this, 'changeSet', 'textdecor'));
      dojo.connect(this.textdecor, 'change', this, 'changeTextDecor');
/*      dojo.connect(this.bold, 'change', dojo.hitch(this, 'changeSet', 'bold'));
      dojo.connect(this.bold, 'change', this, 'changeWeight');*/
      dojo.connect(this.italic, 'change', dojo.hitch(this, 'changeSet', 'italic'));
      dojo.connect(this.italic, 'change', this, 'changeItalic');
      dojo.connect(this.underline, 'change', dojo.hitch(this, 'changeSet', 'underline'));
      dojo.connect(this.underline, 'change', this, 'changeUnderline');
      dojo.connect(this.afont, 'change', dojo.hitch(this, 'changeSet', 'afont'));
      dojo.connect(this.afont, 'change', this, 'changeFamily');
      dojo.connect(this.align, 'change', dojo.hitch(this, 'changeSet', 'align'));
      dojo.connect(this.align, 'change', this, 'changeAlign');
      dojo.connect(this.tshadow, 'change', dojo.hitch(this, 'changeSet', 'tshadow'));
      dojo.connect(this.tshadow, 'change', this, 'changeTshadow');
      dojo.connect(this.lineheight, 'change', dojo.hitch(this, 'changeSet', 'lineheight'));
      dojo.connect(this.lineheight, 'change', this, 'changeLineheight');
      
      dojo.addOnLoad(this, function(){
        this.changeTab();
        this.changeType();
      });
      this.changeType();
      this.refreshFont();
    }else{
      this.settings = dojo.fromJson(this.hidden.value.replace(/\\"/g, '"'));
      this.loadSettings();
    }
    dojo.removeClass(this.window, 'hide');
    this.exit = dojo.connect(document, "onkeypress", this, "keyPressed");
  },
  
  closeWindow: function(){
    dojo.addClass(this.window, 'hide');
    dojo.addClass(this.overlayBG, 'hide');
  },
  
  save: function(){  
    this.hidden.value = dojo.toJson(this.settings);
    this.closeWindow();
  },
  
  loadSettings: function(){
    if(this.defaultTab!=this.t){
      this._loadSettings(this.defaultTab, true);
    }
    this._loadSettings(this.t, false);
    this.refreshFont();
  },
  
  _loadSettings: function(tab, def){
    var set = this.settings[tab];
    for(s in set){
      if(this[s] && (!def || def && !this.settings[this.t][s])){
        this.changeHidden(this[s], set[s]);
      }
    }
  },
  
  resetValues: function() {
    if(this.t != this.defaultTab) {
      this.settings[this.t] = {};
      this.loadSettings();
    }
  },
  
  loadFamily: function(e){
    dojo.stopEvent(e);
    var list = this.family.listobj;
    
    this.maxIteminWindow = parseInt(list.scrollbar.windowHeight/list.lineHeight)+1;
//    this.loadFamilyScroll();
//    list.scrollbar.onScroll = dojo.hitch(this, 'loadFamilyScroll');
  },
  
  loadFamilyScroll: function(){
    var set = this.settings[this.t];
    var list = this.family.listobj;
    var start = parseInt(list.scrollbar.curr*-1/list.lineHeight);
    for(var i = start; i <= start+this.maxIteminWindow && i < list.list.length; i++){
      var item = list.list[i];
      var option = list.options[i].value;
      this.loadGoogleFont(set.subset, option);
      dojo.style(item, 'fontFamily', "'"+option+"'");
    }
  },
  
  loadGoogleFont: function(subset, family, weight, italic){
    if(!weight) weight = 400;
//    weight = (this.textdecor.value.toUpperCase()=='LIGHTER') ? 300 : (this.textdecor.value.toUpperCase() ? 400 : 700);
    italic ? italic = 'italic' : italic = '';
    var hash = subset+family+weight+italic;
    if(!window.loadedFont[hash]){
      window.loadedFont[hash] = true; 
      setTimeout(function(){
        dojo.create('link', {rel:'stylesheet', type: 'text/css', href: 'http://fonts.googleapis.com/css?family='+family+':300,400,700,800'+italic+'&subset='+subset}, dojo.body())
      },500);
    } 
  },
  
  changeType: function(e){
    if(e){
      var obj = e.target.listobj;
      if(obj.map[obj.hidden.value] != obj.hidden.selectedIndex) return;
    }
    var set = this.settings[this.t];
    set.type = this.type.value;
    if(!this.elements.type[set.type]){
      if(!this.family){
        this.familyc.innerHTML = 'Family<br />'+this.elements.type['Latin']['html'];
        this.family = dojo.byId(this.elements.type['Latin']['id']);
        eval(this.elements.type['Latin']['script']);
      }
      dojo.addOnLoad(this, function(){
        dojo.style(this.family.listobj.container,'visibility', 'hidden');
      });
      set.family = '';
      this.changeFamily();
      return;
    }
    this.familyc.innerHTML = 'Family<br />'+this.elements.type[set.type]['html'];
    this.family = dojo.byId(this.elements.type[set.type]['id']);
    
    dojo.connect(this.family, 'change', dojo.hitch(this, 'changeSet', 'family'));
    dojo.connect(this.family, 'click', this, 'loadFamily');
    dojo.connect(this.family, 'change', this, 'refreshFont');
    eval(this.elements.type[set.type]['script']);
    if(set.family){
      dojo.addOnLoad(this, function(){
        var set = this.settings[this.t];
        this.changeHidden(this.family, set.family);
      });
    }
    var subset = this.type.value;
    if(subset == 'LatinExtended'){
      subset = 'latin,latin-ext';
    }else if(subset == 'CyrillicExtended'){
      subset = 'cyrillic,cyrillic-ext';
    }else if(subset == 'GreekExtended'){
      subset = 'greek,greek-ext';
    }
    set.subset = subset;
  },
  
  changeSet: function(name, e){
    var set = this.settings[this.t];
    set[name] = e.target.value;
  },
  
  refreshFont: function(){
    var set = this.settings[this.t];
//    if(this.bold) this.changeWeight();
    if(this.textdecor) this.changeTextDecor();
    if(this.italic) this.changeItalic();
    if(this.underline) this.changeUnderline();
    this.changeFamily();
    if(this.size) this.changeSize();
    if(this.color) this.changeColor();
    if(this.align) this.changeAlign();
    if(this.tshadow) this.changeTshadow();
    if(this.lineheight) this.changeLineheight();
  },
  
  changeTextDecor: function(e){
    dojo.style(this.tester, 'fontWeight', this.textdecor.value);
  },
  
  changeWeight: function(){
//    dojo.style(this.tester, 'fontWeight', (parseInt(this.bold.value) ? 'bold' : 'normal'));
  },
  
  changeItalic: function(){
    dojo.style(this.tester, 'fontStyle', (parseInt(this.italic.value) ? 'italic' : 'normal'));
  },
  
  changeUnderline: function(){
    dojo.style(this.tester, 'textDecoration', (parseInt(this.underline.value) ? 'underline' : 'none'));
  },
  
  changeFamily: function(){
    var set = this.settings[this.t];
    var f = '';
    if(this.family && set.type != '0'){
      f = "'"+this.family.value+"'";
      this.loadGoogleFont(set.subset, this.family.value, '400', parseInt(this.italic.value));
    }
    if(this.afont){
      var afont = this.afont.value.split('||'); 
      if(afont[0] != '' && parseInt(afont[1])){
        if(f != '') f+=',';
        f+=afont[0];
      }
    }
    dojo.style(this.tester, 'fontFamily', f);
  },
  
  changeSize: function(){
    dojo.style(this.tester, 'fontSize', this.size.value.replace('||', '') );
  },
  
  changeColor: function(){
    dojo.style(this.tester, 'color', '#'+this.color.value );
    var rgb = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})*$/i.exec(this.color.value);
    var brightness = Math.round(((parseInt(rgb[1],16) * 299) + (parseInt(rgb[2],16) * 587) + (parseInt(rgb[3],16) * 114)) /1000);
    (brightness > 125) ? dojo.style(this.tester.parentNode, 'backgroundColor', '#555555') : dojo.style(this.tester.parentNode, 'backgroundColor', '#fdfdfd');
  },
  
  changeAlign: function(){
    dojo.style(this.tester.parentNode, 'textAlign', this.align.value );
  },
  
  changeTshadow: function(){
    var s = this.tshadow.value.replace(/\|\|/g,'').split('|*|');
    var shadow = '';
    if(parseInt(s[4])){
      s[4] = '';
      if (s[3].length > 6) {
        var c = s[3].match(/(..)(..)(..)(..)/);
        s[3]='rgba('+Number('0x'+c[1])+','+Number('0x'+c[2])+','+Number('0x'+c[3])+','+Number('0x'+c[4])/255.+')';
      } else s[3] = '#'+s[3];
      shadow = s.join(' ');
    }
    dojo.style(this.tester, 'textShadow', shadow);
  },
  
  changeLineheight: function(){
    dojo.style(this.tester, 'lineHeight', this.lineheight.value);
  },
  
  changeTab: function(){
    var radio = this.tab.radioobj;
    this.t = this.tab.value;
    if(this.t != this.defaultTab){
      dojo.style(this.reset,'display','block');
    }else{
      dojo.style(this.reset,'display','none');
    }
    this.loadSettings();
  },
  
  changeHidden: function(el, value){
    if(el.value == value) return;
    el.value = value;
    this.fireEvent(el, 'change');
  },

  fireEvent: function(element,event){
    if ((document.createEventObject && !dojo.isIE) || (document.createEventObject && dojo.isIE && dojo.isIE < 9)){
      var evt = document.createEventObject();
      return element.fireEvent('on'+event,evt);
    }else{
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent(event, true, true );
      return !element.dispatchEvent(evt);
    }
  },
  
  keyPressed: function(e) {
    if(e.keyCode == 27) { 
      this.closeWindow();
      dojo.disconnect(this.exit);
    }
  }
});



dojo.declare("OfflajnOnOff", null, {
	constructor: function(args) {
	 dojo.mixin(this,args);
   this.w = 26;
	 this.init();
  },
  
  
  init: function() {
    this.switcher = dojo.byId('offlajnonoff' + this.id);
    this.input = dojo.byId(this.id);
    this.state = parseInt(this.input.value);
    this.click = dojo.connect(this.switcher, 'onclick', this, 'controller');
    if(this.mode == 'button') {
      this.img = dojo.query('.onoffbutton_img', this.switcher);
      if(dojo.hasClass(this.switcher, 'selected')) dojo.style(this.img[0], 'backgroundPosition', '0px -11px'); 
    } else {
      dojo.connect(this.switcher, 'onmousedown', this, 'mousedown');
    }
    dojo.connect(this.input, 'onchange', this, 'setValue');
  },
  
  controller: function() {
    if(!this.mode) {
      if(this.anim) this.anim.stop();
      this.state ? this.setOff() : this.setOn();
    } else if(this.mode == "button") {
      this.state ? this.setBtnOff() : this.setBtnOn();
    }
  },
    
  setBtnOn: function() {
    dojo.style(this.img[0], 'backgroundPosition', '0px -11px');
    dojo.addClass(this.switcher, 'selected');
    this.changeState(1);
  },
  
  setBtnOff: function() {
    dojo.style(this.img[0], 'backgroundPosition', '0px 0px');
    dojo.removeClass(this.switcher, 'selected');
    this.changeState(0);
  },
  
  setValue: function() {
    if(this.state != this.input.value) {
      this.controller();
    }
  },
  
  changeState: function(state){
    if(this.state != state){
      this.state = state;
      this.stateChanged();
    }
  },  
  
  stateChanged: function(){
    this.input.value = this.state;
    this.fireEvent(this.input, 'change'); 
  },
  
  mousedown: function(e){
    this.startState = this.state;
    this.move = dojo.connect(document, 'onmousemove', this, 'mousemove');
    this.up = dojo.connect(document, 'onmouseup', this, 'mouseup');
    this.startX = e.clientX;
  },
  
  mousemove: function(e){
    var x = e.clientX-this.startX;
    if(!this.startState) x-=this.w;
    if(x > 0){
      x = 0;
      this.changeState(1);
    }
    if(x < -1*this.w){
      x = -1*this.w;
      this.changeState(0);
    }
		var str = x+"px 0px";
    dojo.style(this.switcher,"backgroundPosition",str);
  },
  
  mouseup: function(e){
    dojo.disconnect(this.move);
    dojo.disconnect(this.up);
  },

  fireEvent: function(element,event){
    if ((document.createEventObject && !dojo.isIE) || (document.createEventObject && dojo.isIE && dojo.isIE < 9)){
      var evt = document.createEventObject();
      return element.fireEvent('on'+event,evt);
    }else{
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent(event, true, true );
      return !element.dispatchEvent(evt);
    }
  },
  
  getBgpos: function() {
    var pos = dojo.style(this.switcher, 'backgroundPosition');
    if(dojo.isIE <= 8){
      pos = dojo.style(this.switcher, 'backgroundPositionX')+' '+dojo.style(this.switcher, 'backgroundPositionY');
    }
    var bgp = pos.split(' ');
    bgp[0] = parseInt(bgp[0]);
    return !bgp[0] ? 0 : bgp[0];
  },
  
  setOn: function() {
    this.changeState(1);
    
    this.anim = new dojo.Animation({
      curve: new dojo._Line(this.getBgpos(),0),
      node: this.switcher,
      onAnimate: function(){
				var str = Math.floor(arguments[0])+"px 0px";
				dojo.style(this.node,"backgroundPosition",str);
			}
    }).play();
  },
  
  
  setOff: function() {
    this.changeState(0);
      
    this.anim = new dojo.Animation({
      curve: new dojo._Line(this.getBgpos(), -1*this.w),
      node: this.switcher,
      onAnimate: function(){
				var str = Math.floor(arguments[0])+"px 0px";
				dojo.style(this.node,"backgroundPosition",str);
			}
    }).play();
  }
  
});


dojo.declare("OfflajnGradient", null, {
	constructor: function(args) {
    dojo.mixin(this,args);
    this.init();
  },
  
  init: function() {
    this.start.alphaSupport=false; 
    this.startc = jQuery(this.start).jPicker({
      window:{
        expandable: true,
        alphaSupport: false
      }
    });
    
    this.end.alphaSupport=false; 
    this.endc = jQuery(this.end).jPicker({
      window:{
        expandable: true,
        alphaSupport: false
      }
    });
    
    if(dojo.isIE){
      dojo.style(this.start.parentNode.parentNode, 'zoom', '1');
    }
    //this.changeGradient();
    
    this.container = this.start.parentNode.parentNode.parentNode;
    if (!this.onoff) {
      this.container.style.marginLeft = 0;
      dojo.byId("offlajnonoff"+this.switcher.id).style.display = 'none';
    }
    
    this.hider = dojo.create("div", { "class": "gradient_hider" }, this.container, "last");
    
    dojo.style(this.hider, 'position', 'absolute');
    dojo.style(this.hider, "display", "none");
    
    if(!parseInt(this.switcher.value)){
      dojo.style(this.container, 'opacity', 0.15);
      dojo.style(this.hider, "display", "block");
    }
    this.changeValues();
  
    dojo.connect(this.switcher, 'onchange', this, 'onSwitch');
    dojo.connect(this.start, 'onchange', this, 'changeGradient');
    dojo.connect(this.end, 'onchange', this, 'changeGradient');
    dojo.connect(this.hidden, 'onchange', this, 'changeValues');
    this.onResize();
    dojo.connect(window, 'onresize', this, 'onResize');
  },
     
  onResize: function(){ 
    var j15 = 0;
    if(this.container.parentNode.tagName == 'TD') j15 = 1;
    var w = dojo.coords(j15 ? this.container.parentNode.parentNode:this.container.parentNode).w-30;
    var c = this.container.parentNode.children;
    for(var i = 0; i < c.length-1 && c[i] != this.container; i++){
      w-=dojo.marginBox(c[i]).w;
    }
    if(j15) w-=160;
    dojo.style(this.container, 'width', w+'px');
    dojo.style(this.hider, "width", w+"px");
  },
  
  onSwitch: function(){
    if(this.anim) this.anim.stop();
    if(parseInt(this.switcher.value)){
      this.anim = dojo.animateProperty({
        node: this.container,
        properties: {
            opacity : 1
        },
        onEnd : dojo.hitch(this,function() {
                  dojo.style(this.hider, "display", "none");
                })
      }).play();
    }else{
      this.anim = dojo.animateProperty({
        node: this.container,
        properties: {
            opacity : 0.15
        },
        onBegin : dojo.hitch(this,function() {
                  dojo.style(this.hider, "display", "block");
                })
      }).play();
    }
    this.changeGradient();
  },
  
  changeGradient: function() {
      if(dojo.isIE){
        dojo.style(this.start.parentNode.parentNode, 'filter', 'progid:DXImageTransform.Microsoft.Gradient(GradientType=1,StartColorStr=#'+this.start.value+',EndColorStr=#'+this.end.value+')');
      }else if (dojo.isFF ) {
        dojo.style(this.start.parentNode.parentNode, 'background', '-moz-linear-gradient( left, #'+this.start.value+', #'+this.end.value+')');
      } else if (dojo.isMozilla ) {
        dojo.style(this.start.parentNode.parentNode, 'background', '-moz-linear-gradient( left, #'+this.start.value+', #'+this.end.value+')');
      } else if (dojo.isOpera ) {
        dojo.style(this.start.parentNode.parentNode, 'background-image', '-o-linear-gradient(right, #'+this.start.value+', #'+this.end.value+')');
      } else {
        dojo.style(this.start.parentNode.parentNode, 'background', '-webkit-gradient( linear, left top, right top, from(#'+this.start.value+'), to(#'+this.end.value+'))');
      }
      this.hidden.value = this.switcher.value+'-'+this.start.value+'-'+this.end.value;
  },
  
  changeValues: function() {
    var val = this.hidden.value.split("-");
    //console.log(val);
    this.switcher.value = val[0];
    this.fireEvent(this.switcher, 'change');
    this.onSwitch();
    if(val[1] && val[2]) {
      this.start.value = val[1];
      this.startc[0].color.active.val('hex', val[1]);
      //this.fireEvent(this.start, 'change');
      this.end.value = val[2];
      this.endc[0].color.active.val('hex', val[2]);
      //this.fireEvent(this.end, 'change');
      this.changeGradient();
    }
  },
  
  fireEvent: function(element,event){
    if ((document.createEventObject && !dojo.isIE) || (document.createEventObject && dojo.isIE && dojo.isIE < 9)){
      var evt = document.createEventObject();
      return element.fireEvent('on'+event,evt);
    }else{
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent(event, true, true );
      return !element.dispatchEvent(evt);
    }
  }
});
dojo.addOnLoad(function(){
      new OfflajnList({
        name: "jformparamsmoduleparametersTabthemethemeskin",
        elements: "<div class=\"content\"><div class=\"listelement\">Custom<\/div><div class=\"listelement\">Steelblue<\/div><div class=\"listelement\">Royalblue<\/div><div class=\"listelement\">Red<\/div><div class=\"listelement\">Darkorange<\/div><div class=\"listelement\">Olive<\/div><div class=\"listelement\">Dimgray<\/div><div class=\"listelement\">Mediumpurple<\/div><div class=\"listelement\">Lightseegreen<\/div><div class=\"listelement\">Steelblue dark<\/div><div class=\"listelement\">Orchid dark<\/div><div class=\"listelement\">Amethyst dark<\/div><div class=\"listelement\">Mediumaquamarine dark<\/div><div class=\"listelement\">Limegreen dark<\/div><div class=\"listelement\">Lightgreen dark<\/div><div class=\"listelement\">Peru dark<\/div><div class=\"listelement\">Indianred dark<\/div><div class=\"listelement\">Black dark<\/div><\/div>",
        options: [{"value":"custom","text":"Custom"},{"value":"flat_steelblue","text":"Steelblue"},{"value":"flat_royalblue","text":"Royalblue"},{"value":"flat_red","text":"Red"},{"value":"flat_darkorange","text":"Darkorange"},{"value":"flat_olive","text":"Olive"},{"value":"flat_dimgray","text":"Dimgray"},{"value":"flat_mediumpurple","text":"Mediumpurple"},{"value":"flat_lightseegreen","text":"Lightseegreen"},{"value":"flat_steelblue_dark","text":"Steelblue dark"},{"value":"flat_orchid_dark","text":"Orchid dark"},{"value":"flat_amethyst_dark","text":"Amethyst dark"},{"value":"flat_mediumaquamarine_dark","text":"Mediumaquamarine dark"},{"value":"flat_limegreen_dark","text":"Limegreen dark"},{"value":"flat_lightgreen_dark","text":"Lightgreen dark"},{"value":"flat_peru_dark","text":"Peru dark"},{"value":"flat_indianred_dark","text":"Indianred dark"},{"value":"flat_black_dark","text":"Black dark"}],
        selectedIndex: 0,
        height: 10,
        fireshow: 0
      });
    

      window.themeskin = new OfflajnSkin({
        name: "themeskin",
        id: "jformparamsmoduleparametersTabthemethemeskin",
        data: {"flat_steelblue":{"blackoutcomb":"40|*|\/modules\/mod_improved_ajax_login\/themes\/flat\/images\/samples\/ptrn1.png","popupcomb":"ffffff|*|3|*|4b91b5|*|7|*|1","titlefont":"{\"Text\":{\"lineheight\":\"30px\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Open Sans\",\"color\":\"ffffff\",\"size\":\"22||px\",\"align\":\"left\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btnfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"family\":\"Open Sans\",\"subset\":\"Latin\",\"size\":\"20||px\",\"color\":\"ffffff\",\"tshadow\":\"1||px|*|1||px|*|0|*|00000000|*|0|*|\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btngrad":"1-4b91b5-4b91b5","hovergrad":"1-65a8ca-65a8ca","buttoncomb":"4|*|4b91b5","txtcomb":"ffffff|*|ffffff|*|40||px|*|d8d8d8|*|0|*|","checkboxcolor":"d8d8d8","textfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Open Sans\",\"size\":\"20||px\",\"color\":\"a1a1a1\",\"afont\":\"Helvetica||1\",\"underline\":\"0\",\"textdecor\":\"300\"},\"Link\":{\"color\":\"1685d7\",\"underline\":\"0\"},\"Hover\":{\"color\":\"1186bb\",\"underline\":\"0\"}}","smalltext":"14||px","errorcolor":"ffffff","errorgrad":"1-de5243-de5243","hintcolor":"5e5e5e","hintgrad":"1-FFFFFF-F5F5F5"},"flat_royalblue":{"blackoutcomb":"40|*|\/modules\/mod_improved_ajax_login\/themes\/flat\/images\/samples\/ptrn1.png","popupcomb":"ffffff|*|3|*|4b6bb5|*|7|*|1","titlefont":"{\"Text\":{\"lineheight\":\"30px\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Open Sans\",\"color\":\"ffffff\",\"size\":\"22||px\",\"align\":\"left\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btnfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"family\":\"Open Sans\",\"subset\":\"Latin\",\"size\":\"20||px\",\"color\":\"ffffff\",\"tshadow\":\"1||px|*|1||px|*|0|*|00000000|*|0|*|\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btngrad":"1-4b6bb5-4b6bb5","hovergrad":"1-6583c9-6583c9","buttoncomb":"4|*|4b6bb5","txtcomb":"ffffff|*|ffffff|*|40||px|*|d8d8d8|*|0|*|","textfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Open Sans\",\"size\":\"20||px\",\"color\":\"a1a1a1\",\"afont\":\"Helvetica||1\",\"underline\":\"0\",\"textdecor\":\"300\"},\"Link\":{\"color\":\"1685d7\",\"underline\":\"0\"},\"Hover\":{\"color\":\"4b6bb5\",\"underline\":\"0\"}}","checkboxcolor":"d8d8d8","smalltext":"14||px","errorcolor":"ffffff","errorgrad":"1-de5243-de5243","hintcolor":"5e5e5e","hintgrad":"1-FFFFFF-F5F5F5"},"flat_red":{"blackoutcomb":"40|*|\/modules\/mod_improved_ajax_login\/themes\/flat\/images\/samples\/ptrn1.png","popupcomb":"ffffff|*|3|*|de5243|*|7|*|1","titlefont":"{\"Text\":{\"lineheight\":\"30px\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Open Sans\",\"color\":\"ffffff\",\"size\":\"22||px\",\"align\":\"left\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btnfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"family\":\"Open Sans\",\"subset\":\"Latin\",\"size\":\"20||px\",\"color\":\"ffffff\",\"tshadow\":\"1||px|*|1||px|*|0|*|00000000|*|0|*|\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btngrad":"1-de5243-de5243","hovergrad":"1-eb6556-eb6556","buttoncomb":"4|*|de5243","txtcomb":"ffffff|*|ffffff|*|40||px|*|d8d8d8|*|0|*|","checkboxcolor":"d8d8d8","textfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Open Sans\",\"size\":\"20||px\",\"color\":\"a1a1a1\",\"afont\":\"Helvetica||1\",\"underline\":\"0\",\"textdecor\":\"300\"},\"Link\":{\"color\":\"1685d7\",\"underline\":\"0\"},\"Hover\":{\"color\":\"d34232\",\"underline\":\"0\"}}","smalltext":"14||px","errorcolor":"ffffff","errorgrad":"1-de5243-de5243","hintcolor":"5e5e5e","hintgrad":"1-FFFFFF-F5F5F5"},"flat_darkorange":{"blackoutcomb":"40|*|\/modules\/mod_improved_ajax_login\/themes\/flat\/images\/samples\/ptrn1.png","popupcomb":"ffffff|*|3|*|de7a22|*|7|*|1","titlefont":"{\"Text\":{\"lineheight\":\"30px\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Open Sans\",\"color\":\"ffffff\",\"size\":\"22||px\",\"align\":\"left\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btnfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"family\":\"Open Sans\",\"subset\":\"Latin\",\"size\":\"20||px\",\"color\":\"ffffff\",\"tshadow\":\"1||px|*|1||px|*|0|*|00000000|*|0|*|\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btngrad":"1-de7a22-de7a22","hovergrad":"1-e28c40-e28c40","buttoncomb":"4|*|de7a22","txtcomb":"ffffff|*|ffffff|*|40||px|*|d8d8d8|*|0|*|","checkboxcolor":"d8d8d8","textfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Open Sans\",\"size\":\"20||px\",\"color\":\"a1a1a1\",\"afont\":\"Helvetica||1\",\"underline\":\"0\",\"textdecor\":\"300\"},\"Link\":{\"color\":\"1685d7\",\"underline\":\"0\"},\"Hover\":{\"color\":\"de7a22\",\"underline\":\"0\"}}","smalltext":"14||px","errorcolor":"ffffff","errorgrad":"1-de5243-de5243","hintcolor":"5e5e5e","hintgrad":"1-FFFFFF-F5F5F5"},"flat_olive":{"blackoutcomb":"40|*|\/modules\/mod_improved_ajax_login\/themes\/flat\/images\/samples\/ptrn1.png","popupcomb":"ffffff|*|3|*|8eb65b|*|7|*|1","titlefont":"{\"Text\":{\"lineheight\":\"30px\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Open Sans\",\"color\":\"ffffff\",\"size\":\"22||px\",\"align\":\"left\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btnfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"family\":\"Open Sans\",\"subset\":\"Latin\",\"size\":\"20||px\",\"color\":\"ffffff\",\"tshadow\":\"1||px|*|1||px|*|0|*|00000000|*|0|*|\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btngrad":"1-8eb65b-8eb65b","hovergrad":"1-97c55d-97c55d","buttoncomb":"4|*|8eb65b","txtcomb":"ffffff|*|ffffff|*|40||px|*|d8d8d8|*|0|*|","checkboxcolor":"d8d8d8","textfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Open Sans\",\"size\":\"20||px\",\"color\":\"a1a1a1\",\"afont\":\"Helvetica||1\",\"underline\":\"0\",\"textdecor\":\"300\"},\"Link\":{\"color\":\"1685d7\",\"underline\":\"0\"},\"Hover\":{\"color\":\"6d9736\",\"underline\":\"0\"}}","smalltext":"14||px","errorcolor":"ffffff","errorgrad":"1-de5243-de5243","hintcolor":"5e5e5e","hintgrad":"1-FFFFFF-F5F5F5"},"flat_dimgray":{"blackoutcomb":"40|*|\/modules\/mod_improved_ajax_login\/themes\/flat\/images\/samples\/ptrn1.png","popupcomb":"ffffff|*|3|*|646464|*|7|*|1","titlefont":"{\"Text\":{\"lineheight\":\"30px\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Open Sans\",\"color\":\"ffffff\",\"size\":\"22||px\",\"align\":\"left\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btnfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"family\":\"Open Sans\",\"subset\":\"Latin\",\"size\":\"20||px\",\"color\":\"ffffff\",\"tshadow\":\"1||px|*|1||px|*|0|*|00000000|*|0|*|\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btngrad":"1-646464-646464","hovergrad":"1-8c8b8b-8c8b8b","buttoncomb":"4|*|646464","txtcomb":"ffffff|*|ffffff|*|40||px|*|d8d8d8|*|0|*|","checkboxcolor":"d8d8d8","textfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Open Sans\",\"size\":\"20||px\",\"color\":\"a1a1a1\",\"afont\":\"Helvetica||1\",\"underline\":\"0\",\"textdecor\":\"300\"},\"Link\":{\"color\":\"1685d7\",\"underline\":\"0\"},\"Hover\":{\"color\":\"646464\",\"underline\":\"0\"}}","smalltext":"14||px","errorcolor":"ffffff","errorgrad":"1-de5243-de5243","hintcolor":"5e5e5e","hintgrad":"1-FFFFFF-F5F5F5"},"flat_mediumpurple":{"blackoutcomb":"40|*|\/modules\/mod_improved_ajax_login\/themes\/flat\/images\/samples\/ptrn1.png","popupcomb":"ffffff|*|3|*|9c51f1|*|7|*|1","titlefont":"{\"Text\":{\"lineheight\":\"30px\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Open Sans\",\"color\":\"ffffff\",\"size\":\"22||px\",\"align\":\"left\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btnfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"family\":\"Open Sans\",\"subset\":\"Latin\",\"size\":\"20||px\",\"color\":\"ffffff\",\"tshadow\":\"1||px|*|1||px|*|0|*|00000000|*|0|*|\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btngrad":"1-9c51f1-9c51f1","hovergrad":"1-ab68f7-ab68f7","buttoncomb":"4|*|9c51f1","txtcomb":"ffffff|*|ffffff|*|40||px|*|d8d8d8|*|0|*|","checkboxcolor":"d8d8d8","textfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Open Sans\",\"size\":\"20||px\",\"color\":\"a1a1a1\",\"afont\":\"Helvetica||1\",\"underline\":\"0\",\"textdecor\":\"300\"},\"Link\":{\"color\":\"1685d7\",\"underline\":\"0\"},\"Hover\":{\"color\":\"7a32cc\",\"underline\":\"0\"}}","smalltext":"14||px","errorcolor":"ffffff","errorgrad":"1-de5243-de5243","hintcolor":"5e5e5e","hintgrad":"1-FFFFFF-F5F5F5"},"flat_lightseegreen":{"blackoutcomb":"40|*|\/modules\/mod_improved_ajax_login\/themes\/flat\/images\/samples\/ptrn1.png","popupcomb":"ffffff|*|3|*|1fbba6|*|7|*|1","titlefont":"{\"Text\":{\"lineheight\":\"30px\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Open Sans\",\"color\":\"ffffff\",\"size\":\"22||px\",\"align\":\"left\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btnfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"family\":\"Open Sans\",\"subset\":\"Latin\",\"size\":\"20||px\",\"color\":\"ffffff\",\"tshadow\":\"1||px|*|1||px|*|0|*|00000000|*|0|*|\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btngrad":"1-1fbba6-1fbba6","hovergrad":"1-4dd7c4-4dd7c4","buttoncomb":"4|*|1fbba6","txtcomb":"ffffff|*|ffffff|*|40||px|*|d8d8d8|*|0|*|","checkboxcolor":"d8d8d8","textfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Open Sans\",\"size\":\"20||px\",\"color\":\"a1a1a1\",\"afont\":\"Helvetica||1\",\"underline\":\"0\",\"textdecor\":\"300\"},\"Link\":{\"color\":\"1685d7\",\"underline\":\"0\"},\"Hover\":{\"color\":\"15a08d\",\"underline\":\"0\"}}","smalltext":"14||px","errorcolor":"ffffff","errorgrad":"1-de5243-de5243","hintcolor":"5e5e5e","hintgrad":"1-FFFFFF-F5F5F5"},"flat_steelblue_dark":{"blackoutcomb":"40|*|\/modules\/mod_improved_ajax_login\/themes\/flat\/images\/samples\/ptrn1.png","popupcomb":"434d54|*|3|*|4b91b5|*|7|*|1","titlefont":"{\"Text\":{\"lineheight\":\"30px\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"color\":\"ffffff\",\"size\":\"25||px\",\"align\":\"left\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btnfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"subset\":\"Latin\",\"size\":\"25||px\",\"color\":\"ffffff\",\"tshadow\":\"1||px|*|1||px|*|0|*|00000000|*|0|*|\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btngrad":"1-4b91b5-4b91b5","hovergrad":"1-65a8ca-65a8ca","buttoncomb":"4|*|4b91b5","txtcomb":"ffffff|*|ffffff|*|47||px|*|434d54|*|0|*|","checkboxcolor":"989898","textfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"size\":\"25||px\",\"color\":\"a1a1a1\",\"afont\":\"Helvetica||1\",\"underline\":\"0\",\"textdecor\":\"300\"},\"Link\":{\"color\":\"1685d7\",\"underline\":\"0\"},\"Hover\":{\"color\":\"7fafbd\",\"underline\":\"0\"}}","smalltext":"18||px","errorcolor":"ffffff","errorgrad":"1-de5243-de5243","hintcolor":"5e5e5e","hintgrad":"1-FFFFFF-F5F5F5"},"flat_orchid_dark":{"blackoutcomb":"40|*|\/modules\/mod_improved_ajax_login\/themes\/flat\/images\/samples\/ptrn1.png","popupcomb":"4e4354|*|3|*|b54b87|*|7|*|1","titlefont":"{\"Text\":{\"lineheight\":\"30px\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"color\":\"ffffff\",\"size\":\"25||px\",\"align\":\"left\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btnfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"subset\":\"Latin\",\"size\":\"25||px\",\"color\":\"ffffff\",\"tshadow\":\"1||px|*|1||px|*|0|*|00000000|*|0|*|\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btngrad":"1-b54b87-b54b87","hovergrad":"1-bd6295-bd6295","buttoncomb":"4|*|b54b87","txtcomb":"ffffff|*|ffffff|*|47||px|*|4e4354|*|0|*|","checkboxcolor":"989898","textfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"size\":\"25||px\",\"color\":\"a1a1a1\",\"afont\":\"Helvetica||1\",\"underline\":\"0\",\"textdecor\":\"300\"},\"Link\":{\"color\":\"1685d7\",\"underline\":\"0\"},\"Hover\":{\"color\":\"e4bad2\",\"underline\":\"0\"}}","smalltext":"18||px","errorcolor":"ffffff","errorgrad":"1-de5243-de5243","hintcolor":"5e5e5e","hintgrad":"1-FFFFFF-F5F5F5"},"flat_amethyst_dark":{"blackoutcomb":"40|*|\/modules\/mod_improved_ajax_login\/themes\/flat\/images\/samples\/ptrn1.png","popupcomb":"504354|*|3|*|8e4bb5|*|7|*|1","titlefont":"{\"Text\":{\"lineheight\":\"30px\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"color\":\"ffffff\",\"size\":\"25||px\",\"align\":\"left\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btnfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"subset\":\"Latin\",\"size\":\"25||px\",\"color\":\"ffffff\",\"tshadow\":\"1||px|*|1||px|*|0|*|00000000|*|0|*|\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btngrad":"1-8e4bb5-8e4bb5","hovergrad":"1-a66dc7-a66dc7","buttoncomb":"4|*|8e4bb5","txtcomb":"ffffff|*|ffffff|*|47||px|*|504354|*|0|*|","checkboxcolor":"989898","textfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"size\":\"25||px\",\"color\":\"a1a1a1\",\"afont\":\"Helvetica||1\",\"underline\":\"0\",\"textdecor\":\"300\"},\"Link\":{\"color\":\"1685d7\",\"underline\":\"0\"},\"Hover\":{\"color\":\"dabae4\",\"underline\":\"0\"}}","smalltext":"18||px","errorcolor":"ffffff","errorgrad":"1-de5243-de5243","hintcolor":"5e5e5e","hintgrad":"1-FFFFFF-F5F5F5"},"flat_mediumaquamarine_dark":{"blackoutcomb":"40|*|\/modules\/mod_improved_ajax_login\/themes\/flat\/images\/samples\/ptrn1.png","popupcomb":"434754|*|3|*|4bb5a5|*|7|*|1","titlefont":"{\"Text\":{\"lineheight\":\"30px\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"color\":\"ffffff\",\"size\":\"25||px\",\"align\":\"left\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btnfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"subset\":\"Latin\",\"size\":\"25||px\",\"color\":\"ffffff\",\"tshadow\":\"1||px|*|1||px|*|0|*|00000000|*|0|*|\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btngrad":"1-4bb5a5-4bb5a5","hovergrad":"1-71c1b5-71c1b5","buttoncomb":"4|*|4bb5a5","txtcomb":"ffffff|*|ffffff|*|47||px|*|434754|*|0|*|","checkboxcolor":"989898","textfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"size\":\"25||px\",\"color\":\"a1a1a1\",\"afont\":\"Helvetica||1\",\"underline\":\"0\",\"textdecor\":\"300\"},\"Link\":{\"color\":\"1685d7\",\"underline\":\"0\"},\"Hover\":{\"color\":\"bae4d4\",\"underline\":\"0\"}}","smalltext":"18||px","errorcolor":"ffffff","errorgrad":"1-de5243-de5243","hintcolor":"5e5e5e","hintgrad":"1-FFFFFF-F5F5F5"},"flat_limegreen_dark":{"blackoutcomb":"40|*|\/modules\/mod_improved_ajax_login\/themes\/flat\/images\/samples\/ptrn1.png","popupcomb":"434754|*|3|*|4bb54d|*|7|*|1","titlefont":"{\"Text\":{\"lineheight\":\"30px\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"color\":\"ffffff\",\"size\":\"25||px\",\"align\":\"left\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btnfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"subset\":\"Latin\",\"size\":\"25||px\",\"color\":\"ffffff\",\"tshadow\":\"1||px|*|1||px|*|0|*|00000000|*|0|*|\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btngrad":"1-4bb54d-4bb54d","hovergrad":"1-6bbd6d-6bbd6d","buttoncomb":"4|*|4bb54d","txtcomb":"ffffff|*|ffffff|*|47||px|*|434754|*|0|*|","checkboxcolor":"989898","textfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"size\":\"25||px\",\"color\":\"a1a1a1\",\"afont\":\"Helvetica||1\",\"underline\":\"0\",\"textdecor\":\"300\"},\"Link\":{\"color\":\"1685d7\",\"underline\":\"0\"},\"Hover\":{\"color\":\"bae4d4\",\"underline\":\"0\"}}","smalltext":"18||px","errorcolor":"ffffff","errorgrad":"1-de5243-de5243","hintcolor":"5e5e5e","hintgrad":"1-FFFFFF-F5F5F5"},"flat_lightgreen_dark":{"blackoutcomb":"40|*|\/modules\/mod_improved_ajax_login\/themes\/flat\/images\/samples\/ptrn1.png","popupcomb":"494354|*|3|*|7fb54b|*|7|*|1","titlefont":"{\"Text\":{\"lineheight\":\"30px\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"color\":\"ffffff\",\"size\":\"25||px\",\"align\":\"left\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btnfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"subset\":\"Latin\",\"size\":\"25||px\",\"color\":\"ffffff\",\"tshadow\":\"1||px|*|1||px|*|0|*|00000000|*|0|*|\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btngrad":"1-7fb54b-7fb54b","hovergrad":"1-94bb6f-94bb6f","buttoncomb":"4|*|7fb54b","txtcomb":"ffffff|*|ffffff|*|47||px|*|494354|*|0|*|","checkboxcolor":"989898","textfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"size\":\"25||px\",\"color\":\"a1a1a1\",\"afont\":\"Helvetica||1\",\"underline\":\"0\",\"textdecor\":\"300\"},\"Link\":{\"color\":\"1685d7\",\"underline\":\"0\"},\"Hover\":{\"color\":\"d9e4ba\",\"underline\":\"0\"}}","smalltext":"18||px","errorcolor":"ffffff","errorgrad":"1-de5243-de5243","hintcolor":"5e5e5e","hintgrad":"1-FFFFFF-F5F5F5"},"flat_peru_dark":{"blackoutcomb":"40|*|\/modules\/mod_improved_ajax_login\/themes\/flat\/images\/samples\/ptrn1.png","popupcomb":"544643|*|3|*|b5844b|*|7|*|1","titlefont":"{\"Text\":{\"lineheight\":\"30px\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"color\":\"ffffff\",\"size\":\"25||px\",\"align\":\"left\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btnfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"subset\":\"Latin\",\"size\":\"25||px\",\"color\":\"ffffff\",\"tshadow\":\"1||px|*|1||px|*|0|*|00000000|*|0|*|\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btngrad":"1-b5844b-b5844b","hovergrad":"1-bd986d-bd986d","buttoncomb":"4|*|b5844b","txtcomb":"ffffff|*|ffffff|*|47||px|*|544643|*|0|*|","checkboxcolor":"989898","textfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"size\":\"25||px\",\"color\":\"a1a1a1\",\"afont\":\"Helvetica||1\",\"underline\":\"0\",\"textdecor\":\"300\"},\"Link\":{\"color\":\"1685d7\",\"underline\":\"0\"},\"Hover\":{\"color\":\"e4ceba\",\"underline\":\"0\"}}","smalltext":"18||px","errorcolor":"ffffff","errorgrad":"1-de5243-de5243","hintcolor":"5e5e5e","hintgrad":"1-FFFFFF-F5F5F5"},"flat_indianred_dark":{"blackoutcomb":"40|*|\/modules\/mod_improved_ajax_login\/themes\/flat\/images\/samples\/ptrn1.png","popupcomb":"4a4354|*|3|*|b54b4b|*|7|*|1","titlefont":"{\"Text\":{\"lineheight\":\"30px\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"color\":\"ffffff\",\"size\":\"25||px\",\"align\":\"left\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btnfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"subset\":\"Latin\",\"size\":\"25||px\",\"color\":\"ffffff\",\"tshadow\":\"1||px|*|1||px|*|0|*|00000000|*|0|*|\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btngrad":"1-b54b4b-b54b4b","hovergrad":"1-bb6767-bb6767","buttoncomb":"4|*|b54b4b","txtcomb":"ffffff|*|ffffff|*|47||px|*|4a4354|*|0|*|","checkboxcolor":"989898","textfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"size\":\"25||px\",\"color\":\"a1a1a1\",\"afont\":\"Helvetica||1\",\"underline\":\"0\",\"textdecor\":\"300\"},\"Link\":{\"color\":\"1685d7\",\"underline\":\"0\"},\"Hover\":{\"color\":\"e4baba\",\"underline\":\"0\"}}","smalltext":"18||px","errorcolor":"ffffff","errorgrad":"1-de5243-de5243","hintcolor":"5e5e5e","hintgrad":"1-FFFFFF-F5F5F5"},"flat_black_dark":{"blackoutcomb":"40|*|\/modules\/mod_improved_ajax_login\/themes\/flat\/images\/samples\/ptrn1.png","popupcomb":"434a54|*|3|*|1e1e1e|*|7|*|1","titlefont":"{\"Text\":{\"lineheight\":\"30px\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"color\":\"ffffff\",\"size\":\"25||px\",\"align\":\"left\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btnfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"subset\":\"Latin\",\"size\":\"25||px\",\"color\":\"ffffff\",\"tshadow\":\"1||px|*|1||px|*|0|*|00000000|*|0|*|\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btngrad":"1-1e1e1e-1e1e1e","hovergrad":"1-2e2e2e-2e2e2e","buttoncomb":"4|*|1e1e1e","txtcomb":"ffffff|*|ffffff|*|47||px|*|434a54|*|0|*|","checkboxcolor":"989898","textfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"size\":\"25||px\",\"color\":\"a1a1a1\",\"afont\":\"Helvetica||1\",\"underline\":\"0\",\"textdecor\":\"300\"},\"Link\":{\"color\":\"1685d7\",\"underline\":\"0\"},\"Hover\":{\"color\":\"d9d9d9\",\"underline\":\"0\"}}","smalltext":"18||px","errorcolor":"ffffff","errorgrad":"1-de5243-de5243","hintcolor":"5e5e5e","hintgrad":"1-FFFFFF-F5F5F5"}},
        control: "jform[params][moduleparametersTab][theme]",
        dependency: ''
      });
    

      new OfflajnList({
        name: "jformparamsmoduleparametersTabthemefontskin",
        elements: "<div class=\"content\"><div class=\"listelement\">Custom<\/div><div class=\"listelement\">Opensans<\/div><div class=\"listelement\">Yanonekaffeesatz<\/div><div class=\"listelement\">Annieuseyourtelescope<\/div><\/div>",
        options: [{"value":"custom","text":"Custom"},{"value":"flat_opensans","text":"Opensans"},{"value":"flat_yanonekaffeesatz","text":"Yanonekaffeesatz"},{"value":"flat_annieuseyourtelescope","text":"Annieuseyourtelescope"}],
        selectedIndex: 0,
        height: 0,
        fireshow: 0
      });
    

      window.fontskin = new OfflajnSkin({
        name: "fontskin",
        id: "jformparamsmoduleparametersTabthemefontskin",
        data: {"flat_opensans":{"titlefont":"{\"Text\":{\"lineheight\":\"30px\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Open Sans\",\"size\":\"22||px\",\"align\":\"left\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btnfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"family\":\"Open Sans\",\"subset\":\"Latin\",\"size\":\"20||px\",\"tshadow\":\"1||px|*|1||px|*|0|*|00000000|*|0|*|\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","textfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Open Sans\",\"size\":\"20||px\",\"afont\":\"Helvetica||1\",\"underline\":\"0\",\"textdecor\":\"300\"},\"Link\":{\"underline\":\"0\"},\"Hover\":{\"underline\":\"0\"}}","smalltext":"14||px"},"flat_yanonekaffeesatz":{"titlefont":"{\"Text\":{\"lineheight\":\"30px\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"size\":\"25||px\",\"align\":\"left\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","btnfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"subset\":\"Latin\",\"size\":\"25||px\",\"tshadow\":\"1||px|*|1||px|*|0|*|00000000|*|0|*|\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"300\"}}","textfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Yanone Kaffeesatz\",\"size\":\"25||px\",\"afont\":\"Helvetica||1\",\"underline\":\"0\",\"textdecor\":\"300\"},\"Link\":{\"underline\":\"0\"},\"Hover\":{\"underline\":\"0\"}}","smalltext":"18||px"},"flat_annieuseyourtelescope":{"titlefont":"{\"Text\":{\"lineheight\":\"30px\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Annie Use Your Telescope\",\"size\":\"21||px\",\"align\":\"left\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"400\"}}","btnfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"family\":\"Annie Use Your Telescope\",\"subset\":\"Latin\",\"size\":\"20||px\",\"tshadow\":\"1||px|*|1||px|*|0|*|00000000|*|0|*|\",\"afont\":\"Helvetica||1\",\"bold\":\"0\",\"textdecor\":\"400\"}}","textfont":"{\"Text\":{\"lineheight\":\"normal\",\"type\":\"Latin\",\"subset\":\"Latin\",\"family\":\"Annie Use Your Telescope\",\"size\":\"20||px\",\"afont\":\"Helvetica||1\",\"underline\":\"0\",\"textdecor\":\"400\"},\"Link\":{\"underline\":\"0\"},\"Hover\":{\"underline\":\"0\"}}","smalltext":"15||px"}},
        control: "jform[params][moduleparametersTab][theme]",
        dependency: ''
      });
    

      new OfflajnText({
        id: "jformparamsmoduleparametersTabthemeblackoutcomb0",
        validation: "int",
        attachunit: "%",
        mode: "",
        scale: "",
        minus: 0,
        onoff: ""
      }); 
    

        new OfflajnImagemanager({
          id: "jformparamsmoduleparametersTabthemeblackoutcomb1",
          folder: "/modules/mod_improved_ajax_login/themes/flat/images/samples/",
          root: "/fashion",
          uploadurl: "index.php?option=offlajnupload",
          imgs: ["ptrn1.png","ptrn2.png","ptrn3.png","ptrn4.png","ptrn5.png","ptrn6.png"],
          active: "http://localhost/fashion/http://localhost:8888/fashionphotosub//modules/mod_improved_ajax_login/themes/flat/images/samples/ptrn1.png",
          identifier: "28f73c7075ea9526d45d05de0a926096",
          description: "",
          siteurl: "http://localhost:8888/fashion/"
        });
    

      new OfflajnCombine({
        id: "jformparamsmoduleparametersTabthemeblackoutcomb",
        num: 2,
        switcherid: "",
        hideafter: "0",
        islist: "0"
      }); 
    

    var el = dojo.byId("jformparamsmoduleparametersTabthemepopupcomb0");
    jQuery.fn.jPicker.defaults.images.clientPath="/fashion/modules/mod_improved_ajax_login/params/offlajndashboard/../offlajncolor/offlajncolor/jpicker/images/";
    el.alphaSupport=false; 
    el.c = jQuery("#jformparamsmoduleparametersTabthemepopupcomb0").jPicker({
        window:{
          expandable: true,
          alphaSupport: false}
        });
    dojo.connect(el, "change", function(){
      this.c[0].color.active.val("hex", this.value);
    });
    

    var el = dojo.byId("jformparamsmoduleparametersTabthemepopupcomb2");
    jQuery.fn.jPicker.defaults.images.clientPath="/fashion/modules/mod_improved_ajax_login/params/offlajndashboard/../offlajncolor/offlajncolor/jpicker/images/";
    el.alphaSupport=false; 
    el.c = jQuery("#jformparamsmoduleparametersTabthemepopupcomb2").jPicker({
        window:{
          expandable: true,
          alphaSupport: false}
        });
    dojo.connect(el, "change", function(){
      this.c[0].color.active.val("hex", this.value);
    });
    

      new OfflajnList({
        name: "jformparamsmoduleparametersTabthemepopupcomb4",
        elements: "<div class=\"content\"><div class=\"listelement\">Random<\/div><div class=\"listelement\">Fade in and scale up<\/div><div class=\"listelement\">Slide from the right<\/div><div class=\"listelement\">Newspaper<\/div><div class=\"listelement\">Fall<\/div><div class=\"listelement\">Side fall<\/div><div class=\"listelement\">3D flip horizontal<\/div><div class=\"listelement\">3D flip vertical<\/div><div class=\"listelement\">Super scaled<\/div><div class=\"listelement\">3D slit<\/div><div class=\"listelement\">3D Rotate in from bottom<\/div><div class=\"listelement\">3D Rotate in from left<\/div><div class=\"listelement\">Super slide in from bottom (experimental)<\/div><div class=\"listelement\">Super slide in from right (experimental)<\/div><div class=\"listelement\">Blur (experimental)<\/div><div class=\"listelement\">Greyscale (experimental)<\/div><\/div>",
        options: [{"value":"0","text":"Random"},{"value":"1","text":"Fade in and scale up"},{"value":"2","text":"Slide from the right"},{"value":"4","text":"Newspaper"},{"value":"5","text":"Fall"},{"value":"6","text":"Side fall"},{"value":"8","text":"3D flip horizontal"},{"value":"9","text":"3D flip vertical"},{"value":"11","text":"Super scaled"},{"value":"13","text":"3D slit"},{"value":"14","text":"3D Rotate in from bottom"},{"value":"15","text":"3D Rotate in from left"},{"value":"17","text":"Super slide in from bottom (experimental)"},{"value":"18","text":"Super slide in from right (experimental)"},{"value":"19","text":"Blur (experimental)"},{"value":"20","text":"Greyscale (experimental)"}],
        selectedIndex: 1,
        height: 10,
        fireshow: 0
      });
    

      new OfflajnCombine({
        id: "jformparamsmoduleparametersTabthemepopupcomb",
        num: 5,
        switcherid: "",
        hideafter: "4",
        islist: "0"
      }); 
    

        new FontConfigurator({
          id: "jformparamsmoduleparametersTabthemetitlefont",
          defaultTab: "Text",
          origsettings: {"Text":{"lineheight":"30px","type":"Latin","subset":"Latin","family":"Open Sans","color":"ffffff","size":"22||px","align":"left","afont":"Helvetica||1","bold":"0","textdecor":"300"}},
          elements: {"tab":{"name":"jform[params][moduleparametersTab][theme][titlefont]tab","id":"jformparamsmoduleparametersTabthemetitlefonttab","html":"<div class=\"offlajnradiocontainerbutton\" id=\"offlajnradiocontainerjformparamsmoduleparametersTabthemetitlefonttab\"><div class=\"radioelement first last selected\">Text<\/div><div class=\"clear\"><\/div><\/div><input type=\"hidden\" id=\"jformparamsmoduleparametersTabthemetitlefonttab\" name=\"jform[params][moduleparametersTab][theme][titlefont]tab\" value=\"Text\"\/>"},"type":{"name":"jform[params][moduleparametersTab][theme][titlefont]type","id":"jformparamsmoduleparametersTabthemetitlefonttype","Cyrillic":{"name":"jform[params][moduleparametersTab][theme][titlefont]family","id":"jformparamsmoduleparametersTabthemetitlefontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemetitlefontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Open Sans<br \/>Andika<br \/>Anonymous Pro<br \/>Cuprum<br \/>Didact Gothic<br \/>EB Garamond<br \/>Istok Web<br \/>Jura<br \/>Forum<br \/>Kelly Slab<br \/>Lobster<br \/>Neucha<br \/>Open Sans<br \/>Open Sans Condensed<br \/>Philosopher<br \/>Play<br \/>PT Sans<br \/>PT Sans Caption<br \/>PT Sans Narrow<br \/>PT Serif<br \/>PT Serif Caption<br \/>Ruslan Display<br \/>Tenor Sans<br \/>Ubuntu<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][titlefont]family\" id=\"jformparamsmoduleparametersTabthemetitlefontfamily\" value=\"Open Sans\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemetitlefontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">Andika<\\\/div><div class=\\\"listelement\\\">Anonymous Pro<\\\/div><div class=\\\"listelement\\\">Cuprum<\\\/div><div class=\\\"listelement\\\">Didact Gothic<\\\/div><div class=\\\"listelement\\\">EB Garamond<\\\/div><div class=\\\"listelement\\\">Istok Web<\\\/div><div class=\\\"listelement\\\">Jura<\\\/div><div class=\\\"listelement\\\">Forum<\\\/div><div class=\\\"listelement\\\">Kelly Slab<\\\/div><div class=\\\"listelement\\\">Lobster<\\\/div><div class=\\\"listelement\\\">Neucha<\\\/div><div class=\\\"listelement\\\">Open Sans<\\\/div><div class=\\\"listelement\\\">Open Sans Condensed<\\\/div><div class=\\\"listelement\\\">Philosopher<\\\/div><div class=\\\"listelement\\\">Play<\\\/div><div class=\\\"listelement\\\">PT Sans<\\\/div><div class=\\\"listelement\\\">PT Sans Caption<\\\/div><div class=\\\"listelement\\\">PT Sans Narrow<\\\/div><div class=\\\"listelement\\\">PT Serif<\\\/div><div class=\\\"listelement\\\">PT Serif Caption<\\\/div><div class=\\\"listelement\\\">Ruslan Display<\\\/div><div class=\\\"listelement\\\">Tenor Sans<\\\/div><div class=\\\"listelement\\\">Ubuntu<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"Andika\",\"text\":\"Andika\"},{\"value\":\"Anonymous Pro\",\"text\":\"Anonymous Pro\"},{\"value\":\"Cuprum\",\"text\":\"Cuprum\"},{\"value\":\"Didact Gothic\",\"text\":\"Didact Gothic\"},{\"value\":\"EB Garamond\",\"text\":\"EB Garamond\"},{\"value\":\"Istok Web\",\"text\":\"Istok Web\"},{\"value\":\"Jura\",\"text\":\"Jura\"},{\"value\":\"Forum\",\"text\":\"Forum\"},{\"value\":\"Kelly Slab\",\"text\":\"Kelly Slab\"},{\"value\":\"Lobster\",\"text\":\"Lobster\"},{\"value\":\"Neucha\",\"text\":\"Neucha\"},{\"value\":\"Open Sans\",\"text\":\"Open Sans\"},{\"value\":\"Open Sans Condensed\",\"text\":\"Open Sans Condensed\"},{\"value\":\"Philosopher\",\"text\":\"Philosopher\"},{\"value\":\"Play\",\"text\":\"Play\"},{\"value\":\"PT Sans\",\"text\":\"PT Sans\"},{\"value\":\"PT Sans Caption\",\"text\":\"PT Sans Caption\"},{\"value\":\"PT Sans Narrow\",\"text\":\"PT Sans Narrow\"},{\"value\":\"PT Serif\",\"text\":\"PT Serif\"},{\"value\":\"PT Serif Caption\",\"text\":\"PT Serif Caption\"},{\"value\":\"Ruslan Display\",\"text\":\"Ruslan Display\"},{\"value\":\"Tenor Sans\",\"text\":\"Tenor Sans\"},{\"value\":\"Ubuntu\",\"text\":\"Ubuntu\"}],\r\n        selectedIndex: 11,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"CyrillicExtended":{"name":"jform[params][moduleparametersTab][theme][titlefont]family","id":"jformparamsmoduleparametersTabthemetitlefontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemetitlefontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Open Sans<br \/>Andika<br \/>Anonymous Pro<br \/>Didact Gothic<br \/>EB Garamond<br \/>Istok Web<br \/>Jura<br \/>Forum<br \/>Lobster<br \/>Open Sans<br \/>Open Sans Condensed<br \/>Play<br \/>Ruslan Display<br \/>Tenor Sans<br \/>Ubuntu<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][titlefont]family\" id=\"jformparamsmoduleparametersTabthemetitlefontfamily\" value=\"Open Sans\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemetitlefontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">Andika<\\\/div><div class=\\\"listelement\\\">Anonymous Pro<\\\/div><div class=\\\"listelement\\\">Didact Gothic<\\\/div><div class=\\\"listelement\\\">EB Garamond<\\\/div><div class=\\\"listelement\\\">Istok Web<\\\/div><div class=\\\"listelement\\\">Jura<\\\/div><div class=\\\"listelement\\\">Forum<\\\/div><div class=\\\"listelement\\\">Lobster<\\\/div><div class=\\\"listelement\\\">Open Sans<\\\/div><div class=\\\"listelement\\\">Open Sans Condensed<\\\/div><div class=\\\"listelement\\\">Play<\\\/div><div class=\\\"listelement\\\">Ruslan Display<\\\/div><div class=\\\"listelement\\\">Tenor Sans<\\\/div><div class=\\\"listelement\\\">Ubuntu<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"Andika\",\"text\":\"Andika\"},{\"value\":\"Anonymous Pro\",\"text\":\"Anonymous Pro\"},{\"value\":\"Didact Gothic\",\"text\":\"Didact Gothic\"},{\"value\":\"EB Garamond\",\"text\":\"EB Garamond\"},{\"value\":\"Istok Web\",\"text\":\"Istok Web\"},{\"value\":\"Jura\",\"text\":\"Jura\"},{\"value\":\"Forum\",\"text\":\"Forum\"},{\"value\":\"Lobster\",\"text\":\"Lobster\"},{\"value\":\"Open Sans\",\"text\":\"Open Sans\"},{\"value\":\"Open Sans Condensed\",\"text\":\"Open Sans Condensed\"},{\"value\":\"Play\",\"text\":\"Play\"},{\"value\":\"Ruslan Display\",\"text\":\"Ruslan Display\"},{\"value\":\"Tenor Sans\",\"text\":\"Tenor Sans\"},{\"value\":\"Ubuntu\",\"text\":\"Ubuntu\"}],\r\n        selectedIndex: 8,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"Greek":{"name":"jform[params][moduleparametersTab][theme][titlefont]family","id":"jformparamsmoduleparametersTabthemetitlefontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemetitlefontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Open Sans<br \/>Anonymous Pro<br \/>Caudex<br \/>Didact Gothic<br \/>Jura<br \/>GFS Didot<br \/>GFS Neohellenic<br \/>Nova Mono<br \/>Open Sans<br \/>Open Sans Condensed<br \/>Play<br \/>Ubuntu<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][titlefont]family\" id=\"jformparamsmoduleparametersTabthemetitlefontfamily\" value=\"Open Sans\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemetitlefontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">Anonymous Pro<\\\/div><div class=\\\"listelement\\\">Caudex<\\\/div><div class=\\\"listelement\\\">Didact Gothic<\\\/div><div class=\\\"listelement\\\">Jura<\\\/div><div class=\\\"listelement\\\">GFS Didot<\\\/div><div class=\\\"listelement\\\">GFS Neohellenic<\\\/div><div class=\\\"listelement\\\">Nova Mono<\\\/div><div class=\\\"listelement\\\">Open Sans<\\\/div><div class=\\\"listelement\\\">Open Sans Condensed<\\\/div><div class=\\\"listelement\\\">Play<\\\/div><div class=\\\"listelement\\\">Ubuntu<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"Anonymous Pro\",\"text\":\"Anonymous Pro\"},{\"value\":\"Caudex\",\"text\":\"Caudex\"},{\"value\":\"Didact Gothic\",\"text\":\"Didact Gothic\"},{\"value\":\"Jura\",\"text\":\"Jura\"},{\"value\":\"GFS Didot\",\"text\":\"GFS Didot\"},{\"value\":\"GFS Neohellenic\",\"text\":\"GFS Neohellenic\"},{\"value\":\"Nova Mono\",\"text\":\"Nova Mono\"},{\"value\":\"Open Sans\",\"text\":\"Open Sans\"},{\"value\":\"Open Sans Condensed\",\"text\":\"Open Sans Condensed\"},{\"value\":\"Play\",\"text\":\"Play\"},{\"value\":\"Ubuntu\",\"text\":\"Ubuntu\"}],\r\n        selectedIndex: 7,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"GreekExtended":{"name":"jform[params][moduleparametersTab][theme][titlefont]family","id":"jformparamsmoduleparametersTabthemetitlefontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemetitlefontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Open Sans<br \/>Anonymous Pro<br \/>Caudex<br \/>Didact Gothic<br \/>Jura<br \/>Open Sans<br \/>Open Sans Condensed<br \/>Play<br \/>Ubuntu<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][titlefont]family\" id=\"jformparamsmoduleparametersTabthemetitlefontfamily\" value=\"Open Sans\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemetitlefontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">Anonymous Pro<\\\/div><div class=\\\"listelement\\\">Caudex<\\\/div><div class=\\\"listelement\\\">Didact Gothic<\\\/div><div class=\\\"listelement\\\">Jura<\\\/div><div class=\\\"listelement\\\">Open Sans<\\\/div><div class=\\\"listelement\\\">Open Sans Condensed<\\\/div><div class=\\\"listelement\\\">Play<\\\/div><div class=\\\"listelement\\\">Ubuntu<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"Anonymous Pro\",\"text\":\"Anonymous Pro\"},{\"value\":\"Caudex\",\"text\":\"Caudex\"},{\"value\":\"Didact Gothic\",\"text\":\"Didact Gothic\"},{\"value\":\"Jura\",\"text\":\"Jura\"},{\"value\":\"Open Sans\",\"text\":\"Open Sans\"},{\"value\":\"Open Sans Condensed\",\"text\":\"Open Sans Condensed\"},{\"value\":\"Play\",\"text\":\"Play\"},{\"value\":\"Ubuntu\",\"text\":\"Ubuntu\"}],\r\n        selectedIndex: 4,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"Khmer":{"name":"jform[params][moduleparametersTab][theme][titlefont]family","id":"jformparamsmoduleparametersTabthemetitlefontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemetitlefontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Angkor<br \/>Angkor<br \/>Battambang<br \/>Bayon<br \/>Bokor<br \/>Chenla<br \/>Content<br \/>Dangrek<br \/>Freehand<br \/>Hanuman<br \/>Khmer<br \/>Koulen<br \/>Metal<br \/>Moul<br \/>Moulpali<br \/>Odor Mean Chey<br \/>Preahvihear<br \/>Siemreap<br \/>Suwannaphum<br \/>Taprom<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][titlefont]family\" id=\"jformparamsmoduleparametersTabthemetitlefontfamily\" value=\"Angkor\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemetitlefontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">Angkor<\\\/div><div class=\\\"listelement\\\">Battambang<\\\/div><div class=\\\"listelement\\\">Bayon<\\\/div><div class=\\\"listelement\\\">Bokor<\\\/div><div class=\\\"listelement\\\">Chenla<\\\/div><div class=\\\"listelement\\\">Content<\\\/div><div class=\\\"listelement\\\">Dangrek<\\\/div><div class=\\\"listelement\\\">Freehand<\\\/div><div class=\\\"listelement\\\">Hanuman<\\\/div><div class=\\\"listelement\\\">Khmer<\\\/div><div class=\\\"listelement\\\">Koulen<\\\/div><div class=\\\"listelement\\\">Metal<\\\/div><div class=\\\"listelement\\\">Moul<\\\/div><div class=\\\"listelement\\\">Moulpali<\\\/div><div class=\\\"listelement\\\">Odor Mean Chey<\\\/div><div class=\\\"listelement\\\">Preahvihear<\\\/div><div class=\\\"listelement\\\">Siemreap<\\\/div><div class=\\\"listelement\\\">Suwannaphum<\\\/div><div class=\\\"listelement\\\">Taprom<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"Angkor\",\"text\":\"Angkor\"},{\"value\":\"Battambang\",\"text\":\"Battambang\"},{\"value\":\"Bayon\",\"text\":\"Bayon\"},{\"value\":\"Bokor\",\"text\":\"Bokor\"},{\"value\":\"Chenla\",\"text\":\"Chenla\"},{\"value\":\"Content\",\"text\":\"Content\"},{\"value\":\"Dangrek\",\"text\":\"Dangrek\"},{\"value\":\"Freehand\",\"text\":\"Freehand\"},{\"value\":\"Hanuman\",\"text\":\"Hanuman\"},{\"value\":\"Khmer\",\"text\":\"Khmer\"},{\"value\":\"Koulen\",\"text\":\"Koulen\"},{\"value\":\"Metal\",\"text\":\"Metal\"},{\"value\":\"Moul\",\"text\":\"Moul\"},{\"value\":\"Moulpali\",\"text\":\"Moulpali\"},{\"value\":\"Odor Mean Chey\",\"text\":\"Odor Mean Chey\"},{\"value\":\"Preahvihear\",\"text\":\"Preahvihear\"},{\"value\":\"Siemreap\",\"text\":\"Siemreap\"},{\"value\":\"Suwannaphum\",\"text\":\"Suwannaphum\"},{\"value\":\"Taprom\",\"text\":\"Taprom\"}],\r\n        selectedIndex: 0,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"Latin":{"name":"jform[params][moduleparametersTab][theme][titlefont]family","id":"jformparamsmoduleparametersTabthemetitlefontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemetitlefontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Open Sans<br \/>ABeeZee<br \/>Abel<br \/>Abril Fatface<br \/>Aclonica<br \/>Acme<br \/>Actor<br \/>Adamina<br \/>Advent Pro<br \/>Aguafina Script<br \/>Akronim<br \/>Aladin<br \/>Aldrich<br \/>Alegreya<br \/>Alegreya SC<br \/>Alex Brush<br \/>Alfa Slab One<br \/>Alice<br \/>Alike<br \/>Alike Angular<br \/>Allan<br \/>Allerta<br \/>Allerta Stencil<br \/>Allura<br \/>Almendra<br \/>Almendra Display<br \/>Almendra SC<br \/>Amarante<br \/>Amaranth<br \/>Amatic SC<br \/>Amethysta<br \/>Anaheim<br \/>Andada<br \/>Andika<br \/>Angkor<br \/>Annie Use Your Telescope<br \/>Anonymous Pro<br \/>Antic<br \/>Antic Didone<br \/>Antic Slab<br \/>Anton<br \/>Arapey<br \/>Arbutus<br \/>Arbutus Slab<br \/>Architects Daughter<br \/>Archivo Black<br \/>Archivo Narrow<br \/>Arimo<br \/>Arizonia<br \/>Armata<br \/>Artifika<br \/>Arvo<br \/>Asap<br \/>Asset<br \/>Astloch<br \/>Asul<br \/>Atomic Age<br \/>Aubrey<br \/>Audiowide<br \/>Autour One<br \/>Average<br \/>Average Sans<br \/>Averia Gruesa Libre<br \/>Averia Libre<br \/>Averia Sans Libre<br \/>Averia Serif Libre<br \/>Bad Script<br \/>Balthazar<br \/>Bangers<br \/>Basic<br \/>Battambang<br \/>Baumans<br \/>Bayon<br \/>Belgrano<br \/>Belleza<br \/>BenchNine<br \/>Bentham<br \/>Berkshire Swash<br \/>Bevan<br \/>Bigelow Rules<br \/>Bigshot One<br \/>Bilbo<br \/>Bilbo Swash Caps<br \/>Bitter<br \/>Black Ops One<br \/>Bokor<br \/>Bonbon<br \/>Boogaloo<br \/>Bowlby One<br \/>Bowlby One SC<br \/>Brawler<br \/>Bree Serif<br \/>Bubblegum Sans<br \/>Bubbler One<br \/>Buda<br \/>Buenard<br \/>Butcherman<br \/>Butterfly Kids<br \/>Cabin<br \/>Cabin Condensed<br \/>Cabin Sketch<br \/>Caesar Dressing<br \/>Cagliostro<br \/>Calligraffitti<br \/>Cambo<br \/>Candal<br \/>Cantarell<br \/>Cantata One<br \/>Cantora One<br \/>Capriola<br \/>Cardo<br \/>Carme<br \/>Carrois Gothic<br \/>Carrois Gothic SC<br \/>Carter One<br \/>Caudex<br \/>Cedarville Cursive<br \/>Ceviche One<br \/>Changa One<br \/>Chango<br \/>Chau Philomene One<br \/>Chela One<br \/>Chelsea Market<br \/>Chenla<br \/>Cherry Cream Soda<br \/>Cherry Swash<br \/>Chewy<br \/>Chicle<br \/>Chivo<br \/>Cinzel<br \/>Cinzel Decorative<br \/>Clicker Script<br \/>Coda<br \/>Coda Caption<br \/>Codystar<br \/>Combo<br \/>Comfortaa<br \/>Coming Soon<br \/>Concert One<br \/>Condiment<br \/>Content<br \/>Contrail One<br \/>Convergence<br \/>Cookie<br \/>Copse<br \/>Corben<br \/>Courgette<br \/>Cousine<br \/>Coustard<br \/>Covered By Your Grace<br \/>Crafty Girls<br \/>Creepster<br \/>Crete Round<br \/>Crimson Text<br \/>Croissant One<br \/>Crushed<br \/>Cuprum<br \/>Cutive<br \/>Cutive Mono<br \/>Damion<br \/>Dancing Script<br \/>Dangrek<br \/>Dawning of a New Day<br \/>Days One<br \/>Delius<br \/>Delius Swash Caps<br \/>Delius Unicase<br \/>Della Respira<br \/>Devonshire<br \/>Didact Gothic<br \/>Diplomata<br \/>Diplomata SC<br \/>Doppio One<br \/>Dorsa<br \/>Dosis<br \/>Dr Sugiyama<br \/>Droid Sans<br \/>Droid Sans Mono<br \/>Droid Serif<br \/>Duru Sans<br \/>Dynalight<br \/>EB Garamond<br \/>Eagle Lake<br \/>Eater<br \/>Economica<br \/>Electrolize<br \/>Emblema One<br \/>Emilys Candy<br \/>Engagement<br \/>Englebert<br \/>Enriqueta<br \/>Erica One<br \/>Esteban<br \/>Euphoria Script<br \/>Ewert<br \/>Exo<br \/>Expletus Sans<br \/>Fanwood Text<br \/>Fascinate<br \/>Fascinate Inline<br \/>Faster One<br \/>Fasthand<br \/>Federant<br \/>Federo<br \/>Felipa<br \/>Fenix<br \/>Finger Paint<br \/>Fjord One<br \/>Flamenco<br \/>Flavors<br \/>Fondamento<br \/>Fontdiner Swanky<br \/>Forum<br \/>Francois One<br \/>Freckle Face<br \/>Fredericka the Great<br \/>Fredoka One<br \/>Freehand<br \/>Fresca<br \/>Frijole<br \/>Fugaz One<br \/>GFS Didot<br \/>GFS Neohellenic<br \/>Gafata<br \/>Galdeano<br \/>Galindo<br \/>Gentium Basic<br \/>Gentium Book Basic<br \/>Geo<br \/>Geostar<br \/>Geostar Fill<br \/>Germania One<br \/>Gilda Display<br \/>Give You Glory<br \/>Glass Antiqua<br \/>Glegoo<br \/>Gloria Hallelujah<br \/>Goblin One<br \/>Gochi Hand<br \/>Gorditas<br \/>Goudy Bookletter 1911<br \/>Graduate<br \/>Gravitas One<br \/>Great Vibes<br \/>Griffy<br \/>Gruppo<br \/>Gudea<br \/>Habibi<br \/>Hammersmith One<br \/>Hanalei<br \/>Hanalei Fill<br \/>Handlee<br \/>Hanuman<br \/>Happy Monkey<br \/>Headland One<br \/>Henny Penny<br \/>Herr Von Muellerhoff<br \/>Holtwood One SC<br \/>Homemade Apple<br \/>Homenaje<br \/>IM Fell DW Pica<br \/>IM Fell DW Pica SC<br \/>IM Fell Double Pica<br \/>IM Fell Double Pica SC<br \/>IM Fell English<br \/>IM Fell English SC<br \/>IM Fell French Canon<br \/>IM Fell French Canon SC<br \/>IM Fell Great Primer<br \/>IM Fell Great Primer SC<br \/>Iceberg<br \/>Iceland<br \/>Imprima<br \/>Inconsolata<br \/>Inder<br \/>Indie Flower<br \/>Inika<br \/>Irish Grover<br \/>Istok Web<br \/>Italiana<br \/>Italianno<br \/>Jacques Francois<br \/>Jacques Francois Shadow<br \/>Jim Nightshade<br \/>Jockey One<br \/>Jolly Lodger<br \/>Josefin Sans<br \/>Josefin Slab<br \/>Joti One<br \/>Judson<br \/>Julee<br \/>Julius Sans One<br \/>Junge<br \/>Jura<br \/>Just Another Hand<br \/>Just Me Again Down Here<br \/>Kameron<br \/>Karla<br \/>Kaushan Script<br \/>Keania One<br \/>Kelly Slab<br \/>Kenia<br \/>Khmer<br \/>Kite One<br \/>Knewave<br \/>Kotta One<br \/>Koulen<br \/>Kranky<br \/>Kreon<br \/>Kristi<br \/>Krona One<br \/>La Belle Aurore<br \/>Lancelot<br \/>Lato<br \/>League Script<br \/>Leckerli One<br \/>Ledger<br \/>Lekton<br \/>Lemon<br \/>Life Savers<br \/>Lilita One<br \/>Limelight<br \/>Linden Hill<br \/>Lobster<br \/>Lobster Two<br \/>Londrina Outline<br \/>Londrina Shadow<br \/>Londrina Sketch<br \/>Londrina Solid<br \/>Lora<br \/>Love Ya Like A Sister<br \/>Loved by the King<br \/>Lovers Quarrel<br \/>Luckiest Guy<br \/>Lusitana<br \/>Lustria<br \/>Macondo<br \/>Macondo Swash Caps<br \/>Magra<br \/>Maiden Orange<br \/>Mako<br \/>Marcellus<br \/>Marcellus SC<br \/>Marck Script<br \/>Margarine<br \/>Marko One<br \/>Marmelad<br \/>Marvel<br \/>Mate<br \/>Mate SC<br \/>Maven Pro<br \/>McLaren<br \/>Meddon<br \/>MedievalSharp<br \/>Medula One<br \/>Megrim<br \/>Meie Script<br \/>Merienda<br \/>Merienda One<br \/>Merriweather<br \/>Metal<br \/>Metal Mania<br \/>Metamorphous<br \/>Metrophobic<br \/>Michroma<br \/>Miltonian<br \/>Miltonian Tattoo<br \/>Miniver<br \/>Miss Fajardose<br \/>Modern Antiqua<br \/>Molengo<br \/>Molle<br \/>Monofett<br \/>Monoton<br \/>Monsieur La Doulaise<br \/>Montaga<br \/>Montez<br \/>Montserrat<br \/>Montserrat Alternates<br \/>Montserrat Subrayada<br \/>Moul<br \/>Moulpali<br \/>Mountains of Christmas<br \/>Mouse Memoirs<br \/>Mr Bedfort<br \/>Mr Dafoe<br \/>Mr De Haviland<br \/>Mrs Saint Delafield<br \/>Mrs Sheppards<br \/>Muli<br \/>Mystery Quest<br \/>Neucha<br \/>Neuton<br \/>News Cycle<br \/>Niconne<br \/>Nixie One<br \/>Nobile<br \/>Nokora<br \/>Norican<br \/>Nosifer<br \/>Nothing You Could Do<br \/>Noticia Text<br \/>Nova Cut<br \/>Nova Flat<br \/>Nova Mono<br \/>Nova Oval<br \/>Nova Round<br \/>Nova Script<br \/>Nova Slim<br \/>Nova Square<br \/>Numans<br \/>Nunito<br \/>Odor Mean Chey<br \/>Offside<br \/>Old Standard TT<br \/>Oldenburg<br \/>Oleo Script<br \/>Oleo Script Swash Caps<br \/>Open Sans<br \/>Open Sans Condensed<br \/>Oranienbaum<br \/>Orbitron<br \/>Oregano<br \/>Orienta<br \/>Original Surfer<br \/>Oswald<br \/>Over the Rainbow<br \/>Overlock<br \/>Overlock SC<br \/>Ovo<br \/>Oxygen<br \/>Oxygen Mono<br \/>PT Mono<br \/>PT Sans<br \/>PT Sans Caption<br \/>PT Sans Narrow<br \/>PT Serif<br \/>PT Serif Caption<br \/>Pacifico<br \/>Paprika<br \/>Parisienne<br \/>Passero One<br \/>Passion One<br \/>Patrick Hand<br \/>Patua One<br \/>Paytone One<br \/>Peralta<br \/>Permanent Marker<br \/>Petit Formal Script<br \/>Petrona<br \/>Philosopher<br \/>Piedra<br \/>Pinyon Script<br \/>Pirata One<br \/>Plaster<br \/>Play<br \/>Playball<br \/>Playfair Display<br \/>Playfair Display SC<br \/>Podkova<br \/>Poiret One<br \/>Poller One<br \/>Poly<br \/>Pompiere<br \/>Pontano Sans<br \/>Port Lligat Sans<br \/>Port Lligat Slab<br \/>Prata<br \/>Preahvihear<br \/>Press Start 2P<br \/>Princess Sofia<br \/>Prociono<br \/>Prosto One<br \/>Puritan<br \/>Purple Purse<br \/>Quando<br \/>Quantico<br \/>Quattrocento<br \/>Quattrocento Sans<br \/>Questrial<br \/>Quicksand<br \/>Quintessential<br \/>Qwigley<br \/>Racing Sans One<br \/>Radley<br \/>Raleway<br \/>Raleway Dots<br \/>Rambla<br \/>Rammetto One<br \/>Ranchers<br \/>Rancho<br \/>Rationale<br \/>Redressed<br \/>Reenie Beanie<br \/>Revalia<br \/>Ribeye<br \/>Ribeye Marrow<br \/>Righteous<br \/>Risque<br \/>Rochester<br \/>Rock Salt<br \/>Rokkitt<br \/>Romanesco<br \/>Ropa Sans<br \/>Rosario<br \/>Rosarivo<br \/>Rouge Script<br \/>Ruda<br \/>Rufina<br \/>Ruge Boogie<br \/>Ruluko<br \/>Rum Raisin<br \/>Ruslan Display<br \/>Russo One<br \/>Ruthie<br \/>Rye<br \/>Sacramento<br \/>Sail<br \/>Salsa<br \/>Sanchez<br \/>Sancreek<br \/>Sansita One<br \/>Sarina<br \/>Satisfy<br \/>Scada<br \/>Schoolbell<br \/>Seaweed Script<br \/>Sevillana<br \/>Seymour One<br \/>Shadows Into Light<br \/>Shadows Into Light Two<br \/>Shanti<br \/>Share<br \/>Share Tech<br \/>Share Tech Mono<br \/>Shojumaru<br \/>Short Stack<br \/>Siemreap<br \/>Sigmar One<br \/>Signika<br \/>Signika Negative<br \/>Simonetta<br \/>Sirin Stencil<br \/>Six Caps<br \/>Skranji<br \/>Slackey<br \/>Smokum<br \/>Smythe<br \/>Sniglet<br \/>Snippet<br \/>Snowburst One<br \/>Sofadi One<br \/>Sofia<br \/>Sonsie One<br \/>Sorts Mill Goudy<br \/>Source Code Pro<br \/>Source Sans Pro<br \/>Special Elite<br \/>Spicy Rice<br \/>Spinnaker<br \/>Spirax<br \/>Squada One<br \/>Stalemate<br \/>Stalinist One<br \/>Stardos Stencil<br \/>Stint Ultra Condensed<br \/>Stint Ultra Expanded<br \/>Stoke<br \/>Strait<br \/>Sue Ellen Francisco<br \/>Sunshiney<br \/>Supermercado One<br \/>Suwannaphum<br \/>Swanky and Moo Moo<br \/>Syncopate<br \/>Tangerine<br \/>Taprom<br \/>Telex<br \/>Tenor Sans<br \/>Text Me One<br \/>The Girl Next Door<br \/>Tienne<br \/>Tinos<br \/>Titan One<br \/>Titillium Web<br \/>Trade Winds<br \/>Trocchi<br \/>Trochut<br \/>Trykker<br \/>Tulpen One<br \/>Ubuntu<br \/>Ubuntu Condensed<br \/>Ubuntu Mono<br \/>Ultra<br \/>Uncial Antiqua<br \/>Underdog<br \/>Unica One<br \/>UnifrakturCook<br \/>UnifrakturMaguntia<br \/>Unkempt<br \/>Unlock<br \/>Unna<br \/>VT323<br \/>Vampiro One<br \/>Varela<br \/>Varela Round<br \/>Vast Shadow<br \/>Vibur<br \/>Vidaloka<br \/>Viga<br \/>Voces<br \/>Volkhov<br \/>Vollkorn<br \/>Voltaire<br \/>Waiting for the Sunrise<br \/>Wallpoet<br \/>Walter Turncoat<br \/>Warnes<br \/>Wellfleet<br \/>Wire One<br \/>Yanone Kaffeesatz<br \/>Yellowtail<br \/>Yeseva One<br \/>Yesteryear<br \/>Zeyada<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][titlefont]family\" id=\"jformparamsmoduleparametersTabthemetitlefontfamily\" value=\"Open Sans\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemetitlefontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">ABeeZee<\\\/div><div class=\\\"listelement\\\">Abel<\\\/div><div class=\\\"listelement\\\">Abril Fatface<\\\/div><div class=\\\"listelement\\\">Aclonica<\\\/div><div class=\\\"listelement\\\">Acme<\\\/div><div class=\\\"listelement\\\">Actor<\\\/div><div class=\\\"listelement\\\">Adamina<\\\/div><div class=\\\"listelement\\\">Advent Pro<\\\/div><div class=\\\"listelement\\\">Aguafina Script<\\\/div><div class=\\\"listelement\\\">Akronim<\\\/div><div class=\\\"listelement\\\">Aladin<\\\/div><div class=\\\"listelement\\\">Aldrich<\\\/div><div class=\\\"listelement\\\">Alegreya<\\\/div><div class=\\\"listelement\\\">Alegreya SC<\\\/div><div class=\\\"listelement\\\">Alex Brush<\\\/div><div class=\\\"listelement\\\">Alfa Slab One<\\\/div><div class=\\\"listelement\\\">Alice<\\\/div><div class=\\\"listelement\\\">Alike<\\\/div><div class=\\\"listelement\\\">Alike Angular<\\\/div><div class=\\\"listelement\\\">Allan<\\\/div><div class=\\\"listelement\\\">Allerta<\\\/div><div class=\\\"listelement\\\">Allerta Stencil<\\\/div><div class=\\\"listelement\\\">Allura<\\\/div><div class=\\\"listelement\\\">Almendra<\\\/div><div class=\\\"listelement\\\">Almendra Display<\\\/div><div class=\\\"listelement\\\">Almendra SC<\\\/div><div class=\\\"listelement\\\">Amarante<\\\/div><div class=\\\"listelement\\\">Amaranth<\\\/div><div class=\\\"listelement\\\">Amatic SC<\\\/div><div class=\\\"listelement\\\">Amethysta<\\\/div><div class=\\\"listelement\\\">Anaheim<\\\/div><div class=\\\"listelement\\\">Andada<\\\/div><div class=\\\"listelement\\\">Andika<\\\/div><div class=\\\"listelement\\\">Angkor<\\\/div><div class=\\\"listelement\\\">Annie Use Your Telescope<\\\/div><div class=\\\"listelement\\\">Anonymous Pro<\\\/div><div class=\\\"listelement\\\">Antic<\\\/div><div class=\\\"listelement\\\">Antic Didone<\\\/div><div class=\\\"listelement\\\">Antic Slab<\\\/div><div class=\\\"listelement\\\">Anton<\\\/div><div class=\\\"listelement\\\">Arapey<\\\/div><div class=\\\"listelement\\\">Arbutus<\\\/div><div class=\\\"listelement\\\">Arbutus Slab<\\\/div><div class=\\\"listelement\\\">Architects Daughter<\\\/div><div class=\\\"listelement\\\">Archivo Black<\\\/div><div class=\\\"listelement\\\">Archivo Narrow<\\\/div><div class=\\\"listelement\\\">Arimo<\\\/div><div class=\\\"listelement\\\">Arizonia<\\\/div><div class=\\\"listelement\\\">Armata<\\\/div><div class=\\\"listelement\\\">Artifika<\\\/div><div class=\\\"listelement\\\">Arvo<\\\/div><div class=\\\"listelement\\\">Asap<\\\/div><div class=\\\"listelement\\\">Asset<\\\/div><div class=\\\"listelement\\\">Astloch<\\\/div><div class=\\\"listelement\\\">Asul<\\\/div><div class=\\\"listelement\\\">Atomic Age<\\\/div><div class=\\\"listelement\\\">Aubrey<\\\/div><div class=\\\"listelement\\\">Audiowide<\\\/div><div class=\\\"listelement\\\">Autour One<\\\/div><div class=\\\"listelement\\\">Average<\\\/div><div class=\\\"listelement\\\">Average Sans<\\\/div><div class=\\\"listelement\\\">Averia Gruesa Libre<\\\/div><div class=\\\"listelement\\\">Averia Libre<\\\/div><div class=\\\"listelement\\\">Averia Sans Libre<\\\/div><div class=\\\"listelement\\\">Averia Serif Libre<\\\/div><div class=\\\"listelement\\\">Bad Script<\\\/div><div class=\\\"listelement\\\">Balthazar<\\\/div><div class=\\\"listelement\\\">Bangers<\\\/div><div class=\\\"listelement\\\">Basic<\\\/div><div class=\\\"listelement\\\">Battambang<\\\/div><div class=\\\"listelement\\\">Baumans<\\\/div><div class=\\\"listelement\\\">Bayon<\\\/div><div class=\\\"listelement\\\">Belgrano<\\\/div><div class=\\\"listelement\\\">Belleza<\\\/div><div class=\\\"listelement\\\">BenchNine<\\\/div><div class=\\\"listelement\\\">Bentham<\\\/div><div class=\\\"listelement\\\">Berkshire Swash<\\\/div><div class=\\\"listelement\\\">Bevan<\\\/div><div class=\\\"listelement\\\">Bigelow Rules<\\\/div><div class=\\\"listelement\\\">Bigshot One<\\\/div><div class=\\\"listelement\\\">Bilbo<\\\/div><div class=\\\"listelement\\\">Bilbo Swash Caps<\\\/div><div class=\\\"listelement\\\">Bitter<\\\/div><div class=\\\"listelement\\\">Black Ops One<\\\/div><div class=\\\"listelement\\\">Bokor<\\\/div><div class=\\\"listelement\\\">Bonbon<\\\/div><div class=\\\"listelement\\\">Boogaloo<\\\/div><div class=\\\"listelement\\\">Bowlby One<\\\/div><div class=\\\"listelement\\\">Bowlby One SC<\\\/div><div class=\\\"listelement\\\">Brawler<\\\/div><div class=\\\"listelement\\\">Bree Serif<\\\/div><div class=\\\"listelement\\\">Bubblegum Sans<\\\/div><div class=\\\"listelement\\\">Bubbler One<\\\/div><div class=\\\"listelement\\\">Buda<\\\/div><div class=\\\"listelement\\\">Buenard<\\\/div><div class=\\\"listelement\\\">Butcherman<\\\/div><div class=\\\"listelement\\\">Butterfly Kids<\\\/div><div class=\\\"listelement\\\">Cabin<\\\/div><div class=\\\"listelement\\\">Cabin Condensed<\\\/div><div class=\\\"listelement\\\">Cabin Sketch<\\\/div><div class=\\\"listelement\\\">Caesar Dressing<\\\/div><div class=\\\"listelement\\\">Cagliostro<\\\/div><div class=\\\"listelement\\\">Calligraffitti<\\\/div><div class=\\\"listelement\\\">Cambo<\\\/div><div class=\\\"listelement\\\">Candal<\\\/div><div class=\\\"listelement\\\">Cantarell<\\\/div><div class=\\\"listelement\\\">Cantata One<\\\/div><div class=\\\"listelement\\\">Cantora One<\\\/div><div class=\\\"listelement\\\">Capriola<\\\/div><div class=\\\"listelement\\\">Cardo<\\\/div><div class=\\\"listelement\\\">Carme<\\\/div><div class=\\\"listelement\\\">Carrois Gothic<\\\/div><div class=\\\"listelement\\\">Carrois Gothic SC<\\\/div><div class=\\\"listelement\\\">Carter One<\\\/div><div class=\\\"listelement\\\">Caudex<\\\/div><div class=\\\"listelement\\\">Cedarville Cursive<\\\/div><div class=\\\"listelement\\\">Ceviche One<\\\/div><div class=\\\"listelement\\\">Changa One<\\\/div><div class=\\\"listelement\\\">Chango<\\\/div><div class=\\\"listelement\\\">Chau Philomene One<\\\/div><div class=\\\"listelement\\\">Chela One<\\\/div><div class=\\\"listelement\\\">Chelsea Market<\\\/div><div class=\\\"listelement\\\">Chenla<\\\/div><div class=\\\"listelement\\\">Cherry Cream Soda<\\\/div><div class=\\\"listelement\\\">Cherry Swash<\\\/div><div class=\\\"listelement\\\">Chewy<\\\/div><div class=\\\"listelement\\\">Chicle<\\\/div><div class=\\\"listelement\\\">Chivo<\\\/div><div class=\\\"listelement\\\">Cinzel<\\\/div><div class=\\\"listelement\\\">Cinzel Decorative<\\\/div><div class=\\\"listelement\\\">Clicker Script<\\\/div><div class=\\\"listelement\\\">Coda<\\\/div><div class=\\\"listelement\\\">Coda Caption<\\\/div><div class=\\\"listelement\\\">Codystar<\\\/div><div class=\\\"listelement\\\">Combo<\\\/div><div class=\\\"listelement\\\">Comfortaa<\\\/div><div class=\\\"listelement\\\">Coming Soon<\\\/div><div class=\\\"listelement\\\">Concert One<\\\/div><div class=\\\"listelement\\\">Condiment<\\\/div><div class=\\\"listelement\\\">Content<\\\/div><div class=\\\"listelement\\\">Contrail One<\\\/div><div class=\\\"listelement\\\">Convergence<\\\/div><div class=\\\"listelement\\\">Cookie<\\\/div><div class=\\\"listelement\\\">Copse<\\\/div><div class=\\\"listelement\\\">Corben<\\\/div><div class=\\\"listelement\\\">Courgette<\\\/div><div class=\\\"listelement\\\">Cousine<\\\/div><div class=\\\"listelement\\\">Coustard<\\\/div><div class=\\\"listelement\\\">Covered By Your Grace<\\\/div><div class=\\\"listelement\\\">Crafty Girls<\\\/div><div class=\\\"listelement\\\">Creepster<\\\/div><div class=\\\"listelement\\\">Crete Round<\\\/div><div class=\\\"listelement\\\">Crimson Text<\\\/div><div class=\\\"listelement\\\">Croissant One<\\\/div><div class=\\\"listelement\\\">Crushed<\\\/div><div class=\\\"listelement\\\">Cuprum<\\\/div><div class=\\\"listelement\\\">Cutive<\\\/div><div class=\\\"listelement\\\">Cutive Mono<\\\/div><div class=\\\"listelement\\\">Damion<\\\/div><div class=\\\"listelement\\\">Dancing Script<\\\/div><div class=\\\"listelement\\\">Dangrek<\\\/div><div class=\\\"listelement\\\">Dawning of a New Day<\\\/div><div class=\\\"listelement\\\">Days One<\\\/div><div class=\\\"listelement\\\">Delius<\\\/div><div class=\\\"listelement\\\">Delius Swash Caps<\\\/div><div class=\\\"listelement\\\">Delius Unicase<\\\/div><div class=\\\"listelement\\\">Della Respira<\\\/div><div class=\\\"listelement\\\">Devonshire<\\\/div><div class=\\\"listelement\\\">Didact Gothic<\\\/div><div class=\\\"listelement\\\">Diplomata<\\\/div><div class=\\\"listelement\\\">Diplomata SC<\\\/div><div class=\\\"listelement\\\">Doppio One<\\\/div><div class=\\\"listelement\\\">Dorsa<\\\/div><div class=\\\"listelement\\\">Dosis<\\\/div><div class=\\\"listelement\\\">Dr Sugiyama<\\\/div><div class=\\\"listelement\\\">Droid Sans<\\\/div><div class=\\\"listelement\\\">Droid Sans Mono<\\\/div><div class=\\\"listelement\\\">Droid Serif<\\\/div><div class=\\\"listelement\\\">Duru Sans<\\\/div><div class=\\\"listelement\\\">Dynalight<\\\/div><div class=\\\"listelement\\\">EB Garamond<\\\/div><div class=\\\"listelement\\\">Eagle Lake<\\\/div><div class=\\\"listelement\\\">Eater<\\\/div><div class=\\\"listelement\\\">Economica<\\\/div><div class=\\\"listelement\\\">Electrolize<\\\/div><div class=\\\"listelement\\\">Emblema One<\\\/div><div class=\\\"listelement\\\">Emilys Candy<\\\/div><div class=\\\"listelement\\\">Engagement<\\\/div><div class=\\\"listelement\\\">Englebert<\\\/div><div class=\\\"listelement\\\">Enriqueta<\\\/div><div class=\\\"listelement\\\">Erica One<\\\/div><div class=\\\"listelement\\\">Esteban<\\\/div><div class=\\\"listelement\\\">Euphoria Script<\\\/div><div class=\\\"listelement\\\">Ewert<\\\/div><div class=\\\"listelement\\\">Exo<\\\/div><div class=\\\"listelement\\\">Expletus Sans<\\\/div><div class=\\\"listelement\\\">Fanwood Text<\\\/div><div class=\\\"listelement\\\">Fascinate<\\\/div><div class=\\\"listelement\\\">Fascinate Inline<\\\/div><div class=\\\"listelement\\\">Faster One<\\\/div><div class=\\\"listelement\\\">Fasthand<\\\/div><div class=\\\"listelement\\\">Federant<\\\/div><div class=\\\"listelement\\\">Federo<\\\/div><div class=\\\"listelement\\\">Felipa<\\\/div><div class=\\\"listelement\\\">Fenix<\\\/div><div class=\\\"listelement\\\">Finger Paint<\\\/div><div class=\\\"listelement\\\">Fjord One<\\\/div><div class=\\\"listelement\\\">Flamenco<\\\/div><div class=\\\"listelement\\\">Flavors<\\\/div><div class=\\\"listelement\\\">Fondamento<\\\/div><div class=\\\"listelement\\\">Fontdiner Swanky<\\\/div><div class=\\\"listelement\\\">Forum<\\\/div><div class=\\\"listelement\\\">Francois One<\\\/div><div class=\\\"listelement\\\">Freckle Face<\\\/div><div class=\\\"listelement\\\">Fredericka the Great<\\\/div><div class=\\\"listelement\\\">Fredoka One<\\\/div><div class=\\\"listelement\\\">Freehand<\\\/div><div class=\\\"listelement\\\">Fresca<\\\/div><div class=\\\"listelement\\\">Frijole<\\\/div><div class=\\\"listelement\\\">Fugaz One<\\\/div><div class=\\\"listelement\\\">GFS Didot<\\\/div><div class=\\\"listelement\\\">GFS Neohellenic<\\\/div><div class=\\\"listelement\\\">Gafata<\\\/div><div class=\\\"listelement\\\">Galdeano<\\\/div><div class=\\\"listelement\\\">Galindo<\\\/div><div class=\\\"listelement\\\">Gentium Basic<\\\/div><div class=\\\"listelement\\\">Gentium Book Basic<\\\/div><div class=\\\"listelement\\\">Geo<\\\/div><div class=\\\"listelement\\\">Geostar<\\\/div><div class=\\\"listelement\\\">Geostar Fill<\\\/div><div class=\\\"listelement\\\">Germania One<\\\/div><div class=\\\"listelement\\\">Gilda Display<\\\/div><div class=\\\"listelement\\\">Give You Glory<\\\/div><div class=\\\"listelement\\\">Glass Antiqua<\\\/div><div class=\\\"listelement\\\">Glegoo<\\\/div><div class=\\\"listelement\\\">Gloria Hallelujah<\\\/div><div class=\\\"listelement\\\">Goblin One<\\\/div><div class=\\\"listelement\\\">Gochi Hand<\\\/div><div class=\\\"listelement\\\">Gorditas<\\\/div><div class=\\\"listelement\\\">Goudy Bookletter 1911<\\\/div><div class=\\\"listelement\\\">Graduate<\\\/div><div class=\\\"listelement\\\">Gravitas One<\\\/div><div class=\\\"listelement\\\">Great Vibes<\\\/div><div class=\\\"listelement\\\">Griffy<\\\/div><div class=\\\"listelement\\\">Gruppo<\\\/div><div class=\\\"listelement\\\">Gudea<\\\/div><div class=\\\"listelement\\\">Habibi<\\\/div><div class=\\\"listelement\\\">Hammersmith One<\\\/div><div class=\\\"listelement\\\">Hanalei<\\\/div><div class=\\\"listelement\\\">Hanalei Fill<\\\/div><div class=\\\"listelement\\\">Handlee<\\\/div><div class=\\\"listelement\\\">Hanuman<\\\/div><div class=\\\"listelement\\\">Happy Monkey<\\\/div><div class=\\\"listelement\\\">Headland One<\\\/div><div class=\\\"listelement\\\">Henny Penny<\\\/div><div class=\\\"listelement\\\">Herr Von Muellerhoff<\\\/div><div class=\\\"listelement\\\">Holtwood One SC<\\\/div><div class=\\\"listelement\\\">Homemade Apple<\\\/div><div class=\\\"listelement\\\">Homenaje<\\\/div><div class=\\\"listelement\\\">IM Fell DW Pica<\\\/div><div class=\\\"listelement\\\">IM Fell DW Pica SC<\\\/div><div class=\\\"listelement\\\">IM Fell Double Pica<\\\/div><div class=\\\"listelement\\\">IM Fell Double Pica SC<\\\/div><div class=\\\"listelement\\\">IM Fell English<\\\/div><div class=\\\"listelement\\\">IM Fell English SC<\\\/div><div class=\\\"listelement\\\">IM Fell French Canon<\\\/div><div class=\\\"listelement\\\">IM Fell French Canon SC<\\\/div><div class=\\\"listelement\\\">IM Fell Great Primer<\\\/div><div class=\\\"listelement\\\">IM Fell Great Primer SC<\\\/div><div class=\\\"listelement\\\">Iceberg<\\\/div><div class=\\\"listelement\\\">Iceland<\\\/div><div class=\\\"listelement\\\">Imprima<\\\/div><div class=\\\"listelement\\\">Inconsolata<\\\/div><div class=\\\"listelement\\\">Inder<\\\/div><div class=\\\"listelement\\\">Indie Flower<\\\/div><div class=\\\"listelement\\\">Inika<\\\/div><div class=\\\"listelement\\\">Irish Grover<\\\/div><div class=\\\"listelement\\\">Istok Web<\\\/div><div class=\\\"listelement\\\">Italiana<\\\/div><div class=\\\"listelement\\\">Italianno<\\\/div><div class=\\\"listelement\\\">Jacques Francois<\\\/div><div class=\\\"listelement\\\">Jacques Francois Shadow<\\\/div><div class=\\\"listelement\\\">Jim Nightshade<\\\/div><div class=\\\"listelement\\\">Jockey One<\\\/div><div class=\\\"listelement\\\">Jolly Lodger<\\\/div><div class=\\\"listelement\\\">Josefin Sans<\\\/div><div class=\\\"listelement\\\">Josefin Slab<\\\/div><div class=\\\"listelement\\\">Joti One<\\\/div><div class=\\\"listelement\\\">Judson<\\\/div><div class=\\\"listelement\\\">Julee<\\\/div><div class=\\\"listelement\\\">Julius Sans One<\\\/div><div class=\\\"listelement\\\">Junge<\\\/div><div class=\\\"listelement\\\">Jura<\\\/div><div class=\\\"listelement\\\">Just Another Hand<\\\/div><div class=\\\"listelement\\\">Just Me Again Down Here<\\\/div><div class=\\\"listelement\\\">Kameron<\\\/div><div class=\\\"listelement\\\">Karla<\\\/div><div class=\\\"listelement\\\">Kaushan Script<\\\/div><div class=\\\"listelement\\\">Keania One<\\\/div><div class=\\\"listelement\\\">Kelly Slab<\\\/div><div class=\\\"listelement\\\">Kenia<\\\/div><div class=\\\"listelement\\\">Khmer<\\\/div><div class=\\\"listelement\\\">Kite One<\\\/div><div class=\\\"listelement\\\">Knewave<\\\/div><div class=\\\"listelement\\\">Kotta One<\\\/div><div class=\\\"listelement\\\">Koulen<\\\/div><div class=\\\"listelement\\\">Kranky<\\\/div><div class=\\\"listelement\\\">Kreon<\\\/div><div class=\\\"listelement\\\">Kristi<\\\/div><div class=\\\"listelement\\\">Krona One<\\\/div><div class=\\\"listelement\\\">La Belle Aurore<\\\/div><div class=\\\"listelement\\\">Lancelot<\\\/div><div class=\\\"listelement\\\">Lato<\\\/div><div class=\\\"listelement\\\">League Script<\\\/div><div class=\\\"listelement\\\">Leckerli One<\\\/div><div class=\\\"listelement\\\">Ledger<\\\/div><div class=\\\"listelement\\\">Lekton<\\\/div><div class=\\\"listelement\\\">Lemon<\\\/div><div class=\\\"listelement\\\">Life Savers<\\\/div><div class=\\\"listelement\\\">Lilita One<\\\/div><div class=\\\"listelement\\\">Limelight<\\\/div><div class=\\\"listelement\\\">Linden Hill<\\\/div><div class=\\\"listelement\\\">Lobster<\\\/div><div class=\\\"listelement\\\">Lobster Two<\\\/div><div class=\\\"listelement\\\">Londrina Outline<\\\/div><div class=\\\"listelement\\\">Londrina Shadow<\\\/div><div class=\\\"listelement\\\">Londrina Sketch<\\\/div><div class=\\\"listelement\\\">Londrina Solid<\\\/div><div class=\\\"listelement\\\">Lora<\\\/div><div class=\\\"listelement\\\">Love Ya Like A Sister<\\\/div><div class=\\\"listelement\\\">Loved by the King<\\\/div><div class=\\\"listelement\\\">Lovers Quarrel<\\\/div><div class=\\\"listelement\\\">Luckiest Guy<\\\/div><div class=\\\"listelement\\\">Lusitana<\\\/div><div class=\\\"listelement\\\">Lustria<\\\/div><div class=\\\"listelement\\\">Macondo<\\\/div><div class=\\\"listelement\\\">Macondo Swash Caps<\\\/div><div class=\\\"listelement\\\">Magra<\\\/div><div class=\\\"listelement\\\">Maiden Orange<\\\/div><div class=\\\"listelement\\\">Mako<\\\/div><div class=\\\"listelement\\\">Marcellus<\\\/div><div class=\\\"listelement\\\">Marcellus SC<\\\/div><div class=\\\"listelement\\\">Marck Script<\\\/div><div class=\\\"listelement\\\">Margarine<\\\/div><div class=\\\"listelement\\\">Marko One<\\\/div><div class=\\\"listelement\\\">Marmelad<\\\/div><div class=\\\"listelement\\\">Marvel<\\\/div><div class=\\\"listelement\\\">Mate<\\\/div><div class=\\\"listelement\\\">Mate SC<\\\/div><div class=\\\"listelement\\\">Maven Pro<\\\/div><div class=\\\"listelement\\\">McLaren<\\\/div><div class=\\\"listelement\\\">Meddon<\\\/div><div class=\\\"listelement\\\">MedievalSharp<\\\/div><div class=\\\"listelement\\\">Medula One<\\\/div><div class=\\\"listelement\\\">Megrim<\\\/div><div class=\\\"listelement\\\">Meie Script<\\\/div><div class=\\\"listelement\\\">Merienda<\\\/div><div class=\\\"listelement\\\">Merienda One<\\\/div><div class=\\\"listelement\\\">Merriweather<\\\/div><div class=\\\"listelement\\\">Metal<\\\/div><div class=\\\"listelement\\\">Metal Mania<\\\/div><div class=\\\"listelement\\\">Metamorphous<\\\/div><div class=\\\"listelement\\\">Metrophobic<\\\/div><div class=\\\"listelement\\\">Michroma<\\\/div><div class=\\\"listelement\\\">Miltonian<\\\/div><div class=\\\"listelement\\\">Miltonian Tattoo<\\\/div><div class=\\\"listelement\\\">Miniver<\\\/div><div class=\\\"listelement\\\">Miss Fajardose<\\\/div><div class=\\\"listelement\\\">Modern Antiqua<\\\/div><div class=\\\"listelement\\\">Molengo<\\\/div><div class=\\\"listelement\\\">Molle<\\\/div><div class=\\\"listelement\\\">Monofett<\\\/div><div class=\\\"listelement\\\">Monoton<\\\/div><div class=\\\"listelement\\\">Monsieur La Doulaise<\\\/div><div class=\\\"listelement\\\">Montaga<\\\/div><div class=\\\"listelement\\\">Montez<\\\/div><div class=\\\"listelement\\\">Montserrat<\\\/div><div class=\\\"listelement\\\">Montserrat Alternates<\\\/div><div class=\\\"listelement\\\">Montserrat Subrayada<\\\/div><div class=\\\"listelement\\\">Moul<\\\/div><div class=\\\"listelement\\\">Moulpali<\\\/div><div class=\\\"listelement\\\">Mountains of Christmas<\\\/div><div class=\\\"listelement\\\">Mouse Memoirs<\\\/div><div class=\\\"listelement\\\">Mr Bedfort<\\\/div><div class=\\\"listelement\\\">Mr Dafoe<\\\/div><div class=\\\"listelement\\\">Mr De Haviland<\\\/div><div class=\\\"listelement\\\">Mrs Saint Delafield<\\\/div><div class=\\\"listelement\\\">Mrs Sheppards<\\\/div><div class=\\\"listelement\\\">Muli<\\\/div><div class=\\\"listelement\\\">Mystery Quest<\\\/div><div class=\\\"listelement\\\">Neucha<\\\/div><div class=\\\"listelement\\\">Neuton<\\\/div><div class=\\\"listelement\\\">News Cycle<\\\/div><div class=\\\"listelement\\\">Niconne<\\\/div><div class=\\\"listelement\\\">Nixie One<\\\/div><div class=\\\"listelement\\\">Nobile<\\\/div><div class=\\\"listelement\\\">Nokora<\\\/div><div class=\\\"listelement\\\">Norican<\\\/div><div class=\\\"listelement\\\">Nosifer<\\\/div><div class=\\\"listelement\\\">Nothing You Could Do<\\\/div><div class=\\\"listelement\\\">Noticia Text<\\\/div><div class=\\\"listelement\\\">Nova Cut<\\\/div><div class=\\\"listelement\\\">Nova Flat<\\\/div><div class=\\\"listelement\\\">Nova Mono<\\\/div><div class=\\\"listelement\\\">Nova Oval<\\\/div><div class=\\\"listelement\\\">Nova Round<\\\/div><div class=\\\"listelement\\\">Nova Script<\\\/div><div class=\\\"listelement\\\">Nova Slim<\\\/div><div class=\\\"listelement\\\">Nova Square<\\\/div><div class=\\\"listelement\\\">Numans<\\\/div><div class=\\\"listelement\\\">Nunito<\\\/div><div class=\\\"listelement\\\">Odor Mean Chey<\\\/div><div class=\\\"listelement\\\">Offside<\\\/div><div class=\\\"listelement\\\">Old Standard TT<\\\/div><div class=\\\"listelement\\\">Oldenburg<\\\/div><div class=\\\"listelement\\\">Oleo Script<\\\/div><div class=\\\"listelement\\\">Oleo Script Swash Caps<\\\/div><div class=\\\"listelement\\\">Open Sans<\\\/div><div class=\\\"listelement\\\">Open Sans Condensed<\\\/div><div class=\\\"listelement\\\">Oranienbaum<\\\/div><div class=\\\"listelement\\\">Orbitron<\\\/div><div class=\\\"listelement\\\">Oregano<\\\/div><div class=\\\"listelement\\\">Orienta<\\\/div><div class=\\\"listelement\\\">Original Surfer<\\\/div><div class=\\\"listelement\\\">Oswald<\\\/div><div class=\\\"listelement\\\">Over the Rainbow<\\\/div><div class=\\\"listelement\\\">Overlock<\\\/div><div class=\\\"listelement\\\">Overlock SC<\\\/div><div class=\\\"listelement\\\">Ovo<\\\/div><div class=\\\"listelement\\\">Oxygen<\\\/div><div class=\\\"listelement\\\">Oxygen Mono<\\\/div><div class=\\\"listelement\\\">PT Mono<\\\/div><div class=\\\"listelement\\\">PT Sans<\\\/div><div class=\\\"listelement\\\">PT Sans Caption<\\\/div><div class=\\\"listelement\\\">PT Sans Narrow<\\\/div><div class=\\\"listelement\\\">PT Serif<\\\/div><div class=\\\"listelement\\\">PT Serif Caption<\\\/div><div class=\\\"listelement\\\">Pacifico<\\\/div><div class=\\\"listelement\\\">Paprika<\\\/div><div class=\\\"listelement\\\">Parisienne<\\\/div><div class=\\\"listelement\\\">Passero One<\\\/div><div class=\\\"listelement\\\">Passion One<\\\/div><div class=\\\"listelement\\\">Patrick Hand<\\\/div><div class=\\\"listelement\\\">Patua One<\\\/div><div class=\\\"listelement\\\">Paytone One<\\\/div><div class=\\\"listelement\\\">Peralta<\\\/div><div class=\\\"listelement\\\">Permanent Marker<\\\/div><div class=\\\"listelement\\\">Petit Formal Script<\\\/div><div class=\\\"listelement\\\">Petrona<\\\/div><div class=\\\"listelement\\\">Philosopher<\\\/div><div class=\\\"listelement\\\">Piedra<\\\/div><div class=\\\"listelement\\\">Pinyon Script<\\\/div><div class=\\\"listelement\\\">Pirata One<\\\/div><div class=\\\"listelement\\\">Plaster<\\\/div><div class=\\\"listelement\\\">Play<\\\/div><div class=\\\"listelement\\\">Playball<\\\/div><div class=\\\"listelement\\\">Playfair Display<\\\/div><div class=\\\"listelement\\\">Playfair Display SC<\\\/div><div class=\\\"listelement\\\">Podkova<\\\/div><div class=\\\"listelement\\\">Poiret One<\\\/div><div class=\\\"listelement\\\">Poller One<\\\/div><div class=\\\"listelement\\\">Poly<\\\/div><div class=\\\"listelement\\\">Pompiere<\\\/div><div class=\\\"listelement\\\">Pontano Sans<\\\/div><div class=\\\"listelement\\\">Port Lligat Sans<\\\/div><div class=\\\"listelement\\\">Port Lligat Slab<\\\/div><div class=\\\"listelement\\\">Prata<\\\/div><div class=\\\"listelement\\\">Preahvihear<\\\/div><div class=\\\"listelement\\\">Press Start 2P<\\\/div><div class=\\\"listelement\\\">Princess Sofia<\\\/div><div class=\\\"listelement\\\">Prociono<\\\/div><div class=\\\"listelement\\\">Prosto One<\\\/div><div class=\\\"listelement\\\">Puritan<\\\/div><div class=\\\"listelement\\\">Purple Purse<\\\/div><div class=\\\"listelement\\\">Quando<\\\/div><div class=\\\"listelement\\\">Quantico<\\\/div><div class=\\\"listelement\\\">Quattrocento<\\\/div><div class=\\\"listelement\\\">Quattrocento Sans<\\\/div><div class=\\\"listelement\\\">Questrial<\\\/div><div class=\\\"listelement\\\">Quicksand<\\\/div><div class=\\\"listelement\\\">Quintessential<\\\/div><div class=\\\"listelement\\\">Qwigley<\\\/div><div class=\\\"listelement\\\">Racing Sans One<\\\/div><div class=\\\"listelement\\\">Radley<\\\/div><div class=\\\"listelement\\\">Raleway<\\\/div><div class=\\\"listelement\\\">Raleway Dots<\\\/div><div class=\\\"listelement\\\">Rambla<\\\/div><div class=\\\"listelement\\\">Rammetto One<\\\/div><div class=\\\"listelement\\\">Ranchers<\\\/div><div class=\\\"listelement\\\">Rancho<\\\/div><div class=\\\"listelement\\\">Rationale<\\\/div><div class=\\\"listelement\\\">Redressed<\\\/div><div class=\\\"listelement\\\">Reenie Beanie<\\\/div><div class=\\\"listelement\\\">Revalia<\\\/div><div class=\\\"listelement\\\">Ribeye<\\\/div><div class=\\\"listelement\\\">Ribeye Marrow<\\\/div><div class=\\\"listelement\\\">Righteous<\\\/div><div class=\\\"listelement\\\">Risque<\\\/div><div class=\\\"listelement\\\">Rochester<\\\/div><div class=\\\"listelement\\\">Rock Salt<\\\/div><div class=\\\"listelement\\\">Rokkitt<\\\/div><div class=\\\"listelement\\\">Romanesco<\\\/div><div class=\\\"listelement\\\">Ropa Sans<\\\/div><div class=\\\"listelement\\\">Rosario<\\\/div><div class=\\\"listelement\\\">Rosarivo<\\\/div><div class=\\\"listelement\\\">Rouge Script<\\\/div><div class=\\\"listelement\\\">Ruda<\\\/div><div class=\\\"listelement\\\">Rufina<\\\/div><div class=\\\"listelement\\\">Ruge Boogie<\\\/div><div class=\\\"listelement\\\">Ruluko<\\\/div><div class=\\\"listelement\\\">Rum Raisin<\\\/div><div class=\\\"listelement\\\">Ruslan Display<\\\/div><div class=\\\"listelement\\\">Russo One<\\\/div><div class=\\\"listelement\\\">Ruthie<\\\/div><div class=\\\"listelement\\\">Rye<\\\/div><div class=\\\"listelement\\\">Sacramento<\\\/div><div class=\\\"listelement\\\">Sail<\\\/div><div class=\\\"listelement\\\">Salsa<\\\/div><div class=\\\"listelement\\\">Sanchez<\\\/div><div class=\\\"listelement\\\">Sancreek<\\\/div><div class=\\\"listelement\\\">Sansita One<\\\/div><div class=\\\"listelement\\\">Sarina<\\\/div><div class=\\\"listelement\\\">Satisfy<\\\/div><div class=\\\"listelement\\\">Scada<\\\/div><div class=\\\"listelement\\\">Schoolbell<\\\/div><div class=\\\"listelement\\\">Seaweed Script<\\\/div><div class=\\\"listelement\\\">Sevillana<\\\/div><div class=\\\"listelement\\\">Seymour One<\\\/div><div class=\\\"listelement\\\">Shadows Into Light<\\\/div><div class=\\\"listelement\\\">Shadows Into Light Two<\\\/div><div class=\\\"listelement\\\">Shanti<\\\/div><div class=\\\"listelement\\\">Share<\\\/div><div class=\\\"listelement\\\">Share Tech<\\\/div><div class=\\\"listelement\\\">Share Tech Mono<\\\/div><div class=\\\"listelement\\\">Shojumaru<\\\/div><div class=\\\"listelement\\\">Short Stack<\\\/div><div class=\\\"listelement\\\">Siemreap<\\\/div><div class=\\\"listelement\\\">Sigmar One<\\\/div><div class=\\\"listelement\\\">Signika<\\\/div><div class=\\\"listelement\\\">Signika Negative<\\\/div><div class=\\\"listelement\\\">Simonetta<\\\/div><div class=\\\"listelement\\\">Sirin Stencil<\\\/div><div class=\\\"listelement\\\">Six Caps<\\\/div><div class=\\\"listelement\\\">Skranji<\\\/div><div class=\\\"listelement\\\">Slackey<\\\/div><div class=\\\"listelement\\\">Smokum<\\\/div><div class=\\\"listelement\\\">Smythe<\\\/div><div class=\\\"listelement\\\">Sniglet<\\\/div><div class=\\\"listelement\\\">Snippet<\\\/div><div class=\\\"listelement\\\">Snowburst One<\\\/div><div class=\\\"listelement\\\">Sofadi One<\\\/div><div class=\\\"listelement\\\">Sofia<\\\/div><div class=\\\"listelement\\\">Sonsie One<\\\/div><div class=\\\"listelement\\\">Sorts Mill Goudy<\\\/div><div class=\\\"listelement\\\">Source Code Pro<\\\/div><div class=\\\"listelement\\\">Source Sans Pro<\\\/div><div class=\\\"listelement\\\">Special Elite<\\\/div><div class=\\\"listelement\\\">Spicy Rice<\\\/div><div class=\\\"listelement\\\">Spinnaker<\\\/div><div class=\\\"listelement\\\">Spirax<\\\/div><div class=\\\"listelement\\\">Squada One<\\\/div><div class=\\\"listelement\\\">Stalemate<\\\/div><div class=\\\"listelement\\\">Stalinist One<\\\/div><div class=\\\"listelement\\\">Stardos Stencil<\\\/div><div class=\\\"listelement\\\">Stint Ultra Condensed<\\\/div><div class=\\\"listelement\\\">Stint Ultra Expanded<\\\/div><div class=\\\"listelement\\\">Stoke<\\\/div><div class=\\\"listelement\\\">Strait<\\\/div><div class=\\\"listelement\\\">Sue Ellen Francisco<\\\/div><div class=\\\"listelement\\\">Sunshiney<\\\/div><div class=\\\"listelement\\\">Supermercado One<\\\/div><div class=\\\"listelement\\\">Suwannaphum<\\\/div><div class=\\\"listelement\\\">Swanky and Moo Moo<\\\/div><div class=\\\"listelement\\\">Syncopate<\\\/div><div class=\\\"listelement\\\">Tangerine<\\\/div><div class=\\\"listelement\\\">Taprom<\\\/div><div class=\\\"listelement\\\">Telex<\\\/div><div class=\\\"listelement\\\">Tenor Sans<\\\/div><div class=\\\"listelement\\\">Text Me One<\\\/div><div class=\\\"listelement\\\">The Girl Next Door<\\\/div><div class=\\\"listelement\\\">Tienne<\\\/div><div class=\\\"listelement\\\">Tinos<\\\/div><div class=\\\"listelement\\\">Titan One<\\\/div><div class=\\\"listelement\\\">Titillium Web<\\\/div><div class=\\\"listelement\\\">Trade Winds<\\\/div><div class=\\\"listelement\\\">Trocchi<\\\/div><div class=\\\"listelement\\\">Trochut<\\\/div><div class=\\\"listelement\\\">Trykker<\\\/div><div class=\\\"listelement\\\">Tulpen One<\\\/div><div class=\\\"listelement\\\">Ubuntu<\\\/div><div class=\\\"listelement\\\">Ubuntu Condensed<\\\/div><div class=\\\"listelement\\\">Ubuntu Mono<\\\/div><div class=\\\"listelement\\\">Ultra<\\\/div><div class=\\\"listelement\\\">Uncial Antiqua<\\\/div><div class=\\\"listelement\\\">Underdog<\\\/div><div class=\\\"listelement\\\">Unica One<\\\/div><div class=\\\"listelement\\\">UnifrakturCook<\\\/div><div class=\\\"listelement\\\">UnifrakturMaguntia<\\\/div><div class=\\\"listelement\\\">Unkempt<\\\/div><div class=\\\"listelement\\\">Unlock<\\\/div><div class=\\\"listelement\\\">Unna<\\\/div><div class=\\\"listelement\\\">VT323<\\\/div><div class=\\\"listelement\\\">Vampiro One<\\\/div><div class=\\\"listelement\\\">Varela<\\\/div><div class=\\\"listelement\\\">Varela Round<\\\/div><div class=\\\"listelement\\\">Vast Shadow<\\\/div><div class=\\\"listelement\\\">Vibur<\\\/div><div class=\\\"listelement\\\">Vidaloka<\\\/div><div class=\\\"listelement\\\">Viga<\\\/div><div class=\\\"listelement\\\">Voces<\\\/div><div class=\\\"listelement\\\">Volkhov<\\\/div><div class=\\\"listelement\\\">Vollkorn<\\\/div><div class=\\\"listelement\\\">Voltaire<\\\/div><div class=\\\"listelement\\\">Waiting for the Sunrise<\\\/div><div class=\\\"listelement\\\">Wallpoet<\\\/div><div class=\\\"listelement\\\">Walter Turncoat<\\\/div><div class=\\\"listelement\\\">Warnes<\\\/div><div class=\\\"listelement\\\">Wellfleet<\\\/div><div class=\\\"listelement\\\">Wire One<\\\/div><div class=\\\"listelement\\\">Yanone Kaffeesatz<\\\/div><div class=\\\"listelement\\\">Yellowtail<\\\/div><div class=\\\"listelement\\\">Yeseva One<\\\/div><div class=\\\"listelement\\\">Yesteryear<\\\/div><div class=\\\"listelement\\\">Zeyada<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"ABeeZee\",\"text\":\"ABeeZee\"},{\"value\":\"Abel\",\"text\":\"Abel\"},{\"value\":\"Abril Fatface\",\"text\":\"Abril Fatface\"},{\"value\":\"Aclonica\",\"text\":\"Aclonica\"},{\"value\":\"Acme\",\"text\":\"Acme\"},{\"value\":\"Actor\",\"text\":\"Actor\"},{\"value\":\"Adamina\",\"text\":\"Adamina\"},{\"value\":\"Advent Pro\",\"text\":\"Advent Pro\"},{\"value\":\"Aguafina Script\",\"text\":\"Aguafina Script\"},{\"value\":\"Akronim\",\"text\":\"Akronim\"},{\"value\":\"Aladin\",\"text\":\"Aladin\"},{\"value\":\"Aldrich\",\"text\":\"Aldrich\"},{\"value\":\"Alegreya\",\"text\":\"Alegreya\"},{\"value\":\"Alegreya SC\",\"text\":\"Alegreya SC\"},{\"value\":\"Alex Brush\",\"text\":\"Alex Brush\"},{\"value\":\"Alfa Slab One\",\"text\":\"Alfa Slab One\"},{\"value\":\"Alice\",\"text\":\"Alice\"},{\"value\":\"Alike\",\"text\":\"Alike\"},{\"value\":\"Alike Angular\",\"text\":\"Alike Angular\"},{\"value\":\"Allan\",\"text\":\"Allan\"},{\"value\":\"Allerta\",\"text\":\"Allerta\"},{\"value\":\"Allerta Stencil\",\"text\":\"Allerta Stencil\"},{\"value\":\"Allura\",\"text\":\"Allura\"},{\"value\":\"Almendra\",\"text\":\"Almendra\"},{\"value\":\"Almendra Display\",\"text\":\"Almendra Display\"},{\"value\":\"Almendra SC\",\"text\":\"Almendra SC\"},{\"value\":\"Amarante\",\"text\":\"Amarante\"},{\"value\":\"Amaranth\",\"text\":\"Amaranth\"},{\"value\":\"Amatic SC\",\"text\":\"Amatic SC\"},{\"value\":\"Amethysta\",\"text\":\"Amethysta\"},{\"value\":\"Anaheim\",\"text\":\"Anaheim\"},{\"value\":\"Andada\",\"text\":\"Andada\"},{\"value\":\"Andika\",\"text\":\"Andika\"},{\"value\":\"Angkor\",\"text\":\"Angkor\"},{\"value\":\"Annie Use Your Telescope\",\"text\":\"Annie Use Your Telescope\"},{\"value\":\"Anonymous Pro\",\"text\":\"Anonymous Pro\"},{\"value\":\"Antic\",\"text\":\"Antic\"},{\"value\":\"Antic Didone\",\"text\":\"Antic Didone\"},{\"value\":\"Antic Slab\",\"text\":\"Antic Slab\"},{\"value\":\"Anton\",\"text\":\"Anton\"},{\"value\":\"Arapey\",\"text\":\"Arapey\"},{\"value\":\"Arbutus\",\"text\":\"Arbutus\"},{\"value\":\"Arbutus Slab\",\"text\":\"Arbutus Slab\"},{\"value\":\"Architects Daughter\",\"text\":\"Architects Daughter\"},{\"value\":\"Archivo Black\",\"text\":\"Archivo Black\"},{\"value\":\"Archivo Narrow\",\"text\":\"Archivo Narrow\"},{\"value\":\"Arimo\",\"text\":\"Arimo\"},{\"value\":\"Arizonia\",\"text\":\"Arizonia\"},{\"value\":\"Armata\",\"text\":\"Armata\"},{\"value\":\"Artifika\",\"text\":\"Artifika\"},{\"value\":\"Arvo\",\"text\":\"Arvo\"},{\"value\":\"Asap\",\"text\":\"Asap\"},{\"value\":\"Asset\",\"text\":\"Asset\"},{\"value\":\"Astloch\",\"text\":\"Astloch\"},{\"value\":\"Asul\",\"text\":\"Asul\"},{\"value\":\"Atomic Age\",\"text\":\"Atomic Age\"},{\"value\":\"Aubrey\",\"text\":\"Aubrey\"},{\"value\":\"Audiowide\",\"text\":\"Audiowide\"},{\"value\":\"Autour One\",\"text\":\"Autour One\"},{\"value\":\"Average\",\"text\":\"Average\"},{\"value\":\"Average Sans\",\"text\":\"Average Sans\"},{\"value\":\"Averia Gruesa Libre\",\"text\":\"Averia Gruesa Libre\"},{\"value\":\"Averia Libre\",\"text\":\"Averia Libre\"},{\"value\":\"Averia Sans Libre\",\"text\":\"Averia Sans Libre\"},{\"value\":\"Averia Serif Libre\",\"text\":\"Averia Serif Libre\"},{\"value\":\"Bad Script\",\"text\":\"Bad Script\"},{\"value\":\"Balthazar\",\"text\":\"Balthazar\"},{\"value\":\"Bangers\",\"text\":\"Bangers\"},{\"value\":\"Basic\",\"text\":\"Basic\"},{\"value\":\"Battambang\",\"text\":\"Battambang\"},{\"value\":\"Baumans\",\"text\":\"Baumans\"},{\"value\":\"Bayon\",\"text\":\"Bayon\"},{\"value\":\"Belgrano\",\"text\":\"Belgrano\"},{\"value\":\"Belleza\",\"text\":\"Belleza\"},{\"value\":\"BenchNine\",\"text\":\"BenchNine\"},{\"value\":\"Bentham\",\"text\":\"Bentham\"},{\"value\":\"Berkshire Swash\",\"text\":\"Berkshire Swash\"},{\"value\":\"Bevan\",\"text\":\"Bevan\"},{\"value\":\"Bigelow Rules\",\"text\":\"Bigelow Rules\"},{\"value\":\"Bigshot One\",\"text\":\"Bigshot One\"},{\"value\":\"Bilbo\",\"text\":\"Bilbo\"},{\"value\":\"Bilbo Swash Caps\",\"text\":\"Bilbo Swash Caps\"},{\"value\":\"Bitter\",\"text\":\"Bitter\"},{\"value\":\"Black Ops One\",\"text\":\"Black Ops One\"},{\"value\":\"Bokor\",\"text\":\"Bokor\"},{\"value\":\"Bonbon\",\"text\":\"Bonbon\"},{\"value\":\"Boogaloo\",\"text\":\"Boogaloo\"},{\"value\":\"Bowlby One\",\"text\":\"Bowlby One\"},{\"value\":\"Bowlby One SC\",\"text\":\"Bowlby One SC\"},{\"value\":\"Brawler\",\"text\":\"Brawler\"},{\"value\":\"Bree Serif\",\"text\":\"Bree Serif\"},{\"value\":\"Bubblegum Sans\",\"text\":\"Bubblegum Sans\"},{\"value\":\"Bubbler One\",\"text\":\"Bubbler One\"},{\"value\":\"Buda\",\"text\":\"Buda\"},{\"value\":\"Buenard\",\"text\":\"Buenard\"},{\"value\":\"Butcherman\",\"text\":\"Butcherman\"},{\"value\":\"Butterfly Kids\",\"text\":\"Butterfly Kids\"},{\"value\":\"Cabin\",\"text\":\"Cabin\"},{\"value\":\"Cabin Condensed\",\"text\":\"Cabin Condensed\"},{\"value\":\"Cabin Sketch\",\"text\":\"Cabin Sketch\"},{\"value\":\"Caesar Dressing\",\"text\":\"Caesar Dressing\"},{\"value\":\"Cagliostro\",\"text\":\"Cagliostro\"},{\"value\":\"Calligraffitti\",\"text\":\"Calligraffitti\"},{\"value\":\"Cambo\",\"text\":\"Cambo\"},{\"value\":\"Candal\",\"text\":\"Candal\"},{\"value\":\"Cantarell\",\"text\":\"Cantarell\"},{\"value\":\"Cantata One\",\"text\":\"Cantata One\"},{\"value\":\"Cantora One\",\"text\":\"Cantora One\"},{\"value\":\"Capriola\",\"text\":\"Capriola\"},{\"value\":\"Cardo\",\"text\":\"Cardo\"},{\"value\":\"Carme\",\"text\":\"Carme\"},{\"value\":\"Carrois Gothic\",\"text\":\"Carrois Gothic\"},{\"value\":\"Carrois Gothic SC\",\"text\":\"Carrois Gothic SC\"},{\"value\":\"Carter One\",\"text\":\"Carter One\"},{\"value\":\"Caudex\",\"text\":\"Caudex\"},{\"value\":\"Cedarville Cursive\",\"text\":\"Cedarville Cursive\"},{\"value\":\"Ceviche One\",\"text\":\"Ceviche One\"},{\"value\":\"Changa One\",\"text\":\"Changa One\"},{\"value\":\"Chango\",\"text\":\"Chango\"},{\"value\":\"Chau Philomene One\",\"text\":\"Chau Philomene One\"},{\"value\":\"Chela One\",\"text\":\"Chela One\"},{\"value\":\"Chelsea Market\",\"text\":\"Chelsea Market\"},{\"value\":\"Chenla\",\"text\":\"Chenla\"},{\"value\":\"Cherry Cream Soda\",\"text\":\"Cherry Cream Soda\"},{\"value\":\"Cherry Swash\",\"text\":\"Cherry Swash\"},{\"value\":\"Chewy\",\"text\":\"Chewy\"},{\"value\":\"Chicle\",\"text\":\"Chicle\"},{\"value\":\"Chivo\",\"text\":\"Chivo\"},{\"value\":\"Cinzel\",\"text\":\"Cinzel\"},{\"value\":\"Cinzel Decorative\",\"text\":\"Cinzel Decorative\"},{\"value\":\"Clicker Script\",\"text\":\"Clicker Script\"},{\"value\":\"Coda\",\"text\":\"Coda\"},{\"value\":\"Coda Caption\",\"text\":\"Coda Caption\"},{\"value\":\"Codystar\",\"text\":\"Codystar\"},{\"value\":\"Combo\",\"text\":\"Combo\"},{\"value\":\"Comfortaa\",\"text\":\"Comfortaa\"},{\"value\":\"Coming Soon\",\"text\":\"Coming Soon\"},{\"value\":\"Concert One\",\"text\":\"Concert One\"},{\"value\":\"Condiment\",\"text\":\"Condiment\"},{\"value\":\"Content\",\"text\":\"Content\"},{\"value\":\"Contrail One\",\"text\":\"Contrail One\"},{\"value\":\"Convergence\",\"text\":\"Convergence\"},{\"value\":\"Cookie\",\"text\":\"Cookie\"},{\"value\":\"Copse\",\"text\":\"Copse\"},{\"value\":\"Corben\",\"text\":\"Corben\"},{\"value\":\"Courgette\",\"text\":\"Courgette\"},{\"value\":\"Cousine\",\"text\":\"Cousine\"},{\"value\":\"Coustard\",\"text\":\"Coustard\"},{\"value\":\"Covered By Your Grace\",\"text\":\"Covered By Your Grace\"},{\"value\":\"Crafty Girls\",\"text\":\"Crafty Girls\"},{\"value\":\"Creepster\",\"text\":\"Creepster\"},{\"value\":\"Crete Round\",\"text\":\"Crete Round\"},{\"value\":\"Crimson Text\",\"text\":\"Crimson Text\"},{\"value\":\"Croissant One\",\"text\":\"Croissant One\"},{\"value\":\"Crushed\",\"text\":\"Crushed\"},{\"value\":\"Cuprum\",\"text\":\"Cuprum\"},{\"value\":\"Cutive\",\"text\":\"Cutive\"},{\"value\":\"Cutive Mono\",\"text\":\"Cutive Mono\"},{\"value\":\"Damion\",\"text\":\"Damion\"},{\"value\":\"Dancing Script\",\"text\":\"Dancing Script\"},{\"value\":\"Dangrek\",\"text\":\"Dangrek\"},{\"value\":\"Dawning of a New Day\",\"text\":\"Dawning of a New Day\"},{\"value\":\"Days One\",\"text\":\"Days One\"},{\"value\":\"Delius\",\"text\":\"Delius\"},{\"value\":\"Delius Swash Caps\",\"text\":\"Delius Swash Caps\"},{\"value\":\"Delius Unicase\",\"text\":\"Delius Unicase\"},{\"value\":\"Della Respira\",\"text\":\"Della Respira\"},{\"value\":\"Devonshire\",\"text\":\"Devonshire\"},{\"value\":\"Didact Gothic\",\"text\":\"Didact Gothic\"},{\"value\":\"Diplomata\",\"text\":\"Diplomata\"},{\"value\":\"Diplomata SC\",\"text\":\"Diplomata SC\"},{\"value\":\"Doppio One\",\"text\":\"Doppio One\"},{\"value\":\"Dorsa\",\"text\":\"Dorsa\"},{\"value\":\"Dosis\",\"text\":\"Dosis\"},{\"value\":\"Dr Sugiyama\",\"text\":\"Dr Sugiyama\"},{\"value\":\"Droid Sans\",\"text\":\"Droid Sans\"},{\"value\":\"Droid Sans Mono\",\"text\":\"Droid Sans Mono\"},{\"value\":\"Droid Serif\",\"text\":\"Droid Serif\"},{\"value\":\"Duru Sans\",\"text\":\"Duru Sans\"},{\"value\":\"Dynalight\",\"text\":\"Dynalight\"},{\"value\":\"EB Garamond\",\"text\":\"EB Garamond\"},{\"value\":\"Eagle Lake\",\"text\":\"Eagle Lake\"},{\"value\":\"Eater\",\"text\":\"Eater\"},{\"value\":\"Economica\",\"text\":\"Economica\"},{\"value\":\"Electrolize\",\"text\":\"Electrolize\"},{\"value\":\"Emblema One\",\"text\":\"Emblema One\"},{\"value\":\"Emilys Candy\",\"text\":\"Emilys Candy\"},{\"value\":\"Engagement\",\"text\":\"Engagement\"},{\"value\":\"Englebert\",\"text\":\"Englebert\"},{\"value\":\"Enriqueta\",\"text\":\"Enriqueta\"},{\"value\":\"Erica One\",\"text\":\"Erica One\"},{\"value\":\"Esteban\",\"text\":\"Esteban\"},{\"value\":\"Euphoria Script\",\"text\":\"Euphoria Script\"},{\"value\":\"Ewert\",\"text\":\"Ewert\"},{\"value\":\"Exo\",\"text\":\"Exo\"},{\"value\":\"Expletus Sans\",\"text\":\"Expletus Sans\"},{\"value\":\"Fanwood Text\",\"text\":\"Fanwood Text\"},{\"value\":\"Fascinate\",\"text\":\"Fascinate\"},{\"value\":\"Fascinate Inline\",\"text\":\"Fascinate Inline\"},{\"value\":\"Faster One\",\"text\":\"Faster One\"},{\"value\":\"Fasthand\",\"text\":\"Fasthand\"},{\"value\":\"Federant\",\"text\":\"Federant\"},{\"value\":\"Federo\",\"text\":\"Federo\"},{\"value\":\"Felipa\",\"text\":\"Felipa\"},{\"value\":\"Fenix\",\"text\":\"Fenix\"},{\"value\":\"Finger Paint\",\"text\":\"Finger Paint\"},{\"value\":\"Fjord One\",\"text\":\"Fjord One\"},{\"value\":\"Flamenco\",\"text\":\"Flamenco\"},{\"value\":\"Flavors\",\"text\":\"Flavors\"},{\"value\":\"Fondamento\",\"text\":\"Fondamento\"},{\"value\":\"Fontdiner Swanky\",\"text\":\"Fontdiner Swanky\"},{\"value\":\"Forum\",\"text\":\"Forum\"},{\"value\":\"Francois One\",\"text\":\"Francois One\"},{\"value\":\"Freckle Face\",\"text\":\"Freckle Face\"},{\"value\":\"Fredericka the Great\",\"text\":\"Fredericka the Great\"},{\"value\":\"Fredoka One\",\"text\":\"Fredoka One\"},{\"value\":\"Freehand\",\"text\":\"Freehand\"},{\"value\":\"Fresca\",\"text\":\"Fresca\"},{\"value\":\"Frijole\",\"text\":\"Frijole\"},{\"value\":\"Fugaz One\",\"text\":\"Fugaz One\"},{\"value\":\"GFS Didot\",\"text\":\"GFS Didot\"},{\"value\":\"GFS Neohellenic\",\"text\":\"GFS Neohellenic\"},{\"value\":\"Gafata\",\"text\":\"Gafata\"},{\"value\":\"Galdeano\",\"text\":\"Galdeano\"},{\"value\":\"Galindo\",\"text\":\"Galindo\"},{\"value\":\"Gentium Basic\",\"text\":\"Gentium Basic\"},{\"value\":\"Gentium Book Basic\",\"text\":\"Gentium Book Basic\"},{\"value\":\"Geo\",\"text\":\"Geo\"},{\"value\":\"Geostar\",\"text\":\"Geostar\"},{\"value\":\"Geostar Fill\",\"text\":\"Geostar Fill\"},{\"value\":\"Germania One\",\"text\":\"Germania One\"},{\"value\":\"Gilda Display\",\"text\":\"Gilda Display\"},{\"value\":\"Give You Glory\",\"text\":\"Give You Glory\"},{\"value\":\"Glass Antiqua\",\"text\":\"Glass Antiqua\"},{\"value\":\"Glegoo\",\"text\":\"Glegoo\"},{\"value\":\"Gloria Hallelujah\",\"text\":\"Gloria Hallelujah\"},{\"value\":\"Goblin One\",\"text\":\"Goblin One\"},{\"value\":\"Gochi Hand\",\"text\":\"Gochi Hand\"},{\"value\":\"Gorditas\",\"text\":\"Gorditas\"},{\"value\":\"Goudy Bookletter 1911\",\"text\":\"Goudy Bookletter 1911\"},{\"value\":\"Graduate\",\"text\":\"Graduate\"},{\"value\":\"Gravitas One\",\"text\":\"Gravitas One\"},{\"value\":\"Great Vibes\",\"text\":\"Great Vibes\"},{\"value\":\"Griffy\",\"text\":\"Griffy\"},{\"value\":\"Gruppo\",\"text\":\"Gruppo\"},{\"value\":\"Gudea\",\"text\":\"Gudea\"},{\"value\":\"Habibi\",\"text\":\"Habibi\"},{\"value\":\"Hammersmith One\",\"text\":\"Hammersmith One\"},{\"value\":\"Hanalei\",\"text\":\"Hanalei\"},{\"value\":\"Hanalei Fill\",\"text\":\"Hanalei Fill\"},{\"value\":\"Handlee\",\"text\":\"Handlee\"},{\"value\":\"Hanuman\",\"text\":\"Hanuman\"},{\"value\":\"Happy Monkey\",\"text\":\"Happy Monkey\"},{\"value\":\"Headland One\",\"text\":\"Headland One\"},{\"value\":\"Henny Penny\",\"text\":\"Henny Penny\"},{\"value\":\"Herr Von Muellerhoff\",\"text\":\"Herr Von Muellerhoff\"},{\"value\":\"Holtwood One SC\",\"text\":\"Holtwood One SC\"},{\"value\":\"Homemade Apple\",\"text\":\"Homemade Apple\"},{\"value\":\"Homenaje\",\"text\":\"Homenaje\"},{\"value\":\"IM Fell DW Pica\",\"text\":\"IM Fell DW Pica\"},{\"value\":\"IM Fell DW Pica SC\",\"text\":\"IM Fell DW Pica SC\"},{\"value\":\"IM Fell Double Pica\",\"text\":\"IM Fell Double Pica\"},{\"value\":\"IM Fell Double Pica SC\",\"text\":\"IM Fell Double Pica SC\"},{\"value\":\"IM Fell English\",\"text\":\"IM Fell English\"},{\"value\":\"IM Fell English SC\",\"text\":\"IM Fell English SC\"},{\"value\":\"IM Fell French Canon\",\"text\":\"IM Fell French Canon\"},{\"value\":\"IM Fell French Canon SC\",\"text\":\"IM Fell French Canon SC\"},{\"value\":\"IM Fell Great Primer\",\"text\":\"IM Fell Great Primer\"},{\"value\":\"IM Fell Great Primer SC\",\"text\":\"IM Fell Great Primer SC\"},{\"value\":\"Iceberg\",\"text\":\"Iceberg\"},{\"value\":\"Iceland\",\"text\":\"Iceland\"},{\"value\":\"Imprima\",\"text\":\"Imprima\"},{\"value\":\"Inconsolata\",\"text\":\"Inconsolata\"},{\"value\":\"Inder\",\"text\":\"Inder\"},{\"value\":\"Indie Flower\",\"text\":\"Indie Flower\"},{\"value\":\"Inika\",\"text\":\"Inika\"},{\"value\":\"Irish Grover\",\"text\":\"Irish Grover\"},{\"value\":\"Istok Web\",\"text\":\"Istok Web\"},{\"value\":\"Italiana\",\"text\":\"Italiana\"},{\"value\":\"Italianno\",\"text\":\"Italianno\"},{\"value\":\"Jacques Francois\",\"text\":\"Jacques Francois\"},{\"value\":\"Jacques Francois Shadow\",\"text\":\"Jacques Francois Shadow\"},{\"value\":\"Jim Nightshade\",\"text\":\"Jim Nightshade\"},{\"value\":\"Jockey One\",\"text\":\"Jockey One\"},{\"value\":\"Jolly Lodger\",\"text\":\"Jolly Lodger\"},{\"value\":\"Josefin Sans\",\"text\":\"Josefin Sans\"},{\"value\":\"Josefin Slab\",\"text\":\"Josefin Slab\"},{\"value\":\"Joti One\",\"text\":\"Joti One\"},{\"value\":\"Judson\",\"text\":\"Judson\"},{\"value\":\"Julee\",\"text\":\"Julee\"},{\"value\":\"Julius Sans One\",\"text\":\"Julius Sans One\"},{\"value\":\"Junge\",\"text\":\"Junge\"},{\"value\":\"Jura\",\"text\":\"Jura\"},{\"value\":\"Just Another Hand\",\"text\":\"Just Another Hand\"},{\"value\":\"Just Me Again Down Here\",\"text\":\"Just Me Again Down Here\"},{\"value\":\"Kameron\",\"text\":\"Kameron\"},{\"value\":\"Karla\",\"text\":\"Karla\"},{\"value\":\"Kaushan Script\",\"text\":\"Kaushan Script\"},{\"value\":\"Keania One\",\"text\":\"Keania One\"},{\"value\":\"Kelly Slab\",\"text\":\"Kelly Slab\"},{\"value\":\"Kenia\",\"text\":\"Kenia\"},{\"value\":\"Khmer\",\"text\":\"Khmer\"},{\"value\":\"Kite One\",\"text\":\"Kite One\"},{\"value\":\"Knewave\",\"text\":\"Knewave\"},{\"value\":\"Kotta One\",\"text\":\"Kotta One\"},{\"value\":\"Koulen\",\"text\":\"Koulen\"},{\"value\":\"Kranky\",\"text\":\"Kranky\"},{\"value\":\"Kreon\",\"text\":\"Kreon\"},{\"value\":\"Kristi\",\"text\":\"Kristi\"},{\"value\":\"Krona One\",\"text\":\"Krona One\"},{\"value\":\"La Belle Aurore\",\"text\":\"La Belle Aurore\"},{\"value\":\"Lancelot\",\"text\":\"Lancelot\"},{\"value\":\"Lato\",\"text\":\"Lato\"},{\"value\":\"League Script\",\"text\":\"League Script\"},{\"value\":\"Leckerli One\",\"text\":\"Leckerli One\"},{\"value\":\"Ledger\",\"text\":\"Ledger\"},{\"value\":\"Lekton\",\"text\":\"Lekton\"},{\"value\":\"Lemon\",\"text\":\"Lemon\"},{\"value\":\"Life Savers\",\"text\":\"Life Savers\"},{\"value\":\"Lilita One\",\"text\":\"Lilita One\"},{\"value\":\"Limelight\",\"text\":\"Limelight\"},{\"value\":\"Linden Hill\",\"text\":\"Linden Hill\"},{\"value\":\"Lobster\",\"text\":\"Lobster\"},{\"value\":\"Lobster Two\",\"text\":\"Lobster Two\"},{\"value\":\"Londrina Outline\",\"text\":\"Londrina Outline\"},{\"value\":\"Londrina Shadow\",\"text\":\"Londrina Shadow\"},{\"value\":\"Londrina Sketch\",\"text\":\"Londrina Sketch\"},{\"value\":\"Londrina Solid\",\"text\":\"Londrina Solid\"},{\"value\":\"Lora\",\"text\":\"Lora\"},{\"value\":\"Love Ya Like A Sister\",\"text\":\"Love Ya Like A Sister\"},{\"value\":\"Loved by the King\",\"text\":\"Loved by the King\"},{\"value\":\"Lovers Quarrel\",\"text\":\"Lovers Quarrel\"},{\"value\":\"Luckiest Guy\",\"text\":\"Luckiest Guy\"},{\"value\":\"Lusitana\",\"text\":\"Lusitana\"},{\"value\":\"Lustria\",\"text\":\"Lustria\"},{\"value\":\"Macondo\",\"text\":\"Macondo\"},{\"value\":\"Macondo Swash Caps\",\"text\":\"Macondo Swash Caps\"},{\"value\":\"Magra\",\"text\":\"Magra\"},{\"value\":\"Maiden Orange\",\"text\":\"Maiden Orange\"},{\"value\":\"Mako\",\"text\":\"Mako\"},{\"value\":\"Marcellus\",\"text\":\"Marcellus\"},{\"value\":\"Marcellus SC\",\"text\":\"Marcellus SC\"},{\"value\":\"Marck Script\",\"text\":\"Marck Script\"},{\"value\":\"Margarine\",\"text\":\"Margarine\"},{\"value\":\"Marko One\",\"text\":\"Marko One\"},{\"value\":\"Marmelad\",\"text\":\"Marmelad\"},{\"value\":\"Marvel\",\"text\":\"Marvel\"},{\"value\":\"Mate\",\"text\":\"Mate\"},{\"value\":\"Mate SC\",\"text\":\"Mate SC\"},{\"value\":\"Maven Pro\",\"text\":\"Maven Pro\"},{\"value\":\"McLaren\",\"text\":\"McLaren\"},{\"value\":\"Meddon\",\"text\":\"Meddon\"},{\"value\":\"MedievalSharp\",\"text\":\"MedievalSharp\"},{\"value\":\"Medula One\",\"text\":\"Medula One\"},{\"value\":\"Megrim\",\"text\":\"Megrim\"},{\"value\":\"Meie Script\",\"text\":\"Meie Script\"},{\"value\":\"Merienda\",\"text\":\"Merienda\"},{\"value\":\"Merienda One\",\"text\":\"Merienda One\"},{\"value\":\"Merriweather\",\"text\":\"Merriweather\"},{\"value\":\"Metal\",\"text\":\"Metal\"},{\"value\":\"Metal Mania\",\"text\":\"Metal Mania\"},{\"value\":\"Metamorphous\",\"text\":\"Metamorphous\"},{\"value\":\"Metrophobic\",\"text\":\"Metrophobic\"},{\"value\":\"Michroma\",\"text\":\"Michroma\"},{\"value\":\"Miltonian\",\"text\":\"Miltonian\"},{\"value\":\"Miltonian Tattoo\",\"text\":\"Miltonian Tattoo\"},{\"value\":\"Miniver\",\"text\":\"Miniver\"},{\"value\":\"Miss Fajardose\",\"text\":\"Miss Fajardose\"},{\"value\":\"Modern Antiqua\",\"text\":\"Modern Antiqua\"},{\"value\":\"Molengo\",\"text\":\"Molengo\"},{\"value\":\"Molle\",\"text\":\"Molle\"},{\"value\":\"Monofett\",\"text\":\"Monofett\"},{\"value\":\"Monoton\",\"text\":\"Monoton\"},{\"value\":\"Monsieur La Doulaise\",\"text\":\"Monsieur La Doulaise\"},{\"value\":\"Montaga\",\"text\":\"Montaga\"},{\"value\":\"Montez\",\"text\":\"Montez\"},{\"value\":\"Montserrat\",\"text\":\"Montserrat\"},{\"value\":\"Montserrat Alternates\",\"text\":\"Montserrat Alternates\"},{\"value\":\"Montserrat Subrayada\",\"text\":\"Montserrat Subrayada\"},{\"value\":\"Moul\",\"text\":\"Moul\"},{\"value\":\"Moulpali\",\"text\":\"Moulpali\"},{\"value\":\"Mountains of Christmas\",\"text\":\"Mountains of Christmas\"},{\"value\":\"Mouse Memoirs\",\"text\":\"Mouse Memoirs\"},{\"value\":\"Mr Bedfort\",\"text\":\"Mr Bedfort\"},{\"value\":\"Mr Dafoe\",\"text\":\"Mr Dafoe\"},{\"value\":\"Mr De Haviland\",\"text\":\"Mr De Haviland\"},{\"value\":\"Mrs Saint Delafield\",\"text\":\"Mrs Saint Delafield\"},{\"value\":\"Mrs Sheppards\",\"text\":\"Mrs Sheppards\"},{\"value\":\"Muli\",\"text\":\"Muli\"},{\"value\":\"Mystery Quest\",\"text\":\"Mystery Quest\"},{\"value\":\"Neucha\",\"text\":\"Neucha\"},{\"value\":\"Neuton\",\"text\":\"Neuton\"},{\"value\":\"News Cycle\",\"text\":\"News Cycle\"},{\"value\":\"Niconne\",\"text\":\"Niconne\"},{\"value\":\"Nixie One\",\"text\":\"Nixie One\"},{\"value\":\"Nobile\",\"text\":\"Nobile\"},{\"value\":\"Nokora\",\"text\":\"Nokora\"},{\"value\":\"Norican\",\"text\":\"Norican\"},{\"value\":\"Nosifer\",\"text\":\"Nosifer\"},{\"value\":\"Nothing You Could Do\",\"text\":\"Nothing You Could Do\"},{\"value\":\"Noticia Text\",\"text\":\"Noticia Text\"},{\"value\":\"Nova Cut\",\"text\":\"Nova Cut\"},{\"value\":\"Nova Flat\",\"text\":\"Nova Flat\"},{\"value\":\"Nova Mono\",\"text\":\"Nova Mono\"},{\"value\":\"Nova Oval\",\"text\":\"Nova Oval\"},{\"value\":\"Nova Round\",\"text\":\"Nova Round\"},{\"value\":\"Nova Script\",\"text\":\"Nova Script\"},{\"value\":\"Nova Slim\",\"text\":\"Nova Slim\"},{\"value\":\"Nova Square\",\"text\":\"Nova Square\"},{\"value\":\"Numans\",\"text\":\"Numans\"},{\"value\":\"Nunito\",\"text\":\"Nunito\"},{\"value\":\"Odor Mean Chey\",\"text\":\"Odor Mean Chey\"},{\"value\":\"Offside\",\"text\":\"Offside\"},{\"value\":\"Old Standard TT\",\"text\":\"Old Standard TT\"},{\"value\":\"Oldenburg\",\"text\":\"Oldenburg\"},{\"value\":\"Oleo Script\",\"text\":\"Oleo Script\"},{\"value\":\"Oleo Script Swash Caps\",\"text\":\"Oleo Script Swash Caps\"},{\"value\":\"Open Sans\",\"text\":\"Open Sans\"},{\"value\":\"Open Sans Condensed\",\"text\":\"Open Sans Condensed\"},{\"value\":\"Oranienbaum\",\"text\":\"Oranienbaum\"},{\"value\":\"Orbitron\",\"text\":\"Orbitron\"},{\"value\":\"Oregano\",\"text\":\"Oregano\"},{\"value\":\"Orienta\",\"text\":\"Orienta\"},{\"value\":\"Original Surfer\",\"text\":\"Original Surfer\"},{\"value\":\"Oswald\",\"text\":\"Oswald\"},{\"value\":\"Over the Rainbow\",\"text\":\"Over the Rainbow\"},{\"value\":\"Overlock\",\"text\":\"Overlock\"},{\"value\":\"Overlock SC\",\"text\":\"Overlock SC\"},{\"value\":\"Ovo\",\"text\":\"Ovo\"},{\"value\":\"Oxygen\",\"text\":\"Oxygen\"},{\"value\":\"Oxygen Mono\",\"text\":\"Oxygen Mono\"},{\"value\":\"PT Mono\",\"text\":\"PT Mono\"},{\"value\":\"PT Sans\",\"text\":\"PT Sans\"},{\"value\":\"PT Sans Caption\",\"text\":\"PT Sans Caption\"},{\"value\":\"PT Sans Narrow\",\"text\":\"PT Sans Narrow\"},{\"value\":\"PT Serif\",\"text\":\"PT Serif\"},{\"value\":\"PT Serif Caption\",\"text\":\"PT Serif Caption\"},{\"value\":\"Pacifico\",\"text\":\"Pacifico\"},{\"value\":\"Paprika\",\"text\":\"Paprika\"},{\"value\":\"Parisienne\",\"text\":\"Parisienne\"},{\"value\":\"Passero One\",\"text\":\"Passero One\"},{\"value\":\"Passion One\",\"text\":\"Passion One\"},{\"value\":\"Patrick Hand\",\"text\":\"Patrick Hand\"},{\"value\":\"Patua One\",\"text\":\"Patua One\"},{\"value\":\"Paytone One\",\"text\":\"Paytone One\"},{\"value\":\"Peralta\",\"text\":\"Peralta\"},{\"value\":\"Permanent Marker\",\"text\":\"Permanent Marker\"},{\"value\":\"Petit Formal Script\",\"text\":\"Petit Formal Script\"},{\"value\":\"Petrona\",\"text\":\"Petrona\"},{\"value\":\"Philosopher\",\"text\":\"Philosopher\"},{\"value\":\"Piedra\",\"text\":\"Piedra\"},{\"value\":\"Pinyon Script\",\"text\":\"Pinyon Script\"},{\"value\":\"Pirata One\",\"text\":\"Pirata One\"},{\"value\":\"Plaster\",\"text\":\"Plaster\"},{\"value\":\"Play\",\"text\":\"Play\"},{\"value\":\"Playball\",\"text\":\"Playball\"},{\"value\":\"Playfair Display\",\"text\":\"Playfair Display\"},{\"value\":\"Playfair Display SC\",\"text\":\"Playfair Display SC\"},{\"value\":\"Podkova\",\"text\":\"Podkova\"},{\"value\":\"Poiret One\",\"text\":\"Poiret One\"},{\"value\":\"Poller One\",\"text\":\"Poller One\"},{\"value\":\"Poly\",\"text\":\"Poly\"},{\"value\":\"Pompiere\",\"text\":\"Pompiere\"},{\"value\":\"Pontano Sans\",\"text\":\"Pontano Sans\"},{\"value\":\"Port Lligat Sans\",\"text\":\"Port Lligat Sans\"},{\"value\":\"Port Lligat Slab\",\"text\":\"Port Lligat Slab\"},{\"value\":\"Prata\",\"text\":\"Prata\"},{\"value\":\"Preahvihear\",\"text\":\"Preahvihear\"},{\"value\":\"Press Start 2P\",\"text\":\"Press Start 2P\"},{\"value\":\"Princess Sofia\",\"text\":\"Princess Sofia\"},{\"value\":\"Prociono\",\"text\":\"Prociono\"},{\"value\":\"Prosto One\",\"text\":\"Prosto One\"},{\"value\":\"Puritan\",\"text\":\"Puritan\"},{\"value\":\"Purple Purse\",\"text\":\"Purple Purse\"},{\"value\":\"Quando\",\"text\":\"Quando\"},{\"value\":\"Quantico\",\"text\":\"Quantico\"},{\"value\":\"Quattrocento\",\"text\":\"Quattrocento\"},{\"value\":\"Quattrocento Sans\",\"text\":\"Quattrocento Sans\"},{\"value\":\"Questrial\",\"text\":\"Questrial\"},{\"value\":\"Quicksand\",\"text\":\"Quicksand\"},{\"value\":\"Quintessential\",\"text\":\"Quintessential\"},{\"value\":\"Qwigley\",\"text\":\"Qwigley\"},{\"value\":\"Racing Sans One\",\"text\":\"Racing Sans One\"},{\"value\":\"Radley\",\"text\":\"Radley\"},{\"value\":\"Raleway\",\"text\":\"Raleway\"},{\"value\":\"Raleway Dots\",\"text\":\"Raleway Dots\"},{\"value\":\"Rambla\",\"text\":\"Rambla\"},{\"value\":\"Rammetto One\",\"text\":\"Rammetto One\"},{\"value\":\"Ranchers\",\"text\":\"Ranchers\"},{\"value\":\"Rancho\",\"text\":\"Rancho\"},{\"value\":\"Rationale\",\"text\":\"Rationale\"},{\"value\":\"Redressed\",\"text\":\"Redressed\"},{\"value\":\"Reenie Beanie\",\"text\":\"Reenie Beanie\"},{\"value\":\"Revalia\",\"text\":\"Revalia\"},{\"value\":\"Ribeye\",\"text\":\"Ribeye\"},{\"value\":\"Ribeye Marrow\",\"text\":\"Ribeye Marrow\"},{\"value\":\"Righteous\",\"text\":\"Righteous\"},{\"value\":\"Risque\",\"text\":\"Risque\"},{\"value\":\"Rochester\",\"text\":\"Rochester\"},{\"value\":\"Rock Salt\",\"text\":\"Rock Salt\"},{\"value\":\"Rokkitt\",\"text\":\"Rokkitt\"},{\"value\":\"Romanesco\",\"text\":\"Romanesco\"},{\"value\":\"Ropa Sans\",\"text\":\"Ropa Sans\"},{\"value\":\"Rosario\",\"text\":\"Rosario\"},{\"value\":\"Rosarivo\",\"text\":\"Rosarivo\"},{\"value\":\"Rouge Script\",\"text\":\"Rouge Script\"},{\"value\":\"Ruda\",\"text\":\"Ruda\"},{\"value\":\"Rufina\",\"text\":\"Rufina\"},{\"value\":\"Ruge Boogie\",\"text\":\"Ruge Boogie\"},{\"value\":\"Ruluko\",\"text\":\"Ruluko\"},{\"value\":\"Rum Raisin\",\"text\":\"Rum Raisin\"},{\"value\":\"Ruslan Display\",\"text\":\"Ruslan Display\"},{\"value\":\"Russo One\",\"text\":\"Russo One\"},{\"value\":\"Ruthie\",\"text\":\"Ruthie\"},{\"value\":\"Rye\",\"text\":\"Rye\"},{\"value\":\"Sacramento\",\"text\":\"Sacramento\"},{\"value\":\"Sail\",\"text\":\"Sail\"},{\"value\":\"Salsa\",\"text\":\"Salsa\"},{\"value\":\"Sanchez\",\"text\":\"Sanchez\"},{\"value\":\"Sancreek\",\"text\":\"Sancreek\"},{\"value\":\"Sansita One\",\"text\":\"Sansita One\"},{\"value\":\"Sarina\",\"text\":\"Sarina\"},{\"value\":\"Satisfy\",\"text\":\"Satisfy\"},{\"value\":\"Scada\",\"text\":\"Scada\"},{\"value\":\"Schoolbell\",\"text\":\"Schoolbell\"},{\"value\":\"Seaweed Script\",\"text\":\"Seaweed Script\"},{\"value\":\"Sevillana\",\"text\":\"Sevillana\"},{\"value\":\"Seymour One\",\"text\":\"Seymour One\"},{\"value\":\"Shadows Into Light\",\"text\":\"Shadows Into Light\"},{\"value\":\"Shadows Into Light Two\",\"text\":\"Shadows Into Light Two\"},{\"value\":\"Shanti\",\"text\":\"Shanti\"},{\"value\":\"Share\",\"text\":\"Share\"},{\"value\":\"Share Tech\",\"text\":\"Share Tech\"},{\"value\":\"Share Tech Mono\",\"text\":\"Share Tech Mono\"},{\"value\":\"Shojumaru\",\"text\":\"Shojumaru\"},{\"value\":\"Short Stack\",\"text\":\"Short Stack\"},{\"value\":\"Siemreap\",\"text\":\"Siemreap\"},{\"value\":\"Sigmar One\",\"text\":\"Sigmar One\"},{\"value\":\"Signika\",\"text\":\"Signika\"},{\"value\":\"Signika Negative\",\"text\":\"Signika Negative\"},{\"value\":\"Simonetta\",\"text\":\"Simonetta\"},{\"value\":\"Sirin Stencil\",\"text\":\"Sirin Stencil\"},{\"value\":\"Six Caps\",\"text\":\"Six Caps\"},{\"value\":\"Skranji\",\"text\":\"Skranji\"},{\"value\":\"Slackey\",\"text\":\"Slackey\"},{\"value\":\"Smokum\",\"text\":\"Smokum\"},{\"value\":\"Smythe\",\"text\":\"Smythe\"},{\"value\":\"Sniglet\",\"text\":\"Sniglet\"},{\"value\":\"Snippet\",\"text\":\"Snippet\"},{\"value\":\"Snowburst One\",\"text\":\"Snowburst One\"},{\"value\":\"Sofadi One\",\"text\":\"Sofadi One\"},{\"value\":\"Sofia\",\"text\":\"Sofia\"},{\"value\":\"Sonsie One\",\"text\":\"Sonsie One\"},{\"value\":\"Sorts Mill Goudy\",\"text\":\"Sorts Mill Goudy\"},{\"value\":\"Source Code Pro\",\"text\":\"Source Code Pro\"},{\"value\":\"Source Sans Pro\",\"text\":\"Source Sans Pro\"},{\"value\":\"Special Elite\",\"text\":\"Special Elite\"},{\"value\":\"Spicy Rice\",\"text\":\"Spicy Rice\"},{\"value\":\"Spinnaker\",\"text\":\"Spinnaker\"},{\"value\":\"Spirax\",\"text\":\"Spirax\"},{\"value\":\"Squada One\",\"text\":\"Squada One\"},{\"value\":\"Stalemate\",\"text\":\"Stalemate\"},{\"value\":\"Stalinist One\",\"text\":\"Stalinist One\"},{\"value\":\"Stardos Stencil\",\"text\":\"Stardos Stencil\"},{\"value\":\"Stint Ultra Condensed\",\"text\":\"Stint Ultra Condensed\"},{\"value\":\"Stint Ultra Expanded\",\"text\":\"Stint Ultra Expanded\"},{\"value\":\"Stoke\",\"text\":\"Stoke\"},{\"value\":\"Strait\",\"text\":\"Strait\"},{\"value\":\"Sue Ellen Francisco\",\"text\":\"Sue Ellen Francisco\"},{\"value\":\"Sunshiney\",\"text\":\"Sunshiney\"},{\"value\":\"Supermercado One\",\"text\":\"Supermercado One\"},{\"value\":\"Suwannaphum\",\"text\":\"Suwannaphum\"},{\"value\":\"Swanky and Moo Moo\",\"text\":\"Swanky and Moo Moo\"},{\"value\":\"Syncopate\",\"text\":\"Syncopate\"},{\"value\":\"Tangerine\",\"text\":\"Tangerine\"},{\"value\":\"Taprom\",\"text\":\"Taprom\"},{\"value\":\"Telex\",\"text\":\"Telex\"},{\"value\":\"Tenor Sans\",\"text\":\"Tenor Sans\"},{\"value\":\"Text Me One\",\"text\":\"Text Me One\"},{\"value\":\"The Girl Next Door\",\"text\":\"The Girl Next Door\"},{\"value\":\"Tienne\",\"text\":\"Tienne\"},{\"value\":\"Tinos\",\"text\":\"Tinos\"},{\"value\":\"Titan One\",\"text\":\"Titan One\"},{\"value\":\"Titillium Web\",\"text\":\"Titillium Web\"},{\"value\":\"Trade Winds\",\"text\":\"Trade Winds\"},{\"value\":\"Trocchi\",\"text\":\"Trocchi\"},{\"value\":\"Trochut\",\"text\":\"Trochut\"},{\"value\":\"Trykker\",\"text\":\"Trykker\"},{\"value\":\"Tulpen One\",\"text\":\"Tulpen One\"},{\"value\":\"Ubuntu\",\"text\":\"Ubuntu\"},{\"value\":\"Ubuntu Condensed\",\"text\":\"Ubuntu Condensed\"},{\"value\":\"Ubuntu Mono\",\"text\":\"Ubuntu Mono\"},{\"value\":\"Ultra\",\"text\":\"Ultra\"},{\"value\":\"Uncial Antiqua\",\"text\":\"Uncial Antiqua\"},{\"value\":\"Underdog\",\"text\":\"Underdog\"},{\"value\":\"Unica One\",\"text\":\"Unica One\"},{\"value\":\"UnifrakturCook\",\"text\":\"UnifrakturCook\"},{\"value\":\"UnifrakturMaguntia\",\"text\":\"UnifrakturMaguntia\"},{\"value\":\"Unkempt\",\"text\":\"Unkempt\"},{\"value\":\"Unlock\",\"text\":\"Unlock\"},{\"value\":\"Unna\",\"text\":\"Unna\"},{\"value\":\"VT323\",\"text\":\"VT323\"},{\"value\":\"Vampiro One\",\"text\":\"Vampiro One\"},{\"value\":\"Varela\",\"text\":\"Varela\"},{\"value\":\"Varela Round\",\"text\":\"Varela Round\"},{\"value\":\"Vast Shadow\",\"text\":\"Vast Shadow\"},{\"value\":\"Vibur\",\"text\":\"Vibur\"},{\"value\":\"Vidaloka\",\"text\":\"Vidaloka\"},{\"value\":\"Viga\",\"text\":\"Viga\"},{\"value\":\"Voces\",\"text\":\"Voces\"},{\"value\":\"Volkhov\",\"text\":\"Volkhov\"},{\"value\":\"Vollkorn\",\"text\":\"Vollkorn\"},{\"value\":\"Voltaire\",\"text\":\"Voltaire\"},{\"value\":\"Waiting for the Sunrise\",\"text\":\"Waiting for the Sunrise\"},{\"value\":\"Wallpoet\",\"text\":\"Wallpoet\"},{\"value\":\"Walter Turncoat\",\"text\":\"Walter Turncoat\"},{\"value\":\"Warnes\",\"text\":\"Warnes\"},{\"value\":\"Wellfleet\",\"text\":\"Wellfleet\"},{\"value\":\"Wire One\",\"text\":\"Wire One\"},{\"value\":\"Yanone Kaffeesatz\",\"text\":\"Yanone Kaffeesatz\"},{\"value\":\"Yellowtail\",\"text\":\"Yellowtail\"},{\"value\":\"Yeseva One\",\"text\":\"Yeseva One\"},{\"value\":\"Yesteryear\",\"text\":\"Yesteryear\"},{\"value\":\"Zeyada\",\"text\":\"Zeyada\"}],\r\n        selectedIndex: 417,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"LatinExtended":{"name":"jform[params][moduleparametersTab][theme][titlefont]family","id":"jformparamsmoduleparametersTabthemetitlefontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemetitlefontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Open Sans<br \/>Andika<br \/>Anonymous Pro<br \/>Anton<br \/>Caudex<br \/>Didact Gothic<br \/>EB Garamond<br \/>Forum<br \/>Francois One<br \/>Gentium Basic<br \/>Gentium Book Basic<br \/>Istok Web<br \/>Jura<br \/>Kelly Slab<br \/>Lobster<br \/>MedievalSharp<br \/>Modern Antiqua<br \/>Neuton<br \/>Open Sans<br \/>Open Sans Condensed<br \/>Patrick Hand<br \/>Play<br \/>Ruslan Display<br \/>Tenor Sans<br \/>Ubuntu<br \/>Varela<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][titlefont]family\" id=\"jformparamsmoduleparametersTabthemetitlefontfamily\" value=\"Open Sans\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemetitlefontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">Andika<\\\/div><div class=\\\"listelement\\\">Anonymous Pro<\\\/div><div class=\\\"listelement\\\">Anton<\\\/div><div class=\\\"listelement\\\">Caudex<\\\/div><div class=\\\"listelement\\\">Didact Gothic<\\\/div><div class=\\\"listelement\\\">EB Garamond<\\\/div><div class=\\\"listelement\\\">Forum<\\\/div><div class=\\\"listelement\\\">Francois One<\\\/div><div class=\\\"listelement\\\">Gentium Basic<\\\/div><div class=\\\"listelement\\\">Gentium Book Basic<\\\/div><div class=\\\"listelement\\\">Istok Web<\\\/div><div class=\\\"listelement\\\">Jura<\\\/div><div class=\\\"listelement\\\">Kelly Slab<\\\/div><div class=\\\"listelement\\\">Lobster<\\\/div><div class=\\\"listelement\\\">MedievalSharp<\\\/div><div class=\\\"listelement\\\">Modern Antiqua<\\\/div><div class=\\\"listelement\\\">Neuton<\\\/div><div class=\\\"listelement\\\">Open Sans<\\\/div><div class=\\\"listelement\\\">Open Sans Condensed<\\\/div><div class=\\\"listelement\\\">Patrick Hand<\\\/div><div class=\\\"listelement\\\">Play<\\\/div><div class=\\\"listelement\\\">Ruslan Display<\\\/div><div class=\\\"listelement\\\">Tenor Sans<\\\/div><div class=\\\"listelement\\\">Ubuntu<\\\/div><div class=\\\"listelement\\\">Varela<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"Andika\",\"text\":\"Andika\"},{\"value\":\"Anonymous Pro\",\"text\":\"Anonymous Pro\"},{\"value\":\"Anton\",\"text\":\"Anton\"},{\"value\":\"Caudex\",\"text\":\"Caudex\"},{\"value\":\"Didact Gothic\",\"text\":\"Didact Gothic\"},{\"value\":\"EB Garamond\",\"text\":\"EB Garamond\"},{\"value\":\"Forum\",\"text\":\"Forum\"},{\"value\":\"Francois One\",\"text\":\"Francois One\"},{\"value\":\"Gentium Basic\",\"text\":\"Gentium Basic\"},{\"value\":\"Gentium Book Basic\",\"text\":\"Gentium Book Basic\"},{\"value\":\"Istok Web\",\"text\":\"Istok Web\"},{\"value\":\"Jura\",\"text\":\"Jura\"},{\"value\":\"Kelly Slab\",\"text\":\"Kelly Slab\"},{\"value\":\"Lobster\",\"text\":\"Lobster\"},{\"value\":\"MedievalSharp\",\"text\":\"MedievalSharp\"},{\"value\":\"Modern Antiqua\",\"text\":\"Modern Antiqua\"},{\"value\":\"Neuton\",\"text\":\"Neuton\"},{\"value\":\"Open Sans\",\"text\":\"Open Sans\"},{\"value\":\"Open Sans Condensed\",\"text\":\"Open Sans Condensed\"},{\"value\":\"Patrick Hand\",\"text\":\"Patrick Hand\"},{\"value\":\"Play\",\"text\":\"Play\"},{\"value\":\"Ruslan Display\",\"text\":\"Ruslan Display\"},{\"value\":\"Tenor Sans\",\"text\":\"Tenor Sans\"},{\"value\":\"Ubuntu\",\"text\":\"Ubuntu\"},{\"value\":\"Varela\",\"text\":\"Varela\"}],\r\n        selectedIndex: 17,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"Vietnamese":{"name":"jform[params][moduleparametersTab][theme][titlefont]family","id":"jformparamsmoduleparametersTabthemetitlefontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemetitlefontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Open Sans<br \/>EB Garamond<br \/>Open Sans<br \/>Open Sans Condensed<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][titlefont]family\" id=\"jformparamsmoduleparametersTabthemetitlefontfamily\" value=\"Open Sans\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemetitlefontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">EB Garamond<\\\/div><div class=\\\"listelement\\\">Open Sans<\\\/div><div class=\\\"listelement\\\">Open Sans Condensed<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"EB Garamond\",\"text\":\"EB Garamond\"},{\"value\":\"Open Sans\",\"text\":\"Open Sans\"},{\"value\":\"Open Sans Condensed\",\"text\":\"Open Sans Condensed\"}],\r\n        selectedIndex: 1,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemetitlefonttype\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Latin<br \/>Alternative fonts<br \/>Cyrillic<br \/>CyrillicExtended<br \/>Greek<br \/>GreekExtended<br \/>Khmer<br \/>Latin<br \/>LatinExtended<br \/>Vietnamese<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][titlefont]type\" id=\"jformparamsmoduleparametersTabthemetitlefonttype\" value=\"Latin\"\/><\/div><\/div>"},"size":{"name":"jform[params][moduleparametersTab][theme][titlefont]size","id":"jformparamsmoduleparametersTabthemetitlefontsize","html":"<div class=\"offlajntextcontainer\" id=\"offlajntextcontainerjformparamsmoduleparametersTabthemetitlefontsize\"><input  size=\"1\" class=\"offlajntext\" type=\"text\" id=\"jformparamsmoduleparametersTabthemetitlefontsizeinput\" value=\"22\"><div class=\"offlajntext_increment\">\n                <div class=\"offlajntext_increment_up arrow\"><\/div>\n                <div class=\"offlajntext_increment_down arrow\"><\/div>\n      <\/div><\/div><div class=\"offlajnswitcher\">\r\n            <div class=\"offlajnswitcher_inner\" id=\"offlajnswitcher_innerjformparamsmoduleparametersTabthemetitlefontsizeunit\"><\/div>\r\n    <\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][titlefont]size[unit]\" id=\"jformparamsmoduleparametersTabthemetitlefontsizeunit\" value=\"px\" \/><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][titlefont]size\" id=\"jformparamsmoduleparametersTabthemetitlefontsize\" value=\"22||px\">"},"color":{"name":"jform[params][moduleparametersTab][theme][titlefont]color","id":"jformparamsmoduleparametersTabthemetitlefontcolor","html":"<div class=\"offlajncolor\"><input type=\"text\" name=\"jform[params][moduleparametersTab][theme][titlefont]color\" id=\"jformparamsmoduleparametersTabthemetitlefontcolor\" value=\"ffffff\" class=\"color wa\" size=\"12\" \/><\/div>"},"textdecor":{"name":"jform[params][moduleparametersTab][theme][titlefont]textdecor","id":"jformparamsmoduleparametersTabthemetitlefonttextdecor","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemetitlefonttextdecor\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">lighter<br \/>extralight<br \/>lighter<br \/>normal<br \/>bold<br \/>bolder<br \/>extrabold<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][titlefont]textdecor\" id=\"jformparamsmoduleparametersTabthemetitlefonttextdecor\" value=\"300\"\/><\/div><\/div>"},"italic":{"name":"jform[params][moduleparametersTab][theme][titlefont]italic","id":"jformparamsmoduleparametersTabthemetitlefontitalic","html":"<div id=\"offlajnonoffjformparamsmoduleparametersTabthemetitlefontitalic\" class=\"gk_hack onoffbutton\">\n                <div class=\"gk_hack onoffbutton_img\" style=\"background-image: url(http:\/\/localhost:8888\/fashion\/administrator\/..\/modules\/mod_improved_ajax_login\/params\/offlajnonoff\/images\/italic.png);\"><\/div>\n      <\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][titlefont]italic\" id=\"jformparamsmoduleparametersTabthemetitlefontitalic\" value=\"0\" \/>"},"underline":{"name":"jform[params][moduleparametersTab][theme][titlefont]underline","id":"jformparamsmoduleparametersTabthemetitlefontunderline","html":"<div id=\"offlajnonoffjformparamsmoduleparametersTabthemetitlefontunderline\" class=\"gk_hack onoffbutton\">\n                <div class=\"gk_hack onoffbutton_img\" style=\"background-image: url(http:\/\/localhost:8888\/fashion\/administrator\/..\/modules\/mod_improved_ajax_login\/params\/offlajnonoff\/images\/underline.png);\"><\/div>\n      <\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][titlefont]underline\" id=\"jformparamsmoduleparametersTabthemetitlefontunderline\" value=\"0\" \/>"},"align":{"name":"jform[params][moduleparametersTab][theme][titlefont]align","id":"jformparamsmoduleparametersTabthemetitlefontalign","html":"<div class=\"offlajnradiocontainerimage\" id=\"offlajnradiocontainerjformparamsmoduleparametersTabthemetitlefontalign\"><div class=\"radioelement first selected\"><div class=\"radioelement_img\" style=\"background-image: url(http:\/\/localhost:8888\/fashion\/administrator\/..\/modules\/mod_improved_ajax_login\/params\/offlajnradio\/images\/left_align.png);\"><\/div><\/div><div class=\"radioelement \"><div class=\"radioelement_img\" style=\"background-image: url(http:\/\/localhost:8888\/fashion\/administrator\/..\/modules\/mod_improved_ajax_login\/params\/offlajnradio\/images\/center_align.png);\"><\/div><\/div><div class=\"radioelement  last\"><div class=\"radioelement_img\" style=\"background-image: url(http:\/\/localhost:8888\/fashion\/administrator\/..\/modules\/mod_improved_ajax_login\/params\/offlajnradio\/images\/right_align.png);\"><\/div><\/div><div class=\"clear\"><\/div><\/div><input type=\"hidden\" id=\"jformparamsmoduleparametersTabthemetitlefontalign\" name=\"jform[params][moduleparametersTab][theme][titlefont]align\" value=\"left\"\/>"},"afont":{"name":"jform[params][moduleparametersTab][theme][titlefont]afont","id":"jformparamsmoduleparametersTabthemetitlefontafont","html":"<div class=\"offlajntextcontainer\" id=\"offlajntextcontainerjformparamsmoduleparametersTabthemetitlefontafont\"><input  size=\"10\" class=\"offlajntext\" type=\"text\" id=\"jformparamsmoduleparametersTabthemetitlefontafontinput\" value=\"Helvetica\"><\/div><div class=\"offlajnswitcher\">\r\n            <div class=\"offlajnswitcher_inner\" id=\"offlajnswitcher_innerjformparamsmoduleparametersTabthemetitlefontafontunit\"><\/div>\r\n    <\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][titlefont]afont[unit]\" id=\"jformparamsmoduleparametersTabthemetitlefontafontunit\" value=\"1\" \/><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][titlefont]afont\" id=\"jformparamsmoduleparametersTabthemetitlefontafont\" value=\"Helvetica||1\">"},"tshadow":{"name":"jform[params][moduleparametersTab][theme][titlefont]tshadow","id":"jformparamsmoduleparametersTabthemetitlefonttshadow","html":"<div id=\"offlajncombine_outerjformparamsmoduleparametersTabthemetitlefonttshadow\" class=\"offlajncombine_outer\"><div class=\"offlajncombinefieldcontainer\"><div class=\"offlajncombinefield\"><div class=\"offlajntextcontainer\" id=\"offlajntextcontainerjformparamsmoduleparametersTabthemetitlefonttshadow0\"><input  size=\"1\" class=\"offlajntext\" type=\"text\" id=\"jformparamsmoduleparametersTabthemetitlefonttshadow0input\" value=\"0\"><div class=\"unit\">px<\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][titlefont]tshadow0\" id=\"jformparamsmoduleparametersTabthemetitlefonttshadow0\" value=\"0\"><\/div><\/div><div class=\"offlajncombinefieldcontainer\"><div class=\"offlajncombinefield\"><div class=\"offlajntextcontainer\" id=\"offlajntextcontainerjformparamsmoduleparametersTabthemetitlefonttshadow1\"><input  size=\"1\" class=\"offlajntext\" type=\"text\" id=\"jformparamsmoduleparametersTabthemetitlefonttshadow1input\" value=\"0\"><div class=\"unit\">px<\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][titlefont]tshadow1\" id=\"jformparamsmoduleparametersTabthemetitlefonttshadow1\" value=\"0\"><\/div><\/div><div class=\"offlajncombinefieldcontainer\"><div class=\"offlajncombinefield\"><div class=\"offlajntextcontainer\" id=\"offlajntextcontainerjformparamsmoduleparametersTabthemetitlefonttshadow2\"><input  size=\"1\" class=\"offlajntext\" type=\"text\" id=\"jformparamsmoduleparametersTabthemetitlefonttshadow2input\" value=\"0\"><div class=\"unit\">px<\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][titlefont]tshadow2\" id=\"jformparamsmoduleparametersTabthemetitlefonttshadow2\" value=\"0\"><\/div><\/div><div class=\"offlajncombinefieldcontainer\"><div class=\"offlajncombinefield\"><div class=\"offlajncolor\"><input type=\"text\" name=\"jform[params][moduleparametersTab][theme][titlefont]tshadow3\" id=\"jformparamsmoduleparametersTabthemetitlefonttshadow3\" value=\"000000\" class=\"color \" size=\"12\" \/><\/div><\/div><\/div><div class=\"offlajncombinefieldcontainer\"><div class=\"offlajncombinefield\"><div class=\"offlajnswitcher\">\r\n            <div class=\"offlajnswitcher_inner\" id=\"offlajnswitcher_innerjformparamsmoduleparametersTabthemetitlefonttshadow4\"><\/div>\r\n    <\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][titlefont]tshadow4\" id=\"jformparamsmoduleparametersTabthemetitlefonttshadow4\" value=\"0\" \/><\/div><\/div><\/div><div class=\"offlajncombine_hider\"><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][titlefont]tshadow\" id=\"jformparamsmoduleparametersTabthemetitlefonttshadow\" value='0|*|0|*|0|*|000000|*|0'>"},"lineheight":{"name":"jform[params][moduleparametersTab][theme][titlefont]lineheight","id":"jformparamsmoduleparametersTabthemetitlefontlineheight","html":"<div class=\"offlajntextcontainer\" id=\"offlajntextcontainerjformparamsmoduleparametersTabthemetitlefontlineheight\"><input  size=\"5\" class=\"offlajntext\" type=\"text\" id=\"jformparamsmoduleparametersTabthemetitlefontlineheightinput\" value=\"30px\"><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][titlefont]lineheight\" id=\"jformparamsmoduleparametersTabthemetitlefontlineheight\" value=\"30px\">"}},
          script: "dojo.addOnLoad(function(){\r\n      new OfflajnRadio({\r\n        id: \"jformparamsmoduleparametersTabthemetitlefonttab\",\r\n        values: [\"Text\"],\r\n        map: {\"Text\":0},\r\n        mode: \"\"\r\n      });\r\n    \r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemetitlefonttype\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">Alternative fonts<\\\/div><div class=\\\"listelement\\\">Cyrillic<\\\/div><div class=\\\"listelement\\\">CyrillicExtended<\\\/div><div class=\\\"listelement\\\">Greek<\\\/div><div class=\\\"listelement\\\">GreekExtended<\\\/div><div class=\\\"listelement\\\">Khmer<\\\/div><div class=\\\"listelement\\\">Latin<\\\/div><div class=\\\"listelement\\\">LatinExtended<\\\/div><div class=\\\"listelement\\\">Vietnamese<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"0\",\"text\":\"Alternative fonts\"},{\"value\":\"Cyrillic\",\"text\":\"Cyrillic\"},{\"value\":\"CyrillicExtended\",\"text\":\"CyrillicExtended\"},{\"value\":\"Greek\",\"text\":\"Greek\"},{\"value\":\"GreekExtended\",\"text\":\"GreekExtended\"},{\"value\":\"Khmer\",\"text\":\"Khmer\"},{\"value\":\"Latin\",\"text\":\"Latin\"},{\"value\":\"LatinExtended\",\"text\":\"LatinExtended\"},{\"value\":\"Vietnamese\",\"text\":\"Vietnamese\"}],\r\n        selectedIndex: 6,\r\n        height: 0,\r\n        fireshow: 0\r\n      });\r\n    dojo.addOnLoad(function(){ \r\n      new OfflajnSwitcher({\r\n        id: \"jformparamsmoduleparametersTabthemetitlefontsizeunit\",\r\n        units: [\"px\",\"em\"],\r\n        values: [\"px\",\"em\"],\r\n        map: {\"px\":0,\"em\":1},\r\n        mode: 0,\r\n        url: \"http:\\\/\\\/localhost:8888\\\/fashion\\\/administrator\\\/..\\\/modules\\\/mod_improved_ajax_login\\\/params\\\/offlajnswitcher\\\/images\\\/\"\r\n      }); \r\n    });\n      new OfflajnText({\n        id: \"jformparamsmoduleparametersTabthemetitlefontsize\",\n        validation: \"int\",\n        attachunit: \"\",\n        mode: \"increment\",\n        scale: \"1\",\n        minus: 0,\n        onoff: \"\"\n      }); \n    \n    var el = dojo.byId(\"jformparamsmoduleparametersTabthemetitlefontcolor\");\n    jQuery.fn.jPicker.defaults.images.clientPath=\"\/fashion\/modules\/mod_improved_ajax_login\/params\/offlajndashboard\/..\/offlajncolor\/offlajncolor\/jpicker\/images\/\";\n    el.alphaSupport=false; \n    el.c = jQuery(\"#jformparamsmoduleparametersTabthemetitlefontcolor\").jPicker({\n        window:{\n          expandable: true,\n          alphaSupport: false}\n        });\n    dojo.connect(el, \"change\", function(){\n      this.c[0].color.active.val(\"hex\", this.value);\n    });\n    \r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemetitlefonttextdecor\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">extralight<\\\/div><div class=\\\"listelement\\\">lighter<\\\/div><div class=\\\"listelement\\\">normal<\\\/div><div class=\\\"listelement\\\">bold<\\\/div><div class=\\\"listelement\\\">bolder<\\\/div><div class=\\\"listelement\\\">extrabold<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"200\",\"text\":\"extralight\"},{\"value\":\"300\",\"text\":\"lighter\"},{\"value\":\"400\",\"text\":\"normal\"},{\"value\":\"600\",\"text\":\"bold\"},{\"value\":\"700\",\"text\":\"bolder\"},{\"value\":\"800\",\"text\":\"extrabold\"}],\r\n        selectedIndex: 1,\r\n        height: \"4\",\r\n        fireshow: 0\r\n      });\r\n    \n      new OfflajnOnOff({\n        id: \"jformparamsmoduleparametersTabthemetitlefontitalic\",\n        mode: \"button\",\n        imgs: \"\"\n      }); \n    \n      new OfflajnOnOff({\n        id: \"jformparamsmoduleparametersTabthemetitlefontunderline\",\n        mode: \"button\",\n        imgs: \"\"\n      }); \n    \r\n      new OfflajnRadio({\r\n        id: \"jformparamsmoduleparametersTabthemetitlefontalign\",\r\n        values: [\"left\",\"center\",\"right\"],\r\n        map: {\"left\":0,\"center\":1,\"right\":2},\r\n        mode: \"image\"\r\n      });\r\n    dojo.addOnLoad(function(){ \r\n      new OfflajnSwitcher({\r\n        id: \"jformparamsmoduleparametersTabthemetitlefontafontunit\",\r\n        units: [\"ON\",\"OFF\"],\r\n        values: [\"1\",\"0\"],\r\n        map: {\"1\":0,\"0\":1},\r\n        mode: 0,\r\n        url: \"http:\\\/\\\/localhost:8888\\\/fashion\\\/administrator\\\/..\\\/modules\\\/mod_improved_ajax_login\\\/params\\\/offlajnswitcher\\\/images\\\/\"\r\n      }); \r\n    });\n      new OfflajnText({\n        id: \"jformparamsmoduleparametersTabthemetitlefontafont\",\n        validation: \"\",\n        attachunit: \"\",\n        mode: \"\",\n        scale: \"\",\n        minus: 0,\n        onoff: \"1\"\n      }); \n    \n      new OfflajnText({\n        id: \"jformparamsmoduleparametersTabthemetitlefonttshadow0\",\n        validation: \"float\",\n        attachunit: \"px\",\n        mode: \"\",\n        scale: \"\",\n        minus: 0,\n        onoff: \"\"\n      }); \n    \n      new OfflajnText({\n        id: \"jformparamsmoduleparametersTabthemetitlefonttshadow1\",\n        validation: \"float\",\n        attachunit: \"px\",\n        mode: \"\",\n        scale: \"\",\n        minus: 0,\n        onoff: \"\"\n      }); \n    \n      new OfflajnText({\n        id: \"jformparamsmoduleparametersTabthemetitlefonttshadow2\",\n        validation: \"float\",\n        attachunit: \"px\",\n        mode: \"\",\n        scale: \"\",\n        minus: 0,\n        onoff: \"\"\n      }); \n    \n    var el = dojo.byId(\"jformparamsmoduleparametersTabthemetitlefonttshadow3\");\n    jQuery.fn.jPicker.defaults.images.clientPath=\"\/fashion\/modules\/mod_improved_ajax_login\/params\/offlajndashboard\/..\/offlajncolor\/offlajncolor\/jpicker\/images\/\";\n    el.alphaSupport=true; \n    el.c = jQuery(\"#jformparamsmoduleparametersTabthemetitlefonttshadow3\").jPicker({\n        window:{\n          expandable: true,\n          alphaSupport: true}\n        });\n    dojo.connect(el, \"change\", function(){\n      this.c[0].color.active.val(\"hex\", this.value);\n    });\n    dojo.addOnLoad(function(){ \r\n      new OfflajnSwitcher({\r\n        id: \"jformparamsmoduleparametersTabthemetitlefonttshadow4\",\r\n        units: [\"ON\",\"OFF\"],\r\n        values: [\"1\",\"0\"],\r\n        map: {\"1\":0,\"0\":1},\r\n        mode: 0,\r\n        url: \"http:\\\/\\\/localhost:8888\\\/fashion\\\/administrator\\\/..\\\/modules\\\/mod_improved_ajax_login\\\/params\\\/offlajnswitcher\\\/images\\\/\"\r\n      }); \r\n    });\r\n      new OfflajnCombine({\r\n        id: \"jformparamsmoduleparametersTabthemetitlefonttshadow\",\r\n        num: 5,\r\n        switcherid: \"jformparamsmoduleparametersTabthemetitlefonttshadow4\",\r\n        hideafter: \"0\",\r\n        islist: \"0\"\r\n      }); \r\n    \n      new OfflajnText({\n        id: \"jformparamsmoduleparametersTabthemetitlefontlineheight\",\n        validation: \"\",\n        attachunit: \"\",\n        mode: \"\",\n        scale: \"\",\n        minus: 0,\n        onoff: \"\"\n      }); \n    });"
        });
    

        new FontConfigurator({
          id: "jformparamsmoduleparametersTabthemebtnfont",
          defaultTab: "Text",
          origsettings: {"Text":{"lineheight":"normal","type":"Latin","family":"Open Sans","subset":"Latin","size":"20||px","color":"ffffff","tshadow":"1||px|*|1||px|*|0|*|00000000|*|0|*|","afont":"Helvetica||1","bold":"0","textdecor":"300"}},
          elements: {"tab":{"name":"jform[params][moduleparametersTab][theme][btnfont]tab","id":"jformparamsmoduleparametersTabthemebtnfonttab","html":"<div class=\"offlajnradiocontainerbutton\" id=\"offlajnradiocontainerjformparamsmoduleparametersTabthemebtnfonttab\"><div class=\"radioelement first last selected\">Text<\/div><div class=\"clear\"><\/div><\/div><input type=\"hidden\" id=\"jformparamsmoduleparametersTabthemebtnfonttab\" name=\"jform[params][moduleparametersTab][theme][btnfont]tab\" value=\"Text\"\/>"},"type":{"name":"jform[params][moduleparametersTab][theme][btnfont]type","id":"jformparamsmoduleparametersTabthemebtnfonttype","Cyrillic":{"name":"jform[params][moduleparametersTab][theme][btnfont]family","id":"jformparamsmoduleparametersTabthemebtnfontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemebtnfontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Open Sans<br \/>Andika<br \/>Anonymous Pro<br \/>Cuprum<br \/>Didact Gothic<br \/>EB Garamond<br \/>Istok Web<br \/>Jura<br \/>Forum<br \/>Kelly Slab<br \/>Lobster<br \/>Neucha<br \/>Open Sans<br \/>Open Sans Condensed<br \/>Philosopher<br \/>Play<br \/>PT Sans<br \/>PT Sans Caption<br \/>PT Sans Narrow<br \/>PT Serif<br \/>PT Serif Caption<br \/>Ruslan Display<br \/>Tenor Sans<br \/>Ubuntu<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][btnfont]family\" id=\"jformparamsmoduleparametersTabthemebtnfontfamily\" value=\"Open Sans\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemebtnfontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">Andika<\\\/div><div class=\\\"listelement\\\">Anonymous Pro<\\\/div><div class=\\\"listelement\\\">Cuprum<\\\/div><div class=\\\"listelement\\\">Didact Gothic<\\\/div><div class=\\\"listelement\\\">EB Garamond<\\\/div><div class=\\\"listelement\\\">Istok Web<\\\/div><div class=\\\"listelement\\\">Jura<\\\/div><div class=\\\"listelement\\\">Forum<\\\/div><div class=\\\"listelement\\\">Kelly Slab<\\\/div><div class=\\\"listelement\\\">Lobster<\\\/div><div class=\\\"listelement\\\">Neucha<\\\/div><div class=\\\"listelement\\\">Open Sans<\\\/div><div class=\\\"listelement\\\">Open Sans Condensed<\\\/div><div class=\\\"listelement\\\">Philosopher<\\\/div><div class=\\\"listelement\\\">Play<\\\/div><div class=\\\"listelement\\\">PT Sans<\\\/div><div class=\\\"listelement\\\">PT Sans Caption<\\\/div><div class=\\\"listelement\\\">PT Sans Narrow<\\\/div><div class=\\\"listelement\\\">PT Serif<\\\/div><div class=\\\"listelement\\\">PT Serif Caption<\\\/div><div class=\\\"listelement\\\">Ruslan Display<\\\/div><div class=\\\"listelement\\\">Tenor Sans<\\\/div><div class=\\\"listelement\\\">Ubuntu<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"Andika\",\"text\":\"Andika\"},{\"value\":\"Anonymous Pro\",\"text\":\"Anonymous Pro\"},{\"value\":\"Cuprum\",\"text\":\"Cuprum\"},{\"value\":\"Didact Gothic\",\"text\":\"Didact Gothic\"},{\"value\":\"EB Garamond\",\"text\":\"EB Garamond\"},{\"value\":\"Istok Web\",\"text\":\"Istok Web\"},{\"value\":\"Jura\",\"text\":\"Jura\"},{\"value\":\"Forum\",\"text\":\"Forum\"},{\"value\":\"Kelly Slab\",\"text\":\"Kelly Slab\"},{\"value\":\"Lobster\",\"text\":\"Lobster\"},{\"value\":\"Neucha\",\"text\":\"Neucha\"},{\"value\":\"Open Sans\",\"text\":\"Open Sans\"},{\"value\":\"Open Sans Condensed\",\"text\":\"Open Sans Condensed\"},{\"value\":\"Philosopher\",\"text\":\"Philosopher\"},{\"value\":\"Play\",\"text\":\"Play\"},{\"value\":\"PT Sans\",\"text\":\"PT Sans\"},{\"value\":\"PT Sans Caption\",\"text\":\"PT Sans Caption\"},{\"value\":\"PT Sans Narrow\",\"text\":\"PT Sans Narrow\"},{\"value\":\"PT Serif\",\"text\":\"PT Serif\"},{\"value\":\"PT Serif Caption\",\"text\":\"PT Serif Caption\"},{\"value\":\"Ruslan Display\",\"text\":\"Ruslan Display\"},{\"value\":\"Tenor Sans\",\"text\":\"Tenor Sans\"},{\"value\":\"Ubuntu\",\"text\":\"Ubuntu\"}],\r\n        selectedIndex: 11,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"CyrillicExtended":{"name":"jform[params][moduleparametersTab][theme][btnfont]family","id":"jformparamsmoduleparametersTabthemebtnfontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemebtnfontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Open Sans<br \/>Andika<br \/>Anonymous Pro<br \/>Didact Gothic<br \/>EB Garamond<br \/>Istok Web<br \/>Jura<br \/>Forum<br \/>Lobster<br \/>Open Sans<br \/>Open Sans Condensed<br \/>Play<br \/>Ruslan Display<br \/>Tenor Sans<br \/>Ubuntu<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][btnfont]family\" id=\"jformparamsmoduleparametersTabthemebtnfontfamily\" value=\"Open Sans\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemebtnfontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">Andika<\\\/div><div class=\\\"listelement\\\">Anonymous Pro<\\\/div><div class=\\\"listelement\\\">Didact Gothic<\\\/div><div class=\\\"listelement\\\">EB Garamond<\\\/div><div class=\\\"listelement\\\">Istok Web<\\\/div><div class=\\\"listelement\\\">Jura<\\\/div><div class=\\\"listelement\\\">Forum<\\\/div><div class=\\\"listelement\\\">Lobster<\\\/div><div class=\\\"listelement\\\">Open Sans<\\\/div><div class=\\\"listelement\\\">Open Sans Condensed<\\\/div><div class=\\\"listelement\\\">Play<\\\/div><div class=\\\"listelement\\\">Ruslan Display<\\\/div><div class=\\\"listelement\\\">Tenor Sans<\\\/div><div class=\\\"listelement\\\">Ubuntu<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"Andika\",\"text\":\"Andika\"},{\"value\":\"Anonymous Pro\",\"text\":\"Anonymous Pro\"},{\"value\":\"Didact Gothic\",\"text\":\"Didact Gothic\"},{\"value\":\"EB Garamond\",\"text\":\"EB Garamond\"},{\"value\":\"Istok Web\",\"text\":\"Istok Web\"},{\"value\":\"Jura\",\"text\":\"Jura\"},{\"value\":\"Forum\",\"text\":\"Forum\"},{\"value\":\"Lobster\",\"text\":\"Lobster\"},{\"value\":\"Open Sans\",\"text\":\"Open Sans\"},{\"value\":\"Open Sans Condensed\",\"text\":\"Open Sans Condensed\"},{\"value\":\"Play\",\"text\":\"Play\"},{\"value\":\"Ruslan Display\",\"text\":\"Ruslan Display\"},{\"value\":\"Tenor Sans\",\"text\":\"Tenor Sans\"},{\"value\":\"Ubuntu\",\"text\":\"Ubuntu\"}],\r\n        selectedIndex: 8,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"Greek":{"name":"jform[params][moduleparametersTab][theme][btnfont]family","id":"jformparamsmoduleparametersTabthemebtnfontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemebtnfontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Open Sans<br \/>Anonymous Pro<br \/>Caudex<br \/>Didact Gothic<br \/>Jura<br \/>GFS Didot<br \/>GFS Neohellenic<br \/>Nova Mono<br \/>Open Sans<br \/>Open Sans Condensed<br \/>Play<br \/>Ubuntu<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][btnfont]family\" id=\"jformparamsmoduleparametersTabthemebtnfontfamily\" value=\"Open Sans\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemebtnfontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">Anonymous Pro<\\\/div><div class=\\\"listelement\\\">Caudex<\\\/div><div class=\\\"listelement\\\">Didact Gothic<\\\/div><div class=\\\"listelement\\\">Jura<\\\/div><div class=\\\"listelement\\\">GFS Didot<\\\/div><div class=\\\"listelement\\\">GFS Neohellenic<\\\/div><div class=\\\"listelement\\\">Nova Mono<\\\/div><div class=\\\"listelement\\\">Open Sans<\\\/div><div class=\\\"listelement\\\">Open Sans Condensed<\\\/div><div class=\\\"listelement\\\">Play<\\\/div><div class=\\\"listelement\\\">Ubuntu<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"Anonymous Pro\",\"text\":\"Anonymous Pro\"},{\"value\":\"Caudex\",\"text\":\"Caudex\"},{\"value\":\"Didact Gothic\",\"text\":\"Didact Gothic\"},{\"value\":\"Jura\",\"text\":\"Jura\"},{\"value\":\"GFS Didot\",\"text\":\"GFS Didot\"},{\"value\":\"GFS Neohellenic\",\"text\":\"GFS Neohellenic\"},{\"value\":\"Nova Mono\",\"text\":\"Nova Mono\"},{\"value\":\"Open Sans\",\"text\":\"Open Sans\"},{\"value\":\"Open Sans Condensed\",\"text\":\"Open Sans Condensed\"},{\"value\":\"Play\",\"text\":\"Play\"},{\"value\":\"Ubuntu\",\"text\":\"Ubuntu\"}],\r\n        selectedIndex: 7,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"GreekExtended":{"name":"jform[params][moduleparametersTab][theme][btnfont]family","id":"jformparamsmoduleparametersTabthemebtnfontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemebtnfontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Open Sans<br \/>Anonymous Pro<br \/>Caudex<br \/>Didact Gothic<br \/>Jura<br \/>Open Sans<br \/>Open Sans Condensed<br \/>Play<br \/>Ubuntu<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][btnfont]family\" id=\"jformparamsmoduleparametersTabthemebtnfontfamily\" value=\"Open Sans\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemebtnfontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">Anonymous Pro<\\\/div><div class=\\\"listelement\\\">Caudex<\\\/div><div class=\\\"listelement\\\">Didact Gothic<\\\/div><div class=\\\"listelement\\\">Jura<\\\/div><div class=\\\"listelement\\\">Open Sans<\\\/div><div class=\\\"listelement\\\">Open Sans Condensed<\\\/div><div class=\\\"listelement\\\">Play<\\\/div><div class=\\\"listelement\\\">Ubuntu<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"Anonymous Pro\",\"text\":\"Anonymous Pro\"},{\"value\":\"Caudex\",\"text\":\"Caudex\"},{\"value\":\"Didact Gothic\",\"text\":\"Didact Gothic\"},{\"value\":\"Jura\",\"text\":\"Jura\"},{\"value\":\"Open Sans\",\"text\":\"Open Sans\"},{\"value\":\"Open Sans Condensed\",\"text\":\"Open Sans Condensed\"},{\"value\":\"Play\",\"text\":\"Play\"},{\"value\":\"Ubuntu\",\"text\":\"Ubuntu\"}],\r\n        selectedIndex: 4,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"Khmer":{"name":"jform[params][moduleparametersTab][theme][btnfont]family","id":"jformparamsmoduleparametersTabthemebtnfontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemebtnfontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Angkor<br \/>Angkor<br \/>Battambang<br \/>Bayon<br \/>Bokor<br \/>Chenla<br \/>Content<br \/>Dangrek<br \/>Freehand<br \/>Hanuman<br \/>Khmer<br \/>Koulen<br \/>Metal<br \/>Moul<br \/>Moulpali<br \/>Odor Mean Chey<br \/>Preahvihear<br \/>Siemreap<br \/>Suwannaphum<br \/>Taprom<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][btnfont]family\" id=\"jformparamsmoduleparametersTabthemebtnfontfamily\" value=\"Angkor\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemebtnfontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">Angkor<\\\/div><div class=\\\"listelement\\\">Battambang<\\\/div><div class=\\\"listelement\\\">Bayon<\\\/div><div class=\\\"listelement\\\">Bokor<\\\/div><div class=\\\"listelement\\\">Chenla<\\\/div><div class=\\\"listelement\\\">Content<\\\/div><div class=\\\"listelement\\\">Dangrek<\\\/div><div class=\\\"listelement\\\">Freehand<\\\/div><div class=\\\"listelement\\\">Hanuman<\\\/div><div class=\\\"listelement\\\">Khmer<\\\/div><div class=\\\"listelement\\\">Koulen<\\\/div><div class=\\\"listelement\\\">Metal<\\\/div><div class=\\\"listelement\\\">Moul<\\\/div><div class=\\\"listelement\\\">Moulpali<\\\/div><div class=\\\"listelement\\\">Odor Mean Chey<\\\/div><div class=\\\"listelement\\\">Preahvihear<\\\/div><div class=\\\"listelement\\\">Siemreap<\\\/div><div class=\\\"listelement\\\">Suwannaphum<\\\/div><div class=\\\"listelement\\\">Taprom<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"Angkor\",\"text\":\"Angkor\"},{\"value\":\"Battambang\",\"text\":\"Battambang\"},{\"value\":\"Bayon\",\"text\":\"Bayon\"},{\"value\":\"Bokor\",\"text\":\"Bokor\"},{\"value\":\"Chenla\",\"text\":\"Chenla\"},{\"value\":\"Content\",\"text\":\"Content\"},{\"value\":\"Dangrek\",\"text\":\"Dangrek\"},{\"value\":\"Freehand\",\"text\":\"Freehand\"},{\"value\":\"Hanuman\",\"text\":\"Hanuman\"},{\"value\":\"Khmer\",\"text\":\"Khmer\"},{\"value\":\"Koulen\",\"text\":\"Koulen\"},{\"value\":\"Metal\",\"text\":\"Metal\"},{\"value\":\"Moul\",\"text\":\"Moul\"},{\"value\":\"Moulpali\",\"text\":\"Moulpali\"},{\"value\":\"Odor Mean Chey\",\"text\":\"Odor Mean Chey\"},{\"value\":\"Preahvihear\",\"text\":\"Preahvihear\"},{\"value\":\"Siemreap\",\"text\":\"Siemreap\"},{\"value\":\"Suwannaphum\",\"text\":\"Suwannaphum\"},{\"value\":\"Taprom\",\"text\":\"Taprom\"}],\r\n        selectedIndex: 0,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"Latin":{"name":"jform[params][moduleparametersTab][theme][btnfont]family","id":"jformparamsmoduleparametersTabthemebtnfontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemebtnfontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Open Sans<br \/>ABeeZee<br \/>Abel<br \/>Abril Fatface<br \/>Aclonica<br \/>Acme<br \/>Actor<br \/>Adamina<br \/>Advent Pro<br \/>Aguafina Script<br \/>Akronim<br \/>Aladin<br \/>Aldrich<br \/>Alegreya<br \/>Alegreya SC<br \/>Alex Brush<br \/>Alfa Slab One<br \/>Alice<br \/>Alike<br \/>Alike Angular<br \/>Allan<br \/>Allerta<br \/>Allerta Stencil<br \/>Allura<br \/>Almendra<br \/>Almendra Display<br \/>Almendra SC<br \/>Amarante<br \/>Amaranth<br \/>Amatic SC<br \/>Amethysta<br \/>Anaheim<br \/>Andada<br \/>Andika<br \/>Angkor<br \/>Annie Use Your Telescope<br \/>Anonymous Pro<br \/>Antic<br \/>Antic Didone<br \/>Antic Slab<br \/>Anton<br \/>Arapey<br \/>Arbutus<br \/>Arbutus Slab<br \/>Architects Daughter<br \/>Archivo Black<br \/>Archivo Narrow<br \/>Arimo<br \/>Arizonia<br \/>Armata<br \/>Artifika<br \/>Arvo<br \/>Asap<br \/>Asset<br \/>Astloch<br \/>Asul<br \/>Atomic Age<br \/>Aubrey<br \/>Audiowide<br \/>Autour One<br \/>Average<br \/>Average Sans<br \/>Averia Gruesa Libre<br \/>Averia Libre<br \/>Averia Sans Libre<br \/>Averia Serif Libre<br \/>Bad Script<br \/>Balthazar<br \/>Bangers<br \/>Basic<br \/>Battambang<br \/>Baumans<br \/>Bayon<br \/>Belgrano<br \/>Belleza<br \/>BenchNine<br \/>Bentham<br \/>Berkshire Swash<br \/>Bevan<br \/>Bigelow Rules<br \/>Bigshot One<br \/>Bilbo<br \/>Bilbo Swash Caps<br \/>Bitter<br \/>Black Ops One<br \/>Bokor<br \/>Bonbon<br \/>Boogaloo<br \/>Bowlby One<br \/>Bowlby One SC<br \/>Brawler<br \/>Bree Serif<br \/>Bubblegum Sans<br \/>Bubbler One<br \/>Buda<br \/>Buenard<br \/>Butcherman<br \/>Butterfly Kids<br \/>Cabin<br \/>Cabin Condensed<br \/>Cabin Sketch<br \/>Caesar Dressing<br \/>Cagliostro<br \/>Calligraffitti<br \/>Cambo<br \/>Candal<br \/>Cantarell<br \/>Cantata One<br \/>Cantora One<br \/>Capriola<br \/>Cardo<br \/>Carme<br \/>Carrois Gothic<br \/>Carrois Gothic SC<br \/>Carter One<br \/>Caudex<br \/>Cedarville Cursive<br \/>Ceviche One<br \/>Changa One<br \/>Chango<br \/>Chau Philomene One<br \/>Chela One<br \/>Chelsea Market<br \/>Chenla<br \/>Cherry Cream Soda<br \/>Cherry Swash<br \/>Chewy<br \/>Chicle<br \/>Chivo<br \/>Cinzel<br \/>Cinzel Decorative<br \/>Clicker Script<br \/>Coda<br \/>Coda Caption<br \/>Codystar<br \/>Combo<br \/>Comfortaa<br \/>Coming Soon<br \/>Concert One<br \/>Condiment<br \/>Content<br \/>Contrail One<br \/>Convergence<br \/>Cookie<br \/>Copse<br \/>Corben<br \/>Courgette<br \/>Cousine<br \/>Coustard<br \/>Covered By Your Grace<br \/>Crafty Girls<br \/>Creepster<br \/>Crete Round<br \/>Crimson Text<br \/>Croissant One<br \/>Crushed<br \/>Cuprum<br \/>Cutive<br \/>Cutive Mono<br \/>Damion<br \/>Dancing Script<br \/>Dangrek<br \/>Dawning of a New Day<br \/>Days One<br \/>Delius<br \/>Delius Swash Caps<br \/>Delius Unicase<br \/>Della Respira<br \/>Devonshire<br \/>Didact Gothic<br \/>Diplomata<br \/>Diplomata SC<br \/>Doppio One<br \/>Dorsa<br \/>Dosis<br \/>Dr Sugiyama<br \/>Droid Sans<br \/>Droid Sans Mono<br \/>Droid Serif<br \/>Duru Sans<br \/>Dynalight<br \/>EB Garamond<br \/>Eagle Lake<br \/>Eater<br \/>Economica<br \/>Electrolize<br \/>Emblema One<br \/>Emilys Candy<br \/>Engagement<br \/>Englebert<br \/>Enriqueta<br \/>Erica One<br \/>Esteban<br \/>Euphoria Script<br \/>Ewert<br \/>Exo<br \/>Expletus Sans<br \/>Fanwood Text<br \/>Fascinate<br \/>Fascinate Inline<br \/>Faster One<br \/>Fasthand<br \/>Federant<br \/>Federo<br \/>Felipa<br \/>Fenix<br \/>Finger Paint<br \/>Fjord One<br \/>Flamenco<br \/>Flavors<br \/>Fondamento<br \/>Fontdiner Swanky<br \/>Forum<br \/>Francois One<br \/>Freckle Face<br \/>Fredericka the Great<br \/>Fredoka One<br \/>Freehand<br \/>Fresca<br \/>Frijole<br \/>Fugaz One<br \/>GFS Didot<br \/>GFS Neohellenic<br \/>Gafata<br \/>Galdeano<br \/>Galindo<br \/>Gentium Basic<br \/>Gentium Book Basic<br \/>Geo<br \/>Geostar<br \/>Geostar Fill<br \/>Germania One<br \/>Gilda Display<br \/>Give You Glory<br \/>Glass Antiqua<br \/>Glegoo<br \/>Gloria Hallelujah<br \/>Goblin One<br \/>Gochi Hand<br \/>Gorditas<br \/>Goudy Bookletter 1911<br \/>Graduate<br \/>Gravitas One<br \/>Great Vibes<br \/>Griffy<br \/>Gruppo<br \/>Gudea<br \/>Habibi<br \/>Hammersmith One<br \/>Hanalei<br \/>Hanalei Fill<br \/>Handlee<br \/>Hanuman<br \/>Happy Monkey<br \/>Headland One<br \/>Henny Penny<br \/>Herr Von Muellerhoff<br \/>Holtwood One SC<br \/>Homemade Apple<br \/>Homenaje<br \/>IM Fell DW Pica<br \/>IM Fell DW Pica SC<br \/>IM Fell Double Pica<br \/>IM Fell Double Pica SC<br \/>IM Fell English<br \/>IM Fell English SC<br \/>IM Fell French Canon<br \/>IM Fell French Canon SC<br \/>IM Fell Great Primer<br \/>IM Fell Great Primer SC<br \/>Iceberg<br \/>Iceland<br \/>Imprima<br \/>Inconsolata<br \/>Inder<br \/>Indie Flower<br \/>Inika<br \/>Irish Grover<br \/>Istok Web<br \/>Italiana<br \/>Italianno<br \/>Jacques Francois<br \/>Jacques Francois Shadow<br \/>Jim Nightshade<br \/>Jockey One<br \/>Jolly Lodger<br \/>Josefin Sans<br \/>Josefin Slab<br \/>Joti One<br \/>Judson<br \/>Julee<br \/>Julius Sans One<br \/>Junge<br \/>Jura<br \/>Just Another Hand<br \/>Just Me Again Down Here<br \/>Kameron<br \/>Karla<br \/>Kaushan Script<br \/>Keania One<br \/>Kelly Slab<br \/>Kenia<br \/>Khmer<br \/>Kite One<br \/>Knewave<br \/>Kotta One<br \/>Koulen<br \/>Kranky<br \/>Kreon<br \/>Kristi<br \/>Krona One<br \/>La Belle Aurore<br \/>Lancelot<br \/>Lato<br \/>League Script<br \/>Leckerli One<br \/>Ledger<br \/>Lekton<br \/>Lemon<br \/>Life Savers<br \/>Lilita One<br \/>Limelight<br \/>Linden Hill<br \/>Lobster<br \/>Lobster Two<br \/>Londrina Outline<br \/>Londrina Shadow<br \/>Londrina Sketch<br \/>Londrina Solid<br \/>Lora<br \/>Love Ya Like A Sister<br \/>Loved by the King<br \/>Lovers Quarrel<br \/>Luckiest Guy<br \/>Lusitana<br \/>Lustria<br \/>Macondo<br \/>Macondo Swash Caps<br \/>Magra<br \/>Maiden Orange<br \/>Mako<br \/>Marcellus<br \/>Marcellus SC<br \/>Marck Script<br \/>Margarine<br \/>Marko One<br \/>Marmelad<br \/>Marvel<br \/>Mate<br \/>Mate SC<br \/>Maven Pro<br \/>McLaren<br \/>Meddon<br \/>MedievalSharp<br \/>Medula One<br \/>Megrim<br \/>Meie Script<br \/>Merienda<br \/>Merienda One<br \/>Merriweather<br \/>Metal<br \/>Metal Mania<br \/>Metamorphous<br \/>Metrophobic<br \/>Michroma<br \/>Miltonian<br \/>Miltonian Tattoo<br \/>Miniver<br \/>Miss Fajardose<br \/>Modern Antiqua<br \/>Molengo<br \/>Molle<br \/>Monofett<br \/>Monoton<br \/>Monsieur La Doulaise<br \/>Montaga<br \/>Montez<br \/>Montserrat<br \/>Montserrat Alternates<br \/>Montserrat Subrayada<br \/>Moul<br \/>Moulpali<br \/>Mountains of Christmas<br \/>Mouse Memoirs<br \/>Mr Bedfort<br \/>Mr Dafoe<br \/>Mr De Haviland<br \/>Mrs Saint Delafield<br \/>Mrs Sheppards<br \/>Muli<br \/>Mystery Quest<br \/>Neucha<br \/>Neuton<br \/>News Cycle<br \/>Niconne<br \/>Nixie One<br \/>Nobile<br \/>Nokora<br \/>Norican<br \/>Nosifer<br \/>Nothing You Could Do<br \/>Noticia Text<br \/>Nova Cut<br \/>Nova Flat<br \/>Nova Mono<br \/>Nova Oval<br \/>Nova Round<br \/>Nova Script<br \/>Nova Slim<br \/>Nova Square<br \/>Numans<br \/>Nunito<br \/>Odor Mean Chey<br \/>Offside<br \/>Old Standard TT<br \/>Oldenburg<br \/>Oleo Script<br \/>Oleo Script Swash Caps<br \/>Open Sans<br \/>Open Sans Condensed<br \/>Oranienbaum<br \/>Orbitron<br \/>Oregano<br \/>Orienta<br \/>Original Surfer<br \/>Oswald<br \/>Over the Rainbow<br \/>Overlock<br \/>Overlock SC<br \/>Ovo<br \/>Oxygen<br \/>Oxygen Mono<br \/>PT Mono<br \/>PT Sans<br \/>PT Sans Caption<br \/>PT Sans Narrow<br \/>PT Serif<br \/>PT Serif Caption<br \/>Pacifico<br \/>Paprika<br \/>Parisienne<br \/>Passero One<br \/>Passion One<br \/>Patrick Hand<br \/>Patua One<br \/>Paytone One<br \/>Peralta<br \/>Permanent Marker<br \/>Petit Formal Script<br \/>Petrona<br \/>Philosopher<br \/>Piedra<br \/>Pinyon Script<br \/>Pirata One<br \/>Plaster<br \/>Play<br \/>Playball<br \/>Playfair Display<br \/>Playfair Display SC<br \/>Podkova<br \/>Poiret One<br \/>Poller One<br \/>Poly<br \/>Pompiere<br \/>Pontano Sans<br \/>Port Lligat Sans<br \/>Port Lligat Slab<br \/>Prata<br \/>Preahvihear<br \/>Press Start 2P<br \/>Princess Sofia<br \/>Prociono<br \/>Prosto One<br \/>Puritan<br \/>Purple Purse<br \/>Quando<br \/>Quantico<br \/>Quattrocento<br \/>Quattrocento Sans<br \/>Questrial<br \/>Quicksand<br \/>Quintessential<br \/>Qwigley<br \/>Racing Sans One<br \/>Radley<br \/>Raleway<br \/>Raleway Dots<br \/>Rambla<br \/>Rammetto One<br \/>Ranchers<br \/>Rancho<br \/>Rationale<br \/>Redressed<br \/>Reenie Beanie<br \/>Revalia<br \/>Ribeye<br \/>Ribeye Marrow<br \/>Righteous<br \/>Risque<br \/>Rochester<br \/>Rock Salt<br \/>Rokkitt<br \/>Romanesco<br \/>Ropa Sans<br \/>Rosario<br \/>Rosarivo<br \/>Rouge Script<br \/>Ruda<br \/>Rufina<br \/>Ruge Boogie<br \/>Ruluko<br \/>Rum Raisin<br \/>Ruslan Display<br \/>Russo One<br \/>Ruthie<br \/>Rye<br \/>Sacramento<br \/>Sail<br \/>Salsa<br \/>Sanchez<br \/>Sancreek<br \/>Sansita One<br \/>Sarina<br \/>Satisfy<br \/>Scada<br \/>Schoolbell<br \/>Seaweed Script<br \/>Sevillana<br \/>Seymour One<br \/>Shadows Into Light<br \/>Shadows Into Light Two<br \/>Shanti<br \/>Share<br \/>Share Tech<br \/>Share Tech Mono<br \/>Shojumaru<br \/>Short Stack<br \/>Siemreap<br \/>Sigmar One<br \/>Signika<br \/>Signika Negative<br \/>Simonetta<br \/>Sirin Stencil<br \/>Six Caps<br \/>Skranji<br \/>Slackey<br \/>Smokum<br \/>Smythe<br \/>Sniglet<br \/>Snippet<br \/>Snowburst One<br \/>Sofadi One<br \/>Sofia<br \/>Sonsie One<br \/>Sorts Mill Goudy<br \/>Source Code Pro<br \/>Source Sans Pro<br \/>Special Elite<br \/>Spicy Rice<br \/>Spinnaker<br \/>Spirax<br \/>Squada One<br \/>Stalemate<br \/>Stalinist One<br \/>Stardos Stencil<br \/>Stint Ultra Condensed<br \/>Stint Ultra Expanded<br \/>Stoke<br \/>Strait<br \/>Sue Ellen Francisco<br \/>Sunshiney<br \/>Supermercado One<br \/>Suwannaphum<br \/>Swanky and Moo Moo<br \/>Syncopate<br \/>Tangerine<br \/>Taprom<br \/>Telex<br \/>Tenor Sans<br \/>Text Me One<br \/>The Girl Next Door<br \/>Tienne<br \/>Tinos<br \/>Titan One<br \/>Titillium Web<br \/>Trade Winds<br \/>Trocchi<br \/>Trochut<br \/>Trykker<br \/>Tulpen One<br \/>Ubuntu<br \/>Ubuntu Condensed<br \/>Ubuntu Mono<br \/>Ultra<br \/>Uncial Antiqua<br \/>Underdog<br \/>Unica One<br \/>UnifrakturCook<br \/>UnifrakturMaguntia<br \/>Unkempt<br \/>Unlock<br \/>Unna<br \/>VT323<br \/>Vampiro One<br \/>Varela<br \/>Varela Round<br \/>Vast Shadow<br \/>Vibur<br \/>Vidaloka<br \/>Viga<br \/>Voces<br \/>Volkhov<br \/>Vollkorn<br \/>Voltaire<br \/>Waiting for the Sunrise<br \/>Wallpoet<br \/>Walter Turncoat<br \/>Warnes<br \/>Wellfleet<br \/>Wire One<br \/>Yanone Kaffeesatz<br \/>Yellowtail<br \/>Yeseva One<br \/>Yesteryear<br \/>Zeyada<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][btnfont]family\" id=\"jformparamsmoduleparametersTabthemebtnfontfamily\" value=\"Open Sans\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemebtnfontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">ABeeZee<\\\/div><div class=\\\"listelement\\\">Abel<\\\/div><div class=\\\"listelement\\\">Abril Fatface<\\\/div><div class=\\\"listelement\\\">Aclonica<\\\/div><div class=\\\"listelement\\\">Acme<\\\/div><div class=\\\"listelement\\\">Actor<\\\/div><div class=\\\"listelement\\\">Adamina<\\\/div><div class=\\\"listelement\\\">Advent Pro<\\\/div><div class=\\\"listelement\\\">Aguafina Script<\\\/div><div class=\\\"listelement\\\">Akronim<\\\/div><div class=\\\"listelement\\\">Aladin<\\\/div><div class=\\\"listelement\\\">Aldrich<\\\/div><div class=\\\"listelement\\\">Alegreya<\\\/div><div class=\\\"listelement\\\">Alegreya SC<\\\/div><div class=\\\"listelement\\\">Alex Brush<\\\/div><div class=\\\"listelement\\\">Alfa Slab One<\\\/div><div class=\\\"listelement\\\">Alice<\\\/div><div class=\\\"listelement\\\">Alike<\\\/div><div class=\\\"listelement\\\">Alike Angular<\\\/div><div class=\\\"listelement\\\">Allan<\\\/div><div class=\\\"listelement\\\">Allerta<\\\/div><div class=\\\"listelement\\\">Allerta Stencil<\\\/div><div class=\\\"listelement\\\">Allura<\\\/div><div class=\\\"listelement\\\">Almendra<\\\/div><div class=\\\"listelement\\\">Almendra Display<\\\/div><div class=\\\"listelement\\\">Almendra SC<\\\/div><div class=\\\"listelement\\\">Amarante<\\\/div><div class=\\\"listelement\\\">Amaranth<\\\/div><div class=\\\"listelement\\\">Amatic SC<\\\/div><div class=\\\"listelement\\\">Amethysta<\\\/div><div class=\\\"listelement\\\">Anaheim<\\\/div><div class=\\\"listelement\\\">Andada<\\\/div><div class=\\\"listelement\\\">Andika<\\\/div><div class=\\\"listelement\\\">Angkor<\\\/div><div class=\\\"listelement\\\">Annie Use Your Telescope<\\\/div><div class=\\\"listelement\\\">Anonymous Pro<\\\/div><div class=\\\"listelement\\\">Antic<\\\/div><div class=\\\"listelement\\\">Antic Didone<\\\/div><div class=\\\"listelement\\\">Antic Slab<\\\/div><div class=\\\"listelement\\\">Anton<\\\/div><div class=\\\"listelement\\\">Arapey<\\\/div><div class=\\\"listelement\\\">Arbutus<\\\/div><div class=\\\"listelement\\\">Arbutus Slab<\\\/div><div class=\\\"listelement\\\">Architects Daughter<\\\/div><div class=\\\"listelement\\\">Archivo Black<\\\/div><div class=\\\"listelement\\\">Archivo Narrow<\\\/div><div class=\\\"listelement\\\">Arimo<\\\/div><div class=\\\"listelement\\\">Arizonia<\\\/div><div class=\\\"listelement\\\">Armata<\\\/div><div class=\\\"listelement\\\">Artifika<\\\/div><div class=\\\"listelement\\\">Arvo<\\\/div><div class=\\\"listelement\\\">Asap<\\\/div><div class=\\\"listelement\\\">Asset<\\\/div><div class=\\\"listelement\\\">Astloch<\\\/div><div class=\\\"listelement\\\">Asul<\\\/div><div class=\\\"listelement\\\">Atomic Age<\\\/div><div class=\\\"listelement\\\">Aubrey<\\\/div><div class=\\\"listelement\\\">Audiowide<\\\/div><div class=\\\"listelement\\\">Autour One<\\\/div><div class=\\\"listelement\\\">Average<\\\/div><div class=\\\"listelement\\\">Average Sans<\\\/div><div class=\\\"listelement\\\">Averia Gruesa Libre<\\\/div><div class=\\\"listelement\\\">Averia Libre<\\\/div><div class=\\\"listelement\\\">Averia Sans Libre<\\\/div><div class=\\\"listelement\\\">Averia Serif Libre<\\\/div><div class=\\\"listelement\\\">Bad Script<\\\/div><div class=\\\"listelement\\\">Balthazar<\\\/div><div class=\\\"listelement\\\">Bangers<\\\/div><div class=\\\"listelement\\\">Basic<\\\/div><div class=\\\"listelement\\\">Battambang<\\\/div><div class=\\\"listelement\\\">Baumans<\\\/div><div class=\\\"listelement\\\">Bayon<\\\/div><div class=\\\"listelement\\\">Belgrano<\\\/div><div class=\\\"listelement\\\">Belleza<\\\/div><div class=\\\"listelement\\\">BenchNine<\\\/div><div class=\\\"listelement\\\">Bentham<\\\/div><div class=\\\"listelement\\\">Berkshire Swash<\\\/div><div class=\\\"listelement\\\">Bevan<\\\/div><div class=\\\"listelement\\\">Bigelow Rules<\\\/div><div class=\\\"listelement\\\">Bigshot One<\\\/div><div class=\\\"listelement\\\">Bilbo<\\\/div><div class=\\\"listelement\\\">Bilbo Swash Caps<\\\/div><div class=\\\"listelement\\\">Bitter<\\\/div><div class=\\\"listelement\\\">Black Ops One<\\\/div><div class=\\\"listelement\\\">Bokor<\\\/div><div class=\\\"listelement\\\">Bonbon<\\\/div><div class=\\\"listelement\\\">Boogaloo<\\\/div><div class=\\\"listelement\\\">Bowlby One<\\\/div><div class=\\\"listelement\\\">Bowlby One SC<\\\/div><div class=\\\"listelement\\\">Brawler<\\\/div><div class=\\\"listelement\\\">Bree Serif<\\\/div><div class=\\\"listelement\\\">Bubblegum Sans<\\\/div><div class=\\\"listelement\\\">Bubbler One<\\\/div><div class=\\\"listelement\\\">Buda<\\\/div><div class=\\\"listelement\\\">Buenard<\\\/div><div class=\\\"listelement\\\">Butcherman<\\\/div><div class=\\\"listelement\\\">Butterfly Kids<\\\/div><div class=\\\"listelement\\\">Cabin<\\\/div><div class=\\\"listelement\\\">Cabin Condensed<\\\/div><div class=\\\"listelement\\\">Cabin Sketch<\\\/div><div class=\\\"listelement\\\">Caesar Dressing<\\\/div><div class=\\\"listelement\\\">Cagliostro<\\\/div><div class=\\\"listelement\\\">Calligraffitti<\\\/div><div class=\\\"listelement\\\">Cambo<\\\/div><div class=\\\"listelement\\\">Candal<\\\/div><div class=\\\"listelement\\\">Cantarell<\\\/div><div class=\\\"listelement\\\">Cantata One<\\\/div><div class=\\\"listelement\\\">Cantora One<\\\/div><div class=\\\"listelement\\\">Capriola<\\\/div><div class=\\\"listelement\\\">Cardo<\\\/div><div class=\\\"listelement\\\">Carme<\\\/div><div class=\\\"listelement\\\">Carrois Gothic<\\\/div><div class=\\\"listelement\\\">Carrois Gothic SC<\\\/div><div class=\\\"listelement\\\">Carter One<\\\/div><div class=\\\"listelement\\\">Caudex<\\\/div><div class=\\\"listelement\\\">Cedarville Cursive<\\\/div><div class=\\\"listelement\\\">Ceviche One<\\\/div><div class=\\\"listelement\\\">Changa One<\\\/div><div class=\\\"listelement\\\">Chango<\\\/div><div class=\\\"listelement\\\">Chau Philomene One<\\\/div><div class=\\\"listelement\\\">Chela One<\\\/div><div class=\\\"listelement\\\">Chelsea Market<\\\/div><div class=\\\"listelement\\\">Chenla<\\\/div><div class=\\\"listelement\\\">Cherry Cream Soda<\\\/div><div class=\\\"listelement\\\">Cherry Swash<\\\/div><div class=\\\"listelement\\\">Chewy<\\\/div><div class=\\\"listelement\\\">Chicle<\\\/div><div class=\\\"listelement\\\">Chivo<\\\/div><div class=\\\"listelement\\\">Cinzel<\\\/div><div class=\\\"listelement\\\">Cinzel Decorative<\\\/div><div class=\\\"listelement\\\">Clicker Script<\\\/div><div class=\\\"listelement\\\">Coda<\\\/div><div class=\\\"listelement\\\">Coda Caption<\\\/div><div class=\\\"listelement\\\">Codystar<\\\/div><div class=\\\"listelement\\\">Combo<\\\/div><div class=\\\"listelement\\\">Comfortaa<\\\/div><div class=\\\"listelement\\\">Coming Soon<\\\/div><div class=\\\"listelement\\\">Concert One<\\\/div><div class=\\\"listelement\\\">Condiment<\\\/div><div class=\\\"listelement\\\">Content<\\\/div><div class=\\\"listelement\\\">Contrail One<\\\/div><div class=\\\"listelement\\\">Convergence<\\\/div><div class=\\\"listelement\\\">Cookie<\\\/div><div class=\\\"listelement\\\">Copse<\\\/div><div class=\\\"listelement\\\">Corben<\\\/div><div class=\\\"listelement\\\">Courgette<\\\/div><div class=\\\"listelement\\\">Cousine<\\\/div><div class=\\\"listelement\\\">Coustard<\\\/div><div class=\\\"listelement\\\">Covered By Your Grace<\\\/div><div class=\\\"listelement\\\">Crafty Girls<\\\/div><div class=\\\"listelement\\\">Creepster<\\\/div><div class=\\\"listelement\\\">Crete Round<\\\/div><div class=\\\"listelement\\\">Crimson Text<\\\/div><div class=\\\"listelement\\\">Croissant One<\\\/div><div class=\\\"listelement\\\">Crushed<\\\/div><div class=\\\"listelement\\\">Cuprum<\\\/div><div class=\\\"listelement\\\">Cutive<\\\/div><div class=\\\"listelement\\\">Cutive Mono<\\\/div><div class=\\\"listelement\\\">Damion<\\\/div><div class=\\\"listelement\\\">Dancing Script<\\\/div><div class=\\\"listelement\\\">Dangrek<\\\/div><div class=\\\"listelement\\\">Dawning of a New Day<\\\/div><div class=\\\"listelement\\\">Days One<\\\/div><div class=\\\"listelement\\\">Delius<\\\/div><div class=\\\"listelement\\\">Delius Swash Caps<\\\/div><div class=\\\"listelement\\\">Delius Unicase<\\\/div><div class=\\\"listelement\\\">Della Respira<\\\/div><div class=\\\"listelement\\\">Devonshire<\\\/div><div class=\\\"listelement\\\">Didact Gothic<\\\/div><div class=\\\"listelement\\\">Diplomata<\\\/div><div class=\\\"listelement\\\">Diplomata SC<\\\/div><div class=\\\"listelement\\\">Doppio One<\\\/div><div class=\\\"listelement\\\">Dorsa<\\\/div><div class=\\\"listelement\\\">Dosis<\\\/div><div class=\\\"listelement\\\">Dr Sugiyama<\\\/div><div class=\\\"listelement\\\">Droid Sans<\\\/div><div class=\\\"listelement\\\">Droid Sans Mono<\\\/div><div class=\\\"listelement\\\">Droid Serif<\\\/div><div class=\\\"listelement\\\">Duru Sans<\\\/div><div class=\\\"listelement\\\">Dynalight<\\\/div><div class=\\\"listelement\\\">EB Garamond<\\\/div><div class=\\\"listelement\\\">Eagle Lake<\\\/div><div class=\\\"listelement\\\">Eater<\\\/div><div class=\\\"listelement\\\">Economica<\\\/div><div class=\\\"listelement\\\">Electrolize<\\\/div><div class=\\\"listelement\\\">Emblema One<\\\/div><div class=\\\"listelement\\\">Emilys Candy<\\\/div><div class=\\\"listelement\\\">Engagement<\\\/div><div class=\\\"listelement\\\">Englebert<\\\/div><div class=\\\"listelement\\\">Enriqueta<\\\/div><div class=\\\"listelement\\\">Erica One<\\\/div><div class=\\\"listelement\\\">Esteban<\\\/div><div class=\\\"listelement\\\">Euphoria Script<\\\/div><div class=\\\"listelement\\\">Ewert<\\\/div><div class=\\\"listelement\\\">Exo<\\\/div><div class=\\\"listelement\\\">Expletus Sans<\\\/div><div class=\\\"listelement\\\">Fanwood Text<\\\/div><div class=\\\"listelement\\\">Fascinate<\\\/div><div class=\\\"listelement\\\">Fascinate Inline<\\\/div><div class=\\\"listelement\\\">Faster One<\\\/div><div class=\\\"listelement\\\">Fasthand<\\\/div><div class=\\\"listelement\\\">Federant<\\\/div><div class=\\\"listelement\\\">Federo<\\\/div><div class=\\\"listelement\\\">Felipa<\\\/div><div class=\\\"listelement\\\">Fenix<\\\/div><div class=\\\"listelement\\\">Finger Paint<\\\/div><div class=\\\"listelement\\\">Fjord One<\\\/div><div class=\\\"listelement\\\">Flamenco<\\\/div><div class=\\\"listelement\\\">Flavors<\\\/div><div class=\\\"listelement\\\">Fondamento<\\\/div><div class=\\\"listelement\\\">Fontdiner Swanky<\\\/div><div class=\\\"listelement\\\">Forum<\\\/div><div class=\\\"listelement\\\">Francois One<\\\/div><div class=\\\"listelement\\\">Freckle Face<\\\/div><div class=\\\"listelement\\\">Fredericka the Great<\\\/div><div class=\\\"listelement\\\">Fredoka One<\\\/div><div class=\\\"listelement\\\">Freehand<\\\/div><div class=\\\"listelement\\\">Fresca<\\\/div><div class=\\\"listelement\\\">Frijole<\\\/div><div class=\\\"listelement\\\">Fugaz One<\\\/div><div class=\\\"listelement\\\">GFS Didot<\\\/div><div class=\\\"listelement\\\">GFS Neohellenic<\\\/div><div class=\\\"listelement\\\">Gafata<\\\/div><div class=\\\"listelement\\\">Galdeano<\\\/div><div class=\\\"listelement\\\">Galindo<\\\/div><div class=\\\"listelement\\\">Gentium Basic<\\\/div><div class=\\\"listelement\\\">Gentium Book Basic<\\\/div><div class=\\\"listelement\\\">Geo<\\\/div><div class=\\\"listelement\\\">Geostar<\\\/div><div class=\\\"listelement\\\">Geostar Fill<\\\/div><div class=\\\"listelement\\\">Germania One<\\\/div><div class=\\\"listelement\\\">Gilda Display<\\\/div><div class=\\\"listelement\\\">Give You Glory<\\\/div><div class=\\\"listelement\\\">Glass Antiqua<\\\/div><div class=\\\"listelement\\\">Glegoo<\\\/div><div class=\\\"listelement\\\">Gloria Hallelujah<\\\/div><div class=\\\"listelement\\\">Goblin One<\\\/div><div class=\\\"listelement\\\">Gochi Hand<\\\/div><div class=\\\"listelement\\\">Gorditas<\\\/div><div class=\\\"listelement\\\">Goudy Bookletter 1911<\\\/div><div class=\\\"listelement\\\">Graduate<\\\/div><div class=\\\"listelement\\\">Gravitas One<\\\/div><div class=\\\"listelement\\\">Great Vibes<\\\/div><div class=\\\"listelement\\\">Griffy<\\\/div><div class=\\\"listelement\\\">Gruppo<\\\/div><div class=\\\"listelement\\\">Gudea<\\\/div><div class=\\\"listelement\\\">Habibi<\\\/div><div class=\\\"listelement\\\">Hammersmith One<\\\/div><div class=\\\"listelement\\\">Hanalei<\\\/div><div class=\\\"listelement\\\">Hanalei Fill<\\\/div><div class=\\\"listelement\\\">Handlee<\\\/div><div class=\\\"listelement\\\">Hanuman<\\\/div><div class=\\\"listelement\\\">Happy Monkey<\\\/div><div class=\\\"listelement\\\">Headland One<\\\/div><div class=\\\"listelement\\\">Henny Penny<\\\/div><div class=\\\"listelement\\\">Herr Von Muellerhoff<\\\/div><div class=\\\"listelement\\\">Holtwood One SC<\\\/div><div class=\\\"listelement\\\">Homemade Apple<\\\/div><div class=\\\"listelement\\\">Homenaje<\\\/div><div class=\\\"listelement\\\">IM Fell DW Pica<\\\/div><div class=\\\"listelement\\\">IM Fell DW Pica SC<\\\/div><div class=\\\"listelement\\\">IM Fell Double Pica<\\\/div><div class=\\\"listelement\\\">IM Fell Double Pica SC<\\\/div><div class=\\\"listelement\\\">IM Fell English<\\\/div><div class=\\\"listelement\\\">IM Fell English SC<\\\/div><div class=\\\"listelement\\\">IM Fell French Canon<\\\/div><div class=\\\"listelement\\\">IM Fell French Canon SC<\\\/div><div class=\\\"listelement\\\">IM Fell Great Primer<\\\/div><div class=\\\"listelement\\\">IM Fell Great Primer SC<\\\/div><div class=\\\"listelement\\\">Iceberg<\\\/div><div class=\\\"listelement\\\">Iceland<\\\/div><div class=\\\"listelement\\\">Imprima<\\\/div><div class=\\\"listelement\\\">Inconsolata<\\\/div><div class=\\\"listelement\\\">Inder<\\\/div><div class=\\\"listelement\\\">Indie Flower<\\\/div><div class=\\\"listelement\\\">Inika<\\\/div><div class=\\\"listelement\\\">Irish Grover<\\\/div><div class=\\\"listelement\\\">Istok Web<\\\/div><div class=\\\"listelement\\\">Italiana<\\\/div><div class=\\\"listelement\\\">Italianno<\\\/div><div class=\\\"listelement\\\">Jacques Francois<\\\/div><div class=\\\"listelement\\\">Jacques Francois Shadow<\\\/div><div class=\\\"listelement\\\">Jim Nightshade<\\\/div><div class=\\\"listelement\\\">Jockey One<\\\/div><div class=\\\"listelement\\\">Jolly Lodger<\\\/div><div class=\\\"listelement\\\">Josefin Sans<\\\/div><div class=\\\"listelement\\\">Josefin Slab<\\\/div><div class=\\\"listelement\\\">Joti One<\\\/div><div class=\\\"listelement\\\">Judson<\\\/div><div class=\\\"listelement\\\">Julee<\\\/div><div class=\\\"listelement\\\">Julius Sans One<\\\/div><div class=\\\"listelement\\\">Junge<\\\/div><div class=\\\"listelement\\\">Jura<\\\/div><div class=\\\"listelement\\\">Just Another Hand<\\\/div><div class=\\\"listelement\\\">Just Me Again Down Here<\\\/div><div class=\\\"listelement\\\">Kameron<\\\/div><div class=\\\"listelement\\\">Karla<\\\/div><div class=\\\"listelement\\\">Kaushan Script<\\\/div><div class=\\\"listelement\\\">Keania One<\\\/div><div class=\\\"listelement\\\">Kelly Slab<\\\/div><div class=\\\"listelement\\\">Kenia<\\\/div><div class=\\\"listelement\\\">Khmer<\\\/div><div class=\\\"listelement\\\">Kite One<\\\/div><div class=\\\"listelement\\\">Knewave<\\\/div><div class=\\\"listelement\\\">Kotta One<\\\/div><div class=\\\"listelement\\\">Koulen<\\\/div><div class=\\\"listelement\\\">Kranky<\\\/div><div class=\\\"listelement\\\">Kreon<\\\/div><div class=\\\"listelement\\\">Kristi<\\\/div><div class=\\\"listelement\\\">Krona One<\\\/div><div class=\\\"listelement\\\">La Belle Aurore<\\\/div><div class=\\\"listelement\\\">Lancelot<\\\/div><div class=\\\"listelement\\\">Lato<\\\/div><div class=\\\"listelement\\\">League Script<\\\/div><div class=\\\"listelement\\\">Leckerli One<\\\/div><div class=\\\"listelement\\\">Ledger<\\\/div><div class=\\\"listelement\\\">Lekton<\\\/div><div class=\\\"listelement\\\">Lemon<\\\/div><div class=\\\"listelement\\\">Life Savers<\\\/div><div class=\\\"listelement\\\">Lilita One<\\\/div><div class=\\\"listelement\\\">Limelight<\\\/div><div class=\\\"listelement\\\">Linden Hill<\\\/div><div class=\\\"listelement\\\">Lobster<\\\/div><div class=\\\"listelement\\\">Lobster Two<\\\/div><div class=\\\"listelement\\\">Londrina Outline<\\\/div><div class=\\\"listelement\\\">Londrina Shadow<\\\/div><div class=\\\"listelement\\\">Londrina Sketch<\\\/div><div class=\\\"listelement\\\">Londrina Solid<\\\/div><div class=\\\"listelement\\\">Lora<\\\/div><div class=\\\"listelement\\\">Love Ya Like A Sister<\\\/div><div class=\\\"listelement\\\">Loved by the King<\\\/div><div class=\\\"listelement\\\">Lovers Quarrel<\\\/div><div class=\\\"listelement\\\">Luckiest Guy<\\\/div><div class=\\\"listelement\\\">Lusitana<\\\/div><div class=\\\"listelement\\\">Lustria<\\\/div><div class=\\\"listelement\\\">Macondo<\\\/div><div class=\\\"listelement\\\">Macondo Swash Caps<\\\/div><div class=\\\"listelement\\\">Magra<\\\/div><div class=\\\"listelement\\\">Maiden Orange<\\\/div><div class=\\\"listelement\\\">Mako<\\\/div><div class=\\\"listelement\\\">Marcellus<\\\/div><div class=\\\"listelement\\\">Marcellus SC<\\\/div><div class=\\\"listelement\\\">Marck Script<\\\/div><div class=\\\"listelement\\\">Margarine<\\\/div><div class=\\\"listelement\\\">Marko One<\\\/div><div class=\\\"listelement\\\">Marmelad<\\\/div><div class=\\\"listelement\\\">Marvel<\\\/div><div class=\\\"listelement\\\">Mate<\\\/div><div class=\\\"listelement\\\">Mate SC<\\\/div><div class=\\\"listelement\\\">Maven Pro<\\\/div><div class=\\\"listelement\\\">McLaren<\\\/div><div class=\\\"listelement\\\">Meddon<\\\/div><div class=\\\"listelement\\\">MedievalSharp<\\\/div><div class=\\\"listelement\\\">Medula One<\\\/div><div class=\\\"listelement\\\">Megrim<\\\/div><div class=\\\"listelement\\\">Meie Script<\\\/div><div class=\\\"listelement\\\">Merienda<\\\/div><div class=\\\"listelement\\\">Merienda One<\\\/div><div class=\\\"listelement\\\">Merriweather<\\\/div><div class=\\\"listelement\\\">Metal<\\\/div><div class=\\\"listelement\\\">Metal Mania<\\\/div><div class=\\\"listelement\\\">Metamorphous<\\\/div><div class=\\\"listelement\\\">Metrophobic<\\\/div><div class=\\\"listelement\\\">Michroma<\\\/div><div class=\\\"listelement\\\">Miltonian<\\\/div><div class=\\\"listelement\\\">Miltonian Tattoo<\\\/div><div class=\\\"listelement\\\">Miniver<\\\/div><div class=\\\"listelement\\\">Miss Fajardose<\\\/div><div class=\\\"listelement\\\">Modern Antiqua<\\\/div><div class=\\\"listelement\\\">Molengo<\\\/div><div class=\\\"listelement\\\">Molle<\\\/div><div class=\\\"listelement\\\">Monofett<\\\/div><div class=\\\"listelement\\\">Monoton<\\\/div><div class=\\\"listelement\\\">Monsieur La Doulaise<\\\/div><div class=\\\"listelement\\\">Montaga<\\\/div><div class=\\\"listelement\\\">Montez<\\\/div><div class=\\\"listelement\\\">Montserrat<\\\/div><div class=\\\"listelement\\\">Montserrat Alternates<\\\/div><div class=\\\"listelement\\\">Montserrat Subrayada<\\\/div><div class=\\\"listelement\\\">Moul<\\\/div><div class=\\\"listelement\\\">Moulpali<\\\/div><div class=\\\"listelement\\\">Mountains of Christmas<\\\/div><div class=\\\"listelement\\\">Mouse Memoirs<\\\/div><div class=\\\"listelement\\\">Mr Bedfort<\\\/div><div class=\\\"listelement\\\">Mr Dafoe<\\\/div><div class=\\\"listelement\\\">Mr De Haviland<\\\/div><div class=\\\"listelement\\\">Mrs Saint Delafield<\\\/div><div class=\\\"listelement\\\">Mrs Sheppards<\\\/div><div class=\\\"listelement\\\">Muli<\\\/div><div class=\\\"listelement\\\">Mystery Quest<\\\/div><div class=\\\"listelement\\\">Neucha<\\\/div><div class=\\\"listelement\\\">Neuton<\\\/div><div class=\\\"listelement\\\">News Cycle<\\\/div><div class=\\\"listelement\\\">Niconne<\\\/div><div class=\\\"listelement\\\">Nixie One<\\\/div><div class=\\\"listelement\\\">Nobile<\\\/div><div class=\\\"listelement\\\">Nokora<\\\/div><div class=\\\"listelement\\\">Norican<\\\/div><div class=\\\"listelement\\\">Nosifer<\\\/div><div class=\\\"listelement\\\">Nothing You Could Do<\\\/div><div class=\\\"listelement\\\">Noticia Text<\\\/div><div class=\\\"listelement\\\">Nova Cut<\\\/div><div class=\\\"listelement\\\">Nova Flat<\\\/div><div class=\\\"listelement\\\">Nova Mono<\\\/div><div class=\\\"listelement\\\">Nova Oval<\\\/div><div class=\\\"listelement\\\">Nova Round<\\\/div><div class=\\\"listelement\\\">Nova Script<\\\/div><div class=\\\"listelement\\\">Nova Slim<\\\/div><div class=\\\"listelement\\\">Nova Square<\\\/div><div class=\\\"listelement\\\">Numans<\\\/div><div class=\\\"listelement\\\">Nunito<\\\/div><div class=\\\"listelement\\\">Odor Mean Chey<\\\/div><div class=\\\"listelement\\\">Offside<\\\/div><div class=\\\"listelement\\\">Old Standard TT<\\\/div><div class=\\\"listelement\\\">Oldenburg<\\\/div><div class=\\\"listelement\\\">Oleo Script<\\\/div><div class=\\\"listelement\\\">Oleo Script Swash Caps<\\\/div><div class=\\\"listelement\\\">Open Sans<\\\/div><div class=\\\"listelement\\\">Open Sans Condensed<\\\/div><div class=\\\"listelement\\\">Oranienbaum<\\\/div><div class=\\\"listelement\\\">Orbitron<\\\/div><div class=\\\"listelement\\\">Oregano<\\\/div><div class=\\\"listelement\\\">Orienta<\\\/div><div class=\\\"listelement\\\">Original Surfer<\\\/div><div class=\\\"listelement\\\">Oswald<\\\/div><div class=\\\"listelement\\\">Over the Rainbow<\\\/div><div class=\\\"listelement\\\">Overlock<\\\/div><div class=\\\"listelement\\\">Overlock SC<\\\/div><div class=\\\"listelement\\\">Ovo<\\\/div><div class=\\\"listelement\\\">Oxygen<\\\/div><div class=\\\"listelement\\\">Oxygen Mono<\\\/div><div class=\\\"listelement\\\">PT Mono<\\\/div><div class=\\\"listelement\\\">PT Sans<\\\/div><div class=\\\"listelement\\\">PT Sans Caption<\\\/div><div class=\\\"listelement\\\">PT Sans Narrow<\\\/div><div class=\\\"listelement\\\">PT Serif<\\\/div><div class=\\\"listelement\\\">PT Serif Caption<\\\/div><div class=\\\"listelement\\\">Pacifico<\\\/div><div class=\\\"listelement\\\">Paprika<\\\/div><div class=\\\"listelement\\\">Parisienne<\\\/div><div class=\\\"listelement\\\">Passero One<\\\/div><div class=\\\"listelement\\\">Passion One<\\\/div><div class=\\\"listelement\\\">Patrick Hand<\\\/div><div class=\\\"listelement\\\">Patua One<\\\/div><div class=\\\"listelement\\\">Paytone One<\\\/div><div class=\\\"listelement\\\">Peralta<\\\/div><div class=\\\"listelement\\\">Permanent Marker<\\\/div><div class=\\\"listelement\\\">Petit Formal Script<\\\/div><div class=\\\"listelement\\\">Petrona<\\\/div><div class=\\\"listelement\\\">Philosopher<\\\/div><div class=\\\"listelement\\\">Piedra<\\\/div><div class=\\\"listelement\\\">Pinyon Script<\\\/div><div class=\\\"listelement\\\">Pirata One<\\\/div><div class=\\\"listelement\\\">Plaster<\\\/div><div class=\\\"listelement\\\">Play<\\\/div><div class=\\\"listelement\\\">Playball<\\\/div><div class=\\\"listelement\\\">Playfair Display<\\\/div><div class=\\\"listelement\\\">Playfair Display SC<\\\/div><div class=\\\"listelement\\\">Podkova<\\\/div><div class=\\\"listelement\\\">Poiret One<\\\/div><div class=\\\"listelement\\\">Poller One<\\\/div><div class=\\\"listelement\\\">Poly<\\\/div><div class=\\\"listelement\\\">Pompiere<\\\/div><div class=\\\"listelement\\\">Pontano Sans<\\\/div><div class=\\\"listelement\\\">Port Lligat Sans<\\\/div><div class=\\\"listelement\\\">Port Lligat Slab<\\\/div><div class=\\\"listelement\\\">Prata<\\\/div><div class=\\\"listelement\\\">Preahvihear<\\\/div><div class=\\\"listelement\\\">Press Start 2P<\\\/div><div class=\\\"listelement\\\">Princess Sofia<\\\/div><div class=\\\"listelement\\\">Prociono<\\\/div><div class=\\\"listelement\\\">Prosto One<\\\/div><div class=\\\"listelement\\\">Puritan<\\\/div><div class=\\\"listelement\\\">Purple Purse<\\\/div><div class=\\\"listelement\\\">Quando<\\\/div><div class=\\\"listelement\\\">Quantico<\\\/div><div class=\\\"listelement\\\">Quattrocento<\\\/div><div class=\\\"listelement\\\">Quattrocento Sans<\\\/div><div class=\\\"listelement\\\">Questrial<\\\/div><div class=\\\"listelement\\\">Quicksand<\\\/div><div class=\\\"listelement\\\">Quintessential<\\\/div><div class=\\\"listelement\\\">Qwigley<\\\/div><div class=\\\"listelement\\\">Racing Sans One<\\\/div><div class=\\\"listelement\\\">Radley<\\\/div><div class=\\\"listelement\\\">Raleway<\\\/div><div class=\\\"listelement\\\">Raleway Dots<\\\/div><div class=\\\"listelement\\\">Rambla<\\\/div><div class=\\\"listelement\\\">Rammetto One<\\\/div><div class=\\\"listelement\\\">Ranchers<\\\/div><div class=\\\"listelement\\\">Rancho<\\\/div><div class=\\\"listelement\\\">Rationale<\\\/div><div class=\\\"listelement\\\">Redressed<\\\/div><div class=\\\"listelement\\\">Reenie Beanie<\\\/div><div class=\\\"listelement\\\">Revalia<\\\/div><div class=\\\"listelement\\\">Ribeye<\\\/div><div class=\\\"listelement\\\">Ribeye Marrow<\\\/div><div class=\\\"listelement\\\">Righteous<\\\/div><div class=\\\"listelement\\\">Risque<\\\/div><div class=\\\"listelement\\\">Rochester<\\\/div><div class=\\\"listelement\\\">Rock Salt<\\\/div><div class=\\\"listelement\\\">Rokkitt<\\\/div><div class=\\\"listelement\\\">Romanesco<\\\/div><div class=\\\"listelement\\\">Ropa Sans<\\\/div><div class=\\\"listelement\\\">Rosario<\\\/div><div class=\\\"listelement\\\">Rosarivo<\\\/div><div class=\\\"listelement\\\">Rouge Script<\\\/div><div class=\\\"listelement\\\">Ruda<\\\/div><div class=\\\"listelement\\\">Rufina<\\\/div><div class=\\\"listelement\\\">Ruge Boogie<\\\/div><div class=\\\"listelement\\\">Ruluko<\\\/div><div class=\\\"listelement\\\">Rum Raisin<\\\/div><div class=\\\"listelement\\\">Ruslan Display<\\\/div><div class=\\\"listelement\\\">Russo One<\\\/div><div class=\\\"listelement\\\">Ruthie<\\\/div><div class=\\\"listelement\\\">Rye<\\\/div><div class=\\\"listelement\\\">Sacramento<\\\/div><div class=\\\"listelement\\\">Sail<\\\/div><div class=\\\"listelement\\\">Salsa<\\\/div><div class=\\\"listelement\\\">Sanchez<\\\/div><div class=\\\"listelement\\\">Sancreek<\\\/div><div class=\\\"listelement\\\">Sansita One<\\\/div><div class=\\\"listelement\\\">Sarina<\\\/div><div class=\\\"listelement\\\">Satisfy<\\\/div><div class=\\\"listelement\\\">Scada<\\\/div><div class=\\\"listelement\\\">Schoolbell<\\\/div><div class=\\\"listelement\\\">Seaweed Script<\\\/div><div class=\\\"listelement\\\">Sevillana<\\\/div><div class=\\\"listelement\\\">Seymour One<\\\/div><div class=\\\"listelement\\\">Shadows Into Light<\\\/div><div class=\\\"listelement\\\">Shadows Into Light Two<\\\/div><div class=\\\"listelement\\\">Shanti<\\\/div><div class=\\\"listelement\\\">Share<\\\/div><div class=\\\"listelement\\\">Share Tech<\\\/div><div class=\\\"listelement\\\">Share Tech Mono<\\\/div><div class=\\\"listelement\\\">Shojumaru<\\\/div><div class=\\\"listelement\\\">Short Stack<\\\/div><div class=\\\"listelement\\\">Siemreap<\\\/div><div class=\\\"listelement\\\">Sigmar One<\\\/div><div class=\\\"listelement\\\">Signika<\\\/div><div class=\\\"listelement\\\">Signika Negative<\\\/div><div class=\\\"listelement\\\">Simonetta<\\\/div><div class=\\\"listelement\\\">Sirin Stencil<\\\/div><div class=\\\"listelement\\\">Six Caps<\\\/div><div class=\\\"listelement\\\">Skranji<\\\/div><div class=\\\"listelement\\\">Slackey<\\\/div><div class=\\\"listelement\\\">Smokum<\\\/div><div class=\\\"listelement\\\">Smythe<\\\/div><div class=\\\"listelement\\\">Sniglet<\\\/div><div class=\\\"listelement\\\">Snippet<\\\/div><div class=\\\"listelement\\\">Snowburst One<\\\/div><div class=\\\"listelement\\\">Sofadi One<\\\/div><div class=\\\"listelement\\\">Sofia<\\\/div><div class=\\\"listelement\\\">Sonsie One<\\\/div><div class=\\\"listelement\\\">Sorts Mill Goudy<\\\/div><div class=\\\"listelement\\\">Source Code Pro<\\\/div><div class=\\\"listelement\\\">Source Sans Pro<\\\/div><div class=\\\"listelement\\\">Special Elite<\\\/div><div class=\\\"listelement\\\">Spicy Rice<\\\/div><div class=\\\"listelement\\\">Spinnaker<\\\/div><div class=\\\"listelement\\\">Spirax<\\\/div><div class=\\\"listelement\\\">Squada One<\\\/div><div class=\\\"listelement\\\">Stalemate<\\\/div><div class=\\\"listelement\\\">Stalinist One<\\\/div><div class=\\\"listelement\\\">Stardos Stencil<\\\/div><div class=\\\"listelement\\\">Stint Ultra Condensed<\\\/div><div class=\\\"listelement\\\">Stint Ultra Expanded<\\\/div><div class=\\\"listelement\\\">Stoke<\\\/div><div class=\\\"listelement\\\">Strait<\\\/div><div class=\\\"listelement\\\">Sue Ellen Francisco<\\\/div><div class=\\\"listelement\\\">Sunshiney<\\\/div><div class=\\\"listelement\\\">Supermercado One<\\\/div><div class=\\\"listelement\\\">Suwannaphum<\\\/div><div class=\\\"listelement\\\">Swanky and Moo Moo<\\\/div><div class=\\\"listelement\\\">Syncopate<\\\/div><div class=\\\"listelement\\\">Tangerine<\\\/div><div class=\\\"listelement\\\">Taprom<\\\/div><div class=\\\"listelement\\\">Telex<\\\/div><div class=\\\"listelement\\\">Tenor Sans<\\\/div><div class=\\\"listelement\\\">Text Me One<\\\/div><div class=\\\"listelement\\\">The Girl Next Door<\\\/div><div class=\\\"listelement\\\">Tienne<\\\/div><div class=\\\"listelement\\\">Tinos<\\\/div><div class=\\\"listelement\\\">Titan One<\\\/div><div class=\\\"listelement\\\">Titillium Web<\\\/div><div class=\\\"listelement\\\">Trade Winds<\\\/div><div class=\\\"listelement\\\">Trocchi<\\\/div><div class=\\\"listelement\\\">Trochut<\\\/div><div class=\\\"listelement\\\">Trykker<\\\/div><div class=\\\"listelement\\\">Tulpen One<\\\/div><div class=\\\"listelement\\\">Ubuntu<\\\/div><div class=\\\"listelement\\\">Ubuntu Condensed<\\\/div><div class=\\\"listelement\\\">Ubuntu Mono<\\\/div><div class=\\\"listelement\\\">Ultra<\\\/div><div class=\\\"listelement\\\">Uncial Antiqua<\\\/div><div class=\\\"listelement\\\">Underdog<\\\/div><div class=\\\"listelement\\\">Unica One<\\\/div><div class=\\\"listelement\\\">UnifrakturCook<\\\/div><div class=\\\"listelement\\\">UnifrakturMaguntia<\\\/div><div class=\\\"listelement\\\">Unkempt<\\\/div><div class=\\\"listelement\\\">Unlock<\\\/div><div class=\\\"listelement\\\">Unna<\\\/div><div class=\\\"listelement\\\">VT323<\\\/div><div class=\\\"listelement\\\">Vampiro One<\\\/div><div class=\\\"listelement\\\">Varela<\\\/div><div class=\\\"listelement\\\">Varela Round<\\\/div><div class=\\\"listelement\\\">Vast Shadow<\\\/div><div class=\\\"listelement\\\">Vibur<\\\/div><div class=\\\"listelement\\\">Vidaloka<\\\/div><div class=\\\"listelement\\\">Viga<\\\/div><div class=\\\"listelement\\\">Voces<\\\/div><div class=\\\"listelement\\\">Volkhov<\\\/div><div class=\\\"listelement\\\">Vollkorn<\\\/div><div class=\\\"listelement\\\">Voltaire<\\\/div><div class=\\\"listelement\\\">Waiting for the Sunrise<\\\/div><div class=\\\"listelement\\\">Wallpoet<\\\/div><div class=\\\"listelement\\\">Walter Turncoat<\\\/div><div class=\\\"listelement\\\">Warnes<\\\/div><div class=\\\"listelement\\\">Wellfleet<\\\/div><div class=\\\"listelement\\\">Wire One<\\\/div><div class=\\\"listelement\\\">Yanone Kaffeesatz<\\\/div><div class=\\\"listelement\\\">Yellowtail<\\\/div><div class=\\\"listelement\\\">Yeseva One<\\\/div><div class=\\\"listelement\\\">Yesteryear<\\\/div><div class=\\\"listelement\\\">Zeyada<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"ABeeZee\",\"text\":\"ABeeZee\"},{\"value\":\"Abel\",\"text\":\"Abel\"},{\"value\":\"Abril Fatface\",\"text\":\"Abril Fatface\"},{\"value\":\"Aclonica\",\"text\":\"Aclonica\"},{\"value\":\"Acme\",\"text\":\"Acme\"},{\"value\":\"Actor\",\"text\":\"Actor\"},{\"value\":\"Adamina\",\"text\":\"Adamina\"},{\"value\":\"Advent Pro\",\"text\":\"Advent Pro\"},{\"value\":\"Aguafina Script\",\"text\":\"Aguafina Script\"},{\"value\":\"Akronim\",\"text\":\"Akronim\"},{\"value\":\"Aladin\",\"text\":\"Aladin\"},{\"value\":\"Aldrich\",\"text\":\"Aldrich\"},{\"value\":\"Alegreya\",\"text\":\"Alegreya\"},{\"value\":\"Alegreya SC\",\"text\":\"Alegreya SC\"},{\"value\":\"Alex Brush\",\"text\":\"Alex Brush\"},{\"value\":\"Alfa Slab One\",\"text\":\"Alfa Slab One\"},{\"value\":\"Alice\",\"text\":\"Alice\"},{\"value\":\"Alike\",\"text\":\"Alike\"},{\"value\":\"Alike Angular\",\"text\":\"Alike Angular\"},{\"value\":\"Allan\",\"text\":\"Allan\"},{\"value\":\"Allerta\",\"text\":\"Allerta\"},{\"value\":\"Allerta Stencil\",\"text\":\"Allerta Stencil\"},{\"value\":\"Allura\",\"text\":\"Allura\"},{\"value\":\"Almendra\",\"text\":\"Almendra\"},{\"value\":\"Almendra Display\",\"text\":\"Almendra Display\"},{\"value\":\"Almendra SC\",\"text\":\"Almendra SC\"},{\"value\":\"Amarante\",\"text\":\"Amarante\"},{\"value\":\"Amaranth\",\"text\":\"Amaranth\"},{\"value\":\"Amatic SC\",\"text\":\"Amatic SC\"},{\"value\":\"Amethysta\",\"text\":\"Amethysta\"},{\"value\":\"Anaheim\",\"text\":\"Anaheim\"},{\"value\":\"Andada\",\"text\":\"Andada\"},{\"value\":\"Andika\",\"text\":\"Andika\"},{\"value\":\"Angkor\",\"text\":\"Angkor\"},{\"value\":\"Annie Use Your Telescope\",\"text\":\"Annie Use Your Telescope\"},{\"value\":\"Anonymous Pro\",\"text\":\"Anonymous Pro\"},{\"value\":\"Antic\",\"text\":\"Antic\"},{\"value\":\"Antic Didone\",\"text\":\"Antic Didone\"},{\"value\":\"Antic Slab\",\"text\":\"Antic Slab\"},{\"value\":\"Anton\",\"text\":\"Anton\"},{\"value\":\"Arapey\",\"text\":\"Arapey\"},{\"value\":\"Arbutus\",\"text\":\"Arbutus\"},{\"value\":\"Arbutus Slab\",\"text\":\"Arbutus Slab\"},{\"value\":\"Architects Daughter\",\"text\":\"Architects Daughter\"},{\"value\":\"Archivo Black\",\"text\":\"Archivo Black\"},{\"value\":\"Archivo Narrow\",\"text\":\"Archivo Narrow\"},{\"value\":\"Arimo\",\"text\":\"Arimo\"},{\"value\":\"Arizonia\",\"text\":\"Arizonia\"},{\"value\":\"Armata\",\"text\":\"Armata\"},{\"value\":\"Artifika\",\"text\":\"Artifika\"},{\"value\":\"Arvo\",\"text\":\"Arvo\"},{\"value\":\"Asap\",\"text\":\"Asap\"},{\"value\":\"Asset\",\"text\":\"Asset\"},{\"value\":\"Astloch\",\"text\":\"Astloch\"},{\"value\":\"Asul\",\"text\":\"Asul\"},{\"value\":\"Atomic Age\",\"text\":\"Atomic Age\"},{\"value\":\"Aubrey\",\"text\":\"Aubrey\"},{\"value\":\"Audiowide\",\"text\":\"Audiowide\"},{\"value\":\"Autour One\",\"text\":\"Autour One\"},{\"value\":\"Average\",\"text\":\"Average\"},{\"value\":\"Average Sans\",\"text\":\"Average Sans\"},{\"value\":\"Averia Gruesa Libre\",\"text\":\"Averia Gruesa Libre\"},{\"value\":\"Averia Libre\",\"text\":\"Averia Libre\"},{\"value\":\"Averia Sans Libre\",\"text\":\"Averia Sans Libre\"},{\"value\":\"Averia Serif Libre\",\"text\":\"Averia Serif Libre\"},{\"value\":\"Bad Script\",\"text\":\"Bad Script\"},{\"value\":\"Balthazar\",\"text\":\"Balthazar\"},{\"value\":\"Bangers\",\"text\":\"Bangers\"},{\"value\":\"Basic\",\"text\":\"Basic\"},{\"value\":\"Battambang\",\"text\":\"Battambang\"},{\"value\":\"Baumans\",\"text\":\"Baumans\"},{\"value\":\"Bayon\",\"text\":\"Bayon\"},{\"value\":\"Belgrano\",\"text\":\"Belgrano\"},{\"value\":\"Belleza\",\"text\":\"Belleza\"},{\"value\":\"BenchNine\",\"text\":\"BenchNine\"},{\"value\":\"Bentham\",\"text\":\"Bentham\"},{\"value\":\"Berkshire Swash\",\"text\":\"Berkshire Swash\"},{\"value\":\"Bevan\",\"text\":\"Bevan\"},{\"value\":\"Bigelow Rules\",\"text\":\"Bigelow Rules\"},{\"value\":\"Bigshot One\",\"text\":\"Bigshot One\"},{\"value\":\"Bilbo\",\"text\":\"Bilbo\"},{\"value\":\"Bilbo Swash Caps\",\"text\":\"Bilbo Swash Caps\"},{\"value\":\"Bitter\",\"text\":\"Bitter\"},{\"value\":\"Black Ops One\",\"text\":\"Black Ops One\"},{\"value\":\"Bokor\",\"text\":\"Bokor\"},{\"value\":\"Bonbon\",\"text\":\"Bonbon\"},{\"value\":\"Boogaloo\",\"text\":\"Boogaloo\"},{\"value\":\"Bowlby One\",\"text\":\"Bowlby One\"},{\"value\":\"Bowlby One SC\",\"text\":\"Bowlby One SC\"},{\"value\":\"Brawler\",\"text\":\"Brawler\"},{\"value\":\"Bree Serif\",\"text\":\"Bree Serif\"},{\"value\":\"Bubblegum Sans\",\"text\":\"Bubblegum Sans\"},{\"value\":\"Bubbler One\",\"text\":\"Bubbler One\"},{\"value\":\"Buda\",\"text\":\"Buda\"},{\"value\":\"Buenard\",\"text\":\"Buenard\"},{\"value\":\"Butcherman\",\"text\":\"Butcherman\"},{\"value\":\"Butterfly Kids\",\"text\":\"Butterfly Kids\"},{\"value\":\"Cabin\",\"text\":\"Cabin\"},{\"value\":\"Cabin Condensed\",\"text\":\"Cabin Condensed\"},{\"value\":\"Cabin Sketch\",\"text\":\"Cabin Sketch\"},{\"value\":\"Caesar Dressing\",\"text\":\"Caesar Dressing\"},{\"value\":\"Cagliostro\",\"text\":\"Cagliostro\"},{\"value\":\"Calligraffitti\",\"text\":\"Calligraffitti\"},{\"value\":\"Cambo\",\"text\":\"Cambo\"},{\"value\":\"Candal\",\"text\":\"Candal\"},{\"value\":\"Cantarell\",\"text\":\"Cantarell\"},{\"value\":\"Cantata One\",\"text\":\"Cantata One\"},{\"value\":\"Cantora One\",\"text\":\"Cantora One\"},{\"value\":\"Capriola\",\"text\":\"Capriola\"},{\"value\":\"Cardo\",\"text\":\"Cardo\"},{\"value\":\"Carme\",\"text\":\"Carme\"},{\"value\":\"Carrois Gothic\",\"text\":\"Carrois Gothic\"},{\"value\":\"Carrois Gothic SC\",\"text\":\"Carrois Gothic SC\"},{\"value\":\"Carter One\",\"text\":\"Carter One\"},{\"value\":\"Caudex\",\"text\":\"Caudex\"},{\"value\":\"Cedarville Cursive\",\"text\":\"Cedarville Cursive\"},{\"value\":\"Ceviche One\",\"text\":\"Ceviche One\"},{\"value\":\"Changa One\",\"text\":\"Changa One\"},{\"value\":\"Chango\",\"text\":\"Chango\"},{\"value\":\"Chau Philomene One\",\"text\":\"Chau Philomene One\"},{\"value\":\"Chela One\",\"text\":\"Chela One\"},{\"value\":\"Chelsea Market\",\"text\":\"Chelsea Market\"},{\"value\":\"Chenla\",\"text\":\"Chenla\"},{\"value\":\"Cherry Cream Soda\",\"text\":\"Cherry Cream Soda\"},{\"value\":\"Cherry Swash\",\"text\":\"Cherry Swash\"},{\"value\":\"Chewy\",\"text\":\"Chewy\"},{\"value\":\"Chicle\",\"text\":\"Chicle\"},{\"value\":\"Chivo\",\"text\":\"Chivo\"},{\"value\":\"Cinzel\",\"text\":\"Cinzel\"},{\"value\":\"Cinzel Decorative\",\"text\":\"Cinzel Decorative\"},{\"value\":\"Clicker Script\",\"text\":\"Clicker Script\"},{\"value\":\"Coda\",\"text\":\"Coda\"},{\"value\":\"Coda Caption\",\"text\":\"Coda Caption\"},{\"value\":\"Codystar\",\"text\":\"Codystar\"},{\"value\":\"Combo\",\"text\":\"Combo\"},{\"value\":\"Comfortaa\",\"text\":\"Comfortaa\"},{\"value\":\"Coming Soon\",\"text\":\"Coming Soon\"},{\"value\":\"Concert One\",\"text\":\"Concert One\"},{\"value\":\"Condiment\",\"text\":\"Condiment\"},{\"value\":\"Content\",\"text\":\"Content\"},{\"value\":\"Contrail One\",\"text\":\"Contrail One\"},{\"value\":\"Convergence\",\"text\":\"Convergence\"},{\"value\":\"Cookie\",\"text\":\"Cookie\"},{\"value\":\"Copse\",\"text\":\"Copse\"},{\"value\":\"Corben\",\"text\":\"Corben\"},{\"value\":\"Courgette\",\"text\":\"Courgette\"},{\"value\":\"Cousine\",\"text\":\"Cousine\"},{\"value\":\"Coustard\",\"text\":\"Coustard\"},{\"value\":\"Covered By Your Grace\",\"text\":\"Covered By Your Grace\"},{\"value\":\"Crafty Girls\",\"text\":\"Crafty Girls\"},{\"value\":\"Creepster\",\"text\":\"Creepster\"},{\"value\":\"Crete Round\",\"text\":\"Crete Round\"},{\"value\":\"Crimson Text\",\"text\":\"Crimson Text\"},{\"value\":\"Croissant One\",\"text\":\"Croissant One\"},{\"value\":\"Crushed\",\"text\":\"Crushed\"},{\"value\":\"Cuprum\",\"text\":\"Cuprum\"},{\"value\":\"Cutive\",\"text\":\"Cutive\"},{\"value\":\"Cutive Mono\",\"text\":\"Cutive Mono\"},{\"value\":\"Damion\",\"text\":\"Damion\"},{\"value\":\"Dancing Script\",\"text\":\"Dancing Script\"},{\"value\":\"Dangrek\",\"text\":\"Dangrek\"},{\"value\":\"Dawning of a New Day\",\"text\":\"Dawning of a New Day\"},{\"value\":\"Days One\",\"text\":\"Days One\"},{\"value\":\"Delius\",\"text\":\"Delius\"},{\"value\":\"Delius Swash Caps\",\"text\":\"Delius Swash Caps\"},{\"value\":\"Delius Unicase\",\"text\":\"Delius Unicase\"},{\"value\":\"Della Respira\",\"text\":\"Della Respira\"},{\"value\":\"Devonshire\",\"text\":\"Devonshire\"},{\"value\":\"Didact Gothic\",\"text\":\"Didact Gothic\"},{\"value\":\"Diplomata\",\"text\":\"Diplomata\"},{\"value\":\"Diplomata SC\",\"text\":\"Diplomata SC\"},{\"value\":\"Doppio One\",\"text\":\"Doppio One\"},{\"value\":\"Dorsa\",\"text\":\"Dorsa\"},{\"value\":\"Dosis\",\"text\":\"Dosis\"},{\"value\":\"Dr Sugiyama\",\"text\":\"Dr Sugiyama\"},{\"value\":\"Droid Sans\",\"text\":\"Droid Sans\"},{\"value\":\"Droid Sans Mono\",\"text\":\"Droid Sans Mono\"},{\"value\":\"Droid Serif\",\"text\":\"Droid Serif\"},{\"value\":\"Duru Sans\",\"text\":\"Duru Sans\"},{\"value\":\"Dynalight\",\"text\":\"Dynalight\"},{\"value\":\"EB Garamond\",\"text\":\"EB Garamond\"},{\"value\":\"Eagle Lake\",\"text\":\"Eagle Lake\"},{\"value\":\"Eater\",\"text\":\"Eater\"},{\"value\":\"Economica\",\"text\":\"Economica\"},{\"value\":\"Electrolize\",\"text\":\"Electrolize\"},{\"value\":\"Emblema One\",\"text\":\"Emblema One\"},{\"value\":\"Emilys Candy\",\"text\":\"Emilys Candy\"},{\"value\":\"Engagement\",\"text\":\"Engagement\"},{\"value\":\"Englebert\",\"text\":\"Englebert\"},{\"value\":\"Enriqueta\",\"text\":\"Enriqueta\"},{\"value\":\"Erica One\",\"text\":\"Erica One\"},{\"value\":\"Esteban\",\"text\":\"Esteban\"},{\"value\":\"Euphoria Script\",\"text\":\"Euphoria Script\"},{\"value\":\"Ewert\",\"text\":\"Ewert\"},{\"value\":\"Exo\",\"text\":\"Exo\"},{\"value\":\"Expletus Sans\",\"text\":\"Expletus Sans\"},{\"value\":\"Fanwood Text\",\"text\":\"Fanwood Text\"},{\"value\":\"Fascinate\",\"text\":\"Fascinate\"},{\"value\":\"Fascinate Inline\",\"text\":\"Fascinate Inline\"},{\"value\":\"Faster One\",\"text\":\"Faster One\"},{\"value\":\"Fasthand\",\"text\":\"Fasthand\"},{\"value\":\"Federant\",\"text\":\"Federant\"},{\"value\":\"Federo\",\"text\":\"Federo\"},{\"value\":\"Felipa\",\"text\":\"Felipa\"},{\"value\":\"Fenix\",\"text\":\"Fenix\"},{\"value\":\"Finger Paint\",\"text\":\"Finger Paint\"},{\"value\":\"Fjord One\",\"text\":\"Fjord One\"},{\"value\":\"Flamenco\",\"text\":\"Flamenco\"},{\"value\":\"Flavors\",\"text\":\"Flavors\"},{\"value\":\"Fondamento\",\"text\":\"Fondamento\"},{\"value\":\"Fontdiner Swanky\",\"text\":\"Fontdiner Swanky\"},{\"value\":\"Forum\",\"text\":\"Forum\"},{\"value\":\"Francois One\",\"text\":\"Francois One\"},{\"value\":\"Freckle Face\",\"text\":\"Freckle Face\"},{\"value\":\"Fredericka the Great\",\"text\":\"Fredericka the Great\"},{\"value\":\"Fredoka One\",\"text\":\"Fredoka One\"},{\"value\":\"Freehand\",\"text\":\"Freehand\"},{\"value\":\"Fresca\",\"text\":\"Fresca\"},{\"value\":\"Frijole\",\"text\":\"Frijole\"},{\"value\":\"Fugaz One\",\"text\":\"Fugaz One\"},{\"value\":\"GFS Didot\",\"text\":\"GFS Didot\"},{\"value\":\"GFS Neohellenic\",\"text\":\"GFS Neohellenic\"},{\"value\":\"Gafata\",\"text\":\"Gafata\"},{\"value\":\"Galdeano\",\"text\":\"Galdeano\"},{\"value\":\"Galindo\",\"text\":\"Galindo\"},{\"value\":\"Gentium Basic\",\"text\":\"Gentium Basic\"},{\"value\":\"Gentium Book Basic\",\"text\":\"Gentium Book Basic\"},{\"value\":\"Geo\",\"text\":\"Geo\"},{\"value\":\"Geostar\",\"text\":\"Geostar\"},{\"value\":\"Geostar Fill\",\"text\":\"Geostar Fill\"},{\"value\":\"Germania One\",\"text\":\"Germania One\"},{\"value\":\"Gilda Display\",\"text\":\"Gilda Display\"},{\"value\":\"Give You Glory\",\"text\":\"Give You Glory\"},{\"value\":\"Glass Antiqua\",\"text\":\"Glass Antiqua\"},{\"value\":\"Glegoo\",\"text\":\"Glegoo\"},{\"value\":\"Gloria Hallelujah\",\"text\":\"Gloria Hallelujah\"},{\"value\":\"Goblin One\",\"text\":\"Goblin One\"},{\"value\":\"Gochi Hand\",\"text\":\"Gochi Hand\"},{\"value\":\"Gorditas\",\"text\":\"Gorditas\"},{\"value\":\"Goudy Bookletter 1911\",\"text\":\"Goudy Bookletter 1911\"},{\"value\":\"Graduate\",\"text\":\"Graduate\"},{\"value\":\"Gravitas One\",\"text\":\"Gravitas One\"},{\"value\":\"Great Vibes\",\"text\":\"Great Vibes\"},{\"value\":\"Griffy\",\"text\":\"Griffy\"},{\"value\":\"Gruppo\",\"text\":\"Gruppo\"},{\"value\":\"Gudea\",\"text\":\"Gudea\"},{\"value\":\"Habibi\",\"text\":\"Habibi\"},{\"value\":\"Hammersmith One\",\"text\":\"Hammersmith One\"},{\"value\":\"Hanalei\",\"text\":\"Hanalei\"},{\"value\":\"Hanalei Fill\",\"text\":\"Hanalei Fill\"},{\"value\":\"Handlee\",\"text\":\"Handlee\"},{\"value\":\"Hanuman\",\"text\":\"Hanuman\"},{\"value\":\"Happy Monkey\",\"text\":\"Happy Monkey\"},{\"value\":\"Headland One\",\"text\":\"Headland One\"},{\"value\":\"Henny Penny\",\"text\":\"Henny Penny\"},{\"value\":\"Herr Von Muellerhoff\",\"text\":\"Herr Von Muellerhoff\"},{\"value\":\"Holtwood One SC\",\"text\":\"Holtwood One SC\"},{\"value\":\"Homemade Apple\",\"text\":\"Homemade Apple\"},{\"value\":\"Homenaje\",\"text\":\"Homenaje\"},{\"value\":\"IM Fell DW Pica\",\"text\":\"IM Fell DW Pica\"},{\"value\":\"IM Fell DW Pica SC\",\"text\":\"IM Fell DW Pica SC\"},{\"value\":\"IM Fell Double Pica\",\"text\":\"IM Fell Double Pica\"},{\"value\":\"IM Fell Double Pica SC\",\"text\":\"IM Fell Double Pica SC\"},{\"value\":\"IM Fell English\",\"text\":\"IM Fell English\"},{\"value\":\"IM Fell English SC\",\"text\":\"IM Fell English SC\"},{\"value\":\"IM Fell French Canon\",\"text\":\"IM Fell French Canon\"},{\"value\":\"IM Fell French Canon SC\",\"text\":\"IM Fell French Canon SC\"},{\"value\":\"IM Fell Great Primer\",\"text\":\"IM Fell Great Primer\"},{\"value\":\"IM Fell Great Primer SC\",\"text\":\"IM Fell Great Primer SC\"},{\"value\":\"Iceberg\",\"text\":\"Iceberg\"},{\"value\":\"Iceland\",\"text\":\"Iceland\"},{\"value\":\"Imprima\",\"text\":\"Imprima\"},{\"value\":\"Inconsolata\",\"text\":\"Inconsolata\"},{\"value\":\"Inder\",\"text\":\"Inder\"},{\"value\":\"Indie Flower\",\"text\":\"Indie Flower\"},{\"value\":\"Inika\",\"text\":\"Inika\"},{\"value\":\"Irish Grover\",\"text\":\"Irish Grover\"},{\"value\":\"Istok Web\",\"text\":\"Istok Web\"},{\"value\":\"Italiana\",\"text\":\"Italiana\"},{\"value\":\"Italianno\",\"text\":\"Italianno\"},{\"value\":\"Jacques Francois\",\"text\":\"Jacques Francois\"},{\"value\":\"Jacques Francois Shadow\",\"text\":\"Jacques Francois Shadow\"},{\"value\":\"Jim Nightshade\",\"text\":\"Jim Nightshade\"},{\"value\":\"Jockey One\",\"text\":\"Jockey One\"},{\"value\":\"Jolly Lodger\",\"text\":\"Jolly Lodger\"},{\"value\":\"Josefin Sans\",\"text\":\"Josefin Sans\"},{\"value\":\"Josefin Slab\",\"text\":\"Josefin Slab\"},{\"value\":\"Joti One\",\"text\":\"Joti One\"},{\"value\":\"Judson\",\"text\":\"Judson\"},{\"value\":\"Julee\",\"text\":\"Julee\"},{\"value\":\"Julius Sans One\",\"text\":\"Julius Sans One\"},{\"value\":\"Junge\",\"text\":\"Junge\"},{\"value\":\"Jura\",\"text\":\"Jura\"},{\"value\":\"Just Another Hand\",\"text\":\"Just Another Hand\"},{\"value\":\"Just Me Again Down Here\",\"text\":\"Just Me Again Down Here\"},{\"value\":\"Kameron\",\"text\":\"Kameron\"},{\"value\":\"Karla\",\"text\":\"Karla\"},{\"value\":\"Kaushan Script\",\"text\":\"Kaushan Script\"},{\"value\":\"Keania One\",\"text\":\"Keania One\"},{\"value\":\"Kelly Slab\",\"text\":\"Kelly Slab\"},{\"value\":\"Kenia\",\"text\":\"Kenia\"},{\"value\":\"Khmer\",\"text\":\"Khmer\"},{\"value\":\"Kite One\",\"text\":\"Kite One\"},{\"value\":\"Knewave\",\"text\":\"Knewave\"},{\"value\":\"Kotta One\",\"text\":\"Kotta One\"},{\"value\":\"Koulen\",\"text\":\"Koulen\"},{\"value\":\"Kranky\",\"text\":\"Kranky\"},{\"value\":\"Kreon\",\"text\":\"Kreon\"},{\"value\":\"Kristi\",\"text\":\"Kristi\"},{\"value\":\"Krona One\",\"text\":\"Krona One\"},{\"value\":\"La Belle Aurore\",\"text\":\"La Belle Aurore\"},{\"value\":\"Lancelot\",\"text\":\"Lancelot\"},{\"value\":\"Lato\",\"text\":\"Lato\"},{\"value\":\"League Script\",\"text\":\"League Script\"},{\"value\":\"Leckerli One\",\"text\":\"Leckerli One\"},{\"value\":\"Ledger\",\"text\":\"Ledger\"},{\"value\":\"Lekton\",\"text\":\"Lekton\"},{\"value\":\"Lemon\",\"text\":\"Lemon\"},{\"value\":\"Life Savers\",\"text\":\"Life Savers\"},{\"value\":\"Lilita One\",\"text\":\"Lilita One\"},{\"value\":\"Limelight\",\"text\":\"Limelight\"},{\"value\":\"Linden Hill\",\"text\":\"Linden Hill\"},{\"value\":\"Lobster\",\"text\":\"Lobster\"},{\"value\":\"Lobster Two\",\"text\":\"Lobster Two\"},{\"value\":\"Londrina Outline\",\"text\":\"Londrina Outline\"},{\"value\":\"Londrina Shadow\",\"text\":\"Londrina Shadow\"},{\"value\":\"Londrina Sketch\",\"text\":\"Londrina Sketch\"},{\"value\":\"Londrina Solid\",\"text\":\"Londrina Solid\"},{\"value\":\"Lora\",\"text\":\"Lora\"},{\"value\":\"Love Ya Like A Sister\",\"text\":\"Love Ya Like A Sister\"},{\"value\":\"Loved by the King\",\"text\":\"Loved by the King\"},{\"value\":\"Lovers Quarrel\",\"text\":\"Lovers Quarrel\"},{\"value\":\"Luckiest Guy\",\"text\":\"Luckiest Guy\"},{\"value\":\"Lusitana\",\"text\":\"Lusitana\"},{\"value\":\"Lustria\",\"text\":\"Lustria\"},{\"value\":\"Macondo\",\"text\":\"Macondo\"},{\"value\":\"Macondo Swash Caps\",\"text\":\"Macondo Swash Caps\"},{\"value\":\"Magra\",\"text\":\"Magra\"},{\"value\":\"Maiden Orange\",\"text\":\"Maiden Orange\"},{\"value\":\"Mako\",\"text\":\"Mako\"},{\"value\":\"Marcellus\",\"text\":\"Marcellus\"},{\"value\":\"Marcellus SC\",\"text\":\"Marcellus SC\"},{\"value\":\"Marck Script\",\"text\":\"Marck Script\"},{\"value\":\"Margarine\",\"text\":\"Margarine\"},{\"value\":\"Marko One\",\"text\":\"Marko One\"},{\"value\":\"Marmelad\",\"text\":\"Marmelad\"},{\"value\":\"Marvel\",\"text\":\"Marvel\"},{\"value\":\"Mate\",\"text\":\"Mate\"},{\"value\":\"Mate SC\",\"text\":\"Mate SC\"},{\"value\":\"Maven Pro\",\"text\":\"Maven Pro\"},{\"value\":\"McLaren\",\"text\":\"McLaren\"},{\"value\":\"Meddon\",\"text\":\"Meddon\"},{\"value\":\"MedievalSharp\",\"text\":\"MedievalSharp\"},{\"value\":\"Medula One\",\"text\":\"Medula One\"},{\"value\":\"Megrim\",\"text\":\"Megrim\"},{\"value\":\"Meie Script\",\"text\":\"Meie Script\"},{\"value\":\"Merienda\",\"text\":\"Merienda\"},{\"value\":\"Merienda One\",\"text\":\"Merienda One\"},{\"value\":\"Merriweather\",\"text\":\"Merriweather\"},{\"value\":\"Metal\",\"text\":\"Metal\"},{\"value\":\"Metal Mania\",\"text\":\"Metal Mania\"},{\"value\":\"Metamorphous\",\"text\":\"Metamorphous\"},{\"value\":\"Metrophobic\",\"text\":\"Metrophobic\"},{\"value\":\"Michroma\",\"text\":\"Michroma\"},{\"value\":\"Miltonian\",\"text\":\"Miltonian\"},{\"value\":\"Miltonian Tattoo\",\"text\":\"Miltonian Tattoo\"},{\"value\":\"Miniver\",\"text\":\"Miniver\"},{\"value\":\"Miss Fajardose\",\"text\":\"Miss Fajardose\"},{\"value\":\"Modern Antiqua\",\"text\":\"Modern Antiqua\"},{\"value\":\"Molengo\",\"text\":\"Molengo\"},{\"value\":\"Molle\",\"text\":\"Molle\"},{\"value\":\"Monofett\",\"text\":\"Monofett\"},{\"value\":\"Monoton\",\"text\":\"Monoton\"},{\"value\":\"Monsieur La Doulaise\",\"text\":\"Monsieur La Doulaise\"},{\"value\":\"Montaga\",\"text\":\"Montaga\"},{\"value\":\"Montez\",\"text\":\"Montez\"},{\"value\":\"Montserrat\",\"text\":\"Montserrat\"},{\"value\":\"Montserrat Alternates\",\"text\":\"Montserrat Alternates\"},{\"value\":\"Montserrat Subrayada\",\"text\":\"Montserrat Subrayada\"},{\"value\":\"Moul\",\"text\":\"Moul\"},{\"value\":\"Moulpali\",\"text\":\"Moulpali\"},{\"value\":\"Mountains of Christmas\",\"text\":\"Mountains of Christmas\"},{\"value\":\"Mouse Memoirs\",\"text\":\"Mouse Memoirs\"},{\"value\":\"Mr Bedfort\",\"text\":\"Mr Bedfort\"},{\"value\":\"Mr Dafoe\",\"text\":\"Mr Dafoe\"},{\"value\":\"Mr De Haviland\",\"text\":\"Mr De Haviland\"},{\"value\":\"Mrs Saint Delafield\",\"text\":\"Mrs Saint Delafield\"},{\"value\":\"Mrs Sheppards\",\"text\":\"Mrs Sheppards\"},{\"value\":\"Muli\",\"text\":\"Muli\"},{\"value\":\"Mystery Quest\",\"text\":\"Mystery Quest\"},{\"value\":\"Neucha\",\"text\":\"Neucha\"},{\"value\":\"Neuton\",\"text\":\"Neuton\"},{\"value\":\"News Cycle\",\"text\":\"News Cycle\"},{\"value\":\"Niconne\",\"text\":\"Niconne\"},{\"value\":\"Nixie One\",\"text\":\"Nixie One\"},{\"value\":\"Nobile\",\"text\":\"Nobile\"},{\"value\":\"Nokora\",\"text\":\"Nokora\"},{\"value\":\"Norican\",\"text\":\"Norican\"},{\"value\":\"Nosifer\",\"text\":\"Nosifer\"},{\"value\":\"Nothing You Could Do\",\"text\":\"Nothing You Could Do\"},{\"value\":\"Noticia Text\",\"text\":\"Noticia Text\"},{\"value\":\"Nova Cut\",\"text\":\"Nova Cut\"},{\"value\":\"Nova Flat\",\"text\":\"Nova Flat\"},{\"value\":\"Nova Mono\",\"text\":\"Nova Mono\"},{\"value\":\"Nova Oval\",\"text\":\"Nova Oval\"},{\"value\":\"Nova Round\",\"text\":\"Nova Round\"},{\"value\":\"Nova Script\",\"text\":\"Nova Script\"},{\"value\":\"Nova Slim\",\"text\":\"Nova Slim\"},{\"value\":\"Nova Square\",\"text\":\"Nova Square\"},{\"value\":\"Numans\",\"text\":\"Numans\"},{\"value\":\"Nunito\",\"text\":\"Nunito\"},{\"value\":\"Odor Mean Chey\",\"text\":\"Odor Mean Chey\"},{\"value\":\"Offside\",\"text\":\"Offside\"},{\"value\":\"Old Standard TT\",\"text\":\"Old Standard TT\"},{\"value\":\"Oldenburg\",\"text\":\"Oldenburg\"},{\"value\":\"Oleo Script\",\"text\":\"Oleo Script\"},{\"value\":\"Oleo Script Swash Caps\",\"text\":\"Oleo Script Swash Caps\"},{\"value\":\"Open Sans\",\"text\":\"Open Sans\"},{\"value\":\"Open Sans Condensed\",\"text\":\"Open Sans Condensed\"},{\"value\":\"Oranienbaum\",\"text\":\"Oranienbaum\"},{\"value\":\"Orbitron\",\"text\":\"Orbitron\"},{\"value\":\"Oregano\",\"text\":\"Oregano\"},{\"value\":\"Orienta\",\"text\":\"Orienta\"},{\"value\":\"Original Surfer\",\"text\":\"Original Surfer\"},{\"value\":\"Oswald\",\"text\":\"Oswald\"},{\"value\":\"Over the Rainbow\",\"text\":\"Over the Rainbow\"},{\"value\":\"Overlock\",\"text\":\"Overlock\"},{\"value\":\"Overlock SC\",\"text\":\"Overlock SC\"},{\"value\":\"Ovo\",\"text\":\"Ovo\"},{\"value\":\"Oxygen\",\"text\":\"Oxygen\"},{\"value\":\"Oxygen Mono\",\"text\":\"Oxygen Mono\"},{\"value\":\"PT Mono\",\"text\":\"PT Mono\"},{\"value\":\"PT Sans\",\"text\":\"PT Sans\"},{\"value\":\"PT Sans Caption\",\"text\":\"PT Sans Caption\"},{\"value\":\"PT Sans Narrow\",\"text\":\"PT Sans Narrow\"},{\"value\":\"PT Serif\",\"text\":\"PT Serif\"},{\"value\":\"PT Serif Caption\",\"text\":\"PT Serif Caption\"},{\"value\":\"Pacifico\",\"text\":\"Pacifico\"},{\"value\":\"Paprika\",\"text\":\"Paprika\"},{\"value\":\"Parisienne\",\"text\":\"Parisienne\"},{\"value\":\"Passero One\",\"text\":\"Passero One\"},{\"value\":\"Passion One\",\"text\":\"Passion One\"},{\"value\":\"Patrick Hand\",\"text\":\"Patrick Hand\"},{\"value\":\"Patua One\",\"text\":\"Patua One\"},{\"value\":\"Paytone One\",\"text\":\"Paytone One\"},{\"value\":\"Peralta\",\"text\":\"Peralta\"},{\"value\":\"Permanent Marker\",\"text\":\"Permanent Marker\"},{\"value\":\"Petit Formal Script\",\"text\":\"Petit Formal Script\"},{\"value\":\"Petrona\",\"text\":\"Petrona\"},{\"value\":\"Philosopher\",\"text\":\"Philosopher\"},{\"value\":\"Piedra\",\"text\":\"Piedra\"},{\"value\":\"Pinyon Script\",\"text\":\"Pinyon Script\"},{\"value\":\"Pirata One\",\"text\":\"Pirata One\"},{\"value\":\"Plaster\",\"text\":\"Plaster\"},{\"value\":\"Play\",\"text\":\"Play\"},{\"value\":\"Playball\",\"text\":\"Playball\"},{\"value\":\"Playfair Display\",\"text\":\"Playfair Display\"},{\"value\":\"Playfair Display SC\",\"text\":\"Playfair Display SC\"},{\"value\":\"Podkova\",\"text\":\"Podkova\"},{\"value\":\"Poiret One\",\"text\":\"Poiret One\"},{\"value\":\"Poller One\",\"text\":\"Poller One\"},{\"value\":\"Poly\",\"text\":\"Poly\"},{\"value\":\"Pompiere\",\"text\":\"Pompiere\"},{\"value\":\"Pontano Sans\",\"text\":\"Pontano Sans\"},{\"value\":\"Port Lligat Sans\",\"text\":\"Port Lligat Sans\"},{\"value\":\"Port Lligat Slab\",\"text\":\"Port Lligat Slab\"},{\"value\":\"Prata\",\"text\":\"Prata\"},{\"value\":\"Preahvihear\",\"text\":\"Preahvihear\"},{\"value\":\"Press Start 2P\",\"text\":\"Press Start 2P\"},{\"value\":\"Princess Sofia\",\"text\":\"Princess Sofia\"},{\"value\":\"Prociono\",\"text\":\"Prociono\"},{\"value\":\"Prosto One\",\"text\":\"Prosto One\"},{\"value\":\"Puritan\",\"text\":\"Puritan\"},{\"value\":\"Purple Purse\",\"text\":\"Purple Purse\"},{\"value\":\"Quando\",\"text\":\"Quando\"},{\"value\":\"Quantico\",\"text\":\"Quantico\"},{\"value\":\"Quattrocento\",\"text\":\"Quattrocento\"},{\"value\":\"Quattrocento Sans\",\"text\":\"Quattrocento Sans\"},{\"value\":\"Questrial\",\"text\":\"Questrial\"},{\"value\":\"Quicksand\",\"text\":\"Quicksand\"},{\"value\":\"Quintessential\",\"text\":\"Quintessential\"},{\"value\":\"Qwigley\",\"text\":\"Qwigley\"},{\"value\":\"Racing Sans One\",\"text\":\"Racing Sans One\"},{\"value\":\"Radley\",\"text\":\"Radley\"},{\"value\":\"Raleway\",\"text\":\"Raleway\"},{\"value\":\"Raleway Dots\",\"text\":\"Raleway Dots\"},{\"value\":\"Rambla\",\"text\":\"Rambla\"},{\"value\":\"Rammetto One\",\"text\":\"Rammetto One\"},{\"value\":\"Ranchers\",\"text\":\"Ranchers\"},{\"value\":\"Rancho\",\"text\":\"Rancho\"},{\"value\":\"Rationale\",\"text\":\"Rationale\"},{\"value\":\"Redressed\",\"text\":\"Redressed\"},{\"value\":\"Reenie Beanie\",\"text\":\"Reenie Beanie\"},{\"value\":\"Revalia\",\"text\":\"Revalia\"},{\"value\":\"Ribeye\",\"text\":\"Ribeye\"},{\"value\":\"Ribeye Marrow\",\"text\":\"Ribeye Marrow\"},{\"value\":\"Righteous\",\"text\":\"Righteous\"},{\"value\":\"Risque\",\"text\":\"Risque\"},{\"value\":\"Rochester\",\"text\":\"Rochester\"},{\"value\":\"Rock Salt\",\"text\":\"Rock Salt\"},{\"value\":\"Rokkitt\",\"text\":\"Rokkitt\"},{\"value\":\"Romanesco\",\"text\":\"Romanesco\"},{\"value\":\"Ropa Sans\",\"text\":\"Ropa Sans\"},{\"value\":\"Rosario\",\"text\":\"Rosario\"},{\"value\":\"Rosarivo\",\"text\":\"Rosarivo\"},{\"value\":\"Rouge Script\",\"text\":\"Rouge Script\"},{\"value\":\"Ruda\",\"text\":\"Ruda\"},{\"value\":\"Rufina\",\"text\":\"Rufina\"},{\"value\":\"Ruge Boogie\",\"text\":\"Ruge Boogie\"},{\"value\":\"Ruluko\",\"text\":\"Ruluko\"},{\"value\":\"Rum Raisin\",\"text\":\"Rum Raisin\"},{\"value\":\"Ruslan Display\",\"text\":\"Ruslan Display\"},{\"value\":\"Russo One\",\"text\":\"Russo One\"},{\"value\":\"Ruthie\",\"text\":\"Ruthie\"},{\"value\":\"Rye\",\"text\":\"Rye\"},{\"value\":\"Sacramento\",\"text\":\"Sacramento\"},{\"value\":\"Sail\",\"text\":\"Sail\"},{\"value\":\"Salsa\",\"text\":\"Salsa\"},{\"value\":\"Sanchez\",\"text\":\"Sanchez\"},{\"value\":\"Sancreek\",\"text\":\"Sancreek\"},{\"value\":\"Sansita One\",\"text\":\"Sansita One\"},{\"value\":\"Sarina\",\"text\":\"Sarina\"},{\"value\":\"Satisfy\",\"text\":\"Satisfy\"},{\"value\":\"Scada\",\"text\":\"Scada\"},{\"value\":\"Schoolbell\",\"text\":\"Schoolbell\"},{\"value\":\"Seaweed Script\",\"text\":\"Seaweed Script\"},{\"value\":\"Sevillana\",\"text\":\"Sevillana\"},{\"value\":\"Seymour One\",\"text\":\"Seymour One\"},{\"value\":\"Shadows Into Light\",\"text\":\"Shadows Into Light\"},{\"value\":\"Shadows Into Light Two\",\"text\":\"Shadows Into Light Two\"},{\"value\":\"Shanti\",\"text\":\"Shanti\"},{\"value\":\"Share\",\"text\":\"Share\"},{\"value\":\"Share Tech\",\"text\":\"Share Tech\"},{\"value\":\"Share Tech Mono\",\"text\":\"Share Tech Mono\"},{\"value\":\"Shojumaru\",\"text\":\"Shojumaru\"},{\"value\":\"Short Stack\",\"text\":\"Short Stack\"},{\"value\":\"Siemreap\",\"text\":\"Siemreap\"},{\"value\":\"Sigmar One\",\"text\":\"Sigmar One\"},{\"value\":\"Signika\",\"text\":\"Signika\"},{\"value\":\"Signika Negative\",\"text\":\"Signika Negative\"},{\"value\":\"Simonetta\",\"text\":\"Simonetta\"},{\"value\":\"Sirin Stencil\",\"text\":\"Sirin Stencil\"},{\"value\":\"Six Caps\",\"text\":\"Six Caps\"},{\"value\":\"Skranji\",\"text\":\"Skranji\"},{\"value\":\"Slackey\",\"text\":\"Slackey\"},{\"value\":\"Smokum\",\"text\":\"Smokum\"},{\"value\":\"Smythe\",\"text\":\"Smythe\"},{\"value\":\"Sniglet\",\"text\":\"Sniglet\"},{\"value\":\"Snippet\",\"text\":\"Snippet\"},{\"value\":\"Snowburst One\",\"text\":\"Snowburst One\"},{\"value\":\"Sofadi One\",\"text\":\"Sofadi One\"},{\"value\":\"Sofia\",\"text\":\"Sofia\"},{\"value\":\"Sonsie One\",\"text\":\"Sonsie One\"},{\"value\":\"Sorts Mill Goudy\",\"text\":\"Sorts Mill Goudy\"},{\"value\":\"Source Code Pro\",\"text\":\"Source Code Pro\"},{\"value\":\"Source Sans Pro\",\"text\":\"Source Sans Pro\"},{\"value\":\"Special Elite\",\"text\":\"Special Elite\"},{\"value\":\"Spicy Rice\",\"text\":\"Spicy Rice\"},{\"value\":\"Spinnaker\",\"text\":\"Spinnaker\"},{\"value\":\"Spirax\",\"text\":\"Spirax\"},{\"value\":\"Squada One\",\"text\":\"Squada One\"},{\"value\":\"Stalemate\",\"text\":\"Stalemate\"},{\"value\":\"Stalinist One\",\"text\":\"Stalinist One\"},{\"value\":\"Stardos Stencil\",\"text\":\"Stardos Stencil\"},{\"value\":\"Stint Ultra Condensed\",\"text\":\"Stint Ultra Condensed\"},{\"value\":\"Stint Ultra Expanded\",\"text\":\"Stint Ultra Expanded\"},{\"value\":\"Stoke\",\"text\":\"Stoke\"},{\"value\":\"Strait\",\"text\":\"Strait\"},{\"value\":\"Sue Ellen Francisco\",\"text\":\"Sue Ellen Francisco\"},{\"value\":\"Sunshiney\",\"text\":\"Sunshiney\"},{\"value\":\"Supermercado One\",\"text\":\"Supermercado One\"},{\"value\":\"Suwannaphum\",\"text\":\"Suwannaphum\"},{\"value\":\"Swanky and Moo Moo\",\"text\":\"Swanky and Moo Moo\"},{\"value\":\"Syncopate\",\"text\":\"Syncopate\"},{\"value\":\"Tangerine\",\"text\":\"Tangerine\"},{\"value\":\"Taprom\",\"text\":\"Taprom\"},{\"value\":\"Telex\",\"text\":\"Telex\"},{\"value\":\"Tenor Sans\",\"text\":\"Tenor Sans\"},{\"value\":\"Text Me One\",\"text\":\"Text Me One\"},{\"value\":\"The Girl Next Door\",\"text\":\"The Girl Next Door\"},{\"value\":\"Tienne\",\"text\":\"Tienne\"},{\"value\":\"Tinos\",\"text\":\"Tinos\"},{\"value\":\"Titan One\",\"text\":\"Titan One\"},{\"value\":\"Titillium Web\",\"text\":\"Titillium Web\"},{\"value\":\"Trade Winds\",\"text\":\"Trade Winds\"},{\"value\":\"Trocchi\",\"text\":\"Trocchi\"},{\"value\":\"Trochut\",\"text\":\"Trochut\"},{\"value\":\"Trykker\",\"text\":\"Trykker\"},{\"value\":\"Tulpen One\",\"text\":\"Tulpen One\"},{\"value\":\"Ubuntu\",\"text\":\"Ubuntu\"},{\"value\":\"Ubuntu Condensed\",\"text\":\"Ubuntu Condensed\"},{\"value\":\"Ubuntu Mono\",\"text\":\"Ubuntu Mono\"},{\"value\":\"Ultra\",\"text\":\"Ultra\"},{\"value\":\"Uncial Antiqua\",\"text\":\"Uncial Antiqua\"},{\"value\":\"Underdog\",\"text\":\"Underdog\"},{\"value\":\"Unica One\",\"text\":\"Unica One\"},{\"value\":\"UnifrakturCook\",\"text\":\"UnifrakturCook\"},{\"value\":\"UnifrakturMaguntia\",\"text\":\"UnifrakturMaguntia\"},{\"value\":\"Unkempt\",\"text\":\"Unkempt\"},{\"value\":\"Unlock\",\"text\":\"Unlock\"},{\"value\":\"Unna\",\"text\":\"Unna\"},{\"value\":\"VT323\",\"text\":\"VT323\"},{\"value\":\"Vampiro One\",\"text\":\"Vampiro One\"},{\"value\":\"Varela\",\"text\":\"Varela\"},{\"value\":\"Varela Round\",\"text\":\"Varela Round\"},{\"value\":\"Vast Shadow\",\"text\":\"Vast Shadow\"},{\"value\":\"Vibur\",\"text\":\"Vibur\"},{\"value\":\"Vidaloka\",\"text\":\"Vidaloka\"},{\"value\":\"Viga\",\"text\":\"Viga\"},{\"value\":\"Voces\",\"text\":\"Voces\"},{\"value\":\"Volkhov\",\"text\":\"Volkhov\"},{\"value\":\"Vollkorn\",\"text\":\"Vollkorn\"},{\"value\":\"Voltaire\",\"text\":\"Voltaire\"},{\"value\":\"Waiting for the Sunrise\",\"text\":\"Waiting for the Sunrise\"},{\"value\":\"Wallpoet\",\"text\":\"Wallpoet\"},{\"value\":\"Walter Turncoat\",\"text\":\"Walter Turncoat\"},{\"value\":\"Warnes\",\"text\":\"Warnes\"},{\"value\":\"Wellfleet\",\"text\":\"Wellfleet\"},{\"value\":\"Wire One\",\"text\":\"Wire One\"},{\"value\":\"Yanone Kaffeesatz\",\"text\":\"Yanone Kaffeesatz\"},{\"value\":\"Yellowtail\",\"text\":\"Yellowtail\"},{\"value\":\"Yeseva One\",\"text\":\"Yeseva One\"},{\"value\":\"Yesteryear\",\"text\":\"Yesteryear\"},{\"value\":\"Zeyada\",\"text\":\"Zeyada\"}],\r\n        selectedIndex: 417,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"LatinExtended":{"name":"jform[params][moduleparametersTab][theme][btnfont]family","id":"jformparamsmoduleparametersTabthemebtnfontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemebtnfontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Open Sans<br \/>Andika<br \/>Anonymous Pro<br \/>Anton<br \/>Caudex<br \/>Didact Gothic<br \/>EB Garamond<br \/>Forum<br \/>Francois One<br \/>Gentium Basic<br \/>Gentium Book Basic<br \/>Istok Web<br \/>Jura<br \/>Kelly Slab<br \/>Lobster<br \/>MedievalSharp<br \/>Modern Antiqua<br \/>Neuton<br \/>Open Sans<br \/>Open Sans Condensed<br \/>Patrick Hand<br \/>Play<br \/>Ruslan Display<br \/>Tenor Sans<br \/>Ubuntu<br \/>Varela<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][btnfont]family\" id=\"jformparamsmoduleparametersTabthemebtnfontfamily\" value=\"Open Sans\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemebtnfontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">Andika<\\\/div><div class=\\\"listelement\\\">Anonymous Pro<\\\/div><div class=\\\"listelement\\\">Anton<\\\/div><div class=\\\"listelement\\\">Caudex<\\\/div><div class=\\\"listelement\\\">Didact Gothic<\\\/div><div class=\\\"listelement\\\">EB Garamond<\\\/div><div class=\\\"listelement\\\">Forum<\\\/div><div class=\\\"listelement\\\">Francois One<\\\/div><div class=\\\"listelement\\\">Gentium Basic<\\\/div><div class=\\\"listelement\\\">Gentium Book Basic<\\\/div><div class=\\\"listelement\\\">Istok Web<\\\/div><div class=\\\"listelement\\\">Jura<\\\/div><div class=\\\"listelement\\\">Kelly Slab<\\\/div><div class=\\\"listelement\\\">Lobster<\\\/div><div class=\\\"listelement\\\">MedievalSharp<\\\/div><div class=\\\"listelement\\\">Modern Antiqua<\\\/div><div class=\\\"listelement\\\">Neuton<\\\/div><div class=\\\"listelement\\\">Open Sans<\\\/div><div class=\\\"listelement\\\">Open Sans Condensed<\\\/div><div class=\\\"listelement\\\">Patrick Hand<\\\/div><div class=\\\"listelement\\\">Play<\\\/div><div class=\\\"listelement\\\">Ruslan Display<\\\/div><div class=\\\"listelement\\\">Tenor Sans<\\\/div><div class=\\\"listelement\\\">Ubuntu<\\\/div><div class=\\\"listelement\\\">Varela<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"Andika\",\"text\":\"Andika\"},{\"value\":\"Anonymous Pro\",\"text\":\"Anonymous Pro\"},{\"value\":\"Anton\",\"text\":\"Anton\"},{\"value\":\"Caudex\",\"text\":\"Caudex\"},{\"value\":\"Didact Gothic\",\"text\":\"Didact Gothic\"},{\"value\":\"EB Garamond\",\"text\":\"EB Garamond\"},{\"value\":\"Forum\",\"text\":\"Forum\"},{\"value\":\"Francois One\",\"text\":\"Francois One\"},{\"value\":\"Gentium Basic\",\"text\":\"Gentium Basic\"},{\"value\":\"Gentium Book Basic\",\"text\":\"Gentium Book Basic\"},{\"value\":\"Istok Web\",\"text\":\"Istok Web\"},{\"value\":\"Jura\",\"text\":\"Jura\"},{\"value\":\"Kelly Slab\",\"text\":\"Kelly Slab\"},{\"value\":\"Lobster\",\"text\":\"Lobster\"},{\"value\":\"MedievalSharp\",\"text\":\"MedievalSharp\"},{\"value\":\"Modern Antiqua\",\"text\":\"Modern Antiqua\"},{\"value\":\"Neuton\",\"text\":\"Neuton\"},{\"value\":\"Open Sans\",\"text\":\"Open Sans\"},{\"value\":\"Open Sans Condensed\",\"text\":\"Open Sans Condensed\"},{\"value\":\"Patrick Hand\",\"text\":\"Patrick Hand\"},{\"value\":\"Play\",\"text\":\"Play\"},{\"value\":\"Ruslan Display\",\"text\":\"Ruslan Display\"},{\"value\":\"Tenor Sans\",\"text\":\"Tenor Sans\"},{\"value\":\"Ubuntu\",\"text\":\"Ubuntu\"},{\"value\":\"Varela\",\"text\":\"Varela\"}],\r\n        selectedIndex: 17,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"Vietnamese":{"name":"jform[params][moduleparametersTab][theme][btnfont]family","id":"jformparamsmoduleparametersTabthemebtnfontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemebtnfontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Open Sans<br \/>EB Garamond<br \/>Open Sans<br \/>Open Sans Condensed<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][btnfont]family\" id=\"jformparamsmoduleparametersTabthemebtnfontfamily\" value=\"Open Sans\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemebtnfontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">EB Garamond<\\\/div><div class=\\\"listelement\\\">Open Sans<\\\/div><div class=\\\"listelement\\\">Open Sans Condensed<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"EB Garamond\",\"text\":\"EB Garamond\"},{\"value\":\"Open Sans\",\"text\":\"Open Sans\"},{\"value\":\"Open Sans Condensed\",\"text\":\"Open Sans Condensed\"}],\r\n        selectedIndex: 1,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemebtnfonttype\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Latin<br \/>Alternative fonts<br \/>Cyrillic<br \/>CyrillicExtended<br \/>Greek<br \/>GreekExtended<br \/>Khmer<br \/>Latin<br \/>LatinExtended<br \/>Vietnamese<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][btnfont]type\" id=\"jformparamsmoduleparametersTabthemebtnfonttype\" value=\"Latin\"\/><\/div><\/div>"},"size":{"name":"jform[params][moduleparametersTab][theme][btnfont]size","id":"jformparamsmoduleparametersTabthemebtnfontsize","html":"<div class=\"offlajntextcontainer\" id=\"offlajntextcontainerjformparamsmoduleparametersTabthemebtnfontsize\"><input  size=\"1\" class=\"offlajntext\" type=\"text\" id=\"jformparamsmoduleparametersTabthemebtnfontsizeinput\" value=\"20\"><div class=\"offlajntext_increment\">\n                <div class=\"offlajntext_increment_up arrow\"><\/div>\n                <div class=\"offlajntext_increment_down arrow\"><\/div>\n      <\/div><\/div><div class=\"offlajnswitcher\">\r\n            <div class=\"offlajnswitcher_inner\" id=\"offlajnswitcher_innerjformparamsmoduleparametersTabthemebtnfontsizeunit\"><\/div>\r\n    <\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][btnfont]size[unit]\" id=\"jformparamsmoduleparametersTabthemebtnfontsizeunit\" value=\"px\" \/><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][btnfont]size\" id=\"jformparamsmoduleparametersTabthemebtnfontsize\" value=\"20||px\">"},"color":{"name":"jform[params][moduleparametersTab][theme][btnfont]color","id":"jformparamsmoduleparametersTabthemebtnfontcolor","html":"<div class=\"offlajncolor\"><input type=\"text\" name=\"jform[params][moduleparametersTab][theme][btnfont]color\" id=\"jformparamsmoduleparametersTabthemebtnfontcolor\" value=\"ffffff\" class=\"color wa\" size=\"12\" \/><\/div>"},"textdecor":{"name":"jform[params][moduleparametersTab][theme][btnfont]textdecor","id":"jformparamsmoduleparametersTabthemebtnfonttextdecor","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemebtnfonttextdecor\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">lighter<br \/>extralight<br \/>lighter<br \/>normal<br \/>bold<br \/>bolder<br \/>extrabold<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][btnfont]textdecor\" id=\"jformparamsmoduleparametersTabthemebtnfonttextdecor\" value=\"300\"\/><\/div><\/div>"},"italic":{"name":"jform[params][moduleparametersTab][theme][btnfont]italic","id":"jformparamsmoduleparametersTabthemebtnfontitalic","html":"<div id=\"offlajnonoffjformparamsmoduleparametersTabthemebtnfontitalic\" class=\"gk_hack onoffbutton\">\n                <div class=\"gk_hack onoffbutton_img\" style=\"background-image: url(http:\/\/localhost:8888\/fashion\/administrator\/..\/modules\/mod_improved_ajax_login\/params\/offlajnonoff\/images\/italic.png);\"><\/div>\n      <\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][btnfont]italic\" id=\"jformparamsmoduleparametersTabthemebtnfontitalic\" value=\"0\" \/>"},"underline":{"name":"jform[params][moduleparametersTab][theme][btnfont]underline","id":"jformparamsmoduleparametersTabthemebtnfontunderline","html":"<div id=\"offlajnonoffjformparamsmoduleparametersTabthemebtnfontunderline\" class=\"gk_hack onoffbutton\">\n                <div class=\"gk_hack onoffbutton_img\" style=\"background-image: url(http:\/\/localhost:8888\/fashion\/administrator\/..\/modules\/mod_improved_ajax_login\/params\/offlajnonoff\/images\/underline.png);\"><\/div>\n      <\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][btnfont]underline\" id=\"jformparamsmoduleparametersTabthemebtnfontunderline\" value=\"0\" \/>"},"align":{"name":"jform[params][moduleparametersTab][theme][btnfont]align","id":"jformparamsmoduleparametersTabthemebtnfontalign","html":"<div class=\"offlajnradiocontainerimage\" id=\"offlajnradiocontainerjformparamsmoduleparametersTabthemebtnfontalign\"><div class=\"radioelement first selected\"><div class=\"radioelement_img\" style=\"background-image: url(http:\/\/localhost:8888\/fashion\/administrator\/..\/modules\/mod_improved_ajax_login\/params\/offlajnradio\/images\/left_align.png);\"><\/div><\/div><div class=\"radioelement \"><div class=\"radioelement_img\" style=\"background-image: url(http:\/\/localhost:8888\/fashion\/administrator\/..\/modules\/mod_improved_ajax_login\/params\/offlajnradio\/images\/center_align.png);\"><\/div><\/div><div class=\"radioelement  last\"><div class=\"radioelement_img\" style=\"background-image: url(http:\/\/localhost:8888\/fashion\/administrator\/..\/modules\/mod_improved_ajax_login\/params\/offlajnradio\/images\/right_align.png);\"><\/div><\/div><div class=\"clear\"><\/div><\/div><input type=\"hidden\" id=\"jformparamsmoduleparametersTabthemebtnfontalign\" name=\"jform[params][moduleparametersTab][theme][btnfont]align\" value=\"left\"\/>"},"afont":{"name":"jform[params][moduleparametersTab][theme][btnfont]afont","id":"jformparamsmoduleparametersTabthemebtnfontafont","html":"<div class=\"offlajntextcontainer\" id=\"offlajntextcontainerjformparamsmoduleparametersTabthemebtnfontafont\"><input  size=\"10\" class=\"offlajntext\" type=\"text\" id=\"jformparamsmoduleparametersTabthemebtnfontafontinput\" value=\"Helvetica\"><\/div><div class=\"offlajnswitcher\">\r\n            <div class=\"offlajnswitcher_inner\" id=\"offlajnswitcher_innerjformparamsmoduleparametersTabthemebtnfontafontunit\"><\/div>\r\n    <\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][btnfont]afont[unit]\" id=\"jformparamsmoduleparametersTabthemebtnfontafontunit\" value=\"1\" \/><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][btnfont]afont\" id=\"jformparamsmoduleparametersTabthemebtnfontafont\" value=\"Helvetica||1\">"},"tshadow":{"name":"jform[params][moduleparametersTab][theme][btnfont]tshadow","id":"jformparamsmoduleparametersTabthemebtnfonttshadow","html":"<div id=\"offlajncombine_outerjformparamsmoduleparametersTabthemebtnfonttshadow\" class=\"offlajncombine_outer\"><div class=\"offlajncombinefieldcontainer\"><div class=\"offlajncombinefield\"><div class=\"offlajntextcontainer\" id=\"offlajntextcontainerjformparamsmoduleparametersTabthemebtnfonttshadow0\"><input  size=\"1\" class=\"offlajntext\" type=\"text\" id=\"jformparamsmoduleparametersTabthemebtnfonttshadow0input\" value=\"1\"><div class=\"unit\">px<\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][btnfont]tshadow0\" id=\"jformparamsmoduleparametersTabthemebtnfonttshadow0\" value=\"1||px\"><\/div><\/div><div class=\"offlajncombinefieldcontainer\"><div class=\"offlajncombinefield\"><div class=\"offlajntextcontainer\" id=\"offlajntextcontainerjformparamsmoduleparametersTabthemebtnfonttshadow1\"><input  size=\"1\" class=\"offlajntext\" type=\"text\" id=\"jformparamsmoduleparametersTabthemebtnfonttshadow1input\" value=\"1\"><div class=\"unit\">px<\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][btnfont]tshadow1\" id=\"jformparamsmoduleparametersTabthemebtnfonttshadow1\" value=\"1||px\"><\/div><\/div><div class=\"offlajncombinefieldcontainer\"><div class=\"offlajncombinefield\"><div class=\"offlajntextcontainer\" id=\"offlajntextcontainerjformparamsmoduleparametersTabthemebtnfonttshadow2\"><input  size=\"1\" class=\"offlajntext\" type=\"text\" id=\"jformparamsmoduleparametersTabthemebtnfonttshadow2input\" value=\"0\"><div class=\"unit\">px<\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][btnfont]tshadow2\" id=\"jformparamsmoduleparametersTabthemebtnfonttshadow2\" value=\"0\"><\/div><\/div><div class=\"offlajncombinefieldcontainer\"><div class=\"offlajncombinefield\"><div class=\"offlajncolor\"><input type=\"text\" name=\"jform[params][moduleparametersTab][theme][btnfont]tshadow3\" id=\"jformparamsmoduleparametersTabthemebtnfonttshadow3\" value=\"00000000\" class=\"color \" size=\"12\" \/><\/div><\/div><\/div><div class=\"offlajncombinefieldcontainer\"><div class=\"offlajncombinefield\"><div class=\"offlajnswitcher\">\r\n            <div class=\"offlajnswitcher_inner\" id=\"offlajnswitcher_innerjformparamsmoduleparametersTabthemebtnfonttshadow4\"><\/div>\r\n    <\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][btnfont]tshadow4\" id=\"jformparamsmoduleparametersTabthemebtnfonttshadow4\" value=\"0\" \/><\/div><\/div><\/div><div class=\"offlajncombine_hider\"><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][btnfont]tshadow\" id=\"jformparamsmoduleparametersTabthemebtnfonttshadow\" value='1||px|*|1||px|*|0|*|00000000|*|0|*|'>"},"lineheight":{"name":"jform[params][moduleparametersTab][theme][btnfont]lineheight","id":"jformparamsmoduleparametersTabthemebtnfontlineheight","html":"<div class=\"offlajntextcontainer\" id=\"offlajntextcontainerjformparamsmoduleparametersTabthemebtnfontlineheight\"><input  size=\"5\" class=\"offlajntext\" type=\"text\" id=\"jformparamsmoduleparametersTabthemebtnfontlineheightinput\" value=\"normal\"><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][btnfont]lineheight\" id=\"jformparamsmoduleparametersTabthemebtnfontlineheight\" value=\"normal\">"}},
          script: "dojo.addOnLoad(function(){\r\n      new OfflajnRadio({\r\n        id: \"jformparamsmoduleparametersTabthemebtnfonttab\",\r\n        values: [\"Text\"],\r\n        map: {\"Text\":0},\r\n        mode: \"\"\r\n      });\r\n    \r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemebtnfonttype\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">Alternative fonts<\\\/div><div class=\\\"listelement\\\">Cyrillic<\\\/div><div class=\\\"listelement\\\">CyrillicExtended<\\\/div><div class=\\\"listelement\\\">Greek<\\\/div><div class=\\\"listelement\\\">GreekExtended<\\\/div><div class=\\\"listelement\\\">Khmer<\\\/div><div class=\\\"listelement\\\">Latin<\\\/div><div class=\\\"listelement\\\">LatinExtended<\\\/div><div class=\\\"listelement\\\">Vietnamese<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"0\",\"text\":\"Alternative fonts\"},{\"value\":\"Cyrillic\",\"text\":\"Cyrillic\"},{\"value\":\"CyrillicExtended\",\"text\":\"CyrillicExtended\"},{\"value\":\"Greek\",\"text\":\"Greek\"},{\"value\":\"GreekExtended\",\"text\":\"GreekExtended\"},{\"value\":\"Khmer\",\"text\":\"Khmer\"},{\"value\":\"Latin\",\"text\":\"Latin\"},{\"value\":\"LatinExtended\",\"text\":\"LatinExtended\"},{\"value\":\"Vietnamese\",\"text\":\"Vietnamese\"}],\r\n        selectedIndex: 6,\r\n        height: 0,\r\n        fireshow: 0\r\n      });\r\n    dojo.addOnLoad(function(){ \r\n      new OfflajnSwitcher({\r\n        id: \"jformparamsmoduleparametersTabthemebtnfontsizeunit\",\r\n        units: [\"px\",\"em\"],\r\n        values: [\"px\",\"em\"],\r\n        map: {\"px\":0,\"em\":1},\r\n        mode: 0,\r\n        url: \"http:\\\/\\\/localhost:8888\\\/fashion\\\/administrator\\\/..\\\/modules\\\/mod_improved_ajax_login\\\/params\\\/offlajnswitcher\\\/images\\\/\"\r\n      }); \r\n    });\n      new OfflajnText({\n        id: \"jformparamsmoduleparametersTabthemebtnfontsize\",\n        validation: \"int\",\n        attachunit: \"\",\n        mode: \"increment\",\n        scale: \"1\",\n        minus: 0,\n        onoff: \"\"\n      }); \n    \n    var el = dojo.byId(\"jformparamsmoduleparametersTabthemebtnfontcolor\");\n    jQuery.fn.jPicker.defaults.images.clientPath=\"\/fashion\/modules\/mod_improved_ajax_login\/params\/offlajndashboard\/..\/offlajncolor\/offlajncolor\/jpicker\/images\/\";\n    el.alphaSupport=false; \n    el.c = jQuery(\"#jformparamsmoduleparametersTabthemebtnfontcolor\").jPicker({\n        window:{\n          expandable: true,\n          alphaSupport: false}\n        });\n    dojo.connect(el, \"change\", function(){\n      this.c[0].color.active.val(\"hex\", this.value);\n    });\n    \r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemebtnfonttextdecor\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">extralight<\\\/div><div class=\\\"listelement\\\">lighter<\\\/div><div class=\\\"listelement\\\">normal<\\\/div><div class=\\\"listelement\\\">bold<\\\/div><div class=\\\"listelement\\\">bolder<\\\/div><div class=\\\"listelement\\\">extrabold<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"200\",\"text\":\"extralight\"},{\"value\":\"300\",\"text\":\"lighter\"},{\"value\":\"400\",\"text\":\"normal\"},{\"value\":\"600\",\"text\":\"bold\"},{\"value\":\"700\",\"text\":\"bolder\"},{\"value\":\"800\",\"text\":\"extrabold\"}],\r\n        selectedIndex: 1,\r\n        height: \"4\",\r\n        fireshow: 0\r\n      });\r\n    \n      new OfflajnOnOff({\n        id: \"jformparamsmoduleparametersTabthemebtnfontitalic\",\n        mode: \"button\",\n        imgs: \"\"\n      }); \n    \n      new OfflajnOnOff({\n        id: \"jformparamsmoduleparametersTabthemebtnfontunderline\",\n        mode: \"button\",\n        imgs: \"\"\n      }); \n    \r\n      new OfflajnRadio({\r\n        id: \"jformparamsmoduleparametersTabthemebtnfontalign\",\r\n        values: [\"left\",\"center\",\"right\"],\r\n        map: {\"left\":0,\"center\":1,\"right\":2},\r\n        mode: \"image\"\r\n      });\r\n    dojo.addOnLoad(function(){ \r\n      new OfflajnSwitcher({\r\n        id: \"jformparamsmoduleparametersTabthemebtnfontafontunit\",\r\n        units: [\"ON\",\"OFF\"],\r\n        values: [\"1\",\"0\"],\r\n        map: {\"1\":0,\"0\":1},\r\n        mode: 0,\r\n        url: \"http:\\\/\\\/localhost:8888\\\/fashion\\\/administrator\\\/..\\\/modules\\\/mod_improved_ajax_login\\\/params\\\/offlajnswitcher\\\/images\\\/\"\r\n      }); \r\n    });\n      new OfflajnText({\n        id: \"jformparamsmoduleparametersTabthemebtnfontafont\",\n        validation: \"\",\n        attachunit: \"\",\n        mode: \"\",\n        scale: \"\",\n        minus: 0,\n        onoff: \"1\"\n      }); \n    \n      new OfflajnText({\n        id: \"jformparamsmoduleparametersTabthemebtnfonttshadow0\",\n        validation: \"float\",\n        attachunit: \"px\",\n        mode: \"\",\n        scale: \"\",\n        minus: 0,\n        onoff: \"\"\n      }); \n    \n      new OfflajnText({\n        id: \"jformparamsmoduleparametersTabthemebtnfonttshadow1\",\n        validation: \"float\",\n        attachunit: \"px\",\n        mode: \"\",\n        scale: \"\",\n        minus: 0,\n        onoff: \"\"\n      }); \n    \n      new OfflajnText({\n        id: \"jformparamsmoduleparametersTabthemebtnfonttshadow2\",\n        validation: \"float\",\n        attachunit: \"px\",\n        mode: \"\",\n        scale: \"\",\n        minus: 0,\n        onoff: \"\"\n      }); \n    \n    var el = dojo.byId(\"jformparamsmoduleparametersTabthemebtnfonttshadow3\");\n    jQuery.fn.jPicker.defaults.images.clientPath=\"\/fashion\/modules\/mod_improved_ajax_login\/params\/offlajndashboard\/..\/offlajncolor\/offlajncolor\/jpicker\/images\/\";\n    el.alphaSupport=true; \n    el.c = jQuery(\"#jformparamsmoduleparametersTabthemebtnfonttshadow3\").jPicker({\n        window:{\n          expandable: true,\n          alphaSupport: true}\n        });\n    dojo.connect(el, \"change\", function(){\n      this.c[0].color.active.val(\"hex\", this.value);\n    });\n    dojo.addOnLoad(function(){ \r\n      new OfflajnSwitcher({\r\n        id: \"jformparamsmoduleparametersTabthemebtnfonttshadow4\",\r\n        units: [\"ON\",\"OFF\"],\r\n        values: [\"1\",\"0\"],\r\n        map: {\"1\":0,\"0\":1},\r\n        mode: 0,\r\n        url: \"http:\\\/\\\/localhost:8888\\\/fashion\\\/administrator\\\/..\\\/modules\\\/mod_improved_ajax_login\\\/params\\\/offlajnswitcher\\\/images\\\/\"\r\n      }); \r\n    });\r\n      new OfflajnCombine({\r\n        id: \"jformparamsmoduleparametersTabthemebtnfonttshadow\",\r\n        num: 5,\r\n        switcherid: \"jformparamsmoduleparametersTabthemebtnfonttshadow4\",\r\n        hideafter: \"0\",\r\n        islist: \"0\"\r\n      }); \r\n    \n      new OfflajnText({\n        id: \"jformparamsmoduleparametersTabthemebtnfontlineheight\",\n        validation: \"\",\n        attachunit: \"\",\n        mode: \"\",\n        scale: \"\",\n        minus: 0,\n        onoff: \"\"\n      }); \n    });"
        });
    
jQuery.fn.jPicker.defaults.images.clientPath="http://localhost:8888/fashion/administrator/../modules/mod_improved_ajax_login/params/offlajncolor/offlajncolor/jpicker/images/";

      new OfflajnOnOff({
        id: "jformparamsmoduleparametersTabthemebtngradonoff",
        mode: "",
        imgs: ""
      }); 
    

      new OfflajnGradient({
        hidden: dojo.byId("jformparamsmoduleparametersTabthemebtngrad"),
        switcher: dojo.byId("jformparamsmoduleparametersTabthemebtngradonoff"),
        onoff: 0,
        start: dojo.byId("jformparamsmoduleparametersTabthemebtngradstart"),
        end: dojo.byId("jformparamsmoduleparametersTabthemebtngradstop")
      });
    
jQuery.fn.jPicker.defaults.images.clientPath="http://localhost:8888/fashion/administrator/../modules/mod_improved_ajax_login/params/offlajncolor/offlajncolor/jpicker/images/";

      new OfflajnOnOff({
        id: "jformparamsmoduleparametersTabthemehovergradonoff",
        mode: "",
        imgs: ""
      }); 
    

      new OfflajnGradient({
        hidden: dojo.byId("jformparamsmoduleparametersTabthemehovergrad"),
        switcher: dojo.byId("jformparamsmoduleparametersTabthemehovergradonoff"),
        onoff: 0,
        start: dojo.byId("jformparamsmoduleparametersTabthemehovergradstart"),
        end: dojo.byId("jformparamsmoduleparametersTabthemehovergradstop")
      });
    

      new OfflajnText({
        id: "jformparamsmoduleparametersTabthemebuttoncomb0",
        validation: "int",
        attachunit: "px",
        mode: "",
        scale: "",
        minus: 0,
        onoff: ""
      }); 
    

    var el = dojo.byId("jformparamsmoduleparametersTabthemebuttoncomb1");
    jQuery.fn.jPicker.defaults.images.clientPath="/fashion/modules/mod_improved_ajax_login/params/offlajndashboard/../offlajncolor/offlajncolor/jpicker/images/";
    el.alphaSupport=false; 
    el.c = jQuery("#jformparamsmoduleparametersTabthemebuttoncomb1").jPicker({
        window:{
          expandable: true,
          alphaSupport: false}
        });
    dojo.connect(el, "change", function(){
      this.c[0].color.active.val("hex", this.value);
    });
    

      new OfflajnCombine({
        id: "jformparamsmoduleparametersTabthemebuttoncomb",
        num: 2,
        switcherid: "",
        hideafter: "0",
        islist: "0"
      }); 
    

    var el = dojo.byId("jformparamsmoduleparametersTabthemetxtcomb0");
    jQuery.fn.jPicker.defaults.images.clientPath="/fashion/modules/mod_improved_ajax_login/params/offlajndashboard/../offlajncolor/offlajncolor/jpicker/images/";
    el.alphaSupport=false; 
    el.c = jQuery("#jformparamsmoduleparametersTabthemetxtcomb0").jPicker({
        window:{
          expandable: true,
          alphaSupport: false}
        });
    dojo.connect(el, "change", function(){
      this.c[0].color.active.val("hex", this.value);
    });
    

    var el = dojo.byId("jformparamsmoduleparametersTabthemetxtcomb1");
    jQuery.fn.jPicker.defaults.images.clientPath="/fashion/modules/mod_improved_ajax_login/params/offlajndashboard/../offlajncolor/offlajncolor/jpicker/images/";
    el.alphaSupport=false; 
    el.c = jQuery("#jformparamsmoduleparametersTabthemetxtcomb1").jPicker({
        window:{
          expandable: true,
          alphaSupport: false}
        });
    dojo.connect(el, "change", function(){
      this.c[0].color.active.val("hex", this.value);
    });
    

      new OfflajnText({
        id: "jformparamsmoduleparametersTabthemetxtcomb2",
        validation: "int",
        attachunit: "px",
        mode: "",
        scale: "",
        minus: 0,
        onoff: ""
      }); 
    

    var el = dojo.byId("jformparamsmoduleparametersTabthemetxtcomb3");
    jQuery.fn.jPicker.defaults.images.clientPath="/fashion/modules/mod_improved_ajax_login/params/offlajndashboard/../offlajncolor/offlajncolor/jpicker/images/";
    el.alphaSupport=false; 
    el.c = jQuery("#jformparamsmoduleparametersTabthemetxtcomb3").jPicker({
        window:{
          expandable: true,
          alphaSupport: false}
        });
    dojo.connect(el, "change", function(){
      this.c[0].color.active.val("hex", this.value);
    });
    

      new OfflajnRadio({
        id: "jformparamsmoduleparametersTabthemetxtcomb4",
        values: ["0","1"],
        map: [0,1],
        mode: ""
      });
    

      new OfflajnCombine({
        id: "jformparamsmoduleparametersTabthemetxtcomb",
        num: 5,
        switcherid: "",
        hideafter: "3",
        islist: "0"
      }); 
    

    var el = dojo.byId("jformparamsmoduleparametersTabthemecheckboxcolor");
    jQuery.fn.jPicker.defaults.images.clientPath="/fashion/modules/mod_improved_ajax_login/params/offlajndashboard/../offlajncolor/offlajncolor/jpicker/images/";
    el.alphaSupport=false; 
    el.c = jQuery("#jformparamsmoduleparametersTabthemecheckboxcolor").jPicker({
        window:{
          expandable: true,
          alphaSupport: false}
        });
    dojo.connect(el, "change", function(){
      this.c[0].color.active.val("hex", this.value);
    });
    

        new FontConfigurator({
          id: "jformparamsmoduleparametersTabthemetextfont",
          defaultTab: "Text",
          origsettings: {"Text":{"lineheight":"normal","type":"Latin","subset":"Latin","family":"Open Sans","size":"20||px","color":"a1a1a1","afont":"Helvetica||1","underline":"0","textdecor":"300"},"Link":{"color":"1685d7","underline":"0"},"Hover":{"color":"1186bb","underline":"0"}},
          elements: {"tab":{"name":"jform[params][moduleparametersTab][theme][textfont]tab","id":"jformparamsmoduleparametersTabthemetextfonttab","html":"<div class=\"offlajnradiocontainerbutton\" id=\"offlajnradiocontainerjformparamsmoduleparametersTabthemetextfonttab\"><div class=\"radioelement first selected\">Text<\/div><div class=\"radioelement  last\">Hover<\/div><div class=\"clear\"><\/div><\/div><input type=\"hidden\" id=\"jformparamsmoduleparametersTabthemetextfonttab\" name=\"jform[params][moduleparametersTab][theme][textfont]tab\" value=\"Text\"\/>"},"type":{"name":"jform[params][moduleparametersTab][theme][textfont]type","id":"jformparamsmoduleparametersTabthemetextfonttype","Cyrillic":{"name":"jform[params][moduleparametersTab][theme][textfont]family","id":"jformparamsmoduleparametersTabthemetextfontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemetextfontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Open Sans<br \/>Andika<br \/>Anonymous Pro<br \/>Cuprum<br \/>Didact Gothic<br \/>EB Garamond<br \/>Istok Web<br \/>Jura<br \/>Forum<br \/>Kelly Slab<br \/>Lobster<br \/>Neucha<br \/>Open Sans<br \/>Open Sans Condensed<br \/>Philosopher<br \/>Play<br \/>PT Sans<br \/>PT Sans Caption<br \/>PT Sans Narrow<br \/>PT Serif<br \/>PT Serif Caption<br \/>Ruslan Display<br \/>Tenor Sans<br \/>Ubuntu<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][textfont]family\" id=\"jformparamsmoduleparametersTabthemetextfontfamily\" value=\"Open Sans\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemetextfontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">Andika<\\\/div><div class=\\\"listelement\\\">Anonymous Pro<\\\/div><div class=\\\"listelement\\\">Cuprum<\\\/div><div class=\\\"listelement\\\">Didact Gothic<\\\/div><div class=\\\"listelement\\\">EB Garamond<\\\/div><div class=\\\"listelement\\\">Istok Web<\\\/div><div class=\\\"listelement\\\">Jura<\\\/div><div class=\\\"listelement\\\">Forum<\\\/div><div class=\\\"listelement\\\">Kelly Slab<\\\/div><div class=\\\"listelement\\\">Lobster<\\\/div><div class=\\\"listelement\\\">Neucha<\\\/div><div class=\\\"listelement\\\">Open Sans<\\\/div><div class=\\\"listelement\\\">Open Sans Condensed<\\\/div><div class=\\\"listelement\\\">Philosopher<\\\/div><div class=\\\"listelement\\\">Play<\\\/div><div class=\\\"listelement\\\">PT Sans<\\\/div><div class=\\\"listelement\\\">PT Sans Caption<\\\/div><div class=\\\"listelement\\\">PT Sans Narrow<\\\/div><div class=\\\"listelement\\\">PT Serif<\\\/div><div class=\\\"listelement\\\">PT Serif Caption<\\\/div><div class=\\\"listelement\\\">Ruslan Display<\\\/div><div class=\\\"listelement\\\">Tenor Sans<\\\/div><div class=\\\"listelement\\\">Ubuntu<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"Andika\",\"text\":\"Andika\"},{\"value\":\"Anonymous Pro\",\"text\":\"Anonymous Pro\"},{\"value\":\"Cuprum\",\"text\":\"Cuprum\"},{\"value\":\"Didact Gothic\",\"text\":\"Didact Gothic\"},{\"value\":\"EB Garamond\",\"text\":\"EB Garamond\"},{\"value\":\"Istok Web\",\"text\":\"Istok Web\"},{\"value\":\"Jura\",\"text\":\"Jura\"},{\"value\":\"Forum\",\"text\":\"Forum\"},{\"value\":\"Kelly Slab\",\"text\":\"Kelly Slab\"},{\"value\":\"Lobster\",\"text\":\"Lobster\"},{\"value\":\"Neucha\",\"text\":\"Neucha\"},{\"value\":\"Open Sans\",\"text\":\"Open Sans\"},{\"value\":\"Open Sans Condensed\",\"text\":\"Open Sans Condensed\"},{\"value\":\"Philosopher\",\"text\":\"Philosopher\"},{\"value\":\"Play\",\"text\":\"Play\"},{\"value\":\"PT Sans\",\"text\":\"PT Sans\"},{\"value\":\"PT Sans Caption\",\"text\":\"PT Sans Caption\"},{\"value\":\"PT Sans Narrow\",\"text\":\"PT Sans Narrow\"},{\"value\":\"PT Serif\",\"text\":\"PT Serif\"},{\"value\":\"PT Serif Caption\",\"text\":\"PT Serif Caption\"},{\"value\":\"Ruslan Display\",\"text\":\"Ruslan Display\"},{\"value\":\"Tenor Sans\",\"text\":\"Tenor Sans\"},{\"value\":\"Ubuntu\",\"text\":\"Ubuntu\"}],\r\n        selectedIndex: 11,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"CyrillicExtended":{"name":"jform[params][moduleparametersTab][theme][textfont]family","id":"jformparamsmoduleparametersTabthemetextfontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemetextfontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Open Sans<br \/>Andika<br \/>Anonymous Pro<br \/>Didact Gothic<br \/>EB Garamond<br \/>Istok Web<br \/>Jura<br \/>Forum<br \/>Lobster<br \/>Open Sans<br \/>Open Sans Condensed<br \/>Play<br \/>Ruslan Display<br \/>Tenor Sans<br \/>Ubuntu<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][textfont]family\" id=\"jformparamsmoduleparametersTabthemetextfontfamily\" value=\"Open Sans\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemetextfontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">Andika<\\\/div><div class=\\\"listelement\\\">Anonymous Pro<\\\/div><div class=\\\"listelement\\\">Didact Gothic<\\\/div><div class=\\\"listelement\\\">EB Garamond<\\\/div><div class=\\\"listelement\\\">Istok Web<\\\/div><div class=\\\"listelement\\\">Jura<\\\/div><div class=\\\"listelement\\\">Forum<\\\/div><div class=\\\"listelement\\\">Lobster<\\\/div><div class=\\\"listelement\\\">Open Sans<\\\/div><div class=\\\"listelement\\\">Open Sans Condensed<\\\/div><div class=\\\"listelement\\\">Play<\\\/div><div class=\\\"listelement\\\">Ruslan Display<\\\/div><div class=\\\"listelement\\\">Tenor Sans<\\\/div><div class=\\\"listelement\\\">Ubuntu<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"Andika\",\"text\":\"Andika\"},{\"value\":\"Anonymous Pro\",\"text\":\"Anonymous Pro\"},{\"value\":\"Didact Gothic\",\"text\":\"Didact Gothic\"},{\"value\":\"EB Garamond\",\"text\":\"EB Garamond\"},{\"value\":\"Istok Web\",\"text\":\"Istok Web\"},{\"value\":\"Jura\",\"text\":\"Jura\"},{\"value\":\"Forum\",\"text\":\"Forum\"},{\"value\":\"Lobster\",\"text\":\"Lobster\"},{\"value\":\"Open Sans\",\"text\":\"Open Sans\"},{\"value\":\"Open Sans Condensed\",\"text\":\"Open Sans Condensed\"},{\"value\":\"Play\",\"text\":\"Play\"},{\"value\":\"Ruslan Display\",\"text\":\"Ruslan Display\"},{\"value\":\"Tenor Sans\",\"text\":\"Tenor Sans\"},{\"value\":\"Ubuntu\",\"text\":\"Ubuntu\"}],\r\n        selectedIndex: 8,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"Greek":{"name":"jform[params][moduleparametersTab][theme][textfont]family","id":"jformparamsmoduleparametersTabthemetextfontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemetextfontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Open Sans<br \/>Anonymous Pro<br \/>Caudex<br \/>Didact Gothic<br \/>Jura<br \/>GFS Didot<br \/>GFS Neohellenic<br \/>Nova Mono<br \/>Open Sans<br \/>Open Sans Condensed<br \/>Play<br \/>Ubuntu<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][textfont]family\" id=\"jformparamsmoduleparametersTabthemetextfontfamily\" value=\"Open Sans\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemetextfontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">Anonymous Pro<\\\/div><div class=\\\"listelement\\\">Caudex<\\\/div><div class=\\\"listelement\\\">Didact Gothic<\\\/div><div class=\\\"listelement\\\">Jura<\\\/div><div class=\\\"listelement\\\">GFS Didot<\\\/div><div class=\\\"listelement\\\">GFS Neohellenic<\\\/div><div class=\\\"listelement\\\">Nova Mono<\\\/div><div class=\\\"listelement\\\">Open Sans<\\\/div><div class=\\\"listelement\\\">Open Sans Condensed<\\\/div><div class=\\\"listelement\\\">Play<\\\/div><div class=\\\"listelement\\\">Ubuntu<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"Anonymous Pro\",\"text\":\"Anonymous Pro\"},{\"value\":\"Caudex\",\"text\":\"Caudex\"},{\"value\":\"Didact Gothic\",\"text\":\"Didact Gothic\"},{\"value\":\"Jura\",\"text\":\"Jura\"},{\"value\":\"GFS Didot\",\"text\":\"GFS Didot\"},{\"value\":\"GFS Neohellenic\",\"text\":\"GFS Neohellenic\"},{\"value\":\"Nova Mono\",\"text\":\"Nova Mono\"},{\"value\":\"Open Sans\",\"text\":\"Open Sans\"},{\"value\":\"Open Sans Condensed\",\"text\":\"Open Sans Condensed\"},{\"value\":\"Play\",\"text\":\"Play\"},{\"value\":\"Ubuntu\",\"text\":\"Ubuntu\"}],\r\n        selectedIndex: 7,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"GreekExtended":{"name":"jform[params][moduleparametersTab][theme][textfont]family","id":"jformparamsmoduleparametersTabthemetextfontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemetextfontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Open Sans<br \/>Anonymous Pro<br \/>Caudex<br \/>Didact Gothic<br \/>Jura<br \/>Open Sans<br \/>Open Sans Condensed<br \/>Play<br \/>Ubuntu<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][textfont]family\" id=\"jformparamsmoduleparametersTabthemetextfontfamily\" value=\"Open Sans\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemetextfontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">Anonymous Pro<\\\/div><div class=\\\"listelement\\\">Caudex<\\\/div><div class=\\\"listelement\\\">Didact Gothic<\\\/div><div class=\\\"listelement\\\">Jura<\\\/div><div class=\\\"listelement\\\">Open Sans<\\\/div><div class=\\\"listelement\\\">Open Sans Condensed<\\\/div><div class=\\\"listelement\\\">Play<\\\/div><div class=\\\"listelement\\\">Ubuntu<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"Anonymous Pro\",\"text\":\"Anonymous Pro\"},{\"value\":\"Caudex\",\"text\":\"Caudex\"},{\"value\":\"Didact Gothic\",\"text\":\"Didact Gothic\"},{\"value\":\"Jura\",\"text\":\"Jura\"},{\"value\":\"Open Sans\",\"text\":\"Open Sans\"},{\"value\":\"Open Sans Condensed\",\"text\":\"Open Sans Condensed\"},{\"value\":\"Play\",\"text\":\"Play\"},{\"value\":\"Ubuntu\",\"text\":\"Ubuntu\"}],\r\n        selectedIndex: 4,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"Khmer":{"name":"jform[params][moduleparametersTab][theme][textfont]family","id":"jformparamsmoduleparametersTabthemetextfontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemetextfontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Angkor<br \/>Angkor<br \/>Battambang<br \/>Bayon<br \/>Bokor<br \/>Chenla<br \/>Content<br \/>Dangrek<br \/>Freehand<br \/>Hanuman<br \/>Khmer<br \/>Koulen<br \/>Metal<br \/>Moul<br \/>Moulpali<br \/>Odor Mean Chey<br \/>Preahvihear<br \/>Siemreap<br \/>Suwannaphum<br \/>Taprom<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][textfont]family\" id=\"jformparamsmoduleparametersTabthemetextfontfamily\" value=\"Angkor\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemetextfontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">Angkor<\\\/div><div class=\\\"listelement\\\">Battambang<\\\/div><div class=\\\"listelement\\\">Bayon<\\\/div><div class=\\\"listelement\\\">Bokor<\\\/div><div class=\\\"listelement\\\">Chenla<\\\/div><div class=\\\"listelement\\\">Content<\\\/div><div class=\\\"listelement\\\">Dangrek<\\\/div><div class=\\\"listelement\\\">Freehand<\\\/div><div class=\\\"listelement\\\">Hanuman<\\\/div><div class=\\\"listelement\\\">Khmer<\\\/div><div class=\\\"listelement\\\">Koulen<\\\/div><div class=\\\"listelement\\\">Metal<\\\/div><div class=\\\"listelement\\\">Moul<\\\/div><div class=\\\"listelement\\\">Moulpali<\\\/div><div class=\\\"listelement\\\">Odor Mean Chey<\\\/div><div class=\\\"listelement\\\">Preahvihear<\\\/div><div class=\\\"listelement\\\">Siemreap<\\\/div><div class=\\\"listelement\\\">Suwannaphum<\\\/div><div class=\\\"listelement\\\">Taprom<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"Angkor\",\"text\":\"Angkor\"},{\"value\":\"Battambang\",\"text\":\"Battambang\"},{\"value\":\"Bayon\",\"text\":\"Bayon\"},{\"value\":\"Bokor\",\"text\":\"Bokor\"},{\"value\":\"Chenla\",\"text\":\"Chenla\"},{\"value\":\"Content\",\"text\":\"Content\"},{\"value\":\"Dangrek\",\"text\":\"Dangrek\"},{\"value\":\"Freehand\",\"text\":\"Freehand\"},{\"value\":\"Hanuman\",\"text\":\"Hanuman\"},{\"value\":\"Khmer\",\"text\":\"Khmer\"},{\"value\":\"Koulen\",\"text\":\"Koulen\"},{\"value\":\"Metal\",\"text\":\"Metal\"},{\"value\":\"Moul\",\"text\":\"Moul\"},{\"value\":\"Moulpali\",\"text\":\"Moulpali\"},{\"value\":\"Odor Mean Chey\",\"text\":\"Odor Mean Chey\"},{\"value\":\"Preahvihear\",\"text\":\"Preahvihear\"},{\"value\":\"Siemreap\",\"text\":\"Siemreap\"},{\"value\":\"Suwannaphum\",\"text\":\"Suwannaphum\"},{\"value\":\"Taprom\",\"text\":\"Taprom\"}],\r\n        selectedIndex: 0,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"Latin":{"name":"jform[params][moduleparametersTab][theme][textfont]family","id":"jformparamsmoduleparametersTabthemetextfontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemetextfontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Open Sans<br \/>ABeeZee<br \/>Abel<br \/>Abril Fatface<br \/>Aclonica<br \/>Acme<br \/>Actor<br \/>Adamina<br \/>Advent Pro<br \/>Aguafina Script<br \/>Akronim<br \/>Aladin<br \/>Aldrich<br \/>Alegreya<br \/>Alegreya SC<br \/>Alex Brush<br \/>Alfa Slab One<br \/>Alice<br \/>Alike<br \/>Alike Angular<br \/>Allan<br \/>Allerta<br \/>Allerta Stencil<br \/>Allura<br \/>Almendra<br \/>Almendra Display<br \/>Almendra SC<br \/>Amarante<br \/>Amaranth<br \/>Amatic SC<br \/>Amethysta<br \/>Anaheim<br \/>Andada<br \/>Andika<br \/>Angkor<br \/>Annie Use Your Telescope<br \/>Anonymous Pro<br \/>Antic<br \/>Antic Didone<br \/>Antic Slab<br \/>Anton<br \/>Arapey<br \/>Arbutus<br \/>Arbutus Slab<br \/>Architects Daughter<br \/>Archivo Black<br \/>Archivo Narrow<br \/>Arimo<br \/>Arizonia<br \/>Armata<br \/>Artifika<br \/>Arvo<br \/>Asap<br \/>Asset<br \/>Astloch<br \/>Asul<br \/>Atomic Age<br \/>Aubrey<br \/>Audiowide<br \/>Autour One<br \/>Average<br \/>Average Sans<br \/>Averia Gruesa Libre<br \/>Averia Libre<br \/>Averia Sans Libre<br \/>Averia Serif Libre<br \/>Bad Script<br \/>Balthazar<br \/>Bangers<br \/>Basic<br \/>Battambang<br \/>Baumans<br \/>Bayon<br \/>Belgrano<br \/>Belleza<br \/>BenchNine<br \/>Bentham<br \/>Berkshire Swash<br \/>Bevan<br \/>Bigelow Rules<br \/>Bigshot One<br \/>Bilbo<br \/>Bilbo Swash Caps<br \/>Bitter<br \/>Black Ops One<br \/>Bokor<br \/>Bonbon<br \/>Boogaloo<br \/>Bowlby One<br \/>Bowlby One SC<br \/>Brawler<br \/>Bree Serif<br \/>Bubblegum Sans<br \/>Bubbler One<br \/>Buda<br \/>Buenard<br \/>Butcherman<br \/>Butterfly Kids<br \/>Cabin<br \/>Cabin Condensed<br \/>Cabin Sketch<br \/>Caesar Dressing<br \/>Cagliostro<br \/>Calligraffitti<br \/>Cambo<br \/>Candal<br \/>Cantarell<br \/>Cantata One<br \/>Cantora One<br \/>Capriola<br \/>Cardo<br \/>Carme<br \/>Carrois Gothic<br \/>Carrois Gothic SC<br \/>Carter One<br \/>Caudex<br \/>Cedarville Cursive<br \/>Ceviche One<br \/>Changa One<br \/>Chango<br \/>Chau Philomene One<br \/>Chela One<br \/>Chelsea Market<br \/>Chenla<br \/>Cherry Cream Soda<br \/>Cherry Swash<br \/>Chewy<br \/>Chicle<br \/>Chivo<br \/>Cinzel<br \/>Cinzel Decorative<br \/>Clicker Script<br \/>Coda<br \/>Coda Caption<br \/>Codystar<br \/>Combo<br \/>Comfortaa<br \/>Coming Soon<br \/>Concert One<br \/>Condiment<br \/>Content<br \/>Contrail One<br \/>Convergence<br \/>Cookie<br \/>Copse<br \/>Corben<br \/>Courgette<br \/>Cousine<br \/>Coustard<br \/>Covered By Your Grace<br \/>Crafty Girls<br \/>Creepster<br \/>Crete Round<br \/>Crimson Text<br \/>Croissant One<br \/>Crushed<br \/>Cuprum<br \/>Cutive<br \/>Cutive Mono<br \/>Damion<br \/>Dancing Script<br \/>Dangrek<br \/>Dawning of a New Day<br \/>Days One<br \/>Delius<br \/>Delius Swash Caps<br \/>Delius Unicase<br \/>Della Respira<br \/>Devonshire<br \/>Didact Gothic<br \/>Diplomata<br \/>Diplomata SC<br \/>Doppio One<br \/>Dorsa<br \/>Dosis<br \/>Dr Sugiyama<br \/>Droid Sans<br \/>Droid Sans Mono<br \/>Droid Serif<br \/>Duru Sans<br \/>Dynalight<br \/>EB Garamond<br \/>Eagle Lake<br \/>Eater<br \/>Economica<br \/>Electrolize<br \/>Emblema One<br \/>Emilys Candy<br \/>Engagement<br \/>Englebert<br \/>Enriqueta<br \/>Erica One<br \/>Esteban<br \/>Euphoria Script<br \/>Ewert<br \/>Exo<br \/>Expletus Sans<br \/>Fanwood Text<br \/>Fascinate<br \/>Fascinate Inline<br \/>Faster One<br \/>Fasthand<br \/>Federant<br \/>Federo<br \/>Felipa<br \/>Fenix<br \/>Finger Paint<br \/>Fjord One<br \/>Flamenco<br \/>Flavors<br \/>Fondamento<br \/>Fontdiner Swanky<br \/>Forum<br \/>Francois One<br \/>Freckle Face<br \/>Fredericka the Great<br \/>Fredoka One<br \/>Freehand<br \/>Fresca<br \/>Frijole<br \/>Fugaz One<br \/>GFS Didot<br \/>GFS Neohellenic<br \/>Gafata<br \/>Galdeano<br \/>Galindo<br \/>Gentium Basic<br \/>Gentium Book Basic<br \/>Geo<br \/>Geostar<br \/>Geostar Fill<br \/>Germania One<br \/>Gilda Display<br \/>Give You Glory<br \/>Glass Antiqua<br \/>Glegoo<br \/>Gloria Hallelujah<br \/>Goblin One<br \/>Gochi Hand<br \/>Gorditas<br \/>Goudy Bookletter 1911<br \/>Graduate<br \/>Gravitas One<br \/>Great Vibes<br \/>Griffy<br \/>Gruppo<br \/>Gudea<br \/>Habibi<br \/>Hammersmith One<br \/>Hanalei<br \/>Hanalei Fill<br \/>Handlee<br \/>Hanuman<br \/>Happy Monkey<br \/>Headland One<br \/>Henny Penny<br \/>Herr Von Muellerhoff<br \/>Holtwood One SC<br \/>Homemade Apple<br \/>Homenaje<br \/>IM Fell DW Pica<br \/>IM Fell DW Pica SC<br \/>IM Fell Double Pica<br \/>IM Fell Double Pica SC<br \/>IM Fell English<br \/>IM Fell English SC<br \/>IM Fell French Canon<br \/>IM Fell French Canon SC<br \/>IM Fell Great Primer<br \/>IM Fell Great Primer SC<br \/>Iceberg<br \/>Iceland<br \/>Imprima<br \/>Inconsolata<br \/>Inder<br \/>Indie Flower<br \/>Inika<br \/>Irish Grover<br \/>Istok Web<br \/>Italiana<br \/>Italianno<br \/>Jacques Francois<br \/>Jacques Francois Shadow<br \/>Jim Nightshade<br \/>Jockey One<br \/>Jolly Lodger<br \/>Josefin Sans<br \/>Josefin Slab<br \/>Joti One<br \/>Judson<br \/>Julee<br \/>Julius Sans One<br \/>Junge<br \/>Jura<br \/>Just Another Hand<br \/>Just Me Again Down Here<br \/>Kameron<br \/>Karla<br \/>Kaushan Script<br \/>Keania One<br \/>Kelly Slab<br \/>Kenia<br \/>Khmer<br \/>Kite One<br \/>Knewave<br \/>Kotta One<br \/>Koulen<br \/>Kranky<br \/>Kreon<br \/>Kristi<br \/>Krona One<br \/>La Belle Aurore<br \/>Lancelot<br \/>Lato<br \/>League Script<br \/>Leckerli One<br \/>Ledger<br \/>Lekton<br \/>Lemon<br \/>Life Savers<br \/>Lilita One<br \/>Limelight<br \/>Linden Hill<br \/>Lobster<br \/>Lobster Two<br \/>Londrina Outline<br \/>Londrina Shadow<br \/>Londrina Sketch<br \/>Londrina Solid<br \/>Lora<br \/>Love Ya Like A Sister<br \/>Loved by the King<br \/>Lovers Quarrel<br \/>Luckiest Guy<br \/>Lusitana<br \/>Lustria<br \/>Macondo<br \/>Macondo Swash Caps<br \/>Magra<br \/>Maiden Orange<br \/>Mako<br \/>Marcellus<br \/>Marcellus SC<br \/>Marck Script<br \/>Margarine<br \/>Marko One<br \/>Marmelad<br \/>Marvel<br \/>Mate<br \/>Mate SC<br \/>Maven Pro<br \/>McLaren<br \/>Meddon<br \/>MedievalSharp<br \/>Medula One<br \/>Megrim<br \/>Meie Script<br \/>Merienda<br \/>Merienda One<br \/>Merriweather<br \/>Metal<br \/>Metal Mania<br \/>Metamorphous<br \/>Metrophobic<br \/>Michroma<br \/>Miltonian<br \/>Miltonian Tattoo<br \/>Miniver<br \/>Miss Fajardose<br \/>Modern Antiqua<br \/>Molengo<br \/>Molle<br \/>Monofett<br \/>Monoton<br \/>Monsieur La Doulaise<br \/>Montaga<br \/>Montez<br \/>Montserrat<br \/>Montserrat Alternates<br \/>Montserrat Subrayada<br \/>Moul<br \/>Moulpali<br \/>Mountains of Christmas<br \/>Mouse Memoirs<br \/>Mr Bedfort<br \/>Mr Dafoe<br \/>Mr De Haviland<br \/>Mrs Saint Delafield<br \/>Mrs Sheppards<br \/>Muli<br \/>Mystery Quest<br \/>Neucha<br \/>Neuton<br \/>News Cycle<br \/>Niconne<br \/>Nixie One<br \/>Nobile<br \/>Nokora<br \/>Norican<br \/>Nosifer<br \/>Nothing You Could Do<br \/>Noticia Text<br \/>Nova Cut<br \/>Nova Flat<br \/>Nova Mono<br \/>Nova Oval<br \/>Nova Round<br \/>Nova Script<br \/>Nova Slim<br \/>Nova Square<br \/>Numans<br \/>Nunito<br \/>Odor Mean Chey<br \/>Offside<br \/>Old Standard TT<br \/>Oldenburg<br \/>Oleo Script<br \/>Oleo Script Swash Caps<br \/>Open Sans<br \/>Open Sans Condensed<br \/>Oranienbaum<br \/>Orbitron<br \/>Oregano<br \/>Orienta<br \/>Original Surfer<br \/>Oswald<br \/>Over the Rainbow<br \/>Overlock<br \/>Overlock SC<br \/>Ovo<br \/>Oxygen<br \/>Oxygen Mono<br \/>PT Mono<br \/>PT Sans<br \/>PT Sans Caption<br \/>PT Sans Narrow<br \/>PT Serif<br \/>PT Serif Caption<br \/>Pacifico<br \/>Paprika<br \/>Parisienne<br \/>Passero One<br \/>Passion One<br \/>Patrick Hand<br \/>Patua One<br \/>Paytone One<br \/>Peralta<br \/>Permanent Marker<br \/>Petit Formal Script<br \/>Petrona<br \/>Philosopher<br \/>Piedra<br \/>Pinyon Script<br \/>Pirata One<br \/>Plaster<br \/>Play<br \/>Playball<br \/>Playfair Display<br \/>Playfair Display SC<br \/>Podkova<br \/>Poiret One<br \/>Poller One<br \/>Poly<br \/>Pompiere<br \/>Pontano Sans<br \/>Port Lligat Sans<br \/>Port Lligat Slab<br \/>Prata<br \/>Preahvihear<br \/>Press Start 2P<br \/>Princess Sofia<br \/>Prociono<br \/>Prosto One<br \/>Puritan<br \/>Purple Purse<br \/>Quando<br \/>Quantico<br \/>Quattrocento<br \/>Quattrocento Sans<br \/>Questrial<br \/>Quicksand<br \/>Quintessential<br \/>Qwigley<br \/>Racing Sans One<br \/>Radley<br \/>Raleway<br \/>Raleway Dots<br \/>Rambla<br \/>Rammetto One<br \/>Ranchers<br \/>Rancho<br \/>Rationale<br \/>Redressed<br \/>Reenie Beanie<br \/>Revalia<br \/>Ribeye<br \/>Ribeye Marrow<br \/>Righteous<br \/>Risque<br \/>Rochester<br \/>Rock Salt<br \/>Rokkitt<br \/>Romanesco<br \/>Ropa Sans<br \/>Rosario<br \/>Rosarivo<br \/>Rouge Script<br \/>Ruda<br \/>Rufina<br \/>Ruge Boogie<br \/>Ruluko<br \/>Rum Raisin<br \/>Ruslan Display<br \/>Russo One<br \/>Ruthie<br \/>Rye<br \/>Sacramento<br \/>Sail<br \/>Salsa<br \/>Sanchez<br \/>Sancreek<br \/>Sansita One<br \/>Sarina<br \/>Satisfy<br \/>Scada<br \/>Schoolbell<br \/>Seaweed Script<br \/>Sevillana<br \/>Seymour One<br \/>Shadows Into Light<br \/>Shadows Into Light Two<br \/>Shanti<br \/>Share<br \/>Share Tech<br \/>Share Tech Mono<br \/>Shojumaru<br \/>Short Stack<br \/>Siemreap<br \/>Sigmar One<br \/>Signika<br \/>Signika Negative<br \/>Simonetta<br \/>Sirin Stencil<br \/>Six Caps<br \/>Skranji<br \/>Slackey<br \/>Smokum<br \/>Smythe<br \/>Sniglet<br \/>Snippet<br \/>Snowburst One<br \/>Sofadi One<br \/>Sofia<br \/>Sonsie One<br \/>Sorts Mill Goudy<br \/>Source Code Pro<br \/>Source Sans Pro<br \/>Special Elite<br \/>Spicy Rice<br \/>Spinnaker<br \/>Spirax<br \/>Squada One<br \/>Stalemate<br \/>Stalinist One<br \/>Stardos Stencil<br \/>Stint Ultra Condensed<br \/>Stint Ultra Expanded<br \/>Stoke<br \/>Strait<br \/>Sue Ellen Francisco<br \/>Sunshiney<br \/>Supermercado One<br \/>Suwannaphum<br \/>Swanky and Moo Moo<br \/>Syncopate<br \/>Tangerine<br \/>Taprom<br \/>Telex<br \/>Tenor Sans<br \/>Text Me One<br \/>The Girl Next Door<br \/>Tienne<br \/>Tinos<br \/>Titan One<br \/>Titillium Web<br \/>Trade Winds<br \/>Trocchi<br \/>Trochut<br \/>Trykker<br \/>Tulpen One<br \/>Ubuntu<br \/>Ubuntu Condensed<br \/>Ubuntu Mono<br \/>Ultra<br \/>Uncial Antiqua<br \/>Underdog<br \/>Unica One<br \/>UnifrakturCook<br \/>UnifrakturMaguntia<br \/>Unkempt<br \/>Unlock<br \/>Unna<br \/>VT323<br \/>Vampiro One<br \/>Varela<br \/>Varela Round<br \/>Vast Shadow<br \/>Vibur<br \/>Vidaloka<br \/>Viga<br \/>Voces<br \/>Volkhov<br \/>Vollkorn<br \/>Voltaire<br \/>Waiting for the Sunrise<br \/>Wallpoet<br \/>Walter Turncoat<br \/>Warnes<br \/>Wellfleet<br \/>Wire One<br \/>Yanone Kaffeesatz<br \/>Yellowtail<br \/>Yeseva One<br \/>Yesteryear<br \/>Zeyada<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][textfont]family\" id=\"jformparamsmoduleparametersTabthemetextfontfamily\" value=\"Open Sans\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemetextfontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">ABeeZee<\\\/div><div class=\\\"listelement\\\">Abel<\\\/div><div class=\\\"listelement\\\">Abril Fatface<\\\/div><div class=\\\"listelement\\\">Aclonica<\\\/div><div class=\\\"listelement\\\">Acme<\\\/div><div class=\\\"listelement\\\">Actor<\\\/div><div class=\\\"listelement\\\">Adamina<\\\/div><div class=\\\"listelement\\\">Advent Pro<\\\/div><div class=\\\"listelement\\\">Aguafina Script<\\\/div><div class=\\\"listelement\\\">Akronim<\\\/div><div class=\\\"listelement\\\">Aladin<\\\/div><div class=\\\"listelement\\\">Aldrich<\\\/div><div class=\\\"listelement\\\">Alegreya<\\\/div><div class=\\\"listelement\\\">Alegreya SC<\\\/div><div class=\\\"listelement\\\">Alex Brush<\\\/div><div class=\\\"listelement\\\">Alfa Slab One<\\\/div><div class=\\\"listelement\\\">Alice<\\\/div><div class=\\\"listelement\\\">Alike<\\\/div><div class=\\\"listelement\\\">Alike Angular<\\\/div><div class=\\\"listelement\\\">Allan<\\\/div><div class=\\\"listelement\\\">Allerta<\\\/div><div class=\\\"listelement\\\">Allerta Stencil<\\\/div><div class=\\\"listelement\\\">Allura<\\\/div><div class=\\\"listelement\\\">Almendra<\\\/div><div class=\\\"listelement\\\">Almendra Display<\\\/div><div class=\\\"listelement\\\">Almendra SC<\\\/div><div class=\\\"listelement\\\">Amarante<\\\/div><div class=\\\"listelement\\\">Amaranth<\\\/div><div class=\\\"listelement\\\">Amatic SC<\\\/div><div class=\\\"listelement\\\">Amethysta<\\\/div><div class=\\\"listelement\\\">Anaheim<\\\/div><div class=\\\"listelement\\\">Andada<\\\/div><div class=\\\"listelement\\\">Andika<\\\/div><div class=\\\"listelement\\\">Angkor<\\\/div><div class=\\\"listelement\\\">Annie Use Your Telescope<\\\/div><div class=\\\"listelement\\\">Anonymous Pro<\\\/div><div class=\\\"listelement\\\">Antic<\\\/div><div class=\\\"listelement\\\">Antic Didone<\\\/div><div class=\\\"listelement\\\">Antic Slab<\\\/div><div class=\\\"listelement\\\">Anton<\\\/div><div class=\\\"listelement\\\">Arapey<\\\/div><div class=\\\"listelement\\\">Arbutus<\\\/div><div class=\\\"listelement\\\">Arbutus Slab<\\\/div><div class=\\\"listelement\\\">Architects Daughter<\\\/div><div class=\\\"listelement\\\">Archivo Black<\\\/div><div class=\\\"listelement\\\">Archivo Narrow<\\\/div><div class=\\\"listelement\\\">Arimo<\\\/div><div class=\\\"listelement\\\">Arizonia<\\\/div><div class=\\\"listelement\\\">Armata<\\\/div><div class=\\\"listelement\\\">Artifika<\\\/div><div class=\\\"listelement\\\">Arvo<\\\/div><div class=\\\"listelement\\\">Asap<\\\/div><div class=\\\"listelement\\\">Asset<\\\/div><div class=\\\"listelement\\\">Astloch<\\\/div><div class=\\\"listelement\\\">Asul<\\\/div><div class=\\\"listelement\\\">Atomic Age<\\\/div><div class=\\\"listelement\\\">Aubrey<\\\/div><div class=\\\"listelement\\\">Audiowide<\\\/div><div class=\\\"listelement\\\">Autour One<\\\/div><div class=\\\"listelement\\\">Average<\\\/div><div class=\\\"listelement\\\">Average Sans<\\\/div><div class=\\\"listelement\\\">Averia Gruesa Libre<\\\/div><div class=\\\"listelement\\\">Averia Libre<\\\/div><div class=\\\"listelement\\\">Averia Sans Libre<\\\/div><div class=\\\"listelement\\\">Averia Serif Libre<\\\/div><div class=\\\"listelement\\\">Bad Script<\\\/div><div class=\\\"listelement\\\">Balthazar<\\\/div><div class=\\\"listelement\\\">Bangers<\\\/div><div class=\\\"listelement\\\">Basic<\\\/div><div class=\\\"listelement\\\">Battambang<\\\/div><div class=\\\"listelement\\\">Baumans<\\\/div><div class=\\\"listelement\\\">Bayon<\\\/div><div class=\\\"listelement\\\">Belgrano<\\\/div><div class=\\\"listelement\\\">Belleza<\\\/div><div class=\\\"listelement\\\">BenchNine<\\\/div><div class=\\\"listelement\\\">Bentham<\\\/div><div class=\\\"listelement\\\">Berkshire Swash<\\\/div><div class=\\\"listelement\\\">Bevan<\\\/div><div class=\\\"listelement\\\">Bigelow Rules<\\\/div><div class=\\\"listelement\\\">Bigshot One<\\\/div><div class=\\\"listelement\\\">Bilbo<\\\/div><div class=\\\"listelement\\\">Bilbo Swash Caps<\\\/div><div class=\\\"listelement\\\">Bitter<\\\/div><div class=\\\"listelement\\\">Black Ops One<\\\/div><div class=\\\"listelement\\\">Bokor<\\\/div><div class=\\\"listelement\\\">Bonbon<\\\/div><div class=\\\"listelement\\\">Boogaloo<\\\/div><div class=\\\"listelement\\\">Bowlby One<\\\/div><div class=\\\"listelement\\\">Bowlby One SC<\\\/div><div class=\\\"listelement\\\">Brawler<\\\/div><div class=\\\"listelement\\\">Bree Serif<\\\/div><div class=\\\"listelement\\\">Bubblegum Sans<\\\/div><div class=\\\"listelement\\\">Bubbler One<\\\/div><div class=\\\"listelement\\\">Buda<\\\/div><div class=\\\"listelement\\\">Buenard<\\\/div><div class=\\\"listelement\\\">Butcherman<\\\/div><div class=\\\"listelement\\\">Butterfly Kids<\\\/div><div class=\\\"listelement\\\">Cabin<\\\/div><div class=\\\"listelement\\\">Cabin Condensed<\\\/div><div class=\\\"listelement\\\">Cabin Sketch<\\\/div><div class=\\\"listelement\\\">Caesar Dressing<\\\/div><div class=\\\"listelement\\\">Cagliostro<\\\/div><div class=\\\"listelement\\\">Calligraffitti<\\\/div><div class=\\\"listelement\\\">Cambo<\\\/div><div class=\\\"listelement\\\">Candal<\\\/div><div class=\\\"listelement\\\">Cantarell<\\\/div><div class=\\\"listelement\\\">Cantata One<\\\/div><div class=\\\"listelement\\\">Cantora One<\\\/div><div class=\\\"listelement\\\">Capriola<\\\/div><div class=\\\"listelement\\\">Cardo<\\\/div><div class=\\\"listelement\\\">Carme<\\\/div><div class=\\\"listelement\\\">Carrois Gothic<\\\/div><div class=\\\"listelement\\\">Carrois Gothic SC<\\\/div><div class=\\\"listelement\\\">Carter One<\\\/div><div class=\\\"listelement\\\">Caudex<\\\/div><div class=\\\"listelement\\\">Cedarville Cursive<\\\/div><div class=\\\"listelement\\\">Ceviche One<\\\/div><div class=\\\"listelement\\\">Changa One<\\\/div><div class=\\\"listelement\\\">Chango<\\\/div><div class=\\\"listelement\\\">Chau Philomene One<\\\/div><div class=\\\"listelement\\\">Chela One<\\\/div><div class=\\\"listelement\\\">Chelsea Market<\\\/div><div class=\\\"listelement\\\">Chenla<\\\/div><div class=\\\"listelement\\\">Cherry Cream Soda<\\\/div><div class=\\\"listelement\\\">Cherry Swash<\\\/div><div class=\\\"listelement\\\">Chewy<\\\/div><div class=\\\"listelement\\\">Chicle<\\\/div><div class=\\\"listelement\\\">Chivo<\\\/div><div class=\\\"listelement\\\">Cinzel<\\\/div><div class=\\\"listelement\\\">Cinzel Decorative<\\\/div><div class=\\\"listelement\\\">Clicker Script<\\\/div><div class=\\\"listelement\\\">Coda<\\\/div><div class=\\\"listelement\\\">Coda Caption<\\\/div><div class=\\\"listelement\\\">Codystar<\\\/div><div class=\\\"listelement\\\">Combo<\\\/div><div class=\\\"listelement\\\">Comfortaa<\\\/div><div class=\\\"listelement\\\">Coming Soon<\\\/div><div class=\\\"listelement\\\">Concert One<\\\/div><div class=\\\"listelement\\\">Condiment<\\\/div><div class=\\\"listelement\\\">Content<\\\/div><div class=\\\"listelement\\\">Contrail One<\\\/div><div class=\\\"listelement\\\">Convergence<\\\/div><div class=\\\"listelement\\\">Cookie<\\\/div><div class=\\\"listelement\\\">Copse<\\\/div><div class=\\\"listelement\\\">Corben<\\\/div><div class=\\\"listelement\\\">Courgette<\\\/div><div class=\\\"listelement\\\">Cousine<\\\/div><div class=\\\"listelement\\\">Coustard<\\\/div><div class=\\\"listelement\\\">Covered By Your Grace<\\\/div><div class=\\\"listelement\\\">Crafty Girls<\\\/div><div class=\\\"listelement\\\">Creepster<\\\/div><div class=\\\"listelement\\\">Crete Round<\\\/div><div class=\\\"listelement\\\">Crimson Text<\\\/div><div class=\\\"listelement\\\">Croissant One<\\\/div><div class=\\\"listelement\\\">Crushed<\\\/div><div class=\\\"listelement\\\">Cuprum<\\\/div><div class=\\\"listelement\\\">Cutive<\\\/div><div class=\\\"listelement\\\">Cutive Mono<\\\/div><div class=\\\"listelement\\\">Damion<\\\/div><div class=\\\"listelement\\\">Dancing Script<\\\/div><div class=\\\"listelement\\\">Dangrek<\\\/div><div class=\\\"listelement\\\">Dawning of a New Day<\\\/div><div class=\\\"listelement\\\">Days One<\\\/div><div class=\\\"listelement\\\">Delius<\\\/div><div class=\\\"listelement\\\">Delius Swash Caps<\\\/div><div class=\\\"listelement\\\">Delius Unicase<\\\/div><div class=\\\"listelement\\\">Della Respira<\\\/div><div class=\\\"listelement\\\">Devonshire<\\\/div><div class=\\\"listelement\\\">Didact Gothic<\\\/div><div class=\\\"listelement\\\">Diplomata<\\\/div><div class=\\\"listelement\\\">Diplomata SC<\\\/div><div class=\\\"listelement\\\">Doppio One<\\\/div><div class=\\\"listelement\\\">Dorsa<\\\/div><div class=\\\"listelement\\\">Dosis<\\\/div><div class=\\\"listelement\\\">Dr Sugiyama<\\\/div><div class=\\\"listelement\\\">Droid Sans<\\\/div><div class=\\\"listelement\\\">Droid Sans Mono<\\\/div><div class=\\\"listelement\\\">Droid Serif<\\\/div><div class=\\\"listelement\\\">Duru Sans<\\\/div><div class=\\\"listelement\\\">Dynalight<\\\/div><div class=\\\"listelement\\\">EB Garamond<\\\/div><div class=\\\"listelement\\\">Eagle Lake<\\\/div><div class=\\\"listelement\\\">Eater<\\\/div><div class=\\\"listelement\\\">Economica<\\\/div><div class=\\\"listelement\\\">Electrolize<\\\/div><div class=\\\"listelement\\\">Emblema One<\\\/div><div class=\\\"listelement\\\">Emilys Candy<\\\/div><div class=\\\"listelement\\\">Engagement<\\\/div><div class=\\\"listelement\\\">Englebert<\\\/div><div class=\\\"listelement\\\">Enriqueta<\\\/div><div class=\\\"listelement\\\">Erica One<\\\/div><div class=\\\"listelement\\\">Esteban<\\\/div><div class=\\\"listelement\\\">Euphoria Script<\\\/div><div class=\\\"listelement\\\">Ewert<\\\/div><div class=\\\"listelement\\\">Exo<\\\/div><div class=\\\"listelement\\\">Expletus Sans<\\\/div><div class=\\\"listelement\\\">Fanwood Text<\\\/div><div class=\\\"listelement\\\">Fascinate<\\\/div><div class=\\\"listelement\\\">Fascinate Inline<\\\/div><div class=\\\"listelement\\\">Faster One<\\\/div><div class=\\\"listelement\\\">Fasthand<\\\/div><div class=\\\"listelement\\\">Federant<\\\/div><div class=\\\"listelement\\\">Federo<\\\/div><div class=\\\"listelement\\\">Felipa<\\\/div><div class=\\\"listelement\\\">Fenix<\\\/div><div class=\\\"listelement\\\">Finger Paint<\\\/div><div class=\\\"listelement\\\">Fjord One<\\\/div><div class=\\\"listelement\\\">Flamenco<\\\/div><div class=\\\"listelement\\\">Flavors<\\\/div><div class=\\\"listelement\\\">Fondamento<\\\/div><div class=\\\"listelement\\\">Fontdiner Swanky<\\\/div><div class=\\\"listelement\\\">Forum<\\\/div><div class=\\\"listelement\\\">Francois One<\\\/div><div class=\\\"listelement\\\">Freckle Face<\\\/div><div class=\\\"listelement\\\">Fredericka the Great<\\\/div><div class=\\\"listelement\\\">Fredoka One<\\\/div><div class=\\\"listelement\\\">Freehand<\\\/div><div class=\\\"listelement\\\">Fresca<\\\/div><div class=\\\"listelement\\\">Frijole<\\\/div><div class=\\\"listelement\\\">Fugaz One<\\\/div><div class=\\\"listelement\\\">GFS Didot<\\\/div><div class=\\\"listelement\\\">GFS Neohellenic<\\\/div><div class=\\\"listelement\\\">Gafata<\\\/div><div class=\\\"listelement\\\">Galdeano<\\\/div><div class=\\\"listelement\\\">Galindo<\\\/div><div class=\\\"listelement\\\">Gentium Basic<\\\/div><div class=\\\"listelement\\\">Gentium Book Basic<\\\/div><div class=\\\"listelement\\\">Geo<\\\/div><div class=\\\"listelement\\\">Geostar<\\\/div><div class=\\\"listelement\\\">Geostar Fill<\\\/div><div class=\\\"listelement\\\">Germania One<\\\/div><div class=\\\"listelement\\\">Gilda Display<\\\/div><div class=\\\"listelement\\\">Give You Glory<\\\/div><div class=\\\"listelement\\\">Glass Antiqua<\\\/div><div class=\\\"listelement\\\">Glegoo<\\\/div><div class=\\\"listelement\\\">Gloria Hallelujah<\\\/div><div class=\\\"listelement\\\">Goblin One<\\\/div><div class=\\\"listelement\\\">Gochi Hand<\\\/div><div class=\\\"listelement\\\">Gorditas<\\\/div><div class=\\\"listelement\\\">Goudy Bookletter 1911<\\\/div><div class=\\\"listelement\\\">Graduate<\\\/div><div class=\\\"listelement\\\">Gravitas One<\\\/div><div class=\\\"listelement\\\">Great Vibes<\\\/div><div class=\\\"listelement\\\">Griffy<\\\/div><div class=\\\"listelement\\\">Gruppo<\\\/div><div class=\\\"listelement\\\">Gudea<\\\/div><div class=\\\"listelement\\\">Habibi<\\\/div><div class=\\\"listelement\\\">Hammersmith One<\\\/div><div class=\\\"listelement\\\">Hanalei<\\\/div><div class=\\\"listelement\\\">Hanalei Fill<\\\/div><div class=\\\"listelement\\\">Handlee<\\\/div><div class=\\\"listelement\\\">Hanuman<\\\/div><div class=\\\"listelement\\\">Happy Monkey<\\\/div><div class=\\\"listelement\\\">Headland One<\\\/div><div class=\\\"listelement\\\">Henny Penny<\\\/div><div class=\\\"listelement\\\">Herr Von Muellerhoff<\\\/div><div class=\\\"listelement\\\">Holtwood One SC<\\\/div><div class=\\\"listelement\\\">Homemade Apple<\\\/div><div class=\\\"listelement\\\">Homenaje<\\\/div><div class=\\\"listelement\\\">IM Fell DW Pica<\\\/div><div class=\\\"listelement\\\">IM Fell DW Pica SC<\\\/div><div class=\\\"listelement\\\">IM Fell Double Pica<\\\/div><div class=\\\"listelement\\\">IM Fell Double Pica SC<\\\/div><div class=\\\"listelement\\\">IM Fell English<\\\/div><div class=\\\"listelement\\\">IM Fell English SC<\\\/div><div class=\\\"listelement\\\">IM Fell French Canon<\\\/div><div class=\\\"listelement\\\">IM Fell French Canon SC<\\\/div><div class=\\\"listelement\\\">IM Fell Great Primer<\\\/div><div class=\\\"listelement\\\">IM Fell Great Primer SC<\\\/div><div class=\\\"listelement\\\">Iceberg<\\\/div><div class=\\\"listelement\\\">Iceland<\\\/div><div class=\\\"listelement\\\">Imprima<\\\/div><div class=\\\"listelement\\\">Inconsolata<\\\/div><div class=\\\"listelement\\\">Inder<\\\/div><div class=\\\"listelement\\\">Indie Flower<\\\/div><div class=\\\"listelement\\\">Inika<\\\/div><div class=\\\"listelement\\\">Irish Grover<\\\/div><div class=\\\"listelement\\\">Istok Web<\\\/div><div class=\\\"listelement\\\">Italiana<\\\/div><div class=\\\"listelement\\\">Italianno<\\\/div><div class=\\\"listelement\\\">Jacques Francois<\\\/div><div class=\\\"listelement\\\">Jacques Francois Shadow<\\\/div><div class=\\\"listelement\\\">Jim Nightshade<\\\/div><div class=\\\"listelement\\\">Jockey One<\\\/div><div class=\\\"listelement\\\">Jolly Lodger<\\\/div><div class=\\\"listelement\\\">Josefin Sans<\\\/div><div class=\\\"listelement\\\">Josefin Slab<\\\/div><div class=\\\"listelement\\\">Joti One<\\\/div><div class=\\\"listelement\\\">Judson<\\\/div><div class=\\\"listelement\\\">Julee<\\\/div><div class=\\\"listelement\\\">Julius Sans One<\\\/div><div class=\\\"listelement\\\">Junge<\\\/div><div class=\\\"listelement\\\">Jura<\\\/div><div class=\\\"listelement\\\">Just Another Hand<\\\/div><div class=\\\"listelement\\\">Just Me Again Down Here<\\\/div><div class=\\\"listelement\\\">Kameron<\\\/div><div class=\\\"listelement\\\">Karla<\\\/div><div class=\\\"listelement\\\">Kaushan Script<\\\/div><div class=\\\"listelement\\\">Keania One<\\\/div><div class=\\\"listelement\\\">Kelly Slab<\\\/div><div class=\\\"listelement\\\">Kenia<\\\/div><div class=\\\"listelement\\\">Khmer<\\\/div><div class=\\\"listelement\\\">Kite One<\\\/div><div class=\\\"listelement\\\">Knewave<\\\/div><div class=\\\"listelement\\\">Kotta One<\\\/div><div class=\\\"listelement\\\">Koulen<\\\/div><div class=\\\"listelement\\\">Kranky<\\\/div><div class=\\\"listelement\\\">Kreon<\\\/div><div class=\\\"listelement\\\">Kristi<\\\/div><div class=\\\"listelement\\\">Krona One<\\\/div><div class=\\\"listelement\\\">La Belle Aurore<\\\/div><div class=\\\"listelement\\\">Lancelot<\\\/div><div class=\\\"listelement\\\">Lato<\\\/div><div class=\\\"listelement\\\">League Script<\\\/div><div class=\\\"listelement\\\">Leckerli One<\\\/div><div class=\\\"listelement\\\">Ledger<\\\/div><div class=\\\"listelement\\\">Lekton<\\\/div><div class=\\\"listelement\\\">Lemon<\\\/div><div class=\\\"listelement\\\">Life Savers<\\\/div><div class=\\\"listelement\\\">Lilita One<\\\/div><div class=\\\"listelement\\\">Limelight<\\\/div><div class=\\\"listelement\\\">Linden Hill<\\\/div><div class=\\\"listelement\\\">Lobster<\\\/div><div class=\\\"listelement\\\">Lobster Two<\\\/div><div class=\\\"listelement\\\">Londrina Outline<\\\/div><div class=\\\"listelement\\\">Londrina Shadow<\\\/div><div class=\\\"listelement\\\">Londrina Sketch<\\\/div><div class=\\\"listelement\\\">Londrina Solid<\\\/div><div class=\\\"listelement\\\">Lora<\\\/div><div class=\\\"listelement\\\">Love Ya Like A Sister<\\\/div><div class=\\\"listelement\\\">Loved by the King<\\\/div><div class=\\\"listelement\\\">Lovers Quarrel<\\\/div><div class=\\\"listelement\\\">Luckiest Guy<\\\/div><div class=\\\"listelement\\\">Lusitana<\\\/div><div class=\\\"listelement\\\">Lustria<\\\/div><div class=\\\"listelement\\\">Macondo<\\\/div><div class=\\\"listelement\\\">Macondo Swash Caps<\\\/div><div class=\\\"listelement\\\">Magra<\\\/div><div class=\\\"listelement\\\">Maiden Orange<\\\/div><div class=\\\"listelement\\\">Mako<\\\/div><div class=\\\"listelement\\\">Marcellus<\\\/div><div class=\\\"listelement\\\">Marcellus SC<\\\/div><div class=\\\"listelement\\\">Marck Script<\\\/div><div class=\\\"listelement\\\">Margarine<\\\/div><div class=\\\"listelement\\\">Marko One<\\\/div><div class=\\\"listelement\\\">Marmelad<\\\/div><div class=\\\"listelement\\\">Marvel<\\\/div><div class=\\\"listelement\\\">Mate<\\\/div><div class=\\\"listelement\\\">Mate SC<\\\/div><div class=\\\"listelement\\\">Maven Pro<\\\/div><div class=\\\"listelement\\\">McLaren<\\\/div><div class=\\\"listelement\\\">Meddon<\\\/div><div class=\\\"listelement\\\">MedievalSharp<\\\/div><div class=\\\"listelement\\\">Medula One<\\\/div><div class=\\\"listelement\\\">Megrim<\\\/div><div class=\\\"listelement\\\">Meie Script<\\\/div><div class=\\\"listelement\\\">Merienda<\\\/div><div class=\\\"listelement\\\">Merienda One<\\\/div><div class=\\\"listelement\\\">Merriweather<\\\/div><div class=\\\"listelement\\\">Metal<\\\/div><div class=\\\"listelement\\\">Metal Mania<\\\/div><div class=\\\"listelement\\\">Metamorphous<\\\/div><div class=\\\"listelement\\\">Metrophobic<\\\/div><div class=\\\"listelement\\\">Michroma<\\\/div><div class=\\\"listelement\\\">Miltonian<\\\/div><div class=\\\"listelement\\\">Miltonian Tattoo<\\\/div><div class=\\\"listelement\\\">Miniver<\\\/div><div class=\\\"listelement\\\">Miss Fajardose<\\\/div><div class=\\\"listelement\\\">Modern Antiqua<\\\/div><div class=\\\"listelement\\\">Molengo<\\\/div><div class=\\\"listelement\\\">Molle<\\\/div><div class=\\\"listelement\\\">Monofett<\\\/div><div class=\\\"listelement\\\">Monoton<\\\/div><div class=\\\"listelement\\\">Monsieur La Doulaise<\\\/div><div class=\\\"listelement\\\">Montaga<\\\/div><div class=\\\"listelement\\\">Montez<\\\/div><div class=\\\"listelement\\\">Montserrat<\\\/div><div class=\\\"listelement\\\">Montserrat Alternates<\\\/div><div class=\\\"listelement\\\">Montserrat Subrayada<\\\/div><div class=\\\"listelement\\\">Moul<\\\/div><div class=\\\"listelement\\\">Moulpali<\\\/div><div class=\\\"listelement\\\">Mountains of Christmas<\\\/div><div class=\\\"listelement\\\">Mouse Memoirs<\\\/div><div class=\\\"listelement\\\">Mr Bedfort<\\\/div><div class=\\\"listelement\\\">Mr Dafoe<\\\/div><div class=\\\"listelement\\\">Mr De Haviland<\\\/div><div class=\\\"listelement\\\">Mrs Saint Delafield<\\\/div><div class=\\\"listelement\\\">Mrs Sheppards<\\\/div><div class=\\\"listelement\\\">Muli<\\\/div><div class=\\\"listelement\\\">Mystery Quest<\\\/div><div class=\\\"listelement\\\">Neucha<\\\/div><div class=\\\"listelement\\\">Neuton<\\\/div><div class=\\\"listelement\\\">News Cycle<\\\/div><div class=\\\"listelement\\\">Niconne<\\\/div><div class=\\\"listelement\\\">Nixie One<\\\/div><div class=\\\"listelement\\\">Nobile<\\\/div><div class=\\\"listelement\\\">Nokora<\\\/div><div class=\\\"listelement\\\">Norican<\\\/div><div class=\\\"listelement\\\">Nosifer<\\\/div><div class=\\\"listelement\\\">Nothing You Could Do<\\\/div><div class=\\\"listelement\\\">Noticia Text<\\\/div><div class=\\\"listelement\\\">Nova Cut<\\\/div><div class=\\\"listelement\\\">Nova Flat<\\\/div><div class=\\\"listelement\\\">Nova Mono<\\\/div><div class=\\\"listelement\\\">Nova Oval<\\\/div><div class=\\\"listelement\\\">Nova Round<\\\/div><div class=\\\"listelement\\\">Nova Script<\\\/div><div class=\\\"listelement\\\">Nova Slim<\\\/div><div class=\\\"listelement\\\">Nova Square<\\\/div><div class=\\\"listelement\\\">Numans<\\\/div><div class=\\\"listelement\\\">Nunito<\\\/div><div class=\\\"listelement\\\">Odor Mean Chey<\\\/div><div class=\\\"listelement\\\">Offside<\\\/div><div class=\\\"listelement\\\">Old Standard TT<\\\/div><div class=\\\"listelement\\\">Oldenburg<\\\/div><div class=\\\"listelement\\\">Oleo Script<\\\/div><div class=\\\"listelement\\\">Oleo Script Swash Caps<\\\/div><div class=\\\"listelement\\\">Open Sans<\\\/div><div class=\\\"listelement\\\">Open Sans Condensed<\\\/div><div class=\\\"listelement\\\">Oranienbaum<\\\/div><div class=\\\"listelement\\\">Orbitron<\\\/div><div class=\\\"listelement\\\">Oregano<\\\/div><div class=\\\"listelement\\\">Orienta<\\\/div><div class=\\\"listelement\\\">Original Surfer<\\\/div><div class=\\\"listelement\\\">Oswald<\\\/div><div class=\\\"listelement\\\">Over the Rainbow<\\\/div><div class=\\\"listelement\\\">Overlock<\\\/div><div class=\\\"listelement\\\">Overlock SC<\\\/div><div class=\\\"listelement\\\">Ovo<\\\/div><div class=\\\"listelement\\\">Oxygen<\\\/div><div class=\\\"listelement\\\">Oxygen Mono<\\\/div><div class=\\\"listelement\\\">PT Mono<\\\/div><div class=\\\"listelement\\\">PT Sans<\\\/div><div class=\\\"listelement\\\">PT Sans Caption<\\\/div><div class=\\\"listelement\\\">PT Sans Narrow<\\\/div><div class=\\\"listelement\\\">PT Serif<\\\/div><div class=\\\"listelement\\\">PT Serif Caption<\\\/div><div class=\\\"listelement\\\">Pacifico<\\\/div><div class=\\\"listelement\\\">Paprika<\\\/div><div class=\\\"listelement\\\">Parisienne<\\\/div><div class=\\\"listelement\\\">Passero One<\\\/div><div class=\\\"listelement\\\">Passion One<\\\/div><div class=\\\"listelement\\\">Patrick Hand<\\\/div><div class=\\\"listelement\\\">Patua One<\\\/div><div class=\\\"listelement\\\">Paytone One<\\\/div><div class=\\\"listelement\\\">Peralta<\\\/div><div class=\\\"listelement\\\">Permanent Marker<\\\/div><div class=\\\"listelement\\\">Petit Formal Script<\\\/div><div class=\\\"listelement\\\">Petrona<\\\/div><div class=\\\"listelement\\\">Philosopher<\\\/div><div class=\\\"listelement\\\">Piedra<\\\/div><div class=\\\"listelement\\\">Pinyon Script<\\\/div><div class=\\\"listelement\\\">Pirata One<\\\/div><div class=\\\"listelement\\\">Plaster<\\\/div><div class=\\\"listelement\\\">Play<\\\/div><div class=\\\"listelement\\\">Playball<\\\/div><div class=\\\"listelement\\\">Playfair Display<\\\/div><div class=\\\"listelement\\\">Playfair Display SC<\\\/div><div class=\\\"listelement\\\">Podkova<\\\/div><div class=\\\"listelement\\\">Poiret One<\\\/div><div class=\\\"listelement\\\">Poller One<\\\/div><div class=\\\"listelement\\\">Poly<\\\/div><div class=\\\"listelement\\\">Pompiere<\\\/div><div class=\\\"listelement\\\">Pontano Sans<\\\/div><div class=\\\"listelement\\\">Port Lligat Sans<\\\/div><div class=\\\"listelement\\\">Port Lligat Slab<\\\/div><div class=\\\"listelement\\\">Prata<\\\/div><div class=\\\"listelement\\\">Preahvihear<\\\/div><div class=\\\"listelement\\\">Press Start 2P<\\\/div><div class=\\\"listelement\\\">Princess Sofia<\\\/div><div class=\\\"listelement\\\">Prociono<\\\/div><div class=\\\"listelement\\\">Prosto One<\\\/div><div class=\\\"listelement\\\">Puritan<\\\/div><div class=\\\"listelement\\\">Purple Purse<\\\/div><div class=\\\"listelement\\\">Quando<\\\/div><div class=\\\"listelement\\\">Quantico<\\\/div><div class=\\\"listelement\\\">Quattrocento<\\\/div><div class=\\\"listelement\\\">Quattrocento Sans<\\\/div><div class=\\\"listelement\\\">Questrial<\\\/div><div class=\\\"listelement\\\">Quicksand<\\\/div><div class=\\\"listelement\\\">Quintessential<\\\/div><div class=\\\"listelement\\\">Qwigley<\\\/div><div class=\\\"listelement\\\">Racing Sans One<\\\/div><div class=\\\"listelement\\\">Radley<\\\/div><div class=\\\"listelement\\\">Raleway<\\\/div><div class=\\\"listelement\\\">Raleway Dots<\\\/div><div class=\\\"listelement\\\">Rambla<\\\/div><div class=\\\"listelement\\\">Rammetto One<\\\/div><div class=\\\"listelement\\\">Ranchers<\\\/div><div class=\\\"listelement\\\">Rancho<\\\/div><div class=\\\"listelement\\\">Rationale<\\\/div><div class=\\\"listelement\\\">Redressed<\\\/div><div class=\\\"listelement\\\">Reenie Beanie<\\\/div><div class=\\\"listelement\\\">Revalia<\\\/div><div class=\\\"listelement\\\">Ribeye<\\\/div><div class=\\\"listelement\\\">Ribeye Marrow<\\\/div><div class=\\\"listelement\\\">Righteous<\\\/div><div class=\\\"listelement\\\">Risque<\\\/div><div class=\\\"listelement\\\">Rochester<\\\/div><div class=\\\"listelement\\\">Rock Salt<\\\/div><div class=\\\"listelement\\\">Rokkitt<\\\/div><div class=\\\"listelement\\\">Romanesco<\\\/div><div class=\\\"listelement\\\">Ropa Sans<\\\/div><div class=\\\"listelement\\\">Rosario<\\\/div><div class=\\\"listelement\\\">Rosarivo<\\\/div><div class=\\\"listelement\\\">Rouge Script<\\\/div><div class=\\\"listelement\\\">Ruda<\\\/div><div class=\\\"listelement\\\">Rufina<\\\/div><div class=\\\"listelement\\\">Ruge Boogie<\\\/div><div class=\\\"listelement\\\">Ruluko<\\\/div><div class=\\\"listelement\\\">Rum Raisin<\\\/div><div class=\\\"listelement\\\">Ruslan Display<\\\/div><div class=\\\"listelement\\\">Russo One<\\\/div><div class=\\\"listelement\\\">Ruthie<\\\/div><div class=\\\"listelement\\\">Rye<\\\/div><div class=\\\"listelement\\\">Sacramento<\\\/div><div class=\\\"listelement\\\">Sail<\\\/div><div class=\\\"listelement\\\">Salsa<\\\/div><div class=\\\"listelement\\\">Sanchez<\\\/div><div class=\\\"listelement\\\">Sancreek<\\\/div><div class=\\\"listelement\\\">Sansita One<\\\/div><div class=\\\"listelement\\\">Sarina<\\\/div><div class=\\\"listelement\\\">Satisfy<\\\/div><div class=\\\"listelement\\\">Scada<\\\/div><div class=\\\"listelement\\\">Schoolbell<\\\/div><div class=\\\"listelement\\\">Seaweed Script<\\\/div><div class=\\\"listelement\\\">Sevillana<\\\/div><div class=\\\"listelement\\\">Seymour One<\\\/div><div class=\\\"listelement\\\">Shadows Into Light<\\\/div><div class=\\\"listelement\\\">Shadows Into Light Two<\\\/div><div class=\\\"listelement\\\">Shanti<\\\/div><div class=\\\"listelement\\\">Share<\\\/div><div class=\\\"listelement\\\">Share Tech<\\\/div><div class=\\\"listelement\\\">Share Tech Mono<\\\/div><div class=\\\"listelement\\\">Shojumaru<\\\/div><div class=\\\"listelement\\\">Short Stack<\\\/div><div class=\\\"listelement\\\">Siemreap<\\\/div><div class=\\\"listelement\\\">Sigmar One<\\\/div><div class=\\\"listelement\\\">Signika<\\\/div><div class=\\\"listelement\\\">Signika Negative<\\\/div><div class=\\\"listelement\\\">Simonetta<\\\/div><div class=\\\"listelement\\\">Sirin Stencil<\\\/div><div class=\\\"listelement\\\">Six Caps<\\\/div><div class=\\\"listelement\\\">Skranji<\\\/div><div class=\\\"listelement\\\">Slackey<\\\/div><div class=\\\"listelement\\\">Smokum<\\\/div><div class=\\\"listelement\\\">Smythe<\\\/div><div class=\\\"listelement\\\">Sniglet<\\\/div><div class=\\\"listelement\\\">Snippet<\\\/div><div class=\\\"listelement\\\">Snowburst One<\\\/div><div class=\\\"listelement\\\">Sofadi One<\\\/div><div class=\\\"listelement\\\">Sofia<\\\/div><div class=\\\"listelement\\\">Sonsie One<\\\/div><div class=\\\"listelement\\\">Sorts Mill Goudy<\\\/div><div class=\\\"listelement\\\">Source Code Pro<\\\/div><div class=\\\"listelement\\\">Source Sans Pro<\\\/div><div class=\\\"listelement\\\">Special Elite<\\\/div><div class=\\\"listelement\\\">Spicy Rice<\\\/div><div class=\\\"listelement\\\">Spinnaker<\\\/div><div class=\\\"listelement\\\">Spirax<\\\/div><div class=\\\"listelement\\\">Squada One<\\\/div><div class=\\\"listelement\\\">Stalemate<\\\/div><div class=\\\"listelement\\\">Stalinist One<\\\/div><div class=\\\"listelement\\\">Stardos Stencil<\\\/div><div class=\\\"listelement\\\">Stint Ultra Condensed<\\\/div><div class=\\\"listelement\\\">Stint Ultra Expanded<\\\/div><div class=\\\"listelement\\\">Stoke<\\\/div><div class=\\\"listelement\\\">Strait<\\\/div><div class=\\\"listelement\\\">Sue Ellen Francisco<\\\/div><div class=\\\"listelement\\\">Sunshiney<\\\/div><div class=\\\"listelement\\\">Supermercado One<\\\/div><div class=\\\"listelement\\\">Suwannaphum<\\\/div><div class=\\\"listelement\\\">Swanky and Moo Moo<\\\/div><div class=\\\"listelement\\\">Syncopate<\\\/div><div class=\\\"listelement\\\">Tangerine<\\\/div><div class=\\\"listelement\\\">Taprom<\\\/div><div class=\\\"listelement\\\">Telex<\\\/div><div class=\\\"listelement\\\">Tenor Sans<\\\/div><div class=\\\"listelement\\\">Text Me One<\\\/div><div class=\\\"listelement\\\">The Girl Next Door<\\\/div><div class=\\\"listelement\\\">Tienne<\\\/div><div class=\\\"listelement\\\">Tinos<\\\/div><div class=\\\"listelement\\\">Titan One<\\\/div><div class=\\\"listelement\\\">Titillium Web<\\\/div><div class=\\\"listelement\\\">Trade Winds<\\\/div><div class=\\\"listelement\\\">Trocchi<\\\/div><div class=\\\"listelement\\\">Trochut<\\\/div><div class=\\\"listelement\\\">Trykker<\\\/div><div class=\\\"listelement\\\">Tulpen One<\\\/div><div class=\\\"listelement\\\">Ubuntu<\\\/div><div class=\\\"listelement\\\">Ubuntu Condensed<\\\/div><div class=\\\"listelement\\\">Ubuntu Mono<\\\/div><div class=\\\"listelement\\\">Ultra<\\\/div><div class=\\\"listelement\\\">Uncial Antiqua<\\\/div><div class=\\\"listelement\\\">Underdog<\\\/div><div class=\\\"listelement\\\">Unica One<\\\/div><div class=\\\"listelement\\\">UnifrakturCook<\\\/div><div class=\\\"listelement\\\">UnifrakturMaguntia<\\\/div><div class=\\\"listelement\\\">Unkempt<\\\/div><div class=\\\"listelement\\\">Unlock<\\\/div><div class=\\\"listelement\\\">Unna<\\\/div><div class=\\\"listelement\\\">VT323<\\\/div><div class=\\\"listelement\\\">Vampiro One<\\\/div><div class=\\\"listelement\\\">Varela<\\\/div><div class=\\\"listelement\\\">Varela Round<\\\/div><div class=\\\"listelement\\\">Vast Shadow<\\\/div><div class=\\\"listelement\\\">Vibur<\\\/div><div class=\\\"listelement\\\">Vidaloka<\\\/div><div class=\\\"listelement\\\">Viga<\\\/div><div class=\\\"listelement\\\">Voces<\\\/div><div class=\\\"listelement\\\">Volkhov<\\\/div><div class=\\\"listelement\\\">Vollkorn<\\\/div><div class=\\\"listelement\\\">Voltaire<\\\/div><div class=\\\"listelement\\\">Waiting for the Sunrise<\\\/div><div class=\\\"listelement\\\">Wallpoet<\\\/div><div class=\\\"listelement\\\">Walter Turncoat<\\\/div><div class=\\\"listelement\\\">Warnes<\\\/div><div class=\\\"listelement\\\">Wellfleet<\\\/div><div class=\\\"listelement\\\">Wire One<\\\/div><div class=\\\"listelement\\\">Yanone Kaffeesatz<\\\/div><div class=\\\"listelement\\\">Yellowtail<\\\/div><div class=\\\"listelement\\\">Yeseva One<\\\/div><div class=\\\"listelement\\\">Yesteryear<\\\/div><div class=\\\"listelement\\\">Zeyada<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"ABeeZee\",\"text\":\"ABeeZee\"},{\"value\":\"Abel\",\"text\":\"Abel\"},{\"value\":\"Abril Fatface\",\"text\":\"Abril Fatface\"},{\"value\":\"Aclonica\",\"text\":\"Aclonica\"},{\"value\":\"Acme\",\"text\":\"Acme\"},{\"value\":\"Actor\",\"text\":\"Actor\"},{\"value\":\"Adamina\",\"text\":\"Adamina\"},{\"value\":\"Advent Pro\",\"text\":\"Advent Pro\"},{\"value\":\"Aguafina Script\",\"text\":\"Aguafina Script\"},{\"value\":\"Akronim\",\"text\":\"Akronim\"},{\"value\":\"Aladin\",\"text\":\"Aladin\"},{\"value\":\"Aldrich\",\"text\":\"Aldrich\"},{\"value\":\"Alegreya\",\"text\":\"Alegreya\"},{\"value\":\"Alegreya SC\",\"text\":\"Alegreya SC\"},{\"value\":\"Alex Brush\",\"text\":\"Alex Brush\"},{\"value\":\"Alfa Slab One\",\"text\":\"Alfa Slab One\"},{\"value\":\"Alice\",\"text\":\"Alice\"},{\"value\":\"Alike\",\"text\":\"Alike\"},{\"value\":\"Alike Angular\",\"text\":\"Alike Angular\"},{\"value\":\"Allan\",\"text\":\"Allan\"},{\"value\":\"Allerta\",\"text\":\"Allerta\"},{\"value\":\"Allerta Stencil\",\"text\":\"Allerta Stencil\"},{\"value\":\"Allura\",\"text\":\"Allura\"},{\"value\":\"Almendra\",\"text\":\"Almendra\"},{\"value\":\"Almendra Display\",\"text\":\"Almendra Display\"},{\"value\":\"Almendra SC\",\"text\":\"Almendra SC\"},{\"value\":\"Amarante\",\"text\":\"Amarante\"},{\"value\":\"Amaranth\",\"text\":\"Amaranth\"},{\"value\":\"Amatic SC\",\"text\":\"Amatic SC\"},{\"value\":\"Amethysta\",\"text\":\"Amethysta\"},{\"value\":\"Anaheim\",\"text\":\"Anaheim\"},{\"value\":\"Andada\",\"text\":\"Andada\"},{\"value\":\"Andika\",\"text\":\"Andika\"},{\"value\":\"Angkor\",\"text\":\"Angkor\"},{\"value\":\"Annie Use Your Telescope\",\"text\":\"Annie Use Your Telescope\"},{\"value\":\"Anonymous Pro\",\"text\":\"Anonymous Pro\"},{\"value\":\"Antic\",\"text\":\"Antic\"},{\"value\":\"Antic Didone\",\"text\":\"Antic Didone\"},{\"value\":\"Antic Slab\",\"text\":\"Antic Slab\"},{\"value\":\"Anton\",\"text\":\"Anton\"},{\"value\":\"Arapey\",\"text\":\"Arapey\"},{\"value\":\"Arbutus\",\"text\":\"Arbutus\"},{\"value\":\"Arbutus Slab\",\"text\":\"Arbutus Slab\"},{\"value\":\"Architects Daughter\",\"text\":\"Architects Daughter\"},{\"value\":\"Archivo Black\",\"text\":\"Archivo Black\"},{\"value\":\"Archivo Narrow\",\"text\":\"Archivo Narrow\"},{\"value\":\"Arimo\",\"text\":\"Arimo\"},{\"value\":\"Arizonia\",\"text\":\"Arizonia\"},{\"value\":\"Armata\",\"text\":\"Armata\"},{\"value\":\"Artifika\",\"text\":\"Artifika\"},{\"value\":\"Arvo\",\"text\":\"Arvo\"},{\"value\":\"Asap\",\"text\":\"Asap\"},{\"value\":\"Asset\",\"text\":\"Asset\"},{\"value\":\"Astloch\",\"text\":\"Astloch\"},{\"value\":\"Asul\",\"text\":\"Asul\"},{\"value\":\"Atomic Age\",\"text\":\"Atomic Age\"},{\"value\":\"Aubrey\",\"text\":\"Aubrey\"},{\"value\":\"Audiowide\",\"text\":\"Audiowide\"},{\"value\":\"Autour One\",\"text\":\"Autour One\"},{\"value\":\"Average\",\"text\":\"Average\"},{\"value\":\"Average Sans\",\"text\":\"Average Sans\"},{\"value\":\"Averia Gruesa Libre\",\"text\":\"Averia Gruesa Libre\"},{\"value\":\"Averia Libre\",\"text\":\"Averia Libre\"},{\"value\":\"Averia Sans Libre\",\"text\":\"Averia Sans Libre\"},{\"value\":\"Averia Serif Libre\",\"text\":\"Averia Serif Libre\"},{\"value\":\"Bad Script\",\"text\":\"Bad Script\"},{\"value\":\"Balthazar\",\"text\":\"Balthazar\"},{\"value\":\"Bangers\",\"text\":\"Bangers\"},{\"value\":\"Basic\",\"text\":\"Basic\"},{\"value\":\"Battambang\",\"text\":\"Battambang\"},{\"value\":\"Baumans\",\"text\":\"Baumans\"},{\"value\":\"Bayon\",\"text\":\"Bayon\"},{\"value\":\"Belgrano\",\"text\":\"Belgrano\"},{\"value\":\"Belleza\",\"text\":\"Belleza\"},{\"value\":\"BenchNine\",\"text\":\"BenchNine\"},{\"value\":\"Bentham\",\"text\":\"Bentham\"},{\"value\":\"Berkshire Swash\",\"text\":\"Berkshire Swash\"},{\"value\":\"Bevan\",\"text\":\"Bevan\"},{\"value\":\"Bigelow Rules\",\"text\":\"Bigelow Rules\"},{\"value\":\"Bigshot One\",\"text\":\"Bigshot One\"},{\"value\":\"Bilbo\",\"text\":\"Bilbo\"},{\"value\":\"Bilbo Swash Caps\",\"text\":\"Bilbo Swash Caps\"},{\"value\":\"Bitter\",\"text\":\"Bitter\"},{\"value\":\"Black Ops One\",\"text\":\"Black Ops One\"},{\"value\":\"Bokor\",\"text\":\"Bokor\"},{\"value\":\"Bonbon\",\"text\":\"Bonbon\"},{\"value\":\"Boogaloo\",\"text\":\"Boogaloo\"},{\"value\":\"Bowlby One\",\"text\":\"Bowlby One\"},{\"value\":\"Bowlby One SC\",\"text\":\"Bowlby One SC\"},{\"value\":\"Brawler\",\"text\":\"Brawler\"},{\"value\":\"Bree Serif\",\"text\":\"Bree Serif\"},{\"value\":\"Bubblegum Sans\",\"text\":\"Bubblegum Sans\"},{\"value\":\"Bubbler One\",\"text\":\"Bubbler One\"},{\"value\":\"Buda\",\"text\":\"Buda\"},{\"value\":\"Buenard\",\"text\":\"Buenard\"},{\"value\":\"Butcherman\",\"text\":\"Butcherman\"},{\"value\":\"Butterfly Kids\",\"text\":\"Butterfly Kids\"},{\"value\":\"Cabin\",\"text\":\"Cabin\"},{\"value\":\"Cabin Condensed\",\"text\":\"Cabin Condensed\"},{\"value\":\"Cabin Sketch\",\"text\":\"Cabin Sketch\"},{\"value\":\"Caesar Dressing\",\"text\":\"Caesar Dressing\"},{\"value\":\"Cagliostro\",\"text\":\"Cagliostro\"},{\"value\":\"Calligraffitti\",\"text\":\"Calligraffitti\"},{\"value\":\"Cambo\",\"text\":\"Cambo\"},{\"value\":\"Candal\",\"text\":\"Candal\"},{\"value\":\"Cantarell\",\"text\":\"Cantarell\"},{\"value\":\"Cantata One\",\"text\":\"Cantata One\"},{\"value\":\"Cantora One\",\"text\":\"Cantora One\"},{\"value\":\"Capriola\",\"text\":\"Capriola\"},{\"value\":\"Cardo\",\"text\":\"Cardo\"},{\"value\":\"Carme\",\"text\":\"Carme\"},{\"value\":\"Carrois Gothic\",\"text\":\"Carrois Gothic\"},{\"value\":\"Carrois Gothic SC\",\"text\":\"Carrois Gothic SC\"},{\"value\":\"Carter One\",\"text\":\"Carter One\"},{\"value\":\"Caudex\",\"text\":\"Caudex\"},{\"value\":\"Cedarville Cursive\",\"text\":\"Cedarville Cursive\"},{\"value\":\"Ceviche One\",\"text\":\"Ceviche One\"},{\"value\":\"Changa One\",\"text\":\"Changa One\"},{\"value\":\"Chango\",\"text\":\"Chango\"},{\"value\":\"Chau Philomene One\",\"text\":\"Chau Philomene One\"},{\"value\":\"Chela One\",\"text\":\"Chela One\"},{\"value\":\"Chelsea Market\",\"text\":\"Chelsea Market\"},{\"value\":\"Chenla\",\"text\":\"Chenla\"},{\"value\":\"Cherry Cream Soda\",\"text\":\"Cherry Cream Soda\"},{\"value\":\"Cherry Swash\",\"text\":\"Cherry Swash\"},{\"value\":\"Chewy\",\"text\":\"Chewy\"},{\"value\":\"Chicle\",\"text\":\"Chicle\"},{\"value\":\"Chivo\",\"text\":\"Chivo\"},{\"value\":\"Cinzel\",\"text\":\"Cinzel\"},{\"value\":\"Cinzel Decorative\",\"text\":\"Cinzel Decorative\"},{\"value\":\"Clicker Script\",\"text\":\"Clicker Script\"},{\"value\":\"Coda\",\"text\":\"Coda\"},{\"value\":\"Coda Caption\",\"text\":\"Coda Caption\"},{\"value\":\"Codystar\",\"text\":\"Codystar\"},{\"value\":\"Combo\",\"text\":\"Combo\"},{\"value\":\"Comfortaa\",\"text\":\"Comfortaa\"},{\"value\":\"Coming Soon\",\"text\":\"Coming Soon\"},{\"value\":\"Concert One\",\"text\":\"Concert One\"},{\"value\":\"Condiment\",\"text\":\"Condiment\"},{\"value\":\"Content\",\"text\":\"Content\"},{\"value\":\"Contrail One\",\"text\":\"Contrail One\"},{\"value\":\"Convergence\",\"text\":\"Convergence\"},{\"value\":\"Cookie\",\"text\":\"Cookie\"},{\"value\":\"Copse\",\"text\":\"Copse\"},{\"value\":\"Corben\",\"text\":\"Corben\"},{\"value\":\"Courgette\",\"text\":\"Courgette\"},{\"value\":\"Cousine\",\"text\":\"Cousine\"},{\"value\":\"Coustard\",\"text\":\"Coustard\"},{\"value\":\"Covered By Your Grace\",\"text\":\"Covered By Your Grace\"},{\"value\":\"Crafty Girls\",\"text\":\"Crafty Girls\"},{\"value\":\"Creepster\",\"text\":\"Creepster\"},{\"value\":\"Crete Round\",\"text\":\"Crete Round\"},{\"value\":\"Crimson Text\",\"text\":\"Crimson Text\"},{\"value\":\"Croissant One\",\"text\":\"Croissant One\"},{\"value\":\"Crushed\",\"text\":\"Crushed\"},{\"value\":\"Cuprum\",\"text\":\"Cuprum\"},{\"value\":\"Cutive\",\"text\":\"Cutive\"},{\"value\":\"Cutive Mono\",\"text\":\"Cutive Mono\"},{\"value\":\"Damion\",\"text\":\"Damion\"},{\"value\":\"Dancing Script\",\"text\":\"Dancing Script\"},{\"value\":\"Dangrek\",\"text\":\"Dangrek\"},{\"value\":\"Dawning of a New Day\",\"text\":\"Dawning of a New Day\"},{\"value\":\"Days One\",\"text\":\"Days One\"},{\"value\":\"Delius\",\"text\":\"Delius\"},{\"value\":\"Delius Swash Caps\",\"text\":\"Delius Swash Caps\"},{\"value\":\"Delius Unicase\",\"text\":\"Delius Unicase\"},{\"value\":\"Della Respira\",\"text\":\"Della Respira\"},{\"value\":\"Devonshire\",\"text\":\"Devonshire\"},{\"value\":\"Didact Gothic\",\"text\":\"Didact Gothic\"},{\"value\":\"Diplomata\",\"text\":\"Diplomata\"},{\"value\":\"Diplomata SC\",\"text\":\"Diplomata SC\"},{\"value\":\"Doppio One\",\"text\":\"Doppio One\"},{\"value\":\"Dorsa\",\"text\":\"Dorsa\"},{\"value\":\"Dosis\",\"text\":\"Dosis\"},{\"value\":\"Dr Sugiyama\",\"text\":\"Dr Sugiyama\"},{\"value\":\"Droid Sans\",\"text\":\"Droid Sans\"},{\"value\":\"Droid Sans Mono\",\"text\":\"Droid Sans Mono\"},{\"value\":\"Droid Serif\",\"text\":\"Droid Serif\"},{\"value\":\"Duru Sans\",\"text\":\"Duru Sans\"},{\"value\":\"Dynalight\",\"text\":\"Dynalight\"},{\"value\":\"EB Garamond\",\"text\":\"EB Garamond\"},{\"value\":\"Eagle Lake\",\"text\":\"Eagle Lake\"},{\"value\":\"Eater\",\"text\":\"Eater\"},{\"value\":\"Economica\",\"text\":\"Economica\"},{\"value\":\"Electrolize\",\"text\":\"Electrolize\"},{\"value\":\"Emblema One\",\"text\":\"Emblema One\"},{\"value\":\"Emilys Candy\",\"text\":\"Emilys Candy\"},{\"value\":\"Engagement\",\"text\":\"Engagement\"},{\"value\":\"Englebert\",\"text\":\"Englebert\"},{\"value\":\"Enriqueta\",\"text\":\"Enriqueta\"},{\"value\":\"Erica One\",\"text\":\"Erica One\"},{\"value\":\"Esteban\",\"text\":\"Esteban\"},{\"value\":\"Euphoria Script\",\"text\":\"Euphoria Script\"},{\"value\":\"Ewert\",\"text\":\"Ewert\"},{\"value\":\"Exo\",\"text\":\"Exo\"},{\"value\":\"Expletus Sans\",\"text\":\"Expletus Sans\"},{\"value\":\"Fanwood Text\",\"text\":\"Fanwood Text\"},{\"value\":\"Fascinate\",\"text\":\"Fascinate\"},{\"value\":\"Fascinate Inline\",\"text\":\"Fascinate Inline\"},{\"value\":\"Faster One\",\"text\":\"Faster One\"},{\"value\":\"Fasthand\",\"text\":\"Fasthand\"},{\"value\":\"Federant\",\"text\":\"Federant\"},{\"value\":\"Federo\",\"text\":\"Federo\"},{\"value\":\"Felipa\",\"text\":\"Felipa\"},{\"value\":\"Fenix\",\"text\":\"Fenix\"},{\"value\":\"Finger Paint\",\"text\":\"Finger Paint\"},{\"value\":\"Fjord One\",\"text\":\"Fjord One\"},{\"value\":\"Flamenco\",\"text\":\"Flamenco\"},{\"value\":\"Flavors\",\"text\":\"Flavors\"},{\"value\":\"Fondamento\",\"text\":\"Fondamento\"},{\"value\":\"Fontdiner Swanky\",\"text\":\"Fontdiner Swanky\"},{\"value\":\"Forum\",\"text\":\"Forum\"},{\"value\":\"Francois One\",\"text\":\"Francois One\"},{\"value\":\"Freckle Face\",\"text\":\"Freckle Face\"},{\"value\":\"Fredericka the Great\",\"text\":\"Fredericka the Great\"},{\"value\":\"Fredoka One\",\"text\":\"Fredoka One\"},{\"value\":\"Freehand\",\"text\":\"Freehand\"},{\"value\":\"Fresca\",\"text\":\"Fresca\"},{\"value\":\"Frijole\",\"text\":\"Frijole\"},{\"value\":\"Fugaz One\",\"text\":\"Fugaz One\"},{\"value\":\"GFS Didot\",\"text\":\"GFS Didot\"},{\"value\":\"GFS Neohellenic\",\"text\":\"GFS Neohellenic\"},{\"value\":\"Gafata\",\"text\":\"Gafata\"},{\"value\":\"Galdeano\",\"text\":\"Galdeano\"},{\"value\":\"Galindo\",\"text\":\"Galindo\"},{\"value\":\"Gentium Basic\",\"text\":\"Gentium Basic\"},{\"value\":\"Gentium Book Basic\",\"text\":\"Gentium Book Basic\"},{\"value\":\"Geo\",\"text\":\"Geo\"},{\"value\":\"Geostar\",\"text\":\"Geostar\"},{\"value\":\"Geostar Fill\",\"text\":\"Geostar Fill\"},{\"value\":\"Germania One\",\"text\":\"Germania One\"},{\"value\":\"Gilda Display\",\"text\":\"Gilda Display\"},{\"value\":\"Give You Glory\",\"text\":\"Give You Glory\"},{\"value\":\"Glass Antiqua\",\"text\":\"Glass Antiqua\"},{\"value\":\"Glegoo\",\"text\":\"Glegoo\"},{\"value\":\"Gloria Hallelujah\",\"text\":\"Gloria Hallelujah\"},{\"value\":\"Goblin One\",\"text\":\"Goblin One\"},{\"value\":\"Gochi Hand\",\"text\":\"Gochi Hand\"},{\"value\":\"Gorditas\",\"text\":\"Gorditas\"},{\"value\":\"Goudy Bookletter 1911\",\"text\":\"Goudy Bookletter 1911\"},{\"value\":\"Graduate\",\"text\":\"Graduate\"},{\"value\":\"Gravitas One\",\"text\":\"Gravitas One\"},{\"value\":\"Great Vibes\",\"text\":\"Great Vibes\"},{\"value\":\"Griffy\",\"text\":\"Griffy\"},{\"value\":\"Gruppo\",\"text\":\"Gruppo\"},{\"value\":\"Gudea\",\"text\":\"Gudea\"},{\"value\":\"Habibi\",\"text\":\"Habibi\"},{\"value\":\"Hammersmith One\",\"text\":\"Hammersmith One\"},{\"value\":\"Hanalei\",\"text\":\"Hanalei\"},{\"value\":\"Hanalei Fill\",\"text\":\"Hanalei Fill\"},{\"value\":\"Handlee\",\"text\":\"Handlee\"},{\"value\":\"Hanuman\",\"text\":\"Hanuman\"},{\"value\":\"Happy Monkey\",\"text\":\"Happy Monkey\"},{\"value\":\"Headland One\",\"text\":\"Headland One\"},{\"value\":\"Henny Penny\",\"text\":\"Henny Penny\"},{\"value\":\"Herr Von Muellerhoff\",\"text\":\"Herr Von Muellerhoff\"},{\"value\":\"Holtwood One SC\",\"text\":\"Holtwood One SC\"},{\"value\":\"Homemade Apple\",\"text\":\"Homemade Apple\"},{\"value\":\"Homenaje\",\"text\":\"Homenaje\"},{\"value\":\"IM Fell DW Pica\",\"text\":\"IM Fell DW Pica\"},{\"value\":\"IM Fell DW Pica SC\",\"text\":\"IM Fell DW Pica SC\"},{\"value\":\"IM Fell Double Pica\",\"text\":\"IM Fell Double Pica\"},{\"value\":\"IM Fell Double Pica SC\",\"text\":\"IM Fell Double Pica SC\"},{\"value\":\"IM Fell English\",\"text\":\"IM Fell English\"},{\"value\":\"IM Fell English SC\",\"text\":\"IM Fell English SC\"},{\"value\":\"IM Fell French Canon\",\"text\":\"IM Fell French Canon\"},{\"value\":\"IM Fell French Canon SC\",\"text\":\"IM Fell French Canon SC\"},{\"value\":\"IM Fell Great Primer\",\"text\":\"IM Fell Great Primer\"},{\"value\":\"IM Fell Great Primer SC\",\"text\":\"IM Fell Great Primer SC\"},{\"value\":\"Iceberg\",\"text\":\"Iceberg\"},{\"value\":\"Iceland\",\"text\":\"Iceland\"},{\"value\":\"Imprima\",\"text\":\"Imprima\"},{\"value\":\"Inconsolata\",\"text\":\"Inconsolata\"},{\"value\":\"Inder\",\"text\":\"Inder\"},{\"value\":\"Indie Flower\",\"text\":\"Indie Flower\"},{\"value\":\"Inika\",\"text\":\"Inika\"},{\"value\":\"Irish Grover\",\"text\":\"Irish Grover\"},{\"value\":\"Istok Web\",\"text\":\"Istok Web\"},{\"value\":\"Italiana\",\"text\":\"Italiana\"},{\"value\":\"Italianno\",\"text\":\"Italianno\"},{\"value\":\"Jacques Francois\",\"text\":\"Jacques Francois\"},{\"value\":\"Jacques Francois Shadow\",\"text\":\"Jacques Francois Shadow\"},{\"value\":\"Jim Nightshade\",\"text\":\"Jim Nightshade\"},{\"value\":\"Jockey One\",\"text\":\"Jockey One\"},{\"value\":\"Jolly Lodger\",\"text\":\"Jolly Lodger\"},{\"value\":\"Josefin Sans\",\"text\":\"Josefin Sans\"},{\"value\":\"Josefin Slab\",\"text\":\"Josefin Slab\"},{\"value\":\"Joti One\",\"text\":\"Joti One\"},{\"value\":\"Judson\",\"text\":\"Judson\"},{\"value\":\"Julee\",\"text\":\"Julee\"},{\"value\":\"Julius Sans One\",\"text\":\"Julius Sans One\"},{\"value\":\"Junge\",\"text\":\"Junge\"},{\"value\":\"Jura\",\"text\":\"Jura\"},{\"value\":\"Just Another Hand\",\"text\":\"Just Another Hand\"},{\"value\":\"Just Me Again Down Here\",\"text\":\"Just Me Again Down Here\"},{\"value\":\"Kameron\",\"text\":\"Kameron\"},{\"value\":\"Karla\",\"text\":\"Karla\"},{\"value\":\"Kaushan Script\",\"text\":\"Kaushan Script\"},{\"value\":\"Keania One\",\"text\":\"Keania One\"},{\"value\":\"Kelly Slab\",\"text\":\"Kelly Slab\"},{\"value\":\"Kenia\",\"text\":\"Kenia\"},{\"value\":\"Khmer\",\"text\":\"Khmer\"},{\"value\":\"Kite One\",\"text\":\"Kite One\"},{\"value\":\"Knewave\",\"text\":\"Knewave\"},{\"value\":\"Kotta One\",\"text\":\"Kotta One\"},{\"value\":\"Koulen\",\"text\":\"Koulen\"},{\"value\":\"Kranky\",\"text\":\"Kranky\"},{\"value\":\"Kreon\",\"text\":\"Kreon\"},{\"value\":\"Kristi\",\"text\":\"Kristi\"},{\"value\":\"Krona One\",\"text\":\"Krona One\"},{\"value\":\"La Belle Aurore\",\"text\":\"La Belle Aurore\"},{\"value\":\"Lancelot\",\"text\":\"Lancelot\"},{\"value\":\"Lato\",\"text\":\"Lato\"},{\"value\":\"League Script\",\"text\":\"League Script\"},{\"value\":\"Leckerli One\",\"text\":\"Leckerli One\"},{\"value\":\"Ledger\",\"text\":\"Ledger\"},{\"value\":\"Lekton\",\"text\":\"Lekton\"},{\"value\":\"Lemon\",\"text\":\"Lemon\"},{\"value\":\"Life Savers\",\"text\":\"Life Savers\"},{\"value\":\"Lilita One\",\"text\":\"Lilita One\"},{\"value\":\"Limelight\",\"text\":\"Limelight\"},{\"value\":\"Linden Hill\",\"text\":\"Linden Hill\"},{\"value\":\"Lobster\",\"text\":\"Lobster\"},{\"value\":\"Lobster Two\",\"text\":\"Lobster Two\"},{\"value\":\"Londrina Outline\",\"text\":\"Londrina Outline\"},{\"value\":\"Londrina Shadow\",\"text\":\"Londrina Shadow\"},{\"value\":\"Londrina Sketch\",\"text\":\"Londrina Sketch\"},{\"value\":\"Londrina Solid\",\"text\":\"Londrina Solid\"},{\"value\":\"Lora\",\"text\":\"Lora\"},{\"value\":\"Love Ya Like A Sister\",\"text\":\"Love Ya Like A Sister\"},{\"value\":\"Loved by the King\",\"text\":\"Loved by the King\"},{\"value\":\"Lovers Quarrel\",\"text\":\"Lovers Quarrel\"},{\"value\":\"Luckiest Guy\",\"text\":\"Luckiest Guy\"},{\"value\":\"Lusitana\",\"text\":\"Lusitana\"},{\"value\":\"Lustria\",\"text\":\"Lustria\"},{\"value\":\"Macondo\",\"text\":\"Macondo\"},{\"value\":\"Macondo Swash Caps\",\"text\":\"Macondo Swash Caps\"},{\"value\":\"Magra\",\"text\":\"Magra\"},{\"value\":\"Maiden Orange\",\"text\":\"Maiden Orange\"},{\"value\":\"Mako\",\"text\":\"Mako\"},{\"value\":\"Marcellus\",\"text\":\"Marcellus\"},{\"value\":\"Marcellus SC\",\"text\":\"Marcellus SC\"},{\"value\":\"Marck Script\",\"text\":\"Marck Script\"},{\"value\":\"Margarine\",\"text\":\"Margarine\"},{\"value\":\"Marko One\",\"text\":\"Marko One\"},{\"value\":\"Marmelad\",\"text\":\"Marmelad\"},{\"value\":\"Marvel\",\"text\":\"Marvel\"},{\"value\":\"Mate\",\"text\":\"Mate\"},{\"value\":\"Mate SC\",\"text\":\"Mate SC\"},{\"value\":\"Maven Pro\",\"text\":\"Maven Pro\"},{\"value\":\"McLaren\",\"text\":\"McLaren\"},{\"value\":\"Meddon\",\"text\":\"Meddon\"},{\"value\":\"MedievalSharp\",\"text\":\"MedievalSharp\"},{\"value\":\"Medula One\",\"text\":\"Medula One\"},{\"value\":\"Megrim\",\"text\":\"Megrim\"},{\"value\":\"Meie Script\",\"text\":\"Meie Script\"},{\"value\":\"Merienda\",\"text\":\"Merienda\"},{\"value\":\"Merienda One\",\"text\":\"Merienda One\"},{\"value\":\"Merriweather\",\"text\":\"Merriweather\"},{\"value\":\"Metal\",\"text\":\"Metal\"},{\"value\":\"Metal Mania\",\"text\":\"Metal Mania\"},{\"value\":\"Metamorphous\",\"text\":\"Metamorphous\"},{\"value\":\"Metrophobic\",\"text\":\"Metrophobic\"},{\"value\":\"Michroma\",\"text\":\"Michroma\"},{\"value\":\"Miltonian\",\"text\":\"Miltonian\"},{\"value\":\"Miltonian Tattoo\",\"text\":\"Miltonian Tattoo\"},{\"value\":\"Miniver\",\"text\":\"Miniver\"},{\"value\":\"Miss Fajardose\",\"text\":\"Miss Fajardose\"},{\"value\":\"Modern Antiqua\",\"text\":\"Modern Antiqua\"},{\"value\":\"Molengo\",\"text\":\"Molengo\"},{\"value\":\"Molle\",\"text\":\"Molle\"},{\"value\":\"Monofett\",\"text\":\"Monofett\"},{\"value\":\"Monoton\",\"text\":\"Monoton\"},{\"value\":\"Monsieur La Doulaise\",\"text\":\"Monsieur La Doulaise\"},{\"value\":\"Montaga\",\"text\":\"Montaga\"},{\"value\":\"Montez\",\"text\":\"Montez\"},{\"value\":\"Montserrat\",\"text\":\"Montserrat\"},{\"value\":\"Montserrat Alternates\",\"text\":\"Montserrat Alternates\"},{\"value\":\"Montserrat Subrayada\",\"text\":\"Montserrat Subrayada\"},{\"value\":\"Moul\",\"text\":\"Moul\"},{\"value\":\"Moulpali\",\"text\":\"Moulpali\"},{\"value\":\"Mountains of Christmas\",\"text\":\"Mountains of Christmas\"},{\"value\":\"Mouse Memoirs\",\"text\":\"Mouse Memoirs\"},{\"value\":\"Mr Bedfort\",\"text\":\"Mr Bedfort\"},{\"value\":\"Mr Dafoe\",\"text\":\"Mr Dafoe\"},{\"value\":\"Mr De Haviland\",\"text\":\"Mr De Haviland\"},{\"value\":\"Mrs Saint Delafield\",\"text\":\"Mrs Saint Delafield\"},{\"value\":\"Mrs Sheppards\",\"text\":\"Mrs Sheppards\"},{\"value\":\"Muli\",\"text\":\"Muli\"},{\"value\":\"Mystery Quest\",\"text\":\"Mystery Quest\"},{\"value\":\"Neucha\",\"text\":\"Neucha\"},{\"value\":\"Neuton\",\"text\":\"Neuton\"},{\"value\":\"News Cycle\",\"text\":\"News Cycle\"},{\"value\":\"Niconne\",\"text\":\"Niconne\"},{\"value\":\"Nixie One\",\"text\":\"Nixie One\"},{\"value\":\"Nobile\",\"text\":\"Nobile\"},{\"value\":\"Nokora\",\"text\":\"Nokora\"},{\"value\":\"Norican\",\"text\":\"Norican\"},{\"value\":\"Nosifer\",\"text\":\"Nosifer\"},{\"value\":\"Nothing You Could Do\",\"text\":\"Nothing You Could Do\"},{\"value\":\"Noticia Text\",\"text\":\"Noticia Text\"},{\"value\":\"Nova Cut\",\"text\":\"Nova Cut\"},{\"value\":\"Nova Flat\",\"text\":\"Nova Flat\"},{\"value\":\"Nova Mono\",\"text\":\"Nova Mono\"},{\"value\":\"Nova Oval\",\"text\":\"Nova Oval\"},{\"value\":\"Nova Round\",\"text\":\"Nova Round\"},{\"value\":\"Nova Script\",\"text\":\"Nova Script\"},{\"value\":\"Nova Slim\",\"text\":\"Nova Slim\"},{\"value\":\"Nova Square\",\"text\":\"Nova Square\"},{\"value\":\"Numans\",\"text\":\"Numans\"},{\"value\":\"Nunito\",\"text\":\"Nunito\"},{\"value\":\"Odor Mean Chey\",\"text\":\"Odor Mean Chey\"},{\"value\":\"Offside\",\"text\":\"Offside\"},{\"value\":\"Old Standard TT\",\"text\":\"Old Standard TT\"},{\"value\":\"Oldenburg\",\"text\":\"Oldenburg\"},{\"value\":\"Oleo Script\",\"text\":\"Oleo Script\"},{\"value\":\"Oleo Script Swash Caps\",\"text\":\"Oleo Script Swash Caps\"},{\"value\":\"Open Sans\",\"text\":\"Open Sans\"},{\"value\":\"Open Sans Condensed\",\"text\":\"Open Sans Condensed\"},{\"value\":\"Oranienbaum\",\"text\":\"Oranienbaum\"},{\"value\":\"Orbitron\",\"text\":\"Orbitron\"},{\"value\":\"Oregano\",\"text\":\"Oregano\"},{\"value\":\"Orienta\",\"text\":\"Orienta\"},{\"value\":\"Original Surfer\",\"text\":\"Original Surfer\"},{\"value\":\"Oswald\",\"text\":\"Oswald\"},{\"value\":\"Over the Rainbow\",\"text\":\"Over the Rainbow\"},{\"value\":\"Overlock\",\"text\":\"Overlock\"},{\"value\":\"Overlock SC\",\"text\":\"Overlock SC\"},{\"value\":\"Ovo\",\"text\":\"Ovo\"},{\"value\":\"Oxygen\",\"text\":\"Oxygen\"},{\"value\":\"Oxygen Mono\",\"text\":\"Oxygen Mono\"},{\"value\":\"PT Mono\",\"text\":\"PT Mono\"},{\"value\":\"PT Sans\",\"text\":\"PT Sans\"},{\"value\":\"PT Sans Caption\",\"text\":\"PT Sans Caption\"},{\"value\":\"PT Sans Narrow\",\"text\":\"PT Sans Narrow\"},{\"value\":\"PT Serif\",\"text\":\"PT Serif\"},{\"value\":\"PT Serif Caption\",\"text\":\"PT Serif Caption\"},{\"value\":\"Pacifico\",\"text\":\"Pacifico\"},{\"value\":\"Paprika\",\"text\":\"Paprika\"},{\"value\":\"Parisienne\",\"text\":\"Parisienne\"},{\"value\":\"Passero One\",\"text\":\"Passero One\"},{\"value\":\"Passion One\",\"text\":\"Passion One\"},{\"value\":\"Patrick Hand\",\"text\":\"Patrick Hand\"},{\"value\":\"Patua One\",\"text\":\"Patua One\"},{\"value\":\"Paytone One\",\"text\":\"Paytone One\"},{\"value\":\"Peralta\",\"text\":\"Peralta\"},{\"value\":\"Permanent Marker\",\"text\":\"Permanent Marker\"},{\"value\":\"Petit Formal Script\",\"text\":\"Petit Formal Script\"},{\"value\":\"Petrona\",\"text\":\"Petrona\"},{\"value\":\"Philosopher\",\"text\":\"Philosopher\"},{\"value\":\"Piedra\",\"text\":\"Piedra\"},{\"value\":\"Pinyon Script\",\"text\":\"Pinyon Script\"},{\"value\":\"Pirata One\",\"text\":\"Pirata One\"},{\"value\":\"Plaster\",\"text\":\"Plaster\"},{\"value\":\"Play\",\"text\":\"Play\"},{\"value\":\"Playball\",\"text\":\"Playball\"},{\"value\":\"Playfair Display\",\"text\":\"Playfair Display\"},{\"value\":\"Playfair Display SC\",\"text\":\"Playfair Display SC\"},{\"value\":\"Podkova\",\"text\":\"Podkova\"},{\"value\":\"Poiret One\",\"text\":\"Poiret One\"},{\"value\":\"Poller One\",\"text\":\"Poller One\"},{\"value\":\"Poly\",\"text\":\"Poly\"},{\"value\":\"Pompiere\",\"text\":\"Pompiere\"},{\"value\":\"Pontano Sans\",\"text\":\"Pontano Sans\"},{\"value\":\"Port Lligat Sans\",\"text\":\"Port Lligat Sans\"},{\"value\":\"Port Lligat Slab\",\"text\":\"Port Lligat Slab\"},{\"value\":\"Prata\",\"text\":\"Prata\"},{\"value\":\"Preahvihear\",\"text\":\"Preahvihear\"},{\"value\":\"Press Start 2P\",\"text\":\"Press Start 2P\"},{\"value\":\"Princess Sofia\",\"text\":\"Princess Sofia\"},{\"value\":\"Prociono\",\"text\":\"Prociono\"},{\"value\":\"Prosto One\",\"text\":\"Prosto One\"},{\"value\":\"Puritan\",\"text\":\"Puritan\"},{\"value\":\"Purple Purse\",\"text\":\"Purple Purse\"},{\"value\":\"Quando\",\"text\":\"Quando\"},{\"value\":\"Quantico\",\"text\":\"Quantico\"},{\"value\":\"Quattrocento\",\"text\":\"Quattrocento\"},{\"value\":\"Quattrocento Sans\",\"text\":\"Quattrocento Sans\"},{\"value\":\"Questrial\",\"text\":\"Questrial\"},{\"value\":\"Quicksand\",\"text\":\"Quicksand\"},{\"value\":\"Quintessential\",\"text\":\"Quintessential\"},{\"value\":\"Qwigley\",\"text\":\"Qwigley\"},{\"value\":\"Racing Sans One\",\"text\":\"Racing Sans One\"},{\"value\":\"Radley\",\"text\":\"Radley\"},{\"value\":\"Raleway\",\"text\":\"Raleway\"},{\"value\":\"Raleway Dots\",\"text\":\"Raleway Dots\"},{\"value\":\"Rambla\",\"text\":\"Rambla\"},{\"value\":\"Rammetto One\",\"text\":\"Rammetto One\"},{\"value\":\"Ranchers\",\"text\":\"Ranchers\"},{\"value\":\"Rancho\",\"text\":\"Rancho\"},{\"value\":\"Rationale\",\"text\":\"Rationale\"},{\"value\":\"Redressed\",\"text\":\"Redressed\"},{\"value\":\"Reenie Beanie\",\"text\":\"Reenie Beanie\"},{\"value\":\"Revalia\",\"text\":\"Revalia\"},{\"value\":\"Ribeye\",\"text\":\"Ribeye\"},{\"value\":\"Ribeye Marrow\",\"text\":\"Ribeye Marrow\"},{\"value\":\"Righteous\",\"text\":\"Righteous\"},{\"value\":\"Risque\",\"text\":\"Risque\"},{\"value\":\"Rochester\",\"text\":\"Rochester\"},{\"value\":\"Rock Salt\",\"text\":\"Rock Salt\"},{\"value\":\"Rokkitt\",\"text\":\"Rokkitt\"},{\"value\":\"Romanesco\",\"text\":\"Romanesco\"},{\"value\":\"Ropa Sans\",\"text\":\"Ropa Sans\"},{\"value\":\"Rosario\",\"text\":\"Rosario\"},{\"value\":\"Rosarivo\",\"text\":\"Rosarivo\"},{\"value\":\"Rouge Script\",\"text\":\"Rouge Script\"},{\"value\":\"Ruda\",\"text\":\"Ruda\"},{\"value\":\"Rufina\",\"text\":\"Rufina\"},{\"value\":\"Ruge Boogie\",\"text\":\"Ruge Boogie\"},{\"value\":\"Ruluko\",\"text\":\"Ruluko\"},{\"value\":\"Rum Raisin\",\"text\":\"Rum Raisin\"},{\"value\":\"Ruslan Display\",\"text\":\"Ruslan Display\"},{\"value\":\"Russo One\",\"text\":\"Russo One\"},{\"value\":\"Ruthie\",\"text\":\"Ruthie\"},{\"value\":\"Rye\",\"text\":\"Rye\"},{\"value\":\"Sacramento\",\"text\":\"Sacramento\"},{\"value\":\"Sail\",\"text\":\"Sail\"},{\"value\":\"Salsa\",\"text\":\"Salsa\"},{\"value\":\"Sanchez\",\"text\":\"Sanchez\"},{\"value\":\"Sancreek\",\"text\":\"Sancreek\"},{\"value\":\"Sansita One\",\"text\":\"Sansita One\"},{\"value\":\"Sarina\",\"text\":\"Sarina\"},{\"value\":\"Satisfy\",\"text\":\"Satisfy\"},{\"value\":\"Scada\",\"text\":\"Scada\"},{\"value\":\"Schoolbell\",\"text\":\"Schoolbell\"},{\"value\":\"Seaweed Script\",\"text\":\"Seaweed Script\"},{\"value\":\"Sevillana\",\"text\":\"Sevillana\"},{\"value\":\"Seymour One\",\"text\":\"Seymour One\"},{\"value\":\"Shadows Into Light\",\"text\":\"Shadows Into Light\"},{\"value\":\"Shadows Into Light Two\",\"text\":\"Shadows Into Light Two\"},{\"value\":\"Shanti\",\"text\":\"Shanti\"},{\"value\":\"Share\",\"text\":\"Share\"},{\"value\":\"Share Tech\",\"text\":\"Share Tech\"},{\"value\":\"Share Tech Mono\",\"text\":\"Share Tech Mono\"},{\"value\":\"Shojumaru\",\"text\":\"Shojumaru\"},{\"value\":\"Short Stack\",\"text\":\"Short Stack\"},{\"value\":\"Siemreap\",\"text\":\"Siemreap\"},{\"value\":\"Sigmar One\",\"text\":\"Sigmar One\"},{\"value\":\"Signika\",\"text\":\"Signika\"},{\"value\":\"Signika Negative\",\"text\":\"Signika Negative\"},{\"value\":\"Simonetta\",\"text\":\"Simonetta\"},{\"value\":\"Sirin Stencil\",\"text\":\"Sirin Stencil\"},{\"value\":\"Six Caps\",\"text\":\"Six Caps\"},{\"value\":\"Skranji\",\"text\":\"Skranji\"},{\"value\":\"Slackey\",\"text\":\"Slackey\"},{\"value\":\"Smokum\",\"text\":\"Smokum\"},{\"value\":\"Smythe\",\"text\":\"Smythe\"},{\"value\":\"Sniglet\",\"text\":\"Sniglet\"},{\"value\":\"Snippet\",\"text\":\"Snippet\"},{\"value\":\"Snowburst One\",\"text\":\"Snowburst One\"},{\"value\":\"Sofadi One\",\"text\":\"Sofadi One\"},{\"value\":\"Sofia\",\"text\":\"Sofia\"},{\"value\":\"Sonsie One\",\"text\":\"Sonsie One\"},{\"value\":\"Sorts Mill Goudy\",\"text\":\"Sorts Mill Goudy\"},{\"value\":\"Source Code Pro\",\"text\":\"Source Code Pro\"},{\"value\":\"Source Sans Pro\",\"text\":\"Source Sans Pro\"},{\"value\":\"Special Elite\",\"text\":\"Special Elite\"},{\"value\":\"Spicy Rice\",\"text\":\"Spicy Rice\"},{\"value\":\"Spinnaker\",\"text\":\"Spinnaker\"},{\"value\":\"Spirax\",\"text\":\"Spirax\"},{\"value\":\"Squada One\",\"text\":\"Squada One\"},{\"value\":\"Stalemate\",\"text\":\"Stalemate\"},{\"value\":\"Stalinist One\",\"text\":\"Stalinist One\"},{\"value\":\"Stardos Stencil\",\"text\":\"Stardos Stencil\"},{\"value\":\"Stint Ultra Condensed\",\"text\":\"Stint Ultra Condensed\"},{\"value\":\"Stint Ultra Expanded\",\"text\":\"Stint Ultra Expanded\"},{\"value\":\"Stoke\",\"text\":\"Stoke\"},{\"value\":\"Strait\",\"text\":\"Strait\"},{\"value\":\"Sue Ellen Francisco\",\"text\":\"Sue Ellen Francisco\"},{\"value\":\"Sunshiney\",\"text\":\"Sunshiney\"},{\"value\":\"Supermercado One\",\"text\":\"Supermercado One\"},{\"value\":\"Suwannaphum\",\"text\":\"Suwannaphum\"},{\"value\":\"Swanky and Moo Moo\",\"text\":\"Swanky and Moo Moo\"},{\"value\":\"Syncopate\",\"text\":\"Syncopate\"},{\"value\":\"Tangerine\",\"text\":\"Tangerine\"},{\"value\":\"Taprom\",\"text\":\"Taprom\"},{\"value\":\"Telex\",\"text\":\"Telex\"},{\"value\":\"Tenor Sans\",\"text\":\"Tenor Sans\"},{\"value\":\"Text Me One\",\"text\":\"Text Me One\"},{\"value\":\"The Girl Next Door\",\"text\":\"The Girl Next Door\"},{\"value\":\"Tienne\",\"text\":\"Tienne\"},{\"value\":\"Tinos\",\"text\":\"Tinos\"},{\"value\":\"Titan One\",\"text\":\"Titan One\"},{\"value\":\"Titillium Web\",\"text\":\"Titillium Web\"},{\"value\":\"Trade Winds\",\"text\":\"Trade Winds\"},{\"value\":\"Trocchi\",\"text\":\"Trocchi\"},{\"value\":\"Trochut\",\"text\":\"Trochut\"},{\"value\":\"Trykker\",\"text\":\"Trykker\"},{\"value\":\"Tulpen One\",\"text\":\"Tulpen One\"},{\"value\":\"Ubuntu\",\"text\":\"Ubuntu\"},{\"value\":\"Ubuntu Condensed\",\"text\":\"Ubuntu Condensed\"},{\"value\":\"Ubuntu Mono\",\"text\":\"Ubuntu Mono\"},{\"value\":\"Ultra\",\"text\":\"Ultra\"},{\"value\":\"Uncial Antiqua\",\"text\":\"Uncial Antiqua\"},{\"value\":\"Underdog\",\"text\":\"Underdog\"},{\"value\":\"Unica One\",\"text\":\"Unica One\"},{\"value\":\"UnifrakturCook\",\"text\":\"UnifrakturCook\"},{\"value\":\"UnifrakturMaguntia\",\"text\":\"UnifrakturMaguntia\"},{\"value\":\"Unkempt\",\"text\":\"Unkempt\"},{\"value\":\"Unlock\",\"text\":\"Unlock\"},{\"value\":\"Unna\",\"text\":\"Unna\"},{\"value\":\"VT323\",\"text\":\"VT323\"},{\"value\":\"Vampiro One\",\"text\":\"Vampiro One\"},{\"value\":\"Varela\",\"text\":\"Varela\"},{\"value\":\"Varela Round\",\"text\":\"Varela Round\"},{\"value\":\"Vast Shadow\",\"text\":\"Vast Shadow\"},{\"value\":\"Vibur\",\"text\":\"Vibur\"},{\"value\":\"Vidaloka\",\"text\":\"Vidaloka\"},{\"value\":\"Viga\",\"text\":\"Viga\"},{\"value\":\"Voces\",\"text\":\"Voces\"},{\"value\":\"Volkhov\",\"text\":\"Volkhov\"},{\"value\":\"Vollkorn\",\"text\":\"Vollkorn\"},{\"value\":\"Voltaire\",\"text\":\"Voltaire\"},{\"value\":\"Waiting for the Sunrise\",\"text\":\"Waiting for the Sunrise\"},{\"value\":\"Wallpoet\",\"text\":\"Wallpoet\"},{\"value\":\"Walter Turncoat\",\"text\":\"Walter Turncoat\"},{\"value\":\"Warnes\",\"text\":\"Warnes\"},{\"value\":\"Wellfleet\",\"text\":\"Wellfleet\"},{\"value\":\"Wire One\",\"text\":\"Wire One\"},{\"value\":\"Yanone Kaffeesatz\",\"text\":\"Yanone Kaffeesatz\"},{\"value\":\"Yellowtail\",\"text\":\"Yellowtail\"},{\"value\":\"Yeseva One\",\"text\":\"Yeseva One\"},{\"value\":\"Yesteryear\",\"text\":\"Yesteryear\"},{\"value\":\"Zeyada\",\"text\":\"Zeyada\"}],\r\n        selectedIndex: 417,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"LatinExtended":{"name":"jform[params][moduleparametersTab][theme][textfont]family","id":"jformparamsmoduleparametersTabthemetextfontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemetextfontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Open Sans<br \/>Andika<br \/>Anonymous Pro<br \/>Anton<br \/>Caudex<br \/>Didact Gothic<br \/>EB Garamond<br \/>Forum<br \/>Francois One<br \/>Gentium Basic<br \/>Gentium Book Basic<br \/>Istok Web<br \/>Jura<br \/>Kelly Slab<br \/>Lobster<br \/>MedievalSharp<br \/>Modern Antiqua<br \/>Neuton<br \/>Open Sans<br \/>Open Sans Condensed<br \/>Patrick Hand<br \/>Play<br \/>Ruslan Display<br \/>Tenor Sans<br \/>Ubuntu<br \/>Varela<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][textfont]family\" id=\"jformparamsmoduleparametersTabthemetextfontfamily\" value=\"Open Sans\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemetextfontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">Andika<\\\/div><div class=\\\"listelement\\\">Anonymous Pro<\\\/div><div class=\\\"listelement\\\">Anton<\\\/div><div class=\\\"listelement\\\">Caudex<\\\/div><div class=\\\"listelement\\\">Didact Gothic<\\\/div><div class=\\\"listelement\\\">EB Garamond<\\\/div><div class=\\\"listelement\\\">Forum<\\\/div><div class=\\\"listelement\\\">Francois One<\\\/div><div class=\\\"listelement\\\">Gentium Basic<\\\/div><div class=\\\"listelement\\\">Gentium Book Basic<\\\/div><div class=\\\"listelement\\\">Istok Web<\\\/div><div class=\\\"listelement\\\">Jura<\\\/div><div class=\\\"listelement\\\">Kelly Slab<\\\/div><div class=\\\"listelement\\\">Lobster<\\\/div><div class=\\\"listelement\\\">MedievalSharp<\\\/div><div class=\\\"listelement\\\">Modern Antiqua<\\\/div><div class=\\\"listelement\\\">Neuton<\\\/div><div class=\\\"listelement\\\">Open Sans<\\\/div><div class=\\\"listelement\\\">Open Sans Condensed<\\\/div><div class=\\\"listelement\\\">Patrick Hand<\\\/div><div class=\\\"listelement\\\">Play<\\\/div><div class=\\\"listelement\\\">Ruslan Display<\\\/div><div class=\\\"listelement\\\">Tenor Sans<\\\/div><div class=\\\"listelement\\\">Ubuntu<\\\/div><div class=\\\"listelement\\\">Varela<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"Andika\",\"text\":\"Andika\"},{\"value\":\"Anonymous Pro\",\"text\":\"Anonymous Pro\"},{\"value\":\"Anton\",\"text\":\"Anton\"},{\"value\":\"Caudex\",\"text\":\"Caudex\"},{\"value\":\"Didact Gothic\",\"text\":\"Didact Gothic\"},{\"value\":\"EB Garamond\",\"text\":\"EB Garamond\"},{\"value\":\"Forum\",\"text\":\"Forum\"},{\"value\":\"Francois One\",\"text\":\"Francois One\"},{\"value\":\"Gentium Basic\",\"text\":\"Gentium Basic\"},{\"value\":\"Gentium Book Basic\",\"text\":\"Gentium Book Basic\"},{\"value\":\"Istok Web\",\"text\":\"Istok Web\"},{\"value\":\"Jura\",\"text\":\"Jura\"},{\"value\":\"Kelly Slab\",\"text\":\"Kelly Slab\"},{\"value\":\"Lobster\",\"text\":\"Lobster\"},{\"value\":\"MedievalSharp\",\"text\":\"MedievalSharp\"},{\"value\":\"Modern Antiqua\",\"text\":\"Modern Antiqua\"},{\"value\":\"Neuton\",\"text\":\"Neuton\"},{\"value\":\"Open Sans\",\"text\":\"Open Sans\"},{\"value\":\"Open Sans Condensed\",\"text\":\"Open Sans Condensed\"},{\"value\":\"Patrick Hand\",\"text\":\"Patrick Hand\"},{\"value\":\"Play\",\"text\":\"Play\"},{\"value\":\"Ruslan Display\",\"text\":\"Ruslan Display\"},{\"value\":\"Tenor Sans\",\"text\":\"Tenor Sans\"},{\"value\":\"Ubuntu\",\"text\":\"Ubuntu\"},{\"value\":\"Varela\",\"text\":\"Varela\"}],\r\n        selectedIndex: 17,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"Vietnamese":{"name":"jform[params][moduleparametersTab][theme][textfont]family","id":"jformparamsmoduleparametersTabthemetextfontfamily","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemetextfontfamily\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Open Sans<br \/>EB Garamond<br \/>Open Sans<br \/>Open Sans Condensed<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][textfont]family\" id=\"jformparamsmoduleparametersTabthemetextfontfamily\" value=\"Open Sans\"\/><\/div><\/div>","script":"dojo.addOnLoad(function(){\r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemetextfontfamily\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">EB Garamond<\\\/div><div class=\\\"listelement\\\">Open Sans<\\\/div><div class=\\\"listelement\\\">Open Sans Condensed<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"EB Garamond\",\"text\":\"EB Garamond\"},{\"value\":\"Open Sans\",\"text\":\"Open Sans\"},{\"value\":\"Open Sans Condensed\",\"text\":\"Open Sans Condensed\"}],\r\n        selectedIndex: 1,\r\n        height: \"10\",\r\n        fireshow: 1\r\n      });\r\n    });"},"html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemetextfonttype\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">Latin<br \/>Alternative fonts<br \/>Cyrillic<br \/>CyrillicExtended<br \/>Greek<br \/>GreekExtended<br \/>Khmer<br \/>Latin<br \/>LatinExtended<br \/>Vietnamese<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][textfont]type\" id=\"jformparamsmoduleparametersTabthemetextfonttype\" value=\"Latin\"\/><\/div><\/div>"},"size":{"name":"jform[params][moduleparametersTab][theme][textfont]size","id":"jformparamsmoduleparametersTabthemetextfontsize","html":"<div class=\"offlajntextcontainer\" id=\"offlajntextcontainerjformparamsmoduleparametersTabthemetextfontsize\"><input  size=\"1\" class=\"offlajntext\" type=\"text\" id=\"jformparamsmoduleparametersTabthemetextfontsizeinput\" value=\"20\"><div class=\"offlajntext_increment\">\n                <div class=\"offlajntext_increment_up arrow\"><\/div>\n                <div class=\"offlajntext_increment_down arrow\"><\/div>\n      <\/div><\/div><div class=\"offlajnswitcher\">\r\n            <div class=\"offlajnswitcher_inner\" id=\"offlajnswitcher_innerjformparamsmoduleparametersTabthemetextfontsizeunit\"><\/div>\r\n    <\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][textfont]size[unit]\" id=\"jformparamsmoduleparametersTabthemetextfontsizeunit\" value=\"px\" \/><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][textfont]size\" id=\"jformparamsmoduleparametersTabthemetextfontsize\" value=\"20||px\">"},"color":{"name":"jform[params][moduleparametersTab][theme][textfont]color","id":"jformparamsmoduleparametersTabthemetextfontcolor","html":"<div class=\"offlajncolor\"><input type=\"text\" name=\"jform[params][moduleparametersTab][theme][textfont]color\" id=\"jformparamsmoduleparametersTabthemetextfontcolor\" value=\"a1a1a1\" class=\"color wa\" size=\"12\" \/><\/div>"},"textdecor":{"name":"jform[params][moduleparametersTab][theme][textfont]textdecor","id":"jformparamsmoduleparametersTabthemetextfonttextdecor","html":"<div style='position:relative;'><div id=\"offlajnlistcontainerjformparamsmoduleparametersTabthemetextfonttextdecor\" class=\"gk_hack offlajnlistcontainer\"><div class=\"gk_hack offlajnlist\"><span class=\"offlajnlistcurrent\">lighter<br \/>extralight<br \/>lighter<br \/>normal<br \/>bold<br \/>bolder<br \/>extrabold<br \/><\/span><div class=\"offlajnlistbtn\"><span><\/span><\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][textfont]textdecor\" id=\"jformparamsmoduleparametersTabthemetextfonttextdecor\" value=\"300\"\/><\/div><\/div>"},"italic":{"name":"jform[params][moduleparametersTab][theme][textfont]italic","id":"jformparamsmoduleparametersTabthemetextfontitalic","html":"<div id=\"offlajnonoffjformparamsmoduleparametersTabthemetextfontitalic\" class=\"gk_hack onoffbutton\">\n                <div class=\"gk_hack onoffbutton_img\" style=\"background-image: url(http:\/\/localhost:8888\/fashion\/administrator\/..\/modules\/mod_improved_ajax_login\/params\/offlajnonoff\/images\/italic.png);\"><\/div>\n      <\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][textfont]italic\" id=\"jformparamsmoduleparametersTabthemetextfontitalic\" value=\"0\" \/>"},"underline":{"name":"jform[params][moduleparametersTab][theme][textfont]underline","id":"jformparamsmoduleparametersTabthemetextfontunderline","html":"<div id=\"offlajnonoffjformparamsmoduleparametersTabthemetextfontunderline\" class=\"gk_hack onoffbutton\">\n                <div class=\"gk_hack onoffbutton_img\" style=\"background-image: url(http:\/\/localhost:8888\/fashion\/administrator\/..\/modules\/mod_improved_ajax_login\/params\/offlajnonoff\/images\/underline.png);\"><\/div>\n      <\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][textfont]underline\" id=\"jformparamsmoduleparametersTabthemetextfontunderline\" value=\"0\" \/>"},"align":{"name":"jform[params][moduleparametersTab][theme][textfont]align","id":"jformparamsmoduleparametersTabthemetextfontalign","html":"<div class=\"offlajnradiocontainerimage\" id=\"offlajnradiocontainerjformparamsmoduleparametersTabthemetextfontalign\"><div class=\"radioelement first selected\"><div class=\"radioelement_img\" style=\"background-image: url(http:\/\/localhost:8888\/fashion\/administrator\/..\/modules\/mod_improved_ajax_login\/params\/offlajnradio\/images\/left_align.png);\"><\/div><\/div><div class=\"radioelement \"><div class=\"radioelement_img\" style=\"background-image: url(http:\/\/localhost:8888\/fashion\/administrator\/..\/modules\/mod_improved_ajax_login\/params\/offlajnradio\/images\/center_align.png);\"><\/div><\/div><div class=\"radioelement  last\"><div class=\"radioelement_img\" style=\"background-image: url(http:\/\/localhost:8888\/fashion\/administrator\/..\/modules\/mod_improved_ajax_login\/params\/offlajnradio\/images\/right_align.png);\"><\/div><\/div><div class=\"clear\"><\/div><\/div><input type=\"hidden\" id=\"jformparamsmoduleparametersTabthemetextfontalign\" name=\"jform[params][moduleparametersTab][theme][textfont]align\" value=\"left\"\/>"},"afont":{"name":"jform[params][moduleparametersTab][theme][textfont]afont","id":"jformparamsmoduleparametersTabthemetextfontafont","html":"<div class=\"offlajntextcontainer\" id=\"offlajntextcontainerjformparamsmoduleparametersTabthemetextfontafont\"><input  size=\"10\" class=\"offlajntext\" type=\"text\" id=\"jformparamsmoduleparametersTabthemetextfontafontinput\" value=\"Helvetica\"><\/div><div class=\"offlajnswitcher\">\r\n            <div class=\"offlajnswitcher_inner\" id=\"offlajnswitcher_innerjformparamsmoduleparametersTabthemetextfontafontunit\"><\/div>\r\n    <\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][textfont]afont[unit]\" id=\"jformparamsmoduleparametersTabthemetextfontafontunit\" value=\"1\" \/><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][textfont]afont\" id=\"jformparamsmoduleparametersTabthemetextfontafont\" value=\"Helvetica||1\">"},"tshadow":{"name":"jform[params][moduleparametersTab][theme][textfont]tshadow","id":"jformparamsmoduleparametersTabthemetextfonttshadow","html":"<div id=\"offlajncombine_outerjformparamsmoduleparametersTabthemetextfonttshadow\" class=\"offlajncombine_outer\"><div class=\"offlajncombinefieldcontainer\"><div class=\"offlajncombinefield\"><div class=\"offlajntextcontainer\" id=\"offlajntextcontainerjformparamsmoduleparametersTabthemetextfonttshadow0\"><input  size=\"1\" class=\"offlajntext\" type=\"text\" id=\"jformparamsmoduleparametersTabthemetextfonttshadow0input\" value=\"0\"><div class=\"unit\">px<\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][textfont]tshadow0\" id=\"jformparamsmoduleparametersTabthemetextfonttshadow0\" value=\"0\"><\/div><\/div><div class=\"offlajncombinefieldcontainer\"><div class=\"offlajncombinefield\"><div class=\"offlajntextcontainer\" id=\"offlajntextcontainerjformparamsmoduleparametersTabthemetextfonttshadow1\"><input  size=\"1\" class=\"offlajntext\" type=\"text\" id=\"jformparamsmoduleparametersTabthemetextfonttshadow1input\" value=\"0\"><div class=\"unit\">px<\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][textfont]tshadow1\" id=\"jformparamsmoduleparametersTabthemetextfonttshadow1\" value=\"0\"><\/div><\/div><div class=\"offlajncombinefieldcontainer\"><div class=\"offlajncombinefield\"><div class=\"offlajntextcontainer\" id=\"offlajntextcontainerjformparamsmoduleparametersTabthemetextfonttshadow2\"><input  size=\"1\" class=\"offlajntext\" type=\"text\" id=\"jformparamsmoduleparametersTabthemetextfonttshadow2input\" value=\"0\"><div class=\"unit\">px<\/div><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][textfont]tshadow2\" id=\"jformparamsmoduleparametersTabthemetextfonttshadow2\" value=\"0\"><\/div><\/div><div class=\"offlajncombinefieldcontainer\"><div class=\"offlajncombinefield\"><div class=\"offlajncolor\"><input type=\"text\" name=\"jform[params][moduleparametersTab][theme][textfont]tshadow3\" id=\"jformparamsmoduleparametersTabthemetextfonttshadow3\" value=\"000000\" class=\"color \" size=\"12\" \/><\/div><\/div><\/div><div class=\"offlajncombinefieldcontainer\"><div class=\"offlajncombinefield\"><div class=\"offlajnswitcher\">\r\n            <div class=\"offlajnswitcher_inner\" id=\"offlajnswitcher_innerjformparamsmoduleparametersTabthemetextfonttshadow4\"><\/div>\r\n    <\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][textfont]tshadow4\" id=\"jformparamsmoduleparametersTabthemetextfonttshadow4\" value=\"0\" \/><\/div><\/div><\/div><div class=\"offlajncombine_hider\"><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][textfont]tshadow\" id=\"jformparamsmoduleparametersTabthemetextfonttshadow\" value='0|*|0|*|0|*|000000|*|0'>"},"lineheight":{"name":"jform[params][moduleparametersTab][theme][textfont]lineheight","id":"jformparamsmoduleparametersTabthemetextfontlineheight","html":"<div class=\"offlajntextcontainer\" id=\"offlajntextcontainerjformparamsmoduleparametersTabthemetextfontlineheight\"><input  size=\"5\" class=\"offlajntext\" type=\"text\" id=\"jformparamsmoduleparametersTabthemetextfontlineheightinput\" value=\"normal\"><\/div><input type=\"hidden\" name=\"jform[params][moduleparametersTab][theme][textfont]lineheight\" id=\"jformparamsmoduleparametersTabthemetextfontlineheight\" value=\"normal\">"}},
          script: "dojo.addOnLoad(function(){\r\n      new OfflajnRadio({\r\n        id: \"jformparamsmoduleparametersTabthemetextfonttab\",\r\n        values: [\"Text\",\"Hover\"],\r\n        map: {\"Text\":0,\"Hover\":1},\r\n        mode: \"\"\r\n      });\r\n    \r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemetextfonttype\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">Alternative fonts<\\\/div><div class=\\\"listelement\\\">Cyrillic<\\\/div><div class=\\\"listelement\\\">CyrillicExtended<\\\/div><div class=\\\"listelement\\\">Greek<\\\/div><div class=\\\"listelement\\\">GreekExtended<\\\/div><div class=\\\"listelement\\\">Khmer<\\\/div><div class=\\\"listelement\\\">Latin<\\\/div><div class=\\\"listelement\\\">LatinExtended<\\\/div><div class=\\\"listelement\\\">Vietnamese<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"0\",\"text\":\"Alternative fonts\"},{\"value\":\"Cyrillic\",\"text\":\"Cyrillic\"},{\"value\":\"CyrillicExtended\",\"text\":\"CyrillicExtended\"},{\"value\":\"Greek\",\"text\":\"Greek\"},{\"value\":\"GreekExtended\",\"text\":\"GreekExtended\"},{\"value\":\"Khmer\",\"text\":\"Khmer\"},{\"value\":\"Latin\",\"text\":\"Latin\"},{\"value\":\"LatinExtended\",\"text\":\"LatinExtended\"},{\"value\":\"Vietnamese\",\"text\":\"Vietnamese\"}],\r\n        selectedIndex: 6,\r\n        height: 0,\r\n        fireshow: 0\r\n      });\r\n    dojo.addOnLoad(function(){ \r\n      new OfflajnSwitcher({\r\n        id: \"jformparamsmoduleparametersTabthemetextfontsizeunit\",\r\n        units: [\"px\",\"em\"],\r\n        values: [\"px\",\"em\"],\r\n        map: {\"px\":0,\"em\":1},\r\n        mode: 0,\r\n        url: \"http:\\\/\\\/localhost:8888\\\/fashion\\\/administrator\\\/..\\\/modules\\\/mod_improved_ajax_login\\\/params\\\/offlajnswitcher\\\/images\\\/\"\r\n      }); \r\n    });\n      new OfflajnText({\n        id: \"jformparamsmoduleparametersTabthemetextfontsize\",\n        validation: \"int\",\n        attachunit: \"\",\n        mode: \"increment\",\n        scale: \"1\",\n        minus: 0,\n        onoff: \"\"\n      }); \n    \n    var el = dojo.byId(\"jformparamsmoduleparametersTabthemetextfontcolor\");\n    jQuery.fn.jPicker.defaults.images.clientPath=\"\/fashion\/modules\/mod_improved_ajax_login\/params\/offlajndashboard\/..\/offlajncolor\/offlajncolor\/jpicker\/images\/\";\n    el.alphaSupport=false; \n    el.c = jQuery(\"#jformparamsmoduleparametersTabthemetextfontcolor\").jPicker({\n        window:{\n          expandable: true,\n          alphaSupport: false}\n        });\n    dojo.connect(el, \"change\", function(){\n      this.c[0].color.active.val(\"hex\", this.value);\n    });\n    \r\n      new OfflajnList({\r\n        name: \"jformparamsmoduleparametersTabthemetextfonttextdecor\",\r\n        elements: \"<div class=\\\"content\\\"><div class=\\\"listelement\\\">extralight<\\\/div><div class=\\\"listelement\\\">lighter<\\\/div><div class=\\\"listelement\\\">normal<\\\/div><div class=\\\"listelement\\\">bold<\\\/div><div class=\\\"listelement\\\">bolder<\\\/div><div class=\\\"listelement\\\">extrabold<\\\/div><\\\/div>\",\r\n        options: [{\"value\":\"200\",\"text\":\"extralight\"},{\"value\":\"300\",\"text\":\"lighter\"},{\"value\":\"400\",\"text\":\"normal\"},{\"value\":\"600\",\"text\":\"bold\"},{\"value\":\"700\",\"text\":\"bolder\"},{\"value\":\"800\",\"text\":\"extrabold\"}],\r\n        selectedIndex: 1,\r\n        height: \"4\",\r\n        fireshow: 0\r\n      });\r\n    \n      new OfflajnOnOff({\n        id: \"jformparamsmoduleparametersTabthemetextfontitalic\",\n        mode: \"button\",\n        imgs: \"\"\n      }); \n    \n      new OfflajnOnOff({\n        id: \"jformparamsmoduleparametersTabthemetextfontunderline\",\n        mode: \"button\",\n        imgs: \"\"\n      }); \n    \r\n      new OfflajnRadio({\r\n        id: \"jformparamsmoduleparametersTabthemetextfontalign\",\r\n        values: [\"left\",\"center\",\"right\"],\r\n        map: {\"left\":0,\"center\":1,\"right\":2},\r\n        mode: \"image\"\r\n      });\r\n    dojo.addOnLoad(function(){ \r\n      new OfflajnSwitcher({\r\n        id: \"jformparamsmoduleparametersTabthemetextfontafontunit\",\r\n        units: [\"ON\",\"OFF\"],\r\n        values: [\"1\",\"0\"],\r\n        map: {\"1\":0,\"0\":1},\r\n        mode: 0,\r\n        url: \"http:\\\/\\\/localhost:8888\\\/fashion\\\/administrator\\\/..\\\/modules\\\/mod_improved_ajax_login\\\/params\\\/offlajnswitcher\\\/images\\\/\"\r\n      }); \r\n    });\n      new OfflajnText({\n        id: \"jformparamsmoduleparametersTabthemetextfontafont\",\n        validation: \"\",\n        attachunit: \"\",\n        mode: \"\",\n        scale: \"\",\n        minus: 0,\n        onoff: \"1\"\n      }); \n    \n      new OfflajnText({\n        id: \"jformparamsmoduleparametersTabthemetextfonttshadow0\",\n        validation: \"float\",\n        attachunit: \"px\",\n        mode: \"\",\n        scale: \"\",\n        minus: 0,\n        onoff: \"\"\n      }); \n    \n      new OfflajnText({\n        id: \"jformparamsmoduleparametersTabthemetextfonttshadow1\",\n        validation: \"float\",\n        attachunit: \"px\",\n        mode: \"\",\n        scale: \"\",\n        minus: 0,\n        onoff: \"\"\n      }); \n    \n      new OfflajnText({\n        id: \"jformparamsmoduleparametersTabthemetextfonttshadow2\",\n        validation: \"float\",\n        attachunit: \"px\",\n        mode: \"\",\n        scale: \"\",\n        minus: 0,\n        onoff: \"\"\n      }); \n    \n    var el = dojo.byId(\"jformparamsmoduleparametersTabthemetextfonttshadow3\");\n    jQuery.fn.jPicker.defaults.images.clientPath=\"\/fashion\/modules\/mod_improved_ajax_login\/params\/offlajndashboard\/..\/offlajncolor\/offlajncolor\/jpicker\/images\/\";\n    el.alphaSupport=true; \n    el.c = jQuery(\"#jformparamsmoduleparametersTabthemetextfonttshadow3\").jPicker({\n        window:{\n          expandable: true,\n          alphaSupport: true}\n        });\n    dojo.connect(el, \"change\", function(){\n      this.c[0].color.active.val(\"hex\", this.value);\n    });\n    dojo.addOnLoad(function(){ \r\n      new OfflajnSwitcher({\r\n        id: \"jformparamsmoduleparametersTabthemetextfonttshadow4\",\r\n        units: [\"ON\",\"OFF\"],\r\n        values: [\"1\",\"0\"],\r\n        map: {\"1\":0,\"0\":1},\r\n        mode: 0,\r\n        url: \"http:\\\/\\\/localhost:8888\\\/fashion\\\/administrator\\\/..\\\/modules\\\/mod_improved_ajax_login\\\/params\\\/offlajnswitcher\\\/images\\\/\"\r\n      }); \r\n    });\r\n      new OfflajnCombine({\r\n        id: \"jformparamsmoduleparametersTabthemetextfonttshadow\",\r\n        num: 5,\r\n        switcherid: \"jformparamsmoduleparametersTabthemetextfonttshadow4\",\r\n        hideafter: \"0\",\r\n        islist: \"0\"\r\n      }); \r\n    \n      new OfflajnText({\n        id: \"jformparamsmoduleparametersTabthemetextfontlineheight\",\n        validation: \"\",\n        attachunit: \"\",\n        mode: \"\",\n        scale: \"\",\n        minus: 0,\n        onoff: \"\"\n      }); \n    });"
        });
    

      new OfflajnText({
        id: "jformparamsmoduleparametersTabthemesmalltext",
        validation: "int",
        attachunit: "px",
        mode: "",
        scale: "",
        minus: 0,
        onoff: ""
      }); 
    

    var el = dojo.byId("jformparamsmoduleparametersTabthemeerrorcolor");
    jQuery.fn.jPicker.defaults.images.clientPath="/fashion/modules/mod_improved_ajax_login/params/offlajndashboard/../offlajncolor/offlajncolor/jpicker/images/";
    el.alphaSupport=false; 
    el.c = jQuery("#jformparamsmoduleparametersTabthemeerrorcolor").jPicker({
        window:{
          expandable: true,
          alphaSupport: false}
        });
    dojo.connect(el, "change", function(){
      this.c[0].color.active.val("hex", this.value);
    });
    
jQuery.fn.jPicker.defaults.images.clientPath="http://localhost:8888/fashion/administrator/../modules/mod_improved_ajax_login/params/offlajncolor/offlajncolor/jpicker/images/";

      new OfflajnOnOff({
        id: "jformparamsmoduleparametersTabthemeerrorgradonoff",
        mode: "",
        imgs: ""
      }); 
    

      new OfflajnGradient({
        hidden: dojo.byId("jformparamsmoduleparametersTabthemeerrorgrad"),
        switcher: dojo.byId("jformparamsmoduleparametersTabthemeerrorgradonoff"),
        onoff: 0,
        start: dojo.byId("jformparamsmoduleparametersTabthemeerrorgradstart"),
        end: dojo.byId("jformparamsmoduleparametersTabthemeerrorgradstop")
      });
    

    var el = dojo.byId("jformparamsmoduleparametersTabthemehintcolor");
    jQuery.fn.jPicker.defaults.images.clientPath="/fashion/modules/mod_improved_ajax_login/params/offlajndashboard/../offlajncolor/offlajncolor/jpicker/images/";
    el.alphaSupport=false; 
    el.c = jQuery("#jformparamsmoduleparametersTabthemehintcolor").jPicker({
        window:{
          expandable: true,
          alphaSupport: false}
        });
    dojo.connect(el, "change", function(){
      this.c[0].color.active.val("hex", this.value);
    });
    
jQuery.fn.jPicker.defaults.images.clientPath="http://localhost:8888/fashion/administrator/../modules/mod_improved_ajax_login/params/offlajncolor/offlajncolor/jpicker/images/";

      new OfflajnOnOff({
        id: "jformparamsmoduleparametersTabthemehintgradonoff",
        mode: "",
        imgs: ""
      }); 
    

      new OfflajnGradient({
        hidden: dojo.byId("jformparamsmoduleparametersTabthemehintgrad"),
        switcher: dojo.byId("jformparamsmoduleparametersTabthemehintgradonoff"),
        onoff: 0,
        start: dojo.byId("jformparamsmoduleparametersTabthemehintgradstart"),
        end: dojo.byId("jformparamsmoduleparametersTabthemehintgradstop")
      });
    });
      djConfig = {};})();