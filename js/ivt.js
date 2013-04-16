

$(document).ready(function(){






//------------------------------- emberjs mvc操作

App = Em.Application.create();
/*
App.PeopleView = Ember.View.extend({
	templateName:'newsinfolist',
  people: [ { name: 'Yehuda' },
            { name: 'Tom' } ]
});
App.SearchTextField = Em.TextField.extend({
    insertNewline: function(){
		alert('tt');
      //  App.CNewsInfoController.loadTweets();
    }
});
App.CNewsInfo=Em.Object.extend({  //定义新闻实体
	 mainTitle:null,
	 content:null,
	 publicDate:null,
});

App.CNewsInfoController=Em.ArrayController.create({
	username:'dfdfdf',
	loadNewsInfo: function() {
        
	
	},
});


App.CNewsInfoController.loadNewsInfo();
*/
//------------------------------------菜单关联新闻面板-----------------------------------------

var panelNow;
panelNow=$(".panelNews");
panelNow.show();

var loadNewsPanel=function(obj)	{

	    var panel=$("."+obj.attr("href"));        
		panelNow.hide();

        panel.slideToggle("slow");
		panelNow=panel;
	}

$(".menuNewsSpan").bind("click",function(e){
		    loadNewsPanel($(this));
			e.preventDefault(); 

});






//---------------------------------动态内容面板，要隐藏所有的其他无关面板

var nowDynamicPanel=null;
var touchStartX=0;
var touchStartY=0;

$(".menuSpan").bind("click",function(e){
				e.preventDefault(); 
				 $(".ivt_content").hide();	      //隐藏其他的页面
		 	    var panel=$($(this).attr("href"));  //得到相关的链接
				alert($(this).attr("href"));
				panel.show();

				panel.bind("touchend",function(event){
				});


				panel.bind("touchstart",function(event){
					if(event.touches==null)
						$("#debug").text("touch error");

 					 $("#debug").text(event.touches.length);

 if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];				 					 

       
					 touchStartX = touch.pageX;
			         touchStartY = touch.pageY;

 }


				});
				panel.bind("touchmove",function(event){

						if(!toucheevent.touches.length)  //滑动
								return;
						 var touch = event.touches[0];
					 var  offsetx = touch.pageX -touchStatX;
					 var  offsety = touch.pageY-touchStartY;


					 if(offsetx<0)
					{

						nowDynamicPanel.hide();
			    		 $(".ivt_content").show();
					}
				});

				 nowDynamicPanel=panel;

   
});

$(".butDynamicContentBack").bind("click",function(){
			  nowDynamicPanel.hide();
			 $(".ivt_content").show();
});


//-------------------------------




$('#usefulWebsite').board();

$('#panelNews').NewsPanel();

var pop=$('#a1_up');


//-------------------------------滚动到相关的提示信息，然后
//$('html, body').animate({ scrollTop: $("#a1_up").offset().top }, 'slow'); 

var strContent="<div>点击这里可以打开网站的帮助提示</div> <input id=butTipClose type=button class='[tiny, small, medium, large] button' value=close /></input>";
var apiHelp=$('#iconHelp').qtip({content:strContent,

  style: { name: 'cream', tip: true } ,
	  position: { corner: { target:'rightMiddle' } },
   show: {
            when: false, // Don't specify a show event
            ready: true // Show the tooltip when ready
        },	
	hide: {when:{ target: $('#butTipClose') }} // Don't specify a hide event
}).qtip('api'); 
   //Show delayed qTip
   setTimeout(function(){ apiHelp.hide(); }, 3000);

strContent="<div>点击这里可以进入学院的服务网站,有部分是只能学校内部访问，请使用vpn登陆。</div>";
var popupService=$("#usefulWebsite").qtip({content:strContent,


  style: { name: 'cream', tip: true } ,
	  	  position: { corner: { target: 'center',
         tooltip: 'bottomLeft' } },
   show: {
            when: false, // Don't specify a show event
            ready: false // Show the tooltip when ready
        },	
	hide: {when:{ target: $('#butTipClose') }} // Don't specify a hide event
}).qtip('api'); 

 $("#butTipClose").bind("click",function(){
	 $("#a1_up").qtip("hide");
 });


   $("#iconHelp").toggle(function(){

	popupService.show();
	},
		function()
	{

		   popupService.hide();
	});

