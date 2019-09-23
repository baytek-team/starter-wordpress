<?php

namespace Baytek\Wordpress\Theme;

/**
 * Init theme supports and textdomain
 */

class Setup extends Base
{
	/**
	 * Set up all class hooks
	 */
	public function addHooks()
	{
		add_action('after_setup_theme', [$this, 'setup']);

		// Remove default link on attached images
		add_action('admin_init', [$this, 'removeImageLink']);

		// Add ID columns to pages and posts in the admin
		add_filter('manage_media_columns', [$this, 'filterColumns']);
		add_filter('manage_media_custom_column', [$this, 'filterColumnContent'], 10, 2);
		add_filter('manage_posts_columns', [$this, 'filterColumns']);
		add_filter('manage_posts_custom_column', [$this, 'filterColumnContent'], 10, 2);

		// Make the URLS relative
		add_filter('image_send_to_editor', [$this, 'useRelativeUrl'], 10, 8);

		// Add support for SVGs in the media library
		add_filter('upload_mimes', [$this, 'customMimeTypes']);

		// Trap mail, sometimes
		if (defined('MAILTRAP_IT') && MAILTRAP_IT) {
			add_action('phpmailer_init', [$this, 'mailtrap']);
		}
	}

	/**
	 * Init theme supports, image sizes, text domains, etc.
	 */
	public function setup()
	{
		/**
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 */
		load_theme_textdomain(THEMEL10N, get_template_directory() . '/languages');

		// Add default posts and comments RSS feed links to head.
		add_theme_support('automatic-feed-links');

		/**
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support('title-tag');


		// Add support for editor styles.
		add_theme_support( 'editor-styles' );

		// Enqueue editor styles.
		add_editor_style( '/assets/styles/bundle-editor.css' );

		// Disable custom font sizes for paragraphs
		add_theme_support( 'disable-custom-font-sizes' );

		/**
		 * Add paragraph size variants to choose from.
		 * Ensure these match the base font sizes you specify in the stylesheet.
		 * ex. p, p.small, p.lead
		 *
		 * Options chosen will add the class name has-[name]-font-size
		 * ex. p.has-small-font-size
		 */
		add_theme_support( 'editor-font-sizes', [
			[ 'name' => __('Small',  THEMEL10N), 'slug' => 'small',  'size' => 14 ],
			[ 'name' => __('Normal', THEMEL10N), 'slug' => 'normal', 'size' => 16 ],
			[ 'name' => __('Large',  THEMEL10N), 'slug' => 'lead',   'size' => 20 ],
		]);

		// Disable the custom color picker
		add_theme_support( 'disable-custom-colors' );

		/**
		 * Add brand colors to the palette to choose from.
		 * Ensure these match the colors you specify in the stylesheet that you want users to be able to pick.
		 */
		add_theme_support( 'editor-color-palette', [
			[ 'name' => __('Black',      THEMEL10N), 'slug' => 'black',      'color' => '#000000' ],
			[ 'name' => __('Dark Grey',  THEMEL10N), 'slug' => 'dark-grey',  'color' => '#4b4b4b' ],
			[ 'name' => __('Grey',       THEMEL10N), 'slug' => 'grey',       'color' => '#9e9e9e' ],
			[ 'name' => __('Light Grey', THEMEL10N), 'slug' => 'light-grey', 'color' => '#e5e5e5' ],
			[ 'name' => __('White',      THEMEL10N), 'slug' => 'white',      'color' => '#ffffff' ],
			// [ 'name' => __('Brand1',     THEMEL10N), 'slug' => 'brand1',     'color' => 'rgba(0,0,0,0.3)' ],
			// [ 'name' => __('Brand2',     THEMEL10N), 'slug' => 'brand2',     'color' => 'hex or rgb value' ],
			// [ 'name' => __('Brand3',     THEMEL10N), 'slug' => 'brand3',     'color' => 'hex or rgb value' ],
		]);

		// Add responsive embeds so they take the full width of their container
		add_theme_support( 'responsive-embeds' );

		// Add support for align wide and align full blocks (ex. columns, images)
		add_theme_support( 'align-wide' );


		/**
		 * Adding theme support for excerpt by default on pages
		 */
		add_post_type_support( 'page', 'excerpt' );


		/**
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support('post-thumbnails');
		add_image_size('archive-thumbnail', 800, 534, true);

		/**
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			[
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			]
		);
	}

	/**
	 * Remove default link on images
	 */
	public function removeImageLink()
	{
		$image_set = get_option('image_default_link_type');

		if ($image_set !== 'none') {
			update_option('image_default_link_type', 'none');
		}
	}

	/**
	 * Filters media library and post columns to add an ID column
	 *
	 * @param  array  $columns  An associative array of columns
	 *
	 * @return array  $columns  The modified array of columns
	 */
	public function filterColumns($columns)
	{
		$columns['colID'] = __('ID', THEMEL10N);
		return $columns;
	}

	/**
	 * Show the media library and post item ID in the ID column
	 *
	 * @param  string  $columnName  The name of the current column
	 * @param  int     $post_id     The ID of the current media library item
	 */
	public function filterColumnContent($columnName, $post_id)
	{
		if ($columnName == 'colID') {
			echo $post_id;
		}
	}

	/**
	 * Intercept outgoing mail and send it to Mailtrap
	 *
	 * @param  PHPMailer  $phpmailer  The PHPMailer instance (passed by reference)
	 *
	 * @see https://mailtrap.io/
	 */
	public function mailtrap($phpmailer)
	{
		$phpmailer->isSMTP();
		$phpmailer->Host = 'smtp.mailtrap.io';
		$phpmailer->SMTPAuth = true;
		$phpmailer->Port = 2525;
		$phpmailer->Username = defined('MAILTRAP_USERNAME') ? MAILTRAP_USERNAME : '9b6f851c9058a2';
		$phpmailer->Password = defined('MAILTRAP_PASSWORD') ? MAILTRAP_PASSWORD : '043b4bbea680a1';
	}

	/**
	 * Allow uploading of SVG files into the media library
	 *
	 * @param  array  $types  The array of allowed mime types
	 *
	 * @return array  $types  The updated array
	 */
	public function customMimeTypes($types)
	{
		// Update the array to include SVG
		$types['svg'] = 'image/svg+xml';
		$types['svgz'] = 'image/svg+xml';

		return $types;
	}

	/**
	 * Don't upload the entire url
	 *
	 */
	public function useRelativeUrl($html, $id, $caption, $title, $align, $url, $size, $alt)
	{
		$imageurl = wp_get_attachment_image_src($id, $size);
		$relativeurl = wp_make_link_relative($imageurl[0]);
		$html = str_replace($imageurl[0], $relativeurl, $html);

		return $html;
	}
}
