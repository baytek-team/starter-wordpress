<?php

namespace Baytek\Wordpress\Theme;

/**
 * Admin-related theme code
 */

class Rest extends Base
{
	/**
	 * All of the controllers to register
	 */
	protected $controllers = [
		Controllers\SingleController::class
	];

	/**
	 * Set up all class hooks
	 *
	 * @see https://developer.wordpress.org/reference/hooks/rest_api_init/
	 */
	public function addHooks()
	{
		//Register our custom routes
		add_action('rest_api_init', [$this, 'registerRoutes']);
	}

	/**
	 * Initialize all of the custom routes
	 *
	 * @see https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/
	 */
	public function registerRoutes() {
		foreach ($this->controllers as $controller) {
			$c = new $controller();
			$c->register_routes();
		}
	}
}
