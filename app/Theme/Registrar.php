<?php

namespace Baytek\Wordpress\Theme;

/**
 * Register menus, widget areas, etc.
 */

class Registrar extends Base
{
    /**
	 * Set up all class hooks
	 * @see https://developer.wordpress.org/reference/hooks/widgets_init/
	 */
	public function addHooks() {
		// Init widget areas - uncomment if you have sidebars
		// add_action('widgets_init', [$this, 'widgetsInit']);

		//Init menus
		$this->registerMenus();
	}

	/**
	 * Register the sidebar(s) used by the site.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_sidebar/
	 */
	public function widgetsInit() {
		// register_sidebar(
		// 	[
		// 		'name'          => esc_html__( 'Sidebar', THEMEL10N ),
		// 		'id'            => 'sidebar-1',
		// 		'description'   => '',
		// 		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		// 		'after_widget'  => '</div>',
		// 		'before_title'  => '<div class="h2 widget-title">',
		// 		'after_title'   => '</div>',
		// 	]
		// );
	}

	/**
	 * Register the theme menu locations
	 *
	 * Default menus defined are a primary navigation menu and a secondary menu.
	 * - Primary is intended for the main site navigation
	 * - Secondary is typically used for things like social media links or other useful links.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_nav_menus/
	 */
	public function registerMenus() {
		register_nav_menus(
			[
				'primary'   => esc_html__( 'Primary',   THEMEL10N ),
				'secondary' => esc_html__( 'Secondary', THEMEL10N ),
			]
		);
	}
}
