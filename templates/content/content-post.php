<?php
/**
 * Template for Posts.
 * Being Used as News Articles in this site.
 */
?>
<article itemscope itemtype="http://schema.org/Article" class="post">
	<?php if (has_post_thumbnail()) : ?>
	<header class="wp-block-cover has-background-dim-100 has-background-dim has-background-linear-gradient-dark-grey" style="background-image:url(<?php the_post_thumbnail_url() ?>);">
		<div class="wp-block-cover__inner-container">
			<link itemprop="thumbnailUrl" href="<?php the_post_thumbnail_url() ?>" />
	<?php else : ?>
	<header class="container">
		<div class="wp-block-group top-margin">
	<?php endif; ?>
			<p class="has-text-align-center eyebrow"><?php _e( 'News', THEMEL10N ); ?></p>
			<h1 itemprop="headline" class="has-text-align-center"><?php the_title(); ?></h1>

			<p class="post-meta has-text-align-center">
				<span class="date" itemprop="datePublished"><?php echo get_the_date( __( 'F d, Y', THEMEL10N ) ); ?></span>
				<?php if ( $cat = get_main_post_term( 'category', get_the_ID() ) ) : ?>
				<span class="divider">|</span>
				<span class="category" itemprop="articleSection"><strong><?php echo $cat->name; ?></strong></span>
				<?php endif; ?>
			</p>
		</div>
	</header>
	<div itemprop="articleBody" class="narrow container">
		<?php the_content(); ?>
	</div>
</article>	<!-- #post-content -->
