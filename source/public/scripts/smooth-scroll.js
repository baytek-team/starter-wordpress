// Some starter smooth scrolling JS
// Uses jQuery animate() method - https://api.jquery.com/animate/
(function($) {
	// Add smooth scrolling to all links
	$('a').on('click', function(event) {

		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== '') {
			// Store hash
			var hash = this.hash;

			//only intercept if the hash is on the page
			if (!$(hash).length) return;

			// Prevent default anchor click behavior
			event.preventDefault();
			headerHeight = $("header").height() + 100; // Get fixed header height

			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
			$('html, body').animate({
				scrollTop: $(hash).offset().top - headerHeight
			}, 800, function() {

				// Add hash (#) to URL when done scrolling (default click behavior)
				window.location.hash = hash;
			});
		} // End if
	});

	if(window.location.hash && $(window.location.hash).length) {
		// smooth scroll to the anchor id
		headerHeight = $("header").height() + 100; // Get fixed header height

		$('html, body').animate({
			scrollTop: $(window.location.hash).offset().top - headerHeight
		}, 800);
	}
})(jQuery);
