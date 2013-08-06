(function($,D,undefined){//todo 增加【tab切换头】和 【lazyLoad】功能
	"use strict";
	$.fn.wheel = function(t, n) {
        var r = $.browser.mozilla ? "DOMMouseScroll": "mousewheel",
		i = function(e) {
            var t = e.originalEvent,n = {};
            return "wheelDelta" in t ? n.wheelDelta = Math.round(t.wheelDelta)/120 : "detail" in t && (n.wheelDelta = -t.detail * 40)/120,n
        };
        t === "on" ? this.on(r, function(t) {
            var r = $.extend(t, i(t));n.call(this, t)
        }) : t === "off" && this.off(r, n)
    };

	var methods = {
		_COLLECT:[],
		addCss:function(){
			var cssStyle="<style>" +
				".orz{}"+
				"</style>";
			$(cssStyle).appendTo("head");
		},
		OPEN:function(prop){//为了使用内部方法stop和auto
			var mod=methods._COLLECT;
			//$(this).css('display',"none");
			for(var i=0,len=mod.length;i<len;i++){
				if(this[0] == mod[i].$ele[0]){
					//alert($.data(mod[i],'tp'))
					mod[i][prop]();
					//mod.splice(i--,1);
					//len--;
				}
			}
		}
	};
	 $.fn.Orz = function(args){//万一看不懂...看这个 http://leeyee.github.io/blog/2012/12/02/jquery-plugins-authoring/
		$.fn.Orz.defaults={marquee:false,lazy:false,wheel:false,info:false,vertical:false,button:true,auto:false,effect:"scroll",onMouse:"mouseover",delay:2000,loop:false,nav:false,all:false,thumbs:false,content:"ul>li",title:"h2 a"}
		var set=args ? $.extend($.fn.Orz.defaults,args):$.fn.Orz.defaults;
		if(methods[args]){
			return methods[args].call(this,Array.prototype.slice.call(arguments,1));
		}else if(typeof args === 'object' || !args){		
				return this.each(function(){		
				var Mod=new plugin(set,$(this));
				Mod.readyCss($(this));
				Mod.generate($(this));
				set.auto && Mod.auto();
				set.marquee && Mod.marquee();
				set.wheel && Mod.wheel($(this));
				$.data(Mod,'tp',$(this).offset()['top']);
				methods['_COLLECT'].push(Mod);
			});
		}else{
			 $.error( '方法-------' +  args + '---------不存在');
		}
	 };


	 methods.addCss();
	 function plugin(set,$E){
		 this.set=set;
		 this.idx=0;
		 this.from=0;
		 this.$ele=$E;
		 this.timer=null;
		 this.$lis=$E.find(set.content);
		 this.len=this.$lis.length;//设置了 set.all后 大小会重新计算！
		 this.effect = this.EFFECT[set.effect]||function(){};
		 this.isMoving=false;
	 };
	 plugin.prototype={
		readyCss:function($E){
				var set=this.set;
				var wh=set.vertical?this.$lis.eq(0).outerHeight(true):this.$lis.eq(0).outerWidth(true);
				var WH=set.vertical?$E.height():$E.width();
				this.viewed=Math.ceil(WH/wh);//可见范围内有几个
				this.num=this.len;//在this.len改变前，保存原始个数；
				this.fix(set);
			switch(set.effect){
				case "scroll":
					var l,tmp;
					if(set.all){this.WH=WH;this.len=Math.ceil(wh*this.num/this.WH)}else{this.WH=wh}//重新计算this.len
					this.fly=set.vertical?'scrollTop':'scrollLeft';
					this.$ul=$E.children();
					this.css={};
					if(set.loop){//无缝的时候,只复制可见范围内的元素
						tmp=document.createDocumentFragment();
						for(var i=0;i<this.viewed;i++){
							this.$lis.eq(i).clone().appendTo(tmp);
						}
						this.$ul.append(tmp);
					};
					l=(set.loop&&!set.vertical)?this.WH*this.len+(this.viewed*wh):this.WH*this.len;//loop需要的宽度；垂直的不需要；若css里写width:99999px这步就不用算了
					if(set.vertical){l=false}
					this.$ul.css({width:l||'100%',height:'100%'}).wrap("<div style='overflow:hidden;height:100%;width:100%'></div>").children().css({overflow:'hidden',float:set.vertical?'':'left'});
					this.lay=this.$ul.parent();//获取用来滚的临时div
					break;
				case "fade":
					this.$lis.css({position:"absolute",left:0,top:0}).eq(0).css("zIndex","2").parent().css({height:'100%',overflow:'hidden'});
				default:break;
			}//switch
			if(set.lazy){//还没做好
				this.$imgs=this.$ul.find('img');
				for(var i=0;i<this.viewed;i++){
					this.$imgs.eq(i).attr('src',this.$imgs.eq(i).attr('lazy')).removeAttr('lazy');//
				}
			}
		},
		wheel:function($E){
			var that=this;
			$E.wheel("on",function(e){
				that.idx+=e.wheelDelta>0?-1:1;
				if(that.idx<0||that.idx>=that.len){that.idx=0}
				e.preventDefault();
				that.start(that.idx);

			});
		},
		generate:function($E){
			var that=this,set=that.set;
			if(set.button && this.len>1){
				var $ol=$("<ol></ol>").appendTo($E),str='';
				for(var i=0;i<that.len;i++){str+="<li>"+(i+1)+"</li>";}//设置了set.all后this.len会有不同个数
				$ol[0].innerHTML=str;
				that.olis=$ol[0].getElementsByTagName('li');
				that.olis[0].className="on";
				$E.on(set.onMouse,"ol li", function() {
					that.stop();
					that.start($(this).index());
				}).on("mouseout","ol li",function(){
					set.auto && that.auto();	
				})				
			}
			$E.on('mouseover',function(){
				that.stop();
			}).on('mouseout',function(){
				set.auto && that.auto();
			});
			if(set.nav && this.len>1){
				$("<a href='javascript:void(0)' onselectstart='return false;' class='pre'><</a><a href='javascript:void(0)' onselectstart='return false' class='next'>></a>").appendTo($E);
				$E.on("click",".pre",function(){
					that.nav(that.idx--);
					return false;
				}).on("click",".next",function(){
					that.nav(that.idx++);
					return false;
				})
			}
			if(set.info){
				$("<strong style='font-size:16px;position:absolute;right:0;top:0;padding:3px 10px;background:#0093D0;color:white;z-index:4'></strong>").html("<b>"+this.viewed+"</b>/"+this.num).appendTo($E);
				this.$infoNum=$E.find("b").get(0);
			}
			if(set.marquee){		
				$E.on('mouseover',function(){that.stop();}).on('mouseleave',function(){that.marquee();})
			}
			if(set.title){//tab的头；还没做好～
				$E.on("click",set.title,function(){
					that.start($(this).index());
				});
			}
		},
		start:function(now){
			this.idx=now;
			if(this.idx!=this.from && !this.isMoving){		
					this.effect(this);
					this.set.info && this.EFFECT['__info'](this);
					this.reset();
			}
		},
		nav:function(i){
			if( (!this.set.loop && !this.set.all) && (this.idx>(this.num-this.viewed))){//一张一张滚，没有set.loop，没有set.all的情况
				//this.idx=this.num-this.viewed;//停止移动
				this.idx=0;//返回头部
			}
			if(this.idx<0 || this.idx>=this.len){
				this.idx=0;
			}
			this.start(this.idx);
		},
		stop:function(){
			clearInterval(this.timer);
		},
		auto:function(){
			this.timer=setInterval($.proxy(function(){
				this.idx=(this.idx >= (this.len-1)) ? 0 : (++this.idx);
				//this.idx=(this.idx+1)%this.len;//技巧
				this.start(this.idx);
			},this),this.set.delay)
		},
		marquee:function(){
			var that=this,lay=this.lay[0],fly=this.fly,end=this.WH*this.len,dis=lay[fly];
			this.timer=setInterval(function(){
				dis= dis >=end ? 0:++dis;
				lay[fly]=dis;
			},17);
		},
		EFFECT:{
			'scroll':function(e){
					e.isMoving=true;
					if(e.set.loop && e.from==e.len-1 && e.idx==0){;//多向前滚一次,然后重置,看起来像循环滚
						e.css[e.fly]+=this.WH;
						e.lay.animate(e.css,function(){
							e.lay[0][e.fly]=0;
							e.isMoving=false;
						})
					}else{
						e.css[e.fly]=(e.idx*this.WH);
						e.lay.stop(true,false).animate(e.css,function(){
							e.isMoving=false;
						});
					}
			},
			'fade':function(e){
						e.isMoving=true;
						e.$lis.eq(e.idx).css("zIndex","1");
						e.$lis.eq(e.from||0).stop().fadeOut(500,function(){
							$(this).css({zIndex:0,display:"block"});
							e.$lis.eq(e.idx).css("zIndex","2");
							e.isMoving=false;
						});
			},
			'__info':function(e){
					if(e.set.all){
						e.$infoNum.innerHTML=(e.idx+1)*e.viewed;
					}else{
						e.$infoNum.innerHTML=e.idx+1
					}
			}
		},
		reset:function(){
			if(this.set.button){
				this.olis[this.from].className="";
				this.olis[this.idx].className="on";
			}
			this.from=this.idx;
		},
		fix:function(set){//防止奇怪组合....里面全删也没啥关系
			var that=this;
			if(set.effect=="fade"){
				set.loop=false;set.veritcal=false;set.all=false;set.wheel=false;set;
			}
			if(set.marquee){
				set.all=true,set.loop=true,set.auto=false,set.info=false,set.button=false,set.nav=false;set.wheel=false;
			}
			if(this.viewed>1 && !set.all){
				set.info=false;set.button=false;
			}
			if(set.lazy){
				set.loop=false;
			}
		}
	 }
})(jQuery,document);