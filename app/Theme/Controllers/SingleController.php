<?php

namespace Baytek\Wordpress\Theme\Controllers;

use WP_Query;

use WP_REST_Controller;
use WP_REST_Response;
use WP_REST_Server;

class SingleController extends WP_REST_Controller {

	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {
		$version = '1';
		$namespace = THEMEL10N.'/v' . $version;
		$base = 'single';

		//Get the single post
		register_rest_route(
			$namespace,
			'/' . $base,
			[
				[
			        'methods'             => WP_REST_Server::READABLE,
			        'callback'            => [$this, 'get_items'],
			        'permission_callback' => [$this, 'get_items_permissions_check'],
			        'args' 				  => $this->get_collection_params()
			    ]
			]
		);
	}

	/**
     * Get a collection of items
     *
     * @param  WP_REST_Request $request Full data about the request.
     *
     * @return WP_Error|WP_REST_Response
     */
	public function get_items($request) {
		//Process the args
		$args = $request->get_params();

		//Run the query
		$query = new WP_Query($args);
		$posts = [];

		//Process the posts
		foreach ($query->posts as $post) {
			$posts[] = $this->prepare_item_for_response($post, $request);
		}

		//Build the response
		$data = [
			'post' => isset($posts[0]) ? $posts[0] : null
		];

		//Return the response
		return new WP_REST_Response($data, 200);
	}

	/**
	 * Check if a given request has access to get items
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|bool
	 */
	public function get_items_permissions_check($request) {
		return true;
	}

	/**
	 * Check if a given request has access to get a specific item
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|bool
	 */
	public function get_item_permissions_check($request) {
		return $this->get_items_permissions_check($request);
	}

	/**
	 * Prepares the post for the REST response.
	 *
	 * @param mixed           $post    WordPress representation of the post.
	 * @param WP_REST_Request $request Request object.
	 * @return WP_Error|WP_REST_Response Response object on success, or WP_Error object on failure.
	 */
	public function prepare_item_for_response($post, $request) {
		//Setup data
		$GLOBALS['post'] = $post;
		setup_postdata($post);

		//Start building the data
		$data = [
			'id' => $post->ID,
			'title' => apply_filters('the_title', $post->post_title),
			'content' => apply_filters('the_content', $post->post_content),
			'full_image_url' => has_post_thumbnail($post->ID) ? get_the_post_thumbnail_url($post->ID, 'single-large') : '',
			'featured_image_caption' => has_post_thumbnail($post->ID) ? get_the_post_thumbnail_caption($post->ID) : '',
			'post_date' => $post->post_date,
			'post_type' => $post->post_type,
			'meta' => get_post_meta($post->ID, '')
		];

		//Add the applicable taxonomy terms
		$tags = wp_get_post_terms($post->ID, 'post_tag');

		$data['terms'] = [
			'tags' => is_wp_error($tags) || !$tags ? [] : $tags
		];

		//Add the author
		$author = get_userdata($post->post_author);
		$profile_image_id = get_the_author_meta('attachment_id', $author->ID);

		if ($author) {
			$data['author'] = [
				'display_name' => $author->display_name,
				'profile_image_url' => $profile_image_id ? wp_get_attachment_thumb_url($profile_image_id) : ''
			];
		}

		return $data;
	}

	/**
	 * Get the query params for collections
	 *
	 * @return array
	 */
	public function get_collection_params() {
		return [
			'posts_per_page' => [
				'description'       => 'Maximum number of items to be returned in result set.',
		        'type'              => 'integer',
		        'default'           => 1,
		        'sanitize_callback' => 'absint',
			],
			'post_type' => [
				'description'       => 'Filter the collection to this type.',
		        'type'              => 'string',
		        'default'           => 'post',
		        'sanitize_callback' => 'sanitize_text_field',
			],
			'orderby' => [
				'description'       => 'Order the collection by this field',
		        'type'              => 'string',
		        'default'           => 'post_date',
		        'sanitize_callback' => 'sanitize_text_field',
			],
			'order' => [
				'description'       => 'Order the collection in this convention.',
		        'type'              => 'string',
		        'default'           => 'desc',
		        'sanitize_callback' => 'sanitize_text_field',
			],
			'name' => [
				'description'       => 'Return items matching this post name',
		        'type'              => 'string',
		        'default'           => '',
		        'sanitize_callback' => 'sanitize_text_field',
			]
		];
	}
}
