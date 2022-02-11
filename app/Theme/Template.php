<?php

namespace Baytek\Wordpress\Theme;

/**
 * Organize theme templates
 */

class Template extends Base
{
	/**
	 * Relative path to look for page template files
	 */
	protected $pageDir = 'templates/pages';

	/**
	 * Relative path to look for default Wordpress templates
	 */
	protected $defaultDir = 'templates/default';

	/**
	 * Template types to look for in the relative default dir
	 */
	protected $types = [
		'404',
		'archive',
		'page',
		'search',
		'single'
	];

    /**
	 * Set up all class hooks
	 */
	public function addHooks() {
		// Add the directory to search for custom page templates
		add_filter('theme_page_templates', [$this, 'filterPageTemplatesDir'], 10, 4);

		// Change the directory to search for default site templates
    	foreach ($this->types as $type) {
    		add_filter("{$type}_template_hierarchy", [$this, 'filterDefaultTemplatesDir']);
    	}

    	// Output the header and footer on each template
    	add_action('theme_header', [$this, 'renderHeader']);
    	add_action('theme_footer', [$this, 'renderFooter']);

    	// Strip shortcodes from excerpts
    	add_filter('get_the_excerpt', [$this, 'stripShortcodes'], 1, 2);

    	// Filter default excerpt length
    	add_filter('excerpt_length', [$this, 'filterExcerptLength'], 999);

    	//Remove empty p tags from content
    	add_filter('the_content', [$this, 'remove_empty_p'], 20, 1);

    	// Add extra markup to menus for mobile toggle (after mega menu is appended)
    	add_filter('walker_nav_menu_start_el', [$this, 'addDropdownToMenuAnchors'], 20, 4);

	}

	/**
	 * Filters list of page templates for a theme.
	 *
	 * @param  array        $post_templates Array of page templates. Keys are filenames,
	 *                                      values are translated names.
	 * @param  WP_Theme     $theme          The theme object.
	 * @param  WP_Post|null $post           The post being edited, provided for context, or null.
	 * @param  string       $post_type      Post type to get the templates for.
	 *
	 * @return array 		$post_templates The updated array of post templates
	 */
    public function filterPageTemplatesDir($post_templates, $theme, $post, $post_type) {
    	// Use the WP_Theme object to scan for page files
    	$fullPath = trailingslashit($theme->get_stylesheet_directory()).$this->pageDir;
    	$results = (array) scandir($fullPath);

    	// Find all the PHP files
    	foreach ( $results as $result ) {
    		if (substr(strtolower($result), -4, 4) == '.php' && preg_match('|Template Name:(.*)$|mi', file_get_contents(trailingslashit($fullPath).$result), $header)) {

    			// If it's a page template, add it to the array
    			$post_templates[trailingslashit($this->pageDir).$result] = _cleanup_header_comment($header[1]);
    		}
    	}

    	return $post_templates;
    }

    /**
	 * Filters the list of template filenames that are searched for when retrieving a template to use.
	 *
	 * The last element in the array should always be the fallback template for this query type.
	 *
	 * Possible values for `$type` include: 'index', '404', 'archive', 'author', 'category', 'tag', 'taxonomy', 'date',
	 * 'embed', 'home', 'frontpage', 'page', 'paged', 'search', 'single', 'singular', and 'attachment'.
	 *
	 * @param array $templates A list of template candidates, in descending order of priority.
	 *
	 * @param array $templates The updated template files array
	 */
    public function filterDefaultTemplatesDir($templates) {
    	// Prepend the relative path
    	foreach ($templates as $key => $value) {
    		// Only for templates that have no subdirectory already listed
    		if (!strpos($value, '/')) {
    			$templates[$key] = trailingslashit($this->defaultDir).$value;
    		}
    	}

    	return $templates;
    }

    /**
	 * Load header template.
	 *
	 * Includes the header template for a theme or if a name is specified then a
	 * specialised header will be included.
	 *
	 * For the parameter, if the file is called "header-special.php" then specify
	 * "special".
	 *
	 * @param string $name The name of the specialised header.
	 *
	 * @see get_header()
	 */
	public function renderHeader( $name = null ) {
		/**
		 * Fires before the header template file is loaded.
		 *
		 * @since 2.1.0
		 * @since 2.8.0 $name parameter added.
		 *
		 * @param string|null $name Name of the specific header file to use. null for the default header.
		 */
		do_action( 'get_header', $name );

		$templates = array();
		$name = (string) $name;
		if ( '' !== $name ) {
			$templates[] = "templates/headers/header-{$name}.php";
		}

		$templates[] = 'templates/headers/header.php';

		locate_template( $templates, true );
	}

	/**
	 * Load footer template.
	 *
	 * Includes the footer template for a theme or if a name is specified then a
	 * specialised footer will be included.
	 *
	 * For the parameter, if the file is called "footer-special.php" then specify
	 * "special".
	 *
	 * @param string $name The name of the specialised footer.
	 *
	 * @see get_footer()
	 */
	public function renderFooter( $name = null ) {
		/**
		 * Fires before the footer template file is loaded.
		 *
		 * @since 2.1.0
		 * @since 2.8.0 $name parameter added.
		 *
		 * @param string|null $name Name of the specific footer file to use. null for the default footer.
		 */
		do_action( 'get_footer', $name );

		$templates = array();
		$name = (string) $name;
		if ( '' !== $name ) {
			$templates[] = "templates/footers/footer-{$name}.php";
		}

		$templates[] = 'templates/footers/footer.php';

		locate_template( $templates, true );
	}

	/**
	 * Strip shortcodes from the excerpt
	 *
	 * @param  string   $excerpt  The excerpt
	 * @param  WP_Post  $post     The post to retrieve the excerpt for
	 *
	 * @return string   $excerpt  The updated excerpt
	 */
	public function stripShortcodes($excerpt = '', $post) {
		return strip_shortcodes($excerpt);
	}

	/**
	 * Filter the default excerpt length
	 *
	 * @param  int  $length  The default length
	 *
	 * @return int  		 The updated length
	 */
	public function filterExcerptLength($length) {
		return 20;
	}

	/**
	 * Remove empty paragraphs created by wpautop()
	 * @author Ryan Hamilton
	 * @link https://gist.github.com/Fantikerz/5557617
	 */
	public function remove_empty_p( $content ) {
		$content = force_balance_tags( $content );
		$content = preg_replace( '#<p>\s*+(<br\s*/*>)?\s*</p>#i', '', $content );
		$content = preg_replace( '~\s?<p>(\s|&nbsp;)+</p>\s?~', '', $content );
		return $content;
	}


	/**
	 * Filter menu items to add drop-down toggle for mobile menu
	 *
	 * @param  string   $item_output  The menu item's HTML output
	 * @param  WP_Post  $item  		  Menu item data object
	 * @param  int  	$depth  	  Depth of menu item
	 * @param  obj  	$args  		  An object of nav menu arguments
	 *
	 * @return string  $item_output  The modified menu item
	 */
	public function addDropdownToMenuAnchors($item_output, $item, $depth, $args) {
		if (isset($item->classes) && is_array($item->classes) && in_array('has-mega-menu', $item->classes)) {
			//Wrap the anchors in a span so we can size correctly
			$item_output = preg_replace('/\<a/', '<span class="anchors"><a', $item_output, 1);
			$item_output = preg_replace('/\<\/a\>/', '</a><a aria-hidden="true" class="expand"><i class="fal fa-angle-down"></i></a></span>', $item_output, 1);
		}

		return $item_output;
	}


}
