<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package boilerplate
 */

do_action('theme_header'); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">

			<section class="error-404 not-found container is-padded">
				<div class="wp-block-group">
					<div class="wp-block-group__inner-container">
						<h1 class="has-text-align-center eyebrow"><?php _e("404 Error", THEMEL10N); ?></h1>
						<h2 class="has-text-align-center has-no-line"><?php _e("Oh no - You've got lost!", THEMEL10N); ?></h2>
						<p class="has-text-align-center"><?php _e('Not to worry - you can click the button below to head back home.', THEMEL10N); ?></p>
					</div>
				</div>
				<div class="wp-block-button aligncenter is-style-outline">
					<a class="wp-block-button__link" href="<?php echo home_url('/'); ?>"><?php _e('Go back home', THEMEL10N); ?></a>
				</div>
			</section><!-- .error-404 -->

			<?php get_template_part('templates/blocks/cta', 'post'); ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
do_action('theme_footer');
