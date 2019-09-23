<?php
/**
 * Template for Archive Posts
 * Snippet version of posts for displayed in an archive (ex. news, search, feed)
 */
?>
<article itemscope itemtype="http://schema.org/Article" class="post">
	<div class="wp-block-columns no-margin">
		<header class="wp-block-column no-margin" style="flex-basis:33.33%">
			<a href="<?php the_permalink(); ?>">
				<?php
					if (has_post_thumbnail()) :
						the_post_thumbnail('archive-thumbnail');
					else :
				?>
				<img src="/wp-content/themes/4r-solution/assets/images/post-placeholder.jpg" class="attachment-post-thumbnail size-post-thumbnail wp-post-image">
				<?php endif; ?>
			</a>
		</header>
		<div class="wp-block-column no-margin" style="flex-basis:66.66%">
			<h1 itemprop="headline" class="h2 has-no-line"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
			<p class="post-meta small">
				<span class="date" itemprop="datePublished"><?php echo get_the_date( __( 'F d, Y', THEMEL10N ) ); ?></span>
				<?php if ( $cat = get_main_post_term( 'category', get_the_ID() ) ) : ?>
				<span class="divider">|</span>
				<span class="category" itemprop="articleSection"><a href="<?php echo get_category_link($cat->term_id); ?>"><?php echo $cat->name; ?></a></span>
				<?php endif; ?>
			</p>
			<?php the_excerpt(); ?>
			<p><a href="<?php the_permalink(); ?>"><?php _e( 'Read more', THEMEL10N ); ?></a></p>
		</div>
	</div> <!-- .wp-block-columns -->
</article>	<!-- #post-content -->
