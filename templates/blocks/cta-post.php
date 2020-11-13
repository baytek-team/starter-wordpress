<?php
	//Template for rendering the posts final CTA

	//Get the translated ID, if applicable
	$block_id = apply_filters('wpml_object_id', (int) get_option('post-settings-final-cta-block'), 'wp_block', true);
	$block = get_post($block_id);
?>

<?php if ($block && $block_id && isset($block->post_content)) : ?>
	<section class="final-cta">
		<?php echo apply_filters('the_content', $block->post_content); ?>
	</section>
<?php endif; ?>
