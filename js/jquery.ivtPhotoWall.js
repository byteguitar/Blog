(function($) {       
$.fn.PhotoWall = function(options) {     
		
// Extend our default options with those provided.    
  // Note that the first arg to extend is an empty object -    
  // this is to keep from overriding our "defaults" object.    
  var opts = $.extend({}, $.fn.PhotoWall.defaults, options);    
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
				    alert(data.MainTitle);
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
 var LoadNewsTopImage=function(){
 	$.ajax({
			type: "POST",
			dataType:"jsonp", 
			jsonp:"jsonpcallback", 
			url: "http://www.ivt.edu.cn/html5/GetNewsTopImages.aspx",
		data:"",// formDisplay.serialize(),
		success: function(data){
           if(data.status=="success")
			{

				$.each(data.listImage,function(i,v){ 		
			        var imgid=v.ImageID;			
				    var str=' <div class="box col1">'
					+'<a id="example1" href="#" rel="lightbox" data="'+v.ImageID+'" width="500" height="333"  ><img src="http://www.ivt.edu.cn/ShowNewsImage.aspx?ImageID='+v.ImageID+'" alt=""  style="border:0"/></a>'
					+'</div>';
                   $("#photoWall").append(str);

				});
			}


			
			
			},
		error:function(XmlHttpRequest,textStatus, errorThrown)
		{
			alert("加载新闻失败;"+XmlHttpRequest.responseText);
		}
		
	});  //ajaxend 

 };

   LoadNewsTopImage();












		


    

};     
$.fn.PhotoWall.defaults = {    

  showTitle:true,
};

})(jQuery);