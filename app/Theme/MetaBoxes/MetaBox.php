<?php

namespace Baytek\Wordpress\Theme\MetaBoxes;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Template for custom meta boxes
 */

abstract class MetaBox {

	/**
	 * Unique ID used for meta box and nonce
	 */
	protected $id;

	/**
	 * Keys for post meta saved in this box
	 */
	protected $metaKeys = [];

	/**
	 * Supported post types for meta box
	 */
	protected $postTypes = [
		'post',
	];

	/**
	 * Position for the meta box
	 */
	protected $position = 'side';

	/**
	 * Priority for the meta box
	 */
	protected $priority = 'default';

	/**
	 * Main plugin instance
	 */
	protected $plugin;

	/**
	 * Create the MetaBox object and call the addHooks() method
	 *
	 * @param  BaytekEvents\Plugin  $instance
	 */
	public function __construct() {
		$this->addHooks();
	}

	// Functions required by child classes

	/**
	 * Set up all class hooks
	 */
	public function addHooks() {
		// Add meta boxes to the post edit page
		foreach ( $this->postTypes as $postType ) {
			add_action( 'add_meta_boxes_'.$postType, [ $this, 'addMetaBox' ] );
		}

		// Save the custom post meta
		add_action( 'save_post', [ $this, 'saveMeta' ], 10, 2 );
	}

	/**
	 * Add meta box to the post edit page
	 *
	 * @param  WP_Post  $post  The post object
	 */
	public function addMetaBox( $post ) {

		add_meta_box(
			$this->id,
			$this->getLabel(),
			[ $this, 'renderMetaBox' ],
			$this->postTypes,
			$this->position,
			$this->priority
	    );
	}

	/**
	 * Get the i18n label for the metabox
	 */
	public function getLabel() {
		return __( 'Custom Meta Box', Plugin::TEXTDOMAIN );
	}

	/**
	 * Render the meta box
	 *
	 * @param  WP_Post  $post  The post object
	 */
	abstract public function renderMetaBox( $post );

	/**
	 * Save the attachment meta data from the custom meta box
	 *
	 * @param  int  	$post_id  The ID of the post being saved
	 * @param  WP_Post  $post  	  The post object being saved
	 */
	public function saveMeta( $post_id, $post ) {

		// Make sure it's save to safe
		if ( !$this->shouldSaveData( $post_id, $post ) ) return;

    	// Check the nonce and then save the post meta
    	if ( check_admin_referer( $this->id , $this->id . '_nonce' ) ) {

    		foreach ( $this->metaKeys as $metaKey ) {
				//Save the metadata
		        $metaValue = sanitize_text_field( $_POST[$metaKey] );

		        if ( empty( $metaValue ) ) {
		            delete_post_meta( $post_id, $metaKey, $metaValue );
		        }
		        else {
		            update_post_meta( $post_id, $metaKey, $metaValue );
	        	}
			}
    	}
	}

	// Functions common to all child classes

	/**
	 * Perform a number of checks to determine whether data should be saved
	 *
	 * @param  int  	$post_id  The ID of the post being saved
	 * @param  WP_Post  $post  	  The post object being saved
	 *
	 * @return boolean  		  True if safe to save, otherwise false
	 */
	public function shouldSaveData( $post_id = '', $post = null ) {
		// If empty, return as there's something wrong
    	if ( empty( $post_id ) || empty( $post ) || empty( $_POST ) ) return false;

    	// Don't save meta on autosave
	    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return false;
	    if ( is_int( wp_is_post_autosave( $post ) ) ) return false;

	    // Make sure this is the correct post type
    	if ( !in_array($post->post_type, $this->postTypes) ) return;

	    // Don't save meta while doing AJAX
    	if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) return;

	    // If quick edit dont save any custom info
	    $screen = get_current_screen();
	    if ( $screen && $screen->base != 'post' ) return false;

	    // Is the user allowed to edit the post or page?
	    if ( !current_user_can( 'edit_post', $post_id ) ) return false;

	    // If all checks pass, return true
	    return apply_filters( __NAMESPACE__.'\\'.__CLASS__.'->'.__METHOD__, true );
	}
}
