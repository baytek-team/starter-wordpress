// Scripting for sliders or carousels (Baytek gutenblocks plugin includes a slider block that uses slick slider)
(function($){

	// New Baytek Block
	$('.carousel-slider').each(function(){
		var slickIndividual = $(this);
		slickIndividual.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			dots: false,
		  	variableWidth: false,
			nextArrow: slickIndividual.next().find('.right'),
			prevArrow: slickIndividual.next().find('.left')
		});
	});

})(jQuery);