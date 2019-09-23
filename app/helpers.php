<?php

/**
 * Get the main term in a given taxonomy for a post
 * Supports Yoast Primary Category, with vanilla fallback
 *
 * @param  string  $tax  	 The taxonomy to query in
 * @param  int 	   $post_id  The post ID to look up
 *
 * @return WP_Term | false   Return the main term within the tax, or false if none exists
 */
function get_main_post_term($tax, $post_id) {
	// Make sure both the taxonomy and the post are real
	if (!$tax || !taxonomy_exists($tax) || !$post_id || !get_post_status($post_id))
		return false;

	// Initialize term
	$term = null;

	// Accommodate Yoast, if it exists
	if (class_exists('WPSEO_Primary_Term')) {
		$primary = new WPSEO_Primary_Term($tax, $post_id);
		$term = get_term($primary->get_primary_term());
	}

	// Otherwise, just get the first term, in case there's more than one
	if (is_wp_error($term) || !$term) {
		$terms = wp_get_post_terms($post_id, $tax);
		$term = (is_array($terms) && !empty($terms)) ? $terms[0] : false;
	}

	// Return false for WP_Error, otherwise return the term (which could be false)
	return is_wp_error($term) ? false : $term;
}
