<?php
	//Reusable partial for archives
	global $wp_query;
?>
<section class="archive-container" id="infinite-scroll-container">
	<?php if ( have_posts() ) : ?>

		<?php while ( have_posts() ) : the_post(); ?>

			<?php get_template_part( 'templates/content/archive-content', apply_filters('archive_post_type_template', get_post_type()) ); ?>

		<?php endwhile; // end of the loop. ?>

	<?php else : ?>
		<?php
			$post_type_object = get_post_type_object( $wp_query->query_vars['post_type'] );

			echo sprintf( __( '<div class="empty-filter-message">Sorry, no %1$s were found. Please try a different filter.</div>', DAFT_TEXT_DOMAIN ), strtolower( apply_filters( 'daft_empty_result_post_type_name', $post_type_object ? $post_type_object->labels->name : __('results', THEMEL10N) ) ) );
		?>
	<?php endif; ?>

	<?php get_template_part('templates/partials/section', 'pagination'); ?>
</section>
