<?php
/**
 * Template Name: Form Styling Test
 */

do_action('theme_header'); ?>


<div id="primary" class="content-area">
	<main id="main" class="site-main">
		<header class="container">
			<div class="wp-block-group top-margin">
				<h1>Form Styling Examples</h1>
			</div>
		</header>

		<div id="vanilla-form" class="wp-block-group">
			<div class="wp-block-group__inner-container">
				<h2>Vanilla Form</h2>
				<?php get_template_part( 'templates/tests/form', 'vanilla' ); ?>
			</div>
		</div>

		<div id="gravity-form" class="wp-block-group">
			<div class="wp-block-group__inner-container">
				<h2>Gravity Form</h2>
				<?php get_template_part( 'templates/tests/form', 'gravity' ); ?>
			</div>
		</div>

	</main><!-- #main -->
</div><!-- #primary -->

<?php
do_action('theme_footer');
