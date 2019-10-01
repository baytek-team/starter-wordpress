(function ($) {
	var pauseStickyCheck = false;

	stickyHeaderCheck();

    $(window).scroll(function () {
		stickyHeaderCheck();
    });

    $('.main-menu-toggle').click(function(e) {
        forceSticky();
    });

    function stickyHeaderCheck() {
    	if (pauseStickyCheck) return;

    	$('header').toggleClass('is-sticky', $(document).scrollTop() > 120);

       //  if ($(document).scrollTop() < 120) {
       //      $('.logo-link img').attr('src','/wp-content/themes/starter-wordpress/assets/images/logo.svg');
       //  }

       // if ($(document).scrollTop() > 120) {
       //      $('.logo-link img').attr('src','/wp-content/themes/starter-wordpress/assets/images/logo-light.svg');
       //  }

    }

    function forceSticky() {

        pauseStickyCheck = true;

        window.setTimeout(function() {
            pauseStickyCheck = false;
        }, 850);
    }

})(jQuery);