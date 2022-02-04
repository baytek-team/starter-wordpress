<?php
/**
 * Block Patterns
 *
 * @link https://developer.wordpress.org/reference/functions/register_block_pattern/
 * @link https://developer.wordpress.org/reference/functions/register_block_pattern_category/
 *
 * @package WordPress
 * @subpackage Baytek_Components
 * @since Baytek Components 1.6
 */

/**
 * Register Block Pattern Category.
 */
if ( function_exists( 'register_block_pattern_category' ) ) {

	register_block_pattern_category(
		'baytekcomp',
		array( 'label' => esc_html__( 'Baytek Components', 'baytekcomp' ) )
	);
}

/**
 * Register Block Patterns.
 */
if ( function_exists( 'register_block_pattern' ) ) {

	// Call to Action.
	register_block_pattern(
		'baytekcomp/inner-hero',
		array(
			'title'         => esc_html__( 'Inner Page Hero', 'baytekcomp' ),
			'categories'    => array( 'baytekcomp' ),
			'viewportWidth' => 1400,
			'content'       => implode(
				'',
				array(
					'<!-- wp:cover {"url":"https://s.w.org/images/core/5.8/forest.jpg","dimRatio":60,"minHeight":800,"align":"full"} -->',
					'<div class="wp-block-cover alignfull" style="min-height:800px"><span aria-hidden="true" class="has-background-dim-60 wp-block-cover__gradient-background has-background-dim"></span><img class="wp-block-cover__image-background" alt="" src="https://s.w.org/images/core/5.8/forest.jpg" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:heading {"align":"wide","style":{"color":{"text":"#ffe074"},"typography":{"fontSize":"64px"}}} -->',
					'<h2 class="alignwide has-text-color" id="forest-1" style="color:#ffe074;font-size:64px">Forest.</h2>',
					'<!-- /wp:heading -->',
					'<!-- wp:columns {"align":"wide"} -->',
					'<div class="wp-block-columns alignwide"><!-- wp:column {"width":"55%"} -->',
					'<div class="wp-block-column" style="flex-basis:55%"><!-- wp:spacer {"height":330} -->',
					'<div style="height:330px" aria-hidden="true" class="wp-block-spacer"></div>',
					'<!-- /wp:spacer -->',
					'<!-- wp:paragraph {"style":{"color":{"text":"#ffe074"},"typography":{"lineHeight":"1.3","fontSize":"12px"}}} -->',
					'<p class="has-text-color" style="color:#ffe074;font-size:12px;line-height:1.3"><em>Even a child knows how valuable the forest is. The fresh, breathtaking smell of trees. Echoing birds flying above that dense magnitude. A stable climate, a sustainable diverse life and a source of culture. Yet, forests and other ecosystems hang in the balance, threatened to become croplands, pasture, and plantations.</em></p>',
					'<!-- /wp:paragraph --></div>',
					'<!-- /wp:column -->',
					'<!-- wp:column -->',
					'<div class="wp-block-column"></div>',
					'<!-- /wp:column --></div>',
					'<!-- /wp:columns --></div></div>',
					'<!-- /wp:cover -->',
				)
			),
		)
	);


	// Call to Action.
	register_block_pattern(
		'baytekcomp/call-to-action',
		array(
			'title'         => esc_html__( 'Call to Action', 'baytekcomp' ),
			'categories'    => array( 'baytekcomp' ),
			'viewportWidth' => 1400,
			'content'       => implode(
				'',
				array(
					'<!-- wp:group {"align":"wide","style":{"color":{"background":"#ffffff"}}} -->',
					'<div class="wp-block-group alignwide has-background" style="background-color:#ffffff"><div class="wp-block-group__inner-container"><!-- wp:group -->',
					'<div class="wp-block-group"><div class="wp-block-group__inner-container"><!-- wp:heading {"align":"center"} -->',
					'<h2 class="has-text-align-center">' . esc_html__( 'Support the Museum and Get Exclusive Offers', 'baytekcomp' ) . '</h2>',
					'<!-- /wp:heading -->',
					'<!-- wp:paragraph {"align":"center"} -->',
					'<p class="has-text-align-center">' . esc_html__( 'Members get access to exclusive exhibits and sales. Our memberships cost $99.99 and are billed annually.', 'baytekcomp' ) . '</p>',
					'<!-- /wp:paragraph -->',
					'<!-- wp:button {"align":"center","className":"is-style-outline"} -->',
					'<div class="wp-block-button aligncenter is-style-outline"><a class="wp-block-button__link" href="#">' . esc_html__( 'Become a Member', 'baytekcomp' ) . '</a></div>',
					'<!-- /wp:button --></div></div>',
					'<!-- /wp:group --></div></div>',
					'<!-- /wp:group -->',
				)
			),
		)
	);
}