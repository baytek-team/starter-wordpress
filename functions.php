<?php
/*
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
*/

if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Require composer autoloader
require __DIR__ . '/vendor/autoload.php';

use Baytek\Wordpress\Theme;

global $theme;
$theme = new Theme;
$theme->run();


$theme_blocks = __DIR__ . '/blocks/index.php';
if ( is_readable( $theme_blocks ) ) :
	require_once $theme_blocks;
endif;


// Block Patterns.
require get_template_directory() . '/inc/block-patterns.php';

add_action('init', function() {
	remove_theme_support('core-block-patterns');

	unregister_block_pattern_category('buttons');
	unregister_block_pattern_category('columns');
	unregister_block_pattern_category('gallery');
	unregister_block_pattern_category('header');
	unregister_block_pattern_category('text');
	unregister_block_pattern_category('query');
});


