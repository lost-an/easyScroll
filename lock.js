(function(){
 // 获取对象
 var $ = function (id){
  return document.getElementById(id);
 };
 // 遍历
 var each = function(a, b) {
  for (var i = 0, len = a.length; i < len; i++) b(a[i], i);
 };
 // 事件绑定
 var bind = function (obj, type, fn) {
  if (obj.attachEvent) {
   obj['e' + type + fn] = fn;
   obj[type + fn] = function(){obj['e' + type + fn](window.event);}
   obj.attachEvent('on' + type, obj[type + fn]);
  } else {
   obj.addEventListener(type, fn, false);
  };
 };
 
 // 移除事件
 var unbind = function (obj, type, fn) {
  if (obj.detachEvent) {
   try {
    obj.detachEvent('on' + type, obj[type + fn]);
    obj[type + fn] = null;
   } catch(_) {};
  } else {
   obj.removeEventListener(type, fn, false);
  };
 };
 
 // 阻止浏览器默认行为
 var stopDefault = function(e){
  e.preventDefault ? e.preventDefault() : e.returnValue = false;
 };
 // 获取页面滚动条位置
 var getPage = function(){
  var dd = document.documentElement,
   db = document.body;
  return {
   left: Math.max(dd.scrollLeft, db.scrollLeft),
   top: Math.max(dd.scrollTop, db.scrollTop)
  };
 };
 
 // 锁屏
 var lock = {
  show: function(){
   $('pageOverlay').style.visibility = 'visible';
   var p = getPage(),left = p.left,top = p.top;
   var bb="yuyuyuyuyuuyuu";
   
   // 页面鼠标操作限制
   this.mouse = function(evt){

   };
   each(['DOMMouseScroll', 'mousewheel', 'scroll', 'contextmenu'], function(o, i) {
     bind(document, o, lock.mouse);
   });

  },
  close: function(){
   $('pageOverlay').style.visibility = 'hidden';
   each(['DOMMouseScroll', 'mousewheel', 'scroll', 'contextmenu'], function(o, i) {
    unbind(document, o, lock.mouse);
   });
   unbind(document, 'keydown', lock.key);
  }
 };
 bind(window, 'load', function(){
  $('btn_lock').onclick = function(){
   lock.show();
  };
  $('pageOverlay').onclick = function(){
   lock.close();
  };
 });
})();
