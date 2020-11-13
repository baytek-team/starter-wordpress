<?php

//Template for the filter

?>

<?php if ( is_active_sidebar( 'archive-filter' ) ) : ?>
	<div class="wp-block-group alignwide filter-group low-margin">
		<div class="wp-block-group__inner-container">
			<div class="toggle-header h5">
				<?php _e('Filter', THEMEL10N); ?>
			</div>

			<div class="toggle-body">
				<?php dynamic_sidebar( 'archive-filter' ); ?>
			</div>
		</div>
	</div>
<?php endif; ?>
