<?php
/**
 * Template Name: Typography Styling Test
 */

do_action('theme_header'); ?>

<div id="primary" class="content-area">
	<main id="main" class="site-main">
		<header class="container">
			<div class="wp-block-group top-margin">
				<h1>Base Typography Examples</h1>
			</div>
		</header>

		<div id="base-typography" class="wp-block-group">
			<?php get_template_part( 'templates/tests/typography', 'base' ); ?>
		</div>

	</main><!-- #main -->
</div><!-- #primary -->


<?php
do_action('theme_footer');
