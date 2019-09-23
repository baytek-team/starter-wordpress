<?php

namespace Baytek\Wordpress\Theme\Taxonomies;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Template for custom meta boxes
 */

class Type extends Taxonomy {

	/**
	 * Supported post types for meta box
	 */
	protected $postTypes = [
		'post',
		'page'
	];

	/**
	 * Taxonomy args
	 */
	protected $slug = 'type';
	protected $hierarchical = true;
}
