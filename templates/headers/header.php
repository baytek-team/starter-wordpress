<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package boilerplate
 */

$classes = ['site'];

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="<?php echo implode(' ', $classes)?>">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', THEMEL10N ); ?></a>

	<header class="site-header">
		<?php if ( has_nav_menu( 'secondary' ) ) : ?>
			<div class="header-top-menu">
				<nav id="secondary-navigation" class="secondary-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Secondary Menu', THEMEL10N ); ?>">
					<?php wp_nav_menu(['theme_location' => 'secondary', 'menu_class' => 'menu inline secondary']); ?>
					<?php wp_nav_menu(['theme_location' => 'search', 'menu_class' => 'menu inline search']); ?>
				</nav>
			</div>
		<?php endif; ?>
		<div class="container">
			<div class="logo-wrapper">
				<a href="<?php echo home_url('/'); ?>" class="logo-link"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/logo.svg" alt="<?php bloginfo('name') ?>" id="nav-logo" class="logo" width="200"></a>
			</div>

			<div class="menus">
				<?php if ( has_nav_menu( 'primary' ) ) : ?>
					<nav id="site-navigation" class="menu inline" aria-label="<?php esc_attr_e( 'Primary Menu', THEMEL10N ); ?>">
						<?php wp_nav_menu(['theme_location' => 'primary', 'menu_class' => 'menu inline']); ?>
					</nav>
				<?php endif; ?>

			</div>
			<!-- mobile menu toggle -->
			<input type="checkbox" id="toggle-right" aria-hidden="true">
			
			<div class="mobile-wrapper">
				<div id="nav-icon" class="main-menu-toggle">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
			<!-- /mobile menu toggle -->
		</div>
	</header>

	<div id="content" class="site-content">
