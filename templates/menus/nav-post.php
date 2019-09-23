<?php
	//Template for post navigation

	//Make sure we actually have an adjacent post
	$counts = wp_count_posts();

	if ($counts->publish <= 1) {
		return;
	}
?>

<nav class="narrow container previous-next">
	<?php
		previous_post_link(
			'%link',
			sprintf('<i class="icon-angle-left" aria-hidden="true"></i><span>%s</span>', __('Previous', THEMEL10N))
		);

		next_post_link(
			'%link',
			 sprintf('<span>%s</span><i class="icon-angle-right" aria-hidden="true"></i>', __('Next', THEMEL10N))
		);
	?>
</nav>
