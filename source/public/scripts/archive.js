(function($){
	//Only run if there's a filter form on the page
	if ($("#filter-form").length) {

		//Append sorting if there is a sort select
		if ($('#sort-select').length) {

			//Set initial values
			setOrder();

			//Listen for changes
			$('#sort-select').change(function(e) {
				//Set new values
				setOrder();

				//Reset the page
				$('#paged').val(1);

				//Submit the form
				$('#filter-form').trigger('submit');
			});

			function setOrder() {
				//Get the current sort option
				let $selected = $('#sort-select option:selected');

				$('#order').val($selected.attr('data-order'));
				$('#orderby').val($selected.attr('data-orderby'));
			}
		}

		//Add secret filter if there is a secret filter
		if ($('#secret-filter').length) {
			let $secret = $('#secret-filter');

			$("#filter-form").append('<input type="hidden" name="'+$secret.attr('data-taxonomy')+'" value="'+$secret.attr('data-term')+'">');
		}

		//Handle the mobile menu toggling
		$(".filter-taxonomy select").each(function() {
			$(this)
				.selectize({
	                plugins: ['remove_button']
	            });
		});

		//Update the results count and pagination, if it exists
		if ($('#results-column').length) {
			$(document).on('filterComplete', function(e, query) {
				//Rsult count
				$('#result-count').html(query.found_posts);

				//Scroll to top of results if you are lower down
				if ($('html').scrollTop() > $('#results-column').offset().top) {
					$('html').animate({
						scrollTop: $('#results-column').offset().top
					}, 800);
				}
			});
		}

		//Listen for pagination clicks
		$(document).on('click', '.pagination .links a', function(e) {
			let newPage = $(this).attr('data-page');
			let oldPage = $('#paged').val();

			//Only change pages to a new page
			if (newPage != oldPage) {
				$('#paged').val(newPage);
				$('#filter-form').trigger('submit');
			}
		});

		// Mobile filter term reveal
		$( '.filter-sidebar-mobile' ).click( function( e ) {
			$( '.filter-sidebar' ).slideToggle( "slow" );
			$(this).toggleClass('active');
		});

		/**
		 * Manage push state
		 */
		$(document).on('updatePushState', function(e) {
			//Update the URL querystring with the new params
			let form = $('#filter-form').serializeArray();
			let query = {};

			for (let i=0; i<form.length; i++) {
				//Don't save page either for now
				if (!form[i].value || form[i].name == '_paged') {
					continue;
				}
				else if (query[form[i].name.replace('[]', '')]) {
					query[form[i].name.replace('[]', '')] += ',' + form[i].value;
				}
				else {
					query[form[i].name.replace('[]', '')] = form[i].value;
				}
			}

			let newUrl = window.location.href.split('?')[0] + '?' + $.param(query);

			history.pushState(null, null, newUrl);
		});

		/**
		 * Listen to pop state
		 */
		window.onpopstate = function(e) {
			//Make sure we have a filter form and a query string
			if ($('#filter-form').length) {
				//Parse the URL params and submit the filter form
				let query = {};

				//Parse the params
				if (window.location.href.split('?').length > 1) {
					let params = decodeURIComponent(window.location.href.split('?')[1]).split('&');

					//Organize
					for (let i=0; i<params.length; i++) {
						let data = params[i].split('=');

						//Must have a name and a value
						if (data.length !== 2) continue;

						query[data[0]] = data[1];
					}
				}

				//Loop through form fields and see if anything is set; otherwise unset it
				$('#filter-form input, #filter-form select').each(function(item) {
					let name = $(this).attr('name');

					if (!name) return;

					name = name.replace('[]', '');

					//Set the value, if we have one, or to empty if we don't
					let val = query[name];

					//Handle selectized values differently
					if ($(this).hasClass('selectized')) {
						let selectize = $(this)[0].selectize;

						if (typeof val == 'undefined') {
							selectize.setValue('', 1);
						}
						else if ($(this).attr('multiple')) {
							selectize.setValue(query[name].split(','), 1);
						}
						else {
							selectize.setValue(query[name]);
						}
					}
					//Non-selectized
					else {
						if (typeof val == 'undefined') {
							$(this).val('');
						}
						else if ($(this).attr('multiple')) {
							$(this).val(query[name].split(','));
						}
						else {
							$(this).val(query[name]);
						}
					}
				});

				//Update the search dropdown
				if (query._orderby && query._order && $('#sort-select').length) {
					let $opt = $(`#sort-select option[data-order=${query._order}][data-orderby=${query._orderby}]`);

					if ($opt) {
						$('#sort-select').val($opt.attr('value'));
					}
				}

				//Trigger the ajax
				$(document).trigger('filterPopHandled');
			}
		};

	}
})(jQuery);
