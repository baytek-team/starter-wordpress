<?php
/**
 * The template for displaying archive pages.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package boilerplate
 */

do_action('theme_header'); ?>

<section id="primary" class="content-area">
	<main id="main" class="site-main">
		<?php
			//Get the hero banner
			$queried_object = get_queried_object();

			if ($queried_object && get_post_type($queried_object) == 'page') {
				global $post;
				$post = $queried_object;

				get_template_part('templates/components/hero/herobanner');
			}
			else {
				//Default archive??
			}
		?>

		<div class="sidebar-content-wrapper">
			<div class="sidebar no_after">
        		<?php get_template_part('templates/partials/sidebar', 'filter'); ?>
        	</div>

        	<div id="results-column" class="archive-content">
				<?php get_template_part('templates/partials/section', 'archive'); ?>
			</div>
		</div>
	</main><!-- #main -->
</section><!-- #primary -->

<?php
do_action('theme_footer');
