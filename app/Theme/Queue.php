<?php

namespace Baytek\Wordpress\Theme;

/**
 * Queue the theme files
 */

class Queue extends Base
{
	/**
	 * Set up all class hooks
	 * @see https://developer.wordpress.org/reference/functions/wp_print_styles/
	 * @see https://developer.wordpress.org/reference/functions/wp_enqueue_script/
	 */
	public function addHooks()
	{
		// Enqueue front end styles
		add_action('wp_print_styles', [$this, 'enqueueStyles'], 20);
		add_action('wp_enqueue_scripts', [$this, 'enqueueScript'], 20);
	}

	/**
	 * Enqueues all the front end script files
	 * @see https://developer.wordpress.org/reference/functions/wp_enqueue_script/
	 */
	public function enqueueScript()
	{
		// Enqueue the theme script
		wp_enqueue_script('app', $this->getAssetsUri('scripts/app.js'), ['jquery'], THEME_VERSION, true);
	}

	/**
	 * Enqueues all the front end style files
	 * @see https://developer.wordpress.org/reference/functions/wp_enqueue_style/
	 */
	public function enqueueStyles()
	{
		// Enqueue the theme style
		wp_enqueue_style('theme', $this->getAssetsUri('styles/bundle.css'), [], THEME_VERSION);

		// Enqueue the Google Fonts
		wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700|Source+Serif+Pro:400,600&display=swap');
	}

	/**
	 * Get the assets URI
	 *
	 * @param   string  $rel  The relative resource path
	 *
	 * @return  string        The full URI
	 */
	protected function getAssetsUri($rel)
	{
		return sprintf(
			'%s%s%s',
			trailingslashit(get_stylesheet_directory_uri()),
			'assets/',
			$rel
		);
	}
}
