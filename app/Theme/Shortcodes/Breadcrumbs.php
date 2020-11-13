<?php

namespace Baytek\Wordpress\Theme\Shortcodes;

use WP_Query;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Template for custom shortcodes
 */

class Breadcrumbs extends Shortcode {

	/**
	 * Unique tag used in content
	 */
	protected $tag = 'breadcrumbs';

	/**
	 * Render the shortcode
	 *
	 * @param  array  $attrs  An array of shortcode attributes
	 */
	public function shortcodeCallback( $atts ) {
		global $post;

		//Only draw crumbs if we have parents
		if (!isset($post->post_parent) || $post->post_parent == 0) {
			return '';
		}

		// Parse the attributes passed
	    $args = shortcode_atts( array(
	        'append_self' => false
	    ), $atts, 'breadcrumbs' );

	    set_query_var('append_self', $args['append_self']);

		//Draw the template
		ob_start();

		//Locate the template, rather than get the template part, so variables will be set
		get_template_part('templates/partials/breadcrumbs');

		$output = ob_get_contents();
		ob_end_clean();

		return $output;
	}
}
