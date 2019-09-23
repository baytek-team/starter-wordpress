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
		<!-- News CMS content -->
		<div class="page-cms">
			<div class="archive-flex">

				<?php
				if ( have_posts() ) : ?>

					<?php
					/* Start the Loop */
					while ( have_posts() ) : the_post();

						get_template_part( 'templates/partials/content', get_post_type());

					endwhile;


				else :
					//get_template_part( 'template-parts/content', 'none' );
				endif; ?>

			</div>
			<div class="info-footer">
				<?php if ( get_next_posts_link() ) : ?>
				<div class="older-posts">
					<h3><?php next_posts_link(__('View More Results', THEMEL10N)); ?></h3>
				</div>
				<?php endif; ?>
			</div>
		</div>
	</main><!-- #main -->
</section><!-- #primary -->

<?php
do_action('theme_footer');
