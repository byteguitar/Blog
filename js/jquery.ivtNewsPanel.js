(function($) {       
$.fn.NewsPanel = function(options) {     
		
// Extend our default options with those provided.    
  // Note that the first arg to extend is an empty object -    
  // this is to keep from overriding our "defaults" object.    
  var opts = $.extend({}, $.fn.NewsPanel.defaults, options);    
  var newsEachPage=4;
  var me=$(this);
 if(options!=null)
 {

 }
 var NavigationToPage=function(url,newsID)
	{

	      $("#pageDisplayNewsInfo").load(url, function() {
                  LoadNewsContent(newsID);
			  });
	}
 //----------载入新闻内容-------------
 var LoadNewsContent=function(newsID)  
	{
	 $('#divNewsImage').children().remove();
	 $.ajax({
			type: "POST",		
			dataType:"jsonp", 
			jsonp:"jsonpcallback", 
			url: "http://www.ivt.edu.cn/html5/GetNewsImages.aspx?newsid="+newsID,
			success: function(data){
					        $.each(data, function (k, v) {
								  var content = "<img class=a src='http://www.ivt.edu.cn/shownewsimage.aspx?imageid=" + v.ID + "' style='width:400px;height:300px'/>";
					              var img = $(content);
						          $('#divNewsImage').append(img);
							});
			},
	 });

     	$.ajax({
			type: "POST",
			dataType:"jsonp", 
			jsonp:"jsonpcallback", 
			url: "http://www.ivt.edu.cn/html5/GetNewsInfoJson.aspx?newsID="+newsID,
			success: function(data){

				   $("#newsContent_MainTitle").text(data.MainTitle);

				   $("#newsContent_Content").html(data.Content);
			},
		});
	 
	 $(".main_content").children("div[class!='newsContent']").hide();	    
     $(".newsContent").show();
   

	 $("#butNewsContentBack").bind("click",function(){  //返回主界面
     
		   $(".newsContent").hide();	
           $(".main_content").children("div[class!='newsContent']").show();


	 });

	}


//-----------载入新闻-----------------
 var LoadNews=function(column,formDisplay,ulNews){
 	$.ajax({
			type: "POST",
			dataType:"jsonp", 
			jsonp:"jsonpcallback", 
			url: "http://www.ivt.edu.cn/html5/GetNewsJson.aspx?column="+column,
		data: formDisplay.serialize(),
		success: function(data){

			$.each(data,function(i,v){ 
		
		        var date=new Date(v.PublicDate); //utc 
			//	var disDate=date.toISOString();
		 //     var disDate=date.toLocaleDateString();


				var li=$("<li/>").html( "<a   href='#' rel="+v.NewsInfoID+">"+v.MainTitle+"</a>"+"<span style='float:right'>("+v.PublicDate+")</span>").appendTo(ulNews) ;
				li.children("a").addClass("aNews");
				li.children("a").bind("click",function(){
//                 LoadNewsContent(v.NewsInfoID);//转载新闻内容
				 NavigationToPage('pages/newsinfo.html',v.NewsInfoID);
				});


			}); 

			
			},
		error:function(XmlHttpRequest,textStatus, errorThrown)
		{
			alert("加载新闻失败;"+XmlHttpRequest.responseText);
		}
		
	});  //ajaxend 

 };

   LoadNews("lastnewsinfo",$("#formNews"),$("#ulNews"));
   LoadNews("bulletin",$("#formBulletin"),$("#ulBulletin"));
   LoadNews("schoolmessage",$("#formMessageInSchool"),$("#ulMessageInSchool"));


	$(".triggerNewsMore").bind("click",function()
	{
		var parentForm=$(this).parents("form");

		var childStartIndex=parentForm.children("#startIndex");
		var childEndIndex=parentForm.children("#endIndex");
		var type=parentForm.children("#newsType").attr("value");
		  var startIndex=parentForm.children("#startIndex").attr("value");
		  var endIndex=parentForm.children("#endIndex").attr("value");

        startIndex=parseInt(endIndex)+1;
		endIndex=startIndex+newsEachPage;

     childStartIndex.attr("value",startIndex);
       childEndIndex.attr("value",endIndex);
		 LoadNews(type,parentForm,parentForm.children("ul"));
	});

	$(".triggerNewsSub").bind("click",function(){   //减少新闻数量
         
 		var parentForm=$(this).parents("form");

		var childStartIndex=parentForm.children("#startIndex");
		var childEndIndex=parentForm.children("#endIndex");
   	  var startIndex=childStartIndex.attr("value");
	  var endIndex=childEndIndex.attr("value");
  		var type=parentForm.children("#newsType").attr("value");
		var ul=parentForm.children("ul");

          startIndex=parseInt(startIndex);
          if(startIndex-newsEachPage>1)
		{
			 for(var i=startIndex-1;i<endIndex;i++)
			{
			  //$('#ulNews li').eq(i).addClass('newsRemove');
				ul.children("li").eq(i).addClass('newsRemove');
			}
			$(".newsRemove").remove();
			  startIndex=startIndex-newsEachPage-1;
			  endIndex=endIndex-newsEachPage-1;
	  		 childStartIndex.attr("value",startIndex);
			 childEndIndex.attr("value",endIndex);

		}




	}); //click end


	$(".triggerMinusMax").toggle(function(){
		$("#panelNews").attr("class","six columns panelNews");


		$("#panelBulletin").attr("class","six columns panelNews");
		$("#panelMessageInSchool").attr("class","six columns panelNews");

							$("#panelNews").css("width","50%");
										$("#panelBulletin").css("width","50%");
												$("#panelMessageInSchool").css("width","50%");

        $(".triggerMinusMax img").attr("src","images/iconMax.png");

	},
		function(){
		$("#panelNews").attr("class","tweleve columns panelNews");
		$("#panelBulletin").attr("class","tweleve columns panelNews");
		$("#panelMessageInSchool").attr("class","tweleve columns panelNews");

					$("#panelNews").css("width","100%");
										$("#panelBulletin").css("width","100%");
												$("#panelMessageInSchool").css("width","100%");
        $(".triggerMinusMax img").attr("src","images/iconMinus.png");

		}
	);




	//----------------------新闻，公告，通知，点击

	$(".News").bind("click",function()
	{
		 alert('ok');
	});


		


    

};     
$.fn.NewsPanel.defaults = {    

  showTitle:true,
};

})(jQuery);