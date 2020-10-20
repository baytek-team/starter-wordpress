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

		//Hook into attachment upload to create a database entry for the PDF auto-generated images
		add_filter('wp_generate_attachment_metadata', [$this, 'generatePdfThumbnailEntry'], 10, 3);

		// Reusable Blocks accessible in backend
		add_action( 'admin_menu', [$this, 'be_reusable_blocks_admin_menu'] );
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

	/**
	 * Listen for PDF file uploads and create database entries for their corresponding image files
	 *
	 * @param array  $metadata      An array of attachment meta data.
	 * @param int    $attachment_id Current attachment ID.
	 * @param string $context       Additional context: 'create' or 'update'
	 */
	public function generatePdfThumbnailEntry($metadata, $attachment_id, $context) {
		//Make sure we're dealing with a PDF
		if (get_post_mime_type($attachment_id) == 'application/pdf') {
			//Make sure we have sizes for thumbnails (therefore images)
			if (isset($metadata['sizes']) && count($metadata['sizes']) && isset($metadata['sizes']['full'])) {
				//We will use the full size thumbnail as our original image, but need to build some missing info
				global $wpdb;

				//Get the PDF for reference
				$pdf = get_post($attachment_id);
				$pdf_file = get_post_meta($attachment_id, '_wp_attached_file', true);

				//Find out whether we're using year/month folders
				$using_subfolders = (int) get_option('uploads_use_yearmonth_folders') == 1;

				//Save a copy of the metadata we can modify
				$copy = $metadata;
				$full = $copy['sizes']['full'];
				unset($copy['sizes']['full']);

				//Insert the new post data
				//Save the new attachment ID
				$thumbnail_id = wp_insert_post([
					'post_author' => $pdf->post_author,
					'post_date' => $pdf->post_date,
					'post_date_gmt' => $pdf->post_date_gmt,
					'post_content' => '',
					'post_title' => sprintf(__('%s Cover Image', THEMEL10N), $pdf->post_title),
					'post_status' => $pdf->post_status,
					'comment_status' => $pdf->comment_status,
					'ping_status' => $pdf->ping_status,
					'post_password' => $pdf->post_password,
					'post_name' => sprintf('%s-thumb-%s', $pdf->post_name, time()),
					'to_ping' => $pdf->to_ping,
					'pinged' => $pdf->pinged,
					'post_modified' => $pdf->post_modified,
					'post_modified_gmt' => $pdf->post_modified_gmt,
					'post_content_filtered' => $pdf->post_content_filtered,
					'post_parent' => $pdf->post_parent,
					'guid' => str_replace($pdf_file, sprintf('%s%s', $using_subfolders ? date('Y/m/') : '', $full['file']), $pdf->guid),
					'menu_order' => $pdf->menu_order,
					'post_type' => $pdf->post_type,
					'post_mime_type' => 'image/jpeg',
					'comment_count' => $pdf->comment_count
				]);

				//If we successfully added the attachment, now add the metadata
				if ($thumbnail_id && !is_wp_error($thumbnail_id)) {
					//Update the copy with additional data
					$new_meta = [
						'width' => $full['width'],
						'height' => $full['height'],
						'file' => sprintf('%s%s', $using_subfolders ? date('Y/m/') : '', $full['file']),
						'sizes' => $copy['sizes'],
						'image_meta' => [
							'aperture' => 0,
				            'credit' => '',
				            'camera' => '',
				            'caption' => '',
				            'created_timestamp' => 0,
				            'copyright' => '',
				            'focal_length' => 0,
				            'iso' => 0,
				            'shutter_speed' => 0,
				            'title' => '',
				            'orientation' => 0,
				            'keywords' => []
						]
					];

					//Attached file meta
					$wpdb->insert(
						$wpdb->postmeta,
						[
							'post_id' => $thumbnail_id,
							'meta_key' => '_wp_attached_file',
							'meta_value' => $new_meta['file']
						]
					);

					//Attachment meta
					$wpdb->insert(
						$wpdb->postmeta,
						[
							'post_id' => $thumbnail_id,
							'meta_key' => '_wp_attachment_metadata',
							'meta_value' => serialize($new_meta)
						]
					);

					//Voila!
				}
			}
		}

		return $metadata;
	}

	/**
	 * Reusable Blocks accessible in backend
	 */
	public function be_reusable_blocks_admin_menu() {
	    add_menu_page( 'Reusable Blocks', 'Reusable Blocks', 'edit_posts', 'edit.php?post_type=wp_block', '', 'dashicons-editor-table', 22 );
	}
}
