(function($) {       
$.fn.board = function(options) {     
		
// Extend our default options with those provided.    
  // Note that the first arg to extend is an empty object -    
  // this is to keep from overriding our "defaults" object.    
  var opts = $.extend({}, $.fn.board.defaults, options);    
  var me=$(this);
 if(options!=null)
 {
  if(options.showTitle==false){
       alert(me.children(".usefulWebsiteTitleDiv").hide());
  }
 }

//点击
 me.children(".usefulWebsiteTitleDiv").click(function(){
  me.children(".usefulWebsiteContent").toggle();
 });

 //li经过时候的动作
 me.children(".usefulWebsiteContent").find("ul li").hover(function(){
      $(this).css("color","red");
	  $(this).find("a").css("color","red");
 },function(){
	  $(this).css("color","#4d4d4d");
	  	  $(this).find("a").css("color","#4d4d4d");
 });

};     
$.fn.board.defaults = {    
  foreground: 'red',    
  background: 'yellow',
  showTitle:true,
};

})(jQuery);