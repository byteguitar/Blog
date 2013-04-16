;(function ($, window, undefined) {
  'use strict';

  $.fn.foundationNavigation = function (options) {

    var lockNavBar = false;
    // Windows Phone, sadly, does not register touch events :(
    if (Modernizr.touch || navigator.userAgent.match(/Windows Phone/i)

		) {

      $(document).on('click.fndtn touchstart.fndtn', '.nav-bar a.flyout-toggle', function (e) {
        e.preventDefault();
        var flyout = $(this).siblings('.flyout').first();
        if (lockNavBar === false) {
          $('.nav-bar .flyout').not(flyout).slideUp(500);
          flyout.slideToggle(500, function () {
            lockNavBar = false;
          });
        }
        lockNavBar = true;
      });
      $('.nav-bar>li.has-flyout', this).addClass('is-touch');
    } else {
      $('.nav-bar>li.has-flyout', this).hover(function (event) {


       $(this).children('.flyout').show();


      }, function () {

        
        $(this).children('.flyout').hide();
      });
/*
            $('.nav-bar>li.has-flyout', this).bind("click touchstart touchend",function () {

			    		 $(".chooseMenu").hide();		
				       $(this).children('.flyout').show(2000);
					   	   $(this).children('.flyout').addClass("chooseMenu");
						  
			});
			            $('.nav-bar>li.has-flyout', this).hover(function () {},
							function(){
					    		 $(".chooseMenu").hide();		
						});
*/

    } // if end 

  };

})( jQuery, this );
