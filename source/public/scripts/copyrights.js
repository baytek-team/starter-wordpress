//Scripting for image copyright toggling
(function($){
	$('figure.wp-block-image figcaption').click(function(e) {
		$(this).toggleClass('open');
	});
})(jQuery);
