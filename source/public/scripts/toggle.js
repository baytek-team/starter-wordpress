// Toggle interactivity - use jQuery SlideToggle if needed
(function($){
	$(".wp-block-baytek-toggle .toggle-header").on( "click", function() {
		$(this).next().slideToggle("300", function() {
			$(this).parent().toggleClass("expanded");
		});
	});


})(jQuery);

