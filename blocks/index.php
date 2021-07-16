<?php
/**
 * Theme Support
 * https://wordpress.org/gutenberg/handbook/extensibility/theme-support
 */



/**
 * Enqueue block assets: Backend
 * 
 * https://github.com/WordPress/gutenberg/blob/master/docs/designers-developers/developers/tutorials/javascript/js-build-setup.md#dependency-management
 */

function wordpress_blocks_starter_enqueue_block_editor_assets() {
	$blocks_dir = 'blocks/build/';

	$blocks_asset_file = include get_theme_file_path( $blocks_dir . 'index.asset.php' );

	// Replace "wp-blockEditor" with "wp-block-editor"
	$blocks_asset_file['dependencies'] = array_replace( $blocks_asset_file['dependencies'],
		array_fill_keys(
			array_keys( $blocks_asset_file['dependencies'], 'wp-blockEditor' ),
			'wp-block-editor'
		)
	);

	wp_enqueue_script(
		'wordpress-blocks-starter-blocks',
		get_theme_file_uri( $blocks_dir . 'index.js', __FILE__ ),
		$blocks_asset_file['dependencies'],
		$blocks_asset_file['version']
	);
}
add_action( 'enqueue_block_editor_assets', 'wordpress_blocks_starter_enqueue_block_editor_assets' );
