<?php

namespace Baytek\Wordpress\Theme\Shortcodes;

use WP_Query;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Template for custom shortcodes
 */

class Menu extends Shortcode {

	/**
	 * Unique tag used in content
	 */
	protected $tag = 'menu';

	/**
	 * Render the shortcode
	 *
	 * @param  array  $attrs  An array of shortcode attributes
	 */
	public function shortcodeCallback( $atts ) {
		extract(shortcode_atts(array( 'name' => null, 'class' => null ), $atts));

		return wp_nav_menu( array( 'menu' => $name, 'menu_class' => 'mega-menu-links', 'echo' => false ) );
	}
}
