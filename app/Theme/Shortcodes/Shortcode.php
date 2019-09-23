<?php

namespace Baytek\Wordpress\Theme\Shortcodes;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Template for custom meta boxes
 */

abstract class Shortcode {

	/**
	 * Unique tag used in content
	 */
	protected $tag = 'custom-shortcode';

	/**
	 * Create the MetaBox object, setting the main plugin
	 * instance and calling the addHooks() method
	 */
	public function __construct() {
		$this->addHooks();
	}

	// Functions required by child classes

	/**
	 * Set up all class hooks
	 */
	public function addHooks() {
		// Add the shortcode
		add_shortcode( $this->tag, [ $this, 'shortcodeCallback' ] );
	}

	/**
	 * Render the shortcode
	 *
	 * @param  WP_Post  $post  The post object
	 */
	abstract public function shortcodeCallback( $atts );
}
