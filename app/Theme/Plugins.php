<?php

namespace Baytek\Wordpress\Theme;

/**
 * Theme code that interacts with other plugins
 */

class Plugins extends Base
{
	/**
	 * Set up all class hooks
	 */
	public function addHooks()
	{
		// Add pagination summary and links at the bottom of the archive results
		// add_filter('daft_ajax_output', [$this, 'paginateArchives']);

		// Filter the dynamic archive filter to use the eventDate meta for events
		// add_filter('daft_query_args', [$this, 'filterDaftQueryArgs']);
	}

	/**
	 * Append pagination links to the archive results
	 *
	 * @param  string    $html   The archive items' markup
	 */
	public function paginateArchives($html) {
		ob_start();

		get_template_part('templates/partials/section', 'pagination');

		$html .= ob_get_contents();
		ob_end_clean();

		return $html;
	}

	/**
	 * Set the wp_query order and date queries differently for events, since they rely on a meta date
	 *
	 * @param  array  $args  An array of wp_query arguments
	 *
	 * @return array  $args  The updated arguments
	 */
	public function filterDaftQueryArgs($args) {
		if (isset($args['post_type']) && $args['post_type'] == 'event') {
			// Reset orderby
			$args['orderby'] = ['meta_value' => 'ASC'];

			$args['meta_key'] = 'eventDate';
			$args['meta_type'] = 'DATE';

			// Ensure they are upcoming events by default
			$args['meta_query'] = [
				[
					'key' => 'eventEndDate',
					'value' => date('Y-m-d'),
					'compare' => '>='
				]
			];

			// If there is a date query (Event Before/After), replace it with a meta query
			if ( isset( $args['date_query'] ) && !empty( $args['date_query'] ) ) {

				// If doing a date query don't do the upcoming events filter
				unset($args['meta_value']);
				unset($args['meta_compare']);

				$args['meta_query'] = [
					'relation' => 'AND'
				];

				// Populate the meta query with the 'before' and/or 'after' info
				foreach ( $args['date_query'][0] as $filter => $date ) {
					$args['meta_query'][] = [
						'key' => 'eventDate',
						'value' => $date,
						'compare' => $filter == 'before' ? '<=' : '>=',
						'type' => 'DATE',
					];
				}

				// Remove the date query since it's been replaced with a meta query
				unset( $args['date_query'] );
			}
		}

		return $args;
	}
}
