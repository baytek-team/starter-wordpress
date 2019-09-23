<?php

namespace Baytek\Wordpress\Theme;

/**
 * Admin-related theme code
 */

class Admin extends Base
{
	/**
	 * Options to save.
	 */
	protected $postSettings = [
		'final-cta-block'
	];

	/**
	 * Set up all class hooks
	 */
	public function addHooks()
	{
		//Add extra editor capabilities
		add_filter('admin_init', [$this, 'addEditorCaps']);

		//Create admin metaboxes - instantiate applicable theme admin metaboxes here

		//Create admin settings pages
		add_action('admin_menu', [$this, 'settingsPageMenu']);
		add_action('admin_init', [$this, 'settings']);
	}

	/**
	 * Allow Editors to manage the Wordpress menus, but no other menu items in the 'Appearance' area
	 */
	public function addEditorCaps()
	{
		$role_object = get_role( 'editor' );

		//Edit menus
		if (!$role_object->has_cap('edit_theme_options')) {
			$role_object->add_cap( 'edit_theme_options' );
		}

		//Hide other Theme subpages so they only have access to the menu
		if (current_user_can('editor')) {
			global $submenu;

			if (isset($submenu['themes.php'])) {
				foreach ($submenu['themes.php'] as $index => $menu_item) {
					if (!in_array('Menus', $menu_item)) {
						unset($submenu['themes.php'][$index]);
					}
				}
			}
		}

		if (!$role_object->has_cap('export')) {
			$role_object->add_cap('export');
		}

		//Edit gravity forms
		$gform_caps = [
			'gravityforms_edit_forms',
			'gravityforms_delete_forms',
			'gravityforms_create_form',
			'gravityforms_view_entries',
			'gravityforms_edit_entries',
			'gravityforms_delete_entries',
			'gravityforms_view_settings',
			'gravityforms_edit_settings',
			'gravityforms_export_entries',
			'gravityforms_uninstall',
			'gravityforms_view_entry_notes',
			'gravityforms_edit_entry_notes',
			'gravityforms_view_updates',
			'gravityforms_view_addons',
			'gravityforms_preview_forms',
			'gravityforms_system_status',
			'gravityforms_logging'
		];


		if (!$role_object->has_cap($gform_caps[0])) {
			foreach ($gform_caps as $cap) {
				$role_object->add_cap($cap);
			}
		}
	}

	/**
	 * Output the menu item for the plugin settings page
	 */
	public function settingsPageMenu() {
		//Add knowledge base settings
		add_submenu_page(
			'edit.php',
			'Post Settings',
			'Settings',
			'edit_posts',
			'post-settings',
			[
				$this,
				'postSettingsPage'
			]
		);
	}

	/**
	 * Output the settings page
	 */
	public function postSettingsPage() {
		//Update teh settings
		if (isset($_POST['option_page']) && $_POST['option_page'] == 'post-settings') {
			foreach ($this->postSettings as $option) {
				update_option("post-settings-$option", isset($_POST["post-settings-$option"]) ? sanitize_text_field($_POST["post-settings-$option"]) : '');
			}

			//Print the notice
			printf(
				'<div class="%s"><p>%s</p></div>',
				'notice notice-success is-dismissible',
				__('Settings saved.', THEMEL10N)
			);
		}

		//Include the template
		get_template_part('templates/admin/settings', 'post');
	}

	/**
	 * Create the settings
	 */
	public function settings() {
		//Register normal settings
		foreach ($this->postSettings as $option) {
			register_setting( 'post-settings', 'post-settings-'.$option );
		}
	}
}
