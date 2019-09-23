<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package boilerplate
 */

do_action('theme_header'); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">

			<?php
				while ( have_posts() ) :
					the_post();

					the_content();
				endwhile;
			?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
do_action('theme_footer');
