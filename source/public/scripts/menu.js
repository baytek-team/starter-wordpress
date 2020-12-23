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



	// (just an example below change it to suit your needs)
	//Listen for menu clicks with anchors, to close the menu 
	$(document).on('click', '.menus.open li.current-menu-item a:not(.expand)', function() {
		mainNav();
	});
	
})(jQuery);
