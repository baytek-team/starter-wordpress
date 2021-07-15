// Scripting for sliders or carousels (Baytek gutenblocks plugin includes a slider block that uses slick slider)
(function($){

	// Baytek Slider Block
	$('.carousel-slider').each(function(){
		var slickIndividual = $(this);
		slickIndividual.slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			arrows: true,
			dots: false,
		  	variableWidth: true,
			nextArrow: slickIndividual.next().find('.right'),
			prevArrow: slickIndividual.next().find('.left'),
			draggable: true,
			infinite: true,
		  	responsive: [
		  		{
					breakpoint: 720,
					// breakpoint: 1000,
					settings: {
						slidesToShow: 2
					}
				}
			]
		});
	});

})(jQuery);