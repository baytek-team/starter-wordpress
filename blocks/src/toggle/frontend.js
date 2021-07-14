// Toggle interactivity - use jQuery SlideToggle if needed
jQuery(".wp-block-baytek-toggle .toggle-header").on( "click", function() {
	jQuery(this).next().slideToggle("300", function() {
		jQuery(this).parent().toggleClass("expanded");
	});
});
