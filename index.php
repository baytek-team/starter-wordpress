<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package boilerplate
 */

do_action('theme_header'); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">

			<?php if ( have_posts() ) : ?>
			<div class="wp-block-cover has-background-dim-100 has-background-dim has-background-linear-gradient-dark-grey tall"
					style="background-image:url(<?php echo get_the_post_thumbnail_url(get_queried_object()); ?>);">
				<div class="wp-block-cover__inner-container">
					<h1 class="has-text-align-center eyebrow"><?php echo get_the_title(get_queried_object()); ?></h1>
					<h2 class="has-text-align-center h1 has-no-line"><?php echo get_the_excerpt(get_queried_object()); ?></h2>
				</div>
			</div>
			<section class="container archive" id="infinite-scroll-container">
			<?php
				while ( have_posts() ) :
					the_post();
					get_template_part( 'templates/content/archive-content', get_post_type() );
				endwhile;
			?>
			</section>
			<?php endif; ?>

			<?php get_template_part('templates/blocks/cta', 'post'); ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
do_action('theme_footer');
