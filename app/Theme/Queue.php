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
		add_action('enqueue_block_editor_assets', [$this, 'ea_gutenberg_scripts'], 20);
	}

	/**
	 * Enqueues all the front end script files
	 * @see https://developer.wordpress.org/reference/functions/wp_enqueue_script/
	 */
	public function enqueueScript()
	{

		//Enqueue slick
		wp_enqueue_script('slick', $this->getAssetsUri('libraries/slick/slick.min.js'), ['jquery'], THEME_VERSION, true);


		// Enqueue the theme script
		wp_enqueue_script('app', $this->getAssetsUri('scripts/app.js'), ['jquery', 'slick'], THEME_VERSION, true);
	}

	/**
	 * Enqueues all the front end style files
	 * @see https://developer.wordpress.org/reference/functions/wp_enqueue_style/
	 */
	public function enqueueStyles()
	{
		// Enqueue the theme style
		wp_enqueue_style('theme', $this->getAssetsUri('styles/bundle.css'), [], THEME_VERSION);

		//Enqueue google fonts
		wp_enqueue_style( 'gutenberg-main-fonts', 'https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@200;300;400;600;700;900&display=swap');

		wp_enqueue_style( 'gutenberg-secondary-fonts', 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap');
	}

	/**
	 * Gutenberg scripts and styles
	 *
	 */
	public function ea_gutenberg_scripts() {
		// Enqueue the theme script
		wp_enqueue_script('baytek-admin', $this->getAssetsUri('scripts/admin.js'), [], THEME_VERSION, true);

		// Google Fonts for Editor
		wp_enqueue_style( 'gutenberg-fonts', $this->gutenberg_fonts_url() );
	}


	/**
	 * Theme Fonts URL
	 *
	 */
	public function gutenberg_fonts_url() {
		$font_families = apply_filters( 'gutenberg_fonts', array( 'Source+Serif+Pro:wght@200;300;400;600;700;900|Source+Sans+Pro' ) );
		$query_args = array(
			'family' => implode( '|', $font_families ),
			'subset' => 'latin,latin-ext',
		);
		$fonts_url = add_query_arg( $query_args, 'https://fonts.googleapis.com/css' );
		return esc_url_raw( $fonts_url );
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
