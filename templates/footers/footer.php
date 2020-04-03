<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package boilerplate
 */
use Baytek\Wordpress\Theme;

?>

		<?php get_template_part('templates/blocks/cta', 'post'); ?>
		
		<footer class="footer">
			<div class="container legal-credits">
				<div class="copyright">
					<p><?php printf("&copy;&nbsp;%s %s.", date('Y'), get_bloginfo('name')); ?></p>
				</div>
				<?php
					// Output the legal page link
					// https://developer.wordpress.org/reference/functions/the_privacy_policy_link/
					if ( function_exists( 'the_privacy_policy_link' ) ) {
						the_privacy_policy_link( '', '.<span role="separator" aria-hidden="true"></span>' );
					}
				?>
				<div class="byline">
					<p><?php
						printf( __('Design by %s', THEMEL10N),
							'<strong><a href="https://baytek.ca" target="_blank" title="Ottawa Web Design and Branding">baytek</a></strong>.');
					?></p>
				</div>
			</div>
		</footer>
	</div><!-- #content -->
</div><!-- #page -->
<?php wp_footer(); ?>
</body>
</html>
