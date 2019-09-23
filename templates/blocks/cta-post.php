<?php
	//Template for rendering the posts final CTA
?>

<?php if ($block = get_post(get_option('post-settings-final-cta-block'))) : ?>
	<section class="final-cta">
		<?php echo apply_filters('the_content', $block->post_content); ?>
	</section>
<?php endif; ?>
