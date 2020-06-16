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
		//add_filter('daft_ajax_output', [$this, 'paginateArchives']);

		// Filter the dynamic archive filter to use the eventDate meta for events
		//add_filter('daft_query_args', [$this, 'filterDaftQueryArgs']);

		// Filter before/after labels for events
		//add_filter('daft-date-after-label', [$this, 'filterDaftDateAfterLabel']);
		//add_filter('daft-date-before-label', [$this, 'filterDaftDateBeforeLabel']);
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
			//Upcoming by default
			$compare = '>=';

			//Check the order/orderby to show past or upcoming correctly
			if (isset($args['orderby']) && isset($args['orderby']['meta_value']) && strtoupper($args['orderby']['meta_value']) == 'DESC') {
				//Show past events
				$compare = '<=';
			}

			//Set the meta query
			$args['meta_query'] = [
				'relation' => 'AND',
				[
					'relation' => 'OR',
					[
						'key' => 'eventEndDate',
						'value' => date('Y-m-d'),
						'compare' => $compare
					],
					[
						'key' => 'eventDate',
						'value' => date('Y-m-d'),
						'compare' => $compare
					],
				]
			];

			//Make sure the meta keys are set
			$args['meta_key'] = 'eventDate';
			$args['meta_type'] = 'DATE';

			// If there is a date query (Event Before/After), replace it with a meta query
			if ( isset( $args['date_query'] ) && !empty( $args['date_query'] ) ) {

				// Populate the meta query with the 'before' and/or 'after' info
				foreach ( $args['date_query'][0] as $filter => $date ) {
					$args['meta_query'][] = [
						'relation' => 'OR',
						[
							'key' => 'eventDate',
							'value' => $date,
							'compare' => $filter == 'before' ? '<=' : '>=',
							'type' => 'DATE',
						],
						[
							'key' => 'eventEndDate',
							'value' => $date,
							'compare' => $filter == 'before' ? '<=' : '>=',
							'type' => 'DATE',
						]
					];
				}

				// Remove the date query since it's been replaced with a meta query
				unset($args['date_query']);
			}
		}

		return $args;
	}

	/**
	 * Filter the DAFT date after label
	 *
	 * @param  string  $label
	 *
	 * @return string  $label  The updated label
	 */
	public function filterDaftDateAfterLabel($label) {
		global $wp_query;

		if (isset($wp_query->query_vars['post_type']) && $wp_query->query_vars['post_type'] == 'event') {
			$label = __('Event After', THEMEL10N);
		}

		return $label;
	}

	/**
	 * Filter the DAFT date after label
	 *
	 * @param  string  $label
	 *
	 * @return string  $label  The updated label
	 */
	public function filterDaftDateBeforeLabel($label) {
		global $wp_query;

		if (isset($wp_query->query_vars['post_type']) && $wp_query->query_vars['post_type'] == 'event') {
			$label = __('Event Before', THEMEL10N);
		}

		return $label;
	}
}
