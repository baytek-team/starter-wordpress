<?php

namespace Baytek\Wordpress;


/**
 * Initialize all the theme functions and files
 */

class Theme
{
	protected $textdomain;
	protected $version;

	public function __construct()
	{
		// Load the composer.json file
		$file = file_get_contents(get_template_directory() . '/composer.json');

		// Decode the JSON file
		$json = json_decode($file);

		// Use the slug as the text domain
		$this->textdomain = $json->extra->wordpress->slug;
		$this->version = $json->extra->wordpress->version;
	}

	public function run()
	{
		//Define the textdomain constant
		define('THEMEL10N', $this->textdomain);

		//Define the theme version constant
		define('THEME_VERSION', $this->version);

		//Theme setup
		new Theme\Setup();

		//Register menus and sidebars
		new Theme\Registrar();

		//Run the template/directory manipulation code
		new Theme\Template();

		//Enqueue scripts and styles
		new Theme\Queue();

		//Interact with the admin
		new Theme\Admin();

		//Interact with other plugins
		new Theme\Plugins();

		//Uncomment to enable REST
		//new Theme\Rest();
	}

	public static function config() {
		return false;
	}
}
