<?php

//Reusable partial for pagination on archive pages

global $wp_query;

?>

<?php if ( $wp_query->found_posts && $wp_query->max_num_pages > 1 ) : ?>

<section class="pagination">
	<?php
		$current = max(1, get_query_var( 'paged', 1 ));
	?>

	<div class="links">
		<a class="previous<?php if ($current == max(1, $current - 1)) echo ' disabled'; ?>" data-page="<?php echo max(1, $current - 1); ?>" aria-label="<?php _e('Previous page', THEMEL10N); ?>" title="<?php _e('Previous page', THEMEL10N); ?>"><i class="fal fa-long-arrow-left"></i></a>

		<div class="numbers">
			<?php
				//Figure out which bubbles to show
				foreach (range(0, min(3, $wp_query->max_num_pages) - 1) as $n) :
					if ($current == 1) {
						$n += 1;
					}
					else if ($current == $wp_query->max_num_pages) {
						$n += $current - 2;

						if ($current == 2) {
							$n++;
						}
					}
					else {
						$n += $current - 1;
					}
			?>
			<a class="bubble <?php if ($n == $current) echo 'active'; ?>" data-page="<?php echo $n; ?>" aria-label="<?php printf(__('Page %s', THEMEL10N), $n); ?>" title="<?php printf(__('Page %s', THEMEL10N), $n); ?>"><?php echo $n; ?></a>
			<?php endforeach; ?>
		</div>

		<a class="next<?php if ($current == min($current + 1, $wp_query->max_num_pages)) echo ' disabled'; ?>" data-page="<?php echo min($current + 1, $wp_query->max_num_pages); ?>" aria-label="<?php _e('Next page', THEMEL10N); ?>" title="<?php _e('Next page', THEMEL10N); ?>"><i class="fal fa-long-arrow-right"></i></a>
	</div>
</section>

<?php endif; ?>
