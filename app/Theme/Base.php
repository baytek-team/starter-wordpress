<?php

namespace Baytek\Wordpress\Theme;

/**
 * Base class that adds hooks
 */

abstract class Base
{
    /**
	 * Initialize the class, calling the addHooks() method
	 */
	public function __construct() {
		$this->addHooks();
	}

	/**
	 * Set up all class hooks
	 */
	public function addHooks() {
		// Hooks go here
	}
}
