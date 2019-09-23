<?php
	//Template for the post settings page in the admin

	//Get the reusable blocks
	$blocks = get_posts([
		'post_type' => 'wp_block',
		'post_status' => 'publish',
		'posts_per_page' => -1,
		'orderby' => [
			'post_title' => 'ASC'
		]
	]);

	//Get the current setting
	$selected = get_option('post-settings-final-cta-block');
?>

<div class="wrap">
	<h1><?php _e( 'Post Settings', THEMEL10N ); ?></h1>

	<form method="post" id="post-settings">

		<?php settings_fields( 'post-settings' ); ?>
    	<?php do_settings_sections( 'post-settings' ); ?>

		<table class="form-table">
			<tr>
				<th><label><?php _e( 'Final CTA Block', THEMEL10N ); ?></label></th>

				<td>
					<select id="<?php echo $type; ?>" name="post-settings-final-cta-block">
						<option value=""><?php _e('None', THEMEL10N); ?></option>

						<?php foreach ($blocks as $block) : ?>
							<option value="<?php echo $block->ID; ?>" <?php if ($selected == $block->ID) echo 'selected="selected"'; ?>><?php echo $block->post_title; ?></option>
						<?php endforeach; ?>
					</select>

					<p class="description"><?php _e('This content will be shown at the bottom of every post', THEMEL10N); ?></p>
				</td>
			</tr>
		</table>

		<?php submit_button(); ?>
	</form>
</div>
