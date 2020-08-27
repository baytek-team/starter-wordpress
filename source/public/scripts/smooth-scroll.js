// Some starter smooth scrolling JS
// Uses jQuery animate() method - https://api.jquery.com/animate/
(function($) {
	// Add smooth scrolling to all links
	$("a").not('.open-popup-link, .gform_button').on('click', function(event) {

		//Exclude anchors inside p.open-popup-link
		let parent = $(this).parent();
		if (parent.hasClass('open-popup-link')) {
			return;
		}
		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== '' && this.hash != '#search') {
			// Store hash
			var hash = this.hash;

			//only intercept if the hash is on the page
			if (!$(hash).length) return;

			// Prevent default anchor click behavior
			event.preventDefault();
			headerHeight = $(".is-sticky").height() + 100; // Get fixed header height

			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
			$('html, body').animate({
				scrollTop: $(hash).offset().top - headerHeight
			}, 800, function() {

				// Add hash (#) to URL when done scrolling (default click behavior)
				//window.location.hash = hash;
				history.pushState(null, window.title, window.location.href.split('#')[0]+hash);
				
			});
		} // End if
	});

	if(window.location.hash && $(window.location.hash).length) {
		// smooth scroll to the anchor id
		event.preventDefault();
		headerHeight = $(".is-sticky").height() + 100; // Get fixed header height

		$('html, body').animate({
			scrollTop: $(window.location.hash).offset().top - headerHeight
		}, 800);
	}
})(jQuery);
