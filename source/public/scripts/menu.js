// A place to keep your menu scripting (ex. toggling a mobile menu)
(function($){
	// Handle menu interactions
	$(".main-menu-toggle").click(function() {
		mainNav();
	});

	function mainNav() {
		$(".main-menu-toggle").toggleClass("cross");
		$("body").toggleClass("modal-open");
		$("#site-navigation").toggleClass("open");
	}
})(jQuery);
