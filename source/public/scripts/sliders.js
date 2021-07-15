// Scripting for sliders or carousels (Baytek gutenblocks plugin includes a slider block that uses slick slider)
(function($){

	// Simple Slider Block using Slick.js
	$('.carousel-slider').slick({
		arrows: true,
		dots: true,
		slidesToScroll: 1,
		slidesToShow: 4,
		infinite: true,
		// variableWidth: true,
		draggable: true,
		prevArrow: '<button type="button" class="slick-prev slick-arrow"><i class="fal fa-chevron-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next slick-arrow"><i class="fal fa-chevron-right"></i></button>',
		responsive: [{
			breakpoint: 1600,
			settings: {
				slidesToShow: 3
			}
		},{
			breakpoint: 1000,
			settings: {
				slidesToShow: 2
			}
		},{
			breakpoint: 500,
			settings: {
				slidesToShow: 1
			}
		}]
	});



	// If you need multiple Slider Blocks on one page use this instead of above:
	///// 1. Create a Group Block with the class: carousel-wrapper
	///// 2. Add the Slider Block in this new Group
	///// 3. Below the Slider and in the same Group add the Buttons Block for the custom Arrows
	///// 4. Add 2 buttons:  1st will have '.left' class. 2nd will have '.right' class.
	// $('.carousel-wrapper .wp-block-group__inner-container .carousel-slider').each(function(){
	// 	var slickIndividual = $(this);
	// 	slickIndividual.slick({
	// 		slidesToShow: 3,
	// 		slidesToScroll: 1,
	// 		arrows: true,
	// 		dots: false,
	// 		nextArrow: slickIndividual.next().find('.right'),
	// 		prevArrow: slickIndividual.next().find('.left'),
	// 		draggable: true,
	// 		infinite: true,
	// 	  	responsive: [
	// 	  		{
	// 				breakpoint: 720,
	// 				settings: {
	// 					slidesToShow: 2
	// 				}
	// 			}
	// 		]
	// 	});
	// });

})(jQuery);