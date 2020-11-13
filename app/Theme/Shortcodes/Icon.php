<?php

namespace Baytek\Wordpress\Theme\Shortcodes;

use WP_Query;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Template for custom shortcodes
 */

class Icon extends Shortcode {

	/**
	 * Unique tag used in content
	 */
	protected $tag = 'icon';

	/**
	 * Render the shortcode
	 *
	 * @param  array  $attrs  An array of shortcode attributes
	 */
	public function shortcodeCallback( $atts ) {

		// Parse the attributes passed
	    $args = shortcode_atts( array(
	        'class' => '',
	        'label' => ''
	    ), $atts, 'icon' );

	    $output = sprintf(
	    	'<i class="%s" aria-label="%s"></i>',
	    	$args['class'],
	    	$args['label']
	    );

		return $output;
	}
}
