// A place to keep your menu scripting (ex. toggling a mobile menu)
(function($){
	// Handle menu interactions
	$(".main-menu-toggle").click(function() {
		mainNav();
	});

	function mainNav() {
		$(".main-menu-toggle").toggleClass("cross");
		$("body").toggleClass("no-scroll");
		$("#site-navigation").parent().toggleClass("open");
		$("header").toggleClass("menu-open");
	}


	// Mega Menu when needed
	// $('a.expand').click(function() {
	// 	$(this).toggleClass('open');
	// 	$(this).parents('li').find('.mega-menu').slideToggle();
	// });

	// $('li.has-mega-menu').hoverIntent({
	// 	over() {
	// 		$(this).addClass('has-mega-menu-open');
	// 		$('#menu-main').addClass('mega-menu-open');
	// 		$('#menu-main-fr').addClass('mega-menu-open');

	// 	},
	// 	out() {
	// 		$(this).removeClass('has-mega-menu-open');
	// 		$('#menu-main').removeClass('mega-menu-open');
	// 		$('#menu-main-fr').removeClass('mega-menu-open');

	// 	},
	// 	sensitivity: 5,
	// 	timeout: 200
	// });


	// (just an example below change it to suit your needs)
	//Listen for menu clicks with anchors, to close the menu 
	$(document).on('click', '.menus.open li.current-menu-item a:not(.expand)', function() {
		mainNav();
	});
	
})(jQuery);