//--------------------------------照片的弹出


$("a[rel=lightbox]").live("click",function(){

var width=$(this).attr('width');
var height=$(this).attr("height");

$.fancybox({


 'autoscale' : true,
'centerOnScroll'	:true,

				'AutoDimension': true,
				'transitionIn'		: 'none',
				'transitionOut'		: 'none',
				'href'				: 'http://www.ivt.edu.cn/html5/ShowNewsImage.aspx?ImageID='+$(this).attr('data'),
				'type'				:'iframe',
      'width':parseInt(width),
	  'height':parseInt(height),

				 'scrolling'   : 'no',

		});
		return false;
	});



//------------------------------照片墙流动
$("#photoWall").imagesLoaded( function(){
$("#photoWall").masonry({
    itemSelector : '.box',

  });

$("#photoWall").PhotoWall();
//-------------------------------重点链接抖动

  $('.divRumble').jrumble({
        rangeX: 2,
        rangeY: 2,
        rangeRot: 1,
			rumbleSpeed: 250
    });


});








$("#usefulWebsite").click(function () {

  $("#usefulWebsiteContent").fadeToggle("fast", function () {
   //    $("#log").append("<div>finished</div>");
  });

});



//--------------------------------配置对话框

$("#iconConfig").click(function(){
	 $("#panelConfig").toggle();
});
$("#panelConfigClose").click(function(){
	$("#panelConfig").hide();
});

$("#cheDisplayService").click(function(){

	$("#usefulWebsite").toggle();


});


$("#cheDisplayImportant").click(function(){


	if($(this).attr("checked"))
		$("#panelImportant").show();
	else
		$("#panelImportant").hide();
	});


/*
  var calendarPicker1 = $("#dsel1").calendarPicker({
    monthNames:["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12"],
    dayNames: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    //useWheel:true,
    //callbackDelay:500,
    years:1,
    months:1,
    days:2,
    //showDayArrows:false,
    callback:function(cal) {
      $("#wtf").html("Selected date: " + cal.currentDate);
    }});
*/





//--------------------------时钟
     setInterval( function() {
              var seconds = new Date().getSeconds();
              var sdegree = seconds * 6;
              var srotate = "rotate(" + sdegree + "deg)";
              
              $("#sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate, "-ms-transform": srotate});
                  
              }, 1000 );
              
         
              setInterval( function() {
              var hours = new Date().getHours();
              var mins = new Date().getMinutes();
              var hdegree = hours * 30 + (mins / 2);
              var hrotate = "rotate(" + hdegree + "deg)";
              
              $("#hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate,"-ms-transform":hrotate});
                  
              }, 1000 );
        
        
              setInterval( function() {
              var mins = new Date().getMinutes();
              var mdegree = mins * 6;
              var mrotate = "rotate(" + mdegree + "deg)";
              
              $("#min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate,"-ms-transform":mrotate});
                  
              }, 1000 );


  $('#featured').orbit();

//--------------------------------foundation 设置--------------------------------
if(!navigator.userAgent.match(/Android/i)||
	navigator.userAgent.match(/Windows Phone/i)) //在
	{
$(document).foundationNavigation();
	}
//$(document).foundationTopBar();
$(document).foundationCustomForms();
$(document).foundationTabs();



//------------------------------天气预报-----------------



var myprovince = remote_ip_info['province'];
var mycity = remote_ip_info['city']
var mydistrict = remote_ip_info['district'];
//alert("province:"+myprovince+"city:"+mycity+"district:"+mydistrict);


 	$.ajax({
			type: "POST",
			dataType:"jsonp", 
			jsonp:"jsonpcallback", 
			url: "http://www.weather.com.cn/data/sk/101190401.html",
		success: function(data){

			},
	   error:function(error)
		{
//				alert(error.responseText);
		}
	});

   });  //jquery document end 


