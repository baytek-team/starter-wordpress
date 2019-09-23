<?php
/**
 * The template for displaying all single posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package boilerplate
 */

do_action('theme_header', 'post'); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">
			<?php

			/* Start the Loop */
			while ( have_posts() ) :
				the_post();

				get_template_part( 'templates/content/content', get_post_type() );

				// Link attachment posts to their parent
				if ( is_singular( 'attachment' ) ) {
					the_post_navigation([
						/* translators: %s: parent post link */
						'prev_text' => sprintf(
							__( '<span class="meta-nav">Published in</span><span class="post-title">%s</span>', THEMEL10N ),
							'%title'
						),
					]);
				}
				// Link to next or previous post
				elseif ( is_singular( 'post' ) ) {
					get_template_part('templates/menus/nav', 'post');

					get_template_part('templates/blocks/cta', 'post');
				}
			endwhile; // End of the loop.

			// Social Sharing Template
			// get_template_part('templates/partials/social', 'share');

			?>
		</main><!-- #main -->
	</div><!-- #primary -->

<?php
do_action('theme_footer');
